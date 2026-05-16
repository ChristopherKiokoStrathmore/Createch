'use client'

import { motion } from 'framer-motion'
import { MagneticButton } from '@/components/ui/MagneticButton'

export function CtaBanner() {
  return (
    <section className="bg-gold py-24 md:py-36 px-6 md:px-10 lg:px-16 overflow-hidden relative">
      {/* Subtle background texture */}
      <div
        className="absolute inset-0 opacity-[0.06] grain-overlay pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-screen-xl mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-12">
          {/* Headline */}
          <div className="flex-1">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mb-5"
            >
              <span className="font-body text-ink/40 text-[10px] tracking-[0.28em] uppercase">
                Ready to build?
              </span>
            </motion.div>

            {['Have a project', "in mind? Let's", 'talk.'].map((line, i) => (
              <div key={i} className="overflow-hidden">
                <motion.div
                  initial={{ y: '110%' }}
                  whileInView={{ y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: i * 0.12 }}
                  className="font-display font-black text-ink leading-[0.9] tracking-tight"
                  style={{ fontSize: 'clamp(2.8rem, 7vw, 8rem)' }}
                >
                  {line}
                </motion.div>
              </div>
            ))}
          </div>

          {/* CTA block */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="flex flex-col gap-5 lg:items-end"
          >
            <p className="font-body font-light text-ink/60 text-lg max-w-xs lg:text-right leading-relaxed">
              We take on a limited number of projects each year to ensure exceptional delivery.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <MagneticButton
                as="a"
                href="#contact"
                className="px-8 py-4 bg-ink text-white text-sm font-medium tracking-widest uppercase hover:bg-ink-soft transition-colors duration-300"
              >
                Start a Project&nbsp;→
              </MagneticButton>
              <MagneticButton
                as="a"
                href="mailto:hello@createch.co.ke"
                className="px-8 py-4 border-2 border-ink text-ink text-sm font-medium tracking-widest uppercase hover:bg-ink/5 transition-colors duration-300"
              >
                Email Us Directly
              </MagneticButton>
            </div>
            <p className="font-body text-ink/35 text-xs tracking-wider">
              hello@createch.co.ke · +254 700 000 000
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
