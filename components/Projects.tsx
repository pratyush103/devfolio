'use client';

import React, { useState } from 'react';
import { projectsData } from '@/data/profile';
import { ProjectCategory, ProjectItem } from '@/types';
import { Github, PieChart, TrendingUp, Sparkles, BarChart3, X, ExternalLink, CheckCircle2, ChevronRight } from 'lucide-react';

const iconMap = {
  PieChart: PieChart,
  TrendingUp: TrendingUp,
  Sparkles: Sparkles,
  BarChart3: BarChart3,
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
            Featured Projects
          </h2>
          <p className="text-slate-400 text-base sm:text-lg mt-3 max-w-2xl">
            Multi-agent AI platforms, low-latency trading engines, and enterprise anomaly detection. Click any card to inspect system architecture.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setSelectedCat(cat.value)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                selectedCat === cat.value
                  ? 'bg-cyanAccent text-primary shadow-md shadow-cyanAccent/20'
                  : 'bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:border-cyanAccent/30'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((proj) => {
          const IconComp = iconMap[proj.iconName as keyof typeof iconMap] || Sparkles;
          return (
            <div
              key={proj.id}
              onClick={() => setActiveModalProject(proj)}
              className="p-6 rounded-2xl bg-slate-900/60 backdrop-blur-xl border border-cyanAccent/20 hover:border-cyanAccent/50 transition-all flex flex-col justify-between group hover:-translate-y-1 hover:shadow-xl hover:shadow-cyanAccent/10 cursor-pointer"
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="w-11 h-11 rounded-xl bg-cyanAccent/10 border border-cyanAccent/30 flex items-center justify-center text-cyanAccent group-hover:scale-105 transition-transform">
                    <IconComp className="w-5 h-5" />
                  </div>
                  {proj.githubUrl && (
                    <span
                      onClick={(e) => {
                        e.stopPropagation();
                        window.open(proj.githubUrl, '_blank', 'noopener,noreferrer');
                      }}
                      className="text-slate-400 hover:text-cyanAccent transition-colors"
                      title="View GitHub Repository"
                    >
                      <Github className="w-5 h-5" />
                    </span>
                  )}
                </div>

                <div className="text-[11px] font-mono uppercase tracking-wider text-tealAccent font-semibold mb-1">
                  {proj.metrics}
                </div>

                <h3 className="font-heading text-xl font-bold text-white mb-3 group-hover:text-cyanAccent transition-colors flex items-center justify-between">
                  <span>{proj.title}</span>
                  <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity text-cyanAccent" />
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-6">
                  {proj.description}
                </p>
              </div>

              <div className="flex flex-wrap gap-2 pt-4 border-t border-white/5">
                {proj.tags.map((tag, tIndex) => (
                  <span
                    key={tIndex}
                    className="text-xs font-mono px-2.5 py-1 rounded-md bg-cyanAccent/10 text-cyanAccent border border-cyanAccent/20"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Architecture Deep-Dive Modal */}
      {activeModalProject && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md transition-all"
          onClick={() => setActiveModalProject(null)}
        >
          <div
            className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-[#081226] border border-cyanAccent/40 rounded-3xl p-8 shadow-2xl shadow-cyanAccent/20"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveModalProject(null)}
              className="absolute top-6 right-6 w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-all"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-xs font-mono uppercase tracking-widest text-tealAccent font-semibold mb-2">
              {activeModalProject.metrics}
            </div>

            <h3 className="font-heading text-2xl sm:text-3xl font-bold text-white mb-4">
              {activeModalProject.title}
            </h3>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6">
              {activeModalProject.longDescription || activeModalProject.description}
            </p>

            {activeModalProject.architectureHighlights && (
              <div className="mb-6">
                <h4 className="font-heading text-sm font-bold text-cyanAccent uppercase tracking-wider mb-3">
                  Architecture & Engineering Highlights
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
              <h4 className="font-heading text-sm font-bold text-cyanAccent uppercase tracking-wider mb-3">
                Tech Stack
              </h4>
              <div className="flex flex-wrap gap-2">
                {activeModalProject.tags.map((tag, tIdx) => (
                  <span
                    key={tIdx}
                    className="text-xs font-mono px-3 py-1.5 rounded-lg bg-cyanAccent/10 text-cyanAccent border border-cyanAccent/20 font-semibold"
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
                  className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-white/10 hover:bg-white/20 border border-white/15 transition-all flex items-center gap-2"
                >
                  <Github className="w-4 h-4" />
                  View GitHub
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
