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

    let offscreenCanvas: HTMLCanvasElement | null = null

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight

      // Pre-render static background and grid lines to an offscreen canvas
      offscreenCanvas = document.createElement('canvas')
      offscreenCanvas.width = canvas.width
      offscreenCanvas.height = canvas.height
      const offCtx = offscreenCanvas.getContext('2d')
      if (offCtx) {
        offCtx.fillStyle = '#030303'
        offCtx.fillRect(0, 0, canvas.width, canvas.height)

        offCtx.strokeStyle = 'rgba(255,255,255,0.02)'
        offCtx.lineWidth = 1
        const gridSize = 80
        offCtx.beginPath()
        for (let x = 0; x < canvas.width; x += gridSize) {
          offCtx.moveTo(x, 0)
          offCtx.lineTo(x, canvas.height)
        }
        for (let y = 0; y < canvas.height; y += gridSize) {
          offCtx.moveTo(0, y)
          offCtx.lineTo(canvas.width, y)
        }
        offCtx.stroke()
      }
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

      // Draw the pre-rendered grid (drastically reduces CPU usage)
      if (offscreenCanvas) {
        ctx.drawImage(offscreenCanvas, 0, 0)
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
        // Only fill the bounding box of the orb, not the whole screen (drastically reduces GPU overdraw)
        ctx.fillRect(cx - rad, cy - rad, rad * 2, rad * 2)
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
