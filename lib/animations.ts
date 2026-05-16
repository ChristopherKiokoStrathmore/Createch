import { Variants } from 'framer-motion'

export const easeInOutCubic = [0.65, 0, 0.35, 1] as const
export const easeOutExpo = [0.16, 1, 0.3, 1] as const
export const easeInOutQuart = [0.76, 0, 0.24, 1] as const

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.6, ease: easeOutExpo },
  },
}

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: easeOutExpo },
  },
}

export const fadeInDown: Variants = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: easeOutExpo },
  },
}

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
}

export const staggerContainerFast: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.1,
    },
  },
}

export const textClipReveal: Variants = {
  hidden: { y: '100%' },
  visible: {
    y: 0,
    transition: { duration: 0.9, ease: easeOutExpo },
  },
}

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.8, ease: easeOutExpo },
  },
}

export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: easeOutExpo },
  },
}

export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: easeOutExpo },
  },
}

export const overlayReveal: Variants = {
  initial: { y: 0 },
  exit: {
    y: '-100%',
    transition: { duration: 0.9, ease: easeInOutQuart },
  },
}

export const navbarVariants: Variants = {
  transparent: {
    backgroundColor: 'rgba(13,13,13,0)',
    backdropFilter: 'blur(0px)',
  },
  filled: {
    backgroundColor: 'rgba(250,250,248,0.95)',
    backdropFilter: 'blur(8px)',
  },
}

export const cardHoverImage: Variants = {
  initial: { scale: 1 },
  hover: {
    scale: 1.06,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
  },
}

export const cardHoverOverlay: Variants = {
  initial: { opacity: 0 },
  hover: {
    opacity: 0.15,
    transition: { duration: 0.4, ease: 'easeInOut' },
  },
}

export const cardHoverStrip: Variants = {
  initial: { y: '100%' },
  hover: {
    y: 0,
    transition: { duration: 0.4, ease: easeOutExpo },
  },
}

export const mobileMenuVariants: Variants = {
  closed: {
    x: '100%',
    transition: { duration: 0.5, ease: easeInOutQuart },
  },
  open: {
    x: 0,
    transition: { duration: 0.5, ease: easeInOutQuart },
  },
}

export const mobileMenuLinks: Variants = {
  closed: { opacity: 0, x: 40 },
  open: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: 0.2 + i * 0.08,
      duration: 0.5,
      ease: easeOutExpo,
    },
  }),
}

export const viewportConfig = {
  once: true,
  margin: '0px',
} as const
