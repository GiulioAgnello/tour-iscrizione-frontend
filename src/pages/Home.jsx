import { useSponsors } from "../context/SponsorsContext";
import { useTour } from "../context/TourContext";
import SponsorBanner from "../components/SponsorBanner";
import HeroSection from "../components/HeroSection";
import TourDetails from "../components/TourDetails";
import VideoSection from "../components/VideoSection";
import CtaSection from "../components/CtaSection";
import PostiCounter from "../components/PostiCounter";

export default function Home() {
  const { tour } = useTour();
  const { sponsors } = useSponsors();

  return (
    <>
      <PostiCounter tour={tour} />
      <HeroSection tour={tour} />
      <TourDetails tour={tour} />
      <VideoSection tour={tour} />
      <SponsorBanner sponsors={sponsors} />
      <CtaSection tour={tour} />
    </>
  );
}
