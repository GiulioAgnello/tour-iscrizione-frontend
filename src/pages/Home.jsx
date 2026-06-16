import { useState, useEffect } from "react";
import { getTourInfo } from "../utils/api";
import { useSponsors } from "../context/SponsorsContext";
import SponsorBanner from "../components/SponsorBanner";
import HeroSection from "../components/HeroSection";
import TourDetails from "../components/TourDetails";
import VideoSection from "../components/VideoSection";
import CtaSection from "../components/CtaSection";
import PostiCounter from "../components/PostiCounter";

export default function Home() {
  const [tour, setTour] = useState(null);
  const { sponsors } = useSponsors();

  useEffect(() => {
    getTourInfo()
      .then(setTour)
      .catch(() => {});
  }, []);

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
