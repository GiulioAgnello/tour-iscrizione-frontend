import { useCookieConsent } from '../context/CookieConsentContext'
import './CookieBanner.css'

export default function CookieBanner() {
  const { consent, accept, refuse } = useCookieConsent()

  if (consent !== null) return null

  return (
    <div className="cookie-banner" role="dialog" aria-label="Consenso cookie">
      <div className="cookie-banner__inner">
        <p className="cookie-banner__text">
          Questo sito usa cookie tecnici propri e, se accetti, cookie di{' '}
          <strong>YouTube (Google LLC)</strong> per la riproduzione dei video.
          I cookie di terze parti vengono caricati solo dopo il tuo consenso.
        </p>
        <div className="cookie-banner__actions">
          <button className="cookie-banner__btn cookie-banner__btn--refuse" onClick={refuse}>
            Solo necessari
          </button>
          <button className="cookie-banner__btn cookie-banner__btn--accept" onClick={accept}>
            Accetto
          </button>
        </div>
      </div>
    </div>
  )
}
