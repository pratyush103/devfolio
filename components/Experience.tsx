'use client';

import React, { useState } from 'react';
import { experiencesData } from '@/data/profile';
import { Briefcase, CheckCircle2, Wrench, Layers, Building2 } from 'lucide-react';

export default function Experience() {
  const [selectedExpId, setSelectedExpId] = useState<string>('all');

  const filteredExps = selectedExpId === 'all'
    ? experiencesData
    : experiencesData.filter((e) => e.id === selectedExpId);

  return (
    <section id="experience" className="max-w-6xl mx-auto px-6 py-24 relative z-10">
      <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <span className="font-mono text-xs text-cyanAccent tracking-widest uppercase block mb-2">// 02. Work History</span>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Industry Experience & Internships
          </h2>
          <p className="text-slate-400 text-base sm:text-lg mt-3 max-w-2xl">
            Track record across enterprise supply chain operations, educational AI courseware generation, and full-stack software development.
          </p>
        </div>

        {/* Experience Role Filter Tabs */}
        <div className="flex flex-wrap gap-2">
          {[
            { label: 'All Roles', id: 'all' },
            { label: 'Dow Chemicals', id: 'dow' },
            { label: 'Analytica Informatica', id: 'analytica' },
            { label: 'LBWOnline', id: 'lbw' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedExpId(tab.id)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                selectedExpId === tab.id
                  ? 'bg-cyanAccent text-primary shadow-md shadow-cyanAccent/20'
                  : 'bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:border-cyanAccent/30'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-6">
        {filteredExps.map((exp) => (
          <div
            key={exp.id}
            className="p-8 rounded-2xl bg-slate-900/60 backdrop-blur-xl border border-cyanAccent/20 hover:border-cyanAccent/50 transition-all grid grid-cols-1 md:grid-cols-[280px_1fr] gap-6 group hover:shadow-xl hover:shadow-cyanAccent/10"
          >
            <div>
              <div className="text-[11px] font-mono uppercase tracking-wider text-tealAccent font-semibold mb-1">
                {exp.metrics}
              </div>
              <h3 className="text-xl font-bold text-white group-hover:text-cyanAccent transition-colors">
                {exp.company}
              </h3>
              <div className="text-sm font-semibold text-cyanAccent mt-1">{exp.role}</div>
              <div className="inline-block mt-3 text-xs font-mono text-slate-400 bg-white/5 px-3 py-1 rounded-md border border-white/5">
                {exp.period}
              </div>

              {/* Tools Stack */}
              <div className="mt-4">
                <div className="text-[10px] font-mono uppercase text-slate-500 mb-1.5">Stack & Frameworks:</div>
                <div className="flex flex-wrap gap-1.5">
                  {exp.tools.map((tool, tIdx) => (
                    <span
                      key={tIdx}
                      className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-slate-300 border border-white/10"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <ul className="space-y-3.5">
              {exp.points.map((point, pIndex) => (
                <li key={pIndex} className="text-slate-300 text-sm leading-relaxed relative pl-5">
                  <span className="absolute left-0 text-tealAccent font-bold">▹</span>
                  {point}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
