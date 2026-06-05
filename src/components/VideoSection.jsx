import { useCookieConsent } from '../context/CookieConsentContext'
import "./VideoSection.css";

function getYouTubeEmbedUrl(url) {
  if (!url) return null;
  if (url.includes("youtube.com/embed/")) return url;
  const shortMatch = url.match(/youtu\.be\/([^?&]+)/);
  if (shortMatch) return `https://www.youtube.com/embed/${shortMatch[1]}`;
  const watchMatch = url.match(/[?&]v=([^&]+)/);
  if (watchMatch) return `https://www.youtube.com/embed/${watchMatch[1]}`;
  return null;
}

function getYouTubeVideoId(embedUrl) {
  if (!embedUrl) return null;
  const match = embedUrl.match(/embed\/([^?&]+)/);
  return match ? match[1] : null;
}

export default function VideoSection({ tour }) {
  const { consent, accept } = useCookieConsent()
  const embedUrl = getYouTubeEmbedUrl(tour?.video_youtube);

  if (!embedUrl) return null;

  const videoId = getYouTubeVideoId(embedUrl);
  const thumbnail = videoId
    ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
    : null;

  return (
    <section className="video-section">
      <div className="video-section__container">
        <p className="section__eyebrow">Rivivi l'evento</p>
        <h2 className="video-section__title">I nostri Tour</h2>
        <div className="video-section__wrapper">
          {consent === 'accepted' ? (
            <iframe
              className="video-section__iframe"
              src={embedUrl}
              title="Video del tour"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <div
              className="video-section__placeholder"
              style={thumbnail ? { backgroundImage: `url(${thumbnail})` } : {}}
            >
              <div className="video-section__placeholder-overlay">
                <span className="video-section__play-icon">▶</span>
                <p className="video-section__placeholder-text">
                  Il video usa cookie di YouTube (Google LLC).
                </p>
                <button
                  className="video-section__consent-btn"
                  onClick={accept}
                >
                  Accetta cookie e carica il video
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
