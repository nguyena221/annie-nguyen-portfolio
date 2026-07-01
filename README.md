# Annie Nguyen Portfolio

A responsive personal portfolio for Annie Nguyen, a Computer Science student and software developer. The site combines a scrapbook-inspired visual identity with interactive project exploration, professional experience, technical skills, and contact information.

## Features

- Animated collage loading sequence with persistent edge navigation
- Responsive About section with interactive portrait treatment
- Dual project experiences:
  - Command-line terminal with navigation, autocomplete, and project files
  - Visual carousel with detailed project case studies and media
- Skills board with animated paper elements
- Experience browser with contributions, tools, and learning reflections
- Contact section with direct email, GitHub, and LinkedIn links
- Scroll-linked section depth, transitions, and reduced-motion support
- Responsive layouts for phones, tablets, laptops, and wide displays

## Technology

- [Next.js](https://nextjs.org/) with the App Router
- [React](https://react.dev/) and TypeScript
- [Tailwind CSS](https://tailwindcss.com/)
- [Framer Motion](https://motion.dev/) for interaction and entrance animation
- [Lucide](https://lucide.dev/) for interface icons
- [Vercel Analytics](https://vercel.com/docs/analytics)

## Getting Started

Requirements:

- Node.js 24 LTS (Node.js 26 may produce repeated deprecation warnings during development)
- npm

Install dependencies and start the development server:

```bash
npm install
npm run dev -- --webpack
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

```bash
npm run dev -- --webpack  # Start the local development server
npm run build             # Create an optimized production build
npm run start             # Run the production build
```

## Project Structure

```text
app/
  globals.css             Global tokens, depth, texture, and motion styles
  layout.tsx              Metadata, fonts, analytics, and root document
  page.tsx                Portfolio section composition and loading state
components/
  loading-screen.tsx      Intro collage and persistent edge navigation
  section-depth.tsx       Scroll-linked section stacking
  sections/
    about.tsx             Biography, hints, and interactive portrait
    projects.tsx          Terminal, visual browser, media, and project data
    skills.tsx            Skill groups and animated paper treatment
    experience.tsx        Professional roles and learning reflections
    contact.tsx           Contact actions and professional profiles
  ui/button.tsx           Shared button primitive
lib/
  utils.ts                Tailwind class composition helper
public/
  images/                 Portfolio, loading, and project media
```

## Updating Content

Portfolio content is intentionally colocated with its presentation component:

- Biography: `components/sections/about.tsx`
- Projects and project media: `components/sections/projects.tsx`
- Skills: `components/sections/skills.tsx`
- Experience: `components/sections/experience.tsx`
- Contact links: `components/sections/contact.tsx`

Add new media under `public/images/` and reference it with a root-relative path such as `/images/projects/example/demo.mov`.

## Motion and Performance

Continuous decorative animations pause while their section is off-screen. Section transitions rely primarily on transforms and opacity to avoid expensive full-page repaints. The site also respects the operating system's reduced-motion preference.

When adding new animation:

- Prefer `transform` and `opacity`.
- Avoid animating large blur filters or complex gradients.
- Pause looping animation while off-screen.
- Test at mobile and short desktop viewport sizes.

## Deployment

The project is ready for Vercel deployment. Connect the repository to Vercel or deploy with the Vercel CLI. Production analytics are enabled automatically through `@vercel/analytics`.
