

import PatientsSection from "@/components/page/Landing/PatientsSection"
import FaqSection from "@/components/page/Landing/FaqSection"
import CtaBanner from "@/components/page/Landing/CtaBanner"
import FeedbackSection from "@/components/page/Landing/FeedbackSection"
import Hero from "@/components/web/Hero"
import FeaturedDoctors from "@/components/page/Landing/FeaturedDoctors"
import AboutStats from "@/components/page/Landing/AboutStats"
import HealthPackages from "@/components/page/Landing/HealthPackages"
import WhyShifaCare from "@/components/page/Landing/WhyShifaCare"
import HealthcareAnytime from "@/components/page/Landing/HealthcareAnytime"
import UpcomingEventSection from "@/components/page/Landing/UpcomingEventSection"

function HomePage() {
  return (
    <div>
       <Hero/>
      <AboutStats/>
      <FeaturedDoctors/>
      <WhyShifaCare/>
      <HealthcareAnytime/>
      <HealthPackages/>
      <UpcomingEventSection/>
      <PatientsSection />
   
      <FeedbackSection/>
      <FaqSection />
      <CtaBanner />
    </div>
   
  )
}

export default HomePage