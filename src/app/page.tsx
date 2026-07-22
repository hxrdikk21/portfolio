import dynamic from 'next/dynamic'
import HeroSection from '@/components/HeroSection'

const ProjectsSection = dynamic(() => import('@/components/ProjectsSection'), { ssr: true })
const ExperienceSection = dynamic(() => import('@/components/ExperienceSection'), { ssr: true })
const CertificationsSection = dynamic(() => import('@/components/CertificationsSection'), { ssr: true })
const SkillsSection = dynamic(() => import('@/components/SkillsSection'), { ssr: true })
const ContactFooter = dynamic(() => import('@/components/ContactFooter'), { ssr: true })

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
