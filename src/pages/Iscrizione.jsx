import { useState, useRef, useEffect } from "react";
import { postIscrizione, getTourInfo } from "../utils/api";
import TourInfoBar from "../components/TourInfoBar";
import "./Iscrizione.css";

const TAGLIE = ["XS", "S", "M", "L", "XL", "XXL"];

function Field({ label, required, error, children }) {
  return (
    <div className="form-group">
      <label className="form-label">
        {label}
        {required && <span className="required"> *</span>}
      </label>
      {children}
      {error && <span className="form-error">{error}</span>}
    </div>
  );
}

export default function Iscrizione() {
  const [tour, setTour] = useState(null);
  const [hasPasseggera, setHasPasseggera] = useState(null); // null | 'si' | 'no'
  const [form, setForm] = useState({
    // Motociclista
    cognome_nome: "",
    nato_a: "",
    data_nascita: "",
    residente_citta: "",
    via: "",
    cell: "",
    email: "",
    taglia: "",
    moto_modello: "",
    targa: "",
    // Passeggera
    pass_cognome_nome: "",
    pass_nato_a: "",
    pass_data_nascita: "",
    pass_residente_citta: "",
    pass_via: "",
    pass_cell: "",
    pass_email: "",
    pass_taglia: "",
  });
  const [consenso1, setConsenso1] = useState(false);
  const [consenso2, setConsenso2] = useState(false);
  const [errors, setErrors] = useState({});
  const [patenteFile, setPatenteFile] = useState(null);
  const [patentePreview, setPatentePreview] = useState(null);
  const [bonificoFile, setBonificoFile] = useState(null);
  const [bonificoPreview, setBonificoPreview] = useState(null);
  const [status, setStatus] = useState("idle");
  const [serverMsg, setServerMsg] = useState("");
  const patenteRef = useRef();
  const bonificoRef = useRef();

  useEffect(() => {
    getTourInfo().then(setTour).catch(() => {});
  }, []);

  const set = (field) => (e) =>
    setForm((f) => ({ ...f, [field]: e.target.value }));

  function handlePatente(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    setPatenteFile(file);
    setPatentePreview(URL.createObjectURL(file));
  }

  function handleBonifico(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    setBonificoFile(file);
    setBonificoPreview(
      file.type === "application/pdf" ? null : URL.createObjectURL(file),
    );
  }

  function validate() {
    const err = {};
    const required = [
      "cognome_nome",
      "nato_a",
      "data_nascita",
      "residente_citta",
      "via",
      "cell",
      "email",
      "taglia",
      "moto_modello",
      "targa",
    ];
    required.forEach((f) => {
      if (!form[f].trim()) err[f] = "Campo obbligatorio";
    });
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      err.email = "Email non valida";
    }
    if (hasPasseggera === null)
      err.hasPasseggera = "Indica se hai una passeggera";
    if (!patenteFile) err.patente = "La patente è obbligatoria";
    if (!bonificoFile) err.bonifico = "La ricevuta del bonifico è obbligatoria";
    if (!consenso1)
      err.consenso1 = "Devi accettare le condizioni di partecipazione";
    if (!consenso2)
      err.consenso2 = "Devi accettare l'informativa sulla privacy";
    return err;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const err = validate();
    if (Object.keys(err).length) {
      setErrors(err);
      return;
    }
    setErrors({});
    setStatus("loading");

    const fd = new FormData();
    Object.entries(form).forEach(([k, v]) => {
      if (v) fd.append(k, v);
    });
    fd.append("patente", patenteFile);
    fd.append("bonifico", bonificoFile);
    fd.append("consenso_partecipazione", "1");
    fd.append("consenso_privacy", "1");

    try {
      const data = await postIscrizione(fd);
      setServerMsg(data?.message || "Iscrizione inviata con successo!");
      setStatus("success");
    } catch (err) {
      setServerMsg(err.message || "Errore durante l'invio. Riprova.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="page-hero">
        <div className="container iscrizione-success">
          <div className="iscrizione-success__icon">✅</div>
          <h1>Iscrizione ricevuta!</h1>
          <p>{serverMsg}</p>
          <p className="iscrizione-success__sub">
            Controlla la tua email. Riceverai una conferma non appena il tuo
            modulo sarà valutato.
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="page-hero">
        <div className="container">
          <h1>Modulo di Iscrizione</h1>
          <p>L'Alba Salentina in Sella — compila tutti i campi obbligatori</p>
        </div>
      </div>

      <TourInfoBar tour={tour} />

      <section className="section">
        <div className="container iscrizione-form-wrap">
          <form
            onSubmit={handleSubmit}
            noValidate
            encType="multipart/form-data"
          >
            {/* ── DATI MOTOCICLISTA ── */}
            <div className="iscrizione-block">
              <h2 className="iscrizione-block__title">🏍️ Dati Motociclista</h2>
              <div className="iscrizione-grid">
                <Field
                  label="Cognome e Nome"
                  required
                  error={errors.cognome_nome}
                >
                  <input
                    className={`form-input ${errors.cognome_nome ? "error" : ""}`}
                    type="text"
                    value={form.cognome_nome}
                    onChange={set("cognome_nome")}
                    placeholder="Es. Rossi Mario"
                  />
                </Field>

                <Field label="Nato/a a" required error={errors.nato_a}>
                  <input
                    className={`form-input ${errors.nato_a ? "error" : ""}`}
                    type="text"
                    value={form.nato_a}
                    onChange={set("nato_a")}
                    placeholder="Es. Lecce"
                  />
                </Field>

                <Field
                  label="Data di nascita"
                  required
                  error={errors.data_nascita}
                >
                  <input
                    className={`form-input ${errors.data_nascita ? "error" : ""}`}
                    type="date"
                    value={form.data_nascita}
                    onChange={set("data_nascita")}
                  />
                </Field>

                <Field
                  label="Residente a"
                  required
                  error={errors.residente_citta}
                >
                  <input
                    className={`form-input ${errors.residente_citta ? "error" : ""}`}
                    type="text"
                    value={form.residente_citta}
                    onChange={set("residente_citta")}
                    placeholder="Città"
                  />
                </Field>

                <Field label="Via / Indirizzo" required error={errors.via}>
                  <input
                    className={`form-input ${errors.via ? "error" : ""}`}
                    type="text"
                    value={form.via}
                    onChange={set("via")}
                    placeholder="Es. Via Roma 12"
                  />
                </Field>

                <Field label="Cellulare" required error={errors.cell}>
                  <input
                    className={`form-input ${errors.cell ? "error" : ""}`}
                    type="tel"
                    value={form.cell}
                    onChange={set("cell")}
                    placeholder="Es. 333 1234567"
                  />
                </Field>

                <Field label="Email" required error={errors.email}>
                  <input
                    className={`form-input ${errors.email ? "error" : ""}`}
                    type="email"
                    value={form.email}
                    onChange={set("email")}
                    placeholder="Es. mario@email.com"
                  />
                </Field>

                <Field
                  label="Taglia (maglietta)"
                  required
                  error={errors.taglia}
                >
                  <select
                    className={`form-select ${errors.taglia ? "error" : ""}`}
                    value={form.taglia}
                    onChange={set("taglia")}
                  >
                    <option value="">— Seleziona —</option>
                    {TAGLIE.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </Field>

                <Field
                  label="Moto — Modello"
                  required
                  error={errors.moto_modello}
                >
                  <input
                    className={`form-input ${errors.moto_modello ? "error" : ""}`}
                    type="text"
                    value={form.moto_modello}
                    onChange={set("moto_modello")}
                    placeholder="Es. Honda CB500F"
                  />
                </Field>

                <Field label="Targa" required error={errors.targa}>
                  <input
                    className={`form-input ${errors.targa ? "error" : ""}`}
                    type="text"
                    value={form.targa}
                    onChange={set("targa")}
                    placeholder="Es. AB123CD"
                    style={{ textTransform: "uppercase" }}
                  />
                </Field>
              </div>
            </div>

            {/* ── DATI PASSEGGERA ── */}
            <div className="iscrizione-block">
              <h2 className="iscrizione-block__title">Passeggera</h2>

              <div
                className={`iscrizione-passeggera-scelta ${errors.hasPasseggera ? "error" : ""}`}
              >
                <label className="iscrizione-radio">
                  <input
                    type="radio"
                    name="has_passeggera"
                    value="si"
                    checked={hasPasseggera === "si"}
                    onChange={() => setHasPasseggera("si")}
                  />
                  <span> Sì</span>
                </label>
                <label className="iscrizione-radio">
                  <input
                    type="radio"
                    name="has_passeggera"
                    value="no"
                    checked={hasPasseggera === "no"}
                    onChange={() => setHasPasseggera("no")}
                  />
                  <span> No</span>
                </label>
              </div>
              {errors.hasPasseggera && (
                <span className="form-error">{errors.hasPasseggera}</span>
              )}

              {hasPasseggera === "si" && (
                <div
                  className="iscrizione-grid"
                  style={{ marginTop: "var(--space-md)" }}
                >
                  <Field label="Cognome e Nome">
                    <input
                      className="form-input"
                      type="text"
                      value={form.pass_cognome_nome}
                      onChange={set("pass_cognome_nome")}
                      placeholder="Es. Bianchi Giulia"
                    />
                  </Field>

                  <Field label="Nata a">
                    <input
                      className="form-input"
                      type="text"
                      value={form.pass_nato_a}
                      onChange={set("pass_nato_a")}
                      placeholder="Es. Brindisi"
                    />
                  </Field>

                  <Field label="Data di nascita">
                    <input
                      className="form-input"
                      type="date"
                      value={form.pass_data_nascita}
                      onChange={set("pass_data_nascita")}
                    />
                  </Field>

                  <Field label="Residente a">
                    <input
                      className="form-input"
                      type="text"
                      value={form.pass_residente_citta}
                      onChange={set("pass_residente_citta")}
                      placeholder="Città"
                    />
                  </Field>

                  <Field label="Via / Indirizzo">
                    <input
                      className="form-input"
                      type="text"
                      value={form.pass_via}
                      onChange={set("pass_via")}
                      placeholder="Es. Via Garibaldi 5"
                    />
                  </Field>

                  <Field label="Cellulare">
                    <input
                      className="form-input"
                      type="tel"
                      value={form.pass_cell}
                      onChange={set("pass_cell")}
                      placeholder="Es. 333 7654321"
                    />
                  </Field>

                  <Field label="Email">
                    <input
                      className="form-input"
                      type="email"
                      value={form.pass_email}
                      onChange={set("pass_email")}
                      placeholder="Es. giulia@email.com"
                    />
                  </Field>

                  <Field label="Taglia (maglietta)">
                    <select
                      className="form-select"
                      value={form.pass_taglia}
                      onChange={set("pass_taglia")}
                    >
                      <option value="">— Seleziona —</option>
                      {TAGLIE.map((t) => (
                        <option key={t} value={t}>
                          {t}
                        </option>
                      ))}
                    </select>
                  </Field>
                </div>
              )}
            </div>

            {/* ── PATENTE ── */}
            <div className="iscrizione-block">
              <h2 className="iscrizione-block__title">
                🪪 Patente di guida
                <span className="iscrizione-block__required"> *</span>
              </h2>
              <p className="iscrizione-block__desc">
                Carica una foto della patente del motociclista (JPG, PNG o WebP
                — max 5MB).
              </p>
              <div className="iscrizione-foto">
                <div
                  className={`iscrizione-foto__drop ${errors.patente ? "error" : ""}`}
                  onClick={() => patenteRef.current?.click()}
                >
                  {patentePreview ? (
                    <img
                      src={patentePreview}
                      alt="Anteprima patente"
                      className="iscrizione-foto__preview"
                    />
                  ) : (
                    <div className="iscrizione-foto__placeholder">
                      <span>📁</span>
                      <span>Clicca per selezionare la patente</span>
                      <span className="iscrizione-foto__hint">
                        JPG, PNG, WebP — max 5MB
                      </span>
                    </div>
                  )}
                </div>
                <input
                  ref={patenteRef}
                  type="file"
                  name="patente"
                  accept="image/jpeg,image/png,image/webp"
                  onChange={handlePatente}
                  style={{ display: "none" }}
                />
                {errors.patente && (
                  <span className="form-error">{errors.patente}</span>
                )}
              </div>
            </div>

            {/* ── BONIFICO ── */}
            <div className="iscrizione-block">
              <h2 className="iscrizione-block__title">
                💳 Bonifico iscrizione
                <span className="iscrizione-block__required"> *</span>
              </h2>
              <p className="iscrizione-block__desc">
                Carica la ricevuta del bonifico effettuato (JPG, PNG, WebP o PDF
                — max 5MB).
              </p>
              <div className="iscrizione-foto">
                <div
                  className={`iscrizione-foto__drop ${errors.bonifico ? "error" : ""}`}
                  onClick={() => bonificoRef.current?.click()}
                >
                  {bonificoFile ? (
                    bonificoPreview ? (
                      <img
                        src={bonificoPreview}
                        alt="Anteprima bonifico"
                        className="iscrizione-foto__preview"
                      />
                    ) : (
                      <div className="iscrizione-foto__placeholder">
                        <span>📄</span>
                        <span
                          style={{
                            color: "var(--color-primary)",
                            fontWeight: 600,
                          }}
                        >
                          {bonificoFile.name}
                        </span>
                        <span className="iscrizione-foto__hint">
                          PDF caricato — clicca per cambiare
                        </span>
                      </div>
                    )
                  ) : (
                    <div className="iscrizione-foto__placeholder">
                      <span>📁</span>
                      <span>Clicca per selezionare la ricevuta</span>
                      <span className="iscrizione-foto__hint">
                        JPG, PNG, WebP, PDF — max 5MB
                      </span>
                    </div>
                  )}
                </div>
                <input
                  ref={bonificoRef}
                  type="file"
                  name="bonifico"
                  accept="image/jpeg,image/png,image/webp,application/pdf"
                  onChange={handleBonifico}
                  style={{ display: "none" }}
                />
                {errors.bonifico && (
                  <span className="form-error">{errors.bonifico}</span>
                )}
              </div>
            </div>

            {/* ── CONSENSI ── */}
            <div className="iscrizione-block">
              <h2 className="iscrizione-block__title">
                📋 Consensi obbligatori
              </h2>

              {/* Consenso 1 */}
              <div className="consenso">
                <div className="consenso__scroll">
                  <p>
                    <strong>
                      Condizioni generali obbligatorie e liberatoria
                    </strong>
                  </p>
                  <p>
                    La partecipazione all'evento "L'ALBA SALENTINA IN SELLA"
                    obbliga il Partecipante ad osservare tutte le regole di
                    buona condotta e di rispetto della circolazione stradale,
                    impegnandosi a mantenere un comportamento prudente ed una
                    guida del proprio mezzo in sicurezza per sé e per gli altri.
                  </p>
                  <p>
                    Il partecipante esonera e manleva il "MotoClub Salentum
                    Terrae ed i suoi organizzatori" da ogni responsabilità per
                    danni alla propria persona, a cosa o verso terzi oltre per
                    tutte le cause non menzionate che potranno verificarsi
                    durante l'esecuzione dell'evento.
                  </p>
                </div>
                <label
                  className={`consenso__label ${errors.consenso1 ? "error" : ""}`}
                >
                  <input
                    type="checkbox"
                    checked={consenso1}
                    onChange={(e) => setConsenso1(e.target.checked)}
                    className="consenso__checkbox"
                  />
                  Ho letto e accetto le condizioni di partecipazione
                </label>
                {errors.consenso1 && (
                  <span className="form-error">{errors.consenso1}</span>
                )}
              </div>

              {/* Consenso 2 */}
              <div
                className="consenso"
                style={{ marginTop: "var(--space-md)" }}
              >
                <div className="consenso__scroll">
                  <p>
                    <strong>
                      Informativa sulla privacy — art. 13 Regolamento UE
                      2016/679 (GDPR)
                    </strong>
                  </p>
                  <p>
                    Con la sottoscrizione della presente si autorizza
                    l'organizzatore dell'evento al trattamento dei dati
                    personali ai sensi e per gli effetti di cui all'art. 13, del
                    Regolamento UE 2016/679 relativo alla protezione delle
                    persone fisiche con riguardo al trattamento dei dati
                    personali, nonché alla libera circolazione di tali dati e
                    che abroga la direttiva 95/46/CE, nel rispetto dei criteri
                    di correttezza e trasparenza, tutelando la sua/tua
                    riservatezza ed i suoi/tuoi diritti e per fini leciti.
                  </p>
                  <p>
                    Il trattamento sarà effettuato anche con l'ausilio di mezzi
                    informatici per tutte le finalità strettamente connesse alla
                    realizzazione dell'evento.
                  </p>
                </div>
                <label
                  className={`consenso__label ${errors.consenso2 ? "error" : ""}`}
                >
                  <input
                    type="checkbox"
                    checked={consenso2}
                    onChange={(e) => setConsenso2(e.target.checked)}
                    className="consenso__checkbox"
                  />
                  Ho letto e accetto l'informativa sulla privacy
                </label>
                {errors.consenso2 && (
                  <span className="form-error">{errors.consenso2}</span>
                )}
              </div>
            </div>

            {/* ── ERRORE SERVER ── */}
            {status === "error" && (
              <div className="alert alert--error">{serverMsg}</div>
            )}

            {/* ── SUBMIT ── */}
            <div className="iscrizione-submit">
              <button
                type="submit"
                className="btn btn--primary iscrizione-submit__btn"
                disabled={status === "loading"}
              >
                {status === "loading" ? "Invio in corso…" : "Invia iscrizione"}
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}
