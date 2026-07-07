import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import CookieBanner from "./components/CookieBanner";
import PostiWidget from "./components/PostiWidget";
import CardioBadge from "./components/CardioBadge";
import { CookieConsentProvider } from "./context/CookieConsentContext";
import { SponsorsProvider } from "./context/SponsorsContext";
import { TourProvider, useTour } from "./context/TourContext";
import Home from "./pages/Home";
import Iscrizione from "./pages/Iscrizione";
import Regolamento from "./pages/Regolamento";
import Programma from "./pages/Programma";
import Contatti from "./pages/Contatti";
import Privacy from "./pages/Privacy";

function AppShell() {
  const { tour } = useTour();

  return (
    <div className="site-wrapper">
      <Header />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/iscrizione" element={<Iscrizione />} />
          {/* Pagina riservata iscrizioni d'eccezione — NON linkata da nessuna parte */}
          <Route
            path="/iscrizione-eccezione"
            element={<Iscrizione eccezione />}
          />
          <Route path="/regolamento" element={<Regolamento />} />
          <Route path="/programma" element={<Programma />} />
          <Route path="/contatti" element={<Contatti />} />
          <Route path="/privacy" element={<Privacy />} />
        </Routes>
      </main>
      <Footer />
      <PostiWidget tour={tour} />
    </div>
  );
}

export default function App() {
  return (
    <CookieConsentProvider>
      <SponsorsProvider>
        <TourProvider>
          <AppShell />
          <CookieBanner />
          <CardioBadge />
        </TourProvider>
      </SponsorsProvider>
    </CookieConsentProvider>
  );
}
