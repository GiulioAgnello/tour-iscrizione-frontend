import "./VideoSection.css";

function getYouTubeEmbedUrl(url) {
  if (!url) return null;

  // Già un embed URL
  if (url.includes("youtube.com/embed/")) return url;

  // youtu.be/VIDEO_ID
  const shortMatch = url.match(/youtu\.be\/([^?&]+)/);
  if (shortMatch) return `https://www.youtube.com/embed/${shortMatch[1]}`;

  // youtube.com/watch?v=VIDEO_ID
  const watchMatch = url.match(/[?&]v=([^&]+)/);
  if (watchMatch) return `https://www.youtube.com/embed/${watchMatch[1]}`;

  return null;
}

export default function VideoSection({ tour }) {
  const embedUrl = getYouTubeEmbedUrl(tour?.video_youtube);

  if (!embedUrl) return null;

  return (
    <section className="video-section">
      <div className="video-section__container">
        <p className="section__eyebrow">Rivivi l'evento</p>
        <h2 className="video-section__title">I nostri Tour</h2>
        <div className="video-section__wrapper">
          <iframe
            className="video-section__iframe"
            src={embedUrl}
            title="Video del tour"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>
    </section>
  );
}
