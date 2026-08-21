'use client';

import React, { useState } from 'react';
import { accoladesData } from '@/data/profile';
import { AccoladeItem } from '@/types';
import { Trophy, Award, BookOpen, Scroll, X, CheckCircle2, ChevronRight } from 'lucide-react';

const iconMap = {
  Trophy: Trophy,
  Award: Award,
  BookOpen: BookOpen,
  Scroll: Scroll,
};

export default function Accolades() {
  const [activeModalItem, setActiveModalItem] = useState<AccoladeItem | null>(null);

  return (
    <section id="accolades" className="max-w-6xl mx-auto px-6 py-24 relative z-10">
      <div className="mb-14">
        <span className="font-mono text-xs text-cyanAccent tracking-widest uppercase block mb-2">// 05. Honors & Research</span>
        <h2 className="font-heading text-3xl sm:text-4xl font-bold text-white tracking-tight">
          Hackathons & Publications
        </h2>
        <p className="text-slate-400 text-base sm:text-lg mt-3 max-w-2xl">
          National hackathon recognitions, macroeconomic publications, and business strategy research. Click to view full methodology.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {accoladesData.map((item) => {
          const IconComp = iconMap[item.icon as keyof typeof iconMap] || Trophy;
          return (
            <div
              key={item.id}
              onClick={() => setActiveModalItem(item)}
              className="p-6 rounded-2xl bg-slate-900/60 backdrop-blur-xl border border-cyanAccent/20 hover:border-cyanAccent/50 transition-all flex gap-4 cursor-pointer group hover:-translate-y-1 hover:shadow-xl hover:shadow-cyanAccent/10"
            >
              <div className="w-12 h-12 rounded-xl bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-400 shrink-0 group-hover:scale-105 transition-transform">
                <IconComp className="w-6 h-6" />
              </div>
              <div className="flex-1">
                {item.tag && (
                  <span className="text-[10px] font-mono uppercase tracking-wider text-tealAccent font-semibold mb-1 block">
                    {item.tag}
                  </span>
                )}
                <h3 className="font-bold text-white text-base mb-1 group-hover:text-cyanAccent transition-colors flex items-center justify-between">
                  <span>{item.title}</span>
                  <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity text-cyanAccent" />
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed">{item.description}</p>
              </div>
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
            className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-[#081226] border border-cyanAccent/40 rounded-3xl p-8 shadow-2xl shadow-cyanAccent/20"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveModalItem(null)}
              className="absolute top-6 right-6 w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-all"
            >
              <X className="w-5 h-5" />
            </button>

            {activeModalItem.tag && (
              <div className="text-xs font-mono uppercase tracking-widest text-tealAccent font-semibold mb-2">
                {activeModalItem.tag}
              </div>
            )}

            <h3 className="font-heading text-2xl sm:text-3xl font-bold text-white mb-4">
              {activeModalItem.title}
            </h3>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6">
              {activeModalItem.fullOverview || activeModalItem.description}
            </p>

            {activeModalItem.keyContributions && (
              <div className="mb-6">
                <h4 className="font-heading text-sm font-bold text-cyanAccent uppercase tracking-wider mb-3">
                  Key Deliverables & Innovations
                </h4>
                <ul className="space-y-2.5">
                  {activeModalItem.keyContributions.map((point, idx) => (
                    <li key={idx} className="text-slate-300 text-sm flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-tealAccent shrink-0 mt-0.5" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {activeModalItem.techOrMethodology && (
              <div>
                <h4 className="font-heading text-sm font-bold text-cyanAccent uppercase tracking-wider mb-3">
                  Tools & Methodologies
                </h4>
                <div className="flex flex-wrap gap-2">
                  {activeModalItem.techOrMethodology.map((tech, tIdx) => (
                    <span
                      key={tIdx}
                      className="text-xs font-mono px-3 py-1.5 rounded-lg bg-cyanAccent/10 text-cyanAccent border border-cyanAccent/20 font-semibold"
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
