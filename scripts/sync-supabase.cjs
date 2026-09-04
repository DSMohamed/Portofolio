const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = 'https://selyovpetsjmnfuwatfq.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNlbHlvdnBldHNqbW5mdXdhdGZxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODgzNjU0MDgsImV4cCI6MjEwMzk0MTQwOH0.dmPCsuXe3-Tpp6YbuQdqFxP0mCSvct7rMT32Y0mKEWo';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const PERSONAL_INFO = {
  name: "MOHAMED",
  eyebrow: "CREATIVE DEVELOPER & AI ENGINEER",
  title: "Building autonomous AI agents, local neural engines & high-end interactive digital experiences.",
  tagline: "I build offline-first AI companions, agentic workflows, and high-performance creative web architectures.",
  bio: "Creative technologist and AI systems engineer operating at the convergence of local neural models, computer vision pipelines, and production full-stack architecture. Developer of local AI gaming companions, intelligent agentic meeting platforms, offline developer IDEs, and cinematic web experiences.",
  location: "Cairo, Egypt — Available Worldwide",
  availability: "Available for high-impact roles & creative engineering",
  email: "mohamedbuisness2@gmail.com",
  github: "https://github.com/DSMohamed",
  linkedin: "https://linkedin.com/in/mohamed-khaled-elsafoury-8a7124280",
  twitter: "https://x.com/N/A",
};

const STATS = [
  {
    value: "1st 🏆",
    label: "Hackathon Winner",
    description: "Orange × ITIDA × Creativa AI Hackathon champion across New Valley Governorate."
  },
  {
    value: "30+",
    label: "Projects Shipped",
    description: "Production client platforms, local neural models, and AI agent frameworks."
  },
  {
    value: "10k+",
    label: "Active Students",
    description: "High-traffic commercial biology and geography e-learning platforms across Egypt."
  },
  {
    value: "100%",
    label: "Local-First AI",
    description: "Zero-cloud latency, on-device Whisper STT, TTS, and quantized LLM inference."
  }
];

const PROJECTS = [
  {
    id: "elsultan-academy",
    title: "ElSultan Academy (Geography)",
    category: "fullstack",
    categoryLabel: "Full Stack",
    tagline: "Commercial e-learning web platform & multi-gateway payment ecosystem for secondary geography",
    description: "Commercial education web platform developed for Mr. Ahmed Sultan's secondary geography academy. Features automated Egyptian payment gateway webhooks via Paymob, Supabase PostgreSQL database, custom video player integration, and automated student progress tracking.",
    longDescription: "A proprietary production client platform engineered with modern React, Vite, Tailwind CSS, and a Supabase PostgreSQL backend. Features Paymob webhook verification, automated student wallet activation, comprehensive course/exam catalogs with interactive grading, and custom security headers to protect digital educational material.",
    image: "/projects/elsultan-academy.png",
    tags: ["React", "TypeScript", "Tailwind CSS", "Supabase", "PostgreSQL", "Paymob", "Vite", "Node.js"],
    githubUrl: "",
    liveUrl: "https://elsultanacademy.com",
    featured: true,
    highlights: [
      "Commercial Client Platform: Built for Mr. Ahmed Sultan's geography students across secondary education",
      "Automated Egyptian Payments: Real-time Paymob payment processing with instant wallet and course access",
      "Supabase PostgreSQL Architecture: Relational database schema for student enrollments and test analytics",
      "Production domain deployed at elsultanacademy.com with enterprise security headers and CSP"
    ],
    metrics: [
      { label: "Client Platform", value: "Commercial" },
      { label: "Domain", value: "elsultanacademy.com" },
      { label: "Database", value: "Supabase SQL" }
    ]
  },
  {
    id: "dr-biology-academy",
    title: "DrBiology Academy",
    category: "fullstack",
    categoryLabel: "Full Stack",
    tagline: "High-traffic biology academy with anti-piracy DRM video streaming & native Android TWA app",
    description: "Full-scale commercial e-learning ecosystem built for Dr. Mostafa Khaled's biology academy (American Diploma & Thanawya Amma). Features encrypted VdoCipher DRM video streaming via Cloudflare Workers, Paymob & Kashier payments, and a published Android app.",
    longDescription: "Engineered to deliver secure biology curriculum with zero content piracy. Built with React, Vite, Tailwind CSS, and Firebase Realtime Database. Integrates Cloudflare Workers to proxy encrypted VdoCipher dynamic OTP watermarked streams, automated Kashier and Paymob payment reconciliation, and a Trusted Web Activity (TWA) bundle published for native Android distribution.",
    image: "/projects/dr-biology-academy.png",
    tags: ["React", "TypeScript", "Tailwind CSS", "Firebase", "Paymob", "Kashier", "Capacitor", "Cloudflare Workers", "VdoCipher"],
    githubUrl: "",
    liveUrl: "https://drbiologyacademy.pages.dev",
    featured: true,
    highlights: [
      "Commercial Client Platform: Built for Dr. Mostafa Khaled's biology curriculum (American Diploma & Thanawya Amma)",
      "Anti-Piracy DRM: Cloudflare Worker proxying encrypted VdoCipher dynamic OTP watermarked streams",
      "Dual Payment Gateways: Seamless Paymob & Kashier automated checkout and instant enrollments",
      "Native Android distribution built via Capacitor & TWA with sub-2.5s LCP loading optimization"
    ],
    metrics: [
      { label: "Client Platform", value: "Commercial" },
      { label: "Mobile", value: "Android TWA" },
      { label: "Video DRM", value: "VdoCipher" }
    ]
  },
  {
    id: "grounded-insights-hackathon",
    title: "Grounded Insights (1st Place 🏆)",
    category: "ai",
    categoryLabel: "AI & Agents",
    tagline: "1st Place Winner (Orange × ITIDA × Creativa) — Clinical Decision Support RAG & AI Safety Engine",
    description: "First-place winning Clinical Decision Support RAG platform engineered for the Orange × ITIDA × Creativa Hackathon. Features multi-document USPSTF clinical guideline indexing, ChromaDB vector search, 3-tier refusal guardrails, post-generation citation integrity firewalls, and sub-400ms synthesis via Groq LPU.",
    longDescription: "Awarded First Place across New Valley Governorate in the hackathon organized by Orange, ITIDA, Creativa, and Instant. Built with a FastAPI backend, FastEmbed BGE ONNX embeddings, ChromaDB cosine vector index, and Groq LPU (llama-3.3-70b-versatile). Paired with a React 19 / TanStack Start web interface and Flutter mobile client, it successfully cleared all 83/83 strict clinical evaluation checkpoints with 0% invented citations.",
    image: "/projects/grounded-insights.png",
    tags: ["FastAPI", "Python", "ChromaDB", "Groq LPU", "TanStack Start", "React 19", "Flutter", "Supabase", "Tailwind CSS v4"],
    githubUrl: "https://github.com/DSMohamed/Grounded",
    liveUrl: "https://grounded-insights.mohamedbuisness2.workers.dev/",
    featured: true,
    highlights: [
      "1st Place Winner 🏆: Awarded First Place across New Valley Governorate (Orange × ITIDA × Creativa × Instant)",
      "Clinical RAG Engine: FastEmbed ONNX (bge-small-en-v1.5) with ChromaDB persistent cosine vector store",
      "Safety Guardrails: 3-tier pre-generation risk classifier and post-generation citation integrity firewall",
      "Multi-Platform: Production React 19 / TanStack Start web dashboard + Flutter mobile application"
    ],
    metrics: [
      { label: "Award", value: "1st Place 🏆" },
      { label: "Checkpoints", value: "83/83 Cleared" },
      { label: "Inference", value: "<400ms (Groq)" }
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
    image: "/projects/local-ai-gaming-companion.png",
    tags: ["Python", "faster-whisper", "Ollama", "PyTorch", "OpenCV", "VAD", "SQLite"],
    githubUrl: "https://github.com/DSMohamed/AI-COMP",
    liveUrl: "",
    featured: true,
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
    image: "/projects/jcode-ai-ide.png",
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
    id: "sytharia-ide",
    title: "Sytharia IDE — AI-Native Developer Suite",
    category: "fullstack",
    categoryLabel: "Full Stack",
    tagline: "Custom Electron developer environment with embedded OpenCode autonomous coding agents",
    description: "An AI-native desktop IDE built on custom Electron architecture with embedded OpenCode language model providers, in-editor agent modes (ask, agent, edit), custom Dark 2026 aesthetics, and a zero-telemetry runtime.",
    longDescription: "Engineered as an offline-capable, AI-integrated developer environment for high-velocity software engineering. Built on VS Code OSS with a native extension integration ('sytharia-code') powered by the OpenCode SDK. Supports interactive chat participants directly inside editor panels, terminals, and notebooks with zero cloud telemetry and native language server protocols.",
    image: "/projects/sytharia-ide.png",
    tags: ["Electron", "TypeScript", "VS Code OSS", "OpenCode", "Node.js", "AI Agents", "Monaco"],
    githubUrl: "https://github.com/DSMohamed/opencode",
    liveUrl: "",
    featured: false,
    highlights: [
      "Deep OpenCode Integration: Embedded multi-mode agent participant (Ask, Agent, Edit) across panels and terminals",
      "Zero-Telemetry Runtime: Customized product configuration stripped of proprietary tracking for absolute privacy",
      "High-Performance Electron: Custom Dark 2026 visual styling, Space Grotesk typography, and local workspace tools"
    ],
    metrics: [
      { label: "Architecture", value: "Electron OSS" },
      { label: "AI Engine", value: "OpenCode" },
      { label: "Telemetry", value: "0% (Private)" }
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
    image: "/projects/agentic-meeting-os.png",
    tags: ["TypeScript", "LangGraph", "OpenRouter", "React", "Node.js", "Playwright", "Vitest"],
    githubUrl: "https://github.com/DSMohamed/MeetingOS",
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
    image: "/projects/interactive-ai-vision.png",
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
    image: "/projects/thanaweya-chronicle.jpg",
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
    image: "/projects/ppalli.png",
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
    image: "/projects/studymate-cs50.png",
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
    id: "sytharia-agency",
    title: "Sytharia — Creative Tech & Software Studio",
    category: "creative",
    categoryLabel: "Creative Web",
    tagline: "Full-stack engineering studio & agency platform with 3D spatial canvas, AI lead workflows & edge hydration",
    description: "Official agency web platform for Sytharia, an engineering studio building modern web architectures, automated AI workflows (N8N, LLM agents), and custom digital software systems.",
    longDescription: "Sytharia is an engineering studio delivering modern web platforms, automated AI pipelines, and bespoke digital software. Engineered with TanStack Start, React 19, Three.js (@react-three/fiber), Tailwind CSS v4, and Supabase. Features interactive 3D spatial canvas elements, automated client intake pipelines via N8N webhooks and Brevo transactional workflows, and sub-second global edge distribution on Cloudflare.",
    image: "/projects/sytharia-agency.png",
    tags: ["TanStack Start", "React 19", "Three.js", "Tailwind CSS v4", "TypeScript", "Supabase", "N8N Automation", "Cloudflare"],
    githubUrl: "",
    liveUrl: "https://sytharia.com",
    highlights: [
      "Official Studio Platform: Showcasing Sytharia's full-stack web, AI automation, and custom software systems",
      "Modern Frontend Architecture: Built with TanStack Start, React 19 full-stack routing, and Three.js 3D canvas",
      "Automated Lead Intelligence: Integrated N8N webhook pipelines and Brevo workflows connected to Supabase",
      "Global Edge Performance: Deployed on Cloudflare with instant edge SSR hydration and sub-second load times"
    ],
    metrics: [
      { label: "Platform", value: "Agency Studio" },
      { label: "Domain", value: "sytharia.com" },
      { label: "Framework", value: "TanStack Start" }
    ]
  }
];

const TIMELINE = [
  {
    id: "timeline-hackathon-1st",
    role: "1st Place Winner — AI Clinical RAG Hackathon",
    organization: "Orange × ITIDA × Creativa × Instant",
    period: "2024",
    location: "New Valley, Egypt",
    badge: "1st Place Winner 🏆",
    description: "Awarded First Place across New Valley Governorate for engineering 'Grounded Insights' (Team 'El Safe Refusal') — an evidence-bound Clinical Decision Support RAG system featuring multi-tier refusal classifiers, USPSTF clinical guideline ingestion, FastEmbed ChromaDB vector search, Groq LPU inference, and a cross-platform web/Flutter architecture clearing 83/83 audit checkpoints.",
    technologies: ["Python", "FastAPI", "ChromaDB", "FastEmbed", "Groq LPU", "React 19", "TanStack Start", "Flutter", "Supabase"]
  },
  {
    id: "timeline-sytharia-founder",
    role: "Founder & Lead Systems Engineer",
    organization: "Sytharia Software Studio",
    period: "2024 — PRESENT",
    location: "Cairo / Remote",
    badge: "Studio Founder",
    description: "Founding and directing Sytharia, a modern software studio delivering full-stack web platforms, automated AI workflows (N8N, LLM agents), and custom developer tooling (Sytharia IDE). Building towards long-term embodied AI and robotics systems.",
    technologies: ["TanStack Start", "React 19", "Three.js", "Python", "FastAPI", "Supabase", "Tailwind CSS v4", "Cloudflare"]
  },
  {
    id: "timeline-1",
    role: "Local AI & Autonomous Systems Engineer",
    organization: "Independent Research & Development",
    period: "2024 — PRESENT",
    location: "Cairo / Remote",
    badge: "AI Research",
    description: "Architecting local-first neural agents, privacy-respecting AI companions (AI-COMP), desktop development environments (JCode IDE), and multi-agent meeting platforms. Focused on low-latency STT/TTS speech loops and local LLM execution on consumer GPU hardware.",
    technologies: ["Python", "PyTorch", "faster-whisper", "Ollama", "React", "TypeScript", "Electron", "OpenCV"]
  },
  {
    id: "timeline-2",
    role: "Lead Full-Stack Engineer (Client Platforms)",
    organization: "DrBiology & ElSultan Academy",
    period: "2023 — 2024",
    location: "Cairo, Egypt",
    badge: "Commercial Clients",
    description: "Architected and scaled commercial e-learning ecosystems serving 10,000+ active secondary students across Egypt: ElSultan Academy (Geography platform with Paymob & Supabase SQL) and DrBiology Academy (Anti-piracy VdoCipher DRM video streaming via Cloudflare Workers & native Android TWA apps).",
    technologies: ["React", "TypeScript", "Tailwind CSS", "Supabase", "Firebase", "Paymob", "Kashier", "Capacitor", "Cloudflare Workers"]
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

const SKILL_CATEGORIES = [
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
      { name: "Firebase Auth & Firestore", level: "Advanced" },
      { name: "RESTful & Real-time WebSockets", level: "Expert" },
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
      { name: "Docker & Local Containers", level: "Advanced" },
      { name: "Linux & PowerShell Automation", level: "Expert" },
      { name: "Playwright & Vitest Testing", level: "Advanced" },
      { name: "Vercel / Netlify", level: "Expert" },
      { name: "Wrangler CLI", level: "Expert" },
      { name: "Performance Profiling", level: "Expert" }
    ]
  }
];

const SERVICES = [
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
    title: "Full-Stack Web Engineering",
    tagline: "Blazing fast, modern React, TanStack Start & Cloudflare deployments",
    description: "End-to-end web applications built with React 19, TypeScript, TanStack Start, and Tailwind CSS. Clean component systems, accessible UX, resilient backend APIs, and Supabase cloud persistence.",
    icon: "Globe",
    deliverables: [
      "Modern React / TanStack Start web applications",
      "Cloudflare Pages & serverless edge deployments",
      "PostgreSQL, Supabase & SQLite database architecture",
      "Desktop software using Electron & Monaco editor"
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

async function sync() {
  console.log('Pushing MohamedWorks data to Supabase...');

  // Site Settings
  await supabase.from('site_settings').upsert({
    key: 'personal_info',
    value: PERSONAL_INFO,
    updated_at: new Date().toISOString(),
  });
  await supabase.from('site_settings').upsert({
    key: 'stats',
    value: STATS,
    updated_at: new Date().toISOString(),
  });
  console.log('✓ Site settings pushed');

  // Projects
  for (let i = 0; i < PROJECTS.length; i++) {
    const p = PROJECTS[i];
    const { error } = await supabase.from('projects').upsert({
      id: p.id,
      title: p.title,
      category: p.category,
      category_label: p.categoryLabel,
      tagline: p.tagline,
      description: p.description,
      long_description: p.longDescription,
      image: p.image,
      tags: p.tags,
      github_url: p.githubUrl,
      live_url: p.liveUrl,
      featured: p.featured || false,
      metrics: p.metrics || [],
      highlights: p.highlights || [],
      sort_order: i,
    });
    if (error) console.error('Project error:', p.title, error);
    else console.log('✓ Project:', p.title);
  }

  // Experience
  for (let i = 0; i < TIMELINE.length; i++) {
    const e = TIMELINE[i];
    const { error } = await supabase.from('experience').upsert({
      id: e.id,
      role: e.role,
      organization: e.organization,
      period: e.period,
      location: e.location,
      description: e.description,
      technologies: e.technologies,
      badge: e.badge,
      sort_order: i,
    });
    if (error) console.error('Experience error:', e.role, error);
    else console.log('✓ Experience:', e.role);
  }

  // Skills
  for (let i = 0; i < SKILL_CATEGORIES.length; i++) {
    const s = SKILL_CATEGORIES[i];
    const { error } = await supabase.from('skills').upsert({
      id: `skill-cat-${i}`,
      title: s.title,
      icon_name: s.iconName,
      description: s.description,
      skills: s.skills,
      sort_order: i,
    });
    if (error) console.error('Skill error:', s.title, error);
    else console.log('✓ Skill category:', s.title);
  }

  // Services
  for (let i = 0; i < SERVICES.length; i++) {
    const s = SERVICES[i];
    const { error } = await supabase.from('services').upsert({
      id: s.id,
      title: s.title,
      tagline: s.tagline,
      description: s.description,
      icon: s.icon,
      deliverables: s.deliverables,
      sort_order: i,
    });
    if (error) console.error('Service error:', s.title, error);
    else console.log('✓ Service:', s.title);
  }

  console.log('🚀 Sync completed successfully!');
}

sync().catch(console.error);
