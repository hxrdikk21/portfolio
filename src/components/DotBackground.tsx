'use client'

import { useEffect, useRef } from 'react'

/**
 * DotBackground — SVG dot grid + a radial cyan spotlight that follows the mouse.
 * Implemented inline (no deps) matching the 21st.dev / magic-ui dot-background pattern.
 */
export default function DotBackground() {
  const spotRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = spotRef.current
    if (!el) return

    let frameId: number | null = null

    const move = (e: MouseEvent) => {
      if (frameId) return
      frameId = requestAnimationFrame(() => {
        el.style.background = `radial-gradient(600px circle at ${e.clientX}px ${e.clientY}px, rgba(34,211,238,0.10) 0%, rgba(34,211,238,0.04) 30%, transparent 70%)`
        frameId = null
      })
    }

    window.addEventListener('mousemove', move)
    return () => {
      window.removeEventListener('mousemove', move)
      if (frameId) cancelAnimationFrame(frameId)
    }
  }, [])

  return (
    <>
      {/* Dot grid via CSS background-image pattern */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            radial-gradient(circle, rgba(255,255,255,0.18) 1px, transparent 1px)
          `,
          backgroundSize: '28px 28px',
          maskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%)',
          zIndex: 0,
          pointerEvents: 'none',
        }}
      />

      {/* Subtle top-left fixed cyan spotlight */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '-10%',
          left: '-5%',
          width: '50%',
          height: '60%',
          background: 'radial-gradient(ellipse at top left, rgba(34,211,238,0.12) 0%, transparent 65%)',
          zIndex: 0,
          pointerEvents: 'none',
        }}
      />

      {/* Mouse-tracking spotlight overlay */}
      <div
        ref={spotRef}
        aria-hidden="true"
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 1,
          pointerEvents: 'none',
          willChange: 'background',
        }}
      />
    </>
  )
}
