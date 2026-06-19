import './PercorsoMappa.css'

/** True se l'host appartiene a Google Maps. */
function isGoogleHost(hostname) {
  return (
    hostname === 'google.com' ||
    hostname.endsWith('.google.com') ||
    /(^|\.)google\.[a-z.]+$/.test(hostname) ||
    hostname === 'goo.gl' ||
    hostname.endsWith('.goo.gl')
  )
}

/** Embed: deve essere una mappa Google con path /maps (My Maps / Maps). */
function isValidEmbedUrl(url) {
  try {
    const { protocol, hostname, pathname } = new URL(url)
    return protocol === 'https:' && isGoogleHost(hostname) && pathname.includes('/maps')
  } catch {
    return false
  }
}

/**
 * Colonna destra della sezione "Il Percorso".
 * Priorità: iframe mappa → immagine → placeholder.
 */
export default function PercorsoMappa({ embedUrl, image }) {
  const hasMap = embedUrl && isValidEmbedUrl(embedUrl)

  return (
    <div className="percorso-mappa">
      <div className="percorso-mappa__frame">
        {hasMap ? (
          <iframe
            src={embedUrl}
            title="Percorso del tour sulla mappa"
            className="percorso-mappa__iframe"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        ) : image ? (
          <img
            src={image}
            alt="Percorso del tour in moto nel Salento"
            className="percorso-mappa__image"
            loading="lazy"
          />
        ) : (
          <div className="percorso-mappa__placeholder">
            <span>🗺️</span>
          </div>
        )}
      </div>
    </div>
  )
}
