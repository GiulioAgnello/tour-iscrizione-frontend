import { useState } from 'react'
import { NavLink, Link } from 'react-router-dom'
import './Header.css'

const NAV_LINKS = [
  { to: '/',            label: 'Home' },
  { to: '/iscrizione',  label: 'Iscriviti' },
  { to: '/regolamento', label: 'Regolamento' },
  { to: '/contatti',    label: 'Contatti' },
]

export default function Header() {
  const [open, setOpen] = useState(false)

  return (
    <header className="header">
      <div className="header__inner">
        <Link to="/" className="header__logo">
          <img src="/logo.png" alt="Motoclub Salentum Terrae" className="header__logo-img" />
          <div className="header__logo-text-wrap">
            <span className="header__logo-text">Alba Salentina</span>
            <span className="header__logo-sub">in Sella</span>
          </div>
        </Link>

        <button
          className={`header__burger ${open ? 'header__burger--open' : ''}`}
          onClick={() => setOpen(o => !o)}
          aria-label="Menu"
          aria-expanded={open}
        >
          <span /><span /><span />
        </button>

        <nav className={`header__nav ${open ? 'header__nav--open' : ''}`}>
          {NAV_LINKS.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className={({ isActive }) =>
                `header__link ${isActive ? 'header__link--active' : ''}`
              }
              onClick={() => setOpen(false)}
            >
              {label}
            </NavLink>
          ))}
          <Link to="/iscrizione" className="btn btn--primary header__cta" onClick={() => setOpen(false)}>
            Iscriviti ora
          </Link>
        </nav>
      </div>
    </header>
  )
}
