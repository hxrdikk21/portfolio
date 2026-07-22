import HeroSection from '@/components/HeroSection'
import ProjectsSection from '@/components/ProjectsSection'
import ExperienceSection from '@/components/ExperienceSection'
import CertificationsSection from '@/components/CertificationsSection'
import SkillsSection from '@/components/SkillsSection'
import ContactFooter from '@/components/ContactFooter'

function SectionDivider() {
  return <div aria-hidden="true" className="section-divider" />
}

export default function Home() {
  return (
    <main className="relative z-10">
      <div className="section-hero">
        <HeroSection />
      </div>
      <SectionDivider />
      <div className="section-projects">
        <ProjectsSection />
      </div>
      <SectionDivider />
      <div className="section-experience">
        <ExperienceSection />
      </div>
      <SectionDivider />
      <div className="section-certifications">
        <CertificationsSection />
      </div>
      <SectionDivider />
      <div className="section-skills">
        <SkillsSection />
      </div>
      <SectionDivider />
      <div className="section-contact">
        <ContactFooter />
      </div>
    </main>
  )
}
