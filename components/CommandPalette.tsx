'use client';

import React, { useState, useEffect } from 'react';
import { Search, FolderGit2, Briefcase, Code, Trophy, Mail, X, ArrowRight, Sparkles, Volume2, Palette } from 'lucide-react';
import { projectsData, experiencesData, profileData } from '@/data/profile';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenContact: () => void;
}

export default function CommandPalette({ isOpen, onClose, onOpenContact }: CommandPaletteProps) {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        isOpen ? onClose() : null;
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filteredProjects = projectsData.filter((p) =>
    p.title.toLowerCase().includes(query.toLowerCase()) ||
    p.description.toLowerCase().includes(query.toLowerCase()) ||
    p.tags.some((t) => t.toLowerCase().includes(query.toLowerCase()))
  );

  const filteredExperience = experiencesData.filter((e) =>
    e.company.toLowerCase().includes(query.toLowerCase()) ||
    e.role.toLowerCase().includes(query.toLowerCase())
  );

  const navigateTo = (hash: string) => {
    onClose();
    const el = document.querySelector(hash);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-24 p-4 bg-black/80 backdrop-blur-md transition-all"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-xl bg-[#081226] border border-cyanAccent/40 rounded-2xl p-6 shadow-2xl shadow-cyanAccent/20 max-h-[80vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Bar */}
        <div className="flex items-center gap-3 pb-4 border-b border-white/10">
          <Search className="w-4 h-4 text-cyanAccent shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search architectures, stack, experience, or press ESC..."
            className="w-full bg-transparent text-white text-xs sm:text-sm focus:outline-none placeholder-slate-500 font-mono"
          />
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Search Results */}
        <div className="overflow-y-auto mt-4 space-y-4 pr-1">
          {/* Quick Telemetry Actions */}
          <div>
            <div className="text-[10px] font-mono uppercase text-slate-500 tracking-wider mb-2 font-semibold">
              [TELEMETRY_ACTIONS]
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <button
                onClick={() => {
                  onClose();
                  onOpenContact();
                }}
                className="p-2.5 rounded-lg bg-white/5 hover:bg-cyanAccent/10 border border-white/5 hover:border-cyanAccent/30 flex items-center justify-between text-xs text-slate-300 hover:text-white transition-all text-left font-mono"
              >
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-cyanAccent" />
                  <span>Direct Inquiry</span>
                </div>
                <ArrowRight className="w-3 h-3 text-slate-500" />
              </button>

              <button
                onClick={() => navigateTo('#projects')}
                className="p-2.5 rounded-lg bg-white/5 hover:bg-cyanAccent/10 border border-white/5 hover:border-cyanAccent/30 flex items-center justify-between text-xs text-slate-300 hover:text-white transition-all text-left font-mono"
              >
                <div className="flex items-center gap-2">
                  <FolderGit2 className="w-3.5 h-3.5 text-tealAccent" />
                  <span>Featured Works</span>
                </div>
                <ArrowRight className="w-3 h-3 text-slate-500" />
              </button>
            </div>
          </div>

          {/* Projects Results */}
          {filteredProjects.length > 0 && (
            <div>
              <div className="text-[10px] font-mono uppercase text-slate-500 tracking-wider mb-2 font-semibold">
                [PROJECTS]
              </div>
              <div className="space-y-1.5">
                {filteredProjects.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => navigateTo('#projects')}
                    className="w-full p-2.5 rounded-lg bg-white/5 hover:bg-cyanAccent/10 border border-white/5 hover:border-cyanAccent/30 flex items-center justify-between text-xs text-left transition-all font-mono"
                  >
                    <div>
                      <div className="font-semibold text-white">{p.title}</div>
                      <div className="text-slate-400 text-[10px] truncate max-w-md font-sans">{p.description}</div>
                    </div>
                    <span className="text-[9px] px-2 py-0.5 rounded-[3px] bg-white/5 text-tealAccent border border-white/10 shrink-0 ml-2">
                      {p.tags[0]}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Experience Results */}
          {filteredExperience.length > 0 && (
            <div>
              <div className="text-[10px] font-mono uppercase text-slate-500 tracking-wider mb-2 font-semibold">
                [EXPERIENCE_TRACK]
              </div>
              <div className="space-y-1.5">
                {filteredExperience.map((e) => (
                  <button
                    key={e.id}
                    onClick={() => navigateTo('#experience')}
                    className="w-full p-2.5 rounded-lg bg-white/5 hover:bg-cyanAccent/10 border border-white/5 hover:border-cyanAccent/30 flex items-center justify-between text-xs text-left transition-all font-mono"
                  >
                    <div>
                      <div className="font-semibold text-white">{e.company}</div>
                      <div className="text-slate-400 text-[10px]">{e.role} • {e.period}</div>
                    </div>
                    <Briefcase className="w-3.5 h-3.5 text-cyanAccent shrink-0 ml-2" />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer Hotkey Indicator */}
        <div className="pt-3 mt-2 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-slate-500">
          <span>Use <strong>ESC</strong> to dismiss</span>
          <span>Pratyush Landekar • Telemetry Spotlight</span>
        </div>
      </div>
    </div>
  );
}
