'use client'

import { useEffect, useRef } from 'react'
import { getLenis } from '@/lib/lenis'

const DURATION = 1.1
const EASING = (t: number) => 1 - Math.pow(1 - t, 4) // easeOutQuart

export function ScrollSnap() {
  const busy = useRef(false)

  useEffect(() => {
    const getSections = (): HTMLElement[] =>
      Array.from(document.querySelectorAll('main > section'))

    const currentIdx = (els: HTMLElement[]): number => {
      const mid = window.scrollY + window.innerHeight * 0.4
      let best = 0
      for (let i = els.length - 1; i >= 0; i--) {
        if (els[i].offsetTop <= mid) { best = i; break }
      }
      return best
    }

    const snapTo = (el: HTMLElement) => {
      const top = el.offsetTop
      const lenis = getLenis()
      if (lenis) {
        lenis.scrollTo(top, { duration: DURATION, easing: EASING })
      } else {
        window.scrollTo({ top, behavior: 'smooth' })
      }
    }

    const onWheel = (e: WheelEvent) => {
      // Let scroll flow freely inside scrollable form elements
      if ((e.target as HTMLElement).closest('textarea, select')) return

      e.preventDefault()
      e.stopImmediatePropagation()

      if (busy.current) return

      const els = getSections()
      if (!els.length) return

      const dir = e.deltaY > 0 ? 1 : -1
      const curr = currentIdx(els)
      const next = Math.max(0, Math.min(els.length - 1, curr + dir))
      if (next === curr) return

      busy.current = true
      snapTo(els[next])
      setTimeout(() => { busy.current = false }, (DURATION + 0.2) * 1000)
    }

    // capture: true fires before Lenis; stopImmediatePropagation prevents Lenis from
    // also processing the wheel delta, keeping the snap animation clean
    window.addEventListener('wheel', onWheel, { passive: false, capture: true })
    return () => window.removeEventListener('wheel', onWheel, { capture: true } as EventListenerOptions)
  }, [])

  return null
}
