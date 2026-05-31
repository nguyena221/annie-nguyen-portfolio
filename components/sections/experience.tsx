"use client"

import { motion, useInView } from "framer-motion"
import { BriefcaseBusiness, CalendarDays, ExternalLink, MapPin, Stamp } from "lucide-react"
import { Instrument_Serif } from "next/font/google"
import Image from "next/image"
import { useRef, useState } from "react"

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
})

const experiences = [
  {
    title: "Software Engineering Intern",
    company: "Tech Company",
    companyUrl: "#",
    date: "Summer 2024",
    stamp: "SWE",
    ink: "#a13a1e",
    location: "Internship",
    description: [
      "Developed and maintained full-stack web applications using React, Node.js, and PostgreSQL",
      "Collaborated with cross-functional teams to design and implement new features",
      "Participated in code reviews and contributed to improving development processes",
      "Built RESTful APIs and integrated third-party services",
    ],
    tech: ["React", "Node.js", "PostgreSQL", "REST APIs"],
  },
  {
    title: "Web Developer Volunteer",
    company: "Women of Connections",
    companyUrl: "#",
    date: "2023 - Present",
    stamp: "WEB",
    ink: "#88b8ce",
    location: "Volunteer",
    description: [
      "Design and maintain the organization's web presence to empower women in tech",
      "Implement responsive, accessible web pages following modern best practices",
      "Collaborate with stakeholders to translate requirements into features",
      "Mentor junior volunteers in web development fundamentals",
    ],
    tech: ["HTML", "CSS", "JavaScript", "WordPress"],
  },
]

export function Experience() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [selectedIndex, setSelectedIndex] = useState(0)
  const selectedExperience = experiences[selectedIndex]

  return (
    <section
      id="experience"
      ref={ref}
      className="relative overflow-hidden bg-[#fefaf0] px-6 py-20 text-[#542916] md:px-12 md:py-28 lg:px-24"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_10%_18%,rgba(161,58,30,0.16),transparent_30%),radial-gradient(circle_at_92%_74%,rgba(136,184,206,0.28),transparent_34%),linear-gradient(180deg,#fefaf0_0%,#f6dfd2_100%)]" />
      <Image
        src="/images/loading/plane-ticket.png"
        alt=""
        width={260}
        height={150}
        className="pointer-events-none absolute -left-20 top-16 hidden rotate-[-10deg] opacity-45 md:block"
      />
      <Image
        src="/images/loading/postage-stamp.png"
        alt=""
        width={150}
        height={130}
        className="pointer-events-none absolute right-6 top-16 hidden rotate-[9deg] opacity-55 lg:block"
      />

      <div className="relative mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 34 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, ease: "easeOut" }}
          className="mb-10 flex flex-col gap-5 md:flex-row md:items-end md:justify-between"
        >
          <div>
            <div className="mb-3 flex items-center gap-3 text-sm font-black uppercase tracking-[0.22em] text-[#a13a1e]">
              <span className="grid size-9 place-items-center rounded-full bg-[#a13a1e] text-[#fefaf0] shadow-[0_7px_18px_rgba(84,41,22,0.22)]">
                <BriefcaseBusiness className="size-5" />
              </span>
              Experience
            </div>
            <h2
              className={`${instrumentSerif.className} text-6xl font-bold italic leading-[0.86] tracking-[0.03em] text-[#542916] md:text-8xl`}
              style={{
                textShadow: "0.011em 0 0 currentColor, -0.011em 0 0 currentColor",
              }}
            >
              Dossier
            </h2>
          </div>

          <p className="max-w-md rounded-[8px] border border-[#a13a1e]/18 bg-[#fefaf0]/78 p-4 text-sm leading-6 shadow-[0_12px_30px_rgba(84,41,22,0.12)] backdrop-blur">
            A concise record of where I have contributed, what I worked on, and the tools I used along the way.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 28, rotateX: 5 }}
          animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
          className="relative grid overflow-hidden rounded-[12px] border border-[#542916]/18 bg-[#b79858] p-3 shadow-[0_26px_70px_rgba(84,41,22,0.2)] lg:grid-cols-[0.82fr_1.18fr]"
        >
          <div className="absolute inset-y-3 left-1/2 hidden w-px bg-[#542916]/20 lg:block" />

          <div className="relative min-h-[420px] rounded-[8px] border border-[#542916]/12 bg-[#f4dfc0] p-5 shadow-[inset_0_1px_0_rgba(254,250,240,0.65)] md:p-7">
            <div className="absolute inset-0 rounded-[8px] bg-[radial-gradient(circle_at_20%_16%,rgba(254,250,240,0.55),transparent_24%),linear-gradient(90deg,rgba(84,41,22,0.06),transparent_16%,transparent_84%,rgba(84,41,22,0.05))]" />
            <div className="relative">
              <p className="mb-4 text-xs font-black uppercase tracking-[0.22em] text-[#a13a1e]">
                Experience Records
              </p>
              <div className="grid gap-4">
                {experiences.map((experience, index) => {
                  const isSelected = index === selectedIndex

                  return (
                    <button
                      key={experience.title + experience.company}
                      type="button"
                      onClick={() => setSelectedIndex(index)}
                      className={`group relative overflow-hidden rounded-[8px] border p-4 text-left transition-all duration-300 ${
                        isSelected
                          ? "border-[#a13a1e]/45 bg-[#fefaf0] shadow-[0_12px_24px_rgba(84,41,22,0.16)]"
                          : "border-[#542916]/12 bg-[#fefaf0]/56 hover:-translate-y-0.5 hover:bg-[#fefaf0]/82"
                      }`}
                    >
                      <div className="flex items-start gap-4">
                        <div
                          className={`grid size-18 shrink-0 place-items-center rounded-full border bg-transparent transition-transform duration-300 group-hover:rotate-[-2deg] ${
                            isSelected ? "scale-105" : "scale-95 opacity-70"
                          }`}
                          style={{ borderColor: experience.ink, color: experience.ink }}
                        >
                          <div className="text-center">
                            <Stamp className="mx-auto mb-1 size-5" />
                            <p className="font-mono text-sm font-black tracking-[0.16em]">{experience.stamp}</p>
                          </div>
                        </div>

                        <div className="min-w-0">
                          <p className="text-xs font-black uppercase tracking-[0.18em] text-[#a13a1e]">
                            {experience.date}
                          </p>
                          <h3 className="mt-1 text-base font-black leading-tight text-[#542916]">{experience.title}</h3>
                    <p className="mt-1 text-sm font-semibold text-[#542916]/72">{experience.company}</p>
                        </div>
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>
          </div>

          <div className="relative min-h-[420px] rounded-[8px] border border-[#542916]/12 bg-[#fefaf0] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.7)] md:p-7">
            <div className="pointer-events-none absolute inset-0 rounded-[8px] bg-[linear-gradient(90deg,rgba(84,41,22,0.04),transparent_14%,transparent_86%,rgba(84,41,22,0.04)),radial-gradient(circle_at_88%_14%,rgba(136,184,206,0.18),transparent_24%)]" />
            <motion.div
              key={selectedExperience.title}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.28, ease: "easeOut" }}
              className="relative"
            >
              <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                <div>
                  <div className="mb-3 flex flex-wrap items-center gap-2 text-xs font-black uppercase tracking-[0.18em] text-[#a13a1e]">
                    <CalendarDays className="size-4" />
                    <span>{selectedExperience.date}</span>
                    <span aria-hidden="true">/</span>
                    <MapPin className="size-4" />
                    <span>{selectedExperience.location}</span>
                  </div>
                  <h3 className="text-2xl font-black leading-tight text-[#542916] md:text-3xl">
                    {selectedExperience.title}
                  </h3>
                  <a
                    href={selectedExperience.companyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-flex items-center gap-1.5 text-sm font-bold text-[#a13a1e] hover:underline"
                  >
                    {selectedExperience.company}
                    <ExternalLink className="size-3.5" />
                  </a>
                </div>

                <div
                  className="grid size-22 shrink-0 rotate-[3deg] place-items-center rounded-full border bg-[#fefaf0]/35"
                  style={{ borderColor: selectedExperience.ink, color: selectedExperience.ink }}
                >
                  <div className="text-center">
                    <p className="text-[0.65rem] font-black uppercase tracking-[0.18em]">Verified</p>
                    <p className="font-mono text-xs font-black tracking-[0.18em]">{selectedExperience.stamp}</p>
                  </div>
                </div>
              </div>

              <div className="mb-6 rounded-[8px] border border-[#b79858]/42 bg-[#fff6ec] p-4">
                <p className="mb-3 text-xs font-black uppercase tracking-[0.18em] text-[#a13a1e]">
                  Responsibilities
                </p>
                <ul className="space-y-2">
                  {selectedExperience.description.map((item) => (
                    <li key={item} className="flex gap-3 text-sm leading-6 text-[#542916]/86">
                      <span className="mt-2 size-1.5 shrink-0 rounded-full bg-[#a13a1e]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <p className="mb-3 text-xs font-black uppercase tracking-[0.18em] text-[#542916]/72">Tools Used</p>
                <div className="flex flex-wrap gap-2">
                  {selectedExperience.tech.map((tech, index) => (
                    <span
                      key={tech}
                      className={`rounded-[6px] border px-3 py-1.5 text-xs font-bold text-[#542916] shadow-[0_3px_0_rgba(84,41,22,0.08)] ${
                        index % 2 === 0
                          ? "border-[#a13a1e]/28 bg-[#f8ddd2]"
                          : "border-[#b79858]/45 bg-[#f1c166]/24"
                      }`}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
