'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { Instagram, Linkedin, ExternalLink } from 'lucide-react'
import { footerLinks } from '@/lib/data'
import { fadeInUp, staggerContainer, viewportConfig } from '@/lib/animations'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-ink-soft">
      {/* Main footer body */}
      <div className="max-w-screen-xl mx-auto px-6 md:px-10 lg:px-16 pt-16 pb-8 md:pt-20 md:pb-10">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-8 mb-16 md:mb-20"
        >
          {/* Brand */}
          <motion.div variants={fadeInUp} className="col-span-2 md:col-span-1">
            {/*
              Logo in footer (dark bg).
              White badge approach: the logo sits in a compact white container.
              On the dark footer this reads as a precision logo plaque / stamp.
            */}
            <div className="mb-6 inline-block bg-white px-4 py-3"
              style={{ boxShadow: '0 0 0 1px rgba(239,159,39,0.12)' }}>
              <Image
                src="/logo.jpg"
                alt="Createch Architects"
                width={140}
                height={56}
                className="h-[52px] w-auto object-contain"
              />
            </div>
            <p className="font-body font-light text-white/30 text-sm leading-relaxed mb-6">
              Architecture & Interiors.
              <br />
              Nairobi · East Africa.
            </p>
            <div className="flex gap-4">
              {[
                { icon: Instagram, label: 'Instagram', href: 'https://instagram.com' },
                { icon: Linkedin, label: 'LinkedIn', href: 'https://linkedin.com' },
                { icon: ExternalLink, label: 'Houzz', href: 'https://houzz.com' },
              ].map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 border border-white/10 flex items-center justify-center text-white/30 hover:text-gold hover:border-gold/30 transition-all duration-300"
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Navigate */}
          <motion.div variants={fadeInUp}>
            <p className="font-body text-white/20 text-[10px] tracking-[0.25em] uppercase mb-5">Navigate</p>
            <ul className="space-y-3">
              {footerLinks.navigation.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="font-body font-light text-white/45 text-sm hover:text-white transition-colors duration-300">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Services */}
          <motion.div variants={fadeInUp}>
            <p className="font-body text-white/20 text-[10px] tracking-[0.25em] uppercase mb-5">Services</p>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="font-body font-light text-white/45 text-sm hover:text-white transition-colors duration-300">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div variants={fadeInUp}>
            <p className="font-body text-white/20 text-[10px] tracking-[0.25em] uppercase mb-5">Contact</p>
            <div className="space-y-4">
              <div>
                <a href="mailto:hello@createch.co.ke" className="font-body font-light text-white/45 text-sm hover:text-gold transition-colors duration-300 block">
                  hello@createch.co.ke
                </a>
                <a href="tel:+254733622848" className="font-body font-light text-white/45 text-sm hover:text-gold transition-colors duration-300 block">
                  +254 733 622 848
                </a>
              </div>
              <div>
                <p className="font-body font-light text-white/20 text-sm leading-relaxed">
                  Westlands, Nairobi<br />Kenya
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Gold divider */}
        <div className="h-px bg-white/5 mb-8" />

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
          <p className="font-body font-light text-white/20 text-xs">
            &copy; {year} Createch Architects. All rights reserved.
          </p>
          <p className="font-body font-light text-white/15 text-xs">
            Designed with intention.
          </p>
        </div>
      </div>
    </footer>
  )
}
