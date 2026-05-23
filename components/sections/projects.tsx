"use client"

import { motion, useInView } from "framer-motion"
import { FormEvent, KeyboardEvent, useEffect, useRef, useState } from "react"

type ProjectFile = "README.md" | "features.txt" | "stack.json" | "highlights.txt" | "structure.txt" | "links.txt"

type Project = {
  name: string
  slug: string
  files: Record<ProjectFile, string>
}

type TerminalEntry = {
  command?: string
  cwd: string
  output: string[]
}

const projects: Project[] = [
  {
    name: "GameDate",
    slug: "gamedate",
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
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [cwd, setCwd] = useState("projects")
  const [command, setCommand] = useState("")
  const [history, setHistory] = useState<TerminalEntry[]>([
    {
      cwd: "projects",
      output: [
        "Welcome to ~/projects.",
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
      className="relative flex min-h-[100svh] items-center justify-center overflow-hidden bg-[#a8462d] px-6 py-16 md:px-12 lg:h-[100svh] lg:px-24"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_8%_92%,#fffaf0_0%,#f4ded0_18%,#c8836b_48%,#a8462d_100%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(115deg,rgba(255,250,240,0.62)_0%,rgba(255,250,240,0.16)_32%,rgba(116,36,20,0.22)_100%)]" />

      {/*
        Later: when a user enters a project, shrink/slide the terminal left and
        slide a richer project description panel in from the right.
      */}
      <motion.div
        className="relative flex h-[min(68vh,585px)] w-[min(78vw,988px)] flex-col overflow-hidden rounded-[10px] border border-white/24 bg-[#b98575]/58 shadow-[0_2px_4px_rgba(47,31,26,0.24),inset_0_1px_0_rgba(255,255,255,0.28)] backdrop-blur-[2px]"
        initial={{ opacity: 0, y: 34, scale: 0.985 }}
        animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
        transition={{ duration: 0.7, ease: "easeOut" }}
        aria-label="Projects terminal"
        onClick={() => inputRef.current?.focus()}
      >
        <div className="flex h-10 shrink-0 items-center gap-2 border-b border-white/16 bg-[#6d2b20]/26 px-4">
          <span className="h-3 w-3 rounded-full bg-[#d46a5f]" />
          <span className="h-3 w-3 rounded-full bg-[#e8bb67]" />
          <span className="h-3 w-3 rounded-full bg-[#9ebf86]" />
          <span className="ml-3 text-xs text-white/58">annie@portfolio: {getPromptPath(cwd)}</span>
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
      </motion.div>
    </section>
  )
}
