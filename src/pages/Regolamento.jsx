import { useState, useEffect } from "react";
import { getRegolamento, getTourInfo } from "../utils/api";
import "./Regolamento.css";
import { useSponsors } from "../context/SponsorsContext";
import SponsorBanner from "../components/SponsorBanner";

export default function Regolamento() {
  const [testo, setTesto] = useState("");
  const [tour, setTour] = useState(null);
  const [loading, setLoading] = useState(true);
  const { sponsors } = useSponsors();

  useEffect(() => {
    getRegolamento()
      .then((d) => setTesto(d?.regolamento || ""))
      .catch(() => {})
      .finally(() => setLoading(false));
    getTourInfo()
      .then(setTour)
      .catch(() => {});
  }, []);

  return (
    <>
      <div className="page-hero">
        <div className="container">
          <h1>Regolamento</h1>
          <p>L'Alba Salentina in Sella — norme di partecipazione</p>

          {/* <div className="regolamento__meta">
            {tour?.data_inizio && (
              <div className="regolamento__meta-item">
                <span className="regolamento__meta-icon">📅</span>
                <span>{tour.data_inizio}{tour.orario_raduno ? ` — ${tour.orario_raduno}` : ''}</span>
              </div>
            )}
            {tour?.luogo && (
              <div className="regolamento__meta-item">
                <span className="regolamento__meta-icon">📍</span>
                <span>{tour.luogo}</span>
              </div>
            )}
            {tour?.quota && (
              <div className="regolamento__meta-item">
                <span className="regolamento__meta-icon">💶</span>
                <span>Quota: {tour.quota}</span>
              </div>
            )}
            {tour?.posti_max && (
              <div className="regolamento__meta-item">
                <span className="regolamento__meta-icon">👥</span>
                <span>Max {tour.posti_max} posti</span>
              </div>
            )}
          </div> */}
        </div>
      </div>

      <section className="section">
        <div className="container regolamento-wrap">
          {loading ? (
            <div className="regolamento-skeleton">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="regolamento-skeleton__line"
                  style={{ width: `${75 + (i % 3) * 10}%` }}
                />
              ))}
            </div>
          ) : testo ? (
            <div
              className="regolamento-content"
              dangerouslySetInnerHTML={{ __html: testo }}
            />
          ) : (
            <p style={{ color: "var(--color-text-muted)" }}>
              Il regolamento verrà pubblicato a breve.
            </p>
          )}
        </div>
      </section>
      <SponsorBanner sponsors={sponsors} />
    </>
  );
}
