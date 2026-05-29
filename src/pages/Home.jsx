import { useState, useEffect } from 'react'
import { getTourInfo, getSponsors } from '../utils/api'
import HeroSection from '../components/HeroSection'
import SponsorBanner from '../components/SponsorBanner'
import TourDetails from '../components/TourDetails'
import CtaSection from '../components/CtaSection'

export default function Home() {
  const [tour, setTour]       = useState(null)
  const [sponsors, setSponsors] = useState([])

  useEffect(() => {
    getTourInfo().then(setTour).catch(() => {})
    getSponsors().then(setSponsors).catch(() => {})
  }, [])

  return (
    <>
      <HeroSection tour={tour} />
      <SponsorBanner sponsors={sponsors} />
      <TourDetails tour={tour} />
      <CtaSection tour={tour} />
    </>
  )
}
