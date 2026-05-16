'use client'

import { motion } from 'framer-motion'
import { ProjectCard } from './ProjectCard'
import { projects } from '@/lib/data'
import { fadeInUp, staggerContainer, viewportConfig } from '@/lib/animations'

export function ProjectGrid() {
  const [p1, p2, p3, p4, p5] = projects

  return (
    <section id="projects" className="bg-ink py-24 md:py-36 px-6 md:px-10 lg:px-16">
      <div className="max-w-screen-xl mx-auto">
        {/* Header */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="mb-12 md:mb-16"
        >
          <motion.div variants={fadeInUp} className="mb-3">
            <span className="font-body text-white/30 text-[10px] font-medium tracking-[0.28em] uppercase">
              Selected Work
            </span>
          </motion.div>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div className="overflow-hidden">
              <motion.h2
                initial={{ y: '105%' }}
                whileInView={{ y: 0 }}
                viewport={viewportConfig}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                className="font-display font-bold text-white leading-tight tracking-tight"
                style={{ fontSize: 'clamp(2rem, 4vw, 4.5rem)' }}
              >
                Built Across Africa
              </motion.h2>
            </div>
            <motion.a
              variants={fadeInUp}
              href="#contact"
              className="font-body text-sm text-white/30 hover:text-gold transition-colors duration-300 tracking-wider uppercase border-b border-white/10 hover:border-gold/40 pb-0.5 w-fit whitespace-nowrap"
            >
              See all projects →
            </motion.a>
          </div>
        </motion.div>

        {/* Asymmetric Grid */}
        <div className="flex flex-col gap-3 md:gap-4">
          {/* Row 1: large (60%) + tall (40%) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-1 md:grid-cols-[62fr_38fr] gap-3 md:gap-4"
          >
            <ProjectCard
              project={p1}
              className="aspect-[4/3] md:aspect-[16/11]"
              priority
            />
            <ProjectCard
              project={p2}
              className="aspect-[4/3] md:aspect-auto"
              priority
            />
          </motion.div>

          {/* Row 2: three equal */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4"
          >
            <ProjectCard project={p3} className="aspect-[4/3]" />
            <ProjectCard project={p4} className="aspect-[4/3]" />
            <ProjectCard project={p5} className="aspect-[4/3]" />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
