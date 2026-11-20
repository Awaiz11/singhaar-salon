import { SALON } from "./data";

export default function Nav() {
  return (
    <header className="nav">
      <div className="wrap nav__inner">
        <a href="#top" className="nav__logo" aria-label={`${SALON.full}, back to top`}>
          <svg viewBox="-12 -12 24 24" aria-hidden="true" className="nav__mark">
            <circle r="3" />
            {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => (
              <ellipse key={a} rx="2.2" ry="4.6" cy="-7" transform={`rotate(${a})`} />
            ))}
          </svg>
          {SALON.name}
        </a>
        <nav aria-label="Main">
          <ul className="nav__links">
            <li><a href="#services">Services</a></li>
            <li><a href="#bridal">Bridal</a></li>
            <li><a href="#visit">Visit</a></li>
          </ul>
        </nav>
        <a href="#book" className="btn btn--rani btn--sm">Book a visit</a>
      </div>
    </header>
  );
}
