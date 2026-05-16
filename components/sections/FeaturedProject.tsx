'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { motion, useScroll, useTransform } from 'framer-motion'
import { featuredProject } from '@/lib/data'
import { MagneticButton } from '@/components/ui/MagneticButton'

export function FeaturedProject() {
  const sectionRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  const imageY = useTransform(scrollYProgress, [0, 1], ['-8%', '8%'])
  const textY = useTransform(scrollYProgress, [0, 1], ['6%', '-6%'])

  return (
    <section
      ref={sectionRef}
      className="relative bg-ink overflow-hidden"
      style={{ height: 'min(90vh, 860px)' }}
    >
      {/* Full-bleed image with parallax */}
      <div className="absolute inset-0">
        <motion.div style={{ y: imageY }} className="absolute inset-[-10%] will-change-transform">
          <Image
            src={featuredProject.imageUrl}
            alt={featuredProject.name}
            fill
            className="object-cover object-center"
            sizes="100vw"
            priority
          />
        </motion.div>
        {/* Cinematic gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/55 to-ink/10" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/50 via-transparent to-transparent" />
      </div>

      {/* Film grain */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none opacity-[0.025] grain-overlay"
        aria-hidden="true"
      />

      {/* Top badge */}
      <div className="absolute top-8 right-8 md:top-10 md:right-10 z-10">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex items-center gap-2 px-3 py-1.5 bg-gold/10 border border-gold/20 backdrop-blur-sm"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
          <span className="font-body text-gold text-[10px] tracking-[0.2em] uppercase font-medium">
            Flagship Project
          </span>
        </motion.div>
      </div>

      {/* Content */}
      <motion.div
        style={{ y: textY }}
        className="absolute bottom-0 left-0 right-0 z-10 px-6 md:px-10 lg:px-16 pb-12 md:pb-16 will-change-transform"
      >
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-3"
        >
          <span className="font-body text-white/40 text-xs tracking-[0.25em] uppercase">
            {featuredProject.category}
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="font-display font-black text-white leading-tight tracking-tight mb-4"
          style={{ fontSize: 'clamp(2.5rem, 6vw, 7rem)' }}
        >
          {featuredProject.name}
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6"
        >
          <div>
            <p className="font-body font-light text-white/60 text-lg md:text-xl italic mb-1">
              &ldquo;{featuredProject.tagline}&rdquo;
            </p>
            <div className="flex items-center gap-6 mt-3">
              <span className="font-body text-white/30 text-sm">{featuredProject.location}</span>
              <span className="w-1 h-1 rounded-full bg-white/20" />
              <span className="font-body text-white/30 text-sm">{featuredProject.area}</span>
            </div>
          </div>

          <MagneticButton
            as="a"
            href="#contact"
            className="inline-flex items-center gap-3 px-6 py-3.5 border border-white/20 text-white text-sm font-medium tracking-widest uppercase hover:border-gold hover:text-gold transition-all duration-300 w-fit backdrop-blur-sm"
          >
            View Case Study&nbsp;→
          </MagneticButton>
        </motion.div>
      </motion.div>
    </section>
  )
}
