import './TourDetails.css'

export default function TourDetails({ tour }) {
  return (
    <section className="section tour-details">
      <div className="container tour-details__grid">

        {/* Colonna sinistra — testo */}
        <div className="tour-details__text">
          <span className="section__eyebrow">Il percorso</span>
          <h2>Un'alba indimenticabile su due ruote</h2>

          {tour?.descrizione ? (
            <div
              className="tour-details__body"
              dangerouslySetInnerHTML={{ __html: tour.descrizione }}
            />
          ) : (
            <div className="tour-details__body">
              <p>
                L'Alba Salentina in Sella è un raduno notturno in moto che attraversa i luoghi più
                suggestivi del Salento, da Cavallino fino ad ammirare l'alba sul mare di Otranto.
              </p>
              <p>
                Un percorso unico tra storia, paesaggi e tradizioni salentine, con soste in luoghi
                iconici: Gallipoli, Santa Maria di Leuca, Otranto e Muro Leccese.
              </p>
            </div>
          )}

          {/* Tappe */}
          <div className="tour-details__tappe">
            {[
              { luogo: 'Cavallino', ora: '18:30', desc: 'Raduno – Piazza S. Castromediano' },
              { luogo: 'Gallipoli', ora: '22:00', desc: 'Visita al Centro Storico e al Castello' },
              { luogo: 'S. M. di Leuca', ora: '01:30', desc: 'Cascata Monumentale AQP' },
              { luogo: 'Otranto', ora: '04:30', desc: 'Faro di Punta Palascia – alba sul mare' },
              { luogo: 'Muro Leccese', ora: '06:00', desc: 'Colazione in Piazza del Popolo' },
            ].map(({ luogo, ora, desc }) => (
              <div key={luogo} className="tour-details__tappa">
                <div className="tour-details__tappa-ora">{ora}</div>
                <div className="tour-details__tappa-info">
                  <strong>{luogo}</strong>
                  <span>{desc}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Colonna destra — immagine */}
        <div className="tour-details__image-wrap">
          {tour?.dettagli_image ? (
            <img
              src={tour.dettagli_image}
              alt="Tour in moto nel Salento"
              className="tour-details__image"
              loading="lazy"
            />
          ) : (
            <div className="tour-details__image-placeholder">
              <span>🏍️</span>
            </div>
          )}
        </div>

      </div>
    </section>
  )
}
