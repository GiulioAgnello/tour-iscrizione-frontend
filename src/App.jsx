import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import CookieBanner from './components/CookieBanner'
import { CookieConsentProvider } from './context/CookieConsentContext'
import Home from './pages/Home'
import Iscrizione from './pages/Iscrizione'
import Regolamento from './pages/Regolamento'
import Programma from './pages/Programma'
import Contatti from './pages/Contatti'
import Privacy from './pages/Privacy'

export default function App() {
  return (
    <CookieConsentProvider>
    <div className="site-wrapper">
      <Header />
      <main className="main-content">
        <Routes>
          <Route path="/"            element={<Home />} />
          <Route path="/iscrizione"  element={<Iscrizione />} />
          <Route path="/regolamento" element={<Regolamento />} />
          <Route path="/programma"   element={<Programma />} />
          <Route path="/contatti"    element={<Contatti />} />
          <Route path="/privacy"     element={<Privacy />} />
        </Routes>
      </main>
      <Footer />
      <CookieBanner />
    </div>
    </CookieConsentProvider>
  )
}
