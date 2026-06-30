"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { motion } from "framer-motion"
import type { TargetAndTransition } from "framer-motion"
import { BriefcaseBusiness, FolderKanban, Mail, User, Wrench } from "lucide-react"

interface LoadingScreenProps {
  onComplete: () => void
}

type EdgeTarget = {
  x: "left" | "right"
  y: "top" | "bottom" | "middle"
  rotate: number
  nudgeX?: number
  nudgeY?: number
}

const visibleAtEdge = (size: number) => Math.min(72, size * 1)
const offscreenGap = 96

// Change these to tune where each loading item parks after the opening animation.
// x/y choose the screen edge. nudgeX/nudgeY fine-tune the final spot in pixels.
const edgeTargets: EdgeTarget[] = [
  // 0: Profile Card / about-page-sheet.png
  { x: "left", y: "top", rotate: -10, nudgeX: 120, nudgeY: 200 },
  // 1: Ripped Paper Tape / ripped-paper-tape.png
  { x: "left", y: "bottom", rotate: 30, nudgeX: 50, nudgeY: -260 },
  // 2: Postcard / postcard.png
  { x: "right", y: "middle", rotate: 90, nudgeX: -120, nudgeY: -20 },
  // 3: Plane Ticket / plane-ticket.png
  { x: "right", y: "top", rotate: 10, nudgeX: -170, nudgeY: 130 },
  // 4: Seashell / seashell.png
  { x: "left", y: "top", rotate: -60, nudgeY: 400 },
  // 5: Brown Button / brown-button.png
  { x: "left", y: "bottom", rotate: 45, nudgeX: 32, nudgeY: -32 },
  // 6: Jeans Button / jeans-button.png
  { x: "right", y: "bottom", rotate: -20, nudgeY: -50 },
  // 7: Pearls / all-pearls.png
  { x: "right", y: "top", rotate: 35, nudgeY: 220 },
  // 8: Paper Clip / paper-clip.png
  { x: "left", y: "bottom", rotate: -40, nudgeY: -220 },
  // 9: Profile Picture / profile-picture.png
  { x: "left", y: "top", rotate: -18, nudgeY: 250 },
  // 10: Used Paper Clip / used-paper-clip.png
  { x: "left", y: "top", rotate: 18, nudgeY: 210 },
  // 11: Postage Stamp / postage-stamp.png
  { x: "right", y: "middle", rotate: 12, nudgeY: -112 },
]

const brownButtonIndex = 5

const navItems = [
  { name: "About", href: "#about", Icon: User },
  { name: "Projects", href: "#projects", Icon: FolderKanban },
  { name: "Skills", href: "#skills", Icon: Wrench },
  { name: "Experience", href: "#experience", Icon: BriefcaseBusiness },
  { name: "Contact", href: "#contact", Icon: Mail },
]

export function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [phase, setPhase] = useState<"shaking" | "clicking" | "parking" | "parked">("shaking")
  const [cursorPosition, setCursorPosition] = useState({ x: 100, y: 100 })
  const [isAboutVisible, setIsAboutVisible] = useState(true)
  const [isBrownNavOpen, setIsBrownNavOpen] = useState(false)
  const [parkedDirections, setParkedDirections] = useState<TargetAndTransition[]>(
    edgeTargets.map(({ rotate }) => ({ x: 0, y: 0, rotate }))
  )
  const [hiddenDirections, setHiddenDirections] = useState<TargetAndTransition[]>(
    edgeTargets.map(({ rotate }) => ({ x: 0, y: 0, rotate }))
  )
  const collageRef = useRef<HTMLDivElement | null>(null)
  const itemRefs = useRef<(HTMLDivElement | null)[]>([])

  const updateEdgePositions = useCallback(() => {
    const collage = collageRef.current
    const nextParked: TargetAndTransition[] = []
    const nextHidden: TargetAndTransition[] = []

    edgeTargets.forEach((target, index) => {
      const node = itemRefs.current[index]

      if (!node || !collage) {
        const fallback = { x: 0, y: 0, rotate: target.rotate }
        nextParked[index] = fallback
        nextHidden[index] = fallback
        return
      }

      const collageRect = collage.getBoundingClientRect()
      const width = node.offsetWidth
      const height = node.offsetHeight
      const baseLeft = collageRect.left + node.offsetLeft
      const baseTop = collageRect.top + node.offsetTop
      const visibleX = visibleAtEdge(width)
      const visibleY = visibleAtEdge(height)

      const parkedX =
        target.x === "left"
          ? visibleX - width - baseLeft
          : window.innerWidth - visibleX - baseLeft

      const parkedY =
        target.y === "middle"
          ? 0
        : target.y === "top"
            ? visibleY - height - baseTop
            : window.innerHeight - visibleY - baseTop

      const hiddenX =
        target.x === "left"
          ? -width - offscreenGap - baseLeft
          : window.innerWidth + offscreenGap - baseLeft

      const hiddenY =
        target.y === "middle"
          ? parkedY
        : target.y === "top"
            ? -height - offscreenGap - baseTop
            : window.innerHeight + offscreenGap - baseTop

      nextParked[index] = {
        x: parkedX + (target.nudgeX ?? 0),
        y: parkedY + (target.nudgeY ?? 0),
        rotate: target.rotate,
      }
      nextHidden[index] = {
        x: hiddenX,
        y: hiddenY,
        rotate: target.rotate,
      }

    })

    setParkedDirections(nextParked)
    setHiddenDirections(nextHidden)
  }, [])

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
        updateEdgePositions()
        setPhase("parking")
      }, 1200)

      return () => {
        clearTimeout(clickTimer)
      }
    }
  }, [phase, updateEdgePositions])

  useEffect(() => {
    if (phase !== "parking") {
      return
    }

    const parkedTimer = setTimeout(() => {
      setPhase("parked")
      onComplete()
    }, 1000)

    return () => clearTimeout(parkedTimer)
  }, [phase, onComplete])

  useEffect(() => {
    updateEdgePositions()
    window.addEventListener("resize", updateEdgePositions)

    return () => window.removeEventListener("resize", updateEdgePositions)
  }, [updateEdgePositions])

  useEffect(() => {
    const aboutSection = document.getElementById("about")
    const projectsSection = document.getElementById("projects")

    if (!aboutSection) {
      return
    }

    const updateAboutVisibility = () => {
      const hideAfter =
        projectsSection
          ? projectsSection.offsetTop - window.innerHeight * 0.55
          : aboutSection.offsetTop + aboutSection.offsetHeight * 0.65

      setIsAboutVisible(window.scrollY < hideAfter)

    }

    updateAboutVisibility()
    window.addEventListener("scroll", updateAboutVisibility, { passive: true })
    window.addEventListener("resize", updateAboutVisibility)

    return () => {
      window.removeEventListener("scroll", updateAboutVisibility)
      window.removeEventListener("resize", updateAboutVisibility)
    }
  }, [])

  const shakeAnimation: TargetAndTransition = {
    x: [0, -3, 3, -3, 3, -2, 2, -1, 1, 0],
    rotate: [0, -1, 1, -1, 1, -0.5, 0.5, 0],
    transition: {
      duration: 0.5,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }

  const getItemAnimation = (index: number, delay = 0): TargetAndTransition => {
    if (phase === "shaking") {
      return delay ? { ...shakeAnimation, transition: { ...shakeAnimation.transition, delay } } : shakeAnimation
    }

    if (phase === "clicking") {
      return {}
    }

    if (phase === "parking") {
      return parkedDirections[index]
    }

    if (index === brownButtonIndex) {
      return parkedDirections[index]
    }

    return isAboutVisible ? parkedDirections[index] : hiddenDirections[index]
  }

  const getItemTransition = (): TargetAndTransition["transition"] => {
    if (phase === "shaking") {
      return undefined
    }

    return {
      duration: phase === "parking" ? 1 : 0.7,
      ease: phase === "parking" ? "easeOut" : "easeInOut",
    }
  }

  return (
    <motion.div
      className="pointer-events-none fixed inset-0 z-40 flex items-center justify-center overflow-hidden"
      initial={{ opacity: 1 }}
    >
          <motion.div
            className="absolute inset-0"
            style={{ backgroundColor: "#fefaf0" }}
            animate={{
              backgroundColor: phase === "parking" || phase === "parked" ? "#f8f5f2" : "#fefaf0",
              opacity: phase === "parking" || phase === "parked" ? 0 : 1,
            }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          />

          {/* Main collage container */}
          <div ref={collageRef} className="relative z-10 h-[605px] w-[905px] max-w-[92vw] -translate-y-6">
            
            {/* Profile Card */}
            <motion.div
              ref={(node) => {
                itemRefs.current[0] = node
              }}
              className="absolute left-[200px] top-[90px] z-10"
              animate={getItemAnimation(0)}
              transition={getItemTransition()}
            >
              <img 
                src="/images/loading/about-page-sheet.png" 
                alt="" 
                onLoad={updateEdgePositions}
                className="w-[350px] h-auto object-contain filter drop-shadow-lg"
              />
            </motion.div>
            
            {/* Profile Picture */}
            <motion.div
              ref={(node) => {
                itemRefs.current[9] = node
              }}
              className="absolute left-[380px] top-[123px] z-10"
              animate={getItemAnimation(9)}
              transition={getItemTransition()}
            >
              <img 
                src="/images/loading/profile-picture.png" 
                alt="" 
                onLoad={updateEdgePositions}
                className="w-[100px] h-auto object-contain filter drop-shadow-lg"
              />
            </motion.div>

            {/* Used Paper Clip */}
            <motion.div
              ref={(node) => {
                itemRefs.current[10] = node
              }}
              className="absolute left-[430px] top-[115px] z-10"
              animate={getItemAnimation(10)}
              transition={getItemTransition()}
            >
              <img 
                src="/images/loading/used-paper-clip.png" 
                alt="" 
                onLoad={updateEdgePositions}
                className="w-[50px] h-auto object-contain filter drop-shadow-lg"
              />
            </motion.div>

            {/* Cassette Tape */}
            <motion.div
              ref={(node) => {
                itemRefs.current[1] = node
              }}
              className="absolute left-[440px] top-[160px] z-30"
              animate={getItemAnimation(1, 0.1)}
              transition={getItemTransition()}
            >
              <img 
                src="/images/loading/ripped-paper-tape.png" 
                alt="" 
                onLoad={updateEdgePositions}
                className="w-[140px] h-auto object-contain filter drop-shadow-lg"
              />
            </motion.div>

            {/* Postcard */}
            <motion.div
              ref={(node) => {
                itemRefs.current[2] = node
              }}
              className="absolute left-[430px] top-[270px] z-10"
              animate={getItemAnimation(2, 0.15)}
              transition={getItemTransition()}
            >
              <img 
                src="/images/loading/postcard.png" 
                alt="" 
                onLoad={updateEdgePositions}
                className="w-[365px] h-auto object-contain filter drop-shadow-lg"
              />
            </motion.div>

            {/* Stamp */}
            <motion.div
              ref={(node) => {
                itemRefs.current[11] = node
              }}
              className="absolute left-[685px] top-[270px] z-10"
              animate={getItemAnimation(11, 0.15)}
              transition={getItemTransition()}
            >
              <img 
                src="/images/loading/postage-stamp.png" 
                alt="" 
                onLoad={updateEdgePositions}
                className="w-[100px] h-auto object-contain filter drop-shadow-lg"
              />
            </motion.div>

            {/* Brown Button */}
            <motion.div
              ref={(node) => {
                itemRefs.current[5] = node
              }}
              className="pointer-events-auto absolute left-[475px] top-[455px] z-30"
              animate={getItemAnimation(5, 0.3)}
              transition={getItemTransition()}
            >
              <motion.div
                className="absolute left-[66px] top-[-30px] flex origin-left -rotate-45 items-center gap-1 rounded-full bg-[#fefaf0]/95 p-2 shadow-[0_18px_38px_rgba(67,42,22,0.28)] ring-1 ring-[#b87461]/20 backdrop-blur-sm"
                initial={false}
                animate={{
                  opacity: isBrownNavOpen ? 1 : 0,
                  x: isBrownNavOpen ? 0 : -12,
                  scale: isBrownNavOpen ? 1 : 0.94,
                  pointerEvents: isBrownNavOpen ? "auto" : "none",
                }}
                transition={{ duration: 0.28, ease: "easeOut" }}
              >
                {navItems.map(({ name, href, Icon }) => (
                  <a
                    key={name}
                    href={href}
                    className="group flex h-9 w-9 items-center overflow-hidden rounded-full bg-white/70 px-2 text-[#7a5136] shadow-sm ring-1 ring-[#b87461]/15 transition-[width,background-color,color] duration-300 ease-out hover:w-28 hover:bg-[#b87461] hover:text-[#fefaf0]"
                    aria-label={name}
                  >
                    <Icon className="h-5 w-5 shrink-0" strokeWidth={1.8} />
                    <span className="ml-2 translate-x-2 whitespace-nowrap text-sm font-semibold opacity-0 transition-all duration-300 ease-out group-hover:translate-x-0 group-hover:opacity-100">
                      {name}
                    </span>
                  </a>
                ))}
              </motion.div>
              <motion.button
                type="button"
                className="relative z-10 cursor-pointer border-0 bg-transparent p-0"
                aria-label={isBrownNavOpen ? "Close navigation" : "Open navigation"}
                onClick={() => {
                  setIsBrownNavOpen((isOpen) => !isOpen)
                  window.dispatchEvent(new Event("about:brown-button-click"))
                }}
                animate={{ rotate: isBrownNavOpen ? 180 : 0 }}
                transition={{ type: "spring", stiffness: 260, damping: 18 }}
              >
                <img 
                  src="/images/loading/brown-button.png" 
                  alt="" 
                  onLoad={updateEdgePositions}
                  className="h-auto w-[60px] object-contain filter drop-shadow-lg"
                />
              </motion.button>
            </motion.div>

            {/* Paperclip */}
            <motion.div
              ref={(node) => {
                itemRefs.current[8] = node
              }}
              className="absolute left-[510px] top-[400px] z-40"
              animate={getItemAnimation(8, 0.45)}
              transition={getItemTransition()}
            >
              <img 
                src="/images/loading/paper-clip.png" 
                alt="" 
                onLoad={updateEdgePositions}
                className="w-[38px] h-auto object-contain filter drop-shadow-lg"
              />
            </motion.div>

            {/* Airline Tickets */}
            <motion.div
              ref={(node) => {
                itemRefs.current[3] = node
              }}
              className="absolute left-[140px] top-[300px] z-25"
              animate={getItemAnimation(3, 0.2)}
              transition={getItemTransition()}
            >
              <img 
                src="/images/loading/plane-ticket.png" 
                alt="" 
                onLoad={updateEdgePositions}
                className="w-[360px] h-auto object-contain filter drop-shadow-lg"
              />
            </motion.div>

            {/* Seashell */}
            <motion.div
              ref={(node) => {
                itemRefs.current[4] = node
              }}
              className="absolute left-[120px] top-[270px] z-15"
              animate={getItemAnimation(4, 0.25)}
              transition={getItemTransition()}
            >
              <img 
                src="/images/loading/seashell.png" 
                alt="" 
                onLoad={updateEdgePositions}
                className="w-[100px] h-auto object-contain filter drop-shadow-lg"
              />
            </motion.div>

            {/* Jeans Badge */}
            <motion.div
              ref={(node) => {
                itemRefs.current[6] = node
              }}
              className="absolute left-[110px] top-[340px] z-15"
              animate={getItemAnimation(6, 0.35)}
              transition={getItemTransition()}
            >
              <img 
                src="/images/loading/jeans-button.png" 
                alt="" 
                onLoad={updateEdgePositions}
                className="w-[46px] h-auto object-contain filter drop-shadow-lg"
              />
            </motion.div>

            {/* Pearls */}
            <motion.div
              ref={(node) => {
                itemRefs.current[7] = node
              }}
              className="absolute left-[570px] top-[230px] z-25"
              animate={getItemAnimation(7, 0.4)}
              transition={getItemTransition()}
            >
              <img 
                src="/images/loading/all-pearls.png" 
                alt="" 
                onLoad={updateEdgePositions}
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
                  : phase === "parking" || phase === "parked"
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
            animate={phase === "parking" || phase === "parked" ? { opacity: 0 } : { opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            {phase === "shaking" && "loading..."}
            {phase === "clicking" && "opening..."}
          </motion.p>
    </motion.div>
  )
}
