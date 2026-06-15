import { Link } from "react-router-dom";
import "./PostiWidget.css";

/**
 * PostiWidget — badge fisso globale "orologetto".
 * Mostra i posti rimanenti in ogni pagina.
 * Props: tour (oggetto da getTourInfo)
 */
export default function PostiWidget({ tour }) {
  if (!tour || tour.posti_max == null) return null;

  const { posti_max, partecipanti_totali = 0, posti_disponibili } = tour;
  const disponibili =
    posti_disponibili ?? Math.max(0, posti_max - partecipanti_totali);
  const percentuale = Math.min(
    100,
    Math.round((partecipanti_totali / posti_max) * 100),
  );

  // stato urgenza
  let urgencyClass = "posti-widget--ok";
  let label = "posti disponibili";
  if (disponibili === 0) {
    urgencyClass = "posti-widget--esaurito";
    label = "ESAURITO";
  } else if (disponibili <= 3) {
    urgencyClass = "posti-widget--critico";
    label = disponibili === 1 ? "ultimo posto" : "ultimi posti";
  } else if (percentuale >= 70) {
    urgencyClass = "posti-widget--warning";
    label = "disponibili";
  }

  // SVG arc progress
  const radius = 33;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference - (percentuale / 100) * circumference;

  return (
    <Link
      to="/iscrizione"
      className={`posti-widget ${urgencyClass}`}
      aria-label={`${disponibili} posti disponibili su ${posti_max} — vai all'iscrizione`}
    >
      {/* Arc SVG */}
      <svg
        className="posti-widget__arc"
        viewBox="0 0 72 72"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* track */}
        <circle
          cx="36"
          cy="36"
          r={radius}
          fill="none"
          className="posti-widget__arc-track"
        />
        {/* fill */}
        <circle
          cx="36"
          cy="36"
          r={radius}
          fill="none"
          strokeLinecap="round"
          className="posti-widget__arc-fill"
          strokeDasharray={circumference}
          strokeDashoffset={dashOffset}
          style={{ transform: "rotate(-90deg)", transformOrigin: "center" }}
        />
      </svg>

      {/* Contenuto centrale */}
      <div className="posti-widget__body">
        {disponibili === 0 ? (
          <span className="posti-widget__num posti-widget__num--zero">0</span>
        ) : (
          <span className="posti-widget__num">{disponibili}</span>
        )}
        <span className="posti-widget__label">{label}</span>
      </div>
    </Link>
  );
}
