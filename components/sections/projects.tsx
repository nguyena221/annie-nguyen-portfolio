"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { ExternalLink, Github, Sparkles } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const projects = [
  {
    title: "Pro Nails Website",
    description:
      "A charming business website for a local nail salon featuring service menus, gallery showcases, and easy contact options. Built with love and attention to detail.",
    tech: ["HTML", "CSS", "JavaScript"],
    emoji: "💅",
    color: "from-pink-100 to-rose-100",
    borderColor: "hover:border-pink-300",
    links: {
      live: "#",
    },
  },
  {
    title: "GameDate",
    description:
      "A fun dating app that connects gamers through their favorite games. Features real-time chat, smart matching, and Firebase-powered authentication.",
    tech: ["React Native", "Firebase", "Firestore", "Expo"],
    emoji: "🎮",
    color: "from-orange-100 to-amber-100",
    borderColor: "hover:border-orange-300",
    links: {
      github: "#",
    },
  },
  {
    title: "Travel Planner",
    description:
      "Plan your dream trips with this intuitive app. Organize transportation, hotels, activities, and budget all in one beautiful interface.",
    tech: ["React", "Vite", "TypeScript", "Tailwind"],
    emoji: "✈️",
    color: "from-sky-100 to-cyan-100",
    borderColor: "hover:border-sky-300",
    links: {
      github: "#",
      live: "#",
    },
  },
  {
    title: "AI Visual Shopping",
    description:
      "Snap a photo, find the product. This innovative app uses image recognition to identify items and suggest where to buy them.",
    tech: ["React", "Spring Boot", "Java", "ML"],
    emoji: "🛍️",
    color: "from-emerald-100 to-teal-100",
    borderColor: "hover:border-emerald-300",
    links: {
      github: "#",
    },
  },
];

function ProjectCard({
  project,
  index,
}: {
  project: (typeof projects)[0];
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Card className={`group h-full overflow-hidden border-2 border-border bg-card transition-all duration-300 ${project.borderColor} hover:-translate-y-1 hover:shadow-xl`}>
        <CardContent className="p-0">
          {/* Header with gradient */}
          <div
            className={`flex items-center justify-between bg-gradient-to-br ${project.color} p-5 lg:p-4`}
          >
            <span className="text-4xl lg:text-3xl">{project.emoji}</span>
            <div className="flex gap-2">
              {project.links.github && (
                <a
                  href={project.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 bg-white/80 backdrop-blur rounded-full text-muted-foreground hover:text-foreground hover:bg-white transition-all shadow-sm"
                  aria-label="View GitHub repository"
                >
                  <Github className="w-4 h-4" />
                </a>
              )}
              {project.links.live && (
                <a
                  href={project.links.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 bg-white/80 backdrop-blur rounded-full text-muted-foreground hover:text-foreground hover:bg-white transition-all shadow-sm"
                  aria-label="View live site"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>

          {/* Content */}
          <div className="p-5 lg:p-4">
            <h3 className="mb-2 text-lg font-semibold transition-colors group-hover:text-coral lg:text-base">
              {project.title}
            </h3>
            <p className="mb-4 text-sm leading-relaxed text-muted-foreground lg:mb-3 lg:text-[0.8rem] lg:leading-snug">
              {project.description}
            </p>

            {/* Tech stack */}
            <div className="flex flex-wrap gap-1.5">
              {project.tech.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full bg-secondary px-2.5 py-1 text-xs font-medium text-secondary-foreground lg:px-2 lg:py-0.5 lg:text-[0.68rem]"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="projects"
      className="relative min-h-[100svh] overflow-hidden bg-black px-6 py-20 text-white md:px-12 md:py-24 lg:h-[100svh] lg:px-24 lg:py-16"
      ref={ref}
    >
      <div className="mx-auto flex min-h-[calc(100svh-10rem)] max-w-6xl flex-col justify-center lg:h-full lg:min-h-0">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="mb-3 flex items-center gap-3">
            <Sparkles className="w-5 h-5 text-[#e8bb67]" />
            <span className="text-sm font-medium tracking-wide text-[#e8bb67]">MY WORK</span>
          </div>
          
          <h2 className="mb-3 text-3xl font-bold md:text-4xl lg:text-[clamp(2rem,5vh,2.5rem)]">Featured Projects</h2>
          <p className="mb-8 max-w-2xl text-base text-white/70 md:text-lg lg:mb-6 lg:text-[clamp(0.9rem,2vh,1.05rem)]">
            A collection of things I&apos;ve built with care, from client work to 
            personal passion projects.
          </p>
        </motion.div>

        <div className="grid gap-4 md:grid-cols-2 lg:gap-4">
          {projects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
