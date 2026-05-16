'use client'

import { useRef, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { processSteps } from '@/lib/data'
import { fadeInUp, staggerContainer, viewportConfig } from '@/lib/animations'

function ProcessStep({
  step,
  index,
  isLast,
}: {
  step: (typeof processSteps)[0]
  index: number
  isLast: boolean
}) {
  const lineRef = useRef<HTMLDivElement>(null)
  const hasAnimated = useRef(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window === 'undefined' || isLast) return
    const el = containerRef.current
    if (!el) return

    const line = lineRef.current
    if (!line) return

    const observer = new IntersectionObserver(
      async (entries) => {
        const entry = entries[0]
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true
          observer.disconnect()

          const animeModule = await import('animejs')
          const anime = animeModule.default

          anime({
            targets: line,
            scaleX: [0, 1],
            duration: 900,
            easing: 'easeInOutQuart',
            delay: 300,
          })
        }
      },
      { threshold: 0.5 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [isLast])

  return (
    <div
      ref={containerRef}
      className="relative flex flex-col md:min-w-[320px] lg:min-w-[360px] pr-0 md:pr-16"
    >
      {/* Connecting line (desktop only) */}
      {!isLast && (
        <div
          className="hidden md:block absolute top-10 left-full w-16 h-px overflow-hidden"
          aria-hidden="true"
        >
          <div
            ref={lineRef}
            className="w-full h-full bg-gold/30 origin-left"
            style={{ transform: 'scaleX(0)' }}
          />
        </div>
      )}

      <span
        className="font-display font-black text-gold leading-none mb-6 select-none"
        style={{ fontSize: 'clamp(3rem, 5vw, 4rem)' }}
        aria-hidden="true"
      >
        {step.number}
      </span>

      <h3 className="font-display font-bold text-ink text-xl md:text-2xl mb-3">
        {step.title}
      </h3>

      <p className="font-body font-light text-ink/70 text-base leading-relaxed">
        {step.description}
      </p>

      {/* Mobile separator */}
      <div className="md:hidden mt-8 mb-2 h-px bg-ink/10" aria-hidden="true" />
    </div>
  )
}

export function Process() {
  const containerRef = useRef<HTMLDivElement>(null)
  const stickyRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  // Steps are min-w-[50vw], starting at 10vw padding → total content ≈ 260vw, viewport = 100vw → max shift ≈ 160vw
  const x = useTransform(
    scrollYProgress,
    [0, 1],
    ['0vw', `-${(processSteps.length - 1) * 50 - 40}vw`]
  )

  return (
    <section id="process" className="bg-white">
      {/* Header */}
      <div className="px-6 md:px-10 lg:px-16 pt-24 md:pt-36 pb-4 max-w-screen-xl mx-auto">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
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
      </div>

      {/* Mobile: vertical stack */}
      <div className="md:hidden px-6 pb-24 space-y-0 max-w-screen-xl mx-auto">
        {processSteps.map((step, i) => (
          <ProcessStep
            key={step.number}
            step={step}
            index={i}
            isLast={i === processSteps.length - 1}
          />
        ))}
      </div>

      {/* Desktop: horizontal sticky scroll */}
      <div
        ref={containerRef}
        className="hidden md:block relative"
        style={{ height: `${processSteps.length * 60}vh` }}
        aria-hidden="false"
      >
        <div
          ref={stickyRef}
          className="sticky top-0 h-screen overflow-hidden flex items-center"
        >
          <motion.div
            style={{ x }}
            className="flex gap-0 pl-[10vw] will-change-transform"
          >
            {processSteps.map((step, i) => (
              <div
                key={step.number}
                className="flex items-start min-w-[50vw] lg:min-w-[40vw] xl:min-w-[35vw] pr-24 relative"
              >
                {/* Line connector between steps */}
                {i < processSteps.length - 1 && (
                  <div
                    className="absolute top-[3.6rem] right-12 left-auto w-24 h-px bg-gold/20"
                    aria-hidden="true"
                  />
                )}

                <div>
                  <span
                    className="font-display font-black text-gold leading-none mb-8 block select-none"
                    style={{ fontSize: 'clamp(3rem, 5vw, 5rem)' }}
                    aria-hidden="true"
                  >
                    {step.number}
                  </span>
                  <h3 className="font-display font-bold text-ink text-3xl md:text-4xl mb-4 leading-tight">
                    {step.title}
                  </h3>
                  <p className="font-body font-light text-ink/60 text-lg leading-relaxed max-w-[280px]">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
