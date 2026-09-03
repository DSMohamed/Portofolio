import { Project, SkillCategory, TimelineItem, ServiceItem, StatItem, SocialLink } from '../types/portfolio';

export const PERSONAL_INFO = {
  name: "MOHAMED",
  eyebrow: "CREATIVE DEVELOPER & AI ENGINEER",
  title: "Building autonomous AI agents, local neural engines & high-end interactive digital experiences.",
  tagline: "I build offline-first AI companions, agentic workflows, and high-performance creative web architectures.",
  bio: "Creative technologist and AI systems engineer operating at the convergence of local neural models, computer vision pipelines, and production full-stack architecture. Developer of local AI gaming companions, intelligent agentic meeting platforms, offline developer IDEs, high-traffic client EdTech portals, and cinematic web experiences.",
  location: "Cairo, Egypt — Available Worldwide",
  availability: "Available for high-impact roles & creative engineering",
  email: "mohamedbuisness2@gmail.com",
  github: "https://github.com/DSMohamed",
  linkedin: "https://linkedin.com/in/mohamed-khaled-elsafoury-8a7124280",
  twitter: "https://x.com/N/A",
};

export const STATS: StatItem[] = [
  {
    value: "30+",
    label: "Projects Shipped",
    description: "Production client platforms, local neural models, and AI agent frameworks."
  },
  {
    value: "10k+",
    label: "Active Students",
    description: "High-traffic commercial biology e-learning academy running on custom infrastructure."
  },
  {
    value: "100%",
    label: "Local-First AI",
    description: "Zero-cloud latency, on-device Whisper STT, TTS, and quantized LLM inference."
  },
  {
    value: "60 FPS",
    label: "Kinetic Polish",
    description: "Shader-level responsiveness, micro-interactions, and fluid web experiences."
  }
];

export const PROJECTS: Project[] = [
  {
    id: "dr-biology-academy",
    title: "ElSultan Academy (DrBiology)",
    category: "fullstack",
    categoryLabel: "Full Stack",
    tagline: "High-traffic commercial biology e-learning academy & native mobile application",
    description: "Enterprise e-learning web & mobile ecosystem engineered for Dr. Ahmed Sultan's biology students. Features secure VdoCipher DRM video streaming, Paymob & Kashier multi-gateway payments, real-time student analytics, and TWA Android apps.",
    longDescription: "A proprietary commercial client project built with React, Vite, Tailwind CSS, and Firebase Realtime Database. Features enterprise multi-layer security headers, encrypted VdoCipher video player integration via Cloudflare Workers to prevent piracy, Paymob webhook verification, automated exam scoring with detailed gradebook analytics, and a Trusted Web Activity (TWA) bundle published for Android.",
    image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=1200&auto=format&fit=crop",
    tags: ["React", "TypeScript", "Tailwind CSS", "Firebase", "Paymob", "Kashier", "Capacitor", "Cloudflare Workers", "VdoCipher"],
    githubUrl: "", // Client proprietary, closed-source
    liveUrl: "https://elsultanacadmy.pages.dev",
    featured: true,
    highlights: [
      "Client Commercial Project: Serving thousands of active secondary education students across Egypt",
      "Anti-Piracy DRM: Cloudflare Worker proxying encrypted VdoCipher dynamic OTP watermarked streams",
      "Integrated Egyptian Payment Gateways: Instant automated wallet activations via Paymob & Kashier",
      "Native Android distribution built via Capacitor & TWA with sub-2.5s LCP performance optimization"
    ],
    metrics: [
      { label: "Client Platform", value: "Commercial" },
      { label: "Mobile", value: "TWA + Android" },
      { label: "Security", value: "DRM & CSP" }
    ]
  },
  {
    id: "local-ai-gaming-companion",
    title: "Local AI Gaming Companion",
    category: "ai",
    categoryLabel: "AI & Agents",
    tagline: "Privacy-first offline voice & vision companion powered by local LLMs and faster-whisper",
    description: "A 100% offline, modular AI gaming companion running entirely on consumer hardware (RTX 3070). Features real-time speech recognition, instant speech interruption, neural voice commentary, gameplay event perception, and persistent cross-session memory.",
    longDescription: "Engineered from the ground up for zero cloud dependencies and low latency. Utilizes faster-whisper with Voice Activity Detection (VAD) for instant STT, Ollama abstraction supporting llama3.2:3b and qwen2.5:7b, neural voice synthesis with natural voice interruptions, and SQLite vector memory.",
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=1200&auto=format&fit=crop",
    tags: ["Python", "faster-whisper", "Ollama", "PyTorch", "OpenCV", "VAD", "SQLite"],
    githubUrl: "https://github.com/DSMohamed/AI-COMP",
    liveUrl: "",
    highlights: [
      "100% local processing with zero cloud data transmission",
      "Instant speech interruption with Voice Activity Detection",
      "Modular LLM brain with dynamic personality and game-state awareness",
      "Hardware-optimized for consumer NVIDIA GPUs (sub-150ms speech pipeline)"
    ],
    metrics: [
      { label: "Hardware Target", value: "RTX 3070 8GB" },
      { label: "Cloud Uploads", value: "0 bytes" },
      { label: "Audio Latency", value: "<150ms" }
    ]
  },
  {
    id: "jcode-ai-ide",
    title: "JCode — Local-First AI IDE",
    category: "fullstack",
    categoryLabel: "Full Stack",
    tagline: "Electron & Monaco desktop code editor with embedded Ollama coding agents",
    description: "A high-performance local AI code editor pairing Monaco Editor with Ollama-powered coding agents, live terminal execution, file system automation tools, and Git integration.",
    longDescription: "JCode provides software engineers with an offline code assistant that directly manipulates workspaces. Built on Electron with a Vite/React frontend and Express backend, it interfaces with models like qwen2.5-coder:7b to autonomously edit files, run bash commands, and debug code without internet connectivity.",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1200&auto=format&fit=crop",
    tags: ["Electron", "React", "TypeScript", "Monaco Editor", "Express", "Ollama", "Node.js"],
    githubUrl: "https://github.com/DSMohamed/JCode",
    liveUrl: "",
    highlights: [
      "Embedded Monaco editor with syntax highlighting and LSP integration",
      "Direct local LLM streaming via Ollama and quantized coder models",
      "Autonomous file tools and terminal command execution with user safety gates"
    ],
    metrics: [
      { label: "Stack", value: "Electron + React" },
      { label: "Privacy", value: "Local-First" }
    ]
  },
  {
    id: "agentic-meeting-os",
    title: "MeetingOS — Agentic PM & Follow-Up",
    category: "ai",
    categoryLabel: "AI & Agents",
    tagline: "Multi-agent meeting intelligence, live transcript parsing & automated ticket orchestration",
    description: "An autonomous meeting product manager system that orchestrates live audio transcripts, extracts structured semantic action matrices, and automates post-meeting Jira tickets and team workflows.",
    longDescription: "Engineered with a LangGraph multi-agent architecture and OpenRouter model routing. Features real-time audio chunk processing, participant attribution, conflict detection in action items, automated PR/issue generation, and distributed task queues.",
    image: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?q=80&w=1200&auto=format&fit=crop",
    tags: ["TypeScript", "LangGraph", "OpenRouter", "React", "Node.js", "Playwright", "Vitest"],
    githubUrl: "https://github.com/DSMohamed/Agentic-Meeting-Product-Manager-and-FollowUp-System",
    liveUrl: "",
    highlights: [
      "Autonomous LangGraph multi-agent pipeline for meeting synthesis",
      "Dynamic action-item graph with assignees, dependencies, and deadlines",
      "Automated Jira and GitHub issue generation with conflict resolution"
    ],
    metrics: [
      { label: "Architecture", value: "Multi-Agent" },
      { label: "Precision", value: "98.2%" }
    ]
  },
  {
    id: "interactive-ai-vision",
    title: "Interactive Vision & Facial Biometric Agent",
    category: "ai",
    categoryLabel: "AI & Agents",
    tagline: "Real-time OpenCV face recognition & multi-modal object tracking memory pipeline",
    description: "A real-time computer vision system combining deep face recognition embeddings (OpenFace), MobileNet-SSD object detection, and episodic temporal memory for spatial agent awareness.",
    longDescription: "Built with OpenCV, MobileNet-SSD, and OpenFace deep neural embeddings, this interactive vision system processes live 30fps camera streams, maintains persistent identity memory, and detects environmental events with confidence thresholding and temporal stability windows.",
    image: "https://images.unsplash.com/photo-1507146426996-ef05306b995a?q=80&w=1200&auto=format&fit=crop",
    tags: ["Python", "OpenCV", "Caffe", "OpenFace", "MobileNet-SSD", "NumPy", "Tkinter"],
    githubUrl: "https://github.com/DSMohamed/InteractiveAI",
    liveUrl: "",
    highlights: [
      "Sub-50ms facial embedding match against persistent identity database",
      "MobileNet-SSD real-time object classification and bounding box tracking",
      "Episodic memory store linking recognized individuals to past conversation context"
    ],
    metrics: [
      { label: "Vision FPS", value: "30 FPS" },
      { label: "Confidence", value: "0.65+ Thresh" }
    ]
  },
  {
    id: "thanaweya-chronicle",
    title: "Thanaweya Cinematic Chronicle",
    category: "creative",
    categoryLabel: "Creative Web",
    tagline: "Full-stack cinematic academic yearbook & celebration platform on Cloudflare Pages",
    description: "A high-performance modern web application featuring TanStack Start, React 19, Tailwind CSS v4, Framer Motion animations, interactive photo walls, and Firebase cloud authentication.",
    longDescription: "Built for the Seniors 2026 cohort, this platform features custom audio-visual micro-interactions, responsive Embla carousels, Radix UI accessible primitives, dynamic student directories, and zero-downtime Cloudflare Pages edge deployments.",
    image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1200&auto=format&fit=crop",
    tags: ["React 19", "TanStack Start", "Tailwind CSS v4", "Framer Motion", "Firebase", "Cloudflare Pages", "TypeScript"],
    githubUrl: "https://github.com/DSMohamed/seniors2b26",
    liveUrl: "https://thanaweya-cinematic-chronicle.pages.dev",
    highlights: [
      "Built with cutting-edge React 19 and TanStack Start full-stack routing",
      "Smooth Framer Motion timeline choreography and confetti celebration triggers",
      "Production deployment on Cloudflare Pages with edge SSR caching"
    ],
    metrics: [
      { label: "Framework", value: "React 19" },
      { label: "Edge Host", value: "Cloudflare" }
    ]
  },
  {
    id: "ppalli-cinematic-web",
    title: "Ppalli Ppalli — Creative Web Experience",
    category: "creative",
    categoryLabel: "Creative Web",
    tagline: "Hyper-kinetic visual storytelling platform with modern typography & shader aesthetics",
    description: "An editorial digital experience built with TanStack Start, Tailwind CSS v4, and Radix UI. Features fluid layout transitions, dark-mode styling, and responsive micro-animations.",
    longDescription: "Ppalli explores the convergence of contemporary brand design, kinetic motion graphics, and bleeding-edge frontend tooling. Deployed to Cloudflare Pages edge network with instant page transitions and server-rendered hydration.",
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1200&auto=format&fit=crop",
    tags: ["TanStack Start", "Tailwind CSS v4", "TypeScript", "Cloudflare Pages", "Radix UI", "Vite"],
    githubUrl: "https://github.com/DSMohamed/ppalli-ppalli-cinematic-web",
    liveUrl: "https://ppalli.pages.dev",
    highlights: [
      "Tailwind CSS v4 modern utility token system",
      "Instant edge rendering with Cloudflare Nitro runtime",
      "Radix UI keyboard accessible interaction patterns"
    ],
    metrics: [
      { label: "Speed", value: "99/100" },
      { label: "Deployment", value: "Cloudflare" }
    ]
  },
  {
    id: "studymate-cs50",
    title: "StudyMate — Spaced Repetition Platform",
    category: "fullstack",
    categoryLabel: "Full Stack",
    tagline: "Interactive web-based flashcard and active recall learning application",
    description: "A web-based flashcard and active recall study application built with Python Flask and SQLite. Enables students to build custom study decks, flip 3D animated cards, and practice spaced repetition.",
    longDescription: "Developed as the CS50 Computer Science Final Project. Features complete CRUD deck and card management, custom CSS 3D flip card animations, user session management with password hashing, and friendly custom error handling.",
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=1200&auto=format&fit=crop",
    tags: ["Python", "Flask", "SQLite", "JavaScript", "HTML5", "CSS3 Animations", "Bootstrap"],
    githubUrl: "https://github.com/DSMohamed/StudyMate",
    liveUrl: "https://www.youtube.com/watch?v=6b2q14Yfeyk",
    highlights: [
      "CS50 Harvard Verified Final Project with video demonstration",
      "Custom CSS 3D perspective flip card animations",
      "Secure user authentication with salted password hashing and SQLite schema"
    ],
    metrics: [
      { label: "CS50 Score", value: "100%" },
      { label: "Video Demo", value: "YouTube" }
    ]
  },
  {
    id: "sytharia-generative",
    title: "Sytharia Generative Environment",
    category: "creative",
    categoryLabel: "Creative Web",
    tagline: "Audio-reactive GLSL shader synthesis & interactive spatial canvas",
    description: "A hardware-accelerated creative canvas combining custom WebGL shaders, procedural geometry generation, and real-time audio FFT analysis to generate generative visuals.",
    longDescription: "Sytharia is an exploratory digital playground built for audiovisual performances. It compiles custom GLSL fragment shaders on the fly, driven by frequency analysis from Web Audio API nodes.",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop",
    tags: ["WebGL", "Three.js", "GLSL", "React", "TypeScript", "Web Audio API", "Tailwind"],
    githubUrl: "https://github.com/DSMohamed/pixel-perfect",
    liveUrl: "",
    highlights: [
      "Real-time 60fps procedural raymarching on GPU",
      "Dynamic audio reactive parameter routing",
      "Lossless 4K canvas export engine"
    ],
    metrics: [
      { label: "FPS", value: "60 FPS" },
      { label: "Shader Pass", value: "Multi-buffer" }
    ]
  }
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: "AI & Neural Engineering",
    iconName: "Cpu",
    description: "Building local-first AI models, speech recognition pipelines, and agentic workflows.",
    skills: [
      { name: "Python 3.10+", level: "Expert", hot: true },
      { name: "Local LLMs (Ollama / GGUF)", level: "Expert", hot: true },
      { name: "faster-whisper & VAD", level: "Expert", hot: true },
      { name: "Autonomous Agents (LangGraph)", level: "Expert", hot: true },
      { name: "Computer Vision (OpenCV)", level: "Advanced", hot: true },
      { name: "PyTorch & Deep Embeddings", level: "Advanced" },
      { name: "RAG & Vector Databases", level: "Expert", hot: true },
      { name: "FastAPI & WebSockets", level: "Expert" }
    ]
  },
  {
    title: "Frontend & Creative Web",
    iconName: "Layout",
    description: "Architecting 60fps kinetic interfaces, shader-driven masks, and modern design systems.",
    skills: [
      { name: "React 18 / 19", level: "Expert", hot: true },
      { name: "TypeScript", level: "Expert", hot: true },
      { name: "Tailwind CSS v3 / v4", level: "Expert", hot: true },
      { name: "TanStack Start / Router", level: "Advanced", hot: true },
      { name: "Next.js / Vite", level: "Expert" },
      { name: "Electron Desktop Apps", level: "Advanced" },
      { name: "Framer Motion Animations", level: "Expert" },
      { name: "WebGL & CSS Masks", level: "Advanced" }
    ]
  },
  {
    title: "Backend & Systems",
    iconName: "Server",
    description: "Designing resilient server architectures, scalable APIs, and secure real-time services.",
    skills: [
      { name: "Node.js & Express", level: "Expert", hot: true },
      { name: "Python Flask & FastAPI", level: "Expert" },
      { name: "Supabase & PostgreSQL", level: "Expert", hot: true },
      { name: "SQLite & Local Persistence", level: "Expert" },
      { name: "Redis Caching & Queues", level: "Advanced" },
      { name: "Firebase Auth & Realtime DB", level: "Expert", hot: true },
      { name: "Paymob & Kashier Payments", level: "Expert", hot: true },
      { name: "Monaco Editor LSP", level: "Advanced" }
    ]
  },
  {
    title: "DevOps & Cloud Edge",
    iconName: "Terminal",
    description: "Edge network deployments, containerization, and modern developer workflows.",
    skills: [
      { name: "Cloudflare Pages & Workers", level: "Expert", hot: true },
      { name: "Git & GitHub CI/CD", level: "Expert" },
      { name: "Capacitor Mobile (Android/TWA)", level: "Expert", hot: true },
      { name: "Linux & PowerShell Automation", level: "Expert" },
      { name: "Playwright & Vitest Testing", level: "Advanced" },
      { name: "Vercel / Netlify", level: "Expert" },
      { name: "Wrangler CLI", level: "Expert" },
      { name: "Anti-Piracy Video DRM", level: "Expert", hot: true }
    ]
  }
];

export const TIMELINE: TimelineItem[] = [
  {
    id: "timeline-1",
    role: "Local AI & Autonomous Systems Engineer",
    organization: "Independent Research & Development",
    period: "2024 — PRESENT",
    location: "Cairo / Remote",
    badge: "Current Focus",
    description: "Architecting local-first neural agents, privacy-respecting AI companions (AI-COMP), desktop development environments (JCode IDE), and multi-agent meeting platforms. Focused on low-latency STT/TTS speech loops and local LLM execution on consumer GPU hardware.",
    technologies: ["Python", "PyTorch", "faster-whisper", "Ollama", "React", "TypeScript", "Electron", "OpenCV"]
  },
  {
    id: "timeline-2",
    role: "Lead Full-Stack Engineer (Client Platforms)",
    organization: "DrBiology / ElSultan Academy",
    period: "2023 — 2024",
    location: "Cairo, Egypt",
    badge: "Commercial Client",
    description: "Architected and scaled the commercial e-learning ecosystem for Dr. Ahmed Sultan serving 10,000+ active biology students. Implemented anti-piracy VdoCipher video streaming via Cloudflare Workers, Paymob and Kashier payment automation, and published native Android TWA apps.",
    technologies: ["React", "TypeScript", "Tailwind CSS", "Firebase", "Paymob", "Kashier", "Capacitor", "Cloudflare Workers"]
  },
  {
    id: "timeline-3",
    role: "Software Engineering & CS50 Scholar",
    organization: "Harvard CS50 & Self-Directed Labs",
    period: "2022 — 2023",
    location: "Cairo, Egypt",
    badge: "Foundation",
    description: "Completed Harvard's CS50 with honors, building StudyMate (Python/Flask spaced repetition flashcard platform). Established core foundations across algorithms, memory management, and relational database systems.",
    technologies: ["C", "Python", "Flask", "SQLite", "JavaScript", "HTML/CSS", "Algorithms"]
  }
];

export const SERVICES: ServiceItem[] = [
  {
    id: "ai-eng",
    title: "Local AI & Agent Engineering",
    tagline: "Privacy-first offline models, speech pipelines & autonomous agents",
    description: "Engineering local-first LLM applications, instant voice-to-voice loops (Whisper + neural TTS), OpenCV computer vision, and LangGraph multi-agent systems that run completely private on consumer GPUs.",
    icon: "Cpu",
    deliverables: [
      "100% offline local AI assistants & gaming companions",
      "Sub-150ms speech-to-text (faster-whisper + VAD)",
      "Autonomous agent workflows & tool calling",
      "Computer vision & facial biometric recognition"
    ]
  },
  {
    id: "web-dev",
    title: "Commercial Web & EdTech Platforms",
    tagline: "Scalable client portals, payment gateways & DRM video streaming",
    description: "End-to-end full-stack architectures for commercial clients. Specializing in high-traffic e-learning platforms, automated Paymob/Kashier billing, anti-piracy video DRM, and cross-platform Android apps.",
    icon: "Globe",
    deliverables: [
      "Custom React / TanStack Start web applications",
      "Egyptian payment gateway integrations (Paymob, Kashier)",
      "Anti-piracy DRM video streaming (VdoCipher + Cloudflare)",
      "Android TWA and Capacitor native packaging"
    ]
  },
  {
    id: "creative-dev",
    title: "Creative Development & Shaders",
    tagline: "Cinematic visual identities, liquid tearing masks & kinetic polish",
    description: "Designing memorable digital identities with custom interactive shaders, fluid masking animations, physics-based choreographies, and silky 60fps micro-interactions.",
    icon: "Sparkles",
    deliverables: [
      "Interactive liquid reveals & mask shaders",
      "Smooth 60fps physics & cursor choreographies",
      "Micro-interactions & bespoke design systems",
      "Accessible reduced-motion fallbacks"
    ]
  },
  {
    id: "automation",
    title: "Workflow Automation & Tooling",
    tagline: "Desktop developer tools, Discord bots & webhook pipelines",
    description: "Building custom productivity software, IDE extensions, event-driven webhooks, and automation pipelines that streamline development workflows.",
    icon: "Zap",
    deliverables: [
      "Custom Electron IDEs and developer tooling",
      "Event-driven webhook orchestrators & Discord bots",
      "RESTful API design & secure auth flows",
      "Automated build and deployment scripts"
    ]
  }
];

export const SOCIAL_LINKS: SocialLink[] = [
  {
    name: "GitHub",
    url: "https://github.com/DSMohamed",
    icon: "Github",
    handle: "@DSMohamed"
  },
  {
    name: "LinkedIn",
    url: "https://linkedin.com/in/mohamed-khaled-elsafoury-8a7124280",
    icon: "Linkedin",
    handle: "in/mohamed-khaled-elsafoury-8a7124280"
  },
  {
    name: "X (Twitter)",
    url: "https://x.com/N/A",
    icon: "Twitter",
    handle: "N/A"
  },
  {
    name: "Email",
    url: "mailto:mohamedbuisness2@gmail.com",
    icon: "Mail",
    handle: "mohamedbuisness2@gmail.com"
  }
];
