import { useState, useEffect } from 'react'
import { getRegolamento } from '../utils/api'
import './Regolamento.css'

export default function Regolamento() {
  const [testo, setTesto]   = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getRegolamento()
      .then(d => setTesto(d?.regolamento || ''))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  return (
    <>
      <div className="page-hero">
        <div className="container">
          <h1>Regolamento</h1>
          <p>L'Alba Salentina in Sella — norme di partecipazione</p>
        </div>
      </div>

      <section className="section">
        <div className="container regolamento-wrap">
          {loading ? (
            <div className="regolamento-skeleton">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="regolamento-skeleton__line" style={{ width: `${75 + (i % 3) * 10}%` }} />
              ))}
            </div>
          ) : testo ? (
            <div
              className="regolamento-content"
              dangerouslySetInnerHTML={{ __html: testo }}
            />
          ) : (
            <div className="regolamento-content">
              <h2>Condizioni generali di partecipazione</h2>
              <p>
                La partecipazione all'evento "L'Alba Salentina in Sella" obbliga il Partecipante ad
                osservare tutte le regole di buona condotta e di rispetto della circolazione stradale,
                impegnandosi a mantenere un comportamento prudente ed una guida del proprio mezzo in
                sicurezza per sé e per gli altri.
              </p>
              <p>
                Il partecipante esonera e manleva il "MotoClub Salentum Terrae e i suoi organizzatori"
                da ogni responsabilità per danni alla propria persona, a cosa o verso terzi oltre per
                tutte le cause non menzionate che potranno verificarsi durante l'esecuzione dell'evento.
              </p>
              <h3>Informativa sulla privacy</h3>
              <p>
                Con la sottoscrizione del modulo di iscrizione si autorizza l'organizzatore dell'evento
                al trattamento dei dati personali ai sensi e per gli effetti di cui all'art. 13 del
                Regolamento UE 2016/679 (GDPR).
              </p>
              <h3>Note importanti</h3>
              <ul>
                <li>Partecipare con adeguato abbigliamento tecnico da moto (piloti e passeggeri).</li>
                <li>Partire con il pieno di carburante.</li>
                <li>Mantenere la distanza di sicurezza dagli altri equipaggi.</li>
                <li>Non ostacolare il lavoro delle staffette.</li>
                <li>Non fare gara: l'evento non è una competizione.</li>
              </ul>
            </div>
          )}
        </div>
      </section>
    </>
  )
}
