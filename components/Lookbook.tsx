import { PHOTOS, img } from "./data";

const LOOKS = [
  { id: PHOTOS.barat, w: 700, label: "Barat", alt: "Bride in a deep red lehenga with kundan jewellery" },
  { id: PHOTOS.nikah, w: 600, label: "Nikah", alt: "Bride in white having her makeup finished by the window" },
  { id: PHOTOS.mehndi, w: 600, label: "Mehndi", alt: "Fresh bridal mehndi on both hands" },
];

export default function Lookbook() {
  return (
    <section className="looks section" aria-labelledby="looks-title">
      <div className="wrap">
        <h2 id="looks-title" className="h2">Looks for each day</h2>
        <div className="looks__grid">
          {LOOKS.map((l, i) => (
            <figure key={l.label} className={`look look--${i}`}>
              <img src={img(l.id, l.w)} alt={l.alt} loading="lazy" />
              <figcaption>{l.label}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
