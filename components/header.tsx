"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"

export default function Header() {
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const { scrollY } = useScroll()
  
  // Transform scroll position to opacity and y position
  const opacity = useTransform(scrollY, [0, 100], [1, 0])
  const y = useTransform(scrollY, [0, 100], [0, -20])

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      
      // Hiện header khi scroll lên, ẩn khi scroll xuống
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false)
      } else {
        setIsVisible(true)
      }
      
      setLastScrollY(currentScrollY)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY])

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-sm border-b border-white/10"
      style={{
        opacity: isVisible ? opacity : 0,
        y: isVisible ? y : -20,
      }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-center text-white gap-10">
          <div className="flex items-center space-x-8">
            <span className="font-semibold shadow-lg">About</span>
            <span className="font-semibold shadow-xs">Work</span>
          </div>
          <div className="text-2xl font-bold shadow-xs">CHISA</div>
          <div className="flex items-center space-x-8">
            <span className="font-semibold shadow-xs">Contact</span>
            <span className="font-semibold flex items-center shadow-xs">
              Resume
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </span>
          </div>
        </div>
      </div>
    </motion.header>
  )
} 