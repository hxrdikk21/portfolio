'use client'

import { useEffect, useRef } from 'react'

/**
 * AnimatedBackground — a subtle, slow-drifting mesh gradient rendered on a canvas.
 * Uses only CSS-level dark cyans so it never overwhelms content.
 * Positioned fixed so it underlays the entire page.
 */
export default function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animId: number
    let t = 0

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    // Orb definitions — position expressed as fractions of canvas size
    const orbs = [
      { x: 0.15, y: 0.2,  r: 0.55, color: 'rgba(34, 211, 238, 0.045)',  sx: 0.00018, sy: 0.00012 },
      { x: 0.80, y: 0.65, r: 0.50, color: 'rgba(110, 231, 183, 0.035)', sx:-0.00014, sy: 0.00016 },
      { x: 0.50, y: 0.90, r: 0.45, color: 'rgba(15,  23,  42,  0.8)',   sx: 0.00010, sy:-0.00020 },
      { x: 0.35, y: 0.55, r: 0.40, color: 'rgba(34, 211, 238, 0.025)',  sx:-0.00012, sy:-0.00014 },
    ]

    const draw = () => {
      t++
      const W = canvas.width
      const H = canvas.height

      ctx.clearRect(0, 0, W, H)

      // Base background
      ctx.fillStyle = '#030303'
      ctx.fillRect(0, 0, W, H)

      // Subtle grid lines
      ctx.strokeStyle = 'rgba(255,255,255,0.02)'
      ctx.lineWidth = 1
      const gridSize = 80
      for (let x = 0; x < W; x += gridSize) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke()
      }
      for (let y = 0; y < H; y += gridSize) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke()
      }

      // Drifting orbs
      for (const orb of orbs) {
        const cx = (orb.x + Math.sin(t * orb.sx * 300) * 0.12) * W
        const cy = (orb.y + Math.cos(t * orb.sy * 300) * 0.10) * H
        const rad = orb.r * Math.min(W, H)
        const grd = ctx.createRadialGradient(cx, cy, 0, cx, cy, rad)
        grd.addColorStop(0, orb.color)
        grd.addColorStop(1, 'transparent')
        ctx.fillStyle = grd
        ctx.fillRect(0, 0, W, H)
      }

      animId = requestAnimationFrame(draw)
    }

    draw()
    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0 }}
    />
  )
}
