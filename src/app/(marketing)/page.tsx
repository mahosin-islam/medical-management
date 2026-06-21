
import FeaturesGrid from "@/components/page/Landing/FeaturesGrid"
import HowItWorks from "@/components/page/Landing/HowItWorks"
import PatientsSection from "@/components/page/Landing/PatientsSection"
import TrustedBy from "@/components/page/Landing/TrustedBy"
import BestDoctors from "@/components/page/Landing/BestDoctors"
import PartnerReadiness from "@/components/page/Landing/PartnerReadiness"
import FaqSection from "@/components/page/Landing/FaqSection"
import CtaBanner from "@/components/page/Landing/CtaBanner"
import HospitalEnvironment from "@/components/page/Landing/HospitalEnvironment"
import FeedbackSection from "@/components/page/Landing/FeedbackSection"
import Hero from "@/components/web/Hero"
import FeaturedDoctors from "@/components/page/Landing/FeaturedDoctors"

function HomePage() {
  return (
    <div>
       <Hero/>
      <div className='w-full md:px-10'>
      <FeaturedDoctors/>
      <FeaturesGrid />
      <PatientsSection />
      <HospitalEnvironment />
      <HowItWorks />
      <BestDoctors />
      <PartnerReadiness />
      <TrustedBy />
      <FeedbackSection/>
      <FaqSection />
      <CtaBanner />
    </div>
    </div>
  )
}

export default HomePage