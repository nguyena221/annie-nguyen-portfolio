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
      <Card className={`group bg-card border-2 border-border ${project.borderColor} transition-all duration-300 overflow-hidden h-full hover:shadow-xl hover:-translate-y-1`}>
        <CardContent className="p-0">
          {/* Header with gradient */}
          <div
            className={`bg-gradient-to-br ${project.color} p-8 flex items-center justify-between`}
          >
            <span className="text-5xl">{project.emoji}</span>
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
          <div className="p-6">
            <h3 className="text-xl font-semibold mb-3 group-hover:text-coral transition-colors">
              {project.title}
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed mb-5">
              {project.description}
            </p>

            {/* Tech stack */}
            <div className="flex flex-wrap gap-2">
              {project.tech.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1.5 bg-secondary text-secondary-foreground text-xs font-medium rounded-full"
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
      className="py-24 md:py-32 px-6 md:px-12 lg:px-24 bg-gradient-to-b from-background via-peach/5 to-background"
      ref={ref}
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-3 mb-4">
            <Sparkles className="w-5 h-5 text-coral" />
            <span className="text-coral font-medium tracking-wide text-sm">MY WORK</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Projects</h2>
          <p className="text-muted-foreground mb-12 max-w-2xl text-lg">
            A collection of things I&apos;ve built with care, from client work to 
            personal passion projects.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
