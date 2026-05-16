'use client'

import { useRef, FormEvent, useState } from 'react'
import { motion } from 'framer-motion'
import { MagneticButton } from '@/components/ui/MagneticButton'
import { fadeInUp, staggerContainer, viewportConfig } from '@/lib/animations'

const SCRAMBLE_CHARS = 'abcdefghijklmnopqrstuvwxyz@.'

function ScrambleText({ text, className }: { text: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const iteration = useRef(0)

  const handleMouseEnter = async () => {
    if (typeof window === 'undefined') return
    const el = ref.current
    if (!el) return

    const animeModule = await import('animejs')
    const anime = animeModule.default

    iteration.current = 0
    if (intervalRef.current) clearInterval(intervalRef.current)

    const counter = { value: 0 }
    anime({
      targets: counter,
      value: text.length,
      duration: 700,
      easing: 'easeInOutQuad',
      update: function () {
        const progress = counter.value
        if (!el) return
        el.textContent = text
          .split('')
          .map((char: string, idx: number) => {
            if (char === '@' || char === '.' || char === '+' || char === ' ') return char
            if (idx < Math.floor(progress)) return text[idx]
            return SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)]
          })
          .join('')
      },
      complete: function () {
        if (el) el.textContent = text
      },
    })
  }

  return (
    <span
      ref={ref}
      className={className}
      onMouseEnter={handleMouseEnter}
    >
      {text}
    </span>
  )
}

interface FloatingInputProps {
  id: string
  label: string
  type?: string
  required?: boolean
}

function FloatingInput({ id, label, type = 'text', required }: FloatingInputProps) {
  const borderRef = useRef<HTMLDivElement>(null)

  const handleFocus = async () => {
    if (typeof window === 'undefined') return
    const el = borderRef.current
    if (!el) return
    const animeModule = await import('animejs')
    const anime = animeModule.default
    anime({ targets: el, scaleX: [0, 1], duration: 400, easing: 'easeOutQuart' })
  }

  const handleBlur = async () => {
    if (typeof window === 'undefined') return
    const el = borderRef.current
    if (!el) return
    const animeModule = await import('animejs')
    const anime = animeModule.default
    anime({ targets: el, scaleX: [1, 0], duration: 300, easing: 'easeInQuart' })
  }

  return (
    <div className="relative pt-5 group">
      <label
        htmlFor={id}
        className="absolute top-5 left-0 font-body text-ink/40 text-sm transition-all duration-300 pointer-events-none
          peer-focus:-top-0 peer-focus:text-[11px] peer-focus:text-gold
          peer-[&:not(:placeholder-shown)]:-top-0 peer-[&:not(:placeholder-shown)]:text-[11px]"
      >
        {label}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        required={required}
        placeholder=" "
        className="peer w-full bg-transparent border-0 border-b border-ink/15 text-ink font-body font-light text-base py-2.5 focus:outline-none focus:ring-0 placeholder-transparent"
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
      <div
        ref={borderRef}
        className="absolute bottom-0 left-0 w-full h-px bg-gold origin-left"
        style={{ transform: 'scaleX(0)' }}
        aria-hidden="true"
      />
    </div>
  )
}

interface FloatingSelectProps {
  id: string
  label: string
  options: string[]
}

function FloatingSelect({ id, label, options }: FloatingSelectProps) {
  const borderRef = useRef<HTMLDivElement>(null)

  const handleFocus = async () => {
    if (typeof window === 'undefined') return
    const el = borderRef.current
    if (!el) return
    const animeModule = await import('animejs')
    const anime = animeModule.default
    anime({ targets: el, scaleX: [0, 1], duration: 400, easing: 'easeOutQuart' })
  }

  const handleBlur = async () => {
    if (typeof window === 'undefined') return
    const el = borderRef.current
    if (!el) return
    const animeModule = await import('animejs')
    const anime = animeModule.default
    anime({ targets: el, scaleX: [1, 0], duration: 300, easing: 'easeInQuart' })
  }

  return (
    <div className="relative pt-5">
      <label htmlFor={id} className="absolute top-0 left-0 font-body text-gold text-[11px] tracking-wider uppercase">
        {label}
      </label>
      <select
        id={id}
        name={id}
        className="w-full bg-transparent border-0 border-b border-ink/15 text-ink/70 font-body font-light text-base py-2.5 focus:outline-none focus:ring-0 appearance-none cursor-pointer"
        onFocus={handleFocus}
        onBlur={handleBlur}
      >
        <option value="" className="bg-white text-ink">Select project type</option>
        {options.map((opt) => (
          <option key={opt} value={opt.toLowerCase()} className="bg-white text-ink">
            {opt}
          </option>
        ))}
      </select>
      <div
        ref={borderRef}
        className="absolute bottom-0 left-0 w-full h-px bg-gold origin-left"
        style={{ transform: 'scaleX(0)' }}
        aria-hidden="true"
      />
    </div>
  )
}

interface FloatingTextareaProps {
  id: string
  label: string
  rows?: number
}

function FloatingTextarea({ id, label, rows = 4 }: FloatingTextareaProps) {
  const borderRef = useRef<HTMLDivElement>(null)

  const handleFocus = async () => {
    if (typeof window === 'undefined') return
    const el = borderRef.current
    if (!el) return
    const animeModule = await import('animejs')
    const anime = animeModule.default
    anime({ targets: el, scaleX: [0, 1], duration: 400, easing: 'easeOutQuart' })
  }

  const handleBlur = async () => {
    if (typeof window === 'undefined') return
    const el = borderRef.current
    if (!el) return
    const animeModule = await import('animejs')
    const anime = animeModule.default
    anime({ targets: el, scaleX: [1, 0], duration: 300, easing: 'easeInQuart' })
  }

  return (
    <div className="relative pt-5 group">
      <label
        htmlFor={id}
        className="absolute top-5 left-0 font-body text-ink/40 text-sm pointer-events-none
          peer-focus:-top-0 peer-focus:text-[11px] peer-focus:text-gold
          peer-[&:not(:placeholder-shown)]:-top-0"
      >
        {label}
      </label>
      <textarea
        id={id}
        name={id}
        rows={rows}
        placeholder=" "
        className="peer w-full bg-transparent border-0 border-b border-ink/15 text-ink font-body font-light text-base py-2.5 focus:outline-none focus:ring-0 placeholder-transparent resize-none"
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
      <div
        ref={borderRef}
        className="absolute bottom-0 left-0 w-full h-px bg-gold origin-left"
        style={{ transform: 'scaleX(0)' }}
        aria-hidden="true"
      />
    </div>
  )
}

export function Contact() {
  const dividerRef = useRef<HTMLDivElement>(null)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 4000)
  }

  return (
    <section id="contact" className="bg-white min-h-screen flex flex-col justify-center py-10 md:py-14 px-6 md:px-10 lg:px-16">
      <div className="max-w-screen-xl mx-auto">
        {/* Heading */}
        <div className="mb-10 md:mb-12">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportConfig}
            className="mb-4"
          >
            <span className="font-body text-gold text-[10px] font-medium tracking-[0.28em] uppercase">
              Get in Touch
            </span>
          </motion.div>
          {['Start Your', 'Project'].map((word, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: i * 0.12 }}
              className="font-display font-black text-ink leading-tight tracking-tight"
              style={{ fontSize: 'clamp(2.2rem, 4.5vw, 5rem)' }}
            >
              {word}
            </motion.div>
          ))}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportConfig}
            transition={{ delay: 0.4 }}
            className="font-body font-light text-gold text-lg mt-4"
          >
            Based in Nairobi. Building across Africa.
          </motion.p>
        </div>

        {/* Grid: form + contact info */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-12 lg:gap-0">
          {/* Form */}
          <motion.form
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            onSubmit={handleSubmit}
            className="space-y-8"
          >
            <motion.div variants={fadeInUp}>
              <FloatingInput id="name" label="Full Name" required />
            </motion.div>
            <motion.div variants={fadeInUp}>
              <FloatingInput id="email" label="Email Address" type="email" required />
            </motion.div>
            <motion.div variants={fadeInUp}>
              <FloatingSelect
                id="project_type"
                label="Project Type"
                options={['Residential', 'Commercial', 'Interiors', 'Other']}
              />
            </motion.div>
            <motion.div variants={fadeInUp}>
              <FloatingTextarea id="message" label="Tell us about your project" />
            </motion.div>

            <motion.div variants={fadeInUp}>
              {submitted ? (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="font-body text-gold text-sm py-4"
                >
                  Message received. We will be in touch within 24 hours.
                </motion.p>
              ) : (
                <MagneticButton
                  type="submit"
                  className="w-full py-5 bg-gold text-ink text-sm font-medium tracking-widest uppercase hover:shadow-[0_8px_30px_rgba(239,159,39,0.3)] transition-shadow duration-300"
                >
                  Send Message&nbsp;→
                </MagneticButton>
              )}
            </motion.div>
          </motion.form>

          {/* Vertical divider */}
          <div className="hidden lg:flex justify-center px-16 py-4">
            <motion.div
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={viewportConfig}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
              className="w-px h-full bg-gold/20 origin-top"
            />
          </div>

          {/* Contact info */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            className="flex flex-col justify-center gap-10 lg:pl-4"
          >
            <motion.div variants={fadeInUp}>
              <p className="font-body text-ink/30 text-xs tracking-[0.2em] uppercase mb-3">
                Or reach us directly
              </p>
              <a
                href="mailto:hello@createch.co.ke"
                className="font-body text-xl md:text-2xl text-ink hover:text-gold transition-colors duration-300 block mb-1"
              >
                <ScrambleText text="hello@createch.co.ke" className="cursor-pointer" />
              </a>
              <p className="font-body font-light text-ink/50 text-base">
                +254 733 622 848
              </p>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <p className="font-body text-ink/30 text-xs tracking-[0.2em] uppercase mb-4">
                Location
              </p>
              <p className="font-body font-light text-ink/60 text-base leading-relaxed">
                Westlands, Nairobi
                <br />
                Kenya
              </p>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <a
                href="https://wa.me/254733622848"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-6 py-3.5 bg-[#25D366] text-white font-body text-sm font-medium tracking-wider hover:bg-[#1da851] transition-colors duration-300"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Chat on WhatsApp
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
