"use client"

import { motion } from "framer-motion"
import { Instrument_Serif, Just_Me_Again_Down_Here } from "next/font/google"
import { useCallback, useEffect, useRef, useState, type MouseEvent } from "react"

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
})

const justMeAgainDownHere = Just_Me_Again_Down_Here({
  subsets: ["latin"],
  weight: "400",
})

export function About() {
  const hasEnteredAbout = useRef(false)
  const hoverDismissTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const clickDismissTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const [showClickHint, setShowClickHint] = useState(true)
  const [showHoverHint, setShowHoverHint] = useState(true)
  const [tilt, setTilt] = useState({
    rotateX: 0,
    rotateY: 0,
    gradientX: 50,
    gradientY: 45,
  })

  const dismissAllHints = useCallback(() => {
    setShowClickHint(false)
    setShowHoverHint(false)
  }, [])

  const scheduleHoverDismiss = useCallback(() => {
    if (!showHoverHint || hoverDismissTimer.current) {
      return
    }

    hoverDismissTimer.current = setTimeout(() => {
      setShowHoverHint(false)
      hoverDismissTimer.current = null
    }, 2500)
  }, [showHoverHint])

  const scheduleClickDismiss = useCallback(() => {
    if (!showClickHint || clickDismissTimer.current) {
      return
    }

    clickDismissTimer.current = setTimeout(() => {
      setShowClickHint(false)
      clickDismissTimer.current = null
    }, 1000)
  }, [showClickHint])

  useEffect(() => {
    const aboutSection = document.getElementById("about")

    const handleBrownButtonClick = () => {
      scheduleClickDismiss()
    }

    const handleScroll = () => {
      if (!aboutSection || (!showClickHint && !showHoverHint)) {
        return
      }

      const rect = aboutSection.getBoundingClientRect()
      const isInView = rect.top < window.innerHeight && rect.bottom > 0

      if (isInView) {
        hasEnteredAbout.current = true
        return
      }

      if (hasEnteredAbout.current) {
        dismissAllHints()
      }
    }

    handleScroll()
    window.addEventListener("about:brown-button-click", handleBrownButtonClick)
    window.addEventListener("scroll", handleScroll, { passive: true })

    return () => {
      if (hoverDismissTimer.current) {
        clearTimeout(hoverDismissTimer.current)
      }

      if (clickDismissTimer.current) {
        clearTimeout(clickDismissTimer.current)
      }

      window.removeEventListener("about:brown-button-click", handleBrownButtonClick)
      window.removeEventListener("scroll", handleScroll)
    }
  }, [dismissAllHints, scheduleClickDismiss, showClickHint, showHoverHint])

  const handleProfileMove = (event: MouseEvent<HTMLDivElement>) => {
    scheduleHoverDismiss()

    const rect = event.currentTarget.getBoundingClientRect()
    const x = (event.clientX - rect.left) / rect.width - 0.5
    const y = (event.clientY - rect.top) / rect.height - 0.5

    setTilt({
      rotateX: y * -14,
      rotateY: x * 14,
      gradientX: 50 + x * 40,
      gradientY: 45 + y * 34,
    })
  }

  const resetProfileTilt = () => {
    setTilt({
      rotateX: 0,
      rotateY: 0,
      gradientX: 50,
      gradientY: 45,
    })
  }

  return (
    <section
      id="about"
      className="relative min-h-[100svh] overflow-hidden bg-[#f8f1d9] px-6 pb-16 pt-20 text-[#515987] md:px-12 md:pb-20 md:pt-24 lg:h-[100svh] lg:px-24 lg:py-20 xl:px-56"
      style={{ fontFamily: "Arial, sans-serif" }}
    >
      <motion.div
        className="pointer-events-none absolute inset-0"
        animate={{
          background: `radial-gradient(circle at ${tilt.gradientX}% ${tilt.gradientY}%, #e8bb67 0%, #fefaf0 46%, #e9bb69 100%)`,
        }}
        transition={{ type: "spring", stiffness: 520, damping: 32 }}
      />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.35),transparent_28%,transparent_72%,rgba(255,255,255,0.28))]" />
      <motion.div
        className="pointer-events-none absolute bottom-[5rem] left-[3rem] z-20 hidden w-20 text-center md:block xl:left-[4rem]"
        animate={{ opacity: showClickHint ? 1 : 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        aria-hidden={!showClickHint}
      >
        <p className={`${justMeAgainDownHere.className} -mb-1 text-3xl leading-none tracking-normal text-[#b87461]`}>
          click me!
        </p>
        <svg
          className="mx-auto h-16 w-20 overflow-visible text-[#b87461]"
          viewBox="0 0 80 64"
          fill="none"
          aria-hidden="true"
        >
          <defs>
            <marker
              id="arrowhead-click"
              markerWidth="6"
              markerHeight="6"
              refX="5"
              refY="3"
              orient="auto"
            >
              <path d="M0 0L6 3L0 6Z" fill="currentColor" />
            </marker>
          </defs>
          <path
            d="M60 8C60 28 48 42 28 52"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            markerEnd="url(#arrowhead-click)"
          />
        </svg>
      </motion.div>
      <motion.div
        className="relative mx-auto grid min-h-[calc(100svh-9rem)] max-w-6xl items-center gap-8 lg:h-full lg:min-h-0 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8"
        initial={{ opacity: 0, y: 34 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <div className="max-w-[680px] pt-4 md:pt-8 lg:pt-0">
          <p className="mb-3 text-xs uppercase tracking-[0.24em] text-[#4f5683] md:text-sm">
            Hello, my name is
          </p>
          <h1
            className={`${instrumentSerif.className} max-w-[680px] text-[5.4rem] font-bold italic leading-[0.82] tracking-[0.05em] text-[#586096] md:text-[8rem] lg:text-[clamp(6.1rem,11.6vh,8rem)]`}
            style={{
              textShadow:
                "0.007em 0 0 currentColor, -0.007em 0 0 currentColor",
            }}
          >
            Annie
            <br />
            Nguyen
          </h1>

          <p className="mt-8 max-w-[760px] text-sm leading-6 tracking-normal text-[#4f5683] md:text-base md:leading-7 lg:mt-6 lg:text-[clamp(0.82rem,1.85vh,1rem)] lg:leading-[1.55]">
            I&apos;m a fourth-year Computer Science student at the University of
            Virginia with a minor in Data Science. I enjoy building websites,
            mobile apps, and full-stack projects that feel purposeful, useful,
            and connected to real needs. Many of my projects begin from personal
            interests or community problems, which makes me more invested in
            shaping them from early idea to finished product. As a developer, I
            care about the full process: understanding the user, designing a
            thoughtful experience, building reliable features, and refining the
            details that make a product feel polished. I&apos;m especially
            motivated by work that lets me combine technical problem-solving
            with creativity, usability, and real-world impact.
          </p>
        </div>

        <motion.div
          className="relative mx-auto w-full max-w-[355px] justify-self-center lg:max-w-[min(390px,42vh)] lg:translate-y-[-1rem]"
          initial={{ opacity: 0, scale: 0.96, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
          onMouseMove={handleProfileMove}
          onMouseLeave={resetProfileTilt}
          style={{ perspective: 900 }}
        >
          <motion.div
            className="pointer-events-none absolute -right-8 -top-15 z-20 hidden items-start gap-0 md:flex"
            animate={{ opacity: showHoverHint ? 1 : 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            aria-hidden={!showHoverHint}
          >
            <svg
              className="h-16 w-28 overflow-visible text-[#b87461]"
              viewBox="0 0 128 80"
              fill="none"
              aria-hidden="true"
            >
              <defs>
                <marker
                  id="arrowhead-hover"
                  markerWidth="6"
                  markerHeight="6"
                  refX="5"
                  refY="3"
                  orient="auto"
                >
                  <path d="M0 0L6 3L0 6Z" fill="currentColor" />
                </marker>
              </defs>
              <path
                d="M116 8C82 10 42 24 24 66"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                markerEnd="url(#arrowhead-hover)"
              />
            </svg>
            <p className={`${justMeAgainDownHere.className} -mt-1 whitespace-nowrap text-3xl leading-none tracking-normal text-[#b87461]`}>
              hover over me!
            </p>
          </motion.div>
          <motion.img
            src="/images/about/portfolio-about-photo.png"
            alt="Portrait of Annie Nguyen"
            className="h-auto w-full object-contain drop-shadow-[0_18px_26px_rgba(67,55,31,0.28)]"
            animate={{
              rotateX: tilt.rotateX,
              rotateY: tilt.rotateY,
            }}
            transition={{ type: "spring", stiffness: 160, damping: 18 }}
            style={{ transformStyle: "preserve-3d" }}
          />
        </motion.div>
      </motion.div>
    </section>
  )
}
