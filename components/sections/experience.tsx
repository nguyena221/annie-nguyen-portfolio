"use client"

import { motion, useInView } from "framer-motion"
import { BriefcaseBusiness, CalendarDays, CheckCircle2, MapPin } from "lucide-react"
import { Instrument_Serif } from "next/font/google"
import { useRef, useState } from "react"

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
})

const experiences = [
  {
    title: "Web Developer Intern",
    company: "WoMen of Connections Ministry",
    date: "October 2025 - December 2025",
    location: "Remote / Internship & Volunteer",
    overview:
      "Supported the organization's main WordPress website by improving layouts and presenting resources, announcements, and ministry information in a clear, accessible format. Collaborated with designers, developers, and team members to deliver responsive updates aligned with organizational goals.",
    description: [
      "Designed and updated responsive WordPress pages using Elementor, HTML, CSS, and JavaScript to improve usability and content organization.",
      "Maintained and modified 10+ pages highlighting resources, announcements, and organizational updates.",
      "Collaborated with cross-functional team members to implement design changes, review feedback, and deliver polished web features.",
      "Tested across 4+ browsers and 3+ device types to ensure consistent layouts and functionality.",
      "Improved accessibility, search visibility, and audience engagement by organizing content around user needs and ministry objectives.",
    ],
    learned:
      "This experience strengthened my technical and professional skills in a remote team environment. I gained more hands-on experience with WordPress, Elementor, JavaScript, HTML, and CSS while learning to organize website content around an organization's goals. I also strengthened my communication skills by collaborating with designers and developers, clarifying content needs, responding to feedback, and ensuring each update accurately reflected the ministry's resources and information.",
    tech: ["WordPress", "Elementor", "HTML", "CSS", "JavaScript"],
  },
  {
    title: "Receptionist & Web Developer",
    company: "Pro Nails",
    date: "June 2021 - August 2023",
    location: "Waynesboro, VA",
    overview:
      "Managed front-desk operations while independently developing the salon's first official website to strengthen its online presence and make business information easier for clients to access. Served as the main technical point of contact, working with the owner to organize services, contact details, and client-facing information.",
    description: [
      "Independently designed, developed, and launched the salon's first official website across 3+ pages showcasing services, business information, and contact details.",
      "Translated business needs into a clean, user-friendly website structure through regular communication with the salon owner and staff.",
      "Guided clients through 10+ service options and provided personalized recommendations to support client satisfaction.",
      "Coordinated daily appointment scheduling to improve booking flow, reduce confusion, and support employee productivity.",
      "Processed payments, answered client questions, and maintained an organized reception area to support smooth daily operations.",
    ],
    learned:
      "This experience taught me how to take a website from an idea to a live product. Through my first real deployment, I learned to prepare a site for launch, organize client-facing content, test pages before publishing, and make information accessible to real users. Serving as the project's main technical contact also strengthened my ability to gather business needs, explain technical decisions clearly, and turn salon information into a useful digital experience for customers.",
    tech: ["HTML", "CSS", "JavaScript", "Vercel"],
  },
]

/** Lets visitors compare verified roles, contributions, tools, and learning outcomes. */
export function Experience() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.05 })
  const [selectedIndex, setSelectedIndex] = useState(0)
  const selectedExperience = experiences[selectedIndex]

  return (
    <section
      id="experience"
      ref={ref}
      className="relative overflow-hidden bg-[#fbf7ec] px-6 pb-28 pt-20 text-[#35251c] md:px-12 md:pb-36 md:pt-28 lg:px-24"
    >
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,#fbf7ec_0%,#f3ead9_100%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[#5f4638]/12" />

      <div className="relative mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 34 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, ease: "easeOut" }}
          className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between"
        >
          <div className="max-w-2xl">
            <div className="mb-4 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.22em] text-[#8f432d]">
              <span className="grid size-9 place-items-center rounded-[8px] border border-[#8f432d]/18 bg-white/60 text-[#8f432d] shadow-sm">
                <BriefcaseBusiness className="size-4" />
              </span>
              Experience
            </div>
            <h2
              className={`${instrumentSerif.className} text-5xl font-bold italic leading-[0.9] tracking-[0.03em] text-[#35251c] md:text-7xl`}
              style={{
                textShadow: "0.008em 0 0 currentColor, -0.008em 0 0 currentColor",
              }}
            >
              Professional Experience
            </h2>
            <p className="mt-5 max-w-xl text-sm leading-6 text-[#5f4638] md:text-base md:leading-7">
              Selected roles where I have built software, supported stakeholders, and contributed to practical web
              products.
            </p>
          </div>

          <div className="grid w-full max-w-sm grid-cols-2 overflow-hidden rounded-[8px] border border-[#5f4638]/12 bg-white/55 shadow-sm backdrop-blur">
            <div className="border-r border-[#5f4638]/12 p-4">
              <p className="text-2xl font-black leading-none text-[#35251c]">{experiences.length}</p>
              <p className="mt-1 text-xs font-semibold uppercase tracking-[0.16em] text-[#7a6255]">Roles</p>
            </div>
            <div className="p-4">
              <p className="text-2xl font-black leading-none text-[#35251c]">Full-stack</p>
              <p className="mt-1 text-xs font-semibold uppercase tracking-[0.16em] text-[#7a6255]">Focus</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
          className="depth-3 inset-sheen grid overflow-hidden rounded-[8px] border border-[#5f4638]/12 bg-white/80 lg:grid-cols-[0.42fr_0.58fr]"
        >
          <div className="border-b border-[#5f4638]/12 bg-[#f7efe2] p-5 md:p-7 lg:border-b-0 lg:border-r">
            <div className="mb-5 flex items-center justify-between gap-4">
              <p className="text-xs font-black uppercase tracking-[0.22em] text-[#8f432d]">
                Roles
              </p>
              <span className="text-xs font-semibold text-[#7a6255]">{selectedIndex + 1} / {experiences.length}</span>
            </div>

            <div className="grid gap-3">
              {experiences.map((experience, index) => {
                const isSelected = index === selectedIndex

                return (
                  <button
                    key={experience.title + experience.company}
                    type="button"
                    onClick={() => setSelectedIndex(index)}
                    className={`group interactive-lift grid grid-cols-[auto_1fr] gap-4 rounded-[8px] border p-4 text-left transition-all duration-300 ${
                      isSelected
                        ? "border-[#8f432d]/35 bg-white shadow-[0_12px_28px_rgba(53,37,28,0.12)]"
                        : "border-[#5f4638]/10 bg-white/45 hover:border-[#8f432d]/24 hover:bg-white/80"
                    }`}
                    aria-pressed={isSelected}
                  >
                    <span
                      className={`mt-1 size-3 rounded-full border-2 transition-colors ${
                        isSelected ? "border-[#8f432d] bg-[#8f432d]" : "border-[#b49b89] bg-transparent"
                      }`}
                    />
                    <span className="min-w-0">
                      <span className="block text-xs font-black uppercase tracking-[0.16em] text-[#8f432d]">
                        {experience.date}
                      </span>
                      <span className="mt-2 block text-base font-black leading-tight text-[#35251c]">
                        {experience.title}
                      </span>
                      <span className="mt-1 block text-sm font-semibold text-[#6d5548]">{experience.company}</span>
                    </span>
                  </button>
                )
              })}
            </div>
          </div>

          <div className="min-h-[430px] bg-[#fffdf8] p-5 md:p-8">
            <motion.div
              key={selectedExperience.title}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.28, ease: "easeOut" }}
              className="flex h-full flex-col"
            >
              <div className="mb-7 flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
                <div className="max-w-xl">
                  <div className="mb-4 flex flex-wrap items-center gap-x-3 gap-y-2 text-xs font-bold uppercase tracking-[0.16em] text-[#7a6255]">
                    <span className="inline-flex items-center gap-1.5">
                    <CalendarDays className="size-4" />
                      {selectedExperience.date}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                    <MapPin className="size-4" />
                      {selectedExperience.location}
                    </span>
                  </div>
                  <h3 className="text-2xl font-black leading-tight text-[#35251c] md:text-3xl">
                    {selectedExperience.title}
                  </h3>
                  <p className="mt-3 inline-flex items-center gap-1.5 text-sm font-bold text-[#8f432d]">
                    {selectedExperience.company}
                  </p>
                </div>

                <div className="rounded-[8px] border border-[#5f4638]/12 bg-[#f7efe2] px-4 py-3 text-sm font-semibold text-[#5f4638]">
                  {selectedExperience.tech.length} tools
                </div>
              </div>

              <div className="mb-7">
                <p className="mb-3 text-sm leading-6 text-[#4f3a30] md:text-[0.95rem] md:leading-7">
                  {selectedExperience.overview}
                </p>
                <p className="mb-4 text-xs font-black uppercase tracking-[0.18em] text-[#8f432d]">
                  Scope and Contributions
                </p>
                <ul className="grid gap-3">
                  {selectedExperience.description.map((item) => (
                    <li key={item} className="flex gap-3 text-sm leading-6 text-[#4f3a30] md:text-[0.95rem]">
                      <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-[#8f432d]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mb-7 rounded-[8px] border border-[#8f432d]/14 bg-[#f7efe2] p-4 md:p-5">
                <p className="mb-3 text-xs font-black uppercase tracking-[0.18em] text-[#8f432d]">
                  What I Learned
                </p>
                <p className="text-sm leading-6 text-[#4f3a30] md:text-[0.95rem] md:leading-7">
                  {selectedExperience.learned}
                </p>
              </div>

              <div className="mt-auto border-t border-[#5f4638]/12 pt-5">
                <p className="mb-3 text-xs font-black uppercase tracking-[0.18em] text-[#7a6255]">Tools Used</p>
                <div className="flex flex-wrap gap-2">
                  {selectedExperience.tech.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-[6px] border border-[#5f4638]/12 bg-[#fbf7ec] px-3 py-1.5 text-xs font-bold text-[#4f3a30]"
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
