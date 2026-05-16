'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

const WORDS = [
  'The', 'measure', 'of', 'great', 'architecture', "isn't", 'how', 'it',
  'looks', 'in', 'a', 'photograph', '—', 'it', 'is', 'how', 'it', 'feels',
  'to', 'come', 'home.',
]

export function Manifesto() {
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })

  return (
    <section
      ref={containerRef}
      className="bg-ink py-28 md:py-40 px-6 md:px-10 lg:px-16 overflow-hidden"
    >
      <div className="max-w-screen-xl mx-auto">
        {/* Label */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12 md:mb-16"
        >
          <span className="font-body text-white/20 text-[10px] tracking-[0.3em] uppercase">
            Our Belief
          </span>
        </motion.div>

        {/* Word-by-word reveal */}
        <p
          className="font-display font-bold text-white/10 leading-tight tracking-tight"
          style={{ fontSize: 'clamp(2.2rem, 5.5vw, 6rem)' }}
          aria-label={WORDS.join(' ')}
        >
          {WORDS.map((word, i) => (
            <ManifestoWord
              key={i}
              word={word}
              index={i}
              total={WORDS.length}
              scrollYProgress={scrollYProgress}
            />
          ))}
        </p>

        {/* Attribution */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 md:mt-20 flex items-center gap-4"
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

function ManifestoWord({
  word,
  index,
  total,
  scrollYProgress,
}: {
  word: string
  index: number
  total: number
  scrollYProgress: ReturnType<typeof useScroll>['scrollYProgress']
}) {
  const start = 0.1 + (index / total) * 0.55
  const end = start + 0.18

  const opacity = useTransform(scrollYProgress, [start, end], [0.08, 1])
  const y = useTransform(scrollYProgress, [start, end], [12, 0])
  const color = useTransform(
    scrollYProgress,
    [start, end],
    ['rgba(255,255,255,0.08)', word === 'home.' ? '#EF9F27' : 'rgba(255,255,255,0.95)']
  )

  return (
    <motion.span
      style={{ opacity, y, color, display: 'inline-block', marginRight: '0.3em' }}
      className="will-change-transform"
    >
      {word}
    </motion.span>
  )
}
