'use client'

import { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { textClipReveal, viewportConfig } from '@/lib/animations'

interface TextRevealProps {
  children: ReactNode
  className?: string
  delay?: number
  as?: keyof JSX.IntrinsicElements
}

export function TextReveal({
  children,
  className,
  delay = 0,
  as: Tag = 'div',
}: TextRevealProps) {
  return (
    <div className="overflow-hidden">
      <motion.div
        variants={textClipReveal}
        initial="hidden"
        whileInView="visible"
        viewport={viewportConfig}
        transition={{
          duration: 0.9,
          ease: [0.16, 1, 0.3, 1],
          delay,
        }}
        className={className}
      >
        {children}
      </motion.div>
    </div>
  )
}

interface MultilineRevealProps {
  lines: string[]
  className?: string
  lineClassName?: string
  stagger?: number
  baseDelay?: number
}

export function MultilineReveal({
  lines,
  className,
  lineClassName,
  stagger = 0.15,
  baseDelay = 0,
}: MultilineRevealProps) {
  return (
    <div className={className}>
      {lines.map((line, i) => (
        <div key={i} className="overflow-hidden">
          <motion.div
            initial={{ y: '105%' }}
            whileInView={{ y: 0 }}
            viewport={viewportConfig}
            transition={{
              duration: 0.9,
              ease: [0.16, 1, 0.3, 1],
              delay: baseDelay + i * stagger,
            }}
            className={lineClassName}
          >
            {line}
          </motion.div>
        </div>
      ))}
    </div>
  )
}
