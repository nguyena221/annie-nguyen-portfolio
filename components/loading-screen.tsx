"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import type { TargetAndTransition } from "framer-motion"

interface LoadingScreenProps {
  onComplete: () => void
}

export function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [phase, setPhase] = useState<"shaking" | "clicking" | "dispersing" | "done">("shaking")
  const [cursorPosition, setCursorPosition] = useState({ x: 100, y: 100 })

  useEffect(() => {
    // Phase 1: Shake for 3 seconds
    const shakeTimer = setTimeout(() => {
      setPhase("clicking")
    }, 3000)

    return () => clearTimeout(shakeTimer)
  }, [])

  useEffect(() => {
    if (phase === "clicking") {
      // Animate cursor to the photo
      setCursorPosition({ x: -50, y: 60 })
      
      // After cursor reaches photo and "clicks", disperse
      const clickTimer = setTimeout(() => {
        setPhase("dispersing")
        onComplete()
      }, 1200)

      const doneTimer = setTimeout(() => {
        setPhase("done")
      }, 2500)

      return () => {
        clearTimeout(clickTimer)
        clearTimeout(doneTimer)
      }
    }
  }, [phase, onComplete])

  const shakeAnimation: TargetAndTransition = {
    x: [0, -3, 3, -3, 3, -2, 2, -1, 1, 0],
    rotate: [0, -1, 1, -1, 1, -0.5, 0.5, 0],
    transition: {
      duration: 0.5,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }

  const disperseDirections: TargetAndTransition[] = [
    { x: -1400, y: -800, rotate: -45 },  // Profile card - left up
    { x: 1200, y: -800, rotate: 30 },    // Cassette - right up
    { x: 1400, y: 500, rotate: 25 },     // Postcard - right
    { x: -1400, y: 800, rotate: -30 },   // Tickets - left down
    { x: -1000, y: -1000, rotate: -60 }, // Shell - left up
    { x: 1000, y: 1000, rotate: 45 },    // Button - right down
    { x: -1000, y: 1000, rotate: -20 },  // Badge - left down
    { x: 900, y: -900, rotate: 35 },     // Pearls - right up
    { x: -1100, y: 700, rotate: -40 },   // Paperclip - left
  ]

  return (
    <AnimatePresence>
      {phase !== "done" && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          <motion.div
            className="absolute inset-0"
            style={{ backgroundColor: "#fefaf0" }}
            animate={{
              backgroundColor: phase === "dispersing" ? "#f8f5f2" : "#fefaf0",
              opacity: phase === "dispersing" ? 0 : 1,
            }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          />

          {/* Main collage container */}
          <div className="relative z-10 h-[605px] w-[905px] max-w-[92vw] -translate-y-6">
            
            {/* Profile Card (stack of papers with photo) */}
            <motion.div
              className="absolute left-[200px] top-[90px] z-10"
              animate={phase === "shaking" ? shakeAnimation : phase === "dispersing" ? disperseDirections[0] : {}}
              transition={phase === "dispersing" ? { duration: 1, ease: "easeIn" } : undefined}
            >
              <img 
                src="/images/loading/stack-of-papers-img.png" 
                alt="" 
                className="w-[350px] h-auto object-contain filter drop-shadow-lg"
              />
            </motion.div>

            {/* Cassette Tape */}
            <motion.div
              className="absolute left-[440px] top-[160px] z-30"
              animate={phase === "shaking" ? { ...shakeAnimation, transition: { ...shakeAnimation.transition, delay: 0.1 } } : phase === "dispersing" ? disperseDirections[1] : {}}
              transition={phase === "dispersing" ? { duration: 1, ease: "easeIn" } : undefined}
            >
              <img 
                src="/images/loading/ripped-paper-tape.png" 
                alt="" 
                className="w-[140px] h-auto object-contain filter drop-shadow-lg"
              />
            </motion.div>

            {/* Postcard */}
            <motion.div
              className="absolute left-[430px] top-[270px] z-10"
              animate={phase === "shaking" ? { ...shakeAnimation, transition: { ...shakeAnimation.transition, delay: 0.15 } } : phase === "dispersing" ? disperseDirections[2] : {}}
              transition={phase === "dispersing" ? { duration: 1, ease: "easeIn" } : undefined}
            >
              <img 
                src="/images/loading/postcard-with-stamp.png" 
                alt="" 
                className="w-[365px] h-auto object-contain filter drop-shadow-lg"
              />
            </motion.div>

            {/* Brown Button */}
            <motion.div
              className="absolute left-[475px] top-[455px] z-30"
              animate={phase === "shaking" ? { ...shakeAnimation, transition: { ...shakeAnimation.transition, delay: 0.3 } } : phase === "dispersing" ? disperseDirections[5] : {}}
              transition={phase === "dispersing" ? { duration: 1, ease: "easeIn" } : undefined}
            >
              <img 
                src="/images/loading/brown-button.png" 
                alt="" 
                className="w-[60px] h-auto object-contain filter drop-shadow-lg"
              />
            </motion.div>

            {/* Paperclip */}
            <motion.div
              className="absolute left-[510px] top-[400px] z-40"
              animate={phase === "shaking" ? { ...shakeAnimation, transition: { ...shakeAnimation.transition, delay: 0.45 } } : phase === "dispersing" ? disperseDirections[8] : {}}
              transition={phase === "dispersing" ? { duration: 1, ease: "easeIn" } : undefined}
            >
              <img 
                src="/images/loading/paper-clip.png" 
                alt="" 
                className="w-[38px] h-auto object-contain filter drop-shadow-lg"
              />
            </motion.div>

            {/* Airline Tickets */}
            <motion.div
              className="absolute left-[140px] top-[300px] z-25"
              animate={phase === "shaking" ? { ...shakeAnimation, transition: { ...shakeAnimation.transition, delay: 0.2 } } : phase === "dispersing" ? disperseDirections[3] : {}}
              transition={phase === "dispersing" ? { duration: 1, ease: "easeIn" } : undefined}
            >
              <img 
                src="/images/loading/plane-ticket.png" 
                alt="" 
                className="w-[360px] h-auto object-contain filter drop-shadow-lg"
              />
            </motion.div>

            {/* Seashell */}
            <motion.div
              className="absolute left-[120px] top-[270px] z-15"
              animate={phase === "shaking" ? { ...shakeAnimation, transition: { ...shakeAnimation.transition, delay: 0.25 } } : phase === "dispersing" ? disperseDirections[4] : {}}
              transition={phase === "dispersing" ? { duration: 1, ease: "easeIn" } : undefined}
            >
              <img 
                src="/images/loading/seashell.png" 
                alt="" 
                className="w-[100px] h-auto object-contain filter drop-shadow-lg"
              />
            </motion.div>

            {/* Jeans Badge */}
            <motion.div
              className="absolute left-[110px] top-[340px] z-15"
              animate={phase === "shaking" ? { ...shakeAnimation, transition: { ...shakeAnimation.transition, delay: 0.35 } } : phase === "dispersing" ? disperseDirections[6] : {}}
              transition={phase === "dispersing" ? { duration: 1, ease: "easeIn" } : undefined}
            >
              <img 
                src="/images/loading/jeans-button.png" 
                alt="" 
                className="w-[46px] h-auto object-contain filter drop-shadow-lg"
              />
            </motion.div>

            {/* Pearls */}
            <motion.div
              className="absolute left-[570px] top-[230px] z-25"
              animate={phase === "shaking" ? { ...shakeAnimation, transition: { ...shakeAnimation.transition, delay: 0.4 } } : phase === "dispersing" ? disperseDirections[7] : {}}
              transition={phase === "dispersing" ? { duration: 1, ease: "easeIn" } : undefined}
            >
              <img 
                src="/images/loading/all-pearls.png" 
                alt="" 
                className="w-[42px] h-auto object-contain filter drop-shadow-lg"
              />
            </motion.div>

            {/* Animated Cursor Hand */}
            <motion.div
              className="absolute left-1/2 top-[25%] z-50 pointer-events-none"
              initial={{ x: 150, y: 150, opacity: 0 }}
              animate={
                phase === "clicking" 
                  ? { x: cursorPosition.x, y: cursorPosition.y, opacity: 1, scale: [1, 0.9, 1] }
                  : phase === "dispersing"
                  ? { opacity: 0, scale: 0.8 }
                  : { x: 150, y: 150, opacity: 0 }
              }
              transition={{ 
                duration: phase === "clicking" ? 0.8 : 0.3,
                ease: "easeOut",
                scale: { delay: 0.7, duration: 0.2 }
              }}
            >
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" className="filter drop-shadow-lg">
                <path 
                  d="M7.5 3.5C7.5 2.67 8.17 2 9 2C9.83 2 10.5 2.67 10.5 3.5V11.5L17.5 9C18.5 8.67 19.5 9.5 19.5 10.5V11.5C19.5 12.5 19 13.5 18 14L13 17V20.5C13 21.33 12.33 22 11.5 22H9C8.17 22 7.5 21.33 7.5 20.5V3.5Z" 
                  fill="white" 
                  stroke="#333" 
                  strokeWidth="1.5"
                />
              </svg>
            </motion.div>

          </div>

          {/* Loading text */}
          <motion.p
            className="absolute bottom-12 left-1/2 -translate-x-1/2 text-sm text-gray-500 tracking-widest"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            {phase === "shaking" && "loading..."}
            {phase === "clicking" && "opening..."}
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
