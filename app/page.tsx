"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { useEffect, useState } from "react"
import VendingMachine from "@/components/vending-machine"
import Header from "@/components/header"
import ScrollReveal, { FlipReveal, BounceReveal, SlideReveal, SmoothReveal, DistanceFade } from "@/components/scroll-reveal"
import ScrollCards from "@/components/scroll-cards"
import "../styles/fonts.css"

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
        <div className="w-64 h-40 rounded-xl shadow-2xl overflow-hidden rotate-12">
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
        <div className="w-64 h-48 rounded-xl shadow-2xl overflow-hidden rotate-12">
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
        <div className="w-64 h-48 rounded-xl shadow-2xl overflow-hidden rotate-12">
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
      
      {/* Hero Section */}
      <div className="min-h-screen relative">

        {/* Main Content */}
        <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 text-center pt-20">
                      {/* Floating Elements - Circular Motion */}
            <ScrollReveal stagger={true} delay={0.2}>
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
                      perspective: "1000px",
                      transformStyle: "preserve-3d"
                    }}
                    variants={{
                      hidden: { opacity: 0, scale: 0.8, rotateY: 90 },
                      visible: { opacity: 1, scale: 1, rotateY: 0 }
                    }}
                    transition={{
                      duration: 2.2,
                      delay: element.id * 0.05,
                      type: "spring",
                      stiffness: 80,
                      damping: 20,
                    }}
                  >
                    {element.content}
                  </motion.div>
                )
              })}
            </div>
            </ScrollReveal>

          {/* Hero Text */}
          <ScrollReveal direction="up" delay={0.5} distance={100}>
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
              <div className="text-4xl md:text-6xl lg:text-7xl font-bold text-center">
                <span className="bg-gradient-to-b from-white via-white/90 to-white/60 bg-clip-text text-transparent">
                  Hello, I'm
                </span>
              </div>
              
              {/* Glitch line */}
              <div className="w-full h-0.5 from-transparent to-transparent mb-4 relative overflow-hidden glitch-line">
                <div className="absolute inset-0  from-transparent  to-transparent"></div>
                <div className="absolute inset-0 from-transparent  to-transparent"></div>
              </div>
              
              <div className="text-6xl md:text-8xl lg:text-9xl font-bold text-white">
                <img src="/images/chisa white.png" alt="" />
              </div>
            </motion.div>

            <motion.div
                className="text-center mb-6"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.9 }}
              >
                <div className="text-lg font-bold text-white font-demibold mb-2">
                  YOU'VE FOUND THE WORLD'S FIRST
                </div>
                <div className="text-lg font-bold text-white font-demibold">
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
            </motion.div>
          </motion.div>
          </ScrollReveal>
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


      {/* Welcome Banner */}
      <DistanceFade delay={0.3} fadeStart={0.15} fadeEnd={0.85}>
        <motion.div
          className="w-full bg-[#f34c26] py-16 px-6 relative overflow-hidden"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
        {/* Animated Stars Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Large Stars */}
          <motion.div
            className="absolute top-8 left-1/4 text-white text-3xl"
            animate={{
              rotate: 360,
              scale: [1, 1.2, 1],
              opacity: [0.7, 1, 0.7],
            }}
            transition={{
              rotate: { duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
              scale: { duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
              opacity: { duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
            }}
          >
            ✦
          </motion.div>

          <motion.div
            className="absolute top-6 right-1/4 text-white text-3xl"
            animate={{
              rotate: -360,
              scale: [1, 1.3, 1],
              opacity: [0.8, 1, 0.8],
            }}
            transition={{
              rotate: { duration: 6, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
              scale: { duration: 2.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
              opacity: { duration: 2.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
            }}
          >
            ✦
          </motion.div>

          {/* Medium Stars */}
          <motion.div
            className="absolute top-12 left-1/3 text-white text-xl"
            animate={{
              rotate: 360,
              y: [-5, 5, -5],
              opacity: [0.6, 1, 0.6],
            }}
            transition={{
              rotate: { duration: 10, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
              y: { duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
              opacity: { duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
            }}
          >
            ✧
          </motion.div>

          <motion.div
            className="absolute top-10 right-1/3 text-white text-lg"
            animate={{
              rotate: -360,
              y: [5, -5, 5],
              opacity: [0.7, 1, 0.7],
            }}
            transition={{
              rotate: { duration: 12, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
              y: { duration: 2.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
              opacity: { duration: 3.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
            }}
          >
            ✦
          </motion.div>

          {/* Small Stars */}
          <motion.div
            className="absolute top-16 left-1/5 text-white text-sm"
            animate={{
              rotate: 360,
              scale: [0.8, 1.2, 0.8],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              rotate: { duration: 15, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
              scale: { duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
              opacity: { duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
            }}
          >
            ✦
          </motion.div>

          <motion.div
            className="absolute top-10 right-1/5 text-white text-xs"
            animate={{
              rotate: -360,
              scale: [1, 1.5, 1],
              opacity: [0.4, 0.9, 0.4],
            }}
            transition={{
              rotate: { duration: 18, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
              scale: { duration: 1.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
              opacity: { duration: 2.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
            }}
          >
            ✧
          </motion.div>

          {/* Additional decorative stars */}
          <motion.div
            className="absolute top-20 left-1/6 text-white text-lg"
            animate={{
              rotate: 360,
              x: [-3, 3, -3],
              opacity: [0.6, 1, 0.6],
            }}
            transition={{
              rotate: { duration: 9, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
              x: { duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
              opacity: { duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
            }}
          >
            ✦
          </motion.div>

          <motion.div
            className="absolute top-14 right-1/6 text-white text-sm"
            animate={{
              rotate: -360,
              x: [3, -3, 3],
              opacity: [0.5, 0.9, 0.5],
            }}
            transition={{
              rotate: { duration: 11, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
              x: { duration: 3.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
              opacity: { duration: 2.8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
            }}
          >
            ✧
          </motion.div>
        </div>

        {/* Main Title */}
        <motion.h2
          className="text-4xl md:text-6xl font-bold text-white tracking-wider mb-8 relative z-10 text-center"
          initial={{ opacity: 0, y: 30, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{
            duration: 1,
            delay: 0.3,
            type: "spring",
            stiffness: 100,
          }}
          style={{
            textShadow: "0 2px 4px rgba(0,0,0,0.3)",
            fontFamily: "'Arial Rounded MT Bold', Arial, sans-serif"
          }}
        >
          WELCOME TO MY VENDING BRAIN
        </motion.h2>

        {/* Description Text */}
        <motion.div
          className="max-w-2xl mx-auto relative z-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            delay: 0.6,
            ease: "easeOut",
          }}
        >
          <motion.p
            className="text-white text-lg leading-relaxed text-left"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            style={{
              fontFamily: "'Arial Rounded MT Bold', Arial, sans-serif",
              textShadow: "0 1px 2px rgba(0,0,0,0.2)"
            }}
          >
            This is Chisa, the girl who loves cute<br />
            things and the person who turns midnight<br />
            inspirations into colorful designs.
          </motion.p>
        </motion.div>

        {/* Floating particles effect */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full opacity-60"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [-20, -40, -20],
                opacity: [0.3, 0.8, 0.3],
                scale: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Number.POSITIVE_INFINITY,
                delay: Math.random() * 2,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
      </motion.div>
      </DistanceFade>

      {/* Featured Works */}
      <DistanceFade delay={0.2} fadeStart={0.1} fadeEnd={0.9}>
        <div className="w-full bg-[#f34c26] relative overflow-hidden">
        {/* Cloud background */}
        <div className="">
          <img 
            src="/images/cloud.png" 
            alt="Cloud background" 
            className="w-full h-auto"
            style={{ 
              objectFit: 'cover',
              objectPosition: 'center'
            }}
          />
        </div>
        
        {/* Content overlay */}
        <div className="relative z-20 flex flex-col items-center justify-center px-6">
          <motion.div
            className="text-4xl md:text-6xl font-bold text-[#f34c26] tracking-wider mb-12 max-lg:mb-4 text-center font-naroline absolute bottom-[15%]"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            FEATURED WORKS
          </motion.div>
          
          <motion.div
            className="text-lg md:text-xl text-[#f34c26] tracking-wide text-center max-w-2xl absolute bottom-[9.5%]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            style={{
              fontFamily: "'Arial', sans-serif",
              fontWeight: "normal"
            }}
          >
            Let's see what I have inside!
          </motion.div>
        </div>
      </div>
      </DistanceFade>

                {/* Project Stack Section */}
          <ScrollCards />


          {/* footer */}
          <div className="w-full bg-[#f34c26] relative overflow-hidden">
            <div className="text-center text-white text-sm">
              <img src="/images/footer.png" alt="" />
            </div>
          </div>
    </div>
  )
}
