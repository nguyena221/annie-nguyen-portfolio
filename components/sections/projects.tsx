"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { ExternalLink, Github, Globe, Smartphone, Plane, ShoppingBag } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const projects = [
  {
    title: "Pro Nails Website",
    description:
      "A professional business website for a local nail salon featuring service menus, booking information, gallery showcases, and contact details. Built with responsive design principles to ensure a seamless experience across all devices.",
    tech: ["HTML", "CSS", "JavaScript"],
    icon: Globe,
    color: "from-rose-500/20 to-pink-500/20",
    links: {
      live: "#",
    },
  },
  {
    title: "GameDate",
    description:
      "A React Native mobile dating application that connects users through shared gaming interests. Features include Firebase Authentication, Firestore database for real-time data, chat functionality, and intelligent user matching algorithms.",
    tech: ["React Native", "Firebase", "Firestore", "Expo"],
    icon: Smartphone,
    color: "from-orange-500/20 to-amber-500/20",
    links: {
      github: "#",
    },
  },
  {
    title: "Travel Planner App",
    description:
      "A comprehensive trip planning application built with React and Vite. Users can organize transportation, accommodation, activities, and track budgets all in one place. Features intuitive drag-and-drop itinerary management.",
    tech: ["React", "Vite", "TypeScript", "Tailwind CSS"],
    icon: Plane,
    color: "from-sky-500/20 to-cyan-500/20",
    links: {
      github: "#",
      live: "#",
    },
  },
  {
    title: "AI Visual Shopping App",
    description:
      "An innovative e-commerce application that uses image recognition to identify products from photos. Users can snap a picture and receive matching product recommendations. Combines a React frontend with a Spring Boot backend.",
    tech: ["React", "Spring Boot", "Java", "Machine Learning"],
    icon: ShoppingBag,
    color: "from-emerald-500/20 to-teal-500/20",
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
  const Icon = project.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Card className="group bg-card border-border hover:border-primary/50 transition-all duration-300 overflow-hidden h-full">
        <CardContent className="p-0">
          {/* Header with gradient */}
          <div
            className={`bg-gradient-to-br ${project.color} p-6 flex items-center justify-between`}
          >
            <div className="p-3 bg-background/80 backdrop-blur rounded-lg">
              <Icon className="w-6 h-6 text-primary" />
            </div>
            <div className="flex gap-3">
              {project.links.github && (
                <a
                  href={project.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-background/80 backdrop-blur rounded-lg text-muted-foreground hover:text-primary transition-colors"
                  aria-label="View GitHub repository"
                >
                  <Github className="w-5 h-5" />
                </a>
              )}
              {project.links.live && (
                <a
                  href={project.links.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-background/80 backdrop-blur rounded-lg text-muted-foreground hover:text-primary transition-colors"
                  aria-label="View live site"
                >
                  <ExternalLink className="w-5 h-5" />
                </a>
              )}
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">
              {project.title}
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed mb-4">
              {project.description}
            </p>

            {/* Tech stack */}
            <div className="flex flex-wrap gap-2">
              {project.tech.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 bg-secondary text-secondary-foreground text-xs font-mono rounded-full"
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
      className="py-24 md:py-32 px-6 md:px-12 lg:px-24 bg-secondary/30"
      ref={ref}
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-4 mb-4">
            <h2 className="text-2xl md:text-3xl font-bold">Featured Projects</h2>
            <div className="h-px bg-border flex-1 max-w-xs" />
          </div>
          <p className="text-muted-foreground mb-12 max-w-2xl">
            A selection of projects I&apos;ve built, from client work to
            personal explorations in mobile development and machine learning.
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
