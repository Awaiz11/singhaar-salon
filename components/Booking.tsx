"use client";

import { useEffect, useMemo, useState } from "react";
import { HOME_AREAS, MENU, OPEN, PACKAGES, SALON } from "./data";

type Day = { key: string; date: Date; label: string; sub: string; closed: boolean };

const pad = (n: number) => String(n).padStart(2, "0");
const iso = (d: Date) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
const fmtTime = (mins: number) => {
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  const hh = h % 12 === 0 ? 12 : h % 12;
  return `${hh}:${pad(m)} ${h < 12 ? "am" : "pm"}`;
};

const BRIDAL = PACKAGES.map((p) => `Bridal: ${p.name} (Rs ${p.price})`).concat("Bridal: all three days");

export default function Booking() {
  const [days, setDays] = useState<Day[]>([]);
  const [now, setNow] = useState<Date | null>(null);
  const [dayKey, setDayKey] = useState("");
  const [slot, setSlot] = useState<number | null>(null);
  const [service, setService] = useState(BRIDAL[1]);
  const [wedding, setWedding] = useState("");
  const [name, setName] = useState("");
  const [home, setHome] = useState(false);
  const [area, setArea] = useState(HOME_AREAS[0]);
  const [error, setError] = useState("");

  const isBridal = service.startsWith("Bridal");

  // Built in the browser so "today" matches the visitor's clock.
  useEffect(() => {
    const t = new Date();
    const list: Day[] = Array.from({ length: 10 }, (_, i) => {
      const d = new Date(t.getFullYear(), t.getMonth(), t.getDate() + i);
      return {
        key: iso(d),
        date: d,
        label: i === 0 ? "Today" : i === 1 ? "Tomorrow" : d.toLocaleDateString("en-GB", { weekday: "short" }),
        sub: d.toLocaleDateString("en-GB", { day: "numeric", month: "short" }),
        closed: OPEN[d.getDay()] === null,
      };
    });
    setNow(t);
    setDays(list);
    setDayKey(list.find((d) => !d.closed)!.key);
  }, []);

  const minWedding = useMemo(() => {
    if (!now) return "";
    return iso(new Date(now.getFullYear(), now.getMonth(), now.getDate() + 7));
  }, [now]);

  const day = days.find((d) => d.key === dayKey);

  const slots = useMemo(() => {
    if (!day || !now) return [];
    const open = OPEN[day.date.getDay()];
    if (!open) return [];
    const isToday = day.key === days[0]?.key;
    const earliest = isToday ? now.getHours() * 60 + now.getMinutes() + 60 : 0;
    const list: number[] = [];
    for (let m = open.from * 60; m <= open.to * 60 - 60; m += 30) if (m >= earliest) list.push(m);
    return list;
  }, [day, now, days]);

  useEffect(() => setSlot(null), [dayKey]);

  const send = () => {
    if (!name.trim()) return setError("Add your name so we know who to expect.");
    if (isBridal && !wedding) return setError("Add your wedding date. We'll suggest trial dates from it.");
    if (!isBridal && (slot === null || !day)) return setError("Pick a day and a time.");
    setError("");
    const lines = [`Assalam o alaikum, I'd like to book at ${SALON.full}.`, `Name: ${name.trim()}`, `Service: ${service}`];
    if (isBridal) {
      const d = new Date(wedding + "T12:00:00");
      lines.push(`Wedding date: ${d.toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}`);
      lines.push("Please suggest dates for my trial.");
    } else if (day && slot !== null) {
      lines.push(`Time: ${day.date.toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "short" })}, ${fmtTime(slot)}`);
    }
    if (home) lines.push(`Home service in ${area}`);
    window.open(`https://wa.me/${SALON.whatsapp}?text=${encodeURIComponent(lines.join("\n"))}`, "_blank", "noopener");
  };

  const summary = isBridal
    ? wedding
      ? `${service.replace(/ \(.*\)/, "")}, wedding on ${new Date(wedding + "T12:00:00").toLocaleDateString("en-GB", { day: "numeric", month: "long" })}`
      : "Add your wedding date"
    : slot !== null && day
      ? `${service.replace(/ \(.*\)/, "")}, ${day.label} ${day.sub} at ${fmtTime(slot)}`
      : "Pick a day and time";

  return (
    <section id="book" className="booking section" aria-labelledby="book-title">
      <div className="wrap booking__inner">
        <div className="booking__intro">
          <h2 id="book-title" className="h2">Book a visit</h2>
          <p>
            Choose a service and a time. Your message opens in WhatsApp, and we reply to confirm,
            usually within the hour.
          </p>
          <p className="booking__aside">
            Brides: give us your wedding date and we&apos;ll plan the trial around it.
          </p>
        </div>

        <div className="booking__card">
          <div className="booking__fields">
            <div className="field field--wide">
              <label htmlFor="service">Service</label>
              <select id="service" value={service} onChange={(e) => setService(e.target.value)}>
                <optgroup label="Bridal">
                  {BRIDAL.map((b) => (
                    <option key={b}>{b}</option>
                  ))}
                </optgroup>
                {MENU.map((c) => (
                  <optgroup key={c.key} label={c.label}>
                    {c.items.map((it) => (
                      <option key={it.name} value={`${it.name} (Rs ${it.price})`}>
                        {it.name} (Rs {it.price})
                      </option>
                    ))}
                  </optgroup>
                ))}
              </select>
            </div>
            <div className="field">
              <label htmlFor="bname">Your name</label>
              <input id="bname" value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" />
            </div>
          </div>

          {isBridal ? (
            <div className="field">
              <label htmlFor="wedding">Wedding date</label>
              <input id="wedding" type="date" min={minWedding} value={wedding} onChange={(e) => setWedding(e.target.value)} />
            </div>
          ) : (
            <>
              <fieldset className="picker">
                <legend>Day</legend>
                <div className="days" role="radiogroup" aria-label="Day">
                  {days.map((d) => (
                    <button
                      key={d.key}
                      type="button"
                      role="radio"
                      aria-checked={d.key === dayKey}
                      disabled={d.closed}
                      className="day"
                      onClick={() => setDayKey(d.key)}
                    >
                      <span>{d.label}</span>
                      <small>{d.closed ? "Closed" : d.sub}</small>
                    </button>
                  ))}
                </div>
              </fieldset>
              <fieldset className="picker">
                <legend>Time</legend>
                {slots.length === 0 && now ? (
                  <p className="slots__empty">No times left today. Pick another day.</p>
                ) : (
                  <div className="slots" role="radiogroup" aria-label="Time">
                    {slots.map((m) => (
                      <button key={m} type="button" role="radio" aria-checked={slot === m} className="slot" onClick={() => setSlot(m)}>
                        {fmtTime(m)}
                      </button>
                    ))}
                  </div>
                )}
              </fieldset>
            </>
          )}

          <div className="home">
            <label className="check">
              <input type="checkbox" checked={home} onChange={(e) => setHome(e.target.checked)} />
              <span>Come to my home</span>
            </label>
            {home && (
              <select aria-label="Area" value={area} onChange={(e) => setArea(e.target.value)}>
                {HOME_AREAS.map((a) => (
                  <option key={a}>{a}</option>
                ))}
              </select>
            )}
          </div>

          <div className="booking__foot">
            <p className="booking__summary" aria-live="polite">{summary}</p>
            <button type="button" className="btn btn--rani" onClick={send}>
              Send on WhatsApp
            </button>
          </div>
          {error && (
            <p className="booking__error" role="alert">
              {error}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
