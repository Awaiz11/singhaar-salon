import { HOME_AREAS, HOURS, PHOTOS, SALON, img } from "./data";

export default function Visit() {
  return (
    <section id="visit" className="visit section" aria-labelledby="visit-title">
      <div className="wrap visit__inner">
        <figure className="visit__photo">
          <img src={img(PHOTOS.salon, 900)} alt="Bright reception and styling area of the salon" loading="lazy" />
        </figure>
        <div className="visit__info">
          <h2 id="visit-title" className="h2">Visit us</h2>
          <p className="visit__addr">
            {SALON.area}
            <br />
            <a href={SALON.maps} target="_blank" rel="noopener noreferrer">Open in Google Maps</a>
          </p>
          <dl className="hours">
            {HOURS.map((h) => (
              <div key={h.days}>
                <dt>{h.days}</dt>
                <dd>{h.time}</dd>
              </div>
            ))}
          </dl>
          <p className="visit__note">
            On wedding days we open at 8 am for brides. Gents are welcome in the front waiting area.
          </p>
          <p className="visit__note">
            Home service in {HOME_AREAS.slice(0, -1).join(", ")} and {HOME_AREAS.at(-1)}.
          </p>
          <a className="btn btn--line" href={`https://wa.me/${SALON.whatsapp}`} target="_blank" rel="noopener noreferrer">
            WhatsApp {SALON.phone}
          </a>
        </div>
      </div>
    </section>
  );
}
