"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"

interface FadeCardProps {
  project: {
    id: number
    title: string
    subtitle: string
    description: string
    year: string
    readTime: string
    color: string
    gradient: string
    image: string
  }
  index: number
}

export default function FadeCard({ project, index }: FadeCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const rotation = index === 1 ? 5 : -3
  
  // Scroll progress for this specific card
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"]
  })

  // Fade out effect based on scroll position
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.1, 0.3, 0.7, 0.9, 1],
    [0, 0, 1, 1, 0, 0]
  )

  // Scale effect
  const scale = useTransform(
    scrollYProgress,
    [0, 0.1, 0.3, 0.7, 0.9, 1],
    [0.8, 0.8, 1, 1, 0.8, 0.8]
  )

  // Y movement
  const y = useTransform(
    scrollYProgress,
    [0, 0.1, 0.3, 0.7, 0.9, 1],
    [50, 30, 0, 0, -30, -50]
  )

  return (
    <motion.div
      ref={cardRef}
      className="relative min-h-screen flex items-center justify-center"
      style={{
        opacity,
        scale,
        y
      }}
    >
      {/* Full Screen Image */}
      <div className="absolute inset-0 w-full h-full flex items-center justify-center">
        <motion.div
          className="relative w-full h-full flex items-center justify-center"
          initial={{ rotate: rotation, y: 50 }}
          animate={{ rotate: 0, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <img 
            src={project.image} 
            alt={project.title}
            className="w-full h-full object-contain"
            style={{ maxWidth: '70%' }}
          />
          <div className="absolute inset-0" />
        </motion.div>
      </div>
    </motion.div>
  )
} 