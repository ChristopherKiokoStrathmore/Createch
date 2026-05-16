'use client'

import { motion } from 'framer-motion'

const WORDS = [
  'The', 'measure', 'of', 'great', 'architecture', "isn't", 'how', 'it',
  'looks', 'in', 'a', 'photograph', '—', 'it', 'is', 'how', 'it', 'feels',
  'to', 'come', 'home.',
]

const container = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.055, delayChildren: 0.1 },
  },
}

const wordVariant = {
  hidden: { opacity: 0.06, y: 14, color: 'rgba(255,255,255,0.08)' },
  visible: (isLastWord: boolean) => ({
    opacity: 1,
    y: 0,
    color: isLastWord ? '#EF9F27' : 'rgba(255,255,255,0.92)',
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  }),
}

export function Manifesto() {
  return (
    <section className="bg-ink min-h-screen flex flex-col justify-center py-16 md:py-20 px-6 md:px-10 lg:px-16">
      <div className="max-w-screen-xl mx-auto">
        {/* Label */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-10 md:mb-14"
        >
          <span className="font-body text-white/20 text-[10px] tracking-[0.3em] uppercase">
            Our Belief
          </span>
        </motion.div>

        {/* Staggered word reveal — fires once section enters viewport */}
        <motion.p
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="font-display font-bold leading-tight tracking-tight"
          style={{ fontSize: 'clamp(2.2rem, 5.5vw, 6rem)' }}
          aria-label={WORDS.join(' ')}
        >
          {WORDS.map((word, i) => (
            <motion.span
              key={i}
              custom={word === 'home.'}
              variants={wordVariant}
              style={{ display: 'inline-block', marginRight: '0.3em' }}
              className="will-change-transform"
            >
              {word}
            </motion.span>
          ))}
        </motion.p>

        {/* Attribution */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-14 md:mt-20 flex items-center gap-4"
        >
          <div className="h-px w-12 bg-gold" />
          <span className="font-body font-light text-white/30 text-sm tracking-wider">
            Createch Architects — Studio Philosophy
          </span>
        </motion.div>
      </div>
    </section>
  )
}
