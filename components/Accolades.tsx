'use client';

import React, { useState } from 'react';
import { accoladesData } from '@/data/profile';
import { AccoladeItem } from '@/types';
import { X, CheckCircle2, ArrowUpRight } from 'lucide-react';

const domainStamps: Record<string, { stamp: string; code: string }> = {
  'sih-2025': { stamp: 'SPATIAL OCEAN AI', code: 'ARGO::3D_THERMOCLINE' },
  'sih-2024': { stamp: 'BLOCKCHAIN OCR', code: 'ETH::SMART_ATTEST' },
  'fiscal-growth-paper': { stamp: 'ECONOMETRICS', code: 'REGRESSION::10YR_OLS' },
  'carvaan-case-study': { stamp: 'MARKET STRATEGY', code: 'BIZ_CASE::UNIT_MARGINS' },
};

export default function Accolades() {
  const [activeModalItem, setActiveModalItem] = useState<AccoladeItem | null>(null);

  return (
    <section id="accolades" className="max-w-6xl mx-auto px-6 py-24 relative z-10">
      <div className="mb-12">
        <span className="font-mono text-xs text-cyanAccent tracking-widest uppercase block mb-2">// 05. Honors &amp; Research</span>
        <h2 className="font-heading text-3xl sm:text-4xl font-bold text-white tracking-tight">
          Hackathons &amp; Publications
        </h2>
        <p className="text-slate-400 text-base sm:text-lg mt-3 max-w-2xl">
          National hackathon recognitions, econometric publications, and strategic business analysis. Click any record to inspect methodology.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {accoladesData.map((item) => {
          const meta = domainStamps[item.id] || { stamp: 'RESEARCH', code: 'METRICS::VERIFIED' };
          return (
            <div
              key={item.id}
              onClick={() => setActiveModalItem(item)}
              className="p-6 rounded-xl bg-slate-900/60 backdrop-blur-xl border border-white/10 hover:border-cyanAccent/40 transition-all flex flex-col justify-between cursor-pointer group hover:-translate-y-1 hover:shadow-xl hover:shadow-cyanAccent/10"
            >
              <div>
                <div className="flex items-center justify-between mb-4 pb-2 border-b border-white/5 font-mono text-[10px]">
                  <span className="px-2 py-0.5 rounded-[3px] bg-tealAccent/10 text-tealAccent border border-tealAccent/20 font-bold uppercase tracking-wider">
                    {meta.stamp}
                  </span>
                  <span className="text-slate-500">{meta.code}</span>
                </div>

                <h3 className="font-heading text-lg font-bold text-white mb-2 group-hover:theme-text-primary transition-colors flex items-center justify-between">
                  <span>{item.title}</span>
                  <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity theme-text-primary" />
                </h3>
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-4 font-sans">
                  {item.description}
                </p>
              </div>

              {item.techOrMethodology && (
                <div className="flex flex-wrap gap-1.5 pt-3 border-t border-white/5">
                  {item.techOrMethodology.map((tech, tIdx) => (
                    <span
                      key={tIdx}
                      className="text-[10px] font-mono px-2 py-0.5 rounded-[3px] bg-white/5 text-slate-300 border border-white/10"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Deep-Dive Modal */}
      {activeModalItem && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md transition-all"
          onClick={() => setActiveModalItem(null)}
        >
          <div
            className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-[#081226] border border-cyanAccent/40 rounded-2xl p-8 shadow-2xl shadow-cyanAccent/20"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveModalItem(null)}
              className="absolute top-6 right-6 w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white transition-all"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="text-xs font-mono uppercase tracking-widest text-tealAccent font-semibold mb-2">
              {activeModalItem.tag}
            </div>

            <h3 className="font-heading text-2xl sm:text-3xl font-bold text-white mb-4">
              {activeModalItem.title}
            </h3>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6 font-sans">
              {activeModalItem.fullOverview || activeModalItem.description}
            </p>

            {activeModalItem.keyContributions && (
              <div className="mb-6">
                <h4 className="font-mono text-xs font-bold theme-text-primary uppercase tracking-wider mb-3">
                  Key Deliverables &amp; Innovations
                </h4>
                <ul className="space-y-2.5">
                  {activeModalItem.keyContributions.map((point, idx) => (
                    <li key={idx} className="text-slate-300 text-sm flex items-start gap-2.5 font-sans">
                      <CheckCircle2 className="w-4 h-4 text-tealAccent shrink-0 mt-0.5" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {activeModalItem.techOrMethodology && (
              <div>
                <h4 className="font-mono text-xs font-bold theme-text-primary uppercase tracking-wider mb-3">
                  Tools &amp; Methodologies
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {activeModalItem.techOrMethodology.map((tech, tIdx) => (
                    <span
                      key={tIdx}
                      className="text-xs font-mono px-2.5 py-1 rounded-[4px] bg-white/5 text-slate-300 border border-white/10 font-semibold"
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
