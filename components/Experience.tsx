'use client';

import React, { useState } from 'react';
import { experiencesData } from '@/data/profile';

const expDomainStamps: Record<string, { stamp: string; code: string }> = {
  'dow': { stamp: 'SUPPLY CHAIN ANALYTICS', code: 'DOW::LOGISTICS_ABC_XYZ' },
  'analytica': { stamp: 'AI & RAG MODULES', code: 'ISF::CURRICULUM_GEN' },
  'lbw': { stamp: 'FULL-STACK NOTATION', code: 'LBW::SARGAM_ENGINE' },
};

export default function Experience() {
  const [selectedExpId, setSelectedExpId] = useState<string>('all');

  const filteredExps = selectedExpId === 'all'
    ? experiencesData
    : experiencesData.filter((e) => e.id === selectedExpId);

  return (
    <section id="experience" className="max-w-6xl mx-auto px-6 py-24 relative z-10">
      <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <span className="font-mono text-xs text-cyanAccent tracking-widest uppercase block mb-2">// 02. Professional Track</span>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Industry Engagements
          </h2>
          <p className="text-slate-400 text-base sm:text-lg mt-3 max-w-2xl">
            Quantitative inventory modeling at Fortune 100 enterprise scale, automated educational AI courseware engines, and full-stack platforms.
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
              className={`px-3 py-1.5 rounded-md font-mono text-xs font-semibold transition-all ${
                selectedExpId === tab.id
                  ? 'bg-[var(--accent-primary)] text-[#030712] shadow-md'
                  : 'bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:border-cyanAccent/30'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-6">
        {filteredExps.map((exp) => {
          const meta = expDomainStamps[exp.id] || { stamp: 'ENGINEERING', code: 'PROD::ENGAGEMENT' };
          return (
            <div
              key={exp.id}
              className="p-8 rounded-xl bg-slate-900/60 backdrop-blur-xl border border-white/10 hover:border-cyanAccent/40 transition-all grid grid-cols-1 md:grid-cols-[280px_1fr] gap-6 group hover:shadow-xl hover:shadow-cyanAccent/10"
            >
              <div>
                <div className="flex items-center justify-between mb-3 pb-2 border-b border-white/5 font-mono text-[10px]">
                  <span className="px-2 py-0.5 rounded-[3px] bg-tealAccent/10 text-tealAccent border border-tealAccent/20 font-bold uppercase tracking-wider">
                    {meta.stamp}
                  </span>
                  <span className="text-slate-500">{meta.code}</span>
                </div>

                <div className="text-[11px] font-mono uppercase tracking-wider text-tealAccent font-semibold mb-1">
                  {exp.metrics}
                </div>
                <h3 className="text-xl font-bold text-white group-hover:theme-text-primary transition-colors">
                  {exp.company}
                </h3>
                <div className="text-xs font-mono font-semibold theme-text-primary mt-1">{exp.role}</div>
                <div className="inline-block mt-3 text-[11px] font-mono text-slate-400 bg-white/5 px-2.5 py-1 rounded-[4px] border border-white/5">
                  {exp.period}
                </div>

                {/* Tools Stack */}
                <div className="mt-4">
                  <div className="text-[9px] font-mono uppercase text-slate-500 mb-1.5">Stack Components:</div>
                  <div className="flex flex-wrap gap-1.5">
                    {exp.tools.map((tool, tIdx) => (
                      <span
                        key={tIdx}
                        className="text-[10px] font-mono px-2 py-0.5 rounded-[3px] bg-white/5 text-slate-300 border border-white/10"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <ul className="space-y-3.5">
                {exp.points.map((point, pIndex) => (
                  <li key={pIndex} className="text-slate-300 text-xs sm:text-sm leading-relaxed relative pl-5 font-sans">
                    <span className="absolute left-0 text-tealAccent font-bold">▹</span>
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </section>
  );
}
