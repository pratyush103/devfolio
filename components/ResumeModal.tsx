'use client';

import React from 'react';
import { profileData } from '@/data/profile';
import { FileText, X, GraduationCap, CheckCircle2, BookOpen, Award } from 'lucide-react';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ResumeModal({ isOpen, onClose }: ResumeModalProps) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md transition-all"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-[#081226] border border-cyanAccent/40 rounded-2xl p-8 shadow-2xl shadow-cyanAccent/20"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-6 right-6 w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white transition-all"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/10">
          <div className="w-10 h-10 rounded-lg bg-cyanAccent/10 border border-cyanAccent/30 flex items-center justify-center text-cyanAccent">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-heading text-xl sm:text-2xl font-bold text-white">{profileData.name} — Executive Profile</h3>
            <p className="text-slate-400 text-xs font-mono">
              MBA Tech (IT &amp; Finance) • Class of {profileData.graduationYear} • MPSTME, NMIMS Mumbai
            </p>
          </div>
        </div>

        {/* Academic Performance Strip */}
        <div className="mb-6 p-4 rounded-xl bg-white/5 border border-white/5">
          <div className="flex items-center gap-2 text-xs font-bold theme-text-primary uppercase font-mono mb-3">
            <GraduationCap className="w-4 h-4" />
            <span>[ACADEMIC_PERFORMANCE::VERIFIED]</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono">
            <div className="p-2.5 rounded-lg bg-black/30 border border-white/5">
              <div className="text-[10px] text-slate-400">Cumulative GPA</div>
              <div className="text-sm font-bold text-tealAccent mt-0.5">{profileData.cgpa}</div>
            </div>
            <div className="p-2.5 rounded-lg bg-black/30 border border-white/5">
              <div className="text-[10px] text-slate-400">Management Major</div>
              <div className="text-sm font-semibold text-white mt-0.5">Finance &amp; Analytics</div>
            </div>
            <div className="p-2.5 rounded-lg bg-black/30 border border-white/5">
              <div className="text-[10px] text-slate-400">Engineering Stream</div>
              <div className="text-sm font-semibold text-white mt-0.5">Information Technology</div>
            </div>
          </div>
        </div>

        {/* Core Coursework & Domain Pillars */}
        <div className="mb-6 space-y-4">
          <div className="font-mono text-xs font-bold text-slate-300 uppercase tracking-wider">
            [CORE_DOMAIN_PILLARS]
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
            <div className="p-3.5 rounded-xl bg-white/5 border border-white/5 font-mono">
              <div className="font-bold theme-text-primary mb-1">Agentic AI &amp; LLM Graphs</div>
              <p className="text-slate-300 font-sans text-[11px] leading-relaxed">
                LangGraph cyclical state graphs, RAG architectures, local Ollama deployment, and LangSmith observability telemetry.
              </p>
            </div>
            <div className="p-3.5 rounded-xl bg-white/5 border border-white/5 font-mono">
              <div className="font-bold theme-text-secondary mb-1">Full-Stack &amp; Financial Engines</div>
              <p className="text-slate-300 font-sans text-[11px] leading-relaxed">
                Next.js 14 App Router, FastAPI async microservices, React + Tauri desktop containers, and .NET 8 in-memory matching.
              </p>
            </div>
            <div className="p-3.5 rounded-xl bg-white/5 border border-white/5 font-mono">
              <div className="font-bold theme-text-primary mb-1">Supply Chain Analytics</div>
              <p className="text-slate-300 font-sans text-[11px] leading-relaxed">
                Multi-lag forecast variance modeling, ABC/XYZ inventory segmentation, carrier detention penalty recovery, and SAP HANA pipelines.
              </p>
            </div>
            <div className="p-3.5 rounded-xl bg-white/5 border border-white/5 font-mono">
              <div className="font-bold theme-text-secondary mb-1">Quantitative Econometrics</div>
              <p className="text-slate-300 font-sans text-[11px] leading-relaxed">
                Econometric time-series regression, corporate tax elasticity analysis, and financial market capitalization modeling.
              </p>
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-white/10">
          <div className="text-[11px] text-slate-500 font-mono">
            Candidate ID: MPSTME-NMIMS • Mumbai, India
          </div>
          <div className="flex items-center gap-3 font-mono">
            <a
              href={profileData.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-lg text-xs font-semibold text-white bg-white/10 hover:bg-white/20 border border-white/15 transition-all"
            >
              LinkedIn Profile
            </a>
            <a
              href={profileData.github}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-lg text-xs font-bold text-primary bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] hover:opacity-90 transition-all shadow-md"
            >
              GitHub Repository
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
