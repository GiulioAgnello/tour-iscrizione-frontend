import { useCallback, useEffect, useRef, useState } from "react";
import "./GallerySection.css";

export default function GallerySection({ tour }) {
  const foto = tour?.galleria || [];
  const [openIndex, setOpenIndex] = useState(null);
  const [visible, setVisible] = useState(false);
  const gridRef = useRef(null);

  const isOpen = openIndex !== null;

  const close = useCallback(() => setOpenIndex(null), []);
  const prev = useCallback(
    () => setOpenIndex((i) => (i === null ? i : (i - 1 + foto.length) % foto.length)),
    [foto.length]
  );
  const next = useCallback(
    () => setOpenIndex((i) => (i === null ? i : (i + 1) % foto.length)),
    [foto.length]
  );

  // Comparsa sfalsata (movimento) quando la griglia entra nel viewport.
  useEffect(() => {
    const el = gridRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // Tastiera: Esc chiude, frecce navigano.
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e) => {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowLeft") prev();
      else if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [isOpen, close, prev, next]);

  if (foto.length === 0) return null;

  return (
    <section className="gallery">
      <div className="gallery__container">
        <p className="section__eyebrow">Momenti dei nostri Tour</p>
        <h2 className="gallery__title">Galleria</h2>

        <div
          ref={gridRef}
          className={`gallery__grid${visible ? " is-visible" : ""}`}
        >
          {foto.map((img, i) => {
            // Una cella grande (2x2) ogni 5 foto, ma solo se restano
            // almeno 5 foto: così l'ultima fascia si chiude sempre pari.
            const isBig = i % 5 === 0 && foto.length - i >= 5;
            return (
            <button
              key={img.id ?? i}
              type="button"
              className={`gallery__item${isBig ? " gallery__item--big" : ""}`}
              style={{ "--i": i }}
              onClick={() => setOpenIndex(i)}
              aria-label={`Apri foto ${i + 1}`}
            >
              <img
                className="gallery__img"
                src={img.thumb}
                alt={img.alt || ""}
                loading="lazy"
              />
              <span className="gallery__overlay" aria-hidden="true">
                <span className="gallery__zoom">⤢</span>
              </span>
            </button>
            );
          })}
        </div>
      </div>

      {isOpen && (
        <div className="gallery__lightbox" onClick={close} role="dialog" aria-modal="true">
          <button className="gallery__lb-close" onClick={close} aria-label="Chiudi">
            ✕
          </button>

          {foto.length > 1 && (
            <button
              className="gallery__lb-nav gallery__lb-nav--prev"
              onClick={(e) => {
                e.stopPropagation();
                prev();
              }}
              aria-label="Foto precedente"
            >
              ‹
            </button>
          )}

          <img
            className="gallery__lb-img"
            src={foto[openIndex].full}
            alt={foto[openIndex].alt || ""}
            onClick={(e) => e.stopPropagation()}
          />

          {foto.length > 1 && (
            <button
              className="gallery__lb-nav gallery__lb-nav--next"
              onClick={(e) => {
                e.stopPropagation();
                next();
              }}
              aria-label="Foto successiva"
            >
              ›
            </button>
          )}

          {foto.length > 1 && (
            <span className="gallery__lb-counter">
              {openIndex + 1} / {foto.length}
            </span>
          )}
        </div>
      )}
    </section>
  );
}
