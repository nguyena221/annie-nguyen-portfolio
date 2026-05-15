"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Briefcase, ExternalLink } from "lucide-react";

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
      "Built RESTful APIs and integrated third-party services",
    ],
    tech: ["React", "Node.js", "PostgreSQL", "REST APIs"],
    color: "border-coral/30 hover:border-coral",
  },
  {
    title: "Web Developer Volunteer",
    company: "Women of Connections",
    companyUrl: "#",
    date: "2023 — Present",
    description: [
      "Design and maintain the organization's web presence to empower women in tech",
      "Implement responsive, accessible web pages following modern best practices",
      "Collaborate with stakeholders to translate requirements into features",
      "Mentor junior volunteers in web development fundamentals",
    ],
    tech: ["HTML", "CSS", "JavaScript", "WordPress"],
    color: "border-sage/30 hover:border-sage",
  },
];

export function Experience() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="experience"
      className="py-24 md:py-32 px-6 md:px-12 lg:px-24 bg-gradient-to-b from-background via-lavender/5 to-background"
      ref={ref}
    >
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-3 mb-4">
            <Briefcase className="w-5 h-5 text-coral" />
            <span className="text-coral font-medium tracking-wide text-sm">EXPERIENCE</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold mb-12">
            Where I&apos;ve worked
          </h2>
        </motion.div>

        <div className="space-y-8">
          {experiences.map((experience, index) => (
            <motion.div
              key={experience.title + experience.company}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className={`relative p-6 md:p-8 bg-card rounded-2xl border-2 ${experience.color} transition-all duration-300 hover:shadow-lg`}
            >
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                <div>
                  <h3 className="text-xl font-semibold">{experience.title}</h3>
                  <a
                    href={experience.companyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-coral hover:underline group mt-1"
                  >
                    {experience.company}
                    <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                </div>
                <span className="text-sm font-medium text-muted-foreground bg-secondary px-4 py-1.5 rounded-full w-fit">
                  {experience.date}
                </span>
              </div>

              <ul className="space-y-2 mb-6">
                {experience.description.map((item, i) => (
                  <li
                    key={i}
                    className="text-muted-foreground text-sm leading-relaxed flex gap-3"
                  >
                    <span className="text-coral mt-0.5 flex-shrink-0">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-2">
                {experience.tech.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1.5 bg-secondary text-secondary-foreground text-xs font-medium rounded-full"
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
