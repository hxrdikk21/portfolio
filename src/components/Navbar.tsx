'use client'

import { useState } from 'react'
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion'
import { FaBars, FaXmark } from 'react-icons/fa6'

const navLinks = [
  { label: 'Projects',   href: '#projects'   },
  { label: 'Experience', href: '#experience' },
  { label: 'Skills',     href: '#skills'     },
  { label: 'Contact',    href: '#contact'    },
]

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled]     = useState(false)
  const [hidden,   setHidden]       = useState(false)
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, 'change', (latest) => {
    const previous = scrollY.getPrevious() ?? 0
    setScrolled(latest > 20)
    if (latest > previous && latest > 150) {
      setHidden(true)
      setMobileOpen(false)
    } else {
      setHidden(false)
    }
  })

  return (
    <>
      <motion.header
        variants={{
          visible: { y: 0, opacity: 1 },
          hidden:  { y: '-150%', opacity: 0 },
        }}
        animate={hidden ? 'hidden' : 'visible'}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="fixed top-3 left-0 right-0 z-50 flex justify-center px-3 sm:px-4 md:px-6"
        aria-label="Site navigation"
      >
        <div
          className="flex items-center justify-between px-5 sm:px-6 md:px-8 py-3 w-full max-w-[1200px] rounded-2xl"
          style={{
            background: scrolled
              ? 'rgba(3, 3, 6, 0.92)'
              : 'rgba(3, 3, 6, 0.75)',
            border: '1px solid rgba(34, 211, 238, 0.12)',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            boxShadow: scrolled
              ? '0 4px 32px rgba(0,0,0,0.6), 0 0 0 1px rgba(34,211,238,0.06) inset'
              : '0 2px 16px rgba(0,0,0,0.4)',
            transition: 'background 0.3s ease, box-shadow 0.3s ease',
          }}
        >
          {/* Logo */}
          <motion.a
            href="#"
            className="text-sm sm:text-base font-extrabold tracking-tight flex items-center gap-2"
            style={{ color: '#f1f5f9' }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            aria-label="Go to top"
          >
            {/* Accent dot */}
            <span
              style={{
                width: '7px',
                height: '7px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #22d3ee, #6ee7b7)',
                boxShadow: '0 0 8px rgba(34,211,238,0.7)',
                flexShrink: 0,
                display: 'inline-block',
              }}
            />
            Hardik Sachdeva
          </motion.a>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1" aria-label="Main navigation">
            {navLinks.map((link) => (
              <motion.a
                key={link.href}
                href={link.href}
                className="relative px-4 py-2 text-sm font-medium tracking-wide rounded-lg group"
                style={{ color: '#94a3b8' }}
                whileHover={{ color: '#f1f5f9' }}
                whileTap={{ scale: 0.95 }}
              >
                {link.label}
                {/* Underline bar */}
                <span
                  className="absolute inset-x-3 bottom-1 h-[2px] rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-250 origin-left"
                  style={{
                    background: 'linear-gradient(to right, #22d3ee, #6ee7b7)',
                    boxShadow: '0 0 8px rgba(34,211,238,0.5)',
                  }}
                />
              </motion.a>
            ))}

            {/* CTA pill */}
            <motion.a
              href="mailto:hardiksachdeva.cs@gmail.com"
              className="ml-3 px-4 py-2 rounded-full text-sm font-semibold"
              style={{
                background: 'linear-gradient(135deg, rgba(34,211,238,0.15), rgba(110,231,183,0.1))',
                border: '1px solid rgba(34,211,238,0.35)',
                color: '#67e8f9',
                letterSpacing: '0.02em',
              }}
              whileHover={{
                background: 'linear-gradient(135deg, rgba(34,211,238,0.25), rgba(110,231,183,0.18))',
                borderColor: 'rgba(34,211,238,0.65)',
                boxShadow: '0 0 20px rgba(34,211,238,0.3)',
                scale: 1.04,
              }}
              whileTap={{ scale: 0.97 }}
            >
              Hire Me
            </motion.a>
          </nav>

          {/* Mobile hamburger */}
          <motion.button
            className="md:hidden w-9 h-9 rounded-xl flex items-center justify-center"
            style={{
              color: '#94a3b8',
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.1)',
            }}
            onClick={() => setMobileOpen((v) => !v)}
            whileTap={{ scale: 0.9 }}
            aria-label="Toggle mobile menu"
            aria-expanded={mobileOpen}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={mobileOpen ? 'close' : 'open'}
                initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
                animate={{ rotate: 0, opacity: 1, scale: 1 }}
                exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
                transition={{ duration: 0.15 }}
                style={{ display: 'flex', color: '#e2e8f0' }}
              >
                {mobileOpen ? <FaXmark size={15} /> : <FaBars size={15} />}
              </motion.span>
            </AnimatePresence>
          </motion.button>
        </div>
      </motion.header>

      {/* Mobile dropdown */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.97 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="fixed top-[4.5rem] left-3 right-3 z-40"
          >
            <nav
              className="flex flex-col rounded-2xl overflow-hidden"
              style={{
                background: 'rgba(4, 4, 8, 0.96)',
                border: '1px solid rgba(34,211,238,0.15)',
                backdropFilter: 'blur(24px)',
                WebkitBackdropFilter: 'blur(24px)',
                boxShadow: '0 8px 40px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.04) inset',
              }}
              aria-label="Mobile navigation"
            >
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04 }}
                  className="flex items-center gap-3 px-5 py-4 text-sm font-semibold border-b last:border-b-0"
                  style={{
                    color: '#94a3b8',
                    borderColor: 'rgba(255,255,255,0.05)',
                  }}
                  onClick={() => setMobileOpen(false)}
                  onTouchStart={(e) => {
                    e.currentTarget.style.background = 'rgba(34,211,238,0.06)'
                    e.currentTarget.style.color = '#22d3ee'
                  }}
                  onTouchEnd={(e) => {
                    e.currentTarget.style.background = ''
                    e.currentTarget.style.color = '#94a3b8'
                  }}
                >
                  {/* Left accent line */}
                  <span
                    style={{
                      width: '3px',
                      height: '14px',
                      borderRadius: '2px',
                      background: 'linear-gradient(to bottom, #22d3ee, #6ee7b7)',
                      opacity: 0.5,
                      flexShrink: 0,
                    }}
                  />
                  {link.label}
                </motion.a>
              ))}

              {/* Hire Me row */}
              <a
                href="mailto:hardiksachdeva.cs@gmail.com"
                className="flex items-center justify-center gap-2 mx-4 my-3 py-3 rounded-xl text-sm font-semibold"
                style={{
                  background: 'linear-gradient(135deg, rgba(34,211,238,0.14), rgba(110,231,183,0.09))',
                  border: '1px solid rgba(34,211,238,0.3)',
                  color: '#67e8f9',
                }}
                onClick={() => setMobileOpen(false)}
              >
                Hire Me
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
