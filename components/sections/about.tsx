"use client"

import { motion } from "framer-motion"
import { Instrument_Serif, Just_Me_Again_Down_Here } from "next/font/google"
import { useCallback, useEffect, useRef, useState, type MouseEvent } from "react"
import { createPortal } from "react-dom"

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
})

const justMeAgainDownHere = Just_Me_Again_Down_Here({
  subsets: ["latin"],
  weight: "400",
})

type AboutProps = {
  isVisible: boolean
}

export function About({ isVisible }: AboutProps) {
  const hasEnteredAbout = useRef(false)
  const hoverDismissTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const clickDismissTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const profileRef = useRef<HTMLDivElement | null>(null)
  const [showClickHint, setShowClickHint] = useState(false)
  const [showHoverHint, setShowHoverHint] = useState(false)
  const [hintHost, setHintHost] = useState<HTMLElement | null>(null)
  const [hoverHintPosition, setHoverHintPosition] = useState({ left: 0, top: 0, width: 0 })
  const [tilt, setTilt] = useState({
    rotateX: 0,
    rotateY: 0,
    gradientX: 50,
    gradientY: 45,
  })

  const updateHoverHintPosition = useCallback(() => {
    const rect = profileRef.current?.getBoundingClientRect()

    if (rect) {
      setHoverHintPosition({ left: rect.left, top: rect.top - 72, width: rect.width })
    }
  }, [])

  useEffect(() => {
    if (!isVisible) {
      return
    }

    const revealTimer = setTimeout(() => {
      setShowClickHint(true)
      setShowHoverHint(true)
      updateHoverHintPosition()
    }, 900)

    return () => clearTimeout(revealTimer)
  }, [isVisible, updateHoverHintPosition])

  useEffect(() => {
    setHintHost(document.body)
    updateHoverHintPosition()
    window.addEventListener("resize", updateHoverHintPosition)
    window.addEventListener("scroll", updateHoverHintPosition, { passive: true })

    return () => {
      window.removeEventListener("resize", updateHoverHintPosition)
      window.removeEventListener("scroll", updateHoverHintPosition)
    }
  }, [updateHoverHintPosition])

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
        setShowHoverHint(false)
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
  }, [scheduleClickDismiss, showClickHint, showHoverHint])

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
      className="relative min-h-[100svh] overflow-x-hidden bg-[#f8f1d9] px-6 pb-16 pt-20 text-[#515987] md:px-28 md:pb-20 md:pt-24 lg:px-48 lg:py-20 xl:px-64"
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
      {hintHost && isVisible && createPortal(<motion.div
        className="pointer-events-none fixed bottom-[5rem] left-[5.5rem] z-[100] hidden w-20 text-center md:block"
        initial={{ opacity: 0 }}
        animate={{ opacity: showClickHint ? 1 : 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        aria-hidden={!showClickHint}
      >
        <p className={`${justMeAgainDownHere.className} -mb-1 text-3xl leading-none tracking-normal text-[#8f432d]`}>
          click me!
        </p>
        <svg
          className="mx-auto h-16 w-20 -translate-x-8 overflow-visible text-[#8f432d]"
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
      </motion.div>, hintHost)}
      <motion.div
        className="relative mx-auto grid min-h-[calc(100svh-9rem)] max-w-6xl items-center gap-8 md:grid-cols-[1.08fr_0.92fr] md:gap-4 lg:gap-6 xl:gap-8"
        initial={{ opacity: 0, y: 34 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <div className="mx-auto w-full max-w-[680px] pt-4 md:pt-0">
          <p className="mb-3 text-xs uppercase tracking-[0.24em] text-[#4f5683] md:text-sm">
            Hello, my name is
          </p>
          <h1
            className={`${instrumentSerif.className} max-w-[680px] text-[5.4rem] font-bold italic leading-[0.82] tracking-[0.05em] text-[#586096] md:text-[clamp(5rem,9vw,7rem)] xl:text-[clamp(6.1rem,11.6vh,8rem)]`}
            style={{
              textShadow:
                "0.007em 0 0 currentColor, -0.007em 0 0 currentColor",
            }}
          >
            Annie
            <br />
            Nguyen
          </h1>

          <div className="mt-8 max-w-[760px] text-sm leading-6 tracking-normal text-[#4f5683] md:text-base md:leading-7 lg:mt-6 lg:text-[clamp(0.82rem,1.85vh,1rem)] lg:leading-[1.55]">
            <p>
              I&apos;m a fourth-year Computer Science student at the University of
              Virginia with a minor in Data Science. I genuinely enjoy building
              websites, mobile apps, and full-stack projects that feel purposeful,
              useful, and connected to real needs.
            </p>
            <ul className="mt-5 space-y-3" role="list">
              <li className="flex gap-3">
                <span className="mt-[0.65em] size-1.5 shrink-0 rounded-full bg-[#b87461]" aria-hidden="true" />
                <span>
                  I&apos;m drawn to ideas inspired by personal interests or community
                  problems because I feel more invested in the outcome.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="mt-[0.65em] size-1.5 shrink-0 rounded-full bg-[#b87461]" aria-hidden="true" />
                <span>
                  I care about the full journey, from understanding users and shaping
                  an idea to building a reliable, polished experience.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="mt-[0.65em] size-1.5 shrink-0 rounded-full bg-[#b87461]" aria-hidden="true" />
                <span>
                  I&apos;m most motivated by work that combines technical problem-solving,
                  creativity, usability, and meaningful real-world impact.
                </span>
              </li>
            </ul>
          </div>
        </div>

        <motion.div
          ref={profileRef}
          className="relative mx-auto w-[min(290px,88vw)] max-w-none justify-self-center md:w-[290px] lg:translate-y-[-1rem]"
          initial={{ opacity: 0, scale: 0.96, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
          onAnimationComplete={updateHoverHintPosition}
          onMouseMove={handleProfileMove}
          onMouseLeave={resetProfileTilt}
          style={{ perspective: 900 }}
        >
          {hintHost && isVisible && createPortal(<motion.div
            className="pointer-events-none fixed z-[100] hidden flex-col items-center md:flex"
            style={{ left: hoverHintPosition.left, top: hoverHintPosition.top, width: hoverHintPosition.width }}
            initial={{ opacity: 0 }}
            animate={{ opacity: showHoverHint ? 1 : 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            aria-hidden={!showHoverHint}
          >
            <p className={`${justMeAgainDownHere.className} whitespace-nowrap text-3xl leading-none tracking-normal text-[#8f432d]`}>
              hover over me!
            </p>
            <svg
              className="h-12 w-20 overflow-visible text-[#8f432d]"
              viewBox="0 0 80 48"
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
                d="M22 4C24 20 31 31 42 42"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                markerEnd="url(#arrowhead-hover)"
              />
            </svg>
          </motion.div>, hintHost)}
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
            onLoad={updateHoverHintPosition}
          />
        </motion.div>
      </motion.div>
    </section>
  )
}
