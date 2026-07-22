'use client'

import {
  useEffect, useRef, useState,
  type MouseEvent as ReactMouseEvent,
} from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { FaArrowRight, FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa6'
import {
  SiReact, SiNextdotjs, SiNodedotjs, SiExpress, SiMongodb,
  SiPython, SiTailwindcss, SiCplusplus, SiGit, SiPostman, SiVercel,
  SiJavascript, SiTypescript, SiHtml5, SiCss,
} from 'react-icons/si'
import DotBackground from './DotBackground'

// ─── Data ────────────────────────────────────────────────────────────────────

const socials = [
  { icon: FaGithub,   href: 'https://github.com/hxrdikk21',                 label: 'GitHub'   },
  { icon: FaLinkedin, href: 'https://www.linkedin.com/in/hxrdik-sachdeva/', label: 'LinkedIn' },
  { icon: FaEnvelope, href: 'mailto:hardiksachdeva.cs@gmail.com',           label: 'Email'    },
]

const ROLES = ['Developer', 'ML Engineer', 'Aspiring Entrepreneur']

const STATS = [
  { value: '5+', label: 'PROJECTS' },
  { value: '7.3', label: 'CGPA'     },
  { value: '2×',  label: 'HACKATHON WINNER' },
]

const techIcons = [
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
]
const marqueeRow = [...techIcons, ...techIcons, ...techIcons, ...techIcons]

// ─── Typewriter component ─────────────────────────────────────────────────────

function TypewriterRoles() {
  const [roleIdx, setRoleIdx]   = useState(0)
  const [displayed, setDisplayed] = useState('')
  const [deleting, setDeleting] = useState(false)
  const timeout = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    const current = ROLES[roleIdx]

    if (!deleting && displayed.length < current.length) {
      timeout.current = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 70)
    } else if (!deleting && displayed.length === current.length) {
      timeout.current = setTimeout(() => setDeleting(true), 1600)
    } else if (deleting && displayed.length > 0) {
      timeout.current = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 40)
    } else if (deleting && displayed.length === 0) {
      setDeleting(false)
      setRoleIdx((i) => (i + 1) % ROLES.length)
    }

    return () => { if (timeout.current) clearTimeout(timeout.current) }
  }, [displayed, deleting, roleIdx])

  return (
    <span className="inline-flex items-center">
      <span
        style={{
          backgroundImage: 'linear-gradient(to right, #22d3ee, #6ee7b7)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        }}
      >
        {displayed}
      </span>
      {/* blinking caret */}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.5, repeat: Infinity, repeatType: 'reverse' }}
        style={{
          display: 'inline-block',
          width: '3px',
          height: '0.85em',
          borderRadius: '2px',
          background: 'linear-gradient(to bottom, #22d3ee, #6ee7b7)',
          marginLeft: '4px',
          verticalAlign: 'middle',
        }}
      />
    </span>
  )
}

// ─── 3-D tilt profile image ─────────────────────

function ProfileImage() {
  const ref = useRef<HTMLDivElement>(null)
  const rotX = useMotionValue(0)
  const rotY = useMotionValue(0)
  const sx   = useSpring(rotX, { stiffness: 280, damping: 26 })
  const sy   = useSpring(rotY, { stiffness: 280, damping: 26 })

  const handleMove = (e: ReactMouseEvent<HTMLDivElement>) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width  - 0.5
    const y = (e.clientY - rect.top)  / rect.height - 0.5
    rotY.set(x * 16)
    rotX.set(-y * 12)
  }

  const handleLeave = () => { rotX.set(0); rotY.set(0) }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ perspective: '900px', position: 'relative', width: '280px', height: '280px', margin: '0 auto' }}
      className="w-full"
    >
      <motion.div style={{ rotateX: sx, rotateY: sy, width: '100%', height: '100%' }}>
        {/* Animated glowing gradient border ring */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: '-4px',
            borderRadius: '9999px',
            background: 'linear-gradient(135deg, #22d3ee, #6ee7b7, #a78bfa, #22d3ee)',
            backgroundSize: '300% 300%',
            animation: 'spinGradient 4s linear infinite',
            zIndex: 0,
            filter: 'blur(2px)',
          }}
        />
        {/* Dark ring gap */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: '0px',
            borderRadius: '9999px',
            background: '#030303',
            zIndex: 1,
          }}
        />

        {/* Image */}
        <motion.div
          className="aspect-square rounded-full overflow-hidden relative"
          style={{ zIndex: 2, border: '2px solid rgba(255,255,255,0.06)' }}
          whileHover={{ boxShadow: '0 0 40px rgba(34,211,238,0.35), 0 0 15px rgba(127,255,212,0.25)' }}
          transition={{ duration: 0.3 }}
        >
          <img
            src="/profile.jpg"
            alt="Hardik Sachdeva"
            className="w-full h-full object-cover scale-105"
            style={{ objectPosition: 'center 20%' }}
            loading="eager"
          />
          {/* Inner glass edge overlay */}
          <div className="absolute inset-0 rounded-full pointer-events-none"
            style={{ boxShadow: 'inset 0 0 24px rgba(255,255,255,0.04)' }} />
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

// ─── Main section ─────────────────────────────────────────────────────────────

export default function HeroSection() {
  const [hoveredTech, setHoveredTech] = useState<string | null>(null)

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-center overflow-hidden"
      aria-label="Hero"
      style={{ paddingBottom: '80px', paddingTop: '80px' }} // Account for marquee
    >
      {/* Dot grid + spotlight background */}
      <DotBackground />

      {/* Ambient float orbs */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '20%',
          left: '10%',
          width: '320px',
          height: '320px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(34,211,238,0.06) 0%, transparent 70%)',
          filter: 'blur(40px)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          bottom: '20%',
          right: '10%',
          width: '320px',
          height: '320px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(110,231,183,0.06) 0%, transparent 70%)',
          filter: 'blur(40px)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      {/* Main Orbital Container */}
      <div className="relative z-10 w-full max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-8 items-center justify-center">
        
        {/* ── LEFT ORBIT: Typography & Bio ── */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col items-center text-center order-2 lg:order-1 px-6 lg:px-0"
        >
          <h1 className="text-5xl sm:text-6xl xl:text-7xl font-extrabold tracking-tighter leading-[1.05] mb-4">
            Hardik<br/>
            <span
              style={{
                backgroundImage: 'linear-gradient(to right, #22d3ee, #6ee7b7)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Sachdeva
            </span>
          </h1>

          <div className="text-xl sm:text-2xl font-semibold mb-5" style={{ color: '#e2e8f0' }}>
            <TypewriterRoles />
          </div>

          <p className="text-base sm:text-lg leading-relaxed max-w-[340px] text-slate-400">
            CSE student at Delhi Technological University. Specializing in{' '}
            <span className="text-cyan-300 font-medium">full-stack MERN systems</span>,{' '}
            <span className="text-emerald-300 font-medium">end-to-end Machine Learning pipelines </span>, and{' '}
            <span className="text-cyan-300 font-medium">Innovative Solutions</span>.
          </p>
        </motion.div>


        {/* ── CENTER ORBIT: Profile Image + Primary CTAs + Stats ── */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex flex-col items-center justify-center order-1 lg:order-2 px-4"
        >
          {/* Central Profile Photo */}
          <motion.div
            animate={{ y: [-10, 10, -10] }}
            transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut' }}
            className="mb-10"
          >
            <ProfileImage />
          </motion.div>

          {/* Primary CTAs directly below photo */}
          <div className="flex flex-wrap items-center justify-center gap-4 mb-10">
            <motion.a
              href="#projects"
              className="group inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full font-semibold text-sm text-white"
              style={{ background: 'linear-gradient(to right, #0d9488, #059669)' }}
              whileHover={{ scale: 1.05, boxShadow: '0 0 24px rgba(127,255,212,0.5)' }}
              whileTap={{ scale: 0.97 }}
            >
              View My Work
              <FaArrowRight className="group-hover:translate-x-1 transition-transform" size={13} />
            </motion.a>
          </div>

          {/* Stats below CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            {STATS.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: 'spring', stiffness: 320, damping: 22, delay: 0.4 + i * 0.1 }}
                whileHover={{ y: -3, borderColor: 'rgba(34,211,238,0.3)', boxShadow: '0 0 15px rgba(34,211,238,0.15)' }}
                className="px-5 py-3 rounded-full flex items-center gap-2"
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  backdropFilter: 'blur(12px)',
                }}
              >
                <span style={{
                  fontSize: '1.05rem',
                  fontWeight: 800,
                  backgroundImage: 'linear-gradient(135deg, #ccfbf1, #2dd4bf)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}>
                  {s.value}
                </span>
                <span style={{
                  fontSize: '10px',
                  fontWeight: 600,
                  color: '#94a3b8',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                }}>
                  {s.label}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>


        {/* ── RIGHT ORBIT: Contact & Socials ── */}
        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col items-center text-center order-3 px-6 lg:px-0"
        >
          {/* Vertical Stack of Icons */}
          <div className="flex flex-row lg:flex-col items-center justify-center gap-4 mb-6">
            {socials.map(({ icon: Icon, href, label }) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="w-14 h-14 rounded-full flex items-center justify-center relative group"
                style={{
                  border: '1px solid rgba(255,255,255,0.22)',
                  background: 'rgba(255,255,255,0.08)',
                  backdropFilter: 'blur(16px)',
                  WebkitBackdropFilter: 'blur(16px)',
                  color: '#cbd5e1',
                  boxShadow: '0 4px 24px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.12)',
                }}
                whileHover={{
                  color: '#fff',
                  background: 'rgba(34,211,238,0.18)',
                  borderColor: 'rgba(34,211,238,0.55)',
                  scale: 1.12,
                  boxShadow: '0 0 24px rgba(34,211,238,0.4), inset 0 1px 0 rgba(255,255,255,0.2)',
                }}
                whileTap={{ scale: 0.93 }}
              >
                <Icon size={22} />
                <span className="absolute -left-20 lg:right-16 lg:left-auto opacity-0 group-hover:opacity-100 transition-opacity text-xs font-mono text-cyan-300 pointer-events-none whitespace-nowrap hidden lg:block">
                  {label}
                </span>
              </motion.a>
            ))}
          </div>

          {/* Get in touch + CTA */}
          <div className="flex flex-col items-center gap-3">
            <p className="text-sm font-medium text-slate-300">Get in touch</p>
            <motion.a
              href="#contact"
              className="inline-flex items-center justify-center px-8 py-3 rounded-full font-semibold text-sm"
              style={{
                border: '1px solid rgba(34,211,238,0.5)',
                color: '#67e8f9',
                background: 'rgba(34,211,238,0.1)',
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
                boxShadow: '0 4px 24px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.12)',
                letterSpacing: '0.03em',
              }}
              whileHover={{
                background: 'rgba(34,211,238,0.22)',
                borderColor: 'rgba(34,211,238,0.75)',
                boxShadow: '0 0 28px rgba(34,211,238,0.45), inset 0 1px 0 rgba(255,255,255,0.2)',
                scale: 1.05,
              }}
              whileTap={{ scale: 0.97 }}
            >
              Contact Me
            </motion.a>
          </div>
        </motion.div>

      </div>

      {/* ── BOTTOM ANCHOR: Tech Stack Marquee ── */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden border-t border-white/5 bg-[#030303]/80 backdrop-blur-md py-4 z-20">
        <div className="marquee-outer" style={{ maxWidth: '100vw' }}>
          <div className="marquee-track marquee-track--left" style={{ animationDuration: '60s' }}>
            {marqueeRow.map((tech, i) => {
              const Icon = tech.icon;
              const isHovered = hoveredTech === `${tech.name}-${i}`;
              return (
                <div 
                  key={`${tech.name}-${i}`} 
                  className="marquee-item flex items-center justify-center px-8 transition-all duration-300 cursor-default"
                  onMouseEnter={() => setHoveredTech(`${tech.name}-${i}`)}
                  onMouseLeave={() => setHoveredTech(null)}
                >
                  <Icon 
                    size={28} 
                    style={{ 
                      color: isHovered ? tech.color : '#334155',
                      filter: isHovered ? `drop-shadow(0 0 12px ${tech.color}60)` : 'none'
                    }} 
                    className="transition-all duration-300"
                  />
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Keyframes for gradient border spin */}
      <style>{`
        @keyframes spinGradient {
          0%   { background-position: 0% 50%; }
          50%  { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </section>
  )
}
