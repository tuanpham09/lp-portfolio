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
      className="fixed top-0 transform -translate-x-1/2 z-50 w-full px-6 md:px-8"
      style={{
        opacity: isVisible ? opacity : 0,
        y: isVisible ? y : -20,
      }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      <motion.nav
        className="flex items-center justify-between p-4 md:p-6 backdrop-blur-md rounded-2xl border border-white/20 shadow-2xl"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="flex items-center space-x-8">
          <motion.div 
            className="text-2xl font-bold text-white font-naroline"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            Meet
          </motion.div>
          <div className="hidden md:flex items-center space-x-8 text-sm">
            <motion.a 
              href="#" 
              className="text-white/80 hover:text-white transition-colors relative group font-naroline"
              whileHover={{ y: -2 }}
            >
              About
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white transition-all group-hover:w-full"></span>
            </motion.a>
            <motion.a 
              href="#" 
              className="text-white/80 hover:text-white transition-colors relative group font-naroline"
              whileHover={{ y: -2 }}
            >
              Work
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white transition-all group-hover:w-full"></span>
            </motion.a>
            <motion.a 
              href="#" 
              className="text-white/80 hover:text-white transition-colors relative group font-naroline"
              whileHover={{ y: -2 }}
            >
              Playground
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white transition-all group-hover:w-full"></span>
            </motion.a>
            <motion.a 
              href="#" 
              className="text-white/80 hover:text-white transition-colors relative group font-naroline"
              whileHover={{ y: -2 }}
            >
              Services
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white transition-all group-hover:w-full"></span>
            </motion.a>
            <motion.a 
              href="#" 
              className="text-white/80 hover:text-white transition-colors relative group font-naroline"
              whileHover={{ y: -2 }}
            >
              Contact
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white transition-all group-hover:w-full"></span>
            </motion.a>
          </div>
        </div>
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button 
            variant="outline" 
            className="border-white/20 text-white hover:bg-white/10 bg-transparent backdrop-blur-sm font-naroline"
          >
            Resume
          </Button>
        </motion.div>
      </motion.nav>
    </motion.header>
  )
} 