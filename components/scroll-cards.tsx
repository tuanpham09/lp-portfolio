"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import FadeCard from "./fade-card"

interface Project {
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

const projects: Project[] = [
  {
    id: 1,
    title: "Kidora Branding",
    subtitle: "Brand Identity & Design",
    description: "Complete brand identity design with vibrant red and yellow color scheme, creating a memorable and impactful visual presence.",
    year: "2023",
    readTime: "~8 min. read",
    color: "#F97316",
    gradient: "from-orange-500 to-red-500",
    image: "/images/stack/kidora_branding.png"
  },
  {
    id: 2,
    title: "Heineken Campaign",
    subtitle: "Marketing & Advertising",
    description: "Creative campaign design for Heineken, showcasing innovative marketing strategies and brand engagement.",
    year: "2023",
    readTime: "~12 min. read",
    color: "#22C55E",
    gradient: "from-green-500 to-emerald-500",
    image: "/images/stack/heiniken_campain.png"
  },
  {
    id: 3,
    title: "Alphavit Packing",
    subtitle: "Product Design & Packaging",
    description: "Innovative packaging design for Alphavit, combining functionality with aesthetic appeal for consumer products.",
    year: "2023",
    readTime: "~10 min. read",
    color: "#8B5CF6",
    gradient: "from-purple-600 to-pink-600",
    image: "/images/stack/alphavit_packing.png"
  }
]

export default function ScrollCards() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  // Track current card index for progress indicator
  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      const newIndex = Math.floor(latest * projects.length)
      setCurrentIndex(Math.min(newIndex, projects.length - 1))
    })

    return () => unsubscribe()
  }, [scrollYProgress])

  return (
    <div 
      ref={containerRef}
      className="relative min-h-screen overflow-hidden bg-[#fffeee]"
    >
      {/* Navigation Bar */}
      <div className="fixed top-0 left-0 right-0 z-50 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between text-white">
            <div className="flex items-center space-x-8">
              <span className="font-semibold">About</span>
              <span className="font-semibold">Work</span>
            </div>
            <div className="text-2xl font-bold">CHISA</div>
            <div className="flex items-center space-x-8">
              <span className="font-semibold">Contact</span>
              <span className="font-semibold flex items-center">
                Resume
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Project Cards */}
      <div className="pt-20 pb-20">
        {projects.map((project, index) => (
          <FadeCard key={project.id} project={project} index={index} />
        ))}
      </div>

      {/* Progress Indicator */}
      <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50">
        <div className="flex space-x-2">
          {projects.map((_, index) => (
            <motion.button
              key={index}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex ? 'bg-white scale-125' : 'bg-white/30'
              }`}
              whileHover={{ scale: 1.2 }}
              onClick={() => setCurrentIndex(index)}
            />
          ))}
        </div>
      </div>

    </div>
  )
} 