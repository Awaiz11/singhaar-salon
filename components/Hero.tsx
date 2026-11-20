import Mandala from "./Mandala";
import { PHOTOS, SALON, img } from "./data";

export default function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="wrap hero__inner">
        <div className="hero__copy">
          <p className="hero__place">{SALON.full}, Model Town</p>
          <h1 id="hero-title" className="hero__title">
            A bridal look that lasts from nikah to rukhsati
          </h1>
          <p className="hero__lede">
            Makeup, hair and mehndi in a women-only salon in Model Town. Every bride gets a
            trial two weeks before her day, so there are no surprises on the stage.
          </p>
          <div className="hero__actions">
            <a href="#book" className="btn btn--rani">Book a trial</a>
            <a href="#bridal" className="btn btn--line">Bridal packages</a>
          </div>
        </div>

        <div className="hero__art">
          <Mandala className="hero__mandala" />
          <figure className="hero__photo">
            <img src={img(PHOTOS.hero, 900)} alt="Bride in a red and gold lehenga with a gold matha patti" fetchPriority="high" />
          </figure>
        </div>
      </div>

      <div className="promise">
        <ul className="wrap promise__list">
          <li><strong>Female staff only</strong><span>From reception to the senior artist</span></li>
          <li><strong>Private bridal room</strong><span>Your family can sit with you</span></li>
          <li><strong>Home and venue service</strong><span>Across central Lahore</span></li>
        </ul>
      </div>
    </section>
  );
}
