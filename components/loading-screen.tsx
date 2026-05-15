"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

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
      setCursorPosition({ x: 0, y: -20 })
      
      // After cursor reaches photo and "clicks", disperse
      const clickTimer = setTimeout(() => {
        setPhase("dispersing")
      }, 1200)

      const doneTimer = setTimeout(() => {
        setPhase("done")
        onComplete()
      }, 2500)

      return () => {
        clearTimeout(clickTimer)
        clearTimeout(doneTimer)
      }
    }
  }, [phase, onComplete])

  const shakeAnimation = {
    x: [0, -3, 3, -3, 3, -2, 2, -1, 1, 0],
    rotate: [0, -1, 1, -1, 1, -0.5, 0.5, 0],
    transition: {
      duration: 0.5,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }

  const disperseDirections = [
    { x: -800, y: -400, rotate: -45 },   // Profile card - left up
    { x: 600, y: -300, rotate: 30 },     // Cassette - right up
    { x: 800, y: 200, rotate: 25 },      // Postcard - right
    { x: -600, y: 400, rotate: -30 },    // Tickets - left down
    { x: -400, y: -500, rotate: -60 },   // Shell - left up
    { x: 500, y: 500, rotate: 45 },      // Button - right down
    { x: -300, y: 600, rotate: -20 },    // Badge - left down
    { x: 400, y: -400, rotate: 35 },     // Pearls - right up
    { x: -500, y: 300, rotate: -40 },    // Paperclip - left
  ]

  return (
    <AnimatePresence>
      {phase !== "done" && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden"
          style={{ backgroundColor: "#f5f0eb" }}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Main collage container */}
          <div className="relative w-[700px] h-[550px]">
            
            {/* Profile Card (stack of papers with photo) */}
            <motion.div
              className="absolute left-1/2 top-[10%] -translate-x-1/2 z-20"
              animate={phase === "shaking" ? shakeAnimation : phase === "dispersing" ? disperseDirections[0] : {}}
              transition={phase === "dispersing" ? { duration: 1, ease: "easeIn" } : undefined}
            >
              <img 
                src="/images/loading/stack-of-papers-img.png" 
                alt="" 
                className="w-[200px] h-auto object-contain filter drop-shadow-lg"
              />
            </motion.div>

            {/* Cassette Tape */}
            <motion.div
              className="absolute right-[15%] top-[18%] z-30"
              animate={phase === "shaking" ? { ...shakeAnimation, transition: { ...shakeAnimation.transition, delay: 0.1 } } : phase === "dispersing" ? disperseDirections[1] : {}}
              transition={phase === "dispersing" ? { duration: 1, ease: "easeIn" } : undefined}
            >
              <div className="w-[90px] h-[60px] bg-[#e8e0d5] rounded-md shadow-md border-2 border-[#d4ccc0] p-1 rotate-6">
                <div className="w-full h-full border border-gray-400 rounded-sm flex items-center justify-center gap-2">
                  <div className="w-5 h-5 rounded-full border-2 border-gray-500 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-gray-500" />
                  </div>
                  <div className="w-5 h-5 rounded-full border-2 border-gray-500 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-gray-500" />
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Postcard */}
            <motion.div
              className="absolute right-[5%] top-[40%] z-10"
              animate={phase === "shaking" ? { ...shakeAnimation, transition: { ...shakeAnimation.transition, delay: 0.15 } } : phase === "dispersing" ? disperseDirections[2] : {}}
              transition={phase === "dispersing" ? { duration: 1, ease: "easeIn" } : undefined}
            >
              <div className="w-[220px] h-[140px] bg-[#e8e4d8] rounded-sm shadow-lg rotate-3 p-3" style={{ fontFamily: "monospace" }}>
                {/* Stamp */}
                <div className="absolute top-2 right-2 w-12 h-14 bg-blue-100 border border-dashed border-blue-300 flex items-center justify-center">
                  <div className="text-blue-400 text-xs text-center">
                    <div className="text-lg">✿</div>
                  </div>
                </div>
                
                {/* Postmark */}
                <div className="absolute top-1 right-16 w-10 h-10 rounded-full border border-gray-400 flex items-center justify-center text-[6px] text-gray-500">
                  <div className="text-center leading-tight">
                    <div>NEW YORK</div>
                    <div>JUL 7</div>
                  </div>
                </div>
                
                <h4 className="text-xs tracking-[0.3em] text-gray-600 mb-2">POSTCARD</h4>
                
                {/* Lines */}
                <div className="absolute bottom-3 left-3 right-16 space-y-2">
                  <div className="border-b border-gray-400" />
                  <div className="border-b border-gray-400" />
                  <div className="border-b border-gray-400" />
                </div>
                
                {/* Air Mail */}
                <div className="absolute bottom-2 right-2 text-[8px] text-red-400 font-bold">
                  AIR MAIL<br/>PAR AVION
                </div>
              </div>
            </motion.div>

            {/* Airline Tickets */}
            <motion.div
              className="absolute left-[20%] bottom-[25%] z-25"
              animate={phase === "shaking" ? { ...shakeAnimation, transition: { ...shakeAnimation.transition, delay: 0.2 } } : phase === "dispersing" ? disperseDirections[3] : {}}
              transition={phase === "dispersing" ? { duration: 1, ease: "easeIn" } : undefined}
            >
              {/* Back ticket */}
              <div className="absolute top-2 left-2 w-[200px] h-[70px] bg-white rounded shadow-md -rotate-3 border border-gray-200">
                <div className="h-full flex">
                  <div className="w-1/4 bg-red-500/10 border-r border-dashed border-gray-300" />
                  <div className="flex-1 p-2">
                    <div className="text-[6px] text-gray-500">BOARDING PASS</div>
                  </div>
                </div>
              </div>
              
              {/* Front ticket */}
              <div className="relative w-[200px] h-[70px] bg-white rounded shadow-lg rotate-2 border border-gray-200">
                <div className="h-full flex">
                  <div className="w-1/4 bg-gradient-to-b from-red-100 to-red-50 border-r border-dashed border-gray-300 flex flex-col items-center justify-center">
                    <span className="text-red-500 font-bold text-xs">AA</span>
                  </div>
                  <div className="flex-1 p-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="text-[6px] text-gray-400">FIRST CLASS</div>
                        <div className="text-[8px] font-bold">02.15.2012</div>
                      </div>
                      <div className="text-right">
                        <div className="text-[6px] text-gray-400">SEAT</div>
                        <div className="text-[8px] font-bold">26B</div>
                      </div>
                    </div>
                    <div className="mt-2 flex justify-between">
                      <div>
                        <div className="text-[6px] text-gray-400">FROM</div>
                        <div className="text-xs font-bold">SFO</div>
                      </div>
                      <div className="text-gray-300">→</div>
                      <div className="text-right">
                        <div className="text-[6px] text-gray-400">TO</div>
                        <div className="text-xs font-bold">LAX</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Seashell */}
            <motion.div
              className="absolute left-[12%] top-[45%] z-15"
              animate={phase === "shaking" ? { ...shakeAnimation, transition: { ...shakeAnimation.transition, delay: 0.25 } } : phase === "dispersing" ? disperseDirections[4] : {}}
              transition={phase === "dispersing" ? { duration: 1, ease: "easeIn" } : undefined}
            >
              <div className="w-10 h-10 text-3xl filter drop-shadow-md">🐚</div>
            </motion.div>

            {/* Brown Button */}
            <motion.div
              className="absolute right-[30%] bottom-[20%] z-20"
              animate={phase === "shaking" ? { ...shakeAnimation, transition: { ...shakeAnimation.transition, delay: 0.3 } } : phase === "dispersing" ? disperseDirections[5] : {}}
              transition={phase === "dispersing" ? { duration: 1, ease: "easeIn" } : undefined}
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-700 to-amber-900 shadow-lg flex items-center justify-center">
                <div className="grid grid-cols-2 gap-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-amber-950" />
                  <div className="w-1.5 h-1.5 rounded-full bg-amber-950" />
                  <div className="w-1.5 h-1.5 rounded-full bg-amber-950" />
                  <div className="w-1.5 h-1.5 rounded-full bg-amber-950" />
                </div>
              </div>
            </motion.div>

            {/* Jeans Badge */}
            <motion.div
              className="absolute left-[18%] bottom-[40%] z-15"
              animate={phase === "shaking" ? { ...shakeAnimation, transition: { ...shakeAnimation.transition, delay: 0.35 } } : phase === "dispersing" ? disperseDirections[6] : {}}
              transition={phase === "dispersing" ? { duration: 1, ease: "easeIn" } : undefined}
            >
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-slate-700 to-slate-800 shadow-md flex items-center justify-center border-2 border-slate-600">
                <div className="text-[5px] text-slate-300 font-bold text-center leading-tight">
                  <div>★</div>
                  <div>JEANS</div>
                </div>
              </div>
            </motion.div>

            {/* Pearls */}
            <motion.div
              className="absolute right-[22%] top-[38%] z-25 flex gap-1"
              animate={phase === "shaking" ? { ...shakeAnimation, transition: { ...shakeAnimation.transition, delay: 0.4 } } : phase === "dispersing" ? disperseDirections[7] : {}}
              transition={phase === "dispersing" ? { duration: 1, ease: "easeIn" } : undefined}
            >
              <div className="w-3 h-3 rounded-full bg-gradient-to-br from-gray-100 to-gray-300 shadow-sm" />
              <div className="w-2.5 h-2.5 rounded-full bg-gradient-to-br from-gray-100 to-gray-300 shadow-sm" />
            </motion.div>

            {/* Paperclip */}
            <motion.div
              className="absolute right-[35%] bottom-[28%] z-20"
              animate={phase === "shaking" ? { ...shakeAnimation, transition: { ...shakeAnimation.transition, delay: 0.45 } } : phase === "dispersing" ? disperseDirections[8] : {}}
              transition={phase === "dispersing" ? { duration: 1, ease: "easeIn" } : undefined}
            >
              <div className="text-blue-300 rotate-45">
                <svg width="20" height="40" viewBox="0 0 20 40" fill="none">
                  <path d="M10 2C5 2 2 5 2 10V30C2 35 5 38 10 38C15 38 18 35 18 30V10" stroke="currentColor" strokeWidth="2" fill="none"/>
                </svg>
              </div>
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
