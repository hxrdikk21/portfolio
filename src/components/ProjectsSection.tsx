'use client'

import { motion, useMotionValue, useSpring } from 'framer-motion'
import { FaGithub, FaArrowUpRightFromSquare, FaTrophy } from 'react-icons/fa6'
import dynamic from 'next/dynamic'
import { useRef, useState, MouseEvent, useEffect, useCallback } from 'react'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa6'

const TerminalCard    = dynamic(() => import('./TerminalCard'),     { ssr: false })
const ArchitectureBeam = dynamic(() => import('./ArchitectureBeam'), { ssr: false })

// ─── Tilt card hook ───────────────────────────────────────────────────────────
function useTilt() {
  const ref = useRef<HTMLDivElement>(null)
  const rotateX = useMotionValue(0)
  const rotateY = useMotionValue(0)
  const sx = useSpring(rotateX, { stiffness: 300, damping: 28 })
  const sy = useSpring(rotateY, { stiffness: 300, damping: 28 })

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top)  / rect.height - 0.5
    rotateY.set(x * 14)
    rotateX.set(-y * 10)
  }

  const handleMouseLeave = () => {
    rotateX.set(0)
    rotateY.set(0)
  }

  return { ref, sx, sy, handleMouseMove, handleMouseLeave }
}

// ─── Tag pill ─────────────────────────────────────────────────────────────────
function Tag({ label }: { label: string }) {
  return (
    <span
      className="px-2.5 py-1 text-xs rounded-md font-mono"
      style={{
        background: 'rgba(255,255,255,0.05)',
        color: '#6ee7b7',
        border: '1px solid rgba(255,255,255,0.1)',
        backdropFilter: 'blur(8px)',
      }}
    >
      {label}
    </span>
  )
}

// ─── GitHub / demo icon buttons ───────────────────────────────────────────────
function IconLinks({ github, demo, name }: { github: string; demo: string; name: string }) {
  return (
    <div className="flex items-center gap-2 shrink-0">
      {[
        { href: github, icon: FaGithub,               label: `${name} GitHub`, size: 13 },
        { href: demo,   icon: FaArrowUpRightFromSquare, label: `${name} demo`,   size: 12 },
      ].map(({ href, icon: Icon, label, size }) => (
        <motion.a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          className="w-8 h-8 rounded-md flex items-center justify-center"
          style={{ border: '1px solid #1e2535', color: '#475569' }}
          whileHover={{ borderColor: '#22d3ee', color: '#7fffd4', scale: 1.08 }}
          whileTap={{ scale: 0.93 }}
          transition={{ type: 'spring', stiffness: 400, damping: 20 }}
        >
          <Icon size={size} />
        </motion.a>
      ))}
    </div>
  )
}
// ─── HostelGenie project images ──────────────────────────────────────────────
// Drop files in /public/hostelgenie/ — replace filenames to match your uploads.
const HOSTELGENIE_IMAGES = [
  {
    src: '/hostelgenie/team.png',
    alt: 'HostelGenie team photo',
  },
  {
    src: '/hostelgenie/complaints.png',
    alt: 'Complaint tracking module',
  },
  {
    src: '/hostelgenie/dashboard.png',
    alt: 'HostelGenie dashboard overview',
  }

]

// ─── SignSync hackathon images ────────────────────────────────────────────────
// Drop files in /public/signsync/ — replace filenames to match your uploads.
const SIGNSYNC_IMAGES = [
  {
    src: '/signsync/hackathon-1.jpeg',
    alt: 'Hackathon team presenting SignSync',
  },
  {
    src: '/signsync/hackathon-2.jpeg',
    alt: 'SignSync UI demo on screen',
  },
  {
    src: '/signsync/hackathon-3.jpeg',
    alt: 'Team photo at Brainwave 2.0',
  },
  {
    src: '/signsync/team-photo.jpeg',
    alt: 'Team Photo',
  },
  {
    src: '/signsync/participation-certificate.png',
    alt: 'SignSync participation certificate — Brainwave 2.0',
  },
]

// ─── Generic reusable inline carousel ────────────────────────────────────────
type CarouselImage = { src: string; alt: string }

function InlineCarousel({ images }: { images: CarouselImage[] }) {
  const [current, setCurrent] = useState(0)
  const [paused,  setPaused]  = useState(false)
  const [isTouch, setIsTouch] = useState(false)
  const n = images.length

  const prev = useCallback(() => setCurrent((c) => (c - 1 + n) % n), [n])
  const next = useCallback(() => setCurrent((c) => (c + 1) % n),     [n])

  // Detect touch/pointer device once on mount
  useEffect(() => {
    setIsTouch(window.matchMedia('(hover: none)').matches)
  }, [])

  // Auto-advance every 4 s, pause on hover
  useEffect(() => {
    if (paused) return
    const id = setInterval(next, 4000)
    return () => clearInterval(id)
  }, [paused, next])

  const img = images[current]

  return (
    <div
      className="ss-carousel"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-label="Project gallery"
    >
      {/* Main image frame */}
      <div className="ss-carousel__frame">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          key={img.src}
          src={img.src}
          alt={img.alt}
          className="ss-carousel__img"
          loading="lazy"
          decoding="async"
          onError={(e) => {
            ;(e.currentTarget as HTMLImageElement).style.display = 'none'
            const frame = e.currentTarget.parentElement
            if (frame) frame.classList.add('ss-carousel__frame--fallback')
          }}
        />
        {/* Fallback shown when image is missing */}
        <div className="ss-carousel__fallback" aria-hidden="true">
          <span>{img.alt[0]}</span>
        </div>
        {/* Prev / Next — always visible on touch, hover-reveal on pointer */}
        <button
          className="ss-carousel__nav ss-carousel__nav--prev"
          style={isTouch ? { opacity: 0.8, width: '2.5rem', height: '2.5rem' } : undefined}
          onClick={prev}
          aria-label="Previous image"
        >
          <FaChevronLeft />
        </button>
        <button
          className="ss-carousel__nav ss-carousel__nav--next"
          style={isTouch ? { opacity: 0.8, width: '2.5rem', height: '2.5rem' } : undefined}
          onClick={next}
          aria-label="Next image"
        >
          <FaChevronRight />
        </button>
      </div>

      {/* Dot strip */}
      <div className="ss-carousel__dots" role="tablist" aria-label="Gallery navigation">
        {images.map((_, i) => (
          <button
            key={i}
            role="tab"
            aria-selected={i === current}
            aria-label={`Go to image ${i + 1}`}
            className={`ss-carousel__dot${i === current ? ' ss-carousel__dot--active' : ''}`}
            onClick={() => setCurrent(i)}
          />
        ))}
      </div>
    </div>
  )
}


// ─── CARD 1 — HostelGenie (large, 2-col, with architecture beam) ──────────────
function HostelGenieCard() {
  return (
    <motion.article
      id="card-hostelgenie"
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.45 }}
      className="card-glass noise-bg md:col-span-2 overflow-hidden group"
      aria-labelledby="hostelgenie-title"
    >
      {/* ── Two-column layout: left = text+carousel, right = architecture beam ── */}
      <div className="flex flex-col lg:flex-row gap-0 h-full">

        {/* Left pane — text + carousel */}
        <div className="p-6 sm:p-8 flex flex-col gap-4 lg:w-1/2">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-mono mb-1.5" style={{ color: '#475569' }}>
                Full-Stack Hostel Management System
              </p>
              <h3
                id="hostelgenie-title"
                className="text-2xl sm:text-3xl font-bold tracking-tighter"
                style={{ color: '#f1f5f9' }}
              >
                HostelGenie
              </h3>
            </div>
            <IconLinks
              github="https://github.com/hxrdikk21/hostelgenie-hub"
              demo="#"
              name="HostelGenie"
            />
          </div>

          <p className="text-sm leading-relaxed" style={{ color: '#94a3b8' }}>
            A full-stack hostel management system custom-tailored for university ecosystems to streamline
            and digitize daily residential operations. Engineered a robust automated complaint tracking
            module to drastically reduce resolution times, paired with a fully responsive modern UI.
          </p>

          <div className="flex flex-wrap gap-2">
            {['React', 'Node.js', 'Express.js', 'MongoDB', 'Tailwind CSS', 'REST API'].map((t) => (
              <Tag key={t} label={t} />
            ))}
          </div>

          {/* Photo carousel — sits right below the tags */}
          <InlineCarousel images={HOSTELGENIE_IMAGES} />
        </div>

        {/* Right pane — architecture beam, hidden on mobile, full vertical height on desktop */}
        <div
          className="hidden lg:flex lg:w-1/2 flex-col border-l"
          style={{ borderColor: 'rgba(255,255,255,0.06)' }}
        >
          <p className="text-[10px] font-mono uppercase tracking-widest px-6 pt-6 pb-2" style={{ color: '#2d3748' }}>
            System Architecture
          </p>
          {/* beam div: flex-1 so it fills all remaining height */}
          <div className="flex-1 px-4 pb-6 min-h-0">
            <ArchitectureBeam />
          </div>
        </div>
      </div>

    </motion.article>
  )
}

// ─── CARD 2 — SignSync (1-col, 3D tilt, hackathon badge) ─────────────────────
function SignSyncCard() {
  const { ref, sx, sy, handleMouseMove, handleMouseLeave } = useTilt()

  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.45, delay: 0.1 }}
      style={{ perspective: '900px' }}
    >
      <motion.article
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX: sx, rotateY: sy }}
        className="card-glass noise-bg p-6 sm:p-8 flex flex-col gap-5 h-full group relative overflow-hidden cursor-default"
        aria-labelledby="signsync-title"
      >
        {/* Hackathon badge — inline on mobile, absolute on sm+ to avoid overlap */}
        <div className="sm:absolute sm:top-4 sm:right-4 mb-2 sm:mb-0 self-start flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-bold tracking-wider"
          style={{
            background: 'linear-gradient(135deg, rgba(251,146,60,0.2), rgba(251,146,60,0.05))',
            border: '1px solid rgba(251,146,60,0.3)',
            color: '#fb923c',
          }}
        >
          <FaTrophy size={9} />
          Brainwave 2.0 · 36hr Sprint
        </div>

        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-mono mb-1.5" style={{ color: '#475569' }}>
              Gamified ISL Learning Platform
            </p>
            <h3
              id="signsync-title"
              className="text-xl sm:text-2xl font-bold tracking-tighter"
              style={{ color: '#f1f5f9' }}
            >
              SignSync
            </h3>
          </div>
        </div>

        <IconLinks
          github="https://github.com/hxrdikk21"
          demo="#"
          name="SignSync"
        />

        <p className="text-sm leading-relaxed" style={{ color: '#94a3b8' }}>
          A gamified, immersive educational platform designed to teach Indian Sign Language (ISL)
          interactively. Built during a high-pressure 36-hour hackathon sprint with next-level UI
          components, intuitive visual feedback, and rapid prototyping under strict time constraints.
        </p>

        {/* Hackathon gallery */}
        <InlineCarousel images={SIGNSYNC_IMAGES} />

        <div className="flex flex-wrap gap-2 mt-auto">
          {['React', 'Tailwind CSS', 'Framer Motion', 'AI/ML'].map((t) => (
            <Tag key={t} label={t} />
          ))}
        </div>

        {/* Glow on hover */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-500 rounded-[inherit]"
          style={{
            background: 'radial-gradient(ellipse at 50% 100%, rgba(251,146,60,0.07) 0%, transparent 70%)',
          }}
        />
      </motion.article>
    </motion.div>
  )
}

// ─── CARD 3 — ML Pipeline with live terminal ──────────────────────────────────
function MLCard() {
  return (
    <motion.article
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.45, delay: 0.2 }}
      className="card-glass noise-bg overflow-hidden group flex flex-col"
      aria-labelledby="ml-title"
    >
      {/* Terminal */}
      <div className="flex-1 p-0" style={{ minHeight: '280px' }}>
        <TerminalCard />
      </div>

      {/* Text below */}
      <div className="p-6 sm:p-7 flex flex-col gap-4 border-t" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-mono mb-1.5" style={{ color: '#475569' }}>
              ML-Powered Content-Based Filtering
            </p>
            <h3
              id="ml-title"
              className="text-xl sm:text-2xl font-bold tracking-tighter"
              style={{ color: '#f1f5f9' }}
            >
              Movie Recommendation System
            </h3>
          </div>
          <IconLinks
            github="https://github.com/hxrdikk21/movies-recommendation-system"
            demo="#"
            name="Movie Recommendation Engine"
          />
        </div>

        <p className="text-sm leading-relaxed" style={{ color: '#94a3b8' }}>
         An automated recommendation engine that processes movie datasets to identify and display relevant suggestions, complete with dynamic poster fetching
        </p>

        <div className="flex flex-wrap gap-2 mt-auto">
          {['Python', 'Pandas', 'KNN', 'Content-Based Filtering', 'scikit-learn'].map((t) => (
            <Tag key={t} label={t} />
          ))}
        </div>
      </div>
    </motion.article>
  )
}

// ─── Main Section ─────────────────────────────────────────────────────────────
export default function ProjectsSection() {
  return (
    <section id="projects" className="section-padding" aria-label="Featured Projects">
      <div className="max-w-content">

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.4 }}
          className="mb-12"
        >
          <p className="text-xs font-mono uppercase tracking-widest mb-3" style={{ color: '#475569' }}>
            Selected Work
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tighter" style={{ color: '#f1f5f9' }}>
            Featured Projects
          </h2>
        </motion.div>

        {/* Asymmetric Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <HostelGenieCard />
          <SignSyncCard />
          <MLCard />
        </div>
      </div>
    </section>
  )
}
