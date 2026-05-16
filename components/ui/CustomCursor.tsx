'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

type CursorState = 'default' | 'hover' | 'view'

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const [state, setState] = useState<CursorState>('default')
  const [isVisible, setIsVisible] = useState(false)
  const [isMobile, setIsMobile] = useState(true)

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const springConfig = { stiffness: 500, damping: 40, mass: 0.5 }
  const cursorX = useSpring(mouseX, springConfig)
  const cursorY = useSpring(mouseY, springConfig)

  const slowSpringConfig = { stiffness: 150, damping: 20, mass: 0.8 }
  const followerX = useSpring(mouseX, slowSpringConfig)
  const followerY = useSpring(mouseY, slowSpringConfig)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    if (isMobile) return

    const handleMove = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
      setIsVisible(true)
    }

    const handleLeave = () => setIsVisible(false)
    const handleEnter = () => setIsVisible(true)

    document.addEventListener('mousemove', handleMove)
    document.addEventListener('mouseleave', handleLeave)
    document.addEventListener('mouseenter', handleEnter)

    const interactiveEls = () =>
      document.querySelectorAll('a, button, [data-cursor="hover"]')
    const viewEls = () => document.querySelectorAll('[data-cursor="view"]')

    const enterHover = () => setState('hover')
    const enterView = () => setState('view')
    const leaveInteractive = () => setState('default')

    const observe = (root: Document | Element) => {
      interactiveEls().forEach((el) => {
        el.addEventListener('mouseenter', enterHover)
        el.addEventListener('mouseleave', leaveInteractive)
      })
      viewEls().forEach((el) => {
        el.addEventListener('mouseenter', enterView)
        el.addEventListener('mouseleave', leaveInteractive)
      })
    }

    observe(document)

    const mutationObserver = new MutationObserver(() => observe(document))
    mutationObserver.observe(document.body, { childList: true, subtree: true })

    return () => {
      document.removeEventListener('mousemove', handleMove)
      document.removeEventListener('mouseleave', handleLeave)
      document.removeEventListener('mouseenter', handleEnter)
      mutationObserver.disconnect()
    }
  }, [isMobile, mouseX, mouseY])

  if (isMobile) return null

  const dotSize = state === 'default' ? 10 : 0
  const ringSize = state === 'default' ? 0 : 48

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[99999]"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{ opacity: isVisible ? 1 : 0 }}
        transition={{ duration: 0.15 }}
      >
        <motion.div
          className="rounded-full bg-white"
          animate={{
            width: dotSize,
            height: dotSize,
            opacity: state === 'default' ? 1 : 0,
          }}
          transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
        />
      </motion.div>

      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[99998]"
        style={{
          x: followerX,
          y: followerY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{ opacity: isVisible ? 1 : 0 }}
        transition={{ duration: 0.15 }}
      >
        <motion.div
          className="rounded-full border border-white flex items-center justify-center overflow-hidden"
          style={{ mixBlendMode: 'difference' }}
          animate={{
            width: ringSize,
            height: ringSize,
            opacity: state !== 'default' ? 1 : 0,
            backgroundColor: state !== 'default' ? 'white' : 'transparent',
          }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        >
          {state === 'view' && (
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="text-[9px] font-body font-medium tracking-widest text-ink uppercase whitespace-nowrap"
              style={{ mixBlendMode: 'normal', color: '#0D0D0D' }}
            >
              VIEW
            </motion.span>
          )}
        </motion.div>
      </motion.div>
    </>
  )
}
