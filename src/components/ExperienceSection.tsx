'use client'

import { motion } from 'framer-motion'
import dynamic from 'next/dynamic'
import { FaTrophy, FaBriefcase, FaGraduationCap } from 'react-icons/fa6'

const GitHubCalendar = dynamic(
  () => import('react-github-calendar').then((mod) => ({ default: mod.GitHubCalendar })),
  { ssr: false }
)

const timeline = [
  {
    id: 'gemma-hackathon',
    year: 'July 2026',
    icon: FaTrophy,
    label: '1st Place — Build With Gemma Hackathon',
    sublabel: 'Google × AIMS-DTU',
    description:
      'Secured top position in the campus-wide hackathon organised by Google and AIMS-DTU. Competed against top engineering talent to build a Gemma-powered application, recognised for innovation, technical execution, and real-world impact.',
    badge: '🏆 Google Winner',
  },
  {
    id: 'campus-innovation',
    year: 'Feb 2026',
    icon: FaTrophy,
    label: '1st Place — Campus Innovation Challenge',
    sublabel: 'DTU · 50+ Competing Teams',
    description:
      'Championed out of 50+ competing tech teams for designing and pitching a high-impact technical solution. Recognised for outstanding problem-solving, presentation quality, and technical depth.',
    badge: '🥇 Winner',
  },
  {
    id: 'brainwave',
    year: 'January 2026',
    icon: FaBriefcase,
    label: 'Brainwave 2.0 — SignSync Pitch',
    sublabel: '36-Hour Hackathon Sprint',
    description:
      'Designed, prototyped, and presented SignSync — a gamified Indian Sign Language learning platform — during a comprehensive 36-hour hackathon. Delivered a polished, user-centric interface under extreme time pressure with Framer Motion and Shadcn UI.',
    badge: '💡 Presented',
  },
  {
    id: 'cse',
    year: '2025 - Present',
    icon: FaGraduationCap,
    label: 'B.Tech — CSE @ DTU',
    sublabel: 'Delhi Technological University · CGPA 7.3/10',
    description:
      'Pursuing a B.Tech in Computer Science & Engineering at Delhi Technological University (2025 – Present). Building depth in data structures, algorithms, machine learning, and system design while competing in hackathons and earning certifications from DeepLearning.AI and Kaggle.',
    badge: '🎓 Student',
  },
]

const calendarTheme = {
  dark: ['#0d1117', '#064e3b', '#065f46', '#047857', '#6ee7b7'],
}

export default function ExperienceSection() {
  return (
    <section id="experience" className="section-padding" aria-label="Experience and Achievements">
      <div className="max-w-content">

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.4 }}
          className="mb-12"
        >
          <p className="text-xs font-mono uppercase tracking-widest mb-3" style={{ color: '#475569' }}>
            Journey
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tighter" style={{ color: '#f1f5f9' }}>
            Experience &amp; Achievements
          </h2>
        </motion.div>

        {/* GitHub Contribution Calendar */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.45 }}
          className="card-glass p-6 sm:p-8 mb-10 overflow-x-auto"
        >
          <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
            <div>
              <p className="text-xs font-mono uppercase tracking-widest mb-1" style={{ color: '#475569' }}>
                GitHub Activity
              </p>
              <p className="text-sm font-semibold" style={{ color: '#f1f5f9' }}>
                Contribution Graph
              </p>
            </div>
            <span
              className="text-xs font-mono px-3 py-1 rounded-full"
              style={{
                background: 'rgba(110,231,183,0.08)',
                border: '1px solid rgba(110,231,183,0.2)',
                color: '#6ee7b7',
              }}
            >
              @hxrdikk21
            </span>
          </div>
          <div className="overflow-x-auto">
            <GitHubCalendar
              username="hxrdikk21"
              colorScheme="dark"
              theme={calendarTheme}
              fontSize={11}
              blockSize={12}
              blockMargin={3}
              style={{ color: '#64748b' }}
            />
          </div>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div
            aria-hidden="true"
            className="absolute left-5 top-0 bottom-0 w-px md:left-[calc(50%-1px)]"
            style={{ background: 'linear-gradient(to bottom, transparent, #1e2535 10%, #1e2535 90%, transparent)' }}
          />

          <div className="flex flex-col gap-8">
            {timeline.map((item, i) => {
              const Icon = item.icon
              const isLeft = i % 2 === 0
              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: isLeft ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.45, delay: i * 0.08 }}
                  className={`relative flex gap-6 md:gap-0 ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                >
                  {/* Timeline dot */}
                  <div
                    aria-hidden="true"
                    className="absolute left-5 top-5 -translate-x-1/2 md:left-1/2"
                  >
                    <div
                      className="w-9 h-9 rounded-full flex items-center justify-center"
                      style={{
                        background: 'rgba(34,211,238,0.1)',
                        border: '1px solid rgba(34,211,238,0.35)',
                        color: '#6ee7b7',
                      }}
                    >
                      <Icon size={14} />
                    </div>
                  </div>

                  {/* Card */}
                  <div className={`ml-12 md:ml-0 md:w-[46%] ${isLeft ? 'md:mr-auto md:pr-8' : 'md:ml-auto md:pl-8'}`}>
                    <motion.div
                      className="card-glass p-5 sm:p-6 group relative overflow-hidden noise-bg"
                      whileHover={{
                        y: -4,
                        scale: 1.02,
                        rotate: 1,
                        borderColor: '#22d3ee',
                      }}
                      transition={{ type: 'spring', stiffness: 280, damping: 22 }}
                    >
                      <div className="flex items-center justify-between mb-3 relative z-10">
                        <span
                          className="text-xs font-mono px-2 py-0.5 rounded"
                          style={{
                            background: 'rgba(255,255,255,0.06)',
                            color: '#6ee7b7',
                            border: '1px solid rgba(255,255,255,0.12)',
                            backdropFilter: 'blur(8px)',
                          }}
                        >
                          {item.year}
                        </span>
                        <span className="text-xs" style={{ color: '#475569' }}>
                          {item.badge}
                        </span>
                      </div>

                      <h3 className="text-base font-bold tracking-tight mb-0.5 relative z-10" style={{ color: '#f1f5f9' }}>
                        {item.label}
                      </h3>
                      <p className="text-xs mb-3 relative z-10" style={{ color: '#22d3ee' }}>
                        {item.sublabel}
                      </p>
                      <p className="text-sm leading-relaxed relative z-10" style={{ color: '#94a3b8' }}>
                        {item.description}
                      </p>
                    </motion.div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
