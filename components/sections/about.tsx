"use client";

import { motion } from "framer-motion";
import { Heart, Code, Database, BarChart, Zap } from "lucide-react";

export function About() {
  const highlights = [
    { name: "Software Engineering", icon: Code, color: "bg-coral/10 text-coral" },
    { name: "Web Development", icon: Zap, color: "bg-sage/20 text-sage" },
    { name: "Firebase", icon: Database, color: "bg-peach/30 text-foreground" },
    { name: "REST APIs", icon: Code, color: "bg-lavender/30 text-foreground" },
    { name: "Data Science", icon: BarChart, color: "bg-sky/30 text-foreground" },
  ];

  return (
    <section
      id="about"
      className="min-h-screen pt-32 pb-24 md:pt-40 md:pb-32 px-6 md:px-12 lg:px-24 relative"
    >
      {/* Decorative element */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-peach/10 to-transparent pointer-events-none" />
      
      <div className="max-w-5xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-3 mb-4">
            <Heart className="w-5 h-5 text-coral" />
            <span className="text-coral font-medium tracking-wide text-sm">ABOUT ME</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold mb-12">
            A little bit about myself
          </h2>

          <div className="grid lg:grid-cols-5 gap-12">
            <div className="lg:col-span-3 space-y-6">
              <p className="text-muted-foreground text-lg leading-relaxed">
                I&apos;m a third-year Computer Science student at the{" "}
                <span className="text-foreground font-medium">University of Virginia</span>{" "}
                with a passion for building digital products that spark joy. My journey 
                started with curiosity about how websites work, and it has blossomed into 
                a love for the entire creative process.
              </p>

              <p className="text-muted-foreground text-lg leading-relaxed">
                I specialize in{" "}
                <span className="text-coral font-medium">full-stack development</span>, with 
                particular love for React ecosystems, mobile apps with React Native, and 
                crafting seamless backends with Firebase.
              </p>

              <p className="text-muted-foreground text-lg leading-relaxed">
                When I&apos;m not coding, you&apos;ll find me exploring data science, 
                sketching UI ideas, or finding the perfect coffee spot. I believe the 
                best software feels like magic.
              </p>
            </div>

            <div className="lg:col-span-2">
              <h3 className="text-sm font-medium text-muted-foreground mb-6 tracking-wide">
                WHAT I LOVE WORKING WITH
              </h3>
              <div className="flex flex-wrap gap-3">
                {highlights.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
                      className={`flex items-center gap-2 px-4 py-2 rounded-full ${item.color}`}
                    >
                      <Icon className="w-4 h-4" />
                      <span className="text-sm font-medium">{item.name}</span>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
