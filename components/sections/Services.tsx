'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { services } from '@/lib/data'
import { fadeInUp, staggerContainer, viewportConfig } from '@/lib/animations'
import { TextReveal } from '@/components/ui/TextReveal'

function ServiceCard({ service, index }: { service: typeof services[0]; index: number }) {
  const borderRef = useRef<HTMLDivElement>(null)
  const numberRef = useRef<HTMLSpanElement>(null)
  const hasAnimated = useRef(false)
  const underlineRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const target = borderRef.current
    const numberEl = numberRef.current
    if (!target || !numberEl) return

    const observer = new IntersectionObserver(
      async (entries) => {
        const entry = entries[0]
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true
          observer.disconnect()

          const animeModule = await import('animejs')
          const anime = animeModule.default

          anime({
            targets: target,
            width: ['0%', '100%'],
            duration: 900,
            easing: 'easeInOutQuart',
            delay: index * 120,
          })

          const numericTarget = { value: 0 }
          const finalValue = parseInt(service.number)
          anime({
            targets: numericTarget,
            value: finalValue,
            duration: 1400,
            easing: 'easeOutExpo',
            delay: 200 + index * 120,
            update: function () {
              if (numberEl) {
                numberEl.textContent = String(Math.round(numericTarget.value)).padStart(2, '0')
              }
            },
          })
        }
      },
      { threshold: 0.3 }
    )

    observer.observe(target)
    return () => observer.disconnect()
  }, [index, service.number])

  const handleExploreEnter = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (typeof window === 'undefined') return
    const el = underlineRef.current
    if (!el) return
    const animeModule = await import('animejs')
    const anime = animeModule.default
    anime({ targets: el, scaleX: [0, 1], duration: 300, easing: 'easeOutQuart' })
  }

  const handleExploreLeave = async () => {
    if (typeof window === 'undefined') return
    const el = underlineRef.current
    if (!el) return
    const animeModule = await import('animejs')
    const anime = animeModule.default
    anime({ targets: el, scaleX: [1, 0], duration: 200, easing: 'easeInQuart' })
  }

  return (
    <motion.div
      variants={fadeInUp}
      className="flex flex-col pt-8 relative"
    >
      <div
        ref={borderRef}
        className="absolute top-0 left-0 h-px bg-gold"
        style={{ width: '0%' }}
        aria-hidden="true"
      />

      <span
        ref={numberRef}
        className="font-display font-black leading-none mb-6 select-none"
        style={{ fontSize: 'clamp(4rem, 8vw, 8rem)', color: 'rgba(239,159,39,0.18)' }}
        aria-hidden="true"
      >
        00
      </span>

      <h3 className="font-display font-bold text-ink text-2xl md:text-3xl mb-4">
        {service.name}
      </h3>

      <p className="font-body font-light text-ink/70 leading-relaxed mb-6 text-base md:text-lg flex-1">
        {service.description}
      </p>

      <ul className="mb-8 space-y-1.5">
        {service.features.map((f) => (
          <li key={f} className="font-body text-sm text-ink/50 flex items-center gap-2">
            <span className="w-1 h-1 rounded-full bg-gold inline-block" />
            {f}
          </li>
        ))}
      </ul>

      <a
        href="#contact"
        className="relative inline-flex w-fit font-body text-sm font-medium text-ink tracking-wider uppercase"
        onMouseEnter={handleExploreEnter}
        onMouseLeave={handleExploreLeave}
      >
        Explore&nbsp;→
        <span
          ref={underlineRef}
          className="absolute bottom-0 left-0 w-full h-px bg-ink origin-left"
          style={{ transform: 'scaleX(0)' }}
          aria-hidden="true"
        />
      </a>
    </motion.div>
  )
}

export function Services() {
  return (
    <section id="services" className="bg-white py-24 md:py-36 px-6 md:px-10 lg:px-16">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportConfig}
        className="max-w-screen-xl mx-auto"
      >
        <motion.div variants={fadeInUp} className="mb-4">
          <span className="font-body text-gold text-[10px] font-medium tracking-[0.28em] uppercase">
            What We Do
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          className="font-display font-bold text-ink leading-tight tracking-tight mb-16 md:mb-20"
          style={{ fontSize: 'clamp(2rem, 4vw, 4.5rem)' }}
        >
          Three Ways We Build
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-10 lg:gap-16">
          {services.map((service, i) => (
            <ServiceCard key={service.name} service={service} index={i} />
          ))}
        </div>
      </motion.div>
    </section>
  )
}
