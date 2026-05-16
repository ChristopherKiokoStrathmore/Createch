'use client'

import { createContext, useContext, useEffect, useRef, ReactNode } from 'react'
import { useAnimationFrame } from 'framer-motion'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const LenisContext = createContext<any>(null)

// Module-level ref so ScrollSnap can access Lenis without React context timing issues
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let _lenis: any = null
export function getLenis() { return _lenis }

export function useLenis() {
  return useContext(LenisContext)
}

export function LenisProvider({ children }: { children: ReactNode }) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const lenisRef = useRef<any>(null)

  useEffect(() => {
    const init = async () => {
      const LenisModule = await import('lenis')
      const Lenis = LenisModule.default
      _lenis = new Lenis({
        lerp: 0.08,
        duration: 1.4,
        easing: (t: number) =>
          t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2,
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 2,
      })
      lenisRef.current = _lenis
    }
    init()
    return () => {
      lenisRef.current?.destroy()
      lenisRef.current = null
      _lenis = null
    }
  }, [])

  // Lenis runs inside Framer Motion's RAF — keeps scroll + animations in sync
  useAnimationFrame((time) => {
    lenisRef.current?.raf(time)
  })

  return (
    <LenisContext.Provider value={lenisRef.current}>
      {children}
    </LenisContext.Provider>
  )
}
