"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useScroll, useTransform } from "framer-motion"

interface Project {
  id: number
  title: string
  description: string
  image: string
  category: string
  color: string
}

const projects: Project[] = [
  {
    id: 1,
    title: "Kidora Branding",
    description: "Brand identity design with vibrant red and yellow color scheme",
    image: "/images/preview-image/490.png",
    category: "Branding",
    color: "#f34c26"
  },
  {
    id: 2,
    title: "Chiso Mire Collection",
    description: "3D figurines and merchandise design",
    image: "/images/preview-image/tote bag 2.jpg",
    category: "Product Design",
    color: "#ffb84d"
  },
  {
    id: 3,
    title: "Character Design",
    description: "Yellow block character with green eyes",
    image: "/images/preview-image/drge.png",
    category: "Illustration",
    color: "#3ac6ff"
  },
  {
    id: 4,
    title: "Merchandise Display",
    description: "Keychains, bags, and apparel collection",
    image: "/images/preview-image/JGVKJ.png",
    category: "Merchandise",
    color: "#4ade80"
  },
  {
    id: 5,
    title: "Staff Identity",
    description: "ID badges and corporate identity",
    image: "/images/preview-image/poster.jpg",
    category: "Corporate",
    color: "#a855f7"
  }
]

export default function ProjectStack() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  // Calculate which card should be visible based on scroll
  const cardProgress = useTransform(
    scrollYProgress,
    [0, 0.2, 0.4, 0.6, 0.8, 1],
    [0, 1, 2, 3, 4, 4]
  )

  useEffect(() => {
    const unsubscribe = cardProgress.on("change", (latest) => {
      const newIndex = Math.floor(latest)
      setCurrentIndex(newIndex)
    })

    return () => unsubscribe()
  }, [cardProgress])

  return (
    <div 
      ref={containerRef}
      className="relative min-h-screen bg-gradient-to-b from-[#f34c26] to-[#ff7f2a] overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-32 h-32 bg-yellow-400 rounded-full animate-pulse" />
        <div className="absolute top-40 right-20 w-24 h-24 bg-blue-400 rounded-full animate-pulse delay-1000" />
        <div className="absolute bottom-20 left-1/4 w-16 h-16 bg-green-400 rounded-full animate-pulse delay-2000" />
      </div>

      {/* Title Section */}
      <div className="relative z-10 pt-20 pb-10 text-center">
        <motion.h2 
          className="text-6xl md:text-8xl font-bold text-white mb-4 font-naroline"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          PROJECTS
        </motion.h2>
        <motion.p 
          className="text-xl text-white/80 max-w-2xl mx-auto px-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          A collection of creative works and branding projects
        </motion.p>
      </div>

      {/* Project Cards Stack */}
      <div className="relative z-20 flex justify-center items-center min-h-[60vh] px-6">
        <div className="relative w-full max-w-4xl">
          {projects.map((project, index) => {
            const isActive = index === currentIndex
            const isNext = index === currentIndex + 1
            const isPrev = index === currentIndex - 1
            
            return (
              <motion.div
                key={project.id}
                className={`absolute inset-0 w-full h-96 rounded-2xl overflow-hidden shadow-2xl transition-all duration-500 ${
                  isActive ? 'z-30' : isNext ? 'z-20' : isPrev ? 'z-10' : 'z-0'
                }`}
                style={{
                  transform: `translateY(${(index - currentIndex) * 20}px) scale(${isActive ? 1 : 0.9})`,
                  opacity: isActive ? 1 : isNext || isPrev ? 0.7 : 0.3,
                  filter: isActive ? 'none' : 'blur(2px)',
                }}
                initial={{ 
                  y: index * 100,
                  scale: 0.8,
                  opacity: 0
                }}
                animate={{
                  y: (index - currentIndex) * 20,
                  scale: isActive ? 1 : 0.9,
                  opacity: isActive ? 1 : isNext || isPrev ? 0.7 : 0.3,
                }}
                transition={{
                  duration: 0.5,
                  ease: [0.25, 0.46, 0.45, 0.94]
                }}
              >
                {/* Card Background */}
                <div 
                  className="absolute inset-0"
                  style={{ backgroundColor: project.color }}
                />
                
                {/* Card Content */}
                <div className="relative h-full flex flex-col justify-between p-8 text-white">
                  {/* Category Badge */}
                  <div className="flex justify-between items-start">
                    <span className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold">
                      {project.category}
                    </span>
                    <span className="text-4xl font-bold opacity-20">
                      {String(project.id).padStart(2, '0')}
                    </span>
                  </div>

                  {/* Project Info */}
                  <div className="flex-1 flex flex-col justify-center">
                    <motion.h3 
                      className="text-4xl md:text-5xl font-bold mb-4 font-naroline"
                      initial={{ opacity: 0, x: -50 }}
                      animate={{ 
                        opacity: isActive ? 1 : 0.5,
                        x: isActive ? 0 : -30
                      }}
                      transition={{ duration: 0.5 }}
                    >
                      {project.title}
                    </motion.h3>
                    <motion.p 
                      className="text-lg md:text-xl opacity-90 max-w-md"
                      initial={{ opacity: 0, x: -50 }}
                      animate={{ 
                        opacity: isActive ? 1 : 0.5,
                        x: isActive ? 0 : -30
                      }}
                      transition={{ duration: 0.5, delay: 0.1 }}
                    >
                      {project.description}
                    </motion.p>
                  </div>

                  {/* Project Image */}
                  <div className="absolute right-8 top-1/2 transform -translate-y-1/2 w-32 h-32 rounded-xl overflow-hidden shadow-lg">
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                {/* Hover Effect */}
                <motion.div
                  className="absolute inset-0 bg-white/10 opacity-0 hover:opacity-100 transition-opacity duration-300"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                />
              </motion.div>
            )
          })}
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="relative z-30 flex justify-center items-center py-10">
        <div className="flex space-x-2">
          {projects.map((_, index) => (
            <motion.button
              key={index}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex ? 'bg-white scale-125' : 'bg-white/30'
              }`}
              whileHover={{ scale: 1.2 }}
              onClick={() => {
                setCurrentIndex(index)
              }}
            />
          ))}
        </div>
      </div>

      {/* Debug Panel */}
      <div className="fixed top-4 right-4 bg-black/80 text-white p-4 rounded-lg z-50 text-sm">
        <div>Current Index: {currentIndex}</div>
        <div>Scroll Progress: {scrollYProgress.get().toFixed(2)}</div>
        <div>Total Projects: {projects.length}</div>
      </div>

      {/* Scroll Instructions */}
      <motion.div 
        className="relative z-30 text-center pb-10 text-white/60"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <p className="text-sm">Scroll to explore projects</p>
      </motion.div>
    </div>
  )
} 