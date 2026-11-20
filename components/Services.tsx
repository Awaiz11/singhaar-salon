"use client";

import { useState } from "react";
import { MENU, img } from "./data";

export default function Services() {
  const [active, setActive] = useState(MENU[0].key);
  const cat = MENU.find((c) => c.key === active)!;

  return (
    <section id="services" className="services section" aria-labelledby="services-title">
      <div className="wrap">
        <div className="services__head">
          <h2 id="services-title" className="h2">Services and prices</h2>
          <p className="services__note">Prices in rupees. No hidden charges for “bridal” products.</p>
        </div>

        <div className="tabs" role="tablist" aria-label="Service type">
          {MENU.map((c) => (
            <button
              key={c.key}
              role="tab"
              id={`tab-${c.key}`}
              aria-selected={c.key === active}
              aria-controls={`panel-${c.key}`}
              className="tab"
              onClick={() => setActive(c.key)}
            >
              {c.label}
            </button>
          ))}
        </div>

        <div className="services__body" id={`panel-${cat.key}`} role="tabpanel" aria-labelledby={`tab-${cat.key}`}>
          <figure className="services__photo" key={cat.key}>
            <img src={img(cat.photo, 800)} alt={cat.alt} loading="lazy" />
          </figure>
          <ul className="menu" key={`list-${cat.key}`}>
            {cat.items.map((it) => (
              <li key={it.name} className="menu__item">
                <div>
                  <p className="menu__name">{it.name}</p>
                  {it.note && <p className="menu__note">{it.note}</p>}
                </div>
                <span className="menu__dots" aria-hidden="true" />
                <p className="menu__price">Rs {it.price}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
