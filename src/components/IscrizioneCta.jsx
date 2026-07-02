import { Link } from "react-router-dom";
import { useTour } from "../context/TourContext";

/**
 * Bottone di iscrizione riutilizzabile.
 * A iscrizioni aperte: link "Iscriviti ora" verso /iscrizione.
 * A iscrizioni chiuse: bottone spento "Iscrizioni chiuse" non cliccabile.
 */
export default function IscrizioneCta({
  className = "btn btn--primary",
  label = "Iscriviti ora",
  onClick,
}) {
  const { iscrizioniChiuse } = useTour();

  if (iscrizioniChiuse) {
    return (
      <button
        type="button"
        className={`${className} btn--closed`}
        disabled
        aria-disabled="true"
      >
        Iscrizioni chiuse
      </button>
    );
  }

  return (
    <Link to="/iscrizione" className={className} onClick={onClick}>
      {label}
    </Link>
  );
}
