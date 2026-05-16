'use client'

import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { Preloader } from '@/components/sections/Preloader'
import { Navbar } from '@/components/sections/Navbar'
import { Hero } from '@/components/sections/Hero'
import { Manifesto } from '@/components/sections/Manifesto'
import { Marquee } from '@/components/sections/Marquee'
import { Services } from '@/components/sections/Services'
import { ProjectGrid } from '@/components/sections/ProjectGrid'
import { FeaturedProject } from '@/components/sections/FeaturedProject'
import { About } from '@/components/sections/About'
import { Values } from '@/components/sections/Values'
import { Process } from '@/components/sections/Process'
import { Testimonials } from '@/components/sections/Testimonials'
import { CtaBanner } from '@/components/sections/CtaBanner'
import { Contact } from '@/components/sections/Contact'
import { Footer } from '@/components/sections/Footer'

export default function Home() {
  const [preloaderDone, setPreloaderDone] = useState(false)

  return (
    <>
      <AnimatePresence mode="wait">
        {!preloaderDone && (
          <Preloader key="preloader" onComplete={() => setPreloaderDone(true)} />
        )}
      </AnimatePresence>

      <Navbar />

      <main>
        {/* 1. Hero — full-bleed photo + headline */}
        <Hero isReady={preloaderDone} />

        {/* 2. Manifesto — scroll-driven word reveal */}
        <Manifesto />

        {/* 3. Gold ticker */}
        <Marquee />

        {/* 4. Services — three disciplines */}
        <Services />

        {/* 5. Project grid — 5 cards with real photos */}
        <ProjectGrid />

        {/* 6. Featured project — single hero showcase */}
        <FeaturedProject />

        {/* 7. About — stats + studio image */}
        <About />

        {/* 8. Values — four principals */}
        <Values />

        {/* 9. Process — horizontal sticky scroll */}
        <Process />

        {/* 10. Testimonials — enlarged quote carousel */}
        <Testimonials />

        {/* 11. CTA banner — gold, full-width */}
        <CtaBanner />

        {/* 12. Contact — form + direct info */}
        <Contact />
      </main>

      <Footer />
    </>
  )
}
