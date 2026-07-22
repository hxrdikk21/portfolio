'use client'

import { motion } from 'framer-motion'

const nodes = [
  { id: 'client',   label: 'Next.js\nFrontend',  x: 10,  y: 50, color: '#22d3ee', icon: '⬡' },
  { id: 'api',      label: 'Express\nAPI Layer',  x: 50,  y: 50, color: '#6ee7b7', icon: '⚡' },
  { id: 'mongo',    label: 'MongoDB\nDatabase',   x: 88,  y: 50, color: '#a78bfa', icon: '◈' },
  { id: 'auth',     label: 'JWT\nAuth',           x: 50,  y: 15, color: '#fb923c', icon: '🔐' },
  { id: 'complaints', label: 'Complaint\nTracker', x: 50, y: 85, color: '#f472b6', icon: '📋' },
]

const connections = [
  { from: 'client', to: 'api',        label: 'REST / JSON', delay: 0   },
  { from: 'api',    to: 'mongo',      label: 'Mongoose ODM', delay: 0.3 },
  { from: 'api',    to: 'auth',       label: 'JWT verify',   delay: 0.6 },
  { from: 'api',    to: 'complaints', label: 'CRUD ops',     delay: 0.9 },
]

function lerp(a: number, b: number, t: number) { return a + (b - a) * t }

export default function ArchitectureBeam() {
  const W = 100 // percentage-based
  const H = 100

  const getNode = (id: string) => nodes.find((n) => n.id === id)!

  return (
    <div className="relative w-full h-full" style={{ minHeight: '240px' }}>
      {/* SVG beams */}
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid meet"
        className="absolute inset-0 w-full h-full"
        aria-hidden="true"
      >
        <defs>
          {connections.map((conn) => {
            const from = getNode(conn.from)
            const to   = getNode(conn.to)
            return (
              <linearGradient
                key={`grad-${conn.from}-${conn.to}`}
                id={`grad-${conn.from}-${conn.to}`}
                x1={from.x + '%'} y1={from.y + '%'}
                x2={to.x   + '%'} y2={to.y   + '%'}
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0%"   stopColor={from.color} stopOpacity="0.6" />
                <stop offset="100%" stopColor={to.color}   stopOpacity="0.6" />
              </linearGradient>
            )
          })}
        </defs>

        {/* Static faint lines */}
        {connections.map((conn) => {
          const from = getNode(conn.from)
          const to   = getNode(conn.to)
          return (
            <line
              key={`line-${conn.from}-${conn.to}`}
              x1={from.x} y1={from.y}
              x2={to.x}   y2={to.y}
              stroke={`url(#grad-${conn.from}-${conn.to})`}
              strokeWidth="0.4"
              strokeDasharray="1 1"
              opacity="0.3"
            />
          )
        })}

        {/* Animated beam dots travelling along each connection */}
        {connections.map((conn) => {
          const from = getNode(conn.from)
          const to   = getNode(conn.to)
          return (
            <motion.circle
              key={`beam-${conn.from}-${conn.to}`}
              r="1.2"
              fill={from.color}
              filter="url(#glow)"
              initial={{ cx: from.x, cy: from.y, opacity: 0 }}
              animate={{
                cx: [from.x, to.x, from.x],
                cy: [from.y, to.y, from.y],
                opacity: [0, 1, 1, 0],
              }}
              transition={{
                duration: 2.4,
                delay: conn.delay,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          )
        })}

        {/* Glow filter */}
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="0.8" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>
      </svg>

      {/* Node labels */}
      {nodes.map((node) => (
        <motion.div
          key={node.id}
          className="absolute flex flex-col items-center text-center"
          style={{
            left: `${node.x}%`,
            top: `${node.y}%`,
            transform: 'translate(-50%, -50%)',
          }}
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1 }}
          whileHover={{ scale: 1.12 }}
        >
          <div
            className="w-10 h-10 rounded-lg flex items-center justify-center text-base mb-1"
            style={{
              background: `${node.color}15`,
              border: `1.5px solid ${node.color}50`,
              boxShadow: `0 0 12px ${node.color}20`,
              color: node.color,
            }}
          >
            {node.icon}
          </div>
          <span
            className="text-[9px] font-mono whitespace-pre-line leading-tight text-center"
            style={{ color: '#64748b' }}
          >
            {node.label}
          </span>
        </motion.div>
      ))}
    </div>
  )
}
