'use client'

import React from 'react'
import { ReactLenis } from 'lenis/react'

export default function SmoothScroller({ children }: { children: React.ReactNode }) {
  return (
    <ReactLenis root options={{
      lerp: 0.1,
      wheelMultiplier: 1.0,
      smoothWheel: true,
      // syncTouch disabled — it intercepts trackpad momentum on macOS and
      // prevents native two-finger scroll from reaching the bottom of the page
      syncTouch: false,
    }}>
      <>{children}</>
    </ReactLenis>
  )
}
