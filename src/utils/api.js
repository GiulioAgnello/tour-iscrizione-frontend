/**
 * api.js — tutte le chiamate al backend WordPress
 * Base URL configurata tramite variabile d'ambiente (vedi .env)
 */

const BASE = import.meta.env.VITE_API_BASE ?? '/wp-json/tour-iscrizione/v1'

async function request(path, options = {}) {
  const res = await fetch(`${BASE}${path}`, options)
  const json = await res.json()

  if (!res.ok) {
    const message = json?.message || json?.data?.message || 'Errore di rete.'
    throw new Error(message)
  }

  return json.data
}

// ─── Tour ──────────────────────────────────────────────────────────────────

export function getTourInfo() {
  return request('/tour-info')
}

// ─── Sponsor ───────────────────────────────────────────────────────────────

export function getSponsors() {
  return request('/sponsors')
}

// ─── Regolamento ───────────────────────────────────────────────────────────

export function getRegolamento() {
  return request('/regolamento')
}

// ─── Iscrizioni ────────────────────────────────────────────────────────────

/**
 * Invia il form di iscrizione come multipart/form-data (richiesto per la foto).
 * @param {FormData} formData
 */
export function postIscrizione(formData) {
  return request('/iscrizioni', {
    method: 'POST',
    body: formData,
    // Non impostare Content-Type: il browser lo imposta automaticamente con il boundary
  })
}

// ─── Contatti ──────────────────────────────────────────────────────────────

export function postContatti({ nome, email, messaggio }) {
  return request('/contatti', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nome, email, messaggio }),
  })
}
