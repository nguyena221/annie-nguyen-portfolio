"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { ExternalLink } from "lucide-react";

const experiences = [
  {
    title: "Software Engineering Intern",
    company: "Tech Company",
    companyUrl: "#",
    date: "Summer 2024",
    description: [
      "Developed and maintained full-stack web applications using React, Node.js, and PostgreSQL",
      "Collaborated with cross-functional teams to design and implement new features",
      "Participated in code reviews and contributed to improving development processes",
      "Built RESTful APIs and integrated third-party services to enhance application functionality",
    ],
    tech: ["React", "Node.js", "PostgreSQL", "REST APIs"],
  },
  {
    title: "Web Developer Volunteer",
    company: "Women of Connections",
    companyUrl: "#",
    date: "2023 — Present",
    description: [
      "Design and maintain the organization&apos;s web presence to support their mission of empowering women in tech",
      "Implement responsive, accessible web pages following modern best practices",
      "Collaborate with stakeholders to translate requirements into functional features",
      "Mentor junior volunteers in web development fundamentals",
    ],
    tech: ["HTML", "CSS", "JavaScript", "WordPress"],
  },
];

export function Experience() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="experience"
      className="py-24 md:py-32 px-6 md:px-12 lg:px-24 bg-secondary/30"
      ref={ref}
    >
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-4 mb-12">
            <h2 className="text-2xl md:text-3xl font-bold">Experience</h2>
            <div className="h-px bg-border flex-1 max-w-xs" />
          </div>
        </motion.div>

        <div className="space-y-12">
          {experiences.map((experience, index) => (
            <motion.div
              key={experience.title + experience.company}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="relative pl-8 border-l-2 border-border hover:border-primary/50 transition-colors"
            >
              {/* Timeline dot */}
              <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-background border-2 border-primary" />

              <div className="mb-1">
                <span className="text-sm font-mono text-primary tracking-wider">
                  {experience.date}
                </span>
              </div>

              <h3 className="text-xl font-semibold mb-1">{experience.title}</h3>

              <a
                href={experience.companyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-primary hover:underline mb-4 group"
              >
                {experience.company}
                <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>

              <ul className="space-y-2 mb-4">
                {experience.description.map((item, i) => (
                  <li
                    key={i}
                    className="text-muted-foreground text-sm leading-relaxed flex gap-3"
                  >
                    <span className="text-primary mt-1.5 flex-shrink-0">▹</span>
                    <span dangerouslySetInnerHTML={{ __html: item.replace(/&apos;/g, "'") }} />
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-2">
                {experience.tech.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 bg-secondary text-secondary-foreground text-xs font-mono rounded-full"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
