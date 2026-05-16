'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { values } from '@/lib/data'
import { fadeInUp, staggerContainer, viewportConfig } from '@/lib/animations'

const CIRCLE_RADIUS = 18
const CIRCUMFERENCE = 2 * Math.PI * CIRCLE_RADIUS

interface ValueCardProps {
  value: typeof values[0]
  index: number
}

function ValueCard({ value, index }: ValueCardProps) {
  const circleRef = useRef<SVGCircleElement>(null)
  const hasAnimated = useRef(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const el = containerRef.current
    if (!el) return

    const circle = circleRef.current
    if (!circle) return

    circle.style.strokeDasharray = String(CIRCUMFERENCE)
    circle.style.strokeDashoffset = String(CIRCUMFERENCE)

    const observer = new IntersectionObserver(
      async (entries) => {
        const entry = entries[0]
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true
          observer.disconnect()

          const animeModule = await import('animejs')
          const anime = animeModule.default

          anime({
            targets: circle,
            strokeDashoffset: [CIRCUMFERENCE, 0],
            duration: 1000,
            easing: 'easeInOutQuart',
            delay: index * 100,
          })
        }
      },
      { threshold: 0.4 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [index])

  return (
    <motion.div
      variants={fadeInUp}
      ref={containerRef}
      className="flex flex-col"
    >
      <div className="mb-6">
        <svg width="44" height="44" viewBox="0 0 44 44" fill="none" aria-hidden="true">
          <circle
            ref={circleRef}
            cx="22"
            cy="22"
            r={CIRCLE_RADIUS}
            stroke="#EF9F27"
            strokeWidth="1.5"
            strokeLinecap="round"
            fill="none"
          />
        </svg>
      </div>

      <h3 className="font-display font-bold text-ink text-2xl md:text-3xl mb-1">
        {value.name}
      </h3>
      <p className="font-body font-light text-gold text-sm mb-4 italic">
        {value.subtitle}
      </p>
      <p className="font-body font-light text-ink/55 text-base leading-relaxed">
        {value.description}
      </p>
    </motion.div>
  )
}

export function Values() {
  return (
    <section className="bg-white py-24 md:py-36 px-6 md:px-10 lg:px-16">
      <div className="max-w-screen-xl mx-auto">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="mb-12 md:mb-20"
        >
          <motion.div variants={fadeInUp} className="mb-4">
            <span className="font-body text-gold text-[10px] font-medium tracking-[0.28em] uppercase">
              Our Principals
            </span>
          </motion.div>
          <div className="overflow-hidden">
            <motion.h2
              initial={{ y: '105%' }}
              whileInView={{ y: 0 }}
              viewport={viewportConfig}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
              className="font-display font-bold text-ink leading-tight tracking-tight"
              style={{ fontSize: 'clamp(2rem, 4vw, 4.5rem)' }}
            >
              What Drives Our Practice
            </motion.h2>
          </div>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-10 lg:gap-12"
        >
          {values.map((value, i) => (
            <ValueCard key={value.name} value={value} index={i} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
