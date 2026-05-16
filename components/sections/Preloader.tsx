'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'

interface PreloaderProps {
  onComplete: () => void
}

export function Preloader({ onComplete }: PreloaderProps) {
  const [exiting, setExiting] = useState(false)
  const [mounted, setMounted] = useState(false)
  const hasRun = useRef(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted || hasRun.current) return
    hasRun.current = true
    // Exit at 1.4s — logo has settled, overlay slides up
    const timer = setTimeout(() => setExiting(true), 1400)
    return () => clearTimeout(timer)
  }, [mounted])

  return (
    <AnimatePresence onExitComplete={onComplete}>
      {!exiting && (
        <motion.div
          key="preloader"
          initial={{ y: 0 }}
          exit={{ y: '-100%' }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 bg-ink z-[99999] flex items-center justify-center"
          aria-hidden="true"
        >
          {/* Logo card — white stamp on ink */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="relative bg-white px-10 py-8 flex items-center justify-center"
            style={{ boxShadow: '0 0 0 1px rgba(239,159,39,0.15), 0 40px 80px rgba(0,0,0,0.5)' }}
          >
            <Image
              src="/logo.jpg"
              alt="Createch Architects"
              width={220}
              height={220}
              className="w-[180px] md:w-[220px] h-auto object-contain"
              priority
            />
          </motion.div>

          {/* Bottom gold rule */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 h-px w-16 bg-gold origin-left"
          />

          {/* Nairobi label */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.3 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="absolute bottom-6 font-body text-white text-[10px] tracking-[0.35em] uppercase"
          >
            Nairobi · Kenya
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
