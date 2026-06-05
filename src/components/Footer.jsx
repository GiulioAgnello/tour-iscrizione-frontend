import { Link } from 'react-router-dom'
import { useCookieConsent } from '../context/CookieConsentContext'
import './Footer.css'

export default function Footer() {
  const { reset } = useCookieConsent()

  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__brand">
          <span className="footer__logo">Alba Salentina in Sella</span>
          <p className="footer__tagline">Motoclub Salentum Terrae ASD</p>
        </div>

        <nav className="footer__nav">
          <Link to="/">Home</Link>
          <Link to="/iscrizione">Iscriviti</Link>
          <Link to="/regolamento">Regolamento</Link>
          <Link to="/contatti">Contatti</Link>
        </nav>

        <p className="footer__copy">
          © {new Date().getFullYear()} Motoclub Salentum Terrae ASD. Tutti i diritti riservati.{' '}
          <button className="footer__cookie-link" onClick={reset}>
            Gestisci preferenze cookie
          </button>
        </p>
      </div>
    </footer>
  )
}
