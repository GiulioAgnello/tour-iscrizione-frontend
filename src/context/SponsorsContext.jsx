import { createContext, useContext, useEffect, useState } from "react";
import { getSponsors } from "../utils/api";

const SponsorsContext = createContext(null);

export function SponsorsProvider({ children }) {
  const [sponsors, setSponsors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getSponsors()
      .then(setSponsors)
      .catch((err) => console.error("[SponsorsContext] Errore:", err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <SponsorsContext.Provider value={{ sponsors, loading }}>
      {children}
    </SponsorsContext.Provider>
  );
}

export function useSponsors() {
  const context = useContext(SponsorsContext);
  if (!context) {
    throw new Error("useSponsors deve essere usato dentro <SponsorsProvider>");
  }
  return context;
}
