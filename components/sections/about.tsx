"use client"

import { motion } from "framer-motion"

export function About() {
  return (
    <section
      id="about"
      className="relative min-h-screen overflow-hidden bg-[#f8f1d9] px-6 py-28 text-[#515987] md:px-12 lg:px-24"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_18%,rgba(255,255,255,0.7),rgba(248,241,217,0.35)_35%,rgba(226,201,133,0.28)_100%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.35),transparent_28%,transparent_72%,rgba(255,255,255,0.28))]" />
      <div className="pointer-events-none absolute left-[-7vw] top-[50%] select-none font-serif text-[28vw] italic leading-none text-[#b6a56f]/15 md:top-[42%] md:text-[21vw]">
        hello!
      </div>

      <motion.div
        className="relative mx-auto grid min-h-[calc(100vh-14rem)] max-w-6xl items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]"
        initial={{ opacity: 0, y: 34 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <div className="max-w-[680px] pt-10 md:pt-16 lg:pt-0">
          <p className="mb-3 font-mono text-xs uppercase tracking-[0.32em] text-[#4f5683] md:text-sm">
            Hello, my name is
          </p>
          <h1 className="max-w-[680px] text-[4.8rem] font-semibold leading-[0.9] tracking-normal text-[#586096] md:text-[7.2rem] lg:text-[7.6rem]">
            Annie
            <br />
            Nguyen
          </h1>

          <p className="mt-10 max-w-[760px] font-mono text-sm leading-6 tracking-normal text-[#4f5683] md:text-base md:leading-7">
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
          className="relative mx-auto w-full max-w-[355px] justify-self-center lg:max-w-[390px] lg:translate-y-[-2rem]"
          initial={{ opacity: 0, scale: 0.96, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
        >
          <img
            src="/images/about/portfolio-about-photo.png"
            alt="Portrait of Annie Nguyen"
            className="h-auto w-full object-contain drop-shadow-[0_18px_26px_rgba(67,55,31,0.28)]"
          />
        </motion.div>
      </motion.div>
    </section>
  )
}
