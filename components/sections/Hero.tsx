'use client'

import { useRef } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import Image from 'next/image'
import { MagneticButton } from '@/components/ui/MagneticButton'
import { heroImageUrl } from '@/lib/data'

const LINE_VARIANTS = {
  hidden: { y: '110%' },
  visible: (delay: number) => ({
    y: 0,
    transition: { duration: 0.95, ease: [0.16, 1, 0.3, 1], delay },
  }),
}

const FADE_UP = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1], delay },
  }),
}

interface HeroProps {
  isReady: boolean
}

export function Hero({ isReady }: HeroProps) {
  const shouldReduceMotion = useReducedMotion()
  const baseDelay = isReady ? 0.1 : 99

  return (
    <section
      id="hero"
      className="relative min-h-[100svh] bg-ink flex flex-col justify-end pb-16 md:pb-20 overflow-hidden isolate"
    >
      {/* Background architectural photograph */}
      <div className="absolute inset-0 z-0">
        <Image
          src={heroImageUrl}
          alt="Architecture"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        {/* Layered overlays for cinematic depth */}
        <div className="absolute inset-0 bg-ink/70" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/60 via-transparent to-transparent" />
      </div>

      {/* Film grain */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none opacity-[0.03] grain-overlay"
        aria-hidden="true"
      />

      {/* Vertical text */}
      <div className="absolute right-6 md:right-10 top-1/2 -translate-y-1/2 z-10 hidden md:flex" aria-hidden="true">
        <span
          className="font-body text-white/30 text-[10px] tracking-[0.28em] uppercase font-medium"
          style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
        >
          Architecture &amp; Interiors
        </span>
      </div>

      {/* Main headline */}
      <div className="relative z-10 px-6 md:px-10 lg:px-16 mb-12 md:mb-14">
        <div className="max-w-[1000px]">
          <motion.div
            custom={baseDelay}
            variants={FADE_UP}
            initial="hidden"
            animate={isReady ? 'visible' : 'hidden'}
            className="mb-7"
          >
            <span className="font-body text-white/45 text-[10px] tracking-[0.28em] uppercase font-medium">
              Nairobi · Kenya · Est. 2012
            </span>
          </motion.div>
          <div className="overflow-hidden mb-0.5">
            <motion.h1
              custom={baseDelay + 0.05}
              variants={LINE_VARIANTS}
              initial="hidden"
              animate={isReady ? 'visible' : 'hidden'}
              className="font-display font-black text-white leading-[0.92] tracking-tight"
              style={{ fontSize: 'clamp(3.5rem, 8.5vw, 9.5rem)' }}
            >
              We Design
            </motion.h1>
          </div>
          <div className="overflow-hidden mb-0.5">
            <motion.div
              custom={baseDelay + 0.2}
              variants={LINE_VARIANTS}
              initial="hidden"
              animate={isReady ? 'visible' : 'hidden'}
              className="font-display font-normal italic text-white leading-[0.92] tracking-tight"
              style={{ fontSize: 'clamp(3.5rem, 8.5vw, 9.5rem)' }}
            >
              the Places
            </motion.div>
          </div>
          <div className="overflow-hidden">
            <motion.div
              custom={baseDelay + 0.35}
              variants={LINE_VARIANTS}
              initial="hidden"
              animate={isReady ? 'visible' : 'hidden'}
              className="font-display font-black text-gold leading-[0.92] tracking-tight"
              style={{ fontSize: 'clamp(3.5rem, 8.5vw, 9.5rem)' }}
            >
              Africa Lives In.
            </motion.div>
          </div>
        </div>
      </div>

      {/* Bottom row */}
      <motion.div
        custom={baseDelay + 0.55}
        variants={FADE_UP}
        initial="hidden"
        animate={isReady ? 'visible' : 'hidden'}
        className="relative z-10 px-6 md:px-10 lg:px-16 flex flex-col md:flex-row md:items-center gap-6 md:gap-0 justify-between"
      >
        <MagneticButton
          as="a"
          href="#projects"
          className="px-7 py-4 bg-gold text-ink text-sm font-medium tracking-widest uppercase hover:shadow-[0_8px_40px_rgba(239,159,39,0.45)] transition-shadow duration-300 w-fit"
        >
          View Our Work&nbsp;↓
        </MagneticButton>

        <div className="flex items-center gap-6 md:gap-10">
          {[
            { value: '80+', label: 'Projects' },
            { value: '12', label: 'Years' },
            { value: '6', label: 'Countries' },
          ].map((stat) => (
            <div key={stat.label} className="flex flex-col">
              <span className="font-display font-bold text-white text-2xl leading-none">{stat.value}</span>
              <span className="font-body text-white/40 text-xs tracking-widest uppercase mt-1">{stat.label}</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        custom={baseDelay + 0.7}
        variants={FADE_UP}
        initial="hidden"
        animate={isReady ? 'visible' : 'hidden'}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown className="text-white/25" size={18} />
        </motion.div>
      </motion.div>
    </section>
  )
}
