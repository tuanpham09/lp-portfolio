"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { useEffect, useState } from "react"
import VendingMachine from "@/components/vending-machine"
import Header from "@/components/header"

export default function MeetVoraPortfolio() {
  const [time, setTime] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setTime((prev) => prev + 0.01)
    }, 16) // ~60fps

    return () => clearInterval(interval)
  }, [])

  const floatingElements = [
    {
      id: 1,
      content: (
        <div className="w-64 h-40 rounded-lg shadow-2xl overflow-hidden">
          <img 
            src="/images/preview-image/490.png" 
            alt="Project 1" 
            className="w-full h-full object-cover"
          />
        </div>
      ),
      radius: 380,
      speed: 0.2,
      offset: 0,
    },
    {
      id: 2,
      content: (
        <div className="w-56 h-72 rounded-xl shadow-2xl overflow-hidden">
          <img 
            src="/images/preview-image/643.png" 
            alt="Project 2" 
            className="w-full h-full object-cover"
          />
        </div>
      ),
      radius: 420,
      speed: 0.2,
      offset: Math.PI / 4,
    },
    {
      id: 3,
      content: (
        <div className="w-68 h-48 rounded-lg shadow-2xl overflow-hidden">
          <img 
            src="/images/preview-image/drge.png" 
            alt="Project 3" 
            className="w-full h-full object-cover"
          />
        </div>
      ),
      radius: 400,
      speed: 0.2,
      offset: (Math.PI * 2) / 4,
    },
    {
      id: 4,
      content: (
        <div className="w-60 h-36 rounded-lg shadow-2xl overflow-hidden">
          <img 
            src="/images/preview-image/JGVKJ.png" 
            alt="Project 4" 
            className="w-full h-full object-cover"
          />
        </div>
      ),
      radius: 440,
      speed: 0.2,
      offset: (Math.PI * 3) / 4,
    },
    {
      id: 5,
      content: (
        <div className="w-48 h-64 rounded-xl shadow-2xl overflow-hidden">
          <img 
            src="/images/preview-image/poster.jpg" 
            alt="Project 5" 
            className="w-full h-full object-cover"
          />
        </div>
      ),
      radius: 460,
      speed: 0.2,
      offset: Math.PI,
    },
    {
      id: 6,
      content: (
        <div className="w-56 h-40 rounded-lg shadow-2xl overflow-hidden">
          <img 
            src="/images/preview-image/11495673.jpg" 
            alt="Project 6" 
            className="w-full h-full object-cover"
          />
        </div>
      ),
      radius: 410,
      speed: 0.2,
      offset: (Math.PI * 5) / 4,
    },
    {
      id: 7,
      content: (
        <div className="w-60 h-48 rounded-lg shadow-2xl overflow-hidden">
          <img 
            src="/images/preview-image/porfilor.jpg" 
            alt="Project 7" 
            className="w-full h-full object-cover"
          />
        </div>
      ),
      radius: 400,
      speed: 0.2,
      offset: (Math.PI * 6) / 4,
    },
    {
      id: 8,
      content: (
        <div className="w-52 h-52 rounded-xl shadow-2xl overflow-hidden">
          <img 
            src="/images/preview-image/heiniken-2.jpg" 
            alt="Project 8" 
            className="w-full h-full object-cover"
          />
        </div>
      ),
      radius: 430,
      speed: 0.2,
      offset: (Math.PI * 7) / 4,
    },
  ]

  return (
    <div className="bg-[#f34c26] text-white relative overflow-hidden">
      {/* Header */}
      <Header />
      
      {/* Hero Section */}
      <div className="min-h-screen relative">

        {/* Main Content */}
        <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 text-center pt-20">
                      {/* Floating Elements - Circular Motion */}
            <div className="absolute inset-0 flex items-center justify-center top-20">
            {floatingElements.map((element) => {
              const angle = time * element.speed + element.offset
              const x = Math.cos(angle) * element.radius
              const y = Math.sin(angle) * element.radius

              return (
                <motion.div
                  key={element.id}
                  className="absolute"
                  style={{
                    x: x,
                    y: y,
                  }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    duration: 0.8,
                    delay: element.id * 0.1,
                    type: "spring",
                    stiffness: 100,
                  }}
                >
                  {element.content}
                </motion.div>
              )
            })}
          </div>

          {/* Hero Text */}
          <motion.div
            className="max-w-4xl mx-auto relative z-10"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <motion.div
              className="text-center mb-6 relative"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.7 }}
            >
              <div className="text-4xl md:text-6xl lg:text-7xl font-bold text-center mb-2">
                <span className="bg-gradient-to-b from-white via-white/90 to-white/60 bg-clip-text text-transparent">
                  Hello, I'm
                </span>
              </div>
              
              {/* Glitch line */}
              <div className="w-full h-0.5 bg-gradient-to-r from-transparent via-[#f34c26]/60 to-transparent mb-4 relative overflow-hidden glitch-line">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#f34c26] to-transparent"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#f34c26]/80 to-transparent"></div>
              </div>
              
              <div className="text-6xl md:text-8xl lg:text-9xl font-bold text-white">
                Meet Vora
              </div>
            </motion.div>

            <motion.div
                className="text-center mb-6"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.9 }}
              >
                <div className="text-lg  font-bold text-white font-tt-fors mb-4">
                  YOU'VE FOUND THE WORLD'S FIRST
                </div>
                <div className="text-lg font-bold text-white font-tt-fors mb-4">
                  VENDING MACHINE POWERED BY CREATIVITYYY
                </div>
                <div className="text-lg md:text-xl text-white italic font-tt-fors">
                  (with a little chaos and tears)
                </div>
              </motion.div>

            <motion.div
              className="flex flex-col sm:flex-row items-center justify-center gap-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.1 }}
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  size="lg"
                  className="bg-white text-black hover:bg-gray-200 px-8 py-4 text-lg font-medium group rounded-full"
                >
                  Let's Connect
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </motion.div>

              <motion.div
                className="flex items-center space-x-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.3 }}
              >
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-gray-400">Available for work</span>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>

        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute top-20 right-20 w-2 h-2 bg-white/30 rounded-full"
            animate={{
              y: [0, -20, 0],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 3,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute bottom-40 left-20 w-1 h-1 bg-white/40 rounded-full"
            animate={{
              y: [0, -15, 0],
              opacity: [0.4, 0.9, 0.4],
            }}
            transition={{
              duration: 2.5,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
              delay: 0.5,
            }}
          />
        </div>
      </div>

      {/* Vending Machine Section */}
      <VendingMachine />
    </div>
  )
}
