import "./SectionDivider.css";

// Path riutilizzabili per le onde (viewBox 0 0 1440 120, preserveAspectRatio none).
const PATHS = {
  wave: "M0,52 C240,104 480,104 720,60 C960,16 1200,16 1440,60 L1440,120 L0,120 Z",
  waveSoft: "M0,72 C360,120 1080,24 1440,72 L1440,120 L0,120 Z",
};

/**
 * Divisore a onda tra due sezioni.
 * - top:    colore dell'area sopra l'onda (= sezione precedente)
 * - bottom: colore di riempimento dell'onda (= sezione successiva)
 * - flip:   specchia orizzontalmente (varietà tra un giunto e l'altro)
 * - accent: aggiunge una sottile onda giallo brand sopra la principale
 */
export default function SectionDivider({
  top = "var(--color-bg)",
  bottom = "var(--color-bg-alt)",
  height = 70,
  flip = false,
  accent = false,
  variant = "wave",
}) {
  const d = PATHS[variant] || PATHS.wave;

  return (
    <div
      className="section-divider"
      style={{ background: top, height: `${height}px` }}
      aria-hidden="true"
    >
      <svg
        className={`section-divider__svg${flip ? " section-divider__svg--flip" : ""}`}
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
      >
        {accent && (
          <path className="section-divider__accent" d={d} transform="translate(0,-16)" />
        )}
        <path className="section-divider__main" d={d} fill={bottom} />
      </svg>
    </div>
  );
}
