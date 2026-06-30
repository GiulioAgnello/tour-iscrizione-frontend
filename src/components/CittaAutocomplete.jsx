import { useEffect, useId, useRef, useState } from "react";
import "./CittaAutocomplete.css";

/**
 * Autocomplete città su anagrafica comuni ISTAT (public/comuni-italiani.json).
 * Controllato dal parent: ogni interazione emette onChange con l'oggetto completo.
 *
 * Props:
 *   value     -> nome città corrente (string)
 *   estero    -> true se "Estero" selezionato (bool)
 *   onChange  -> ({ nome, cap, prov, estero }) => void
 *   error     -> messaggio d'errore (string|undefined)
 *   inputRef  -> ref opzionale sull'input (per scroll/focus errori)
 *   id        -> id dell'input (per scroll/focus errori)
 *   placeholder, withEstero
 */

// Cache a livello di modulo: il JSON si carica una sola volta per tutta la pagina.
let comuniCache = null;
let comuniPromise = null;

function loadComuni() {
  if (comuniCache) return Promise.resolve(comuniCache);
  if (!comuniPromise) {
    comuniPromise = fetch(`${import.meta.env.BASE_URL}comuni-italiani.json`)
      .then((r) => r.json())
      .then((data) => {
        comuniCache = data;
        return data;
      })
      .catch((err) => {
        console.error("[CittaAutocomplete] Errore caricamento comuni:", err);
        comuniPromise = null;
        return [];
      });
  }
  return comuniPromise;
}

export default function CittaAutocomplete({
  value,
  estero = false,
  onChange,
  error,
  inputRef,
  id,
  placeholder = "Inizia a digitare la città…",
  withEstero = true,
}) {
  const autoId = useId();
  const fieldId = id || autoId;
  const [comuni, setComuni] = useState(comuniCache || []);
  const [suggestions, setSuggestions] = useState([]);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(-1);
  const wrapRef = useRef(null);

  useEffect(() => {
    if (!comuniCache) loadComuni().then(setComuni);
  }, []);

  // Chiude il dropdown al click fuori
  useEffect(() => {
    function onDocClick(e) {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  function handleInput(e) {
    const q = e.target.value;
    onChange({ nome: q, cap: "", prov: "", estero: false });

    const term = q.trim().toLowerCase();
    if (term.length < 2) {
      setSuggestions([]);
      setOpen(false);
      return;
    }
    const matches = comuni
      .filter((c) => c.nome.toLowerCase().startsWith(term))
      .slice(0, 8);
    setSuggestions(matches);
    setActive(-1);
    setOpen(matches.length > 0);
  }

  function select(c) {
    onChange({ nome: c.nome, cap: c.cap, prov: c.prov, estero: false });
    setOpen(false);
    setSuggestions([]);
  }

  function handleKeyDown(e) {
    if (!open || suggestions.length === 0) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((i) => Math.min(i + 1, suggestions.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter") {
      if (active >= 0) {
        e.preventDefault();
        select(suggestions[active]);
      }
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  }

  function toggleEstero(e) {
    if (e.target.checked) {
      onChange({ nome: "Estero", cap: "ESTERO", prov: "", estero: true });
      setOpen(false);
    } else {
      onChange({ nome: "", cap: "", prov: "", estero: false });
    }
  }

  return (
    <div className="citta-ac" ref={wrapRef}>
      <input
        id={fieldId}
        ref={inputRef}
        className={`form-input ${error ? "error" : ""}`}
        type="text"
        autoComplete="off"
        value={value}
        disabled={estero}
        placeholder={estero ? "Estero" : placeholder}
        onChange={handleInput}
        onKeyDown={handleKeyDown}
        onFocus={() => suggestions.length > 0 && setOpen(true)}
      />

      {open && (
        <ul className="citta-ac__list" role="listbox">
          {suggestions.map((c, i) => (
            <li
              key={`${c.nome}-${c.cap}`}
              role="option"
              aria-selected={i === active}
              className={`citta-ac__item ${i === active ? "active" : ""}`}
              onMouseDown={(e) => {
                e.preventDefault();
                select(c);
              }}
              onMouseEnter={() => setActive(i)}
            >
              <span className="citta-ac__nome">{c.nome}</span>
              <span className="citta-ac__meta">
                {c.prov} · {c.cap}
              </span>
            </li>
          ))}
        </ul>
      )}

      {withEstero && (
        <label className="citta-ac__estero">
          <input type="checkbox" checked={estero} onChange={toggleEstero} />
          <span>Residente / nato all'estero</span>
        </label>
      )}
    </div>
  );
}
