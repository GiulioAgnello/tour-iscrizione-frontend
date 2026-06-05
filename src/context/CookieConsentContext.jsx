import { createContext, useContext, useState } from 'react'

const STORAGE_KEY = 'cookie_consent'

const CookieConsentContext = createContext(null)

export function CookieConsentProvider({ children }) {
  const [consent, setConsent] = useState(() => localStorage.getItem(STORAGE_KEY))

  const accept = () => {
    localStorage.setItem(STORAGE_KEY, 'accepted')
    setConsent('accepted')
  }

  const refuse = () => {
    localStorage.setItem(STORAGE_KEY, 'refused')
    setConsent('refused')
  }

  const reset = () => {
    localStorage.removeItem(STORAGE_KEY)
    setConsent(null)
  }

  return (
    <CookieConsentContext.Provider value={{ consent, accept, refuse, reset }}>
      {children}
    </CookieConsentContext.Provider>
  )
}

export function useCookieConsent() {
  return useContext(CookieConsentContext)
}
