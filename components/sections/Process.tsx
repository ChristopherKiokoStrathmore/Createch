'use client'

import { useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { processSteps } from '@/lib/data'
import { fadeInUp, staggerContainer, viewportConfig } from '@/lib/animations'

function ProcessStep({
  step,
  index,
}: {
  step: (typeof processSteps)[0]
  index: number
}) {
  const numRef = useRef<HTMLSpanElement>(null)
  const lineRef = useRef<HTMLDivElement>(null)
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

          if (lineRef.current) {
            anime({
              targets: lineRef.current,
              scaleX: [0, 1],
              duration: 700,
              easing: 'easeInOutQuart',
              delay: index * 80,
            })
          }

          const counter = { value: 0 }
          const final = parseInt(step.number)
          anime({
            targets: counter,
            value: final,
            duration: 900,
            easing: 'easeOutExpo',
            delay: 100 + index * 80,
            update: () => {
              if (numRef.current)
                numRef.current.textContent = String(Math.round(counter.value)).padStart(2, '0')
            },
          })
        }
      },
      { threshold: 0.3 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [index, step.number])

  return (
    <motion.div
      ref={containerRef}
      variants={fadeInUp}
      className="flex flex-col pt-6 relative"
    >
      {/* Top border line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-ink/8" />
      <div
        ref={lineRef}
        className="absolute top-0 left-0 h-px bg-gold origin-left"
        style={{ width: '100%', transform: 'scaleX(0)' }}
        aria-hidden="true"
      />

      <span
        ref={numRef}
        className="font-display font-black text-gold leading-none mb-5 select-none block"
        style={{ fontSize: 'clamp(2.5rem, 4vw, 4rem)' }}
        aria-hidden="true"
      >
        {step.number}
      </span>

      <h3 className="font-display font-bold text-ink text-lg md:text-xl mb-3 leading-tight">
        {step.title}
      </h3>

      <p className="font-body font-light text-ink/60 text-sm md:text-base leading-relaxed">
        {step.description}
      </p>
    </motion.div>
  )
}

export function Process() {
  return (
    <section id="process" className="bg-white min-h-screen flex flex-col justify-center px-6 md:px-10 lg:px-16 py-12 md:py-16">
      <div className="max-w-screen-xl mx-auto w-full">
        {/* Header */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="mb-12 md:mb-16"
        >
          <motion.div variants={fadeInUp} className="mb-4">
            <span className="font-body text-gold text-[10px] font-medium tracking-[0.28em] uppercase">
              How We Work
            </span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="font-display font-bold text-ink leading-tight tracking-tight"
            style={{ fontSize: 'clamp(2rem, 4vw, 4.5rem)' }}
          >
            From Brief to Built
          </motion.h2>
        </motion.div>

        {/* Steps grid — 2 cols mobile, 5 cols desktop */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="grid grid-cols-2 md:grid-cols-5 gap-8 md:gap-6"
        >
          {processSteps.map((step, i) => (
            <ProcessStep key={step.number} step={step} index={i} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
