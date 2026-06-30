import { Link } from "react-router-dom";
import "./CtaSection.css";

export default function CtaSection({ tour }) {
  return (
    <section className="section section--dark cta-section">
      <div className="container cta-section__inner">
        <div className="cta-section__text">
          <span className="section__eyebrow">Non perdere l'occasione</span>
          <h2>Sei pronto a partire?</h2>
          <p>
            Iscriviti all'evento e vivi un'esperienza unica tra i paesaggi più
            belli del Salento.
            {tour?.quota &&
              ` Quota di partecipazione: ${tour.quota} a persona.`}
            {tour?.posti_max && ` Posti limitati a ${tour.posti_max} persone.`}
          </p>
        </div>

        <div className="cta-section__actions">
          <Link to="/iscrizione" className="btn btn--primary cta-section__btn">
            Iscriviti ora
          </Link>
          <Link to="/regolamento" className="btn btn--outline cta-section__btn">
            Leggi il regolamento
          </Link>
          <a
            href="https://www.facebook.com/share/1Lr65TZTCF/?mibextid=wwXIfr"
            target="_blank"
            rel="noopener noreferrer"
            className="btn cta-section__btn cta-section__btn--facebook"
          >
            <svg
              className="cta-section__fb-icon"
              viewBox="0 0 24 24"
              width="20"
              height="20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073c0 6.026 4.388 11.02 10.125 11.927v-8.437H7.078v-3.49h3.047V9.412c0-3.025 1.792-4.697 4.533-4.697 1.313 0 2.686.236 2.686.236v2.97h-1.513c-1.49 0-1.955.93-1.955 1.886v2.265h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z" />
            </svg>
            Seguici su Facebook
          </a>
        </div>
      </div>
    </section>
  );
}
