'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface Project {
  id: number
  name: string
  category: string
  location: string
  year: string
  imageUrl: string
  gradient: string
}

interface ProjectCardProps {
  project: Project
  className?: string
  priority?: boolean
}

const imageVariant = {
  initial: { scale: 1 },
  hover: {
    scale: 1.07,
    transition: { duration: 0.75, ease: [0.25, 0.46, 0.45, 0.94] },
  },
}

const overlayVariant = {
  initial: { opacity: 0 },
  hover: { opacity: 1, transition: { duration: 0.4 } },
}

const stripVariant = {
  initial: { y: '100%' },
  hover: { y: 0, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } },
}

export function ProjectCard({ project, className, priority = false }: ProjectCardProps) {
  return (
    <motion.article
      className={cn('relative overflow-hidden group cursor-none bg-ink-soft', className)}
      data-cursor="view"
      initial="initial"
      whileHover="hover"
    >
      {/* Photo */}
      <motion.div variants={imageVariant} className="absolute inset-0 will-change-transform">
        <Image
          src={project.imageUrl}
          alt={project.name}
          fill
          className="object-cover object-center"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 60vw, 40vw"
          priority={priority}
        />
      </motion.div>

      {/* Base gradient (always present, ensures text legibility) */}
      <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/20 to-transparent" />

      {/* Hover gold overlay */}
      <motion.div
        variants={overlayVariant}
        className="absolute inset-0 bg-gold/10"
        aria-hidden="true"
      />

      {/* Content */}
      <div className="absolute inset-0 p-5 md:p-6 flex flex-col justify-between">
        {/* Top */}
        <div className="flex items-start justify-between">
          <span className="font-body text-white/50 text-xs font-medium">
            {String(project.id).padStart(2, '0')}
          </span>
          <span className="font-body text-[9px] font-medium tracking-[0.15em] uppercase text-white/70 bg-ink/50 px-2.5 py-1 rounded-full backdrop-blur-sm border border-white/10">
            {project.category}
          </span>
        </div>

        {/* Bottom */}
        <div className="overflow-hidden">
          <div className="group-hover:-translate-y-2 transition-transform duration-500 ease-out">
            <h3 className="font-display font-bold text-white leading-tight mb-1"
              style={{ fontSize: 'clamp(1.1rem, 2vw, 1.5rem)' }}>
              {project.name}
            </h3>
            <p className="font-body font-light text-white/50 text-sm">
              {project.location} · {project.year}
            </p>
          </div>
        </div>
      </div>

      {/* Hover reveal strip */}
      <motion.div
        variants={stripVariant}
        className="absolute bottom-0 left-0 right-0 bg-gold py-3.5 px-6 flex items-center justify-between"
        aria-hidden="true"
      >
        <span className="font-body text-ink text-[11px] font-semibold tracking-[0.2em] uppercase">
          View Project
        </span>
        <span className="font-display text-ink font-bold">→</span>
      </motion.div>
    </motion.article>
  )
}
