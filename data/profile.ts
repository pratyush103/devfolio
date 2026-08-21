import { ProjectItem, ExperienceItem, SkillCategory, AccoladeItem, CertificationItem } from '@/types';

export const profileData = {
  name: "Pratyush Landekar",
  email: "pratyushlandekar103@gmail.com",
  location: "Mumbai, India",
  tagline: "AI Systems Engineer • MBA Tech (IT & Finance)",
  summary: "Dual-degree candidate in Information Technology Engineering & Management at MPSTME, NMIMS Mumbai. Specializing in multi-agent AI swarms, enterprise data automation pipelines, and high-performance full-stack web applications.",
  github: "https://github.com/pratyush103",
  linkedin: "https://www.linkedin.com/in/pratyush-landekar103",
  cgpa: "3.51 / 4.00",
  institution: "Mukesh Patel School of Technology Management & Engineering (NMIMS)",
  graduationYear: "2027",
};

export const experiencesData: ExperienceItem[] = [
  {
    id: "dow",
    company: "Dow Chemicals",
    role: "Supply Chain Analytics Intern",
    period: "May 2026 – Sept 2026",
    metrics: "Enterprise Forecast Optimization",
    tools: ["Power Automate", "Power Apps", "SAP HANA", "Python", "VBA"],
    points: [
      "Automated Exception Workflows: Engineered cloud-native pipelines (Power Automate, Power Apps) and a governed NLP agent to parse unstructured stakeholder requests into secure, validated data payloads.",
      "Optimized Demand Forecasting: Analyzed multi-lag forecast variances across regional hubs, designing dynamic exception thresholds via ABC/XYZ segmentation to improve inventory positioning and minimize routing latency.",
      "Logistics & Financial Tracking: Redesigned tracking matrices to isolate carrier detention trends, quantifying legally recoverable penalties versus company-absorbed strategic costs to enhance executive financial visibility."
    ]
  },
  {
    id: "analytica",
    company: "ISF Analytica Informatica",
    role: "Software Developer Intern",
    period: "May 2025 – July 2025",
    metrics: "₹1 Cr Commercial Pipeline Demo",
    tools: ["LangChain", "FastAPI", "React", "Python", "OpenAI / Anthropic APIs"],
    points: [
      "Built AI Educational Modules: Developed EasyLearn V3 and Notes Buddy modules for automated K1-12 curriculum authoring, MCQ test generation, RAG-based querying, and intelligent document rewriting.",
      "Client Pitch & Enterprise Demo: Delivered on-site demonstration at a Pune nursing institute, showcasing automated Marathi content generation and custom exam proctoring, helping advance negotiations toward a ₹1 Crore project deal."
    ]
  },
  {
    id: "lbw",
    company: "LBWOnline",
    role: "Web Developer Intern",
    period: "June 2024 – July 2024",
    metrics: "40% Manual Entry Latency Reduction",
    tools: ["Laravel", "MySQL", "PHP", "JavaScript", "Tailwind CSS"],
    points: [
      "Classical Music Platform: Developed a full-stack web application for Indian classical music notations (Laravel + MySQL) with 10+ CRUD features and role-based access control (Admin, Editor, Viewer).",
      "Custom Notation Keyboard: Built an interactive keyboard supporting 50+ unique musical symbols, reducing manual transcription input time by ~40% and adding multilingual lyric integration."
    ]
  }
];

export const projectsData: ProjectItem[] = [
  {
    id: "finsight",
    title: "FinSight",
    description: "Multi-agent educational and financial platform integrating complex architectural workflows, domain-specific insights under Indian Accounting Standards (Ind AS), and automated financial reporting.",
    category: "ai",
    tags: ["LangGraph", "FastAPI", "Next.js", "LangSmith", "Python"],
    githubUrl: "https://github.com/pratyush103",
    iconName: "PieChart",
    metrics: "Multi-Agent Ind AS Architecture",
    longDescription: "FinSight is a production-grade financial analysis ecosystem that coordinates specialized LLM agent nodes to process quarterly statements, verify regulatory compliance under Indian Accounting Standards (Ind AS), and generate audit-ready financial summaries.",
    architectureHighlights: [
      "Hierarchical state graphs with LangGraph orchestrating specialized analyst agents.",
      "Vector search over statutory accounting filings with strict citation grounding.",
      "LangSmith trace instrumentation for latency, token consumption, and agent reasoning telemetry."
    ],
    keyOutcomes: [
      "Automated extraction of financial notes and balance sheet anomalies.",
      "Sub-2s response times via asynchronous FastAPI background workers."
    ]
  },
  {
    id: "onpaper",
    title: "OnPaper",
    description: "High-performance, cross-platform real-time paper trading suite with simulated order books, low-latency market feeds, and interactive portfolio analytics.",
    category: "fullstack",
    tags: ["React + Tauri", ".NET WebAPI", "Azure", "Firebase"],
    githubUrl: "https://github.com/pratyush103",
    iconName: "TrendingUp",
    metrics: "Low-Latency Simulation Engine",
    longDescription: "OnPaper delivers institutional-grade paper trading simulation across desktop and web using Tauri and .NET WebAPI, supporting order matching algorithms, limit/stop executions, and real-time PnL tracking.",
    architectureHighlights: [
      "Tauri desktop wrapper for minimal memory footprint and native OS windowing.",
      "High-throughput .NET 8 WebAPI backend handling in-memory order book matching.",
      "Real-time WebSocket streaming for millisecond tick updates and chart rendering."
    ],
    keyOutcomes: [
      "Zero slippage simulation across multi-asset portfolios.",
      "Cross-platform support across Windows, macOS, and Linux."
    ]
  },
  {
    id: "insight-forge",
    title: "Insight Forge",
    description: "Multi-agent AI dashboard generator featuring autonomous dataset ingestion, schema inference, statistical anomaly detection, and automated interactive visual dashboard rendering.",
    category: "ai",
    tags: ["LangGraph", "Streamlit", "Ollama", "Python"],
    githubUrl: "https://github.com/pratyush103",
    iconName: "Sparkles",
    metrics: "Automated Data Discovery",
    longDescription: "Insight Forge autonomously ingests raw CSV/Parquet datasets, infers statistical relationships and column correlations, and synthesizes dynamic, publication-ready analytics dashboards without manual configuration.",
    architectureHighlights: [
      "Autonomous data profiling agent detecting skewness, missing values, and outliers.",
      "Code generation agent writing executable Plotly and Streamlit visualization code.",
      "Local LLM execution with Ollama for zero-cloud data privacy compliance."
    ],
    keyOutcomes: [
      "Instant automated dashboard generation from raw tabular uploads.",
      "Fully self-hosted and privacy-preserving architecture."
    ]
  },
  {
    id: "supply-chain-analytics",
    title: "Enterprise Supply Chain Forecasting",
    description: "Multi-lag forecast variance analyzer using ABC/XYZ inventory segmentation and automated exception routing designed for large-scale enterprise logistics.",
    category: "analytics",
    tags: ["Power Automate", "Power Apps", "SAP HANA", "Python", "Excel/VBA"],
    githubUrl: "https://github.com/pratyush103",
    iconName: "BarChart3",
    metrics: "ABC/XYZ Segmentation",
    longDescription: "Engineered at Fortune 100 enterprise scale to analyze forecast variance across multi-regional distribution networks, dynamically segmenting SKUs by volatility and automating carrier detention penalty recovery.",
    architectureHighlights: [
      "ABC/XYZ segmentation algorithms classifying inventory positioning priorities.",
      "Power Automate cloud flows integrating SAP HANA enterprise data layers.",
      "Automated NLP parsing of unstructured email logistics requests."
    ],
    keyOutcomes: [
      "Quantified recoverable carrier detention penalties versus absorbed costs.",
      "Significantly reduced inventory misplacement and routing turnaround times."
    ]
  }
];

export const skillsData: SkillCategory[] = [
  {
    title: "Languages",
    icon: "Code",
    skills: ["Python", "SQL", "TypeScript", "JavaScript", "Java", "C# / .NET"]
  },
  {
    title: "AI & Multi-Agent Swarms",
    icon: "Brain",
    skills: ["LangChain", "LangGraph", "MS AutoGen", "Copilot Studio", "LangSmith", "Ollama", "RAG Pipelines"]
  },
  {
    title: "Full-Stack & Web",
    icon: "Layers",
    skills: ["Next.js", "React", "FastAPI", "Node.js", "Streamlit", "Three.js / WebGL", "Tailwind CSS"]
  },
  {
    title: "Cloud & Analytics",
    icon: "Cloud",
    skills: ["Docker", "Azure DevOps", "Google Cloud", "Power BI", "Power Automate", "SAP HANA", "Git / GitHub Actions"]
  }
];

export const accoladesData: AccoladeItem[] = [
  {
    id: "sih-2025",
    title: "Smart India Hackathon 2025 (Shortlisted)",
    description: "Architected an AI-Powered Conversational Interface for ARGO Ocean Data Discovery, real-time spatial slicing, and 3D visual oceanographic mapping.",
    icon: "Trophy",
    tag: "National Hackathon",
    fullOverview: "Selected in the intra-college shortlist for SIH 2025. Designed an interactive conversational AI system capable of parsing complex ARGO float trajectory datasets and rendering volumetric 3D salinity, temperature, and depth profiles in real time.",
    keyContributions: [
      "Built natural language to geospatial SQL query translation for ARGO oceanographic databases.",
      "Implemented Three.js 3D ocean slice visualization for temperature-depth thermocline layers.",
      "Engineered automated anomaly detection for irregular float sensor telemetry."
    ],
    techOrMethodology: ["LangChain", "Three.js", "FastAPI", "PostgreSQL/PostGIS", "Python"]
  },
  {
    id: "sih-2024",
    title: "Smart India Hackathon 2024 (Shortlisted)",
    description: "Designed an Automated Document Verification System combining Ethereum blockchain smart contracts with AI-driven optical character recognition.",
    icon: "Award",
    tag: "National Hackathon",
    fullOverview: "Shortlisted in SIH 2024. Created a decentralized identity and tamper-proof academic credential verification suite integrating OCR text extraction with cryptographic smart contract attestations.",
    keyContributions: [
      "Integrated OCR pipeline with confidence scoring to parse academic transcripts and certificates.",
      "Authored Solidity smart contracts on Ethereum testnet to verify document hashes and issuer signatures.",
      "Constructed React dashboard for institutional administrators to batch-verify credentials."
    ],
    techOrMethodology: ["Solidity", "Ethereum", "Python OCR", "React", "Web3.js"]
  },
  {
    id: "fiscal-growth-paper",
    title: "Fiscal Consolidation & Sectoral Growth",
    description: "Authored an empirical macroeconomic research paper examining India's recent tax reforms and capital efficiency across sectors.",
    icon: "BookOpen",
    tag: "Macroeconomic Research",
    fullOverview: "Conducted extensive macroeconomic regression analysis evaluating the multiplier effects of direct and indirect tax reforms in India on private capital expenditure and industrial output across core manufacturing and services sectors.",
    keyContributions: [
      "Modeled time-series econometric regressions over 10-year fiscal datasets.",
      "Analyzed the elasticity of corporate tax rate cuts on sectoral Capex deployment.",
      "Synthesized policy recommendations for sustainable fiscal deficit reduction without dampening growth."
    ],
    techOrMethodology: ["Econometric Modeling", "Time-Series Regression", "Python", "R", "Excel"]
  },
  {
    id: "carvaan-case-study",
    title: "The Carvaan Conundrum: Nostalgia in Digital Markets",
    description: "Published a business case study analyzing nostalgia-driven product design, consumer adoption, and digital music market disruption.",
    icon: "Scroll",
    tag: "Strategy Case Study",
    fullOverview: "Examined Saregama Carvaan's disruptive physical product strategy in an era dominated by digital streaming platforms like Spotify and Apple Music, analyzing demographic segment targeting and hardware monetization models.",
    keyContributions: [
      "Deconstructed unit economics, hardware gross margins, and pre-loaded content licensing advantages.",
      "Evaluated consumer psychological factors driving retro hardware adoption among elderly demographics.",
      "Formulated strategic recommendations for digital transition and hybrid subscription models."
    ],
    techOrMethodology: ["Strategic Frameworks", "Customer Segmentation", "Market Sizing", "Financial Modeling"]
  }
];

export const certificationsData: CertificationItem[] = [
  { name: "Bloomberg Market Concepts", issuer: "Bloomberg LP" },
  { name: "Python Certification", issuer: "HackerRank" },
  { name: "Introduction to Cloud 101", issuer: "AWS Educate" },
  { name: "Introduction to Front-End Development", issuer: "Coursera / Meta" }
];
