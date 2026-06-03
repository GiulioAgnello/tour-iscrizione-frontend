import { useState, useEffect } from "react";
import { getTourInfo } from "../utils/api";
import "./Programma.css";

export default function Programma() {
  const [tour, setTour] = useState(null);

  useEffect(() => {
    getTourInfo().then(setTour).catch(() => {});
  }, []);

  const tappe = tour?.programma ?? [];

  return (
    <div className="programma-page">
      {/* Header */}
      <div className="programma-page__header">
        <p className="section__eyebrow">Salentum Terrae in Sella</p>
        <h1 className="programma-page__title">Il Programma</h1>
        {tour?.data_inizio && (
          <p className="programma-page__meta">{tour.data_inizio}</p>
        )}
      </div>

      {/* Timeline */}
      <div className="programma-page__container">
        {tappe.length === 0 ? (
          <p className="programma-page__empty">
            Il programma verrà pubblicato a breve.
          </p>
        ) : (
          <ol className="timeline">
            {tappe.map((tappa, i) => (
              <li key={i} className="timeline__item">
                <div className="timeline__badge">{tappa.orario}</div>
                <div className="timeline__body">
                  {tappa.immagine && (
                    <img
                      src={tappa.immagine}
                      alt={tappa.luogo}
                      className="timeline__img"
                      loading="lazy"
                    />
                  )}
                  <div className="timeline__text">
                    <h3 className="timeline__luogo">{tappa.luogo}</h3>
                    {tappa.descrizione && (
                      <p className="timeline__desc">{tappa.descrizione}</p>
                    )}
                  </div>
                </div>
              </li>
            ))}
          </ol>
        )}
      </div>
    </div>
  );
}
