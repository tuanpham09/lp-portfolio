"use client"

import { motion, useInView, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"

interface ScrollRevealProps {
  children: React.ReactNode
  delay?: number
  direction?: "up" | "down" | "left" | "right"
  distance?: number
  duration?: number
  className?: string
  stagger?: boolean
}

export default function ScrollReveal({
  children,
  delay = 0,
  direction = "up",
  distance = 50,
  duration = 0.8,
  className = "",
  stagger = false
}: ScrollRevealProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { 
    once: false, 
    margin: "-50px"
  })

  const variants = {
    hidden: {
      opacity: 0,
      y: direction === "up" ? distance : direction === "down" ? -distance : 0,
      x: direction === "left" ? distance : direction === "right" ? -distance : 0,
      scale: 0.9
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      scale: 1
    }
  }

  const containerVariants = {
    hidden: { 
      opacity: 0,
      transition: {
        staggerChildren: 0.05,
        delayChildren: delay
      }
    },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: delay
      }
    }
  }

  if (stagger) {
    return (
      <motion.div
        ref={ref}
        className={className}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={containerVariants}
      >
        {children}
      </motion.div>
    )
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variants}
      transition={{
        duration: duration,
        delay: delay,
        ease: [0.25, 0.46, 0.45, 0.94],
        type: "spring",
        stiffness: 100,
        damping: 20
      }}
      whileInView={{
        opacity: 1,
        y: 0,
        x: 0,
        scale: 1
      }}
      viewport={{ once: false, margin: "-50px" }}
    >
      {children}
    </motion.div>
  )
}

// Smooth reveal with fade in/out on scroll
export function SmoothReveal({ 
  children, 
  delay = 0, 
  className = "",
  threshold = 0.1
}: { 
  children: React.ReactNode, 
  delay?: number, 
  className?: string,
  threshold?: number
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { 
    once: false, 
    margin: "-100px"
  })

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ 
        opacity: 0, 
        y: 50,
        scale: 0.95
      }}
      animate={isInView ? { 
        opacity: 1, 
        y: 0,
        scale: 1
      } : { 
        opacity: 0, 
        y: 50,
        scale: 0.95
      }}
      transition={{
        duration: 0.6,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
    >
      {children}
    </motion.div>
  )
}

// Progressive fade based on distance from center
export function ProgressiveFade({ 
  children, 
  delay = 0, 
  className = "",
  fadeDistance = 300
}: { 
  children: React.ReactNode, 
  delay?: number, 
  className?: string,
  fadeDistance?: number
}) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  })

  // Calculate distance from center of viewport
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [0, 1, 1, 0]
  )

  const scale = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [0.8, 1, 1, 0.8]
  )

  const y = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [50, 0, 0, -50]
  )

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{
        opacity,
        scale,
        y
      }}
      initial={{ 
        opacity: 0, 
        y: 50,
        scale: 0.8
      }}
      transition={{
        duration: 0.8,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
    >
      {children}
    </motion.div>
  )
}

// Distance-based fade with viewport center calculation
export function DistanceFade({ 
  children, 
  delay = 0, 
  className = "",
  fadeStart = 0.1,
  fadeEnd = 0.9
}: { 
  children: React.ReactNode, 
  delay?: number, 
  className?: string,
  fadeStart?: number,
  fadeEnd?: number
}) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  })

  // Progressive opacity based on scroll position
  const opacity = useTransform(
    scrollYProgress,
    [0, fadeStart, fadeEnd, 1],
    [0, 1, 1, 0]
  )

  // Scale effect
  const scale = useTransform(
    scrollYProgress,
    [0, fadeStart, fadeEnd, 1],
    [0.9, 1, 1, 0.9]
  )

  // Y movement
  const y = useTransform(
    scrollYProgress,
    [0, fadeStart, fadeEnd, 1],
    [30, 0, 0, -30]
  )

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{
        opacity,
        scale,
        y
      }}
      transition={{
        duration: 0.6,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
    >
      {children}
    </motion.div>
  )
}

// Specialized components for different effects
export function FlipReveal({ children, delay = 0, className = "" }: { children: React.ReactNode, delay?: number, className?: string }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, margin: "-50px" })

  const variants = {
    hidden: {
      opacity: 0,
      rotateY: 90,
      scale: 0.8
    },
    visible: {
      opacity: 1,
      rotateY: 0,
      scale: 1
    }
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variants}
      transition={{
        duration: 1.2,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94],
        type: "spring",
        stiffness: 80,
        damping: 20
      }}
      style={{
        perspective: "1000px",
        transformStyle: "preserve-3d"
      }}
    >
      {children}
    </motion.div>
  )
}

export function BounceReveal({ children, delay = 0, className = "" }: { children: React.ReactNode, delay?: number, className?: string }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, margin: "-100px" })

  const variants = {
    hidden: {
      opacity: 0,
      y: 100,
      scale: 0.8
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1
    }
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variants}
      transition={{
        duration: 1,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94],
        type: "spring",
        stiffness: 200,
        damping: 10
      }}
    >
      {children}
    </motion.div>
  )
}

export function SlideReveal({ children, delay = 0, direction = "left", className = "" }: { children: React.ReactNode, delay?: number, direction?: "left" | "right", className?: string }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, margin: "-50px" })

  const variants = {
    hidden: {
      opacity: 0,
      x: direction === "left" ? -100 : 100,
      scale: 0.9
    },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1
    }
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variants}
      transition={{
        duration: 0.8,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94],
        type: "spring",
        stiffness: 100,
        damping: 15
      }}
    >
      {children}
    </motion.div>
  )
} 