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
          <p className="footer__tagline">Motoclub Salentum Terrae a.s.d</p>
          <p className="footer__tagline">Codice di affiliazione FMI: 9266</p>
        </div>

        <div className="footer__middle">
          <h3>Questo è un evento Cardioprotetto</h3>
        </div>

        <nav className="footer__nav">
          <Link to="/">Home</Link>
          <Link to="/iscrizione">Iscriviti</Link>
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
