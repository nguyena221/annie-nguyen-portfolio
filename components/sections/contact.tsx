"use client"

import { Button } from "@/components/ui/button"
import { motion, useInView } from "framer-motion"
import { ArrowUpRight, Github, Linkedin, Mail, MessageCircle, Send } from "lucide-react"
import { Instrument_Serif, Just_Me_Again_Down_Here } from "next/font/google"
import Image from "next/image"
import { useRef } from "react"

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
})

const justMeAgainDownHere = Just_Me_Again_Down_Here({
  subsets: ["latin"],
  weight: "400",
})

const socialLinks = [
  {
    name: "Email",
    href: "mailto:annie.nguyen@email.com",
    icon: Mail,
    handle: "annie.nguyen@email.com",
    detail: "Best for opportunities and project ideas",
  },
  {
    name: "GitHub",
    href: "https://github.com",
    icon: Github,
    handle: "@annienguyen",
    detail: "Projects, repos, and experiments",
  },
  {
    name: "LinkedIn",
    href: "https://linkedin.com",
    icon: Linkedin,
    handle: "/in/annienguyen",
    detail: "Work, school, and professional updates",
  },
]

const noteLines = ["open to internships", "full-stack projects", "mobile apps", "thoughtful design"]

export function Contact() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.05 })

  return (
    <section
      id="contact"
      ref={ref}
      className="relative overflow-hidden bg-[#a13a1e] px-6 py-20 text-[#fefaf0] md:px-12 md:py-28 lg:px-24"
    >
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,#8f2f1c_0%,#a13a1e_42%,#5f4638_100%)]" />
      <div className="pointer-events-none absolute inset-0 opacity-20 bg-[linear-gradient(90deg,rgba(254,250,240,0.18)_1px,transparent_1px),linear-gradient(180deg,rgba(254,250,240,0.14)_1px,transparent_1px)] bg-[size:44px_44px]" />

      <motion.div
        className="pointer-events-none absolute left-4 top-12 hidden md:block"
        animate={{ y: [0, -12, 0], rotate: [-8, -11, -8] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      >
        <Image
          src="/images/loading/postcard.png"
          alt=""
          width={230}
          height={150}
          className="opacity-35"
        />
      </motion.div>
      <motion.div
        className="pointer-events-none absolute bottom-10 right-4 hidden lg:block"
        animate={{ y: [0, 14, 0], rotate: [9, 13, 9] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      >
        <Image
          src="/images/loading/paper-clip.png"
          alt=""
          width={76}
          height={112}
          className="opacity-55"
        />
      </motion.div>

      <div className="relative mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 34 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, ease: "easeOut" }}
          className="mb-10 grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-end"
        >
          <div>
            <div className="mb-4 flex items-center gap-3 text-xs font-black uppercase tracking-[0.22em] text-[#f1c166]">
              <span className="grid size-9 place-items-center rounded-[8px] border border-[#fefaf0]/20 bg-[#fefaf0]/12 text-[#fefaf0] shadow-[0_10px_26px_rgba(54,21,12,0.2)]">
                <MessageCircle className="size-4" />
              </span>
              Connect
            </div>
            <h2
              className={`${instrumentSerif.className} text-6xl font-bold italic leading-[0.86] tracking-[0.03em] text-[#fefaf0] md:text-8xl`}
              style={{
                textShadow: "0.01em 0 0 currentColor, -0.01em 0 0 currentColor",
              }}
            >
              Let&apos;s build
              <br />
              something.
            </h2>
          </div>

          <p className="max-w-xl text-sm leading-6 text-[#fff2df] md:text-base md:leading-7 lg:justify-self-end">
            I&apos;m interested in practical software, polished interfaces, and teams that care about making products
            feel useful. Send a note if you want to collaborate, talk about a role, or trade project ideas.
          </p>
        </motion.div>

        <div className="grid gap-6 lg:grid-cols-[1fr_0.82fr] lg:items-stretch">
          <motion.div
            initial={{ opacity: 0, x: -28, rotate: -1 }}
            animate={isInView ? { opacity: 1, x: 0, rotate: -1 } : {}}
            transition={{ duration: 0.65, delay: 0.1, ease: "easeOut" }}
            whileHover={{ y: -5, rotate: -0.4 }}
            className="relative min-h-[390px] overflow-hidden rounded-[8px] border border-[#fefaf0]/22 bg-[#fefaf0] p-6 text-[#542916] shadow-[0_30px_80px_rgba(54,21,12,0.34)] md:p-8"
          >
            <div className="absolute inset-x-0 top-0 h-12 bg-[linear-gradient(90deg,rgba(161,58,30,0.14)_1px,transparent_1px)] bg-[size:18px_18px]" />
            <motion.div
              className="absolute right-6 top-6 h-16 w-16 rounded-[8px] border-2 border-dashed border-[#a13a1e]/35"
              animate={{ rotate: [2, -3, 2] }}
              transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
            />

            <div className="relative pt-8">
              <p className={`${justMeAgainDownHere.className} mb-3 text-5xl leading-none text-[#a13a1e]`}>
                currently
              </p>
              <div className="mb-8 flex flex-wrap gap-2">
                {noteLines.map((line, index) => (
                  <motion.span
                    key={line}
                    initial={{ opacity: 0, y: 12, rotate: index % 2 === 0 ? -1 : 1 }}
                    animate={isInView ? { opacity: 1, y: 0, rotate: index % 2 === 0 ? -1 : 1 } : {}}
                    transition={{ duration: 0.35, delay: 0.22 + index * 0.06 }}
                    className="rounded-[6px] border border-[#a13a1e]/22 bg-[#fff6ec] px-3 py-2 text-xs font-black uppercase tracking-[0.12em] text-[#6a321f] shadow-[0_4px_0_rgba(161,58,30,0.12)]"
                  >
                    {line}
                  </motion.span>
                ))}
              </div>

              <h3 className="max-w-xl text-3xl font-black leading-tight text-[#542916] md:text-4xl">
                Have an idea, role, or project that could use a thoughtful builder?
              </h3>
              <p className="mt-5 max-w-xl text-sm leading-6 text-[#684736] md:text-base md:leading-7">
                Email is the fastest way to reach me. I&apos;m happy to talk through product ideas, internships,
                front-end work, mobile apps, or anything that needs both engineering and design care.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button
                  asChild
                  size="lg"
                  className="h-12 rounded-[8px] bg-[#a13a1e] px-6 text-sm font-black uppercase tracking-[0.12em] text-white shadow-[0_12px_24px_rgba(161,58,30,0.25)] hover:bg-[#8f2f1c]"
                >
                  <a href="mailto:annie.nguyen@email.com">
                    <Send className="mr-2 size-4" />
                    Send a Message
                  </a>
                </Button>
                <a
                  href="#projects"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-[8px] border border-[#542916]/18 bg-white px-6 text-sm font-black uppercase tracking-[0.12em] text-[#542916] transition-all hover:-translate-y-0.5 hover:border-[#a13a1e]/35 hover:text-[#a13a1e]"
                >
                  View Work
                  <ArrowUpRight className="size-4" />
                </a>
              </div>
            </div>
          </motion.div>

          <div className="grid gap-4">
            {socialLinks.map((link, index) => {
              const Icon = link.icon

              return (
                <motion.a
                  key={link.name}
                  href={link.href}
                  target={link.name !== "Email" ? "_blank" : undefined}
                  rel={link.name !== "Email" ? "noopener noreferrer" : undefined}
                  initial={{ opacity: 0, x: 28 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.48, delay: 0.2 + index * 0.1, ease: "easeOut" }}
                  whileHover={{ x: 6, scale: 1.01 }}
                  className="group relative overflow-hidden rounded-[8px] border border-[#fefaf0]/18 bg-[#fefaf0]/12 p-5 shadow-[0_18px_45px_rgba(54,21,12,0.2)] backdrop-blur transition-colors hover:bg-[#fefaf0]/18 md:p-6"
                >
                  <motion.span
                    className="absolute inset-y-0 left-0 w-1 bg-[#f1c166]"
                    initial={{ scaleY: 0 }}
                    animate={isInView ? { scaleY: 1 } : {}}
                    transition={{ duration: 0.4, delay: 0.28 + index * 0.1 }}
                  />
                  <span className="relative flex items-start gap-4">
                    <span className="grid size-11 shrink-0 place-items-center rounded-[8px] bg-[#fefaf0] text-[#a13a1e] shadow-[0_10px_20px_rgba(54,21,12,0.18)] transition-transform group-hover:rotate-[-3deg]">
                      <Icon className="size-5" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="flex items-center justify-between gap-4">
                        <span className="text-xs font-black uppercase tracking-[0.2em] text-[#f1c166]">
                          {link.name}
                        </span>
                        <ArrowUpRight className="size-4 shrink-0 text-[#fefaf0]/70 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                      </span>
                      <span className="mt-2 block break-words text-base font-black text-[#fff7ec]">{link.handle}</span>
                      <span className="mt-2 block text-sm leading-6 text-[#ffe1c7]">{link.detail}</span>
                    </span>
                  </span>
                </motion.a>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
