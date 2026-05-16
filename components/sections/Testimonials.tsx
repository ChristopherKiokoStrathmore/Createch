'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { testimonials } from '@/lib/data'
import { staggerContainer, fadeInUp, viewportConfig } from '@/lib/animations'

export function Testimonials() {
  const [active, setActive] = useState(0)
  const [direction, setDirection] = useState(1)

  const navigate = (dir: 1 | -1) => {
    setDirection(dir)
    setActive((prev) => (prev + dir + testimonials.length) % testimonials.length)
  }

  const variants = {
    enter: (dir: number) => ({
      opacity: 0,
      x: dir * 30,
      filter: 'blur(4px)',
    }),
    center: {
      opacity: 1,
      x: 0,
      filter: 'blur(0px)',
      transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] },
    },
    exit: (dir: number) => ({
      opacity: 0,
      x: dir * -20,
      filter: 'blur(4px)',
      transition: { duration: 0.35 },
    }),
  }

  return (
    <section className="bg-white py-28 md:py-44 px-6 md:px-10 lg:px-16 overflow-hidden">
      <div className="max-w-screen-xl mx-auto">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="mb-20 md:mb-28"
        >
          <motion.div variants={fadeInUp} className="mb-3">
            <span className="font-body text-ink/30 text-[10px] tracking-[0.28em] uppercase">
              Client Voices
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
            What Our Clients Say
          </motion.h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_220px] gap-16 lg:gap-20 items-end">
          {/* Quote */}
          <div className="relative min-h-[300px] md:min-h-[260px]">
            {/* Giant quotation mark */}
            <div
              className="absolute -top-8 -left-3 font-display text-ink/[0.05] select-none pointer-events-none leading-none"
              style={{ fontSize: 'clamp(8rem, 18vw, 20rem)' }}
              aria-hidden="true"
            >
              &ldquo;
            </div>

            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={active}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
              >
                <blockquote
                  className="font-display font-normal italic text-ink leading-[1.5] mb-10 relative z-10"
                  style={{ fontSize: 'clamp(1.5rem, 3vw, 2.8rem)' }}
                >
                  &ldquo;{testimonials[active].quote}&rdquo;
                </blockquote>

                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-gold/20 border border-gold/30 flex items-center justify-center flex-shrink-0">
                    <span className="font-display font-bold text-gold text-sm">
                      {testimonials[active].author[0]}
                    </span>
                  </div>
                  <div>
                    <p className="font-body font-medium text-ink text-base">
                      {testimonials[active].author}
                    </p>
                    <p className="font-body font-light text-ink/45 text-sm">
                      {testimonials[active].role} · {testimonials[active].project}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation */}
          <div className="flex flex-row lg:flex-col items-center lg:items-end justify-between lg:justify-end gap-6 lg:gap-8">
            {/* Indicator */}
            <div className="flex lg:flex-col gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setDirection(i > active ? 1 : -1)
                    setActive(i)
                  }}
                  className="group flex items-center gap-2"
                  aria-label={`Testimonial ${i + 1}`}
                >
                  <motion.div
                    animate={{
                      width: i === active ? 32 : 12,
                      backgroundColor: i === active ? '#EF9F27' : 'rgba(13,13,13,0.15)',
                    }}
                    transition={{ duration: 0.3 }}
                    className="h-px rounded-full"
                  />
                  <span className={`font-body text-[10px] tracking-widest transition-colors duration-300 ${i === active ? 'text-gold' : 'text-ink/25'}`}>
                    0{i + 1}
                  </span>
                </button>
              ))}
            </div>

            {/* Arrows */}
            <div className="flex gap-2">
              <button
                onClick={() => navigate(-1)}
                className="w-11 h-11 border border-ink/10 hover:border-gold/50 flex items-center justify-center transition-all duration-300 text-ink/40 hover:text-gold text-lg"
                aria-label="Previous"
              >
                ←
              </button>
              <button
                onClick={() => navigate(1)}
                className="w-11 h-11 border border-ink/10 hover:border-gold/50 flex items-center justify-center transition-all duration-300 text-ink/40 hover:text-gold text-lg"
                aria-label="Next"
              >
                →
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
