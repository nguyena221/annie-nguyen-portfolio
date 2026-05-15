"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Mail, Github, Linkedin, Send, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

const socialLinks = [
  {
    name: "Email",
    href: "mailto:annie.nguyen@email.com",
    icon: Mail,
    handle: "annie.nguyen@email.com",
  },
  {
    name: "GitHub",
    href: "https://github.com",
    icon: Github,
    handle: "@annienguyen",
  },
  {
    name: "LinkedIn",
    href: "https://linkedin.com",
    icon: Linkedin,
    handle: "/in/annienguyen",
  },
];

export function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="contact"
      className="py-24 md:py-32 px-6 md:px-12 lg:px-24 relative overflow-hidden"
      ref={ref}
    >
      {/* Decorative blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 bg-coral/10 blob opacity-50" />
        <div className="absolute bottom-20 right-10 w-48 h-48 bg-sage/20 blob-2 opacity-50" />
      </div>

      <div className="max-w-2xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <Heart className="w-5 h-5 text-coral" />
            <span className="text-coral font-medium tracking-wide text-sm">
              LET&apos;S CONNECT
            </span>
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Say hello!
          </h2>

          <p className="text-muted-foreground text-lg leading-relaxed mb-10">
            I&apos;m always excited to meet new people and explore new opportunities. 
            Whether you have a project idea, want to collaborate, or just want to 
            chat about tech and design, I&apos;d love to hear from you!
          </p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Button
              asChild
              size="lg"
              className="bg-coral text-white hover:bg-coral/90 rounded-full px-10 py-6 text-base shadow-lg shadow-coral/25"
            >
              <a href="mailto:annie.nguyen@email.com">
                <Send className="w-4 h-4 mr-2" />
                Send me a message
              </a>
            </Button>
          </motion.div>
        </motion.div>

        {/* Social links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 pt-12 border-t border-border"
        >
          <p className="text-sm text-muted-foreground mb-6">Or find me on</p>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            {socialLinks.map((link, index) => {
              const Icon = link.icon;
              return (
                <motion.a
                  key={link.name}
                  href={link.href}
                  target={link.name !== "Email" ? "_blank" : undefined}
                  rel={link.name !== "Email" ? "noopener noreferrer" : undefined}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                  className="flex items-center gap-3 px-5 py-3 bg-secondary rounded-full text-muted-foreground hover:text-coral hover:bg-secondary/80 transition-all group"
                >
                  <Icon className="w-4 h-4" />
                  <span className="text-sm font-medium">{link.handle}</span>
                </motion.a>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
