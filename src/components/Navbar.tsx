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
  const [hidden, setHidden] = useState(false)
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0
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
          hidden: { y: '-150%', opacity: 0 },
        }}
        animate={hidden ? "hidden" : "visible"}
        transition={{ duration: 0.35, ease: "easeInOut" }}
        className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4 md:px-6"
        aria-label="Site navigation"
      >
        <div 
          className="flex items-center justify-between px-6 md:px-8 py-3.5 w-full max-w-[1200px] rounded-2xl md:rounded-full"
          style={{
            background: 'rgba(5, 5, 8, 0.8)',
            border: '1px solid rgba(255, 255, 255, 0.07)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            boxShadow: '0 4px 24px rgba(0, 0, 0, 0.5)',
          }}
        >
          {/* Logo — Hardik Sachdeva */}
          <motion.a
            href="#"
            className="text-base sm:text-lg font-extrabold tracking-tighter"
            style={{ 
              color: '#f1f5f9', 
              transition: 'all 0.3s ease',
            }}
            whileHover={{ 
              color: '#6ee7b7',
              textShadow: '0 0 15px rgba(110, 231, 183, 0.6)'
            }}
            whileTap={{ scale: 0.97 }}
            aria-label="Go to top"
          >
            Hardik Sachdeva
          </motion.a>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-2 lg:gap-4" aria-label="Main navigation">
            {navLinks.map((link) => (
              <motion.a
                key={link.href}
                href={link.href}
                className="px-4 py-2 text-sm font-semibold tracking-wide relative group"
                style={{ color: '#94a3b8', transition: 'color 0.3s ease' }}
                whileTap={{ scale: 0.95 }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = '#22d3ee'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = '#94a3b8'
                }}
              >
                {link.label}
                <span 
                  className="absolute left-4 bottom-1 right-4 h-[2px] rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"
                  style={{ background: 'linear-gradient(to right, #22d3ee, #6ee7b7)', boxShadow: '0 0 10px rgba(34,211,238,0.5)' }}
                />
              </motion.a>
            ))}
          </nav>

          {/* Mobile hamburger */}
          <motion.button
            className="md:hidden w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300"
            style={{ 
              color: '#f1f5f9', 
              background: 'rgba(34, 211, 238, 0.05)',
              border: '1px solid rgba(34, 211, 238, 0.2)'
            }}
            onClick={() => setMobileOpen((v) => !v)}
            whileTap={{ scale: 0.9 }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = '#030303'
              e.currentTarget.style.background = 'linear-gradient(to right, #22d3ee, #6ee7b7)'
              e.currentTarget.style.boxShadow = '0 0 20px rgba(34,211,238,0.5)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = '#f1f5f9'
              e.currentTarget.style.background = 'rgba(34, 211, 238, 0.05)'
              e.currentTarget.style.boxShadow = 'none'
            }}
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
                style={{ display: 'flex' }}
              >
                {mobileOpen ? <FaXmark size={16} /> : <FaBars size={16} />}
              </motion.span>
            </AnimatePresence>
          </motion.button>
        </div>
      </motion.header>

      {/* Mobile dropdown */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="fixed top-24 left-4 right-4 z-40 flex justify-center pointer-events-none"
          >
            <nav 
              className="glass-elevated pointer-events-auto flex flex-col p-4 gap-1 rounded-2xl w-full max-w-[1200px]" 
              aria-label="Mobile navigation"
            >
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="px-5 py-3.5 text-base font-bold tracking-wide relative group"
                  style={{ color: '#94a3b8', transition: 'color 0.3s ease' }}
                  onClick={() => setMobileOpen(false)}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = '#22d3ee'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = '#94a3b8'
                  }}
                >
                  {link.label}
                  <span 
                    className="absolute left-5 bottom-2 right-5 h-[2px] rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"
                    style={{ background: 'linear-gradient(to right, #22d3ee, #6ee7b7)', boxShadow: '0 0 10px rgba(34,211,238,0.5)' }}
                  />
                </motion.a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
