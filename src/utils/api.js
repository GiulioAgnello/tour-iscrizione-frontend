/**
 * api.js — tutte le chiamate al backend WordPress
 * Base URL configurata tramite variabile d'ambiente (vedi .env)
 */

const BASE = import.meta.env.VITE_API_BASE ?? '/wp-json/tour-iscrizione/v1'

async function request(path, options = {}) {
  const res = await fetch(`${BASE}${path}`, options)

  // Leggo sempre il corpo come testo: se il server emette un warning/errore
  // PHP (HTML), res.json() esploderebbe nascondendo il messaggio reale.
  const raw = await res.text()

  let json
  try {
    json = JSON.parse(raw)
  } catch {
    // Risposta non-JSON (es. errore PHP in HTML): ripulisco i tag e mostro il testo grezzo.
    const clean = raw.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim()
    console.error('[api] Risposta non-JSON dal server:', raw)
    throw new Error(
      clean
        ? `Errore server: ${clean.slice(0, 300)}`
        : `Errore server (HTTP ${res.status}).`
    )
  }

  if (!res.ok) {
    const message = json?.message || json?.data?.message || 'Errore di rete.'
    throw new Error(message)
  }

  return json.data
}

// ─── Tour ──────────────────────────────────────────────────────────────────

// Cache breve dei dati del tour: evita di rifare la chiamata a ogni cambio
// pagina (navigazione istantanea). Si rinfresca dopo TOUR_TTL cosi il
// contatore "posti disponibili" resta aggiornato.
let _tourPromise = null
let _tourTs = 0
const TOUR_TTL = 30000 // 30 secondi

export function getTourInfo() {
  const now = Date.now()
  if (_tourPromise && now - _tourTs < TOUR_TTL) {
    return _tourPromise
  }
  _tourTs = now
  _tourPromise = request('/tour-info').catch((err) => {
    _tourPromise = null // non cachare gli errori: riprova al prossimo accesso
    throw err
  })
  return _tourPromise
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
