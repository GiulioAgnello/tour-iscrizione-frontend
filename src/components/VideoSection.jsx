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

function VideoFrame({ embedUrl, consent, accept }) {
  const videoId = getYouTubeVideoId(embedUrl);
  const thumbnail = videoId
    ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
    : null;

  return (
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
  );
}

export default function VideoSection({ tour }) {
  const { consent, accept } = useCookieConsent()

  // Sorgente: array `videos` (nuovo) con fallback al singolo `video_youtube` (legacy)
  const rawList = Array.isArray(tour?.videos) && tour.videos.length
    ? tour.videos
    : (tour?.video_youtube ? [tour.video_youtube] : []);

  const embedUrls = rawList
    .map(getYouTubeEmbedUrl)
    .filter(Boolean);

  if (embedUrls.length === 0) return null;

  const gridClass = embedUrls.length === 1
    ? "video-section__grid video-section__grid--single"
    : "video-section__grid";

  return (
    <section className="video-section">
      <div className="video-section__container">
        <p className="section__eyebrow">Rivivi l'evento</p>
        <h2 className="video-section__title">I nostri Video</h2>
        <div className={gridClass}>
          {embedUrls.map((embedUrl, i) => (
            <VideoFrame
              key={i}
              embedUrl={embedUrl}
              consent={consent}
              accept={accept}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
