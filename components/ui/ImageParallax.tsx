'use client'

import { useRef, ReactNode } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { cn } from '@/lib/utils'

interface ImageParallaxProps {
  children: ReactNode
  offset?: number
  className?: string
  innerClassName?: string
}

export function ImageParallax({
  children,
  offset = 60,
  className,
  innerClassName,
}: ImageParallaxProps) {
  const ref = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const y = useTransform(scrollYProgress, [0, 1], [-offset, offset])

  return (
    <div ref={ref} className={cn('overflow-hidden', className)}>
      <motion.div style={{ y }} className={cn('will-change-transform', innerClassName)}>
        {children}
      </motion.div>
    </div>
  )
}
