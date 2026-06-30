import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import CookieBanner from "./components/CookieBanner";
import PostiWidget from "./components/PostiWidget";
import CardioBadge from "./components/CardioBadge";
import { CookieConsentProvider } from "./context/CookieConsentContext";
import { SponsorsProvider } from "./context/SponsorsContext";
import { getTourInfo } from "./utils/api";
import Home from "./pages/Home";
import Iscrizione from "./pages/Iscrizione";
import Regolamento from "./pages/Regolamento";
import Programma from "./pages/Programma";
import Contatti from "./pages/Contatti";
import Privacy from "./pages/Privacy";

export default function App() {
  const [tour, setTour] = useState(null);

  useEffect(() => {
    getTourInfo()
      .then(setTour)
      .catch(() => {});
  }, []);

  return (
    <CookieConsentProvider>
      <SponsorsProvider>
        <div className="site-wrapper">
          <Header />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/iscrizione" element={<Iscrizione />} />
              <Route path="/regolamento" element={<Regolamento />} />
              <Route path="/programma" element={<Programma />} />
              <Route path="/contatti" element={<Contatti />} />
              <Route path="/privacy" element={<Privacy />} />
            </Routes>
          </main>
          <Footer />
        </div>
        <CookieBanner />
        <PostiWidget tour={tour} />
        <CardioBadge />
      </SponsorsProvider>
    </CookieConsentProvider>
  );
}
