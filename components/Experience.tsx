'use client';

import React, { useState } from 'react';
import { experiencesData } from '@/data/profile';

export default function Experience() {
  const [selectedExpId, setSelectedExpId] = useState<string>('all');

  const filteredExps = selectedExpId === 'all'
    ? experiencesData
    : experiencesData.filter((e) => e.id === selectedExpId);

  return (
    <section id="experience" className="max-w-4xl mx-auto px-6 py-24 relative z-10">
      <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-textMain tracking-tight">
            Experience
          </h2>
          <p className="text-textMuted text-base sm:text-lg mt-4 font-sans">
            Working on inventory data modeling at enterprise scale, building educational AI tools, and developing full-stack platforms.
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
              className={`px-3 py-1.5 rounded-md font-sans text-xs transition-all ${
                selectedExpId === tab.id
                  ? 'text-textMain'
                  : 'text-textMuted hover:text-textMain'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col">
        {filteredExps.map((exp, index) => (
          <div key={exp.id} className="py-8 border-b border-rule group">
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between mb-1">
              <h3 className="font-heading text-xl font-bold text-textMain group-hover:text-cyanAccent transition-colors">
                {exp.company}
              </h3>
              <div className="font-mono text-sm text-textMuted mt-1 sm:mt-0">
                {exp.period}
              </div>
            </div>
            
            <div className="text-md font-sans text-textMain mb-4">
              {exp.role}
            </div>

            <div className="space-y-2 mb-4">
              {exp.points.map((point, pIndex) => (
                <p key={pIndex} className="text-textMuted text-sm leading-relaxed font-sans">
                  {point}
                </p>
              ))}
            </div>

            <div className="font-mono text-xs text-textMuted">
              {exp.tools.join(' · ')}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
