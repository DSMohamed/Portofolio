import { Project, SkillCategory, TimelineItem, ServiceItem, StatItem, SocialLink } from '../types/portfolio';

export const PERSONAL_INFO = {
  name: "MOHAMED",
  eyebrow: "CREATIVE DEVELOPER & AI ENGINEER",
  title: "Building immersive digital experiences & intelligent systems.",
  tagline: "I build immersive digital experiences, intelligent products, and software that feels as good as it works.",
  bio: "Creative technologist and full-stack engineer operating at the convergence of high-performance web architecture, modern machine learning systems, and expressive interactive design. Focused on building software that is mathematically precise and aesthetically breathtaking.",
  location: "Cairo, Egypt — Available Worldwide",
  availability: "Available for high-impact roles & creative engineering",
  email: "mohamedbuisness2@gmail.com",
  github: "https://github.com/DSMohamed",
  linkedin: "https://linkedin.com/in/mohamed-khaled-elsafoury-8a7124280",
  twitter: "https://x.com/N/A",
};

export const STATS: StatItem[] = [
  {
    value: "20+",
    label: "Projects Shipped",
    description: "Production web applications, AI models, and real-time interactive tools."
  },
  {
    value: "3+",
    label: "Years Engineering",
    description: "Deep hands-on craft across React, TypeScript, Python, and system architecture."
  },
  {
    value: "10+",
    label: "Core Technologies",
    description: "Mastered modern web frameworks, AI agent SDKs, and cloud pipelines."
  },
  {
    value: "∞",
    label: "Curiosity & Craft",
    description: "Relentless focus on micro-interactions, low latency, and visual perfection."
  }
];

export const PROJECTS: Project[] = [
  {
    id: "ai-meeting-assistant",
    title: "Nexus AI Meeting Copilot",
    category: "ai",
    categoryLabel: "AI & Agents",
    tagline: "Real-time speech-to-intent analysis with autonomous action extraction",
    description: "An enterprise-grade meeting intelligence platform that transcribes live audio streams, generates structured semantic summaries, and orchestrates post-meeting Jira tickets and Slack workflows.",
    longDescription: "Nexus bridges low-latency WebSockets with state-of-the-art LLM streaming to convert messy team audio into crystal-clear action matrices. Built with strict privacy controls, multi-speaker diarization, and vector search over past transcript history.",
    image: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?q=80&w=1200&auto=format&fit=crop",
    tags: ["React", "TypeScript", "Python", "FastAPI", "OpenAI API", "WebSockets", "Tailwind CSS"],
    githubUrl: "https://github.com/example/nexus-ai-copilot",
    liveUrl: "https://nexus-meeting-demo.dev",
    highlights: [
      "Sub-200ms real-time audio chunk processing",
      "Dynamic action-item graph generator",
      "Enterprise SOC-2 compliant vector indexing"
    ],
    metrics: [
      { label: "Latency", value: "<180ms" },
      { label: "Accuracy", value: "98.4%" }
    ]
  },
  {
    id: "sytharia",
    title: "Sytharia Generative Environment",
    category: "creative",
    categoryLabel: "Creative Web",
    tagline: "Audio-reactive GLSL shader synthesis & interactive spatial canvas",
    description: "A hardware-accelerated creative canvas combining custom WebGL shaders, procedural geometry generation, and real-time audio FFT analysis to generate generative visuals.",
    longDescription: "Sytharia is an exploratory digital playground built for audiovisual performances. It compiles custom GLSL fragment shaders on the fly, driven by frequency analysis from Web Audio API nodes.",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop",
    tags: ["WebGL", "Three.js", "GLSL", "React", "TypeScript", "Web Audio API", "Tailwind"],
    githubUrl: "https://github.com/example/sytharia",
    liveUrl: "https://sytharia.design",
    featured: true,
    highlights: [
      "Real-time 60fps procedural raymarching on GPU",
      "Dynamic audio reactive parameter routing",
      "Lossless 4K canvas export engine"
    ],
    metrics: [
      { label: "FPS", value: "60 FPS" },
      { label: "Shader Pass", value: "Multi-buffer" }
    ]
  },
  {
    id: "developer-dashboard",
    title: "Krypton Cloud Telemetry",
    category: "fullstack",
    categoryLabel: "Full Stack",
    tagline: "High-throughput serverless observability & edge metrics engine",
    description: "A centralized dashboard for monitoring edge functions, API latencies, and distributed error tracing with sub-second live time-series streaming.",
    longDescription: "Krypton aggregates telemetry across distributed microservices into an ultra-responsive, dark-mode analytical suite. Features custom virtualized SVG graphs, alert thresholds, and anomaly detection.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop",
    tags: ["React", "TypeScript", "Node.js", "ClickHouse", "Tailwind CSS", "Recharts", "Docker"],
    githubUrl: "https://github.com/example/krypton-telemetry",
    liveUrl: "https://krypton-dashboard.dev",
    highlights: [
      "Handles 100,000+ data points per second with zero lag",
      "Instant query builder with SQL syntax highlighting",
      "Customizable drag-and-drop widget layout"
    ],
    metrics: [
      { label: "Throughput", value: "100k evt/s" },
      { label: "Render Time", value: "12ms" }
    ]
  },
  {
    id: "rag-knowledge-system",
    title: "Aura Vector Knowledge Engine",
    category: "ai",
    categoryLabel: "AI & Agents",
    tagline: "Multi-tenant hybrid dense/sparse document retrieval with hallucination guardrails",
    description: "A production RAG pipeline that transforms dense technical documentation into verified query responses with source attribution, confidence scoring, and citation graphs.",
    longDescription: "Engineered with semantic chunking strategies, cross-encoder re-ranking, and dynamic prompt synthesis to ensure high accuracy responses for technical teams.",
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1200&auto=format&fit=crop",
    tags: ["Python", "LangChain", "Qdrant", "FastAPI", "React", "TypeScript", "Tailwind"],
    githubUrl: "https://github.com/example/aura-rag-system",
    liveUrl: "https://aura-knowledge.dev",
    highlights: [
      "Hybrid BM25 + dense embedding vector search",
      "Automatic source citation highlighting",
      "Active hallucination filtering layer"
    ],
    metrics: [
      { label: "Recall@5", value: "96.2%" },
      { label: "Search Time", value: "45ms" }
    ]
  },
  {
    id: "discord-automation-bot",
    title: "OmniFlow Automation Engine",
    category: "fullstack",
    categoryLabel: "Full Stack",
    tagline: "Event-driven workflow orchestration with webhooks and autonomous task triggers",
    description: "A resilient backend bot and management UI automating community onboarding, role gating, GitHub sync, and LLM-powered moderation triggers.",
    longDescription: "Built with Node.js and Redis bullmq workers to process tens of thousands of real-time webhooks with automatic retries, rate-limiting, and an interactive web control console.",
    image: "https://images.unsplash.com/photo-1614680376593-902f749f7ffc?q=80&w=1200&auto=format&fit=crop",
    tags: ["Node.js", "Express", "Redis", "Discord.js", "React", "TypeScript", "Tailwind"],
    githubUrl: "https://github.com/example/omniflow-bot",
    liveUrl: "https://omniflow-engine.dev",
    highlights: [
      "Fault-tolerant Redis queue with auto-healing workers",
      "Visual rule-builder interface with live preview",
      "Comprehensive audit trail & telemetry"
    ],
    metrics: [
      { label: "Uptime", value: "99.98%" },
      { label: "Daily Events", value: "2.4M" }
    ]
  },
  {
    id: "creative-web-experience",
    title: "Vortex Kinetic Lab",
    category: "creative",
    categoryLabel: "Creative Web",
    tagline: "Interactive particle dynamics and physics-based pointer choreography",
    description: "An experimental interactive web showcase featuring 50,000 GPU particles reacting to cursor momentum, gravity wells, and spatial audio frequencies.",
    longDescription: "Showcasing the outer limits of browser graphics with custom GLSL compute simulations, custom mouse trail physics, and spring-damper camera kinematics.",
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1200&auto=format&fit=crop",
    tags: ["WebGL", "Three.js", "TypeScript", "GLSL", "React", "Tailwind CSS", "Canvas"],
    githubUrl: "https://github.com/example/vortex-kinetic",
    liveUrl: "https://vortex-lab.dev",
    highlights: [
      "GPU particle simulation via transform feedback",
      "Adaptive quality scaling for mobile devices",
      "Kinetic spring-based inertia mechanics"
    ],
    metrics: [
      { label: "Particles", value: "50,000+" },
      { label: "Target FPS", value: "60 FPS" }
    ]
  }
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: "Frontend Engineering",
    iconName: "Layout",
    description: "Architecting responsive, high-performance interfaces with pixel-perfect design fidelity.",
    skills: [
      { name: "React 18 / 19", level: "Expert", hot: true },
      { name: "TypeScript", level: "Expert", hot: true },
      { name: "Tailwind CSS", level: "Expert", hot: true },
      { name: "Next.js / Vite", level: "Advanced" },
      { name: "JavaScript (ESNext)", level: "Expert" },
      { name: "HTML5 / Semantic", level: "Expert" },
      { name: "CSS Architecture & Animations", level: "Expert" },
      { name: "WebGL / Three.js Basics", level: "Advanced" }
    ]
  },
  {
    title: "Backend & Systems",
    iconName: "Server",
    description: "Designing resilient server architectures, scalable APIs, and secure real-time services.",
    skills: [
      { name: "Node.js", level: "Expert", hot: true },
      { name: "Express.js", level: "Expert" },
      { name: "REST & GraphQL APIs", level: "Expert" },
      { name: "MongoDB & Mongoose", level: "Advanced" },
      { name: "PostgreSQL & Prisma", level: "Advanced" },
      { name: "Firebase & Supabase", level: "Advanced" },
      { name: "WebSockets & Event-Driven", level: "Advanced" },
      { name: "Redis Caching", level: "Advanced" }
    ]
  },
  {
    title: "AI & Machine Learning",
    iconName: "Cpu",
    description: "Engineering autonomous agentic workflows, RAG search systems, and LLM integrations.",
    skills: [
      { name: "Python", level: "Expert", hot: true },
      { name: "RAG Architectures", level: "Advanced", hot: true },
      { name: "LLM APIs (OpenAI, Anthropic, Gemini)", level: "Expert", hot: true },
      { name: "LangChain / LlamaIndex", level: "Advanced" },
      { name: "Autonomous AI Agents", level: "Advanced", hot: true },
      { name: "Vector Databases (Qdrant, Pinecone)", level: "Advanced" },
      { name: "Prompt Engineering & Guardrails", level: "Expert" },
      { name: "FastAPI", level: "Advanced" }
    ]
  },
  {
    title: "DevOps, Tools & Workflow",
    iconName: "Terminal",
    description: "Modern CI/CD, containerization, collaborative tooling, and cloud infrastructure.",
    skills: [
      { name: "Git & GitHub", level: "Expert" },
      { name: "Docker & Containerization", level: "Advanced" },
      { name: "Cloudflare & Edge Deployments", level: "Advanced" },
      { name: "Figma & Design Systems", level: "Advanced" },
      { name: "Vercel / Netlify", level: "Expert" },
      { name: "Postman & API Testing", level: "Expert" },
      { name: "Linux / Bash Scripting", level: "Advanced" },
      { name: "Performance Profiling & Lighthouse", level: "Expert" }
    ]
  }
];

export const TIMELINE: TimelineItem[] = [
  {
    id: "timeline-1",
    role: "Senior Creative Developer & AI Engineer",
    organization: "Autonomous Lab / Tech Studio",
    period: "2024 — PRESENT",
    location: "Remote / Hybrid",
    badge: "Current Focus",
    description: "Leading frontend architecture and autonomous AI integration for flagship client experiences. Built high-throughput RAG search modules, real-time audio interaction pipelines, and custom WebGL liquid hero shaders.",
    technologies: ["React", "TypeScript", "Python", "FastAPI", "OpenAI", "Tailwind CSS", "Three.js"]
  },
  {
    id: "timeline-2",
    role: "Full Stack Engineer",
    organization: "Hyperion Digital Systems",
    period: "2023 — 2024",
    location: "Cairo, Egypt",
    description: "Developed and maintained mission-critical web applications and API microservices. Engineered real-time dashboards processing millions of daily event webhooks with sub-second query latency.",
    technologies: ["React", "Node.js", "Express", "MongoDB", "Redis", "TypeScript", "Docker"]
  },
  {
    id: "timeline-3",
    role: "Frontend Developer & UI Specialist",
    organization: "Nexus Creative Media",
    period: "2022 — 2023",
    location: "Cairo, Egypt",
    description: "Crafted interactive web experiences, design systems, and responsive frontends for consumer brands and technology startups with a core emphasis on micro-interactions and accessibility.",
    technologies: ["JavaScript (ES6+)", "React", "CSS3 / Sass", "Tailwind CSS", "Figma", "Git"]
  },
  {
    id: "timeline-4",
    role: "Software Engineering & Computer Science",
    organization: "Academic Degree & Self-Directed Labs",
    period: "2020 — 2023",
    location: "Cairo, Egypt",
    badge: "Foundation",
    description: "Built foundational mastery across data structures, algorithms, computer graphics, distributed systems, and modern web standards.",
    technologies: ["Data Structures", "Algorithms", "C++", "Python", "Web Standards", "Database Design"]
  }
];

export const SERVICES: ServiceItem[] = [
  {
    id: "web-dev",
    title: "Web Development",
    tagline: "Scalable, blazing-fast web applications with clean architecture",
    description: "End-to-end full-stack development using modern React, TypeScript, Node.js, and Tailwind CSS. Clean component systems, accessible markup, and optimized server interactions.",
    icon: "Globe",
    deliverables: [
      "Custom React / Next.js web applications",
      "Pixel-perfect responsive implementation",
      "API integrations & state management",
      "Zero-overhead performance & SEO tuning"
    ]
  },
  {
    id: "ai-eng",
    title: "AI Engineering & Agents",
    tagline: "Intelligent systems, RAG retrieval & LLM workflow automation",
    description: "Harnessing the latest LLM models, vector embeddings, and autonomous agent frameworks to create smart interfaces, semantic document search, and predictive features.",
    icon: "Cpu",
    deliverables: [
      "Custom RAG vector search pipelines",
      "Autonomous agent workflows & tool calling",
      "Multi-model integrations (OpenAI, Gemini, Anthropic)",
      "Strict hallucination guardrails & prompt optimization"
    ]
  },
  {
    id: "creative-dev",
    title: "Creative Development",
    tagline: "Cinematic digital visual identities, shaders & interactive choreography",
    description: "Creating unforgettable first impressions with custom interactive shaders, fluid masks, 3D physics-based canvases, and micro-interactions that elevate brand perception.",
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
    title: "Workflow Automation & APIs",
    tagline: "Resilient microservices, webhook pipelines & internal tooling",
    description: "Automating complex business logic and communication through robust backend queues, Discord/Slack integrations, and high-performance serverless endpoints.",
    icon: "Zap",
    deliverables: [
      "Event-driven webhook orchestrators",
      "Custom bots and telemetry integrations",
      "RESTful API design & secure auth flows",
      "Automated deployment & monitoring pipelines"
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
