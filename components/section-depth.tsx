"use client"

import { useEffect } from "react"

const clamp = (value: number) => Math.min(1, Math.max(0, value))

/** Coordinates section stacking with CSS variables to keep scroll work GPU-friendly. */
export function SectionDepth() {
  useEffect(() => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>("main > section[id]"))
    let frame = 0

    const updateDepth = () => {
      const viewportHeight = window.innerHeight

      sections.forEach((section, index) => {
        const rect = section.getBoundingClientRect()
        const nextSection = sections[index + 1]
        const nextTop = nextSection?.getBoundingClientRect().top ?? viewportHeight
        const coverProgress = nextSection
          ? clamp((viewportHeight * 0.88 - nextTop) / (viewportHeight * 0.88))
          : 0
        const entranceProgress = clamp((viewportHeight - rect.top) / (viewportHeight * 0.72))

        section.style.setProperty("--section-scale", `${1 - coverProgress * 0.025}`)
        section.style.setProperty("--section-shade", `${coverProgress * 0.09}`)
        section.style.setProperty("--section-lift", `${(1 - entranceProgress) * 38}px`)
      })
    }

    const requestUpdate = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(updateDepth)
    }

    updateDepth()
    window.addEventListener("scroll", requestUpdate, { passive: true })
    window.addEventListener("resize", requestUpdate)

    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener("scroll", requestUpdate)
      window.removeEventListener("resize", requestUpdate)
    }
  }, [])

  return null
}
