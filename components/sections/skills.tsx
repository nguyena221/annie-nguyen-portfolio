"use client"

import { motion, useInView } from "framer-motion"
import { Code2, Database, LayoutTemplate, Server, Smartphone, Wrench } from "lucide-react"
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

const skillGroups = [
  {
    title: "Frontend",
    icon: LayoutTemplate,
    color: "#a13a1e",
    rotate: "-rotate-2",
    skills: ["React", "Next.js", "TypeScript", "JavaScript", "HTML", "CSS", "Tailwind CSS", "Vite"],
  },
  {
    title: "Backend",
    icon: Server,
    color: "#542916",
    rotate: "rotate-1",
    skills: ["Node.js", "Express", "Spring Boot", "Java", "Python", "REST APIs"],
  },
  {
    title: "Mobile",
    icon: Smartphone,
    color: "#88b8ce",
    rotate: "-rotate-1",
    skills: ["React Native", "Expo", "iOS", "Android"],
  },
  {
    title: "Data",
    icon: Database,
    color: "#b79858",
    rotate: "rotate-2",
    skills: ["Firebase", "Firestore", "PostgreSQL", "MongoDB", "MySQL", "date-fns"],
  },
]

const toolsGroup = {
  title: "Tools",
  icon: Wrench,
  color: "#f1c166",
  rotate: "-rotate-1",
  skills: ["Git", "GitHub", "VS Code", "Figma", "Postman", "Docker", "Zustand"],
}

const featuredSkills = ["React", "TypeScript", "Tailwind CSS", "Firebase", "React Native", "Java", "Python", "Figma"]

export function Skills() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.05 })

  return (
    <section
      id="skills"
      ref={ref}
      className="relative overflow-hidden bg-[#88b8ce] px-6 py-20 text-[#542916] md:px-12 md:py-28 lg:px-24"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_14%_18%,rgba(254,250,240,0.68),transparent_28%),radial-gradient(circle_at_86%_80%,rgba(161,58,30,0.3),transparent_31%),radial-gradient(circle_at_12%_88%,rgba(241,193,102,0.28),transparent_28%),linear-gradient(180deg,rgba(136,184,206,0.88),rgba(161,58,30,0.2))]" />
      <Image
        src="/images/loading/ripped-paper-tape.png"
        alt=""
        width={210}
        height={90}
        className="pointer-events-none absolute left-4 top-10 hidden rotate-[-11deg] opacity-70 md:block"
      />
      <Image
        src="/images/loading/used-paper-clip.png"
        alt=""
        width={95}
        height={120}
        className="pointer-events-none absolute right-8 top-24 hidden rotate-[18deg] opacity-75 lg:block"
      />

      <div className="relative mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 34 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, ease: "easeOut" }}
          className="mb-10 grid gap-6 md:grid-cols-[0.72fr_1fr] md:items-end"
        >
          <div>
            <div className="mb-3 flex items-center gap-3 text-sm font-black uppercase tracking-[0.22em] text-[#542916]">
              <span className="grid size-9 place-items-center rounded-full bg-[#a13a1e] text-[#fefaf0] shadow-[0_7px_18px_rgba(84,41,22,0.24)]">
                <Code2 className="size-5" />
              </span>
              Skills
            </div>
            <h2
              className={`${instrumentSerif.className} text-6xl font-bold italic leading-[0.86] tracking-[0.03em] text-[#542916] md:text-8xl`}
              style={{
                textShadow: "0.011em 0 0 currentColor, -0.011em 0 0 currentColor",
              }}
            >
              Toolkit
            </h2>
          </div>

          <div className="relative rounded-[8px] border border-[#a13a1e]/24 bg-[#fefaf0]/82 p-5 shadow-[0_16px_36px_rgba(84,41,22,0.18)] backdrop-blur">
            <div className="absolute -top-5 left-8 h-9 w-28 rotate-[-4deg] bg-[#a13a1e]/28 shadow-[0_5px_14px_rgba(84,41,22,0.14)]" />
            <p className="relative text-sm leading-6 text-[#542916] md:text-base">
              I usually work across product UI, mobile app flows, backend data, and the tools that keep projects
              organized from prototype to deployment.
            </p>
          </div>
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.35fr] lg:items-start">
          <div className="grid gap-4">
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
              className="relative min-h-[245px] rounded-[8px] border border-[#a13a1e]/24 bg-[#fefaf0] p-6 shadow-[0_18px_42px_rgba(84,41,22,0.2)] md:p-7"
            >
            <Image
              src="/images/loading/paper-clip.png"
              alt=""
              width={46}
              height={68}
              className="pointer-events-none absolute -right-2 -top-4 rotate-[18deg] opacity-80"
            />
              <p className={`${justMeAgainDownHere.className} mb-4 text-5xl leading-none text-[#a13a1e]`}>
                most used
              </p>
              <div className="flex flex-wrap gap-3.5">
                {featuredSkills.map((skill, index) => (
                  <motion.span
                    key={skill}
                    initial={{ opacity: 0, y: 12, rotate: index % 2 === 0 ? -2 : 2 }}
                    animate={isInView ? { opacity: 1, y: 0, rotate: index % 2 === 0 ? -2 : 2 } : {}}
                    transition={{ duration: 0.35, delay: 0.18 + index * 0.04 }}
                    className="rounded-[6px] border border-[#a13a1e]/36 bg-[#fff6ec] px-3 py-2 text-sm font-semibold text-[#542916] shadow-[0_4px_0_rgba(161,58,30,0.18)]"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>

            <SkillCard group={toolsGroup} index={5} isInView={isInView} />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {skillGroups.map((group, groupIndex) => {
              const Icon = group.icon

              return (
                <SkillCard key={group.title} group={group} index={groupIndex} isInView={isInView} />
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

function SkillCard({
  group,
  index,
  isInView,
}: {
  group: (typeof skillGroups)[number] | typeof toolsGroup
  index: number
  isInView: boolean
}) {
  const Icon = group.icon

  return (
    <motion.article
      initial={{ opacity: 0, y: 24, rotate: 0 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.48, delay: 0.08 + index * 0.08, ease: "easeOut" }}
      className={`relative rounded-[8px] border border-[#a13a1e]/20 bg-[#fefaf0]/90 p-5 shadow-[0_12px_30px_rgba(84,41,22,0.16)] backdrop-blur transition-transform duration-300 hover:-translate-y-1 ${group.rotate}`}
    >
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="grid size-9 place-items-center rounded-full text-[#fefaf0]" style={{ backgroundColor: group.color }}>
            <Icon className="size-4" />
          </span>
          <h3 className="text-sm font-black uppercase tracking-[0.16em] text-[#542916]">{group.title}</h3>
        </div>
        <span className="h-3 w-3 rounded-full border border-[#542916]/20 bg-[#a13a1e]" />
      </div>

      <div className="flex flex-wrap gap-2">
        {group.skills.map((skill) => (
          <span
            key={skill}
            className="rounded-full border border-[#a13a1e]/26 bg-[#fff6ec] px-3 py-1.5 text-xs font-semibold text-[#542916]"
          >
            {skill}
          </span>
        ))}
      </div>
    </motion.article>
  )
}
