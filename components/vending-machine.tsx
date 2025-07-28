"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"
import gsap from "gsap"
import "../styles/vending-machine.css"
import "../styles/fonts.css"

export default function VendingMachine() {
  const audioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    // GSAP animations for button clicks
    const buttons = document.querySelectorAll('.keypad-nums button')
    
    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        const key = btn.getAttribute('data-key')
        const itemEl = document.querySelector(`.item[data-key="${key}"]`)
        if (!itemEl) return
        
        const img = itemEl.querySelector('img')
        if (!img) return

        // Calculate source and destination coordinates
        const fromRect = img.getBoundingClientRect()
        const slotRect = document.querySelector('.machine-slot')?.getBoundingClientRect()
        if (!slotRect) return
        
        const fromX = fromRect.left
        const fromY = fromRect.top
        const toX = slotRect.left + (slotRect.width - fromRect.width) / 2
        const toY = slotRect.top + (slotRect.height - fromRect.height) / 2

        // Clone node with fixed position
        const clone = img.cloneNode(true) as HTMLImageElement
        img.style.visibility = 'hidden'

        clone.style.position = 'fixed'
        clone.style.top = fromY + 'px'
        clone.style.left = fromX + 'px'
        clone.style.width = fromRect.width + 'px'
        clone.style.height = fromRect.height + 'px'
        clone.style.pointerEvents = 'none'
        clone.style.zIndex = '9999'
        document.body.appendChild(clone)

        // Play sound
        if (audioRef.current) {
          audioRef.current.currentTime = 0
          audioRef.current.play()
        }

        // GSAP animation: fall + bounce
        gsap.to(clone, {
          duration: 1,
          x: toX - fromX,
          y: toY - fromY,
          rotation: 360,
          ease: "power4.in",
          onComplete() {
            // Bounce effect
            gsap.to(clone, {
              duration: 0.5,
              y: (toY - fromY) - 30,
              ease: "bounce.out",
              onComplete() {
                // Impact effects
                createImpactEffects(toX, toY)
                // Add ghost after 0.3s then remove clone
                setTimeout(() => {
                  addGhost(img.src, fromRect.width, fromRect.height)
                  clone.remove()
                }, 300)
              }
            })
          }
        })
      })
    })

    return () => {
      buttons.forEach(btn => {
        btn.removeEventListener('click', () => {})
      })
    }
  }, [])

  const createImpactEffects = (x: number, y: number) => {
    // Dust effect
    const dust = document.createElement('div')
    dust.className = 'dust'
    Object.assign(dust.style, {
      position: 'fixed',
      left: x - 30 + 'px',
      top: y - 30 + 'px',
      pointerEvents: 'none'
    })
    document.body.appendChild(dust)
    
    // Flash effect
    const flash = document.createElement('div')
    flash.className = 'flash'
    Object.assign(flash.style, {
      position: 'fixed',
      left: x - 40 + 'px',
      top: y - 40 + 'px',
      pointerEvents: 'none'
    })
    document.body.appendChild(flash)
    
    // Remove after 1s
    setTimeout(() => {
      dust.remove()
      flash.remove()
    }, 1000)
  }

  const addGhost = (src: string, w: number, h: number) => {
    const slot = document.querySelector('.machine-slot')
    if (!slot) return
    
    const ghost = document.createElement('img')
    ghost.src = src
    slot.appendChild(ghost)
    Object.assign(ghost.style, {
      width: w + 'px',
      height: h + 'px',
      opacity: '0.5',
      filter: 'grayscale(100%) blur(1px)',
      display: 'block',
      margin: '0 auto'
    })
  }

  return (
    <div className="vending-machine-container">
      <div className="vending-machine">
        <div className="machine-window">
          <div className="machine-items">
            <div className="row">
              <div className="item" data-key="1">
                <img src="/images/item-1.png" width="70%" alt="Item 1" />
              </div>
              <div className="item" data-key="2">
                <img src="/images/item-2.png" width="70%" alt="Item 2" />
              </div>
            </div>
            <div className="row">
              <div className="item" data-key="3" style={{ marginBottom: '95px' }}>
                <img src="/images/item-3.png" width="50%" alt="Item 3" />
              </div>
              <div className="item" data-key="4" style={{ marginBottom: '95px' }}>
                <img src="/images/item-4.png" width="50%" alt="Item 4" />
              </div>
            </div>
          </div>
        </div>
        
        <div className="machine-slot"></div>

        <div className="keypad">
          <div className="keypad-label font-demibold">
            <div className="marquee">PRESS THE NUMBER</div>
          </div>
          
          <div className="keypad-panel">
            <div className="keypad-nums font-demibold">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                <button key={num} data-key={num}>
                  {num}
                </button>
              ))}
            </div>
          </div>
          <img src="/images/6.png" alt="" width="60px" className="icon-page" />
        </div>
        
        <div className="machine-title font-naroline grid gap-2 ml-4">
          <span className="!text-[2.5rem] leading-tight">CHISA</span>
          <span className="font-naroline mt-2 !text-[1.5rem] leading-tight">
            VENDING MACHINE
          </span>
        </div>

        <div className="machine-foot left"></div>
        <div className="machine-foot right"></div>
      </div>
      
      <audio 
        id="sound-drop" 
        src="https://www.fesliyanstudios.com/play-mp3/387"
        ref={audioRef}
      />
    </div>
  )
}
