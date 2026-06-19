import "./MapsNavButton.css";

function isGoogleHost(hostname) {
  return (
    hostname === "google.com" ||
    hostname.endsWith(".google.com") ||
    /(^|\.)google\.[a-z.]+$/.test(hostname) ||
    hostname === "goo.gl" ||
    hostname.endsWith(".goo.gl")
  );
}

function isValidNavLink(url) {
  try {
    const { protocol, hostname } = new URL(url);
    return protocol === "https:" && isGoogleHost(hostname);
  } catch {
    return false;
  }
}

/** Pulsante "Avvia navigazione" — visibile solo con un link Google Maps valido. */
export default function MapsNavButton({ link }) {
  if (!link || !isValidNavLink(link)) return null;

  return (
    <a
      href={link}
      className="maps-nav-btn"
      target="_blank"
      rel="noopener noreferrer"
    >
      Avvia navigazione
    </a>
  );
}
