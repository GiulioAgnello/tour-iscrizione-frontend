import { createContext, useContext, useEffect, useState } from "react";
import { getTourInfo } from "../utils/api";

const TourContext = createContext(null);

export function TourProvider({ children }) {
  const [tour, setTour] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getTourInfo()
      .then(setTour)
      .catch((err) => console.error("[TourContext] Errore:", err))
      .finally(() => setLoading(false));
  }, []);

  // iscrizioni_chiuse arriva dal backend; fallback difensivo su posti_disponibili.
  const iscrizioniChiuse =
    tour?.iscrizioni_chiuse ??
    (tour?.posti_disponibili != null && tour.posti_disponibili <= 0);

  return (
    <TourContext.Provider value={{ tour, loading, iscrizioniChiuse }}>
      {children}
    </TourContext.Provider>
  );
}

export function useTour() {
  const context = useContext(TourContext);
  if (!context) {
    throw new Error("useTour deve essere usato dentro <TourProvider>");
  }
  return context;
}
