'use client'

import { motion } from 'framer-motion'
import {
  SiReact, SiNextdotjs, SiNodedotjs, SiExpress, SiMongodb,
  SiPython, SiTailwindcss, SiCplusplus, SiGit, SiPostman, SiVercel,
  SiJavascript, SiTypescript, SiHtml5, SiCss, SiGithub,
} from 'react-icons/si'
import { useState } from 'react'

const techStack = [
  { icon: SiReact,       name: 'React',       color: '#61DAFB' },
  { icon: SiNextdotjs,   name: 'Next.js',     color: '#FFFFFF' },
  { icon: SiNodedotjs,   name: 'Node.js',     color: '#6DA55F' },
  { icon: SiExpress,     name: 'Express',     color: '#FFFFFF' },
  { icon: SiMongodb,     name: 'MongoDB',     color: '#47A248' },
  { icon: SiPython,      name: 'Python',      color: '#3776AB' },
  { icon: SiTailwindcss, name: 'Tailwind',    color: '#06B6D4' },
  { icon: SiCplusplus,   name: 'C++',         color: '#00599C' },
  { icon: SiGit,         name: 'Git',         color: '#F05032' },
  { icon: SiPostman,     name: 'Postman',     color: '#FF6C37' },
  { icon: SiVercel,      name: 'Vercel',      color: '#FFFFFF' },
  { icon: SiJavascript,  name: 'JavaScript',  color: '#F7DF1E' },
  { icon: SiTypescript,  name: 'TypeScript',  color: '#3178C6' },
  { icon: SiHtml5,       name: 'HTML5',       color: '#E34F26' },
  { icon: SiCss,         name: 'CSS3',        color: '#1572B6' },
  { icon: SiGithub,      name: 'GitHub',      color: '#FFFFFF' },
]

// Duplicate for seamless loop
const row1 = [...techStack, ...techStack]
const row2 = [...techStack, ...techStack]

function TechItem({ tech }: { tech: typeof techStack[0] }) {
  const [hovered, setHovered] = useState(false)
  const Icon = tech.icon

  return (
    <motion.div
      className="marquee-item"
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileHover={{ scale: 1.08 }}
      transition={{ type: 'spring', stiffness: 400, damping: 20 }}
    >
      <motion.div
        className="flex flex-col items-center gap-2 px-5 py-3.5 rounded-xl cursor-default"
        animate={{
          background: hovered ? `${tech.color}12` : 'rgba(255,255,255,0.03)',
          borderColor: hovered ? `${tech.color}40` : 'rgba(255,255,255,0.07)',
          boxShadow: hovered ? `0 0 16px ${tech.color}25` : 'none',
        }}
        style={{
          border: '1px solid rgba(255,255,255,0.07)',
          backdropFilter: 'blur(8px)',
          minWidth: '80px',
        }}
        transition={{ duration: 0.2 }}
      >
        <Icon
          size={28}
          style={{ color: hovered ? tech.color : '#3d4a5c', transition: 'color 0.2s ease' }}
        />
        <span
          className="text-[10px] font-mono font-semibold tracking-wider uppercase whitespace-nowrap"
          style={{ color: hovered ? tech.color : '#2d3748', transition: 'color 0.2s ease' }}
        >
          {tech.name}
        </span>
      </motion.div>
    </motion.div>
  )
}

export default function TechMarquee() {
  return (
    <section id="skills" aria-label="Technology Skills" className="section-padding">

      {/* Header */}
      <div className="max-w-content mb-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.4 }}
        >
          <p className="text-xs font-mono uppercase tracking-widest mb-3" style={{ color: '#475569' }}>
            Toolkit
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tighter" style={{ color: '#f1f5f9' }}>
            Tech Stack &amp; Skills
          </h2>
          <p className="mt-3 text-sm max-w-lg" style={{ color: '#64748b' }}>
            Frontend, backend, ML, and DevOps — the full spectrum.
          </p>
        </motion.div>
      </div>

      {/* Marquee — pure CSS keyframe animation, no JS layout impact */}
      <div className="flex flex-col gap-4" style={{ position: 'relative' }}>

        {/* Edge fade masks */}
        <div aria-hidden="true" style={{
          pointerEvents: 'none',
          position: 'absolute',
          inset: '0 auto 0 0',
          width: '120px',
          zIndex: 10,
          background: 'linear-gradient(to right, #030303 0%, transparent 100%)',
        }} />
        <div aria-hidden="true" style={{
          pointerEvents: 'none',
          position: 'absolute',
          inset: '0 0 0 auto',
          width: '120px',
          zIndex: 10,
          background: 'linear-gradient(to left, #030303 0%, transparent 100%)',
        }} />

        {/* Row 1 — scrolls left */}
        <div className="marquee-outer">
          <div className="marquee-track marquee-track--left">
            {row1.map((tech, i) => (
              <TechItem key={`r1-${tech.name}-${i}`} tech={tech} />
            ))}
          </div>
        </div>

        {/* Row 2 — scrolls right */}
        <div className="marquee-outer">
          <div className="marquee-track marquee-track--right">
            {row2.map((tech, i) => (
              <TechItem key={`r2-${tech.name}-${i}`} tech={tech} />
            ))}
          </div>
        </div>
      </div>

      {/* Skill category cards */}
      <div className="max-w-content mt-12">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3"
        >
          {[
            {
              label: 'Frontend & UI/UX',
              color: '#22d3ee',
              skills: ['HTML','CSS', 'JavaScript','Streamlit','React', 'Next.js', 'Tailwind CSS', 'Framer Motion' ],
            },
            {
              label: 'Backend & Database',
              color: '#6ee7b7',
              skills: ['Node.js', 'Express.js', 'MongoDB','Flask', 'REST APIs'],
            },
            {
              label: 'Machine Learning',
              color: '#a78bfa',
              skills: ['Python', 'Pandas', 'scikit-learn', 'Tree Ensembles','NumPy'],
            },
            {
              label: 'Developer Tools',
              color: '#fb923c',
              skills: ['Git', 'GitHub', 'VS Code', 'Postman', 'Vercel'],
            },
          ].map((cat) => (
            <motion.div
              key={cat.label}
              className="card-glass p-5 group"
              whileHover={{ y: -4, borderColor: cat.color + '50' }}
              transition={{ type: 'spring', stiffness: 300, damping: 22 }}
            >
              <div
                className="text-xs font-bold tracking-widest uppercase mb-4"
                style={{ color: cat.color }}
              >
                {cat.label}
              </div>
              <div className="flex flex-wrap gap-1.5">
                {cat.skills.map((s) => (
                  <span
                    key={s}
                    className="px-2 py-0.5 text-[11px] rounded font-mono"
                    style={{
                      background: cat.color + '10',
                      border: `1px solid ${cat.color}20`,
                      color: '#8899aa',
                    }}
                  >
                    {s}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
