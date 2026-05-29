import { Link } from 'react-router-dom'
import './HeroSection.css'

export default function HeroSection({ tour }) {
  const bg = tour?.hero_image || ''

  return (
    <section
      className="hero"
      style={bg ? { backgroundImage: `url(${bg})` } : undefined}
    >
      <div className="hero__overlay" />

      <div className="hero__content">
        <div className="hero__info-card">
          <span className="section__eyebrow">Evento moto</span>
          <h1 className="hero__title">{tour?.titolo || 'L\'Alba Salentina in Sella'}</h1>

          {tour?.info_breve && (
            <p className="hero__subtitle">{tour.info_breve}</p>
          )}

          <div className="hero__meta">
            {tour?.data_inizio && (
              <div className="hero__meta-item">
                <span className="hero__meta-icon">📅</span>
                <span>{tour.data_inizio}{tour.orario_raduno ? ` — ${tour.orario_raduno}` : ''}</span>
              </div>
            )}
            {tour?.luogo && (
              <div className="hero__meta-item">
                <span className="hero__meta-icon">📍</span>
                <span>{tour.luogo}</span>
              </div>
            )}
            {tour?.quota && (
              <div className="hero__meta-item">
                <span className="hero__meta-icon">💶</span>
                <span>Quota: {tour.quota}</span>
              </div>
            )}
            {tour?.posti_max && (
              <div className="hero__meta-item">
                <span className="hero__meta-icon">👥</span>
                <span>Max {tour.posti_max} posti</span>
              </div>
            )}
          </div>

          <div className="hero__actions">
            <Link to="/iscrizione" className="btn btn--primary">
              Iscriviti ora
            </Link>
            <Link to="/regolamento" className="btn btn--outline">
              Regolamento
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
