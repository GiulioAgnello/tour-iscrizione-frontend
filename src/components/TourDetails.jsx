import './TourDetails.css'
import PercorsoMappa from './PercorsoMappa'
import MapsNavButton from './MapsNavButton'

// Fallback usato solo se da WP non è ancora stato inserito il programma.
const TAPPE_FALLBACK = [
  { ora: '18:30', luogo: 'Cavallino' },
  { ora: '22:00', luogo: 'Gallipoli' },
  { ora: '01:30', luogo: 'Santa Maria di Leuca' },
  { ora: '04:30', luogo: 'Otranto' },
  { ora: '06:00', luogo: 'Muro Leccese' },
]

/** Normalizza l'orario in formato HH:MM (es. "5:00" -> "05:00", "4" -> "04:00"). */
function formatOra(value) {
  if (value == null) return ''
  const s = String(value).trim()
  const m = s.match(/^(\d{1,2})(?:[:.hH]\s*(\d{1,2}))?$/)
  if (!m) return s
  const h = m[1].padStart(2, '0')
  const min = (m[2] ?? '00').padStart(2, '0')
  return `${h}:${min}`
}

export default function TourDetails({ tour }) {
  // Sorgente unica: il programma impostato da WordPress (ti_programma).
  const tappe =
    Array.isArray(tour?.programma) && tour.programma.length > 0
      ? tour.programma.map((t) => ({ ora: formatOra(t.orario), luogo: t.luogo }))
      : TAPPE_FALLBACK

  return (
    <section className="section tour-details">
      <div className="container tour-details__grid">

        {/* Colonna sinistra — titolo + tappe + pulsante navigazione */}
        <div className="tour-details__text">
          <span className="section__eyebrow">Il percorso</span>
          <h2>Un'alba indimenticabile su due ruote</h2>

          <ol className="tour-details__tappe">
            {tappe.map(({ ora, luogo }, i) => (
              <li key={`${luogo}-${i}`} className="tour-details__tappa">
                {ora && <span className="tour-details__tappa-ora">{ora}</span>}
                <span className="tour-details__tappa-luogo">{luogo}</span>
              </li>
            ))}
          </ol>

          <MapsNavButton link={tour?.mappa_link} />
        </div>

        {/* Colonna destra — mappa (con fallback immagine) */}
        <div className="tour-details__map-col">
          <PercorsoMappa
            embedUrl={tour?.mappa_embed_url}
            image={tour?.dettagli_image}
          />
        </div>

      </div>
    </section>
  )
}
