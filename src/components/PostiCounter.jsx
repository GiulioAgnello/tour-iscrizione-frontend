import "./PostiCounter.css";

/**
 * PostiCounter — banner urgency a tutta larghezza, sopra la hero.
 * Props: tour (oggetto da getTourInfo)
 */
export default function PostiCounter({ tour }) {
  if (!tour || tour.posti_max == null) return null;

  const { posti_max, partecipanti_totali = 0, posti_disponibili } = tour;
  const disponibili =
    posti_disponibili ?? Math.max(0, posti_max - partecipanti_totali);
  const percentuale = Math.min(
    100,
    Math.round((partecipanti_totali / posti_max) * 100),
  );

  // stato colore / urgenza
  let urgencyClass = "posti-banner--ok";
  let urgencyLabel = "";
  if (disponibili === 0) {
    urgencyClass = "posti-banner--esaurito";
    urgencyLabel = "ISCRIZIONI CHIUSE";
  } else if (disponibili <= 3) {
    urgencyClass = "posti-banner--critico";
    urgencyLabel = `ULTIMI ${disponibili} POSTI`;
  } else if (percentuale >= 70) {
    urgencyClass = "posti-banner--warning";
    urgencyLabel = "POSTI LIMITATI";
  } else {
    urgencyLabel = "ISCRIVITI ORA";
  }

  const mainText =
    disponibili === 0
      ? "Tutti i posti sono esauriti."
      : disponibili === 1
        ? "Rimane solo 1 posto — non perdere l'occasione."
        : `${disponibili} posti ancora disponibili su ${posti_max} totali.`;

  return (
    <div
      className={`posti-banner ${urgencyClass}`}
      role="status"
      aria-live="polite"
    >
      <div className="posti-banner__inner">
        {/* Badge urgenza */}
        {/* <span className="posti-banner__badge">{urgencyLabel}</span> */}

        {/* Testo principale */}
        <p className="posti-banner__text">{mainText}</p>

        {/* Progress bar */}
        <div className="posti-banner__bar-wrap">
          <div className="posti-banner__bar-track">
            <div
              className="posti-banner__bar-fill"
              style={{ width: `${percentuale}%` }}
              role="progressbar"
              aria-valuenow={partecipanti_totali}
              aria-valuemin={0}
              aria-valuemax={posti_max}
            />
          </div>
          <span className="posti-banner__bar-label">
            {partecipanti_totali}/{posti_max} partecipanti
          </span>
        </div>
      </div>
    </div>
  );
}
