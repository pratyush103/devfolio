'use client';

import React, { useState } from 'react';
import { skillsData, certificationsData } from '@/data/profile';
import { ShieldCheck } from 'lucide-react';

const domainHeaders: Record<string, string> = {
  'Languages': '[SYS::LANGUAGES]',
  'AI & Multi-Agent Swarms': '[AI::AGENT_SWARMS]',
  'Full-Stack & Web': '[WEB::FULLSTACK]',
  'Cloud & Analytics': '[OPS::CLOUD_ANALYTICS]',
};

const skillDetails: Record<string, { role: string; context: string }> = {
  'Python': { role: 'Core Language', context: 'FastAPI, LangGraph, Pandas & AI automation scripts' },
  'SQL': { role: 'Database', context: 'PostgreSQL relational schemas, indexing & queries' },
  'TypeScript': { role: 'Frontend & APIs', context: 'Next.js 14, React components & type-safe schemas' },
  'JavaScript': { role: 'Web Stack', context: 'Modern ES6+, WebGL Three.js & Node.js runtimes' },
  'Java': { role: 'Systems', context: 'Object-oriented patterns & algorithmic workflows' },
  'C# / .NET': { role: 'High Throughput', context: '.NET 8 WebAPI & in-memory order-book simulation' },
  'LangChain': { role: 'Agent Framework', context: 'Retrieval augmented generation (RAG) & tool chaining' },
  'LangGraph': { role: 'Multi-Agent Swarms', context: 'Stateful multi-agent consensus & cyclical workflows' },
  'MS AutoGen': { role: 'Multi-Agent Chat', context: 'Conversational agent swarms & task delegation' },
  'Copilot Studio': { role: 'Enterprise AI', context: 'Enterprise copilot bots & governed workflows' },
  'LangSmith': { role: 'LLM Telemetry', context: 'Agent latency tracing, evaluation & token metrics' },
  'Ollama': { role: 'Local Inference', context: 'Privacy-first offline LLM inference & quantized models' },
  'RAG Pipelines': { role: 'Semantic Search', context: 'Vector databases, chunking & citation grounding' },
  'Next.js': { role: 'React Framework', context: 'App router, SSR/SSG & full-stack API routes' },
  'React': { role: 'UI Library', context: 'Interactive hooks, state machines & Framer Motion' },
  'FastAPI': { role: 'Python API', context: 'Async endpoints, Pydantic validation & OpenAPI' },
  'Node.js': { role: 'Backend Engine', context: 'Microservices & event-driven architecture' },
  'Streamlit': { role: 'Data Apps', context: 'Interactive analytics dashboards & rapid AI prototypes' },
  'Three.js / WebGL': { role: '3D Graphics', context: 'Custom particle shaders & 3D canvas physics' },
  'Tailwind CSS': { role: 'Styling', context: 'Responsive design systems & glassmorphic themes' },
  'Docker': { role: 'Containerization', context: 'Multi-stage builds & container orchestration' },
  'Azure DevOps': { role: 'CI/CD Pipelines', context: 'Automated testing, building & deployment flows' },
  'Google Cloud': { role: 'Cloud Platform', context: 'Cloud run services, buckets & IAM policies' },
  'Power BI': { role: 'Data Visualization', context: 'Executive KPI reporting & dimensional modeling' },
  'Power Automate': { role: 'Cloud Automation', context: 'Enterprise exception routing & data pipelines' },
  'SAP HANA': { role: 'Enterprise ERP', context: 'Logistics tracking data layers & querying' },
  'Git / GitHub Actions': { role: 'Version Control', context: 'Branch workflows, automated linting & releases' }
};

export default function Skills() {
  const [activeTab, setActiveTab] = useState<string>('all');

  const filteredCategories = activeTab === 'all'
    ? skillsData
    : skillsData.filter((c) => c.title.toLowerCase().includes(activeTab.toLowerCase()));

  return (
    <section id="skills" className="max-w-6xl mx-auto px-6 py-24 relative z-10">
      <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <span className="font-mono text-xs text-cyanAccent tracking-widest uppercase block mb-2">// 04. Technical Arsenal</span>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Skills &amp; Competencies
          </h2>
          <p className="text-slate-400 text-base sm:text-lg mt-3 max-w-2xl">
            Proficiencies across multi-agent AI frameworks, full-stack architectures, and enterprise analytics.
          </p>
        </div>

        {/* Tab Pills with Sharp Geometric Radii */}
        <div className="flex flex-wrap gap-2">
          {[
            { label: 'All Skills', id: 'all' },
            { label: 'Languages', id: 'languages' },
            { label: 'AI & Agents', id: 'ai' },
            { label: 'Full-Stack', id: 'full-stack' },
            { label: 'Cloud & Analytics', id: 'cloud' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-3 py-1.5 rounded-md font-mono text-xs font-semibold transition-all ${
                activeTab === tab.id
                  ? 'bg-[var(--accent-primary)] text-[#030712] shadow-md'
                  : 'bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:border-cyanAccent/30'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {filteredCategories.map((cat, index) => {
          const headerTag = domainHeaders[cat.title] || `[DOMAIN::${cat.title.toUpperCase()}]`;
          return (
            <div
              key={index}
              className="p-6 rounded-xl bg-slate-900/60 backdrop-blur-xl border border-white/10 hover:border-cyanAccent/40 transition-all"
            >
              <div className="flex items-center justify-between gap-3 mb-5 font-mono text-xs text-tealAccent border-b border-white/5 pb-2">
                <span className="font-bold tracking-wider">{headerTag}</span>
                <span className="text-slate-500">{cat.title}</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {cat.skills.map((skill, sIndex) => {
                  const detail = skillDetails[skill];
                  return (
                    <div
                      key={sIndex}
                      className="p-3 rounded-lg bg-white/5 border border-white/5 hover:border-cyanAccent/40 hover:bg-cyanAccent/5 transition-all group"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-white group-hover:theme-text-primary transition-colors">
                          {skill}
                        </span>
                        {detail && (
                          <span className="text-[9px] font-mono text-tealAccent uppercase">
                            {detail.role}
                          </span>
                        )}
                      </div>
                      {detail && (
                        <p className="text-[10px] text-slate-400 mt-1 leading-snug font-sans">
                          {detail.context}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Certifications Row with Sharp Geometric Radii */}
      <div className="p-6 rounded-xl bg-slate-900/60 backdrop-blur-xl border border-white/10">
        <div className="flex items-center gap-2 mb-4 font-mono text-xs font-bold text-white uppercase tracking-wider">
          <ShieldCheck className="w-4 h-4 theme-text-primary" />
          <span>[CERTIFICATIONS::VERIFIED]</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
          {certificationsData.map((cert, cIdx) => (
            <div key={cIdx} className="p-3 rounded-lg bg-white/5 border border-white/5 hover:border-cyanAccent/30 transition-all font-mono">
              <div className="text-xs font-semibold text-white">{cert.name}</div>
              <div className="text-[10px] text-slate-400 mt-0.5">{cert.issuer}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
