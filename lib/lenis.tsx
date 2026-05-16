'use client'

import { createContext, useContext, useEffect, useRef, ReactNode } from 'react'

// Dynamically typed — Lenis is only imported inside useEffect (client-only)
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const LenisContext = createContext<any>(null)

export function useLenis() {
  return useContext(LenisContext)
}

export function LenisProvider({ children }: { children: ReactNode }) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const lenisRef = useRef<any>(null)

  useEffect(() => {
    let rafId: number

    const init = async () => {
      const LenisModule = await import('lenis')
      const Lenis = LenisModule.default

      const lenis = new Lenis({
        lerp: 0.08,
        duration: 1.4,
        easing: (t: number) =>
          t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2,
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 2,
      })

      lenisRef.current = lenis

      function raf(time: number) {
        lenis.raf(time)
        rafId = requestAnimationFrame(raf)
      }

      rafId = requestAnimationFrame(raf)
    }

    init()

    return () => {
      if (rafId) cancelAnimationFrame(rafId)
      if (lenisRef.current) lenisRef.current.destroy()
    }
  }, [])

  return (
    <LenisContext.Provider value={lenisRef.current}>
      {children}
    </LenisContext.Provider>
  )
}
