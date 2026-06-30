"use client"

import { motion, useInView } from "framer-motion"
import {
  BrainCircuit,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  CloudSun,
  Database,
  ExternalLink,
  Github,
  Grid2X2,
  ListChecks,
  MonitorSmartphone,
  ShoppingBasket,
  Sparkles,
  Store,
  Terminal,
  X,
} from "lucide-react"
import { Instrument_Serif, Just_Me_Again_Down_Here } from "next/font/google"
import { FormEvent, KeyboardEvent, useEffect, useRef, useState, type CSSProperties, type PointerEvent as ReactPointerEvent } from "react"

type ProjectSourceFile = "README.md" | "features.txt" | "stack.json" | "highlights.txt" | "structure.txt" | "links.txt"
type TerminalProjectFile = "README.md" | "REFLECTION.md" | "STRUCTURE.md"

type Project = {
  name: string
  slug: string
  period: string
  status: string
  icon: "calendar" | "mobile" | "store" | "tasks" | "classifier" | "weather" | "data" | "grocery"
  summary: string
  stack: string[]
  highlights: string[]
  links: {
    live?: string
    github?: string
  }
  files: Record<ProjectSourceFile, string>
}

type TerminalEntry = {
  command?: string
  cwd: string
  output: string[]
}

type ProjectDetails = {
  summary: string
  context: string
  role: string
  learned: string
}

type ProjectMedia =
  | { type: "video"; src: string; label: string }
  | { type: "image"; src: string; alt: string }

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
})

const justMeAgainDownHere = Just_Me_Again_Down_Here({
  subsets: ["latin"],
  weight: "400",
})

const projects: Project[] = [
  {
    name: "Daily Grid",
    slug: "daily-grid",
    period: "Winter 2025",
    status: "MVP in progress",
    icon: "calendar",
    summary:
      "An in-progress visual weekly planner for organizing tasks, events, and routines through personalized daily and weekly views.",
    stack: ["React", "TypeScript", "Vite", "Tailwind CSS", "Zustand", "date-fns"],
    highlights: [
      "Designed early weekly and daily planning views",
      "Added task, event, and completion-tracking functionality",
      "Planned AI scheduling and scrapbook-style customization features",
    ],
    links: {
      github: "https://github.com/nguyena221/DailyGrid",
    },
    files: {
      "README.md": `# Daily Grid
MVP in progress · Winter 2025 · React, TypeScript, Vite, Tailwind CSS, Zustand, date-fns

Daily Grid is an unfinished visual weekly planner app designed to help users organize tasks, events, and routines into a balanced weekly schedule. It focuses on personalized daily and weekly views, task tracking, and future AI-assisted planning.

I created Daily Grid because I enjoy planners, to-do lists, and visual organization tools, but wanted something more customizable than a basic calendar. I am building the project independently, including the frontend structure, planner layout, task and event management, completion tracking, and overall design direction.

Building a larger React and TypeScript frontend has shown me how complex planning interfaces can be. My next steps are to finish the core task and event flow, improve the weekly planner UI, and add personalization through stickers, sticky notes, colors, and scrapbook-inspired layouts.`,
      "features.txt": `- Visual weekly planner layout
- Early weekly and daily planning views
- Task and event management
- Completion tracking for planned tasks
- Planned AI-generated weekly scheduling
- Planned stickers, sticky notes, colors, and aesthetic layouts`,
      "stack.json": `{
  "frontend": ["React", "TypeScript", "Vite"],
  "styling": ["Tailwind CSS"],
  "state": ["Zustand"],
  "dates": ["date-fns"],
  "tools": ["Git", "GitHub", "VS Code"]
}`,
      "highlights.txt": `- Independently building the frontend and overall design direction
- Structured the project as an MVP that can grow over time
- Practiced balancing productivity features with creative customization
- Used Zustand for state management and date-fns for scheduling logic`,
      "structure.txt": `daily-grid/
├── src/
├── components/
├── store/
├── styles/
├── package.json
└── README.md`,
      "links.txt": `live: Coming soon
github: https://github.com/nguyena221/DailyGrid`,
    },
  },
  {
    name: "GameDate",
    slug: "gamedate",
    period: "Summer 2025",
    status: "Completed",
    icon: "mobile",
    summary:
      "A personality-first dating app prototype that uses quizzes and interactive profiles to help users match beyond basic photos.",
    stack: ["JavaScript", "React Native", "Expo Go", "Firebase"],
    highlights: [
      "Built the Home, Discover, Message, and Profile screens",
      "Created editable profiles, preference filters, and compatibility matching",
      "Implemented real-time messaging with Firebase",
    ],
    links: {
      github: "https://github.com/nguyena221/DatingApp",
    },
    files: {
      "README.md": `# GameDate
Completed · Summer 2025 · JavaScript, React Native, Expo Go, Firebase

GameDate is a personality-first dating app prototype that uses quizzes and interactive profile features to help users match beyond basic photos. Quizzes unlock traits for profiles, while other sections let users share travel, food, and lifestyle interests.

The project was completed with another developer in one month for a class. I built the core UI screens, set up Firebase, worked on message storage, and helped implement customizable profiles. The tight deadline taught me how to divide work, communicate consistently, test a teammate's changes, and deliver a functioning mobile app.`,
      "features.txt": `- Editable user profiles with photos and personality traits
- Explore filters for age, gender, and preferences
- Custom compatibility-based matching system
- Real-time messaging using Firebase
- Interactive profile sections for interests and preferences`,
      "stack.json": `{
  "frontend": ["React Native", "Expo", "JavaScript"],
  "navigation": ["React Navigation"],
  "ui": ["Expo Linear Gradient", "Gesture Handler", "Reanimated"],
  "backend": ["Firebase", "Firestore", "Firebase Authentication"],
  "tools": ["Git", "GitHub", "VS Code", "Expo Go", "Expo CLI"]
}`,
      "highlights.txt": `- Built the Home, Discover, Message, and Profile screens
- Set up Firebase and backend storage for messages
- Collaborated with another developer under a one-month deadline
- Learned React Native, Expo Go, Firebase, and mobile app workflows`,
      "structure.txt": `DatingApp/
├── assets/
├── backend/
├── components/
├── contexts/
├── hook/
├── screens/
├── styles/
├── widgets/
├── App.js
├── app.json
├── index.js
├── package.json
└── package-lock.json`,
      "links.txt": `github: https://github.com/nguyena221/DatingApp`,
    },
  },
  {
    name: "Pro Nails Website",
    slug: "pro-nails-website",
    period: "Winter 2025",
    status: "Completed / Continuously updated",
    icon: "store",
    summary:
      "An online platform for a local nail salon that presents its mission, services, pricing, contact information, and work gallery.",
    stack: ["HTML", "CSS", "JavaScript", "Vercel"],
    highlights: [
      "Created a responsive homepage and gallery showcasing salon work",
      "Built an accurate service menu with pricing and descriptions",
      "Deployed the site and continue to maintain it for the business",
    ],
    links: {
      live: "https://pronails.vercel.app/",
      github: "https://github.com/nguyena221/pronails",
    },
    files: {
      "README.md": `# Pro Nails Website
Completed / Continuously updated · Winter 2025 · HTML, CSS, JavaScript, Vercel

The Pro Nails Website is an online platform for a local nail salon. It showcases the company's mission, service menu, contact information, and a gallery of the salon's work, giving customers an easy way to find services, prices, examples, and business details.

I was the sole developer and worked directly with the business to translate its needs into an accessible, user-friendly website. I designed and programmed the site, verified its information, handled deployment, and continue to make updates. This first client project taught me that web development also depends on listening, communicating clearly, and organizing information for real users.`,
      "features.txt": `- Homepage and gallery showcasing nail designs and salon work
- Service menu with accurate pricing and descriptions
- Contact details, location, and salon mission
- Responsive layout across screen sizes
- Deployment and ongoing maintenance`,
      "stack.json": `{
  "frontend": ["HTML", "CSS", "JavaScript"],
  "deployment": ["Vercel"],
  "tools": ["Git", "GitHub"]
}`,
      "highlights.txt": `- Sole developer working directly with a real client
- Designed layouts and programmed the site with HTML, CSS, and JavaScript
- Turned client expectations into a professional online presence
- Learned deployment, post-launch maintenance, and client communication`,
      "structure.txt": `pro-nails-website/
├── index.html
├── services.html
├── gallery.html
├── contact.html
├── css/
├── js/
├── images/
└── README.md`,
      "links.txt": `live: https://pronails.vercel.app/
github: https://github.com/nguyena221/pronails`,
    },
  },
  {
    name: "Task Manager",
    slug: "task-manager",
    period: "Summer 2025",
    status: "Completed",
    icon: "tasks",
    summary: "A clean mobile task manager for creating, editing, completing, and deleting tasks without unnecessary complexity.",
    stack: [
      "JavaScript",
      "React Native",
      "Expo",
      "React Native Paper",
      "React Native Modal",
      "Expo Vector Icons",
      "React Native Responsive Fontsize",
    ],
    highlights: [
      "Built task creation, editing, completion, and deletion flows",
      "Created a scrollable task list, add-task modal, and info popup",
      "Separated the app into reusable components as it grew",
    ],
    links: { github: "https://github.com/nguyena221/TaskManager" },
    files: {
      "README.md": `# Task Manager
Completed · Summer 2025 · JavaScript, React Native, Expo

Task Manager is a simple mobile productivity app that lets users create tasks with descriptions, mark them complete or incomplete, edit them, and delete them. I wanted to practice mobile development by making the to-do workflow quick and easy without an overly complicated interface.

I built the main interface, task list, add-task modal, edit and delete actions, completion behavior, and info popup. As the feature set grew, I separated the app into smaller components, which strengthened my understanding of state management, data flow, and maintainable React Native UI.`,
      "features.txt": `- Add tasks with short descriptions
- Edit existing tasks
- Complete or reopen tasks with visual feedback
- Delete tasks from the list
- Scrollable task list and explanatory info popup`,
      "stack.json": `{
  "frontend": ["JavaScript", "React Native", "Expo"],
  "ui": ["React Native Paper", "React Native Modal", "Expo Vector Icons"],
  "responsiveText": ["React Native Responsive Fontsize"]
}`,
      "highlights.txt": `- Built the app's primary interface and task functionality
- Practiced state management and passing data between components
- Created interactive buttons, modals, icons, and task cards
- Improved maintainability by extracting smaller components`,
      "structure.txt": `TaskManager/
├── components/
├── assets/
├── App.js
├── app.json
└── package.json`,
      "links.txt": `github: https://github.com/nguyena221/TaskManager`,
    },
  },
  {
    name: "Naïve Bayes Spam Classifier",
    slug: "naive-bayes-spam-classifier",
    period: "Spring 2026",
    status: "Completed",
    icon: "classifier",
    summary: "A Flask web app that classifies messages as spam or ham and exposes the model's probability output and training data.",
    stack: ["Python", "Flask", "HTML", "CSS", "CSV"],
    highlights: [
      "Implemented a Naïve Bayes spam-versus-ham classifier",
      "Displayed prediction probabilities and the training dataset",
      "Enabled new labeled data to dynamically retrain the model",
    ],
    links: { github: "https://github.com/nguyena221/na-ve-bayes-spam-classifier" },
    files: {
      "README.md": `# Naïve Bayes Spam Classifier
Completed · Spring 2026 · Python, Flask, HTML, CSS, CSV

Naïve Bayes Spam Classifier is a web app that classifies messages as spam or ham. Users can enter a message, see the prediction and probability output, inspect the training dataset, and add labeled examples to improve the model.

I built the Flask app, connected its dataset, implemented the prediction workflow, and organized the backend, template, styling, and data files. Working with a small dataset highlighted how strongly model accuracy depends on training-data quality while helping me connect probability, text classification, and web development.`,
      "features.txt": `- Message input for spam or ham classification
- Naïve Bayes prediction workflow
- Probability output showing model confidence
- Inspectable training dataset table
- User-submitted labeled messages
- Dynamic retraining when data is added`,
      "stack.json": `{
  "backend": ["Python", "Flask"],
  "frontend": ["HTML", "CSS"],
  "data": ["CSV"]
}`,
      "highlights.txt": `- Applied prior probabilities, likelihoods, and word features to real text
- Connected machine-learning logic to a usable web interface
- Made model confidence and training data visible to users
- Learned how dataset size and quality affect classification accuracy`,
      "structure.txt": `naive-bayes-spam-classifier/
├── templates/
├── static/
├── data/
├── app.py
└── README.md`,
      "links.txt": `github: https://github.com/nguyena221/na-ve-bayes-spam-classifier`,
    },
  },
  {
    name: "Markov Weather Simulator",
    slug: "markov-weather-simulator",
    period: "Spring 2026",
    status: "Completed",
    icon: "weather",
    summary: "An interactive web simulation that models multi-day weather changes using editable Markov transition probabilities.",
    stack: ["HTML", "Python", "JavaScript"],
    highlights: [
      "Implemented probabilistic transitions between weather states",
      "Allowed users to edit the transition probabilities",
      "Generated multi-day forecasts using real dates",
    ],
    links: { github: "https://github.com/nguyena221/markov-weather-simulator" },
    files: {
      "README.md": `# Markov Weather Simulator
Completed · Spring 2026 · HTML, Python, JavaScript

Markov Weather Simulator is a web-based app that models how weather changes over time using a Markov process. Users can simulate multiple days, adjust transition probabilities between states, and view the generated forecast with real dates.

I built the simulator interface and transition logic to turn a mathematical probability concept into an interactive application. The project helped me understand how the current state and transition probabilities shape future outcomes, as well as how to communicate a conceptual model through a simple visual interface.`,
      "features.txt": `- Multi-day weather simulation
- Probabilistic Markov state transitions
- Editable transition probabilities
- Simulated forecasts with real dates
- Interactive demonstration of probabilistic reasoning`,
      "stack.json": `{
  "logic": ["Python", "JavaScript"],
  "frontend": ["HTML"]
}`,
      "highlights.txt": `- Represented transition probabilities in code
- Demonstrated how probability changes affect simulation outcomes
- Connected a mathematical model to an interactive interface
- Practiced explaining state transitions visually`,
      "structure.txt": `markov-weather-simulator/
├── templates/
├── static/
├── app.py
└── README.md`,
      "links.txt": `github: https://github.com/nguyena221/markov-weather-simulator`,
    },
  },
  {
    name: "Cooking Data Pipeline",
    slug: "cooking-data-pipeline",
    period: "Spring 2026",
    status: "Completed",
    icon: "data",
    summary: "An AWS data pipeline that automatically converts uploaded recipe JSON files to CSV and logs processing metadata.",
    stack: ["Python", "AWS S3", "AWS Lambda", "Amazon RDS", "MySQL", "AWS CLI", "JSON", "CSV"],
    highlights: [
      "Worked on the Lambda-based transform stage",
      "Moved JSON input and CSV output through separate S3 buckets",
      "Supported conversion testing and RDS/MySQL processing logs",
    ],
    links: { github: "https://github.com/nguyena221/Group5_DS2002" },
    files: {
      "README.md": `# Cooking Data Pipeline
Completed · Spring 2026 · Python, AWS S3, AWS Lambda, Amazon RDS, MySQL

Cooking Data Pipeline is a cloud-based DS2002 final project that converts recipe data from JSON to CSV. Uploading a file to an S3 input bucket triggers a Lambda transform, stores the converted output in another bucket, and logs metadata, location, and processing status in an RDS/MySQL database.

I worked in a group and focused on the transform stage, particularly the Lambda function's S3 input and output flow. I also supported and tested the JSON-to-CSV conversion. Connecting Lambda, S3 permissions, and the database taught me how cloud services coordinate in automated data workflows.`,
      "features.txt": `- S3 input bucket for uploaded recipe JSON
- Upload-triggered AWS Lambda processing
- JSON-to-CSV recipe transformation
- Separate S3 bucket for processed output
- RDS/MySQL metadata, location, and status logging
- Automated cloud data workflow`,
      "stack.json": `{
  "language": ["Python"],
  "cloud": ["AWS S3", "AWS Lambda", "Amazon RDS"],
  "database": ["MySQL"],
  "tools": ["AWS CLI"],
  "formats": ["JSON", "CSV"]
}`,
      "highlights.txt": `- Collaborated on a group cloud-data project
- Focused on the Lambda transform stage and S3 file flow
- Tested JSON-to-CSV conversion within the full pipeline
- Learned about cloud permissions, triggers, connections, and documentation`,
      "structure.txt": `Group5_DS2002/
├── lambda/
├── data/
├── database/
├── docs/
└── README.md`,
      "links.txt": `github: https://github.com/nguyena221/Group5_DS2002
demo: Coming soon`,
    },
  },
  {
    name: "AI Grocery Assistant",
    slug: "ai-grocery-assistant",
    period: "Spring 2026",
    status: "Completed",
    icon: "grocery",
    summary: "A natural-language grocery search app that filters and ranks products by needs such as budget, sales, SNAP/EBT eligibility, and brand.",
    stack: [
      "Python",
      "FastAPI",
      "React",
      "TypeScript",
      "Vite",
      "CSS",
      "CSV",
      "pandas",
      "NumPy",
      "scikit-learn",
      "Ollama",
    ],
    highlights: [
      "Created and organized the grocery product data",
      "Set up database and backend API foundations",
      "Contributed to filtering, ranking, embeddings, and Ollama integration",
    ],
    links: { github: "https://github.com/byuk729/aiProject" },
    files: {
      "README.md": `# AI Grocery Assistant
Completed · Spring 2026 · Python, FastAPI, React, TypeScript, Ollama

AI Grocery Assistant is a web app that lets users search for grocery products in natural language. Requests can describe affordable products, sale items, SNAP/EBT eligibility, or brands, and the app returns recommendations using product data, filters, and ranking logic.

In this group project, I focused on product data, database and API setup, and search logic. I organized the CSV dataset, helped connect it to the backend, contributed to filters and ranking, and supported Ollama and local embedding-model setup. The project showed me that effective AI features rely on well-structured data and dependable backend systems.`,
      "features.txt": `- Natural-language grocery search
- Organized CSV-backed product data
- FastAPI connection between product data and frontend
- Price, sale, SNAP/EBT, and brand filters
- Search-result ranking
- Embedding-based product matching
- Ollama local-model integration
- React and TypeScript frontend`,
      "stack.json": `{
  "backend": ["Python", "FastAPI"],
  "frontend": ["React", "TypeScript", "Vite", "CSS"],
  "data": ["CSV", "pandas", "NumPy", "scikit-learn"],
  "ai": ["Ollama", "Embeddings"]
}`,
      "highlights.txt": `- Worked in a group on data, backend, and search responsibilities
- Organized product data and database structure
- Improved results through filters and ranking logic
- Practiced interpreting vague natural-language requests
- Connected AI tooling, APIs, data, and frontend behavior`,
      "structure.txt": `aiProject/
├── backend/
├── frontend/
├── data/
├── models/
└── README.md`,
      "links.txt": `github: https://github.com/byuk729/aiProject`,
    },
  },
]

const projectDetails: Record<string, ProjectDetails> = {
  "pro-nails-website": {
    summary: "The Pro Nails Website is an online platform for a local nail salon, Pro Nails. It showcases the company’s mission, service menu, contact information, and a gallery of the salon’s work. The website helps improve customer interaction by giving clients an easy way to view services, pricing, examples of previous designs, and business information online. It was created using HTML, CSS, and JavaScript.",
    context: "The goal of this project was to create a fully functional, accessible, and user-friendly website for the business. Before this project, the company did not have a strong online presence, so the website served as a bridge between the salon and its customers. This project also gave me the opportunity to work with a real client, understand their needs, and turn their expectations into a finished website.",
    role: "I was the sole developer on this project. I built the website structure, designed the layouts and pages, and programmed the site using HTML, CSS, and JavaScript. I also communicated directly with the business to make sure the website matched their expectations, included accurate information, and represented the salon professionally. In addition, I handled the deployment process and continue to update the website when changes are needed.",
    learned: "This was my first project working directly with a real client, so I learned a lot about communication, collaboration, and building a product based on someone else’s needs. One challenge was making sure the website looked professional while still matching the business’s style and expectations. I also learned how to deploy a website, make updates after launch, and think about how real users would interact with the site. This project helped me understand that web development is not only about writing code, but also about listening to the client, organizing information clearly, and creating something useful for both the business and its customers.",
  },
  gamedate: {
    summary: "GameDate is a personality-first dating app prototype that uses quizzes and interactive profile features to help users match beyond basic photos. Quizzes unlock personality traits that can be displayed on user profiles. Users also have the option to showcase other personality traits and interests, such as places they want to visit, places they have visited, foods they want to try, or foods they have tried.",
    context: "The goal of this project was to create a dating experience that felt more intentional by focusing on personality traits, preferences, and shared interests. Dating can feel serious and intimidating, so this app tries to make the experience more interactive and approachable. This was also a class project where we were instructed to work in a group and develop an app of any kind within the span of one month.",
    role: "I worked with another developer on this project. My main role was to build the core UI screens, including the Home/Dashboard, Discover, Message, and Profile pages. I also set up the Firebase backend and worked on the backend functionality and storage for messages. In addition, I helped build the profile page functionality, including what users could customize on their profiles. Both of us tested each other’s work, communicated throughout the project, and checked in with each other to stay on track.",
    learned: "This was one of my first experiences building a mobile app, so it was a valuable opportunity to learn React Native, Expo Go, and Firebase. I also gained a better understanding of mobile app development, backend integration, real-time messaging, and user profile customization. One of the biggest challenges was the one-month time constraint, which made communication and time management especially important. This project taught me how to work with another developer, divide tasks, test features, and build a functioning app under a tight deadline.",
  },
  "task-manager": {
    summary: "Task Manager is a simple mobile task management app built with React Native and Expo. The app allows users to create tasks, add short descriptions, mark tasks as complete or incomplete, edit existing tasks, and delete tasks when they are finished. It focuses on creating a clean and easy-to-use task list experience with smooth user interactions.",
    context: "I’ve always liked using to-do lists to stay organized, so I wanted to build a simple task manager that felt quick and easy to use. The goal of this project was to practice mobile app development while creating a basic productivity app where users could add, edit, complete, and delete tasks without the interface feeling too complicated.",
    role: "I built the app’s main interface and task functionality. I created the task list structure, add task modal, edit/delete actions, complete/incomplete task behavior, and the info popup that explains how the app works. I also worked on organizing the app into separate components so the project was easier to manage and update.",
    learned: "This project helped me practice building a mobile app with React Native and Expo. I learned more about managing state, passing information between components, and making interactive UI elements like buttons, modals, icons, and task cards. One challenge was keeping the app organized as more features were added, so separating the app into smaller components helped make the code cleaner and easier to work with.",
  },
  "naive-bayes-spam-classifier": {
    summary: "Naïve Bayes Spam Classifier is a web app that classifies messages as spam or ham using a Naïve Bayes machine learning model. Users can type in a message, receive a prediction with probability output, view the training dataset, and add their own labeled messages to improve the model.",
    context: "The goal of this project was to better understand how machine learning can be used for text classification. Spam detection is a common real-world example of classification, so this project helped connect probability concepts to an actual application. I wanted to build something that showed not only the final prediction, but also how the model could be trained and improved with additional labeled data.",
    role: "I built the web app and implemented the main spam classification workflow. I set up the Flask backend, connected the app to a dataset, created the message input and prediction system, and added functionality for users to view and add training data. I also worked on organizing the project structure with separate files for the app logic, HTML template, CSS styling, and dataset.",
    learned: "This project helped me understand how probability-based machine learning models can be applied to real text data. I learned how Naïve Bayes uses word features, prior probabilities, and likelihoods to make predictions. A challenge was working with a smaller dataset, which limited the model’s accuracy and made it clear how important training data quality is. I also learned more about connecting backend logic to a web interface and making machine learning results easier for users to understand.",
  },
  "markov-weather-simulator": {
    summary: "Markov Weather Simulator is a web-based simulation app that models how weather can change over time using a Markov model. Users can simulate weather across multiple days, adjust transition probabilities between weather states, and view a generated forecast with real dates.",
    context: "This project was created for the same class as my Naïve Bayes Spam Classifier project, where I was learning how probability-based models can be used in simple AI systems. The goal was to better understand Markov processes by building an interactive simulation instead of only studying the concept mathematically. Weather was a useful example because it naturally changes from one state to another, such as sunny, cloudy, or rainy, based on probability.",
    role: "I built the main simulator interface and implemented the weather transition logic. I created the structure for users to run a multi-day simulation, adjust transition probabilities, and view the generated forecast. I also worked on connecting the probability model to a simple web interface so the results were easier to understand visually.",
    learned: "This project helped me better understand how Markov models use the current state to predict possible future states. I learned how transition probabilities can be represented in code and how changing those probabilities affects the simulation results. One challenge was making the probability logic understandable through a simple interface, especially because the model is more conceptual than visual. This helped me practice turning a mathematical idea into an interactive application.",
  },
  "cooking-data-pipeline": {
    summary: "Cooking Data Pipeline is a cloud-based data processing project that converts recipe data from JSON files into CSV files. The project uses AWS S3, AWS Lambda, and Amazon RDS/MySQL to create an automated pipeline where uploaded recipe files are processed, stored, and logged.",
    context: "This project was created as a final project for DS2002. The goal was to practice building a real data pipeline that could move data through multiple stages instead of only working with files locally. Since recipe data can come in structured formats like JSON, this project focused on transforming recipe data into CSV format and tracking each file’s processing status in a database.",
    role: "I worked as part of a group to help build and test the data pipeline. My main focus was on the transform stage, specifically working with the AWS Lambda function that reads input files from the S3 input bucket and writes the processed output files back to the S3 output bucket. I also helped check and support my partner’s work on the file conversion part of the project to make sure the JSON-to-CSV transformation worked correctly within the pipeline.",
    learned: "This project helped me understand how cloud services can work together to automate data processing. I learned more about AWS S3 buckets, Lambda triggers, file input/output handling, JSON-to-CSV conversion, and database logging with MySQL. One challenge was making sure each part of the pipeline connected correctly, especially the Lambda function, S3 input/output buckets, permissions, and database connection. This project gave me more experience with backend data workflows and showed me how important testing and clear documentation are when working with cloud-based systems.",
  },
  "ai-grocery-assistant": {
    summary: "AI Grocery Assistant is a web app that helps users search for grocery products using natural language. Users can type requests for affordable items, sale items, SNAP/EBT eligible products, or specific brands, and the app returns grocery recommendations based on product data, filtering, and ranking logic.",
    context: "This project was created to explore how AI can make grocery search more useful and flexible than a normal keyword search. Instead of forcing users to search with exact product names, the app lets users describe what they want in a more natural way. The goal was to connect AI concepts like embeddings, semantic search, filtering, and ranking to a practical everyday problem: finding grocery products that match a user’s needs, budget, and preferences.",
    role: "I worked as part of a group and focused mainly on the database, API setup, and search/recommendation logic. I created and organized the CSV data used for the grocery products, set up the database structure, and helped connect the data to the backend API. I also contributed to the filtering process and worked on the search function so results could be ranked more accurately based on the user’s request. In addition, I helped with the Ollama setup and local model work used for the AI/embedding portion of the project.",
    learned: "This project helped me understand how AI features depend heavily on strong data organization and backend structure. I learned more about building APIs, preparing CSV data for a database, connecting data to a frontend, and improving search results through filtering and ranking logic. One challenge was making the search feel accurate when users typed vague or casual requests, since the system needed to interpret the request and return useful products. This project showed me how database design, API development, filtering logic, and AI tools like Ollama can work together in a full-stack application.",
  },
  "daily-grid": {
    summary: "Daily Grid is an unfinished visual weekly planner app designed to help users organize tasks, events, and routines into a balanced weekly schedule. The app focuses on creating a more personalized planning experience with daily and weekly views, task tracking, and future AI-assisted planning features.",
    context: "I created this project because I’ve always liked planners, to-do lists, and visual organization tools, but I wanted to build something that felt more customizable and personal than a basic calendar app. The goal is to make a planner where users can organize their week while also customizing the space to match their own style, almost like a digital scrapbook. In the future, I want users to be able to personalize their planner with stickers, sticky notes, colors, and aesthetic layouts that fit how they like to plan.",
    role: "I am building this project independently and working on the frontend structure, planner layout, task/event management features, and overall design direction. I set up the React/TypeScript project structure and began building the core planning experience, including weekly and daily views, task organization, and completion tracking. Since the project is still in progress, I am continuing to refine the UI, improve the planner flow, and plan out the customization and AI-assisted scheduling features.",
    learned: "This project has helped me practice building a larger frontend project with React and TypeScript while thinking more carefully about user experience and layout design. I learned that planning apps are more complicated than they look because the interface has to feel flexible, clean, and useful without becoming overwhelming. One challenge is balancing productivity features with customization features, since I want the app to be functional but also feel personal and creative. Since this project is unfinished, my next steps are to finish the core task/event flow, improve the weekly planner UI, and then build out the personalization features.",
  },
}

const projectMedia: Partial<Record<string, ProjectMedia[]>> = {
  gamedate: [
    { type: "video", src: "/images/projects/gamedate/demo.mov", label: "GameDate app demo" },
  ],
  "task-manager": [
    { type: "video", src: "/images/projects/task-manager/demo.mov", label: "Task Manager app demo" },
  ],
  "naive-bayes-spam-classifier": [
    { type: "image", src: "/images/projects/naive-bayes/view1.png", alt: "Naive Bayes spam classifier input and prediction view" },
    { type: "image", src: "/images/projects/naive-bayes/view2.png", alt: "Naive Bayes spam classifier training data view" },
  ],
  "markov-weather-simulator": [
    { type: "image", src: "/images/projects/markov-weather/view1.png", alt: "Markov weather simulator overview" },
    { type: "image", src: "/images/projects/markov-weather/view2.png", alt: "Markov weather transition settings" },
    { type: "image", src: "/images/projects/markov-weather/view3.png", alt: "Markov weather forecast results" },
    { type: "image", src: "/images/projects/markov-weather/view4.png", alt: "Markov weather simulator detail view" },
  ],
  "ai-grocery-assistant": [
    { type: "video", src: "/images/projects/ai-grocery-assistant/demo.MOV", label: "AI Grocery Assistant demo" },
  ],
}

const projectFiles: TerminalProjectFile[] = ["README.md", "REFLECTION.md", "STRUCTURE.md"]

const getProjectReadme = (project: Project) => {
  const details = projectDetails[project.slug]
  const features = project.files["features.txt"]
  const highlights = project.files["highlights.txt"]
  const links = project.files["links.txt"]
    .split("\n")
    .map((line) => {
      const match = line.match(/^([^:]+):\s*(https?:\/\/\S+)$/)
      return match ? `- [${match[1]}](${match[2]})` : `- ${line}`
    })
    .join("\n")

  return `# ${project.name}

> ${project.status} · ${project.period}

## Overview

${details.summary}

## Context & Purpose

${details.context}

## My Role

${details.role}

## Tech Stack

${project.stack.map((item) => `- ${item}`).join("\n")}

## Key Features

${features}

## Highlights

${highlights}

## Links

${links}`
}

const getProjectReflection = (project: Project) => {
  const details = projectDetails[project.slug]

  return `# ${project.name} — Reflection

## What I Learned & Challenges

${details.learned}`
}

const getProjectStructure = (project: Project) => `# ${project.name} — Project Structure

\`\`\`text
${project.files["structure.txt"]}
\`\`\``

const getTerminalFileContents = (project: Project, fileName: TerminalProjectFile) => {
  if (fileName === "REFLECTION.md") {
    return getProjectReflection(project)
  }

  if (fileName === "STRUCTURE.md") {
    return getProjectStructure(project)
  }

  return getProjectReadme(project)
}

const getPromptPath = (cwd: string) => (cwd === "projects" ? "~/projects" : `~/projects/${cwd}`)

const getProject = (slug: string) => projects.find((project) => project.slug === slug)

const iconMap = {
  calendar: CalendarDays,
  mobile: MonitorSmartphone,
  store: Store,
  tasks: ListChecks,
  classifier: BrainCircuit,
  weather: CloudSun,
  data: Database,
  grocery: ShoppingBasket,
}

const carouselRepeatCount = 7
const carouselMiddleSet = Math.floor(carouselRepeatCount / 2)
const carouselMiddleStart = projects.length * carouselMiddleSet
const carouselLowerBoundary = projects.length * 2
const carouselUpperBoundary = projects.length * (carouselRepeatCount - 2)
const carouselProjects = Array.from({ length: carouselRepeatCount }).flatMap(() => projects)

const getHelpOutput = () => [
  "View:",
  "  Use the control in the top-right corner to switch project views.",
  "",
  "Commands:",
  "  ls                 list folders or files",
  "  cd <folder>        enter a project folder",
  "  cd ..              go back to ~/projects",
  "  pwd                show current path",
  "  cat <file>         print file contents",
  "  tree               show project structure",
  "  clear              clear terminal",
  "",
  "Try: ls",
]

const getCompletionCandidates = (cwd: string, input: string) => {
  const projectNames = projects.map((project) => `${project.slug}/`)
  const commands = ["help", "ls", "cd", "pwd", "cat", "tree", "clear"]
  const hasTrailingSpace = /\s$/.test(input)
  const parts = input.trimStart().split(/\s+/)
  const completingCommand = parts.length === 1 && !hasTrailingSpace
  const commandName = parts[0] ?? ""
  const currentToken = hasTrailingSpace ? "" : parts[parts.length - 1] ?? ""

  if (completingCommand) {
    return commands.filter((command) => command.startsWith(currentToken))
  }

  if (commandName === "cd") {
    const candidates = cwd === "projects" ? projectNames : ["../"]

    return candidates.filter((candidate) => candidate.startsWith(currentToken))
  }

  if (commandName === "cat") {
    if (cwd === "projects") {
      return []
    }

    return projectFiles.filter((file) => file.startsWith(currentToken))
  }

  return []
}

const applyCompletion = (input: string, completion: string) => {
  const hasTrailingSpace = /\s$/.test(input)
  const leadingWhitespace = input.match(/^\s*/)?.[0] ?? ""
  const parts = input.trimStart().split(/\s+/)

  if (parts.length === 1 && !hasTrailingSpace) {
    return `${leadingWhitespace}${completion} `
  }

  if (hasTrailingSpace) {
    return `${input}${completion}`
  }

  return `${leadingWhitespace}${parts.slice(0, -1).join(" ")} ${completion}`
}

export function Projects() {
  const ref = useRef(null)
  const outputRef = useRef<HTMLDivElement | null>(null)
  const inputRef = useRef<HTMLInputElement | null>(null)
  const carouselShellRef = useRef<HTMLDivElement | null>(null)
  const terminalSplitRef = useRef<HTMLDivElement | null>(null)
  const carouselRef = useRef<HTMLDivElement | null>(null)
  const carouselItemRefs = useRef<(HTMLButtonElement | null)[]>([])
  const carouselSettleTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const commandDraftRef = useRef("")
  const isInView = useInView(ref, { amount: 0.12 })
  const [view, setView] = useState<"terminal" | "browse">("terminal")
  const [showBrowseHint, setShowBrowseHint] = useState(true)
  const [showTerminalHint, setShowTerminalHint] = useState(true)
  const [cwd, setCwd] = useState("projects")
  const [command, setCommand] = useState("")
  const [commandHistory, setCommandHistory] = useState<string[]>([])
  const [commandHistoryIndex, setCommandHistoryIndex] = useState<number | null>(null)
  const [selectedSlug, setSelectedSlug] = useState(projects[0].slug)
  const [activeCarouselSlot, setActiveCarouselSlot] = useState(carouselMiddleStart)
  const [carouselCenter, setCarouselCenter] = useState(0)
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)
  const [terminalSplit, setTerminalSplit] = useState(68)
  const [history, setHistory] = useState<TerminalEntry[]>([
    {
      cwd: "projects",
      output: [
        "Welcome to ~/projects.",
        "Type `help` for commands, or start with `ls`.",
      ],
    },
  ])

  const switchToBrowse = () => {
    setShowBrowseHint(false)
    setView("browse")
  }

  const switchToTerminal = () => {
    setShowTerminalHint(false)
    setView("terminal")
  }

  useEffect(() => {
    if (!outputRef.current) {
      return
    }

    outputRef.current.scrollTop = outputRef.current.scrollHeight
  }, [history])

  useEffect(() => {
    if (view !== "browse" || !carouselRef.current) {
      return
    }

    const container = carouselRef.current
    const middleItem = carouselItemRefs.current[carouselMiddleStart]

    if (middleItem) {
      container.scrollLeft = middleItem.offsetLeft - container.clientWidth / 2 + middleItem.clientWidth / 2
    }
  }, [view])

  const selectedProject = getProject(selectedSlug) ?? projects[0]
  const selectedDetails = projectDetails[selectedProject.slug]
  const selectedFeatures = selectedProject.files["features.txt"]
    .split("\n")
    .map((feature) => feature.replace(/^-\s*/, ""))
    .filter(Boolean)
  const selectedMedia = projectMedia[selectedProject.slug] ?? []
  const selectedImages = selectedMedia.filter(
    (media): media is Extract<ProjectMedia, { type: "image" }> => media.type === "image",
  )
  const terminalProject = cwd === "projects" ? null : getProject(cwd) ?? null
  const terminalMedia = terminalProject ? projectMedia[terminalProject.slug] ?? [] : []
  const showTerminalMedia = terminalMedia.length > 0
  const terminalHasPhotos = terminalMedia.some((media) => media.type === "image")

  useEffect(() => {
    if (showTerminalMedia) {
      setTerminalSplit(terminalHasPhotos ? 47 : 68)
    }
  }, [terminalProject?.slug, showTerminalMedia, terminalHasPhotos])

  const handleSplitPointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    const container = terminalSplitRef.current

    if (!container || window.innerWidth < 1024) {
      return
    }

    event.preventDefault()

    const updateSplit = (clientX: number) => {
      const bounds = container.getBoundingClientRect()
      const nextSplit = ((clientX - bounds.left) / bounds.width) * 100
      setTerminalSplit(Math.min(72, Math.max(30, nextSplit)))
    }

    const handlePointerMove = (pointerEvent: PointerEvent) => updateSplit(pointerEvent.clientX)
    const handlePointerUp = () => {
      window.removeEventListener("pointermove", handlePointerMove)
      window.removeEventListener("pointerup", handlePointerUp)
      document.body.style.cursor = ""
      document.body.style.userSelect = ""
    }

    document.body.style.cursor = "col-resize"
    document.body.style.userSelect = "none"
    window.addEventListener("pointermove", handlePointerMove)
    window.addEventListener("pointerup", handlePointerUp)
  }

  useEffect(() => {
    setLightboxIndex(null)
  }, [selectedProject.slug])

  useEffect(() => {
    if (lightboxIndex === null) {
      return
    }

    const handleKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Escape") {
        setLightboxIndex(null)
      } else if (event.key === "ArrowLeft") {
        setLightboxIndex((current) =>
          current === null ? null : (current - 1 + selectedImages.length) % selectedImages.length,
        )
      } else if (event.key === "ArrowRight") {
        setLightboxIndex((current) =>
          current === null ? null : (current + 1) % selectedImages.length,
        )
      }
    }

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"
    window.addEventListener("keydown", handleKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [lightboxIndex, selectedImages.length])

  const getClosestCarouselIndex = () => {
    const container = carouselRef.current

    if (!container) {
      return activeCarouselSlot
    }

    const containerCenter = container.scrollLeft + container.clientWidth / 2
    let closestIndex = 0
    let closestDistance = Number.POSITIVE_INFINITY

    carouselItemRefs.current.forEach((item, index) => {
      if (!item) {
        return
      }

      const itemCenter = item.offsetLeft + item.clientWidth / 2
      const distance = Math.abs(containerCenter - itemCenter)

      if (distance < closestDistance) {
        closestDistance = distance
        closestIndex = index
      }
    })

    return closestIndex
  }

  const updateCarouselCenter = () => {
    const container = carouselRef.current

    if (!container) {
      return
    }

    let closestIndex = getClosestCarouselIndex()

    if (closestIndex < carouselLowerBoundary) {
      const currentItem = carouselItemRefs.current[closestIndex]
      const matchingMiddleItem = carouselItemRefs.current[(closestIndex % projects.length) + carouselMiddleStart]

      if (currentItem && matchingMiddleItem) {
        container.scrollLeft += matchingMiddleItem.offsetLeft - currentItem.offsetLeft
        closestIndex = (closestIndex % projects.length) + carouselMiddleStart
      }
    }

    if (closestIndex >= carouselUpperBoundary) {
      const currentItem = carouselItemRefs.current[closestIndex]
      const matchingMiddleItem = carouselItemRefs.current[(closestIndex % projects.length) + carouselMiddleStart]

      if (currentItem && matchingMiddleItem) {
        container.scrollLeft -= currentItem.offsetLeft - matchingMiddleItem.offsetLeft
        closestIndex = (closestIndex % projects.length) + carouselMiddleStart
      }
    }

    setCarouselCenter(container.scrollLeft + container.clientWidth / 2)

    const project = carouselProjects[closestIndex]

    setActiveCarouselSlot(closestIndex)

    if (project) {
      setSelectedSlug(project.slug)
    }
  }

  const centerCarouselItem = (index: number, behavior: ScrollBehavior = "smooth") => {
    const container = carouselRef.current
    const item = carouselItemRefs.current[index]

    if (!container || !item) {
      return
    }

    container.scrollTo({
      left: item.offsetLeft - container.clientWidth / 2 + item.clientWidth / 2,
      behavior,
    })

    setActiveCarouselSlot(index)
    setSelectedSlug(carouselProjects[index]?.slug ?? selectedSlug)
  }

  const settleCarouselToNearestItem = () => {
    const closestIndex = getClosestCarouselIndex()
    centerCarouselItem(closestIndex)
  }

  const handleCarouselWheel = (event: WheelEvent) => {
    const container = carouselRef.current

    if (!container) {
      return
    }

    event.preventDefault()
    event.stopPropagation()

    const deltaMultiplier = event.deltaMode === WheelEvent.DOM_DELTA_LINE ? 16 : event.deltaMode === WheelEvent.DOM_DELTA_PAGE ? container.clientWidth : 1
    const scrollAmount = (Math.abs(event.deltaX) > Math.abs(event.deltaY) ? event.deltaX : event.deltaY) * deltaMultiplier

    container.scrollLeft += scrollAmount
    window.requestAnimationFrame(updateCarouselCenter)

    if (carouselSettleTimer.current) {
      clearTimeout(carouselSettleTimer.current)
    }

    carouselSettleTimer.current = setTimeout(settleCarouselToNearestItem, 240)
  }

  useEffect(() => {
    if (view !== "browse" || !carouselShellRef.current) {
      return
    }

    const container = carouselShellRef.current

    container.addEventListener("wheel", handleCarouselWheel, { passive: false })

    return () => {
      if (carouselSettleTimer.current) {
        clearTimeout(carouselSettleTimer.current)
      }

      container.removeEventListener("wheel", handleCarouselWheel)
    }
  }, [view])

  const runCommand = (rawCommand: string) => {
    const trimmedCommand = rawCommand.trim()
    const [baseCommand, ...args] = trimmedCommand.split(/\s+/)
    const currentProject = cwd === "projects" ? null : getProject(cwd)

    if (!trimmedCommand) {
      return { nextCwd: cwd, output: [] }
    }

    if (baseCommand === "clear") {
      return { nextCwd: cwd, output: [], clear: true }
    }

    if (baseCommand === "help") {
      return { nextCwd: cwd, output: getHelpOutput() }
    }

    if (baseCommand === "pwd") {
      return { nextCwd: cwd, output: [getPromptPath(cwd)] }
    }

    if (baseCommand === "ls") {
      if (cwd === "projects") {
        return { nextCwd: cwd, output: [projects.map((project) => `${project.slug}/`).join("  ")] }
      }

      return { nextCwd: cwd, output: [projectFiles.join("  ")] }
    }

    if (baseCommand === "cd") {
      const target = args[0]

      if (!target) {
        return { nextCwd: "projects", output: [] }
      }

      if (target === ".." || target === "../") {
        return { nextCwd: "projects", output: [] }
      }

      const normalizedTarget = target.replace(/\/$/, "")
      const project = getProject(normalizedTarget)

      if (!project) {
        return { nextCwd: cwd, output: [`cd: no such folder: ${target}`] }
      }

      setSelectedSlug(project.slug)
      return { nextCwd: project.slug, output: [] }
    }

    if (baseCommand === "cat") {
      const fileName = args[0] as TerminalProjectFile | undefined

      if (!currentProject) {
        return { nextCwd: cwd, output: ["cat: choose a project folder first with `cd <folder>`"] }
      }

      if (!fileName || !projectFiles.includes(fileName)) {
        return { nextCwd: cwd, output: [`cat: no such file: ${fileName ?? ""}`] }
      }

      return { nextCwd: cwd, output: getTerminalFileContents(currentProject, fileName).split("\n") }
    }

    if (baseCommand === "tree") {
      if (!currentProject) {
        return { nextCwd: cwd, output: projects.map((project) => `${project.slug}/`) }
      }

      return {
        nextCwd: cwd,
        output: [`${currentProject.slug}/`, "├── README.md", "├── REFLECTION.md", "└── STRUCTURE.md"],
      }
    }

    return { nextCwd: cwd, output: [`command not found: ${baseCommand}`, "Type `help` for available commands."] }
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const submittedCommand = command
    const result = runCommand(submittedCommand)

    if (submittedCommand.trim()) {
      setCommandHistory((current) => [...current, submittedCommand])
    }

    if (result.clear) {
      setHistory([])
    } else {
      setHistory((currentHistory) => [
        ...currentHistory,
        {
          command: submittedCommand,
          cwd,
          output: result.output,
        },
      ])
    }

    setCwd(result.nextCwd)
    setCommand("")
    setCommandHistoryIndex(null)
    commandDraftRef.current = ""
  }

  const handleCommandKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "ArrowUp") {
      event.preventDefault()

      if (commandHistory.length === 0) {
        return
      }

      const nextIndex = commandHistoryIndex === null
        ? commandHistory.length - 1
        : Math.max(0, commandHistoryIndex - 1)

      if (commandHistoryIndex === null) {
        commandDraftRef.current = command
      }

      setCommandHistoryIndex(nextIndex)
      setCommand(commandHistory[nextIndex])
      return
    }

    if (event.key === "ArrowDown") {
      event.preventDefault()

      if (commandHistoryIndex === null) {
        return
      }

      if (commandHistoryIndex < commandHistory.length - 1) {
        const nextIndex = commandHistoryIndex + 1
        setCommandHistoryIndex(nextIndex)
        setCommand(commandHistory[nextIndex])
      } else {
        setCommandHistoryIndex(null)
        setCommand(commandDraftRef.current)
      }

      return
    }

    if (event.key !== "Tab") {
      return
    }

    event.preventDefault()

    const candidates = getCompletionCandidates(cwd, command)

    if (candidates.length === 0) {
      return
    }

    if (candidates.length === 1) {
      setCommand(applyCompletion(command, candidates[0]))
      return
    }

    setHistory((currentHistory) => [
      ...currentHistory,
      {
        command,
        cwd,
        output: candidates,
      },
    ])
  }

  return (
    <section
      id="projects"
      ref={ref}
      className={`relative flex min-h-[100svh] items-center justify-center px-6 py-16 transition-colors duration-500 md:px-12 lg:px-24 ${
        view === "browse" ? "overflow-x-hidden bg-[#f8ddd2]" : "overflow-x-hidden bg-[#f8ddd2]"
      }`}
    >
      {view === "terminal" ? (
        <>
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_18%,rgba(254,250,240,0.95)_0%,rgba(241,193,102,0.26)_24%,transparent_48%),radial-gradient(circle_at_84%_82%,rgba(161,58,30,0.28)_0%,transparent_36%),linear-gradient(135deg,#fefaf0_0%,#f8ddd2_42%,#d98572_100%)]" />
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(115deg,rgba(254,250,240,0.6)_0%,rgba(161,58,30,0.12)_42%,rgba(84,41,22,0.16)_100%)]" />
        </>
      ) : (
        <>
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_18%,rgba(254,250,240,0.95)_0%,rgba(241,193,102,0.26)_24%,transparent_48%),radial-gradient(circle_at_84%_82%,rgba(161,58,30,0.28)_0%,transparent_36%),linear-gradient(135deg,#fefaf0_0%,#f8ddd2_42%,#d98572_100%)]" />
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(115deg,rgba(254,250,240,0.6)_0%,rgba(161,58,30,0.12)_42%,rgba(84,41,22,0.16)_100%)]" />
        </>
      )}

      <motion.div
        className="relative flex w-full max-w-6xl flex-col items-center"
        initial={false}
        animate={{ opacity: 1 }}
      >
        {view === "terminal" ? (
          <>
            <motion.div
              className="-mb-3"
              initial={{ opacity: 0, filter: "blur(14px)", y: 32 }}
              animate={isInView
                ? { opacity: 1, filter: "blur(0px)", y: 0 }
                : { opacity: 0, filter: "blur(14px)", y: 32 }}
              transition={{
                opacity: { duration: 0.42, delay: isInView ? 0.03 : 0, ease: "easeOut" },
                filter: { duration: 0.5, delay: isInView ? 0.03 : 0, ease: "easeOut" },
                y: { type: "spring", stiffness: 140, damping: 15, mass: 0.75, delay: isInView ? 0.03 : 0 },
              }}
            >
              <h2
                className={`${instrumentSerif.className} scale-y-[0.82] text-center text-6xl font-bold italic leading-[0.9] tracking-[0.05em] text-[#542916] md:text-7xl`}
                style={{
                  textShadow:
                    "0.014em 0 0 currentColor, -0.014em 0 0 currentColor, 0 0.006em 0 currentColor, 0 8px 24px rgba(254,250,240,0.52)",
                }}
              >
                PROJECTS
              </h2>
            </motion.div>
            <motion.div
              ref={terminalSplitRef}
              className="relative flex w-full flex-col items-center justify-center gap-4 pt-16 lg:flex-row lg:items-stretch lg:gap-0"
              style={{ "--terminal-share": `${terminalSplit}%` } as CSSProperties}
              initial={{ opacity: 0, filter: "blur(16px)", y: 72, scale: 0.985 }}
              animate={isInView
                ? { opacity: 1, filter: "blur(0px)", y: 0, scale: 1 }
                : { opacity: 0, filter: "blur(16px)", y: 72, scale: 0.985 }}
              transition={{
                opacity: { duration: 0.5, delay: isInView ? 0.08 : 0, ease: "easeOut" },
                filter: { duration: 0.62, delay: isInView ? 0.08 : 0, ease: "easeOut" },
                y: { type: "spring", stiffness: 125, damping: 14, mass: 0.85, delay: isInView ? 0.08 : 0 },
                scale: { duration: 0.5, delay: isInView ? 0.08 : 0, ease: "easeOut" },
              }}
            >
              <motion.div
                layout
                transition={{ duration: 0.22, ease: "easeInOut" }}
                className={`relative flex h-[clamp(640px,78svh,760px)] flex-col overflow-visible rounded-[10px] border border-[#a13a1e]/22 bg-[#a13a1e]/18 shadow-[0_18px_50px_rgba(84,41,22,0.18),inset_0_1px_0_rgba(254,250,240,0.52)] backdrop-blur-[3px] ${
                  showTerminalMedia
                    ? "w-[min(88vw,988px)] lg:w-[var(--terminal-share)] lg:max-w-none lg:shrink-0"
                    : "w-[min(78vw,988px)]"
                }`}
                aria-label="Projects terminal"
                onClick={() => inputRef.current?.focus()}
              >
            {showBrowseHint && (
              <div className={`${justMeAgainDownHere.className} pointer-events-none absolute bottom-full right-1.5 z-20 mb-4 flex max-w-[calc(100vw-3rem)] items-start justify-end text-right text-lg tracking-wide text-[#a13a1e]/80 sm:text-[1.35rem]`}>
                <span className="-translate-y-2 leading-none sm:whitespace-nowrap">Prefer a simpler layout? Browse here</span>
                <svg className="ml-3 h-5 w-20 shrink-0 overflow-visible" viewBox="0 0 80 48" fill="none" preserveAspectRatio="none" aria-hidden="true">
                  <path d="M2 5C31 3 58 8 69 37" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
                  <path d="M59 31L71 41L76 24" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
                </svg>
              </div>
            )}
            <div className="flex h-10 shrink-0 items-center gap-2 rounded-t-[9px] border-b border-[#a13a1e]/18 bg-[#fefaf0]/22 py-0 pl-4 pr-1.5">
              <span className="h-3 w-3 rounded-full bg-[#d46a5f]" />
              <span className="h-3 w-3 rounded-full bg-[#e8bb67]" />
              <span className="h-3 w-3 rounded-full bg-[#9ebf86]" />
              <span className="ml-3 min-w-0 flex-1 truncate text-xs text-[#542916]/62">
                annie@portfolio: {getPromptPath(cwd)}
              </span>
              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation()
                  switchToBrowse()
                }}
                className="group flex h-7 w-7 shrink-0 items-center justify-center overflow-hidden rounded-full border border-[#a13a1e]/20 bg-[#fefaf0]/42 text-xs font-medium text-[#542916]/78 transition-all duration-300 hover:w-[5.7rem] hover:justify-start hover:bg-[#fefaf0]/70 hover:px-3 hover:text-[#542916] focus-visible:w-[5.7rem] focus-visible:justify-start focus-visible:px-3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#a13a1e]/60"
                aria-label="Switch to browse view"
              >
                <Grid2X2 className="size-3.5 shrink-0" />
                <span className="ml-0 max-w-0 overflow-hidden whitespace-nowrap opacity-0 transition-all duration-300 group-hover:ml-1.5 group-hover:max-w-16 group-hover:opacity-100 group-focus-visible:ml-1.5 group-focus-visible:max-w-16 group-focus-visible:opacity-100">
                  Browse
                </span>
              </button>
            </div>

            <div
              ref={outputRef}
              className="min-h-0 flex-1 overflow-y-auto p-5 font-mono text-[0.72rem] leading-relaxed text-[#542916] md:p-7 md:text-sm"
            >
              {history.map((entry, index) => (
                <div key={`${entry.cwd}-${entry.command ?? "intro"}-${index}`} className={index ? "mt-4" : ""}>
                  {entry.command !== undefined && (
                    <p>
                      <span className="text-[#a13a1e]">annie@portfolio</span>
                      <span className="text-[#542916]/42">:</span>
                      <span className="text-[#6f7b57]">{getPromptPath(entry.cwd)}</span>
                      <span className="text-[#542916]/42"> % </span>
                      {entry.command}
                    </p>
                  )}
                  {entry.output.length > 0 && (
                    <pre className="mt-1 whitespace-pre-wrap break-words text-[#542916]/88">{entry.output.join("\n")}</pre>
                  )}
                </div>
              ))}
            </div>

            <form
              onSubmit={handleSubmit}
              className="flex shrink-0 items-center border-t border-[#a13a1e]/14 bg-[#fefaf0]/24 px-5 py-3 font-mono text-[0.72rem] text-[#542916] md:px-7 md:text-sm"
            >
              <span className="text-[#a13a1e]">annie@portfolio</span>
              <span className="text-[#542916]/42">:</span>
              <span className="text-[#6f7b57]">{getPromptPath(cwd)}</span>
              <span className="text-[#542916]/42"> % </span>
              <input
                ref={inputRef}
                value={command}
                onChange={(event) => {
                  setCommand(event.target.value)
                  setCommandHistoryIndex(null)
                  commandDraftRef.current = event.target.value
                }}
                onKeyDown={handleCommandKeyDown}
                className="ml-1 min-w-0 flex-1 bg-transparent text-[#542916] outline-none placeholder:text-[#542916]/38"
                placeholder="type a command"
                spellCheck={false}
                autoComplete="off"
                aria-label="Terminal command"
              />
            </form>
              </motion.div>

              {showTerminalMedia && terminalProject && (
                <>
                  <div
                    className="group relative hidden w-7 shrink-0 cursor-col-resize touch-none items-center justify-center lg:flex"
                    role="separator"
                    aria-label="Resize terminal and demo panels"
                    aria-orientation="vertical"
                    aria-valuemin={30}
                    aria-valuemax={72}
                    aria-valuenow={Math.round(terminalSplit)}
                    tabIndex={0}
                    onPointerDown={handleSplitPointerDown}
                    onKeyDown={(event) => {
                      if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
                        event.preventDefault()
                        setTerminalSplit((current) =>
                          Math.min(72, Math.max(30, current + (event.key === "ArrowRight" ? 2 : -2))),
                        )
                      }
                    }}
                  >
                    <span className="h-16 w-1 rounded-full bg-[#a13a1e]/35 transition group-hover:h-24 group-hover:bg-[#a13a1e]/65 group-focus:bg-[#a13a1e]/65" />
                    <span className="absolute grid size-6 place-items-center rounded-full border border-[#a13a1e]/25 bg-[#fefaf0] text-[10px] font-bold text-[#a13a1e] shadow-sm">
                      ↔
                    </span>
                  </div>
                  <motion.aside
                  key={terminalProject.slug}
                  className="flex h-[clamp(640px,78svh,760px)] w-[min(88vw,600px)] shrink-0 flex-col overflow-hidden rounded-[10px] border border-[#a13a1e]/22 bg-[#fefaf0]/62 p-4 text-[#542916] shadow-[0_18px_50px_rgba(84,41,22,0.16)] backdrop-blur-md lg:w-auto lg:min-w-0 lg:flex-1"
                  initial={{ opacity: 0, x: 35, scale: 0.97 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: 35, scale: 0.97 }}
                  transition={{ duration: 0.22, ease: "easeOut" }}
                  aria-label={`${terminalProject.name} demo`}
                >
                  <div className="mb-3 shrink-0">
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#a13a1e]">Project Demo</p>
                    <h3 className="mt-1 text-lg font-black">{terminalProject.name}</h3>
                  </div>

                  <div className="min-h-0 flex-1 space-y-3 overflow-y-auto pr-1 [scrollbar-color:rgba(161,58,30,0.35)_transparent]">
                    {terminalMedia.map((media) =>
                      media.type === "video" ? (
                        <video
                          key={media.src}
                          className="max-h-full w-full rounded-lg bg-[#542916] object-contain shadow-md"
                          controls
                          muted
                          playsInline
                          preload="metadata"
                          aria-label={media.label}
                        >
                          <source src={media.src} />
                          Your browser does not support embedded videos.
                        </video>
                      ) : (
                        <button
                          key={media.src}
                          type="button"
                          onClick={() => setLightboxIndex(selectedImages.findIndex((image) => image.src === media.src))}
                          className="group block w-full cursor-zoom-in overflow-hidden rounded-lg border border-[#a13a1e]/14 bg-[#542916]/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#a13a1e]"
                          aria-label={`Enlarge ${media.alt}`}
                        >
                          <img
                            src={media.src}
                            alt={media.alt}
                            className="h-auto w-full object-contain transition duration-300 group-hover:scale-[1.02]"
                            loading="lazy"
                          />
                        </button>
                      ),
                    )}
                  </div>
                  </motion.aside>
                </>
              )}
            </motion.div>
          </>
        ) : (
          <motion.div
            className="w-full"
            initial={{ opacity: 0, filter: "blur(16px)", y: 72, scale: 0.985 }}
            animate={isInView
              ? { opacity: 1, filter: "blur(0px)", y: 0, scale: 1 }
              : { opacity: 0, filter: "blur(16px)", y: 72, scale: 0.985 }}
            transition={{
              opacity: { duration: 0.5, delay: isInView ? 0.08 : 0, ease: "easeOut" },
              filter: { duration: 0.62, delay: isInView ? 0.08 : 0, ease: "easeOut" },
              y: { type: "spring", stiffness: 125, damping: 14, mass: 0.85, delay: isInView ? 0.08 : 0 },
              scale: { duration: 0.5, delay: isInView ? 0.08 : 0, ease: "easeOut" },
            }}
          >
            <div className="relative mx-auto mb-5 w-fit pb-14">
              <div className="flex items-end justify-center gap-3">
                <h2
                className={`${instrumentSerif.className} scale-y-[0.82] text-center text-6xl font-bold italic leading-[0.9] tracking-[0.05em] text-[#542916] md:text-7xl`}
                style={{
                  textShadow:
                    "0.014em 0 0 currentColor, -0.014em 0 0 currentColor, 0 0.006em 0 currentColor, 0 8px 24px rgba(254,250,240,0.52)",
                }}
              >
                PROJECT
                </h2>
                <button
                  type="button"
                  onClick={switchToTerminal}
                  className="group mb-1 flex h-8 w-8 items-center justify-center overflow-hidden rounded-full border border-[#a13a1e]/20 bg-[#fefaf0]/52 text-xs font-semibold text-[#542916] shadow-[0_8px_20px_rgba(84,41,22,0.13)] backdrop-blur transition-all duration-300 hover:w-[6.4rem] hover:justify-start hover:bg-[#fefaf0]/80 hover:px-3 focus-visible:w-[6.4rem] focus-visible:justify-start focus-visible:px-3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#a13a1e]"
                  aria-label="Switch to terminal view"
                >
                  <Terminal className="size-3.5 shrink-0" />
                  <span className="ml-0 max-w-0 overflow-hidden whitespace-nowrap opacity-0 transition-all duration-300 group-hover:ml-1.5 group-hover:max-w-20 group-hover:opacity-100 group-focus-visible:ml-1.5 group-focus-visible:max-w-20 group-focus-visible:opacity-100">
                    Terminal
                  </span>
                </button>
              </div>

              {showTerminalHint && (
              <div
                className={`${justMeAgainDownHere.className} pointer-events-none absolute right-0 top-[4rem] z-20 flex max-w-[calc(100vw-3rem)] items-start justify-end text-right text-lg tracking-wide text-[#a13a1e]/80 sm:w-96 sm:text-[1.35rem]`}
              >
                <span className="max-w-52 translate-y-2 leading-none sm:max-w-none sm:whitespace-nowrap">Prefer command-based navigation? Terminal here</span>
                <svg
                  className="ml-3 h-5 w-20 translate-y-1 shrink-0 overflow-visible"
                  viewBox="0 0 80 48"
                  fill="none"
                  preserveAspectRatio="none"
                  aria-hidden="true"
                >
                  <path
                    d="M2 42C31 44 58 39 69 11"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    vectorEffect="non-scaling-stroke"
                  />
                  <path
                    d="M59 17L71 7L76 24"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    vectorEffect="non-scaling-stroke"
                  />
                </svg>
              </div>
              )}
            </div>

            <div
              ref={carouselShellRef}
              className="relative mx-auto flex min-h-[205px] w-full max-w-[760px] flex-col justify-center overflow-hidden rounded-[999px] border border-[#a13a1e]/18 bg-[linear-gradient(180deg,#d98572_0%,#a13a1e_100%)] shadow-[inset_0_1px_0_rgba(254,250,240,0.36),0_22px_60px_rgba(84,41,22,0.18)] md:min-h-[260px]"
            >
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(254,250,240,0.28),transparent_38%),radial-gradient(circle_at_18%_82%,rgba(241,193,102,0.18),transparent_30%)]" />
              <div
                ref={carouselRef}
                onScroll={updateCarouselCenter}
                className="absolute inset-y-0 left-5 right-5 z-10 flex items-center gap-3 overflow-x-auto overflow-y-hidden rounded-[inherit] overscroll-contain px-[21%] [scrollbar-width:none] md:left-8 md:right-8 md:gap-5 md:px-[25%] [&::-webkit-scrollbar]:hidden"
                aria-label="Browse projects"
              >
                {carouselProjects.map((project, index) => {
                  const Icon = iconMap[project.icon]
                  const item = carouselItemRefs.current[index]
                  const itemCenter = item ? item.offsetLeft + item.clientWidth / 2 : 0
                  const distanceFromCenter = item ? Math.abs(carouselCenter - itemCenter) : Number.POSITIVE_INFINITY
                  const circleSize = distanceFromCenter < 78 ? 160 : distanceFromCenter < 210 ? 110 : 62
                  const iconSize = distanceFromCenter < 78 ? 68 : distanceFromCenter < 210 ? 48 : 28

                  return (
                    <button
                      key={`${project.slug}-${index}`}
                      ref={(node) => {
                        carouselItemRefs.current[index] = node
                      }}
                      type="button"
                      onClick={() => centerCarouselItem(index)}
                      className="grid shrink-0 place-items-center rounded-full border border-[#fefaf0]/62 bg-[#fefaf0]/18 text-[#fefaf0]/92 shadow-[inset_0_1px_0_rgba(254,250,240,0.42)] transition-[width,height,background-color] duration-200 ease-out hover:bg-[#fefaf0]/28 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#fefaf0]"
                      style={{ width: circleSize, height: circleSize }}
                      aria-label={`View ${project.name}`}
                    >
                      <Icon style={{ width: iconSize, height: iconSize }} strokeWidth={1.5} />
                    </button>
                  )
                })}
              </div>
            </div>

            <motion.div
              key={selectedProject.slug}
              className="mx-auto mt-7 max-w-4xl rounded-[8px] border border-[#a13a1e]/16 bg-[#fefaf0]/86 p-5 text-[#542916] shadow-[0_16px_42px_rgba(84,41,22,0.16)] backdrop-blur md:p-6"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
            >
              <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                <div>
                  <div className="mb-2 flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#a13a1e]">
                    <span>{selectedProject.status}</span>
                    <span aria-hidden="true">/</span>
                    <span>{selectedProject.period}</span>
                  </div>
                  <h3 className="text-2xl font-black tracking-normal text-[#542916] md:text-3xl">
                    {selectedProject.name}
                  </h3>
                  <p className="mt-3 max-w-3xl text-sm leading-6 md:text-base">{selectedDetails.summary}</p>
                </div>

                <div className="flex shrink-0 gap-2">
                  {selectedProject.links.github && (
                    <a
                      href={selectedProject.links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="grid size-10 place-items-center rounded-full bg-[#542916] text-[#fefaf0] transition hover:bg-[#a13a1e]"
                      aria-label={`${selectedProject.name} GitHub`}
                    >
                      <Github className="size-4" />
                    </a>
                  )}
                  {selectedProject.links.live && (
                    <a
                      href={selectedProject.links.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="grid size-10 place-items-center rounded-full bg-[#a13a1e] text-[#fefaf0] transition hover:bg-[#542916]"
                      aria-label={`${selectedProject.name} live site`}
                    >
                      <ExternalLink className="size-4" />
                    </a>
                  )}
                </div>
              </div>

              <section className="mt-7 border-t border-[#a13a1e]/14 pt-6">
                <h4 className="text-sm font-black uppercase tracking-[0.14em] text-[#a13a1e]">Context &amp; Purpose</h4>
                <p className="mt-2 text-sm leading-6 text-[#542916]/90 md:text-base md:leading-7">{selectedDetails.context}</p>
              </section>

              <section className="mt-6">
                <h4 className="text-sm font-black uppercase tracking-[0.14em] text-[#a13a1e]">My Role</h4>
                <p className="mt-2 text-sm leading-6 text-[#542916]/90 md:text-base md:leading-7">{selectedDetails.role}</p>
              </section>

              <section className="mt-6">
                <h4 className="text-sm font-black uppercase tracking-[0.14em] text-[#a13a1e]">Tech Stack</h4>
                <div className="mt-3 flex flex-wrap gap-2">
                {selectedProject.stack.map((item) => (
                  <span key={item} className="rounded-full bg-[#f1c166]/28 px-3 py-1 text-xs font-semibold text-[#542916]">
                    {item}
                  </span>
                ))}
                </div>
              </section>

              <section className="mt-6">
                <h4 className="text-sm font-black uppercase tracking-[0.14em] text-[#a13a1e]">Key Features</h4>
                <div className="mt-3 grid gap-x-8 gap-y-3 md:grid-cols-2">
                {selectedFeatures.map((feature) => (
                  <div key={feature} className="flex gap-2 text-sm leading-6 text-[#542916]">
                    <Sparkles className="mt-0.5 size-4 shrink-0 text-[#a13a1e]" />
                    <span>{feature}</span>
                  </div>
                ))}
                </div>
              </section>

              {selectedMedia.length > 0 && (
                <section className="mt-6">
                  <h4 className="text-sm font-black uppercase tracking-[0.14em] text-[#a13a1e]">Project Demo</h4>
                  <div className={`mt-3 grid gap-3 ${selectedMedia.length > 1 ? "md:grid-cols-2" : ""}`}>
                    {selectedMedia.map((media) => (
                      <div
                        key={media.src}
                        className="overflow-hidden rounded-xl border border-[#a13a1e]/14 bg-[#542916]/5 shadow-[0_8px_24px_rgba(84,41,22,0.10)]"
                      >
                        {media.type === "video" ? (
                          <video
                            className="max-h-[34rem] w-full bg-[#542916] object-contain"
                            controls
                            muted
                            playsInline
                            preload="metadata"
                            aria-label={media.label}
                          >
                            <source src={media.src} />
                            Your browser does not support embedded videos.
                          </video>
                        ) : (
                          <button
                            type="button"
                            onClick={() => setLightboxIndex(selectedImages.findIndex((image) => image.src === media.src))}
                            className="group relative block h-full w-full cursor-zoom-in focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[#a13a1e]"
                            aria-label={`Enlarge ${media.alt}`}
                          >
                            <img
                              src={media.src}
                              alt={media.alt}
                              className="h-full max-h-[30rem] w-full object-contain transition duration-300 group-hover:scale-[1.02]"
                              loading="lazy"
                            />
                            <span className="pointer-events-none absolute bottom-3 right-3 rounded-full bg-[#542916]/80 px-3 py-1 text-xs font-semibold text-[#fefaf0] opacity-0 backdrop-blur transition group-hover:opacity-100 group-focus-visible:opacity-100">
                              View larger
                            </span>
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </section>
              )}

              <section className="mt-6">
                <h4 className="text-sm font-black uppercase tracking-[0.14em] text-[#a13a1e]">What I Learned &amp; Challenges</h4>
                <p className="mt-2 text-sm leading-6 text-[#542916]/90 md:text-base md:leading-7">{selectedDetails.learned}</p>
              </section>

              <section className="mt-6 border-t border-[#a13a1e]/14 pt-5">
                <h4 className="text-sm font-black uppercase tracking-[0.14em] text-[#a13a1e]">Links</h4>
                <div className="mt-2 space-y-1 font-mono text-xs leading-6 text-[#542916]/80 md:text-sm">
                  {selectedProject.files["links.txt"].split("\n").map((line) => {
                    const match = line.match(/^([^:]+):\s*(https?:\/\/\S+)$/)

                    if (!match) {
                      return <p key={line}>{line}</p>
                    }

                    const [, label, url] = match

                    return (
                      <p key={line}>
                        {label}:{" "}
                        <a
                          href={url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="break-all font-semibold text-[#a13a1e] underline decoration-[#a13a1e]/40 underline-offset-4 transition hover:text-[#542916] hover:decoration-[#542916]"
                        >
                          {url}
                        </a>
                      </p>
                    )
                  })}
                </div>
              </section>
            </motion.div>
          </motion.div>
        )}
      </motion.div>

      {lightboxIndex !== null && selectedImages[lightboxIndex] && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#1d0d07]/92 p-4 backdrop-blur-sm md:p-10"
          role="dialog"
          aria-modal="true"
          aria-label={`${selectedProject.name} image gallery`}
          onClick={() => setLightboxIndex(null)}
        >
          <button
            type="button"
            onClick={() => setLightboxIndex(null)}
            className="absolute right-4 top-4 z-10 grid size-11 place-items-center rounded-full bg-[#fefaf0]/12 text-[#fefaf0] transition hover:bg-[#fefaf0]/24 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#fefaf0]"
            aria-label="Close image gallery"
          >
            <X className="size-6" />
          </button>

          {selectedImages.length > 1 && (
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation()
                setLightboxIndex((lightboxIndex - 1 + selectedImages.length) % selectedImages.length)
              }}
              className="absolute left-3 z-10 grid size-11 place-items-center rounded-full bg-[#fefaf0]/12 text-[#fefaf0] transition hover:bg-[#fefaf0]/24 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#fefaf0] md:left-6 md:size-13"
              aria-label="Previous image"
            >
              <ChevronLeft className="size-7" />
            </button>
          )}

          <div className="flex max-h-full max-w-[92vw] flex-col items-center gap-3" onClick={(event) => event.stopPropagation()}>
            <img
              src={selectedImages[lightboxIndex].src}
              alt={selectedImages[lightboxIndex].alt}
              className="max-h-[82vh] max-w-full rounded-lg object-contain shadow-2xl"
            />
            <p className="text-sm font-semibold text-[#fefaf0]/85">
              {lightboxIndex + 1} / {selectedImages.length}
            </p>
          </div>

          {selectedImages.length > 1 && (
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation()
                setLightboxIndex((lightboxIndex + 1) % selectedImages.length)
              }}
              className="absolute right-3 z-10 grid size-11 place-items-center rounded-full bg-[#fefaf0]/12 text-[#fefaf0] transition hover:bg-[#fefaf0]/24 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#fefaf0] md:right-6 md:size-13"
              aria-label="Next image"
            >
              <ChevronRight className="size-7" />
            </button>
          )}
        </div>
      )}
    </section>
  )
}
