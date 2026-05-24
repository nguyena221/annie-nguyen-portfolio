"use client"

import { motion, useInView } from "framer-motion"
import { CalendarDays, ExternalLink, Github, Grid2X2, MonitorSmartphone, Sparkles, Store, Terminal } from "lucide-react"
import { Instrument_Serif } from "next/font/google"
import { FormEvent, KeyboardEvent, useEffect, useRef, useState } from "react"

type ProjectFile = "README.md" | "features.txt" | "stack.json" | "highlights.txt" | "structure.txt" | "links.txt"

type Project = {
  name: string
  slug: string
  period: string
  status: string
  icon: "calendar" | "mobile" | "store"
  summary: string
  stack: string[]
  highlights: string[]
  links: {
    live?: string
    github?: string
  }
  files: Record<ProjectFile, string>
}

type TerminalEntry = {
  command?: string
  cwd: string
  output: string[]
}

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
})

const projects: Project[] = [
  {
    name: "Daily Grid",
    slug: "daily-grid",
    period: "2026",
    status: "MVP in progress / Unfinished",
    icon: "calendar",
    summary:
      "A customizable visual planner that helps users organize their week while personalizing their workspace with stickers, notes, colors, and scrapbook-style layouts.",
    stack: ["React", "TypeScript", "Vite", "Tailwind CSS", "Zustand", "date-fns"],
    highlights: [
      "Built a modern React and TypeScript planning interface",
      "Designed weekly and daily planning views with task and event structure",
      "Planned scrapbook-style customization and AI-assisted weekly planning features",
    ],
    links: {
      github: "https://github.com/nguyena221/DailyGrid",
    },
    files: {
      "README.md": `# Daily Grid
MVP in progress / Unfinished · 2026 · React, TypeScript, Vite, Tailwind CSS, Zustand, date-fns

Daily Grid is a React and TypeScript planning app designed to make productivity feel more personal, visual, and motivating. The app helps users organize tasks, events, and daily responsibilities through weekly and daily planning views, while also allowing them to customize their workspace with aesthetic elements like stickers, sticky notes, color themes, and scrapbook-style decorations.

A major goal of the project is to move beyond a standard task manager by giving users a planner that feels curated to their own personality, habits, and visual style. Although the project is still in progress, I am building it as a flexible productivity tool that combines organization, creativity, and personal expression.`,
      "features.txt": `- Weekly and daily planning views
- Task and event management structure
- Completion tracking for productivity progress
- Customizable color themes and visual workspace elements
- Planned stickers, sticky notes, and scrapbook-style layout personalization
- Planned AI-assisted weekly planning features`,
      "stack.json": `{
  "frontend": ["React", "TypeScript", "Vite"],
  "styling": ["Tailwind CSS"],
  "state": ["Zustand"],
  "dates": ["date-fns"],
  "tools": ["Git", "GitHub", "VS Code"]
}`,
      "highlights.txt": `- Built a modern React + TypeScript planning interface
- Designed weekly and daily planning views
- Added task and event management structure
- Planned scrapbook-style customization with stickers, sticky notes, themes, and layout personalization
- Designed the app around user-specific aesthetics and personal productivity styles
- Included completion tracking for productivity progress
- Planned AI-assisted weekly planning features
- Used Zustand for lightweight state management
- Used date-fns for date handling and scheduling logic`,
      "structure.txt": `daily-grid/
├── src/
├── components/
├── store/
├── styles/
├── package.json
└── README.md`,
      "links.txt": `live: Coming soon
github: https://github.com/nguyena221/DailyGrid`,
    },
  },
  {
    name: "GameDate",
    slug: "gamedate",
    period: "Summer 2025",
    status: "Completed",
    icon: "mobile",
    summary:
      "A React Native dating app that helps people connect through personality games, lifestyle preferences, shared interests, and real-time chat.",
    stack: ["React Native", "Expo", "Firebase", "Firestore", "JavaScript"],
    highlights: [
      "Built authentication, profile customization, discovery, and messaging flows",
      "Created quizzes that unlock traits users can add to their profiles",
      "Turned a first full mobile app from concept into a working product",
    ],
    links: {
      github: "https://github.com/nguyena221/DatingApp/tree/main",
    },
    files: {
      "README.md": `# GameDate
Completed · Summer 2025 · React Native, Expo, Firebase

GameDate is a mobile dating app designed to help users connect through personality, lifestyle preferences, and shared interests rather than relying only on appearance. Users play personality games and quizzes to unlock traits, then add those traits to their profiles.

I built GameDate as a full-stack mobile app to explore how mobile design, user data, and backend services can work together to create a more thoughtful matching experience. The app includes authentication, profile customization, personality and lifestyle quizzes, discovery, real-time messaging, and custom matching features.`,
      "features.txt": `- User authentication and profile setup
- Personality and lifestyle quizzes
- Dynamic profiles based on quiz results and preferences
- Discover page for browsing potential matches
- Real-time messaging and chat rooms
- Custom profile widgets for books, movies, destinations, food spots, goals, hobbies, and more`,
      "stack.json": `{
  "frontend": ["React Native", "Expo", "JavaScript"],
  "navigation": ["React Navigation"],
  "ui": ["Expo Linear Gradient", "Gesture Handler", "Reanimated"],
  "backend": ["Firebase", "Firestore", "Firebase Authentication"],
  "tools": ["Git", "GitHub", "VS Code", "Expo Go", "Expo CLI"]
}`,
      "highlights.txt": `- Built a full mobile app for the first time
- Learned JavaScript while building the project
- Created personality games that unlock profile traits
- Built messaging, discovery, profile, and game dashboard pages
- Turned an app idea from concept into a working product`,
      "structure.txt": `DatingApp/
├── assets/
├── backend/
├── components/
├── contexts/
├── hook/
├── screens/
├── styles/
├── widgets/
├── App.js
├── app.json
├── index.js
├── package.json
└── package-lock.json`,
      "links.txt": `github: https://github.com/nguyena221/DatingApp/tree/main`,
    },
  },
  {
    name: "Pro Nails Website",
    slug: "pro-nails-website",
    period: "2024",
    status: "Live / Deployed",
    icon: "store",
    summary:
      "A responsive business website for Pro Nails in Waynesboro, Virginia, built to make services, hours, gallery photos, and location details easier to find.",
    stack: ["HTML", "CSS", "JavaScript", "Vercel"],
    highlights: [
      "Designed and launched a responsive multi-page website for a real local business",
      "Built service, gallery, contact, and location pages with an embedded map",
      "Improved the salon's online presence with clearer navigation and mobile layouts",
    ],
    links: {
      live: "https://pronails.vercel.app/index.html",
      github: "https://github.com/nguyena221/pronails",
    },
    files: {
      "README.md": `# Pro Nails Website
Live / Deployed · 2024 · HTML, CSS, JavaScript

Pro Nails Website is a responsive business website built for Pro Nails in Waynesboro, Virginia. It was created to modernize the salon's online presence and make service, location, and contact information easier for customers to access.

I helped design and develop pages for services, business information, contact details, image gallery, and location. The site focuses on usability, mobile responsiveness, and clear presentation of important customer information such as hours, social links, and directions.`,
      "features.txt": `- Responsive pages for service, gallery, contact, and location information
- Clear presentation of hours, services, social links, and directions
- Embedded Google Map for customer navigation
- Mobile-friendly layout for customers browsing on phones
- Cleaner, easier-to-navigate replacement for an outdated web presence`,
      "stack.json": `{
  "frontend": ["HTML", "CSS", "JavaScript"],
  "deployment": ["Vercel"],
  "tools": ["Git", "GitHub"]
}`,
      "highlights.txt": `- Designed and launched a responsive multi-page business website
- Built service, contact, gallery, and location sections
- Added an embedded Google Map for easier customer navigation
- Improved image handling and front-end performance
- Used Git/GitHub for version control
- Deployed the final website with Vercel
- Built for a real local business with real customer needs`,
      "structure.txt": `pro-nails-website/
├── index.html
├── services.html
├── gallery.html
├── contact.html
├── css/
├── js/
├── images/
└── README.md`,
      "links.txt": `live: https://pronails.vercel.app/index.html
github: https://github.com/nguyena221/pronails`,
    },
  },
]

const projectFiles: ProjectFile[] = [
  "README.md",
  "features.txt",
  "stack.json",
  "highlights.txt",
  "structure.txt",
  "links.txt",
]

const getPromptPath = (cwd: string) => (cwd === "projects" ? "~/projects" : `~/projects/${cwd}`)

const getProject = (slug: string) => projects.find((project) => project.slug === slug)

const iconMap = {
  calendar: CalendarDays,
  mobile: MonitorSmartphone,
  store: Store,
}

const carouselRepeatCount = 7
const carouselMiddleSet = Math.floor(carouselRepeatCount / 2)
const carouselMiddleStart = projects.length * carouselMiddleSet
const carouselLowerBoundary = projects.length * 2
const carouselUpperBoundary = projects.length * (carouselRepeatCount - 2)
const carouselProjects = Array.from({ length: carouselRepeatCount }).flatMap(() => projects)

const getHelpOutput = () => [
  "Commands:",
  "  ls                 list folders or files",
  "  cd <folder>        enter a project folder",
  "  cd ..              go back to ~/projects",
  "  pwd                show current path",
  "  cat <file>         print file contents",
  "  tree               show project structure",
  "  clear              clear terminal",
  "",
  "Try: ls",
]

const getCompletionCandidates = (cwd: string, input: string) => {
  const projectNames = projects.map((project) => `${project.slug}/`)
  const commands = ["help", "ls", "cd", "pwd", "cat", "tree", "clear"]
  const hasTrailingSpace = /\s$/.test(input)
  const parts = input.trimStart().split(/\s+/)
  const completingCommand = parts.length === 1 && !hasTrailingSpace
  const commandName = parts[0] ?? ""
  const currentToken = hasTrailingSpace ? "" : parts[parts.length - 1] ?? ""

  if (completingCommand) {
    return commands.filter((command) => command.startsWith(currentToken))
  }

  if (commandName === "cd") {
    const candidates = cwd === "projects" ? projectNames : ["../"]

    return candidates.filter((candidate) => candidate.startsWith(currentToken))
  }

  if (commandName === "cat") {
    if (cwd === "projects") {
      return []
    }

    return projectFiles.filter((file) => file.startsWith(currentToken))
  }

  return []
}

const applyCompletion = (input: string, completion: string) => {
  const hasTrailingSpace = /\s$/.test(input)
  const leadingWhitespace = input.match(/^\s*/)?.[0] ?? ""
  const parts = input.trimStart().split(/\s+/)

  if (parts.length === 1 && !hasTrailingSpace) {
    return `${leadingWhitespace}${completion} `
  }

  if (hasTrailingSpace) {
    return `${input}${completion}`
  }

  return `${leadingWhitespace}${parts.slice(0, -1).join(" ")} ${completion}`
}

export function Projects() {
  const ref = useRef(null)
  const outputRef = useRef<HTMLDivElement | null>(null)
  const inputRef = useRef<HTMLInputElement | null>(null)
  const carouselShellRef = useRef<HTMLDivElement | null>(null)
  const carouselRef = useRef<HTMLDivElement | null>(null)
  const carouselItemRefs = useRef<(HTMLButtonElement | null)[]>([])
  const carouselSettleTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [view, setView] = useState<"terminal" | "browse">("terminal")
  const [cwd, setCwd] = useState("projects")
  const [command, setCommand] = useState("")
  const [selectedSlug, setSelectedSlug] = useState(projects[0].slug)
  const [activeCarouselSlot, setActiveCarouselSlot] = useState(carouselMiddleStart)
  const [carouselCenter, setCarouselCenter] = useState(0)
  const [history, setHistory] = useState<TerminalEntry[]>([
    {
      cwd: "projects",
      output: [
        "Welcome to ~/projects.",
        "Prefer a quick visual overview? Click Browse in the top right.",
        "Type `help` for commands, or start with `ls`.",
      ],
    },
  ])

  useEffect(() => {
    if (!outputRef.current) {
      return
    }

    outputRef.current.scrollTop = outputRef.current.scrollHeight
  }, [history])

  useEffect(() => {
    if (view !== "browse" || !carouselRef.current) {
      return
    }

    const container = carouselRef.current
    const middleItem = carouselItemRefs.current[carouselMiddleStart]

    if (middleItem) {
      container.scrollLeft = middleItem.offsetLeft - container.clientWidth / 2 + middleItem.clientWidth / 2
    }
  }, [view])

  const selectedProject = getProject(selectedSlug) ?? projects[0]

  const getClosestCarouselIndex = () => {
    const container = carouselRef.current

    if (!container) {
      return activeCarouselSlot
    }

    const containerCenter = container.scrollLeft + container.clientWidth / 2
    let closestIndex = 0
    let closestDistance = Number.POSITIVE_INFINITY

    carouselItemRefs.current.forEach((item, index) => {
      if (!item) {
        return
      }

      const itemCenter = item.offsetLeft + item.clientWidth / 2
      const distance = Math.abs(containerCenter - itemCenter)

      if (distance < closestDistance) {
        closestDistance = distance
        closestIndex = index
      }
    })

    return closestIndex
  }

  const updateCarouselCenter = () => {
    const container = carouselRef.current

    if (!container) {
      return
    }

    let closestIndex = getClosestCarouselIndex()

    if (closestIndex < carouselLowerBoundary) {
      const currentItem = carouselItemRefs.current[closestIndex]
      const matchingMiddleItem = carouselItemRefs.current[(closestIndex % projects.length) + carouselMiddleStart]

      if (currentItem && matchingMiddleItem) {
        container.scrollLeft += matchingMiddleItem.offsetLeft - currentItem.offsetLeft
        closestIndex = (closestIndex % projects.length) + carouselMiddleStart
      }
    }

    if (closestIndex >= carouselUpperBoundary) {
      const currentItem = carouselItemRefs.current[closestIndex]
      const matchingMiddleItem = carouselItemRefs.current[(closestIndex % projects.length) + carouselMiddleStart]

      if (currentItem && matchingMiddleItem) {
        container.scrollLeft -= currentItem.offsetLeft - matchingMiddleItem.offsetLeft
        closestIndex = (closestIndex % projects.length) + carouselMiddleStart
      }
    }

    setCarouselCenter(container.scrollLeft + container.clientWidth / 2)

    const project = carouselProjects[closestIndex]

    setActiveCarouselSlot(closestIndex)

    if (project) {
      setSelectedSlug(project.slug)
    }
  }

  const centerCarouselItem = (index: number, behavior: ScrollBehavior = "smooth") => {
    const container = carouselRef.current
    const item = carouselItemRefs.current[index]

    if (!container || !item) {
      return
    }

    container.scrollTo({
      left: item.offsetLeft - container.clientWidth / 2 + item.clientWidth / 2,
      behavior,
    })

    setActiveCarouselSlot(index)
    setSelectedSlug(carouselProjects[index]?.slug ?? selectedSlug)
  }

  const settleCarouselToNearestItem = () => {
    const closestIndex = getClosestCarouselIndex()
    centerCarouselItem(closestIndex)
  }

  const handleCarouselWheel = (event: WheelEvent) => {
    const container = carouselRef.current

    if (!container) {
      return
    }

    event.preventDefault()
    event.stopPropagation()

    const scrollAmount = Math.abs(event.deltaX) > Math.abs(event.deltaY) ? event.deltaX : event.deltaY
    container.scrollBy({
      left: -scrollAmount * 0.72,
      behavior: "smooth",
    })
    window.requestAnimationFrame(updateCarouselCenter)

    if (carouselSettleTimer.current) {
      clearTimeout(carouselSettleTimer.current)
    }

    carouselSettleTimer.current = setTimeout(settleCarouselToNearestItem, 180)
  }

  useEffect(() => {
    if (view !== "browse" || !carouselShellRef.current) {
      return
    }

    const container = carouselShellRef.current

    container.addEventListener("wheel", handleCarouselWheel, { passive: false })

    return () => {
      if (carouselSettleTimer.current) {
        clearTimeout(carouselSettleTimer.current)
      }

      container.removeEventListener("wheel", handleCarouselWheel)
    }
  }, [view])

  const runCommand = (rawCommand: string) => {
    const trimmedCommand = rawCommand.trim()
    const [baseCommand, ...args] = trimmedCommand.split(/\s+/)
    const currentProject = cwd === "projects" ? null : getProject(cwd)

    if (!trimmedCommand) {
      return { nextCwd: cwd, output: [] }
    }

    if (baseCommand === "clear") {
      return { nextCwd: cwd, output: [], clear: true }
    }

    if (baseCommand === "help") {
      return { nextCwd: cwd, output: getHelpOutput() }
    }

    if (baseCommand === "pwd") {
      return { nextCwd: cwd, output: [getPromptPath(cwd)] }
    }

    if (baseCommand === "ls") {
      if (cwd === "projects") {
        return { nextCwd: cwd, output: [projects.map((project) => `${project.slug}/`).join("  ")] }
      }

      return { nextCwd: cwd, output: [projectFiles.join("  ")] }
    }

    if (baseCommand === "cd") {
      const target = args[0]

      if (!target) {
        return { nextCwd: "projects", output: [] }
      }

      if (target === ".." || target === "../") {
        return { nextCwd: "projects", output: [] }
      }

      const normalizedTarget = target.replace(/\/$/, "")
      const project = getProject(normalizedTarget)

      if (!project) {
        return { nextCwd: cwd, output: [`cd: no such folder: ${target}`] }
      }

      return { nextCwd: project.slug, output: [] }
    }

    if (baseCommand === "cat") {
      const fileName = args[0] as ProjectFile | undefined

      if (!currentProject) {
        return { nextCwd: cwd, output: ["cat: choose a project folder first with `cd <folder>`"] }
      }

      if (!fileName || !projectFiles.includes(fileName)) {
        return { nextCwd: cwd, output: [`cat: no such file: ${fileName ?? ""}`] }
      }

      return { nextCwd: cwd, output: currentProject.files[fileName].split("\n") }
    }

    if (baseCommand === "tree") {
      if (!currentProject) {
        return { nextCwd: cwd, output: projects.map((project) => `${project.slug}/`) }
      }

      return { nextCwd: cwd, output: currentProject.files["structure.txt"].split("\n") }
    }

    return { nextCwd: cwd, output: [`command not found: ${baseCommand}`, "Type `help` for available commands."] }
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const submittedCommand = command
    const result = runCommand(submittedCommand)

    if (result.clear) {
      setHistory([])
    } else {
      setHistory((currentHistory) => [
        ...currentHistory,
        {
          command: submittedCommand,
          cwd,
          output: result.output,
        },
      ])
    }

    setCwd(result.nextCwd)
    setCommand("")
  }

  const handleCommandKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key !== "Tab") {
      return
    }

    event.preventDefault()

    const candidates = getCompletionCandidates(cwd, command)

    if (candidates.length === 0) {
      return
    }

    if (candidates.length === 1) {
      setCommand(applyCompletion(command, candidates[0]))
      return
    }

    setHistory((currentHistory) => [
      ...currentHistory,
      {
        command,
        cwd,
        output: candidates,
      },
    ])
  }

  return (
    <section
      id="projects"
      ref={ref}
      className={`relative flex min-h-[100svh] items-center justify-center px-6 py-16 transition-colors duration-500 md:px-12 lg:px-24 ${
        view === "browse" ? "overflow-x-hidden bg-[#fbf6ea]" : "overflow-hidden bg-[#a8462d] lg:h-[100svh]"
      }`}
    >
      {view === "terminal" ? (
        <>
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_8%_92%,#fffaf0_0%,#f4ded0_18%,#c8836b_48%,#a8462d_100%)]" />
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(115deg,rgba(255,250,240,0.62)_0%,rgba(255,250,240,0.16)_32%,rgba(116,36,20,0.22)_100%)]" />
        </>
      ) : (
        <div className="pointer-events-none absolute inset-0 bg-[#fbf6ea]" />
      )}

      <motion.div
        className="relative flex w-full max-w-6xl flex-col items-center"
        initial={{ opacity: 0, y: 34, scale: 0.985 }}
        animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        {view === "terminal" ? (
          <div
            className="flex h-[min(68vh,585px)] w-[min(78vw,988px)] flex-col overflow-hidden rounded-[10px] border border-white/24 bg-[#b98575]/58 shadow-[0_2px_4px_rgba(47,31,26,0.24),inset_0_1px_0_rgba(255,255,255,0.28)] backdrop-blur-[2px]"
            aria-label="Projects terminal"
            onClick={() => inputRef.current?.focus()}
          >
            <div className="flex h-10 shrink-0 items-center gap-2 border-b border-white/16 bg-[#6d2b20]/26 py-0 pl-4 pr-1.5">
              <span className="h-3 w-3 rounded-full bg-[#d46a5f]" />
              <span className="h-3 w-3 rounded-full bg-[#e8bb67]" />
              <span className="h-3 w-3 rounded-full bg-[#9ebf86]" />
              <span className="ml-3 min-w-0 flex-1 truncate text-xs text-white/58">
                annie@portfolio: {getPromptPath(cwd)}
              </span>
              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation()
                  setView("browse")
                }}
                className="group flex h-7 w-7 shrink-0 items-center justify-center overflow-hidden rounded-full border border-white/18 bg-white/12 text-xs font-medium text-white/78 transition-all duration-300 hover:w-[5.7rem] hover:justify-start hover:bg-white/20 hover:px-3 hover:text-white focus-visible:w-[5.7rem] focus-visible:justify-start focus-visible:px-3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/70"
                aria-label="Switch to browse view"
              >
                <Grid2X2 className="size-3.5 shrink-0" />
                <span className="ml-0 max-w-0 overflow-hidden whitespace-nowrap opacity-0 transition-all duration-300 group-hover:ml-1.5 group-hover:max-w-16 group-hover:opacity-100 group-focus-visible:ml-1.5 group-focus-visible:max-w-16 group-focus-visible:opacity-100">
                  Browse
                </span>
              </button>
            </div>

            <div
              ref={outputRef}
              className="min-h-0 flex-1 overflow-y-auto p-5 font-mono text-[0.72rem] leading-relaxed text-[#fff7e8] md:p-7 md:text-sm"
            >
              {history.map((entry, index) => (
                <div key={`${entry.cwd}-${entry.command ?? "intro"}-${index}`} className={index ? "mt-4" : ""}>
                  {entry.command !== undefined && (
                    <p>
                      <span className="text-[#f1d18b]">annie@portfolio</span>
                      <span className="text-white/48">:</span>
                      <span className="text-[#bfe3a4]">{getPromptPath(entry.cwd)}</span>
                      <span className="text-white/48"> % </span>
                      {entry.command}
                    </p>
                  )}
                  {entry.output.length > 0 && (
                    <pre className="mt-1 whitespace-pre-wrap break-words text-white/88">{entry.output.join("\n")}</pre>
                  )}
                </div>
              ))}
            </div>

            <form
              onSubmit={handleSubmit}
              className="flex shrink-0 items-center border-t border-white/14 bg-black/12 px-5 py-3 font-mono text-[0.72rem] text-[#fff7e8] md:px-7 md:text-sm"
            >
              <span className="text-[#f1d18b]">annie@portfolio</span>
              <span className="text-white/48">:</span>
              <span className="text-[#bfe3a4]">{getPromptPath(cwd)}</span>
              <span className="text-white/48"> % </span>
              <input
                ref={inputRef}
                value={command}
                onChange={(event) => setCommand(event.target.value)}
                onKeyDown={handleCommandKeyDown}
                className="ml-1 min-w-0 flex-1 bg-transparent text-white outline-none placeholder:text-white/36"
                placeholder="type a command"
                spellCheck={false}
                autoComplete="off"
                aria-label="Terminal command"
              />
            </form>
          </div>
        ) : (
          <div className="w-full">
            <div className="mb-5 flex items-end justify-center gap-3">
              <h2
                className={`${instrumentSerif.className} scale-y-[0.82] text-center text-6xl font-bold italic leading-[0.9] tracking-[0.05em] text-[#626992] md:text-7xl`}
                style={{
                  textShadow:
                    "0.014em 0 0 currentColor, -0.014em 0 0 currentColor, 0 0.006em 0 currentColor",
                }}
              >
                PROJECT
              </h2>
              <button
                type="button"
                onClick={() => setView("terminal")}
                className="group mb-1 flex h-8 w-8 items-center justify-center overflow-hidden rounded-full border border-[#626992]/20 bg-white/58 text-xs font-semibold text-[#626992] shadow-[0_8px_20px_rgba(83,72,52,0.12)] backdrop-blur transition-all duration-300 hover:w-[6.4rem] hover:justify-start hover:bg-white/78 hover:px-3 focus-visible:w-[6.4rem] focus-visible:justify-start focus-visible:px-3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#626992]"
                aria-label="Switch to terminal view"
              >
                <Terminal className="size-3.5 shrink-0" />
                <span className="ml-0 max-w-0 overflow-hidden whitespace-nowrap opacity-0 transition-all duration-300 group-hover:ml-1.5 group-hover:max-w-20 group-hover:opacity-100 group-focus-visible:ml-1.5 group-focus-visible:max-w-20 group-focus-visible:opacity-100">
                  Terminal
                </span>
              </button>
            </div>

            <div
              ref={carouselShellRef}
              className="relative mx-auto flex min-h-[205px] w-full max-w-[760px] flex-col justify-center overflow-hidden rounded-[999px] bg-[linear-gradient(180deg,#86aebe_0%,#e9be63_100%)] shadow-[inset_0_1px_0_rgba(255,255,255,0.42),0_22px_60px_rgba(83,72,52,0.18)] md:min-h-[260px]"
            >
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(255,255,255,0.18),transparent_38%)]" />
              <div
                ref={carouselRef}
                onScroll={updateCarouselCenter}
                className="absolute inset-y-0 left-5 right-5 z-10 flex items-center gap-3 overflow-x-auto overflow-y-hidden rounded-[inherit] overscroll-contain px-[21%] [scrollbar-width:none] md:left-8 md:right-8 md:gap-5 md:px-[25%] [&::-webkit-scrollbar]:hidden"
                aria-label="Browse projects"
              >
                {carouselProjects.map((project, index) => {
                  const Icon = iconMap[project.icon]
                  const item = carouselItemRefs.current[index]
                  const itemCenter = item ? item.offsetLeft + item.clientWidth / 2 : 0
                  const distanceFromCenter = item ? Math.abs(carouselCenter - itemCenter) : Number.POSITIVE_INFINITY
                  const circleSize = distanceFromCenter < 78 ? 160 : distanceFromCenter < 210 ? 110 : 62
                  const iconSize = distanceFromCenter < 78 ? 68 : distanceFromCenter < 210 ? 48 : 28

                  return (
                    <button
                      key={`${project.slug}-${index}`}
                      ref={(node) => {
                        carouselItemRefs.current[index] = node
                      }}
                      type="button"
                      onClick={() => centerCarouselItem(index)}
                      className="grid shrink-0 place-items-center rounded-full border border-white/68 bg-white/10 text-white/82 shadow-[inset_0_1px_0_rgba(255,255,255,0.46)] transition-[width,height,background-color] duration-200 ease-out hover:bg-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#626992]"
                      style={{ width: circleSize, height: circleSize }}
                      aria-label={`View ${project.name}`}
                    >
                      <Icon style={{ width: iconSize, height: iconSize }} strokeWidth={1.5} />
                    </button>
                  )
                })}
              </div>
            </div>

            <motion.div
              key={selectedProject.slug}
              className="mx-auto mt-7 max-w-4xl rounded-[8px] border border-[#d5bd83]/58 bg-[#fffaf0]/82 p-5 text-[#4f5683] shadow-[0_16px_42px_rgba(83,72,52,0.13)] backdrop-blur md:p-6"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
            >
              <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                <div>
                  <div className="mb-2 flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#b87461]">
                    <span>{selectedProject.status}</span>
                    <span aria-hidden="true">/</span>
                    <span>{selectedProject.period}</span>
                  </div>
                  <h3 className="text-2xl font-black tracking-normal text-[#626992] md:text-3xl">
                    {selectedProject.name}
                  </h3>
                  <p className="mt-3 max-w-2xl text-sm leading-6 md:text-base">{selectedProject.summary}</p>
                </div>

                <div className="flex shrink-0 gap-2">
                  {selectedProject.links.github && (
                    <a
                      href={selectedProject.links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="grid size-10 place-items-center rounded-full bg-[#626992] text-white transition hover:bg-[#4f5683]"
                      aria-label={`${selectedProject.name} GitHub`}
                    >
                      <Github className="size-4" />
                    </a>
                  )}
                  {selectedProject.links.live && (
                    <a
                      href={selectedProject.links.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="grid size-10 place-items-center rounded-full bg-[#b87461] text-white transition hover:bg-[#a26353]"
                      aria-label={`${selectedProject.name} live site`}
                    >
                      <ExternalLink className="size-4" />
                    </a>
                  )}
                </div>
              </div>

              <div className="mt-5 flex flex-wrap gap-2">
                {selectedProject.stack.map((item) => (
                  <span key={item} className="rounded-full bg-[#e9bf64]/28 px-3 py-1 text-xs font-semibold text-[#626992]">
                    {item}
                  </span>
                ))}
              </div>

              <div className="mt-5 grid gap-3 md:grid-cols-3">
                {selectedProject.highlights.map((highlight) => (
                  <div key={highlight} className="flex gap-2 text-sm leading-5 text-[#4f5683]">
                    <Sparkles className="mt-0.5 size-4 shrink-0 text-[#b87461]" />
                    <span>{highlight}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        )}
      </motion.div>
    </section>
  )
}
