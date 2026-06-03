import './SponsorBanner.css'

export default function SponsorBanner({ sponsors = [] }) {
  if (!sponsors.length) return null

  // 4x per garantire copertura full-width anche con pochi sponsor
  const items = [...sponsors, ...sponsors, ...sponsors, ...sponsors]

  return (
    <section className="sponsor-banner">
      <div className="sponsor-banner__label">Sponsor ufficiali</div>
      <div className="sponsor-banner__track-wrapper" aria-label="Sponsor ufficiali">
        <div className="sponsor-banner__track">
          {items.map((s, i) => (
            <div key={`${s.id}-${i}`} className="sponsor-banner__item">
              {s.logo ? (
                <img src={s.logo} alt={s.nome} loading="lazy" />
              ) : (
                <span className="sponsor-banner__name">{s.nome}</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
