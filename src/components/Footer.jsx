import { Link } from "react-router-dom";
import { useCookieConsent } from "../context/CookieConsentContext";
import "./Footer.css";

export default function Footer() {
  const { reset } = useCookieConsent();

  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__brand">
          <span className="footer__logo">Alba Salentina in Sella</span>
          <p className="footer__tagline">Motoclub Salentum Terrae a.s.d.</p>
          <p className="footer__tagline">Codice di affiliazione FMI: 9266</p>
        </div>

        <div className="footer__middle">
          <svg
            className="footer__dae"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 120 120"
            width="56"
            height="56"
            role="img"
            aria-label="Defibrillatore Automatico Esterno (DAE)"
          >
            <rect x="8" y="6" width="104" height="108" rx="16" fill="#199E54" />
            <path
              d="M58 92 C28 70 20 50 34 38 C44 29 55 35 58 42 C61 35 72 29 82 38 C96 50 88 70 58 92 Z"
              fill="#ffffff"
            />
            <path
              d="M60 40 L46 64 L57 64 L52 82 L74 56 L62 56 L70 40 Z"
              fill="#199E54"
            />
            <rect x="84" y="20" width="20" height="6.5" rx="2" fill="#ffffff" />
            <rect x="90.75" y="13.25" width="6.5" height="20" rx="2" fill="#ffffff" />
            <text
              x="60"
              y="108"
              textAnchor="middle"
              fontFamily="Arial, Helvetica, sans-serif"
              fontSize="20"
              fontWeight="700"
              letterSpacing="1.5"
              fill="#ffffff"
            >
              DAE
            </text>
          </svg>
          <h3>Questo è un evento Cardioprotetto</h3>
        </div>

        <nav className="footer__nav">
          <Link to="/">Home</Link>
          <Link to="/iscrizione">Iscriviti</Link>
          <Link to="/programma">Programma</Link>
          <Link to="/regolamento">Regolamento</Link>
          <Link to="/contatti">Contatti</Link>
        </nav>

        <p className="footer__copy">
          © {new Date().getFullYear()} Motoclub Salentum Terrae a.s.d. Tutti i
          diritti riservati.{" "}
          <Link to="/privacy" className="footer__cookie-link">
            Privacy Policy
          </Link>
          {" · "}
          <button className="footer__cookie-link" onClick={reset}>
            Gestisci preferenze cookie
          </button>
        </p>
      </div>
      <p className="footer__disclaimer">
        Sito realizzato da{" "}
        <a href="#" target="_blank" rel="noopener noreferrer">
          Media aptitude Lecce
        </a>{" "}
      </p>
    </footer>
  );
}
