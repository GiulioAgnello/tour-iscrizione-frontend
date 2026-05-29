import { Link } from 'react-router-dom'
import './CtaSection.css'

export default function CtaSection({ tour }) {
  return (
    <section className="section section--dark cta-section">
      <div className="container cta-section__inner">
        <div className="cta-section__text">
          <span className="section__eyebrow">Non perdere l'occasione</span>
          <h2>Sei pronto a partire?</h2>
          <p>
            Iscriviti all'evento e vivi un'esperienza unica tra i paesaggi più belli del Salento.
            {tour?.quota && ` Quota di partecipazione: ${tour.quota}.`}
            {tour?.posti_max && ` Posti limitati a ${tour.posti_max} equipaggi.`}
          </p>
        </div>

        <div className="cta-section__actions">
          <Link to="/iscrizione" className="btn btn--primary cta-section__btn">
            Iscriviti ora
          </Link>
          <Link to="/regolamento" className="btn btn--outline cta-section__btn">
            Leggi il regolamento
          </Link>
        </div>
      </div>
    </section>
  )
}
