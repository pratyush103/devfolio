'use client';

import React, { useState } from 'react';
import { projectsData } from '@/data/profile';
import { ProjectCategory, ProjectItem } from '@/types';
import { Github, X, CheckCircle2, ArrowUpRight, Activity } from 'lucide-react';

const projectTelemetry: Record<string, { metric1: string; val1: string; metric2: string; val2: string; metric3: string; val3: string }> = {
  'finsight': { metric1: 'Node Latency', val1: '1.42s avg', metric2: 'Ind AS Citation Accuracy', val2: '99.4%', metric3: 'LangSmith Traced Nodes', val3: '6 Nodes' },
  'onpaper': { metric1: 'Order Matching Latency', val1: '<12ms', metric2: 'Memory Footprint', val2: '<38MB RAM', metric3: 'Tick Stream Throughput', val3: '10k/sec' },
  'insight-forge': { metric1: 'Schema Ingestion', val1: '<850ms', metric2: 'Distribution Profiling', val2: '100% Offline', metric3: 'Ollama Model', val3: 'Llama-3-8B' },
  'supply-chain-analytics': { metric1: 'Variance Reduction', val1: '28.5%', metric2: 'Detention Recovery', val2: 'Legally Isolated', metric3: 'Hub Segmentation', val3: 'ABC/XYZ' }
};

const categories: { label: string; value: ProjectCategory }[] = [
  { label: 'All Projects', value: 'all' },
  { label: 'Agentic AI & LLMs', value: 'ai' },
  { label: 'Full-Stack & Trading', value: 'fullstack' },
  { label: 'Supply Chain & Analytics', value: 'analytics' },
];

export default function Projects() {
  const [selectedCat, setSelectedCat] = useState<ProjectCategory>('all');
  const [activeModalProject, setActiveModalProject] = useState<ProjectItem | null>(null);

  const filteredProjects = selectedCat === 'all'
    ? projectsData
    : projectsData.filter((p) => p.category === selectedCat);

  return (
    <section id="projects" className="max-w-6xl mx-auto px-6 py-24 relative z-10">
      <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <span className="font-mono text-xs text-cyanAccent tracking-widest uppercase block mb-2">// 03. Selected Works</span>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Featured Architectures
          </h2>
          <p className="text-slate-400 text-base sm:text-lg mt-3 max-w-2xl">
            Stateful multi-agent systems, low-latency trading simulation engines, and automated statistical intelligence.
          </p>
        </div>

        {/* Category Filters with Sharp Deliberate Radii */}
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setSelectedCat(cat.value)}
              className={`px-3 py-1.5 rounded-md font-mono text-xs font-semibold transition-all ${
                selectedCat === cat.value
                  ? 'bg-[var(--accent-primary)] text-[#030712] shadow-md'
                  : 'bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:border-cyanAccent/30'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Grid with Loud Featured Card Hierarchy */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((proj, idx) => {
          const isFeatured = idx === 0;
          return (
            <div
              key={proj.id}
              onClick={() => setActiveModalProject(proj)}
              className={`p-6 rounded-xl backdrop-blur-xl border transition-all flex flex-col justify-between group cursor-pointer hover:-translate-y-1 ${
                isFeatured
                  ? 'bg-slate-900/80 border-[var(--accent-primary)]/50 shadow-xl shadow-cyanAccent/10 md:col-span-2 lg:col-span-2'
                  : 'bg-slate-900/60 border-white/10 hover:border-cyanAccent/40'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-tealAccent font-semibold bg-tealAccent/10 px-2 py-0.5 rounded-[3px] border border-tealAccent/20">
                    {proj.metrics}
                  </span>
                  {proj.githubUrl && (
                    <span
                      onClick={(e) => {
                        e.stopPropagation();
                        window.open(proj.githubUrl, '_blank', 'noopener,noreferrer');
                      }}
                      className="text-slate-400 hover:text-white transition-colors"
                      title="View GitHub Repository"
                    >
                      <Github className="w-4 h-4" />
                    </span>
                  )}
                </div>

                <h3 className="font-heading text-xl sm:text-2xl font-bold text-white mb-2 group-hover:theme-text-primary transition-colors flex items-center justify-between">
                  <span>{proj.title}</span>
                  <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity theme-text-primary" />
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed mb-6 font-sans">
                  {proj.description}
                </p>
              </div>

              <div className="flex flex-wrap gap-1.5 pt-4 border-t border-white/5">
                {proj.tags.map((tag, tIndex) => (
                  <span
                    key={tIndex}
                    className="text-[11px] font-mono px-2 py-0.5 rounded-[4px] bg-white/5 text-slate-300 border border-white/10"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Architecture Deep-Dive Modal with System Telemetry Strip */}
      {activeModalProject && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md transition-all"
          onClick={() => setActiveModalProject(null)}
        >
          <div
            className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-[#081226] border border-cyanAccent/40 rounded-2xl p-8 shadow-2xl shadow-cyanAccent/20"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveModalProject(null)}
              className="absolute top-6 right-6 w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white transition-all"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="text-xs font-mono uppercase tracking-widest text-tealAccent font-semibold mb-2">
              {activeModalProject.metrics}
            </div>

            <h3 className="font-heading text-2xl sm:text-3xl font-bold text-white mb-4">
              {activeModalProject.title}
            </h3>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6 font-sans">
              {activeModalProject.longDescription || activeModalProject.description}
            </p>

            {/* Live System Telemetry Metrics */}
            {projectTelemetry[activeModalProject.id] && (
              <div className="mb-6 p-4 rounded-xl bg-white/5 border border-white/5">
                <div className="flex items-center gap-2 font-mono text-xs text-cyanAccent uppercase tracking-wider mb-3">
                  <Activity className="w-3.5 h-3.5" />
                  <span>Verified Architecture Telemetry</span>
                </div>
                <div className="grid grid-cols-3 gap-2 font-mono text-center">
                  <div className="p-2 rounded bg-black/30 border border-white/5">
                    <div className="text-[10px] text-slate-400">{projectTelemetry[activeModalProject.id].metric1}</div>
                    <div className="text-xs font-bold text-tealAccent mt-0.5">{projectTelemetry[activeModalProject.id].val1}</div>
                  </div>
                  <div className="p-2 rounded bg-black/30 border border-white/5">
                    <div className="text-[10px] text-slate-400">{projectTelemetry[activeModalProject.id].metric2}</div>
                    <div className="text-xs font-bold text-white mt-0.5">{projectTelemetry[activeModalProject.id].val2}</div>
                  </div>
                  <div className="p-2 rounded bg-black/30 border border-white/5">
                    <div className="text-[10px] text-slate-400">{projectTelemetry[activeModalProject.id].metric3}</div>
                    <div className="text-xs font-bold text-cyanAccent mt-0.5">{projectTelemetry[activeModalProject.id].val3}</div>
                  </div>
                </div>
              </div>
            )}

            {activeModalProject.architectureHighlights && (
              <div className="mb-6">
                <h4 className="font-mono text-xs font-bold theme-text-primary uppercase tracking-wider mb-3">
                  Architecture &amp; Engineering Highlights
                </h4>
                <ul className="space-y-2.5">
                  {activeModalProject.architectureHighlights.map((item, idx) => (
                    <li key={idx} className="text-slate-300 text-sm flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-tealAccent shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="mb-6">
              <h4 className="font-mono text-xs font-bold theme-text-primary uppercase tracking-wider mb-3">
                Stack Components
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {activeModalProject.tags.map((tag, tIdx) => (
                  <span
                    key={tIdx}
                    className="text-xs font-mono px-2.5 py-1 rounded-[4px] bg-white/5 text-slate-300 border border-white/10 font-semibold"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-6 border-t border-white/10">
              {activeModalProject.githubUrl && (
                <a
                  href={activeModalProject.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 rounded-lg font-mono text-xs font-semibold text-white bg-white/10 hover:bg-white/20 border border-white/15 transition-all flex items-center gap-2"
                >
                  <Github className="w-4 h-4" />
                  View Repository
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
