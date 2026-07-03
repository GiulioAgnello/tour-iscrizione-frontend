import { useSponsors } from "../context/SponsorsContext";
import { useTour } from "../context/TourContext";
import SponsorBanner from "../components/SponsorBanner";
import HeroSection from "../components/HeroSection";
import TourDetails from "../components/TourDetails";
import GallerySection from "../components/GallerySection";
import VideoSection from "../components/VideoSection";
import SectionDivider from "../components/SectionDivider";
import CtaSection from "../components/CtaSection";
import PostiCounter from "../components/PostiCounter";

export default function Home() {
  const { tour } = useTour();
  const { sponsors } = useSponsors();

  const hasGallery = (tour?.galleria || []).length > 0;

  return (
    <>
      <PostiCounter tour={tour} />
      <HeroSection tour={tour} />
      <TourDetails tour={tour} />

      {/* Galleria su fondo grigio, con onde su entrambi i lati (solo se ci sono foto).
          Mappa(bianco) -> Galleria(grigio) -> Video(grigio tenue). */}
      {hasGallery && (
        <>
          <SectionDivider
            top="var(--color-bg)"
            bottom="var(--color-gallery-bg)"
            variant="waveSoft"
            height={60}
          />
          <GallerySection tour={tour} />
          <SectionDivider
            top="var(--color-gallery-bg)"
            bottom="var(--color-bg-alt)"
          />
        </>
      )}

      <VideoSection tour={tour} />

      {/* grigio (Video) -> bianco (Sponsor) */}
      <SectionDivider top="var(--color-bg-alt)" bottom="#ffffff" flip />

      <SponsorBanner sponsors={sponsors} />

      {/* bianco (Sponsor) -> scuro (CTA) con accento giallo brand */}
      <SectionDivider
        top="#ffffff"
        bottom="var(--color-bg-dark)"
        accent
        flip
        height={80}
      />

      <CtaSection tour={tour} />
    </>
  );
}
