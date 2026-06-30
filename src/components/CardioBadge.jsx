import "./CardioBadge.css";

/**
 * Badge fisso "evento cardioprotetto": logo DAE sopra il widget posti.
 * Al passaggio del mouse (o focus da tastiera) mostra la scritta.
 */
export default function CardioBadge() {
  return (
    <div
      className="cardio-badge"
      tabIndex={0}
      role="img"
      aria-label="Questo è un evento cardioprotetto"
    >
      <svg
        className="cardio-badge__logo"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 120 120"
        aria-hidden="true"
      >
        <rect x="8" y="6" width="104" height="108" rx="16" fill="#199E54" />
        <path
          d="M58 92 C28 70 20 50 34 38 C44 29 55 35 58 42 C61 35 72 29 82 38 C96 50 88 70 58 92 Z"
          fill="#ffffff"
        />
        <path
          d="M60 40 L46 64 L57 64 L52 82 L74 56 L62 56 L70 40 Z"
          fill="#199E54"
        />
        <rect x="84" y="20" width="20" height="6.5" rx="2" fill="#ffffff" />
        <rect x="90.75" y="13.25" width="6.5" height="20" rx="2" fill="#ffffff" />
        <text
          x="60"
          y="108"
          textAnchor="middle"
          fontFamily="Arial, Helvetica, sans-serif"
          fontSize="20"
          fontWeight="700"
          letterSpacing="1.5"
          fill="#ffffff"
        >
          DAE
        </text>
      </svg>
      <span className="cardio-badge__tip">Questo è un evento cardioprotetto</span>
    </div>
  );
}
