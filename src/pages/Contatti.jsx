import { useState } from "react";
import { postContatti } from "../utils/api";
import "./Contatti.css";

export default function Contatti() {
  const [form, setForm] = useState({ nome: "", email: "", messaggio: "" });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");
  const [serverMsg, setServerMsg] = useState("");

  const set = (f) => (e) => setForm((v) => ({ ...v, [f]: e.target.value }));

  function validate() {
    const err = {};
    if (!form.nome.trim()) err.nome = "Campo obbligatorio";
    if (!form.email.trim()) err.email = "Campo obbligatorio";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      err.email = "Email non valida";
    if (!form.messaggio.trim()) err.messaggio = "Campo obbligatorio";
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

    try {
      const data = await postContatti(form);
      setServerMsg(data?.message || "Messaggio inviato!");
      setStatus("success");
    } catch (err) {
      setServerMsg(err.message || "Errore durante l'invio. Riprova.");
      setStatus("error");
    }
  }

  return (
    <>
      <div className="page-hero">
        <div className="container">
          <h1>Contatti</h1>
          <p>
            Hai domande sull'evento? Scrivici, ti risponderemo il prima
            possibile.
          </p>
        </div>
      </div>

      <section className="section">
        <div className="container contatti-wrap">
          <div className="contatti-info">
            <h2>Informazioni</h2>
            <div className="contatti-info__items">
              <div className="contatti-info__item">
                <span className="contatti-info__icon">📞</span>
                <div>
                  <strong>Per info</strong>
                  <span>Francesco Perulli — 328 9675151</span>
                </div>
              </div>
              <div className="contatti-info__item">
                <span className="contatti-info__icon">🏁</span>
                <div>
                  <strong>Staffette</strong>
                  <span>Pino Greco — 331 3678615</span>
                </div>
              </div>
              <div className="contatti-info__item">
                <span className="contatti-info__icon">📍</span>
                <div>
                  <strong>Ritrovo</strong>
                  <span>Piazza S. Castromediano, Cavallino (LE)</span>
                </div>
              </div>
              <div className="contatti-info__item">
                <span className="contatti-info__icon">🕕</span>
                <div>
                  <strong>Orario raduno</strong>
                  <span>Ore 18:30 — partenza ore 20:30</span>
                </div>
              </div>
            </div>
          </div>

          <div className="contatti-form-wrap">
            <h2>Scrivici</h2>

            {status === "success" ? (
              <div
                className="alert alert--success"
                style={{ marginTop: "1rem" }}
              >
                ✅ {serverMsg}
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                noValidate
                className="contatti-form"
              >
                <div className="form-group">
                  <label className="form-label">
                    Nome <span className="required">*</span>
                  </label>
                  <input
                    className={`form-input ${errors.nome ? "error" : ""}`}
                    type="text"
                    value={form.nome}
                    onChange={set("nome")}
                    placeholder="Il tuo nome"
                  />
                  {errors.nome && (
                    <span className="form-error">{errors.nome}</span>
                  )}
                </div>

                <div className="form-group">
                  <label className="form-label">
                    Email <span className="required">*</span>
                  </label>
                  <input
                    className={`form-input ${errors.email ? "error" : ""}`}
                    type="email"
                    value={form.email}
                    onChange={set("email")}
                    placeholder="la-tua@email.com"
                  />
                  {errors.email && (
                    <span className="form-error">{errors.email}</span>
                  )}
                </div>

                <div className="form-group">
                  <label className="form-label">
                    Messaggio <span className="required">*</span>
                  </label>
                  <textarea
                    className={`form-textarea ${errors.messaggio ? "error" : ""}`}
                    value={form.messaggio}
                    onChange={set("messaggio")}
                    placeholder="Scrivi la tua domanda o richiesta…"
                    rows={5}
                  />
                  {errors.messaggio && (
                    <span className="form-error">{errors.messaggio}</span>
                  )}
                </div>

                {status === "error" && (
                  <div className="alert alert--error">{serverMsg}</div>
                )}

                <button
                  type="submit"
                  className="btn btn--primary contatti-submit"
                  disabled={status === "loading"}
                >
                  {status === "loading" ? "Invio in corso…" : "Invia messaggio"}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
