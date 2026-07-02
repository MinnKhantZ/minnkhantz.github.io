export const DEV_PROFILE = {
  name: "Min Khant Zaw",
  title: "Software Engineer",
  bio: "I'm a software engineer focused on React, React Native, and Node.js. I build production-ready web and mobile products with practical AI features, clean APIs, and infrastructure that solves real business problems.",
  email: "minkhankzaw2543@gmail.com",
  github: "https://github.com/MinnKhantZ",
  linkedin: "https://www.linkedin.com/in/min-khant-zaw-58b69021b",
  resumeUrl: "/documents/MinKhantZaw_FullStackDeveloper_Resume.pdf",
  stats: [
    { label: "Years Experience", value: "2+" },
    { label: "Projects Delivered", value: "10+" },
    { label: "Technologies Used", value: "20+" },
    { label: "Apps Published", value: "4+" }
  ]
};

export const PROJECTS = [
  {
    id: "pandora-ecommerce",
    title: "Pandora Ecommerce",
    category: "SaaS / Enterprise",
    description: "SaaS e-commerce platform serving 100+ registered businesses from a single codebase with multi-tenant architecture, AI translations, dynamic theme customization, and automated CI/CD.",
    tags: ["React", "Node.js", "MySQL", "GitHub Actions", "OpenAI API", "Cloudflare"],
    demoUrl: "https://pcom.shop/",
    githubUrl: null,
    videoUrl: null,
    playStoreUrl: null,
    appStoreUrl: null,
    featured: true,
    accent: "from-cyan-500 to-blue-600",
    image: "/images/pandora_ecommerce.png",
    highlights: [
      "Multi-tenant architecture – 100+ businesses from single codebase; onboarding in <2 minutes",
      "AI-powered multi-language – supports 20+ languages per tenant, 95% less translation effort",
      "Dynamic theme customization – 100% self-service branding, no dev intervention",
      "Draft preview logic – publishing errors reduced by 60%",
      "Cloudflare Workers + Pages – custom domain binding, 10x faster domain setup",
      "GitHub Actions automation – deployment per business from 30 minutes to 30 seconds"
    ]
  },
  {
    id: "easy2success",
    title: "Easy2Success",
    category: "Mobile",
    description: "Youth empowerment app with AI-powered goal reviews, device-based lifetime subscriptions, timezone-aware push notifications, and a desktop electron companion for course videos.",
    tags: ["React Native", "Node.js", "MySQL", "Redis", "Cloudflare R2", "OpenAI API", "Electron"],
    demoUrl: null,
    githubUrl: null,
    videoUrl: null,
    playStoreUrl: "https://play.google.com/store/apps/details?id=com.pandoratech.easy2success",
    appStoreUrl: "https://apps.apple.com/us/app/easy2success/id6496866939",
    featured: true,
    accent: "from-purple-500 to-pink-600",
    image: "/images/easy2success.png",
    highlights: [
      "Device-based lifetime VIP – 0% unauthorized subscription sharing",
      "Timezone-localized scheduled push notifications – supports all 24 time zones, 90% less manual work",
      "AI goal reviews – user goal completion rate increased by 35%",
      "Badges, achievements & weekly rankings – retention improved by 25%",
      "Screenshot control from dashboard – course video redistribution reduced by 70%",
      "Desktop Electron app – 2.5x faster course completion"
    ]
  },
  {
    id: "hein-pharmacy",
    title: "Hein Pharmacy",
    category: "SaaS / Enterprise",
    description: "Mobile-first pharmacy POS & management system with multi-owner profit calculation, custom Bluetooth ESC/POS printing, and an Electron printing agent for desktop receipt printing.",
    tags: ["React Native", "Node.js", "PostgreSQL", "Docker", "Cloudflare R2", "AWS EC2", "Electron"],
    demoUrl: null,
    githubUrl: null,
    videoUrl: "/videos/hein_pharmacy.mp4",
    playStoreUrl: null,
    appStoreUrl: null,
    featured: true,
    accent: "from-green-500 to-teal-600",
    image: "/images/hein_pharmacy.png",
    highlights: [
      "Multi-owner profit calculation – month-end dividend dropped from 3 days to 15 minutes",
      "Custom ESC/POS Bluetooth printing module – 100% hardware compatibility",
      "React Native Web + Electron – reused 95% of mobile codebase, saved ~200 hours",
      "R2 worker proxy for ISP-bypass in Myanmar – 100% upload success"
    ]
  },
  {
    id: "visuradb",
    title: "VisuraDB",
    category: "AI & Tools",
    description: "AI-powered database management tool with multi-database adapter supporting 10+ database types, visual ER diagrams, AI query builder, and real-time dashboard visualization.",
    tags: ["React", "Node.js", "OpenAI API", "MySQL", "PostgreSQL", "MongoDB", "Redis"],
    demoUrl: "https://minnkhantz.github.io/visuradb/",
    githubUrl: "https://github.com/MinnKhantZ/visuradb",
    videoUrl: null,
    playStoreUrl: null,
    appStoreUrl: null,
    featured: true,
    accent: "from-indigo-500 to-purple-600",
    image: "/images/visuradb.png",
    highlights: [
      "Dynamic adapter layer supporting 10+ database types with a unified API",
      "Click-based UI editor — manage databases without writing SQL or NoSQL commands",
      "AI natural language to database-specific query conversion",
      "Auto-rendered ER diagrams from any connected database schema",
      "Published npm CLI tool for cross-database management"
    ]
  },
  {
    id: "textilecv",
    title: "TextileCV",
    category: "AI & Tools",
    description: "AI-powered RAG pipeline that ingests user experience and generates tailored resumes, cover letters, and STAR answers in under 30 seconds with ATS-friendly LaTeX output.",
    tags: ["React", "LangChain", "RAG", "OpenAI Embeddings", "ChromaDB", "LaTeX"],
    demoUrl: "https://minnkhantz.github.io/textilecv/",
    githubUrl: "https://github.com/MinnKhantZ/textilecv",
    videoUrl: null,
    playStoreUrl: null,
    appStoreUrl: null,
    featured: false,
    accent: "from-amber-500 to-orange-600",
    image: "/images/textile_cv.png",
    highlights: [
      "RAG pipeline with semantic search for relevant skill extraction",
      "ATS-friendly LaTeX resume and cover letter generator",
      "Published npm CLI tool for command-line usage"
    ]
  },
  {
    id: "amberquiz",
    title: "AmberQuiz",
    category: "Full Stack",
    description: "Real-time quiz platform with live quiz sessions via Socket.io supporting 500+ concurrent students, role-based auth, and per-quiz analytics for teachers.",
    tags: ["React", "Node.js", "Prisma", "PostgreSQL", "Socket.io"],
    demoUrl: "https://amber-quiz.vercel.app/",
    githubUrl: "https://github.com/MinnKhantZ/amber-quiz",
    videoUrl: null,
    playStoreUrl: null,
    appStoreUrl: null,
    featured: false,
    accent: "from-rose-500 to-red-600",
    image: "/images/amber_quiz.PNG",
    highlights: [
      "Real-time quiz sessions via Socket.io with sub-100ms latency",
      "Per-quiz analytics dashboard for tracking student performance",
      "JWT authentication with teacher and student role management"
    ]
  },
  {
    id: "nextecom",
    title: "Next Ecom",
    category: "Full Stack",
    description: "AI-powered fashion e-commerce with virtual try-on. Users upload their photos to see how clothes look on them before purchasing.",
    tags: ["Next.js", "Prisma", "PostgreSQL", "OAuth", "OpenAI API", "Vercel"],
    demoUrl: "https://next-ecom-sigma.vercel.app/",
    githubUrl: "https://github.com/MinnKhantZ/next-ecom",
    videoUrl: null,
    playStoreUrl: null,
    appStoreUrl: null,
    featured: false,
    accent: "from-pink-500 to-rose-600",
    image: "/images/fashin_shop.png",
    highlights: [
      "AI Virtual Try-On — users upload photos to preview clothes virtually",
      "OAuth authentication with Google and GitHub",
      "Built from scratch with Next.js and Prisma"
    ]
  },
  {
    id: "metricfit",
    title: "MetricFit",
    category: "Mobile",
    description: "Fitness tracker app with calories, exercise, and steps tracking, auto-calculated daily goals based on health profiles, and streak tracking.",
    tags: ["React Native", "Node.js", "PostgreSQL"],
    demoUrl: null,
    githubUrl: null,
    videoUrl: "/videos/metricfit.mp4",
    playStoreUrl: null,
    appStoreUrl: null,
    featured: false,
    accent: "from-emerald-500 to-teal-600",
    image: "/images/metricfit.png",
    highlights: [
      "Auto-calculated daily nutrition and workout targets from health profile",
      "Pedometer-based step tracking using device sensor",
      "Goal system with streak tracking and data visualizations"
    ]
  },
  {
    id: "tumbuddy",
    title: "TUM Buddy",
    category: "Mobile",
    description: "Campus companion app with event tracking, timetables, marketplace, club features, and an interactive campus map powered by Google Maps API.",
    tags: ["React Native", "Node.js", "PostgreSQL", "Google Maps API"],
    demoUrl: null,
    githubUrl: "https://github.com/MinnKhantZ/tum-buddy",
    videoUrl: "/videos/tum_buddy.mp4",
    playStoreUrl: null,
    appStoreUrl: null,
    featured: false,
    accent: "from-blue-500 to-cyan-600",
    image: "/images/tum_buddy.png",
    highlights: [
      "Interactive campus map with Google Maps API integration",
      "Event tracking, timetable, marketplace, and club features",
      "Push notification reminders for campus events"
    ]
  },
  {
    id: "noteai",
    title: "NoteAI",
    category: "Mobile",
    description: "AI-powered note-taking app with smart suggestions, grammar review, and writing continuation. Features search by text, tags, folders, and archives.",
    tags: ["React Native", "Node.js", "OpenAI API"],
    demoUrl: null,
    githubUrl: "https://github.com/MinnKhantZ/noteai",
    videoUrl: "/videos/note_ai.mp4",
    playStoreUrl: null,
    appStoreUrl: null,
    featured: false,
    accent: "from-violet-500 to-purple-600",
    image: "/images/note_ai.png",
    highlights: [
      "AI-powered suggestions, grammar review, and continue writing",
      "Note management with search by text, tags, folders, and archives",
      "Local-first storage with CRUD operations"
    ]
  }
];

export const SKILL_CATEGORIES = [
  {
    name: "Frontend & Mobile",
    skills: [
      { name: "React / Next.js", level: 88 },
      { name: "React Native / Expo", level: 90 },
      { name: "TypeScript / State Management", level: 78 }
    ]
  },
  {
    name: "Backend & Systems",
    skills: [
      { name: "Node.js / Express", level: 92 },
      { name: "REST APIs / WebSockets", level: 87 },
      { name: "Auth / Multi-tenant SaaS", level: 88 }
    ]
  },
  {
    name: "AI Product Engineering",
    skills: [
      { name: "OpenAI API Integration", level: 88 },
      { name: "RAG / LangChain / Vector Search", level: 84 },
      { name: "AI Automation Features", level: 86 }
    ]
  },
  {
    name: "Cloud & DevOps",
    skills: [
      { name: "Cloudflare Workers / R2 / Pages", level: 88 },
      { name: "GitHub Actions / CI-CD", level: 84 },
      { name: "AWS / Docker / Vercel", level: 78 }
    ]
  }
];

export const EXPERIENCE = [
  {
    period: "Dec 2024 – Present",
    role: "Full Stack Developer",
    company: "Pandora Technology",
    description: "Building production-ready applications from concept to deployment. Working across the full stack with React, React Native, and Node.js, specializing in advanced architecture patterns, AI/Cloud integrations, and system design.",
    highlights: [
      "Engineered multi-tenant SaaS e-commerce serving 100+ businesses from a single codebase",
      "Developed AI-powered features including goal reviews, language translations, and RAG pipelines",
      "Implemented device-based subscription locking reducing unauthorized sharing to 0%",
      "Built automated CI/CD with GitHub Actions cutting deployment time from 30 min to 30 sec",
      "Created Cloudflare worker proxy bypassing ISP restrictions for 100% upload success in Myanmar"
    ]
  }
];

export const EDUCATION = [
  {
    period: "2022 – 2028",
    degree: "B.Eng (Information Technology)",
    institution: "Technological University Mandalay, Myanmar",
    description: "Specializing in full-stack development, distributed systems, and cloud fundamentals."
  }
];

export const CERTIFICATIONS = [
  {
    title: "Introduction to Agile Development and Scrum",
    org: "Coursera - IBM",
    date: "Nov 2025",
    description: "Agile methodologies, Scrum framework, and project management.",
    url: "https://www.coursera.org/account/accomplishments/records/TQJVNQGNVSBN"
  },
  {
    title: "Machine Learning Specialization",
    org: "Coursera - DeepLearning.AI",
    date: "Nov 2025",
    description: "Deep learning fundamentals, neural networks, and AI applications.",
    url: "https://www.coursera.org/account/accomplishments/specialization/7GOHV4CKVF0W"
  },
  {
    title: "Python for Everybody",
    org: "Coursera - University of Michigan",
    date: "Sep 2025",
    description: "Python programming fundamentals, data structures, and algorithms.",
    url: "https://coursera.org/share/249c37238223a68e8464e523462b8c42"
  },
  {
    title: "Information Security",
    org: "freeCodeCamp",
    date: "Oct 2024",
    description: "Security best practices for web apps and APIs.",
    url: "https://freecodecamp.org/certification/minkhankzaw2543/information-security-v7"
  },
  {
    title: "Back End Development and APIs",
    org: "freeCodeCamp",
    date: "Oct 2024",
    description: "Node.js, Express, REST APIs, databases, auth.",
    url: "https://freecodecamp.org/certification/minkhankzaw2543/back-end-development-and-apis"
  },
  {
    title: "Front End Development Libraries",
    org: "freeCodeCamp",
    date: "Nov 2023",
    description: "React, Redux, UI libraries, component patterns.",
    url: "https://freecodecamp.org/certification/minkhankzaw2543/front-end-development-libraries"
  },
  {
    title: "JavaScript Algorithms and Data Structures",
    org: "freeCodeCamp",
    date: "Aug 2023",
    description: "ES6+, data structures, algorithms, problem solving.",
    url: "https://freecodecamp.org/certification/minkhankzaw2543/javascript-algorithms-and-data-structures"
  },
  {
    title: "Responsive Web Design",
    org: "freeCodeCamp",
    date: "Dec 2021",
    description: "Semantic HTML, modern CSS, accessibility, responsive layouts.",
    url: "https://freecodecamp.org/certification/minkhankzaw2543/responsive-web-design"
  }
];
