"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const cursorInnerRef = useRef<HTMLDivElement>(null)
  const quickToRef = useRef<gsap.QuickToFunc | null>(null)

  useEffect(() => {
    if (!cursorRef.current) return

    // Tạo quickTo function cho hiệu suất tốt
    quickToRef.current = gsap.quickTo(cursorRef.current, "x", {
      duration: 0.3,
      ease: "power2.out"
    })

    const quickToY = gsap.quickTo(cursorRef.current, "y", {
      duration: 0.3,
      ease: "power2.out"
    })

    const quickToInnerX = gsap.quickTo(cursorInnerRef.current, "x", {
      duration: 0.15,
      ease: "power2.out"
    })

    const quickToInnerY = gsap.quickTo(cursorInnerRef.current, "y", {
      duration: 0.15,
      ease: "power2.out"
    })

    // Mouse move handler
    const handleMouseMove = (e: MouseEvent) => {
      if (quickToRef.current) {
        quickToRef.current(e.clientX)
        quickToY(e.clientY)
      }
      
      if (cursorInnerRef.current) {
        quickToInnerX(e.clientX)
        quickToInnerY(e.clientY)
      }
    }

    // Mouse enter handler
    const handleMouseEnter = () => {
      if (cursorRef.current) {
        gsap.to(cursorRef.current, {
          opacity: 1,
          scale: 1,
          duration: 0.3,
          ease: "power2.out"
        })
      }
    }

    // Mouse leave handler
    const handleMouseLeave = () => {
      if (cursorRef.current) {
        gsap.to(cursorRef.current, {
          opacity: 0,
          scale: 0,
          duration: 0.3,
          ease: "power2.out"
        })
      }
    }

    // Hover effects cho interactive elements
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (target.tagName === 'BUTTON' || 
          target.tagName === 'A' || 
          target.closest('button') || 
          target.closest('a') ||
          target.closest('[role="button"]')) {
        if (cursorRef.current) {
          gsap.to(cursorRef.current, {
            scale: 1.5,
            duration: 0.2,
            ease: "power2.out"
          })
          
          // Thêm shadow mạnh hơn khi hover
          gsap.to(cursorRef.current, {
            filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.5)) drop-shadow(0 8px 16px rgba(0,0,0,0.3))',
            duration: 0.2,
            ease: "power2.out"
          })
        }
      }
    }

    const handleMouseOut = () => {
      if (cursorRef.current) {
        gsap.to(cursorRef.current, {
          scale: 1,
          duration: 0.2,
          ease: "power2.out"
        })
        
        // Reset shadow về mặc định
        gsap.to(cursorRef.current, {
          filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3)) drop-shadow(0 4px 8px rgba(0,0,0,0.2))',
          duration: 0.2,
          ease: "power2.out"
        })
      }
    }

    // Add event listeners
    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseenter', handleMouseEnter)
    document.addEventListener('mouseleave', handleMouseLeave)
    document.addEventListener('mouseover', handleMouseOver)
    document.addEventListener('mouseout', handleMouseOut)

    // Cleanup function
    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseenter', handleMouseEnter)
      document.removeEventListener('mouseleave', handleMouseLeave)
      document.removeEventListener('mouseover', handleMouseOver)
      document.removeEventListener('mouseout', handleMouseOut)
    }
  }, [])

  return (
    <>
      {/* Main cursor */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-16 h-16 pointer-events-none z-[9999] opacity-0 scale-0"
        style={{
          transform: 'translate(-50%, -50%)',
          filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3)) drop-shadow(0 4px 8px rgba(0,0,0,0.2))'
        }}
      >
        <img 
          src="/images/pointer.png" 
          alt="Custom cursor"
          className="max-w-7xl max-w-7xl mx-auto px-6 py-4 h-full object-contain"
        />
      </div>

      {/* Inner cursor for smooth tracking */}
      <div
        ref={cursorInnerRef}
        className="fixed top-0 left-0 w-6 h-6 pointer-events-none z-[9998] opacity-40"
        style={{
          transform: 'translate(-50%, -50%)',
          background: 'rgba(255, 255, 255, 0.4)',
          borderRadius: '50%',
          filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.2))'
        }}
      />
    </>
  )
} 