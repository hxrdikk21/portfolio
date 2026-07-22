'use client'

import { motion } from 'framer-motion'
import { FaGithub, FaLinkedin, FaEnvelope, FaArrowUpRightFromSquare } from 'react-icons/fa6'

const links = [
  {
    icon: FaGithub,
    label: 'GitHub',
    href: 'https://github.com/hxrdikk21',
    description: 'Source code & open source',
  },
  {
    icon: FaLinkedin,
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/hxrdik-sachdeva/',
    description: 'Professional profile',
  },
  {
    icon: FaEnvelope,
    label: 'Email',
    href: 'mailto:hardiksachdeva.cs@gmail.com',
    description: 'hardiksachdeva.cs@gmail.com',
  },
]

export default function ContactFooter() {
  return (
    <footer id="contact" className="section-padding" aria-label="Contact">
      <div className="max-w-content">

        {/* Divider */}
        <div aria-hidden="true" className="h-px mb-16" style={{ background: '#1e2535' }} />

        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-12">

          {/* Left */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
            className="max-w-sm"
          >


            <p className="text-xs font-mono uppercase tracking-widest mb-3" style={{ color: '#475569' }}>
              Get in Touch
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tighter mb-4" style={{ color: '#f1f5f9' }}>
              Let&rsquo;s build
              <br />
              <span
                style={{
                  backgroundImage: 'linear-gradient(to right, #22d3ee, #6ee7b7)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                something great.
              </span>
            </h2>
            <p className="text-sm leading-relaxed" style={{ color: '#94a3b8' }}>
              Whether you have a project idea, internship opportunity, or just want to connect —
              I&apos;m always open to a conversation.
            </p>
          </motion.div>

          {/* Links */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.1 }}
            className="flex flex-col gap-3"
          >
            {links.map(({ icon: Icon, label, href, description }) => (
              <motion.a
                key={label}
                href={href}
                target={href.startsWith('http') ? '_blank' : undefined}
                rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                aria-label={`${label} — ${description}`}
                className="group flex items-center gap-4 px-5 py-3.5 rounded-lg"
                style={{
                  border: '1px solid rgba(255,255,255,0.07)',
                  background: 'rgba(255,255,255,0.04)',
                  backdropFilter: 'blur(12px)',
                  WebkitBackdropFilter: 'blur(12px)',
                  transition: 'border-color 0.2s ease',
                }}
                whileHover={{ borderColor: '#22d3ee', y: -2 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: 'spring', stiffness: 300, damping: 24 }}
              >
                <div
                  className="w-8 h-8 rounded-md flex items-center justify-center shrink-0"
                  style={{
                    background: 'rgba(34,211,238,0.1)',
                    border: '1px solid rgba(34,211,238,0.2)',
                    color: '#6ee7b7',
                  }}
                >
                  <Icon size={14} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium" style={{ color: '#f1f5f9' }}>{label}</p>
                  <p className="text-xs truncate" style={{ color: '#475569' }}>{description}</p>
                </div>
                <FaArrowUpRightFromSquare
                  size={12}
                  className="shrink-0 opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all duration-200"
                  style={{ color: '#6ee7b7' }}
                />
              </motion.a>
            ))}
          </motion.div>
        </div>

        {/* Bottom bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mt-16 pt-6"
          style={{ borderTop: '1px solid #1e2535' }}
        >
          <p
            className="text-xs font-mono"
            style={{
              backgroundImage: 'linear-gradient(to right, #22d3ee, #6ee7b7)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Hardik Sachdeva
          </p>
          <p className="text-xs" style={{ color: '#475569' }}>
            © {new Date().getFullYear()} Hardik Sachdeva · Built with Next.js &amp; Tailwind CSS
          </p>
        </motion.div>
      </div>
    </footer>
  )
}
