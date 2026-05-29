import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import Iscrizione from './pages/Iscrizione'
import Regolamento from './pages/Regolamento'
import Contatti from './pages/Contatti'

export default function App() {
  return (
    <div className="site-wrapper">
      <Header />
      <main className="main-content">
        <Routes>
          <Route path="/"            element={<Home />} />
          <Route path="/iscrizione"  element={<Iscrizione />} />
          <Route path="/regolamento" element={<Regolamento />} />
          <Route path="/contatti"    element={<Contatti />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}
