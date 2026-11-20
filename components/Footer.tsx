import { SALON } from "./data";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="wrap footer__inner">
        <div>
          <p className="footer__name">{SALON.full}</p>
          <p className="footer__small">{SALON.area}</p>
        </div>
        <p className="footer__small">
          Singhaar is a concept salon. Website designed and built by{" "}
          <a href="https://nexaflow-brown.vercel.app/" target="_blank" rel="noopener noreferrer">
            NexaFlow
          </a>
          .
        </p>
      </div>
    </footer>
  );
}
