"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Palette } from "lucide-react";

const skillCategories = [
  {
    title: "Frontend",
    color: "bg-coral/10 border-coral/20",
    dotColor: "bg-coral",
    skills: [
      "React",
      "Next.js",
      "TypeScript",
      "JavaScript",
      "HTML5",
      "CSS3",
      "Tailwind CSS",
      "Vite",
    ],
  },
  {
    title: "Backend",
    color: "bg-sage/20 border-sage/30",
    dotColor: "bg-sage",
    skills: [
      "Node.js",
      "Express",
      "Spring Boot",
      "Java",
      "Python",
      "REST APIs",
    ],
  },
  {
    title: "Mobile",
    color: "bg-lavender/20 border-lavender/30",
    dotColor: "bg-lavender",
    skills: ["React Native", "Expo", "iOS", "Android"],
  },
  {
    title: "Databases",
    color: "bg-peach/30 border-peach/40",
    dotColor: "bg-peach",
    skills: ["Firebase", "Firestore", "PostgreSQL", "MongoDB", "MySQL"],
  },
  {
    title: "Tools",
    color: "bg-sky/20 border-sky/30",
    dotColor: "bg-sky",
    skills: ["Git", "GitHub", "VS Code", "Figma", "Postman", "Docker"],
  },
];

export function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="skills"
      className="py-24 md:py-32 px-6 md:px-12 lg:px-24"
      ref={ref}
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-3 mb-4">
            <Palette className="w-5 h-5 text-coral" />
            <span className="text-coral font-medium tracking-wide text-sm">SKILLS</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold mb-12">
            My toolkit
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
              className={`p-6 rounded-2xl border-2 ${category.color}`}
            >
              <div className="flex items-center gap-2 mb-4">
                <div className={`w-2 h-2 rounded-full ${category.dotColor}`} />
                <h3 className="text-sm font-semibold tracking-wide">
                  {category.title}
                </h3>
              </div>
              <ul className="space-y-2">
                {category.skills.map((skill, skillIndex) => (
                  <motion.li
                    key={skill}
                    initial={{ opacity: 0, x: -10 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{
                      duration: 0.3,
                      delay: categoryIndex * 0.1 + skillIndex * 0.05,
                    }}
                    className="text-muted-foreground text-sm hover:text-foreground transition-colors cursor-default"
                  >
                    {skill}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
