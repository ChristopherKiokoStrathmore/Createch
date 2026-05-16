'use client'

import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

type CursorState = 'default' | 'hover' | 'view'

export function CustomCursor() {
  const [state, setState] = useState<CursorState>('default')
  const [isVisible, setIsVisible] = useState(false)
  const [isMobile, setIsMobile] = useState(true)

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const cursorX = useSpring(mouseX, { stiffness: 500, damping: 40, mass: 0.5 })
  const cursorY = useSpring(mouseY, { stiffness: 500, damping: 40, mass: 0.5 })

  const followerX = useSpring(mouseX, { stiffness: 150, damping: 20, mass: 0.8 })
  const followerY = useSpring(mouseY, { stiffness: 150, damping: 20, mass: 0.8 })

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  useEffect(() => {
    if (isMobile) return

    const handleMove = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
      setIsVisible(true)

      // Delegated state — no per-element listeners, no MutationObserver
      const target = e.target as HTMLElement
      if (target.closest('[data-cursor="view"]')) {
        setState('view')
      } else if (target.closest('a, button, [data-cursor="hover"]')) {
        setState('hover')
      } else {
        setState('default')
      }
    }

    const handleLeave = () => setIsVisible(false)
    const handleEnter = () => setIsVisible(true)

    document.addEventListener('mousemove', handleMove)
    document.addEventListener('mouseleave', handleLeave)
    document.addEventListener('mouseenter', handleEnter)

    return () => {
      document.removeEventListener('mousemove', handleMove)
      document.removeEventListener('mouseleave', handleLeave)
      document.removeEventListener('mouseenter', handleEnter)
    }
  }, [isMobile, mouseX, mouseY])

  if (isMobile) return null

  return (
    <>
      {/* Dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[99999] rounded-full bg-gold"
        style={{ x: cursorX, y: cursorY, translateX: '-50%', translateY: '-50%' }}
        animate={{
          opacity: isVisible && state === 'default' ? 1 : 0,
          width: state === 'default' ? 10 : 0,
          height: state === 'default' ? 10 : 0,
        }}
        transition={{ duration: 0.2 }}
      />

      {/* Ring — no mixBlendMode to avoid full-page compositing */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[99998] rounded-full border border-gold flex items-center justify-center overflow-hidden"
        style={{ x: followerX, y: followerY, translateX: '-50%', translateY: '-50%' }}
        animate={{
          opacity: isVisible && state !== 'default' ? 1 : 0,
          width: state !== 'default' ? 48 : 0,
          height: state !== 'default' ? 48 : 0,
          backgroundColor: state !== 'default' ? 'rgba(239,159,39,0.15)' : 'transparent',
        }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      >
        {state === 'view' && (
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-[9px] font-body font-medium tracking-widest text-gold uppercase whitespace-nowrap"
          >
            VIEW
          </motion.span>
        )}
      </motion.div>
    </>
  )
}
