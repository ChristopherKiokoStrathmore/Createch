'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { MagneticButton } from '@/components/ui/MagneticButton'
import { fadeInUp, staggerContainer, viewportConfig } from '@/lib/animations'
import { aboutImageUrl } from '@/lib/data'
import { ImageParallax } from '@/components/ui/ImageParallax'

interface StatProps {
  value: number
  suffix: string
  label: string
  index: number
}

function AnimatedStat({ value, suffix, label, index }: StatProps) {
  const numRef = useRef<HTMLSpanElement>(null)
  const hasAnimated = useRef(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const el = containerRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      async (entries) => {
        const entry = entries[0]
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true
          observer.disconnect()
          const animeModule = await import('animejs')
          const anime = animeModule.default
          const counter = { value: 0 }
          anime({
            targets: counter,
            value,
            duration: 1400,
            easing: 'easeOutExpo',
            delay: index * 150,
            update: function () {
              if (numRef.current) numRef.current.textContent = String(Math.round(counter.value))
            },
          })
        }
      },
      { threshold: 0.5 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [value, index])

  return (
    <div ref={containerRef} className="py-7 border-b border-ink/8 last:border-b-0">
      <div className="flex items-baseline gap-1 mb-1.5">
        <span
          ref={numRef}
          className="font-display font-black text-ink leading-none"
          style={{ fontSize: 'clamp(3rem, 5.5vw, 5.5rem)' }}
        >
          0
        </span>
        <span className="font-display font-black text-gold leading-none" style={{ fontSize: 'clamp(2rem, 3.5vw, 3.5rem)' }}>
          {suffix}
        </span>
      </div>
      <p className="font-body font-light text-ink/50 text-base">{label}</p>
    </div>
  )
}

export function About() {
  return (
    <section id="about" className="bg-white min-h-screen flex flex-col justify-center py-12 md:py-16 px-6 md:px-10 lg:px-16 overflow-hidden">
      <div className="max-w-screen-xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">

          {/* Left: Stats + copy */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
          >
            <motion.div variants={fadeInUp} className="mb-5">
              <span className="font-body text-gold text-[10px] font-medium tracking-[0.28em] uppercase">
                About Createch
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
              className="font-display font-bold text-ink leading-tight tracking-tight mb-10"
              style={{ fontSize: 'clamp(2rem, 3.8vw, 4rem)' }}
            >
              Rooted in Nairobi.
              <br />
              Built for Africa.
            </motion.h2>

            <motion.p variants={fadeInUp} className="font-body font-light text-ink/65 text-lg leading-[1.85] mb-5">
              Createch Architects is a Nairobi-based practice delivering architecture,
              interior design, and site execution across East and West Africa. We build
              spaces that are efficient, sustainable, and deeply rooted in their context.
            </motion.p>

            <motion.p variants={fadeInUp} className="font-body font-light text-ink/65 text-lg leading-[1.85] mb-10">
              From residential homes in Karen to commercial towers in the CBD, every project
              begins with the same question: what does this place want to be?
            </motion.p>

            {/* Stats row */}
            <motion.div variants={staggerContainer} className="grid grid-cols-3 gap-0 mb-10 border-t border-ink/8">
              <AnimatedStat value={12} suffix="+" label="Years" index={0} />
              <AnimatedStat value={80} suffix="+" label="Projects" index={1} />
              <AnimatedStat value={6} suffix="" label="Countries" index={2} />
            </motion.div>

            <motion.div variants={fadeInUp}>
              <MagneticButton
                as="a"
                href="#contact"
                className="inline-flex px-7 py-4 border border-ink text-ink text-sm font-medium tracking-widest uppercase hover:bg-ink hover:text-white transition-all duration-300"
              >
                Start a Conversation&nbsp;→
              </MagneticButton>
            </motion.div>
          </motion.div>

          {/* Right: architectural image */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={viewportConfig}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="relative"
          >
            <ImageParallax offset={40} className="w-full" innerClassName="w-full">
              <div className="relative w-full overflow-hidden" style={{ aspectRatio: '4/5' }}>
                <Image
                  src={aboutImageUrl}
                  alt="Createch Architects studio"
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                {/* Subtle warm overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-gold/5 via-transparent to-ink/10" />
              </div>
            </ImageParallax>

            {/* Floating stat card */}
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={viewportConfig}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="absolute -bottom-6 -left-6 bg-ink p-6 md:p-8 shadow-2xl"
            >
              <p className="font-display font-black text-gold leading-none mb-2"
                style={{ fontSize: 'clamp(2.5rem, 4vw, 3.5rem)' }}>
                Pan-African
              </p>
              <p className="font-body font-light text-white/50 text-sm">Reach & Impact</p>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
