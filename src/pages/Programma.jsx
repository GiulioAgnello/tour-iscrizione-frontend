import { useState, useEffect } from "react";
import { getTourInfo } from "../utils/api";
import "./Programma.css";

const DESCRIZIONE =
  "Sabato 18 luglio 2026, con partenza alle ore 20.30 da piazza S. Castromediano a Cavallino, " +
  "si terrà la nona edizione de \"l'Alba Salentina in sella\", un evento motociclistico che si svolge " +
  "completamente di notte, un modo particolare ed affascinante per promuovere il nostro magico Salento. " +
  "Anche in questa edizione il ns. intento era di promuovere il territorio, senza dimenticare la solidarietà " +
  "per i bambini di CUOREAMICO. Infatti, la quota di partecipazione di tutti i partecipanti è stata " +
  "completamente devoluta all'associazione che si occupa principalmente di migliorare le condizioni di vita " +
  "dei bambini disabili. Verranno ammesse 200 moto.";

export default function Programma() {
  const [tour, setTour] = useState(null);

  useEffect(() => {
    getTourInfo().then(setTour).catch(() => {});
  }, []);

  const tappe = tour?.programma ?? [];

  return (
    <div className="programma-page">

      {/* Hero header */}
      <div className="programma-page__header">
        <p className="section__eyebrow">Salentum Terrae in Sella</p>
        <h1 className="programma-page__title">Il Programma</h1>
      </div>

      {/* Descrizione */}
      <section className="programma-intro">
        <div className="programma-intro__container">
          <p className="programma-intro__text">{DESCRIZIONE}</p>
        </div>
      </section>

      {/* Tappe zigzag */}
      {tappe.length === 0 ? (
        <p className="programma-page__empty">Il programma verrà pubblicato a breve.</p>
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

    </div>
  );
}
