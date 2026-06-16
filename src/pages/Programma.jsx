import { useState, useEffect } from "react";
import { getTourInfo } from "../utils/api";
import "./Programma.css";
import { useSponsors } from "../context/SponsorsContext";
import SponsorBanner from "../components/SponsorBanner";

export default function Programma() {
  const [tour, setTour] = useState(null);
  const { sponsors } = useSponsors();

  useEffect(() => {
    getTourInfo()
      .then(setTour)
      .catch(() => {});
  }, []);

  const tappe = tour?.programma ?? [];

  return (
    <div className="programma-page">
      {/* Hero header */}
      <div className="programma-page__header">
        <p className="section__eyebrow">Salentum Terrae in Sella</p>
        <h1 className="programma-page__title">Il Programma</h1>
      </div>

      {/* Tappe zigzag */}
      {tappe.length === 0 ? (
        <p className="programma-page__empty">
          Il programma verrà pubblicato a breve.
        </p>
      ) : (
        <section className="programma-tappe">
          {tappe.map((tappa, i) => (
            <div
              key={i}
              className={`tappa-row ${i % 2 !== 0 ? "tappa-row--reversed" : ""}`}
            >
              {tappa.immagine ? (
                <div className="tappa-row__img-wrap">
                  <img
                    src={tappa.immagine}
                    alt={tappa.luogo}
                    className="tappa-row__img"
                    loading="lazy"
                  />
                </div>
              ) : (
                <div className="tappa-row__img-wrap tappa-row__img-wrap--empty" />
              )}
              <div className="tappa-row__content">
                <span className="tappa-row__time">{tappa.orario}</span>
                <h3 className="tappa-row__place">{tappa.luogo}</h3>
                {tappa.descrizione && (
                  <p className="tappa-row__desc">{tappa.descrizione}</p>
                )}
              </div>
            </div>
          ))}
        </section>
      )}
      <SponsorBanner sponsors={sponsors} />
    </div>
  );
}
