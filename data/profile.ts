import { ProjectItem, ExperienceItem, SkillCategory, AccoladeItem, CertificationItem } from '@/types';

export const profileData = {
  name: "Pratyush Landekar",
  email: "pratyushlandekar103@gmail.com",
  location: "Mumbai, India",
  tagline: "MBA Tech (IT & Finance)",
  summary: "Dual-degree engineering student at MPSTME, NMIMS Mumbai. I love building things with LangGraph, FastAPI, and working on supply chain data models.",
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
    metrics: "ABC/XYZ Variance Segmentation",
    tools: ["Power Automate", "Power Apps", "SAP HANA", "Python", "VBA"],
    points: [
      "Governed NLP agent workflows to convert unstructured logistics emails into SAP-ready records.",
      "Used ABC/XYZ variance segmentation to tighten forecast accuracy across regional hubs."
    ]
  },
  {
    id: "analytica",
    company: "ISF Analytica Informatica",
    role: "Software Developer Intern",
    period: "May 2025 – July 2025",
    metrics: "₹1 Cr Project Pitch & Demonstration",
    tools: ["LangChain", "FastAPI", "React", "Python", "RAG"],
    points: [
      "Developed automated curriculum and quiz generation features for EasyLearn V3 and Notes Buddy using LangChain RAG pipelines.",
      "Gave a live technical demo at a Pune nursing institute, showing off our automated Marathi medical content generation."
    ]
  },
  {
    id: "lbw",
    company: "LBWOnline",
    role: "Web Developer Intern",
    period: "June 2024 – July 2024",
    metrics: "40% Transcription Latency Reduction",
    tools: ["Laravel", "MySQL", "PHP", "JavaScript", "Tailwind CSS"],
    points: [
      "Built a full-stack Indian classical music notation platform (Laravel + MySQL) with role-based access controls for Admin, Editor, and Viewer tiers.",
      "Developed a custom virtual notation keyboard supporting 50+ Sargam musical glyphs, reducing manual notation entry latency by ~40%."
    ]
  }
];

export const projectsData: ProjectItem[] = [
  {
    id: "finsight",
    title: "FinSight",
    description: "Multi-agent research platform using LLMs to parse and organize statutory filings with accurate citations.",
    scope: "Personal Build",
    category: "ai",
    tags: ["LangGraph", "FastAPI", "Next.js", "LangSmith", "Python"],
    githubUrl: "https://github.com/pratyush103",
    iconName: "PieChart",
    metrics: "LangGraph Powered",
    longDescription: "FinSight uses LangGraph to coordinate different AI agents, delegating tasks like note verification and cash-flow checks to specialized agent nodes.",
    architectureHighlights: [
      "Hierarchical state graphs with LangGraph managing inter-agent consensus and verification loops.",
      "Strict citation-grounded RAG over statutory Ind AS accounting disclosures.",
      "LangSmith trace instrumentation tracking token overhead and agent latency."
    ],
    keyOutcomes: [
      "Automated extraction of financial statement footnotes and hidden debt disclosures.",
      "Sub-2s response latency via asynchronous FastAPI worker pools."
    ]
  },
  {
    id: "onpaper",
    title: "OnPaper",
    description: "Cross-platform paper trading suite combining a native Tauri desktop container with an in-memory .NET 8 WebAPI matching engine for low-latency simulation.",
    scope: "Personal Build",
    category: "fullstack",
    tags: ["React + Tauri", ".NET 8 WebAPI", "Azure", "WebSocket"],
    githubUrl: "https://github.com/pratyush103",
    iconName: "TrendingUp",
    metrics: "In-Memory .NET Matching Engine",
    longDescription: "OnPaper runs simulated order books with limit/stop execution algorithms and live WebSocket market feeds, delivering desktop-native execution performance with zero memory bloat.",
    architectureHighlights: [
      "Tauri desktop wrapper delivering native OS windowing with <40MB RAM usage.",
      "High-throughput .NET 8 WebAPI backend handling in-memory order book matching.",
      "Sub-millisecond local tick streaming and portfolio equity calculations."
    ],
    keyOutcomes: [
      "Zero-slippage order matching simulation across multi-asset portfolios.",
      "Cross-platform parity across Windows, macOS, and Linux."
    ]
  },
  {
    id: "insight-forge",
    title: "Insight Forge",
    description: "An intelligent pipeline that automatically profiles tabular data and generates interactive visualizations, saving you from manual setup.",
    scope: "Hackathon Entry",
    category: "ai",
    tags: ["LangGraph", "Streamlit", "Ollama", "Python"],
    githubUrl: "https://github.com/pratyush103",
    iconName: "Sparkles",
    metrics: "Automated Data Profiling",
    longDescription: "Insight Forge takes raw CSV/Parquet uploads, runs some statistical analysis, and generates helpful Plotly/Streamlit dashboards using local Ollama LLMs.",
    architectureHighlights: [
      "Autonomous data profiling agent detecting missing value correlations and outliers.",
      "Code generation agent writing executable Plotly data visualizations.",
      "Local LLM execution with Ollama ensuring zero-cloud privacy compliance."
    ],
    keyOutcomes: [
      "Instant automated dashboard compilation from raw tabular datasets.",
      "Fully self-hosted and privacy-compliant architecture."
    ]
  },
  {
    id: "supply-chain-analytics",
    title: "Enterprise Demand Forecasting",
    description: "Forecast variance analyzer using inventory segmentation and automated exception routing for enterprise logistics.",
    scope: "Internship Deliverable",
    category: "analytics",
    tags: ["Power Automate", "SAP HANA", "Python", "Excel/VBA"],
    githubUrl: "https://github.com/pratyush103",
    iconName: "BarChart3",
    metrics: "Supply Chain Analytics",
    longDescription: "Built during my internship at Dow to analyze forecast accuracy across regional hubs and automate carrier penalty tracking.",
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
