import "./TourInfoBar.css";

function formatDate(dateStr) {
  if (!dateStr) return null;
  const [year, month, day] = dateStr.split("-");
  const mesi = [
    "gen", "feb", "mar", "apr", "mag", "giu",
    "lug", "ago", "set", "ott", "nov", "dic",
  ];
  return `${parseInt(day)} ${mesi[parseInt(month) - 1]} ${year}`;
}

export default function TourInfoBar({ tour }) {
  if (!tour) return null;

  const items = [
    tour.data_inizio && {
      icon: "📅",
      label: [formatDate(tour.data_inizio), tour.orario_raduno]
        .filter(Boolean)
        .join(" — "),
    },
    tour.luogo && { icon: "📍", label: tour.luogo },
    tour.quota && { icon: "💶", label: `Quota: ${tour.quota}` },
    tour.posti_max && { icon: "👥", label: `Max ${tour.posti_max} posti` },
  ].filter(Boolean);

  if (!items.length) return null;

  return (
    <div className="tour-info-bar">
      <div className="tour-info-bar__inner">
        {items.map(({ icon, label }, i) => (
          <div key={i} className="tour-info-bar__item">
            <span className="tour-info-bar__icon">{icon}</span>
            <span className="tour-info-bar__label">{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
