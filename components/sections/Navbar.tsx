'use client'

import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence, useScroll } from 'framer-motion'
import { X, Menu } from 'lucide-react'
import { MagneticButton } from '@/components/ui/MagneticButton'
import { navLinks } from '@/lib/data'
import { mobileMenuVariants, mobileMenuLinks } from '@/lib/animations'
import { cn } from '@/lib/utils'

const SCRAMBLE_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'

function useScramble() {
  return useCallback(async (el: HTMLElement) => {
    if (typeof window === 'undefined') return
    const originalText = el.dataset.text || el.textContent || ''
    const animeModule = await import('animejs')
    const anime = animeModule.default
    const counter = { value: 0 }
    anime.remove(el)
    anime({
      targets: counter,
      value: originalText.length,
      duration: 600,
      easing: 'easeInOutQuad',
      update: function () {
        el.textContent = originalText
          .split('')
          .map((char: string, idx: number) => {
            if (char === ' ') return ' '
            if (idx < Math.floor(counter.value)) return originalText[idx]
            return SCRAMBLE_CHARS[Math.floor(Math.random() * 26)]
          })
          .join('')
      },
      complete: function () {
        el.textContent = originalText
      },
    })
  }, [])
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const scramble = useScramble()
  const { scrollY } = useScroll()

  useEffect(() => {
    return scrollY.on('change', (y) => setScrolled(y > 80))
  }, [scrollY])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const handleScramble = (e: React.MouseEvent<HTMLAnchorElement>) => {
    scramble(e.currentTarget)
  }

  return (
    <>
      <motion.header
        animate={scrolled ? 'filled' : 'transparent'}
        variants={{
          transparent: {
            backgroundColor: 'rgba(13,13,13,0)',
            backdropFilter: 'blur(0px)',
          },
          filled: {
            backgroundColor: 'rgba(250,250,248,0.96)',
            backdropFilter: 'blur(12px)',
          },
        }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 right-0 z-50 px-4 md:px-8 lg:px-14"
      >
        <div className="flex items-center justify-between h-[68px] md:h-20">

          {/* ── Logo ── */}
          <a href="#" className="flex-shrink-0" aria-label="Createch Architects – Home">
            {/*
              The logo is a JPEG (white background).
              • Dark state (transparent navbar): white logo badge sits against the dark hero —
                reads as a precision nameplate / plaque. Very intentional.
              • Chalk state (scrolled): white logo bg is invisible against chalk navbar. Seamless.
            */}
            <motion.div
              animate={scrolled
                ? { backgroundColor: 'transparent', padding: '0px', boxShadow: 'none' }
                : { backgroundColor: 'rgba(255,255,255,0.96)', padding: '6px 10px', boxShadow: '0 0 0 1px rgba(239,159,39,0.2)' }
              }
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center"
            >
              <Image
                src="/logo.jpg"
                alt="Createch Architects"
                width={140}
                height={56}
                className="h-[44px] md:h-[52px] w-auto object-contain"
                priority
              />
            </motion.div>
          </a>

          {/* ── Nav links ── */}
          <nav className="hidden md:flex items-center gap-8 lg:gap-10">
            {navLinks.map((link) => (
              <motion.a
                key={link.label}
                href={link.href}
                data-text={link.label.toUpperCase()}
                onMouseEnter={handleScramble}
                animate={{ color: scrolled ? '#0D0D0D' : '#FFFFFF' }}
                transition={{ duration: 0.4 }}
                className="font-body text-sm font-medium tracking-[0.05em] uppercase hover:text-gold transition-colors duration-200"
              >
                {link.label.toUpperCase()}
              </motion.a>
            ))}
          </nav>

          {/* ── CTA ── */}
          <div className="hidden md:block">
            <MagneticButton
              as="a"
              href="#contact"
              className={cn(
                'px-5 py-2.5 border text-sm font-medium tracking-widest uppercase transition-all duration-300',
                scrolled
                  ? 'border-ink text-ink hover:bg-ink hover:text-white'
                  : 'border-white/40 text-white hover:border-gold hover:text-gold'
              )}
            >
              Start a Project&nbsp;→
            </MagneticButton>
          </div>

          {/* ── Mobile hamburger ── */}
          <button
            onClick={() => setMenuOpen(true)}
            className="md:hidden p-2 -mr-2"
            aria-label="Open menu"
          >
            <motion.div animate={{ color: scrolled ? '#0D0D0D' : '#FFFFFF' }}>
              <Menu size={22} />
            </motion.div>
          </button>
        </div>
      </motion.header>

      {/* ── Mobile full-screen menu ── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            variants={mobileMenuVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="fixed inset-0 bg-ink z-[90] flex flex-col px-8 py-10"
          >
            {/* Mobile menu header with logo */}
            <div className="flex justify-between items-center mb-16">
              <div className="bg-white px-3 py-2">
                <Image
                  src="/logo.jpg"
                  alt="Createch Architects"
                  width={120}
                  height={48}
                  className="h-10 w-auto object-contain"
                />
              </div>
              <button
                onClick={() => setMenuOpen(false)}
                className="text-white/60 hover:text-white p-2 -mr-2 transition-colors"
                aria-label="Close menu"
              >
                <X size={22} />
              </button>
            </div>

            {/* Links */}
            <nav className="flex flex-col gap-6 flex-1 justify-center">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  custom={i}
                  variants={mobileMenuLinks}
                  initial="closed"
                  animate="open"
                  onClick={() => setMenuOpen(false)}
                  className="font-display text-5xl font-bold text-white hover:text-gold transition-colors duration-200"
                >
                  {link.label}
                </motion.a>
              ))}
            </nav>

            {/* Mobile footer */}
            <div className="mt-auto space-y-1">
              <p className="font-body text-white/25 text-sm">hello@createch.co.ke</p>
              <p className="font-body text-white/25 text-sm">+254 700 000 000</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
