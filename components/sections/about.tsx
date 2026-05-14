"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

export function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const highlights = [
    "Software Engineering",
    "Web Development",
    "Firebase",
    "REST APIs",
    "Data Science",
  ];

  return (
    <section
      id="about"
      className="py-24 md:py-32 px-6 md:px-12 lg:px-24"
      ref={ref}
    >
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-4 mb-12">
            <h2 className="text-2xl md:text-3xl font-bold">About</h2>
            <div className="h-px bg-border flex-1 max-w-xs" />
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            <div className="md:col-span-2 space-y-6">
              <p className="text-muted-foreground text-lg leading-relaxed">
                I&apos;m a third-year Computer Science student at the University
                of Virginia with a passion for building digital products that
                make a difference. My journey into tech started with curiosity
                about how websites work, and it has evolved into a deep
                appreciation for the entire software development lifecycle.
              </p>

              <p className="text-muted-foreground text-lg leading-relaxed">
                I specialize in{" "}
                <span className="text-foreground">full-stack development</span>,
                with particular expertise in React ecosystems, mobile
                development with React Native, and backend services using
                Firebase and RESTful architectures.
              </p>

              <p className="text-muted-foreground text-lg leading-relaxed">
                Beyond coding, I&apos;m drawn to data science and machine
                learning, exploring how data-driven insights can enhance user
                experiences. I believe great software sits at the intersection
                of technical excellence and human-centered design.
              </p>
            </div>

            <div>
              <h3 className="text-sm font-mono text-primary mb-4 tracking-wider">
                FOCUS AREAS
              </h3>
              <ul className="space-y-3">
                {highlights.map((item, index) => (
                  <motion.li
                    key={item}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
                    className="flex items-center gap-3 text-muted-foreground"
                  >
                    <span className="w-2 h-2 bg-primary rounded-full" />
                    {item}
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
