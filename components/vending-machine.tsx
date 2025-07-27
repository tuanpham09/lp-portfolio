"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useState } from "react"
import Image from "next/image"

interface Product {
  id: number
  name: string
  image: string
}

export default function VendingMachine() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [droppingProduct, setDroppingProduct] = useState<Product | null>(null)
  const [collectedProducts, setCollectedProducts] = useState<Product[]>([])

  const products: Product[] = [
    {
      id: 1,
      name: "HOME",
      image: "/images/item-1.png",
    },
    {
      id: 2,
      name: "ABOUT ME",
      image: "/images/item-2.png",
    },
    {
      id: 3,
      name: "WORKS",
      image: "/images/item-3.png",
    },
    {
      id: 4,
      name: "CONTACT",
      image: "/images/item-4.png",
    },
  ]

  const handleKeyPress = (key: number) => {
    const product = products.find((p) => p.id === key)
    if (product) {
      setSelectedProduct(product)
      setDroppingProduct(product)

      // Simulate product drop
      setTimeout(() => {
        setCollectedProducts((prev) => [...prev, product])
        setDroppingProduct(null)
      }, 1500)
    }
  }

  const containerVariants = {
    hidden: { opacity: 0, y: 100 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  }

  const dropVariants = {
    initial: { y: -200, x: 0, rotate: 0, scale: 1 },
    drop: {
      y: 300,
      x: [0, -10, 10, 0],
      rotate: [0, 180, 360],
      scale: [1, 1.1, 0.9, 1],
      transition: {
        duration: 1.5,
        ease: [0.25, 0.46, 0.45, 0.94],
        times: [0, 0.3, 0.7, 1],
      },
    },
  }

  return (
    <section
      ref={ref}
      className="min-h-screen py-20 px-6 relative overflow-hidden"
      style={{ backgroundColor: "#f44d25" }}
    >
      {/* Decorative Stars */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 left-20 text-white text-2xl"
          animate={{ rotate: 360 }}
          transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        >
          ✦
        </motion.div>
        <motion.div
          className="absolute top-32 right-32 text-white text-xl"
          animate={{ rotate: -360 }}
          transition={{ duration: 6, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        >
          ✧
        </motion.div>
        <motion.div
          className="absolute bottom-40 left-40 text-white text-lg"
          animate={{ rotate: 360 }}
          transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        >
          ✦
        </motion.div>
      </div>

      <motion.div
        className="max-w-6xl mx-auto relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
      
        {/* Vending Machine */}
        <motion.div className="relative mx-auto max-w-5xl mb-20" variants={itemVariants}>
          {/* Machine Body */}
          <div
            className="relative rounded-3xl shadow-2xl overflow-hidden"
            style={{
              backgroundColor: "#FFE55C",
              padding: "40px",
              border: "8px solid #FF6B35",
            }}
          >
            <div className="flex gap-8">
              {/* Left Side - Display Window */}
              <div className="flex-1">
                {/* Main Display Window */}
                <div className="relative mb-6">
                  <div
                    className="rounded-2xl p-6 border-4 relative overflow-hidden"
                    style={{
                      backgroundColor: "#87CEEB",
                      borderColor: "#FF6B35",
                      minHeight: "400px",
                    }}
                  >
                    {/* Glass reflection effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent pointer-events-none" />

                    {/* Products Grid - 2x2 layout exactly like reference */}
                    <div className="grid grid-cols-2 gap-4 h-full">
                      {/* Top Row */}
                      <motion.div
                        className="flex items-center justify-center cursor-pointer group relative"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleKeyPress(1)}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                      >
                        <Image
                          src="/images/item-1.png"
                          alt="HOME"
                          width={180}
                          height={120}
                          className="object-contain group-hover:scale-110 transition-transform"
                        />
                      </motion.div>

                      <motion.div
                        className="flex items-center justify-center cursor-pointer group relative"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleKeyPress(2)}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                      >
                        <Image
                          src="/images/item-2.png"
                          alt="ABOUT ME"
                          width={180}
                          height={120}
                          className="object-contain group-hover:scale-110 transition-transform"
                        />
                      </motion.div>

                      {/* Bottom Row */}
                      <motion.div
                        className="flex items-center justify-center cursor-pointer group relative"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleKeyPress(3)}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7 }}
                      >
                        <Image
                          src="/images/item-3.png"
                          alt="WORKS"
                          width={180}
                          height={120}
                          className="object-contain group-hover:scale-110 transition-transform"
                        />
                      </motion.div>

                      <motion.div
                        className="flex items-center justify-center cursor-pointer group relative"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleKeyPress(4)}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8 }}
                      >
                        <Image
                          src="/images/item-4.png"
                          alt="CONTACT"
                          width={180}
                          height={120}
                          className="object-contain group-hover:scale-110 transition-transform"
                        />
                      </motion.div>
                    </div>

                    {/* Dropping Product Animation */}
                    {droppingProduct && (
                      <motion.div
                        className="absolute top-0 left-1/2 transform -translate-x-1/2 z-20"
                        variants={dropVariants}
                        initial="initial"
                        animate="drop"
                      >
                        <Image
                          src={droppingProduct.image || "/placeholder.svg"}
                          alt={droppingProduct.name}
                          width={120}
                          height={80}
                          className="object-contain"
                        />
                      </motion.div>
                    )}
                  </div>
                </div>

                {/* Collection Slot */}
                <div className="mb-6">
                  <div
                    className="rounded-2xl p-4 border-4"
                    style={{
                      backgroundColor: "#87CEEB",
                      borderColor: "#FF6B35",
                      minHeight: "100px",
                    }}
                  >
                    {/* Diagonal stripes pattern like in reference */}
                    <div
                      className="rounded-lg p-3 min-h-[80px] flex flex-wrap gap-2 justify-center items-center relative overflow-hidden"
                      style={{
                        background:
                          "repeating-linear-gradient(45deg, rgba(255,255,255,0.1) 0px, rgba(255,255,255,0.1) 10px, rgba(255,255,255,0.2) 10px, rgba(255,255,255,0.2) 20px)",
                      }}
                    >
                      {collectedProducts.map((product, index) => (
                        <motion.div
                          key={`${product.id}-${index}`}
                          initial={{ scale: 0, rotate: 180 }}
                          animate={{ scale: 1, rotate: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <Image
                            src={product.image || "/placeholder.svg"}
                            alt={product.name}
                            width={60}
                            height={40}
                            className="object-contain opacity-70"
                          />
                        </motion.div>
                      ))}
                      {collectedProducts.length === 0 && <div className="text-white/70 text-sm">Collection Slot</div>}
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Side Panel */}
              <div className="flex flex-col space-y-6">
                {/* Keypad */}
                <div
                  className="rounded-2xl p-4 border-4"
                  style={{
                    backgroundColor: "#87CEEB",
                    borderColor: "#FF6B35",
                    width: "200px",
                  }}
                >
                  <div
                    className="text-center mb-3 px-3 py-2 rounded-full text-white text-xs font-bold"
                    style={{ backgroundColor: "#4169E1" }}
                  >
                    PRESS THE NUMBER
                  </div>
                  <div className="grid grid-cols-3 gap-2 p-4 rounded-lg" style={{ backgroundColor: "#FF6B35" }}>
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                      <motion.button
                        key={num}
                        onClick={() => handleKeyPress(num)}
                        className="w-12 h-12 bg-yellow-400 hover:bg-yellow-300 text-gray-800 font-bold rounded-full border-2 border-yellow-500 transition-colors shadow-lg text-lg"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        disabled={num > 4}
                      >
                        {num}
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Machine Title */}
                <div className="text-right">
                  <div className="text-4xl font-bold tracking-wider mb-1" style={{ color: "#FF6B35" }}>
                    CHISA
                  </div>
                  <div className="text-lg font-semibold tracking-wide" style={{ color: "#FF6B35" }}>
                    VENDING MACHINE
                  </div>
                </div>
              </div>
            </div>

            {/* Machine Legs */}
            <div className="absolute -bottom-4 left-12 w-8 h-8 bg-blue-400 rounded-b-lg"></div>
            <div className="absolute -bottom-4 right-12 w-8 h-8 bg-blue-400 rounded-b-lg"></div>
          </div>

          {/* Interactive Instructions */}
          <motion.div
            className="text-center mt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <p className="text-white text-lg mb-4">Press numbers 1-4 to explore my portfolio sections!</p>
            {selectedProduct && (
              <motion.div
                className="inline-flex items-center space-x-3 bg-white/20 backdrop-blur-sm rounded-full px-6 py-3"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
              >
                <Image
                  src={selectedProduct.image || "/placeholder.svg"}
                  alt={selectedProduct.name}
                  width={40}
                  height={30}
                  className="object-contain"
                />
                <span className="text-white font-bold text-lg">{selectedProduct.name}</span>
                <span className="text-yellow-300 font-semibold">Selected!</span>
              </motion.div>
            )}
          </motion.div>
        </motion.div>

          {/* Welcome Section */}
        <motion.div className="text-center mb-16 relative" variants={itemVariants}>
          {/* Animated Stars Background */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {/* Large Stars */}
            <motion.div
              className="absolute top-4 left-1/4 text-white text-3xl"
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
              className="absolute top-8 right-1/4 text-white text-2xl"
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
              className="absolute top-6 right-1/3 text-white text-lg"
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
            className="text-4xl md:text-6xl font-bold text-white tracking-wider mb-8 relative z-10"
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
              duration: 1,
              delay: 0.3,
              type: "spring",
              stiffness: 100,
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
              className="text-white text-lg leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              This is Chisa, the girl who loves cute things and the person who turns midnight inspirations into colorful
              designs.
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


        {/* Featured Works Section */}
        <motion.div className="relative" variants={itemVariants}>
          {/* Cloud-like background */}
          
        </motion.div>
      </motion.div>
    </section>
  )
}
