'use client';

import React, { useState } from 'react';
import { accoladesData } from '@/data/profile';
import { AccoladeItem } from '@/types';
import { X, CheckCircle2 } from 'lucide-react';

export default function Accolades() {
  const [activeModalItem, setActiveModalItem] = useState<AccoladeItem | null>(null);

  return (
    <section id="accolades" className="max-w-4xl mx-auto px-6 py-24 relative z-10">
      <div className="mb-12">
        <h2 className="font-heading text-3xl sm:text-4xl font-bold text-textMain tracking-tight">
          Hackathons &amp; Publications
        </h2>
        <p className="text-textMuted text-base sm:text-lg mt-4 max-w-2xl font-sans">
          National hackathon recognitions, econometric publications, and strategic business analysis. Click any record to inspect methodology.
        </p>
      </div>

      <div className="flex flex-col">
        {accoladesData.map((item) => (
          <div
            key={item.id}
            onClick={() => setActiveModalItem(item)}
            className="py-6 border-b border-rule group cursor-pointer"
          >
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between mb-2">
              <h3 className="font-heading text-xl font-bold text-textMain group-hover:text-cyanAccent transition-colors">
                {item.title}
              </h3>
              {item.tag && (
                <div className="font-sans text-sm text-textMuted mt-1 sm:mt-0 uppercase tracking-widest">
                  {item.tag}
                </div>
              )}
            </div>
            
            <p className="text-textMuted text-sm leading-relaxed font-sans mb-3">
              {item.description}
            </p>

            {item.techOrMethodology && (
              <div className="font-mono text-xs text-textMuted">
                {item.techOrMethodology.join(' · ')}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Deep-Dive Modal */}
      {activeModalItem && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md transition-all"
          onClick={() => setActiveModalItem(null)}
        >
          <div
            className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-primary border border-cyanAccent/40 rounded-2xl p-8 shadow-2xl shadow-cyanAccent/20"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveModalItem(null)}
              className="absolute top-6 right-6 w-8 h-8 rounded-lg bg-secondary border border-rule flex items-center justify-center text-textMuted hover:text-textMain transition-all"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="text-xs font-mono uppercase tracking-widest text-cyanAccent font-semibold mb-2">
              {activeModalItem.tag}
            </div>

            <h3 className="font-heading text-2xl sm:text-3xl font-bold text-textMain mb-4">
              {activeModalItem.title}
            </h3>

            <p className="text-textMuted text-sm sm:text-base leading-relaxed mb-6 font-sans">
              {activeModalItem.fullOverview || activeModalItem.description}
            </p>

            {activeModalItem.keyContributions && (
              <div className="mb-6">
                <h4 className="font-sans text-xs font-bold text-cyanAccent uppercase tracking-wider mb-3">
                  Key Deliverables &amp; Innovations
                </h4>
                <ul className="space-y-2.5">
                  {activeModalItem.keyContributions.map((point, idx) => (
                    <li key={idx} className="text-textMuted text-sm flex items-start gap-2.5 font-sans">
                      <CheckCircle2 className="w-4 h-4 text-textMuted shrink-0 mt-0.5" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {activeModalItem.techOrMethodology && (
              <div>
                <h4 className="font-sans text-xs font-bold text-cyanAccent uppercase tracking-wider mb-3">
                  Tools &amp; Methodologies
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {activeModalItem.techOrMethodology.map((tech, tIdx) => (
                    <span
                      key={tIdx}
                      className="text-xs font-mono px-2.5 py-1 rounded-[4px] bg-primary text-textMuted border border-rule font-semibold"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
