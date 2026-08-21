'use client';

import React, { useState } from 'react';
import { skillsData, certificationsData } from '@/data/profile';
import { Code, Brain, Layers, Cloud, ShieldCheck, Sparkles, CheckCircle2 } from 'lucide-react';

const iconMap = {
  Code: Code,
  Brain: Brain,
  Layers: Layers,
  Cloud: Cloud,
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
            Skills & Competencies
          </h2>
          <p className="text-slate-400 text-base sm:text-lg mt-3 max-w-2xl">
            Proficiencies across multi-agent AI frameworks, full-stack architectures, and enterprise analytics.
          </p>
        </div>

        {/* Tab Pills */}
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
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === tab.id
                  ? 'bg-cyanAccent text-primary shadow-md shadow-cyanAccent/20'
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
          const IconComp = iconMap[cat.icon as keyof typeof iconMap] || Code;
          return (
            <div
              key={index}
              className="p-6 rounded-2xl bg-slate-900/60 backdrop-blur-xl border border-cyanAccent/20 hover:border-cyanAccent/50 transition-all"
            >
              <div className="flex items-center gap-3 mb-5 font-heading text-lg font-bold text-white">
                <IconComp className="w-5 h-5 text-tealAccent" />
                <span>{cat.title}</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {cat.skills.map((skill, sIndex) => {
                  const detail = skillDetails[skill];
                  return (
                    <div
                      key={sIndex}
                      className="p-3 rounded-xl bg-white/5 border border-white/5 hover:border-cyanAccent/40 hover:bg-cyanAccent/5 transition-all group"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-semibold text-white group-hover:text-cyanAccent transition-colors">
                          {skill}
                        </span>
                        {detail && (
                          <span className="text-[10px] font-mono text-tealAccent uppercase">
                            {detail.role}
                          </span>
                        )}
                      </div>
                      {detail && (
                        <p className="text-[11px] text-slate-400 mt-1 leading-snug">
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

      {/* Certifications Row */}
      <div className="p-6 rounded-2xl bg-slate-900/60 backdrop-blur-xl border border-cyanAccent/20">
        <div className="flex items-center gap-3 mb-4 font-heading text-lg font-bold text-white">
          <ShieldCheck className="w-5 h-5 text-cyanAccent" />
          <span>Professional Certifications</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {certificationsData.map((cert, cIdx) => (
            <div key={cIdx} className="p-3.5 rounded-xl bg-white/5 border border-white/5 hover:border-cyanAccent/30 transition-all">
              <div className="text-sm font-semibold text-white">{cert.name}</div>
              <div className="text-xs text-slate-400 mt-1">{cert.issuer}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
