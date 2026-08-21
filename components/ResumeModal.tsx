'use client';

import React from 'react';
import { profileData } from '@/data/profile';
import { FileText, Download, X, GraduationCap, Award, CheckCircle2, Briefcase } from 'lucide-react';

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
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-[#081226] border border-cyanAccent/40 rounded-3xl p-8 shadow-2xl shadow-cyanAccent/20"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-6 right-6 w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-xl bg-cyanAccent/10 border border-cyanAccent/30 flex items-center justify-center text-cyanAccent">
            <FileText className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-heading text-2xl font-bold text-white">{profileData.name} — Executive Profile</h3>
            <p className="text-slate-400 text-xs font-mono">
              MBA Tech (IT & Finance) • Class of {profileData.graduationYear} • MPSTME, NMIMS Mumbai
            </p>
          </div>
        </div>

        {/* Academic Highlights */}
        <div className="mb-6 p-4 rounded-2xl bg-white/5 border border-white/5">
          <div className="flex items-center gap-2 text-sm font-bold text-cyanAccent uppercase font-mono mb-3">
            <GraduationCap className="w-4 h-4" />
            <span>Academic Performance & Specialization</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div>
              <div className="text-slate-400">Cumulative GPA</div>
              <div className="text-white font-bold text-base text-tealAccent">{profileData.cgpa}</div>
            </div>
            <div>
              <div className="text-slate-400">Management Major</div>
              <div className="text-white font-semibold">Finance & Analytics</div>
            </div>
            <div>
              <div className="text-slate-400">Engineering Stream</div>
              <div className="text-white font-semibold">Information Technology</div>
            </div>
          </div>
        </div>

        {/* Core Competencies Breakdown */}
        <div className="mb-6 space-y-4">
          <h4 className="font-heading text-sm font-bold text-white uppercase tracking-wider">
            Key Technical & Managerial Pillars
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
            <div className="p-3.5 rounded-xl bg-white/5 border border-white/5">
              <div className="font-bold text-cyanAccent mb-1">Agentic AI & LLM Systems</div>
              <p className="text-slate-300">
                LangChain, LangGraph state graphs, RAG architectures, local Ollama deployment, and LangSmith observability telemetry.
              </p>
            </div>
            <div className="p-3.5 rounded-xl bg-white/5 border border-white/5">
              <div className="font-bold text-tealAccent mb-1">Full-Stack & APIs</div>
              <p className="text-slate-300">
                Next.js 14 App Router, FastAPI async microservices, React + Tauri desktop apps, and .NET 8 WebAPI.
              </p>
            </div>
            <div className="p-3.5 rounded-xl bg-white/5 border border-white/5">
              <div className="font-bold text-cyanAccent mb-1">Supply Chain Analytics</div>
              <p className="text-slate-300">
                Multi-lag forecast variance modeling, ABC/XYZ inventory segmentation, carrier detention penalty recovery, and SAP HANA integration.
              </p>
            </div>
            <div className="p-3.5 rounded-xl bg-white/5 border border-white/5">
              <div className="font-bold text-tealAccent mb-1">Quantitative Research</div>
              <p className="text-slate-300">
                Econometric time-series regression, corporate tax elasticity analysis, and financial market modeling.
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-white/10">
          <div className="text-xs text-slate-500 font-mono">
            Verified candidate profile • Mumbai, India
          </div>
          <div className="flex items-center gap-3">
            <a
              href={profileData.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-xl text-xs font-semibold text-white bg-white/10 hover:bg-white/20 border border-white/15 transition-all"
            >
              LinkedIn Profile
            </a>
            <a
              href={profileData.github}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-xl text-xs font-semibold text-primary bg-gradient-to-r from-cyanAccent to-tealAccent hover:opacity-90 transition-all font-bold"
            >
              GitHub Work
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
