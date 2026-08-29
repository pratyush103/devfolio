'use client';

import React from 'react';
import { profileData } from '@/data/profile';
import { Github, Linkedin, ArrowDown, FolderGit2, Mail, MapPin, Terminal } from 'lucide-react';

export default function Hero({ onOpenContact }: { onOpenContact?: () => void }) {
  return (
    <section id="hero" className="min-h-screen relative flex items-center px-6 md:px-16 pt-20">
      <div className="max-w-3xl">
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md theme-bg-badge border border-cyanAccent/30 text-xs font-mono font-semibold uppercase tracking-wider theme-text-primary">
            <span className="w-2 h-2 rounded-sm bg-current animate-pulse" />
            {profileData.tagline}
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-white/5 border border-white/10 text-slate-400 text-xs font-mono">
            <MapPin className="w-3.5 h-3.5 theme-text-secondary" />
            <span>{profileData.location}</span>
          </div>
        </div>

        <h1 className="font-heading text-5xl sm:text-7xl md:text-8xl font-extrabold text-white leading-[1.04] tracking-tight mb-6">
          Hi, I am{' '}
          <span className="block bg-gradient-to-r from-white via-[var(--accent-primary)] to-[var(--accent-secondary)] bg-clip-text text-transparent transition-none">
            {profileData.name}
          </span>
        </h1>

        <p className="text-lg sm:text-xl text-slate-300 leading-relaxed mb-10 max-w-2xl font-sans">
          Building what intrigues me, breaking them, learning from them, and building them again, just better.
        </p>

        <div className="flex flex-wrap items-center gap-4">
          <a
            href="#projects"
            className="px-6 py-3 rounded-lg font-mono font-bold text-xs uppercase tracking-wider text-[#030712] bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] hover:opacity-90 transition-all transform hover:-translate-y-0.5 shadow-lg shadow-cyanAccent/20 flex items-center gap-2"
          >
            <FolderGit2 className="w-4 h-4" />
            View Architectures
          </a>

          {onOpenContact && (
            <button
              onClick={onOpenContact}
              className="px-5 py-3 rounded-lg font-mono font-semibold text-xs uppercase tracking-wider text-slate-200 bg-white/5 border border-white/10 hover:border-[var(--accent-primary)] hover:text-[var(--accent-primary)] backdrop-blur-md transition-all flex items-center gap-2"
            >
              <Mail className="w-4 h-4" />
              Contact
            </button>
          )}

          <a
            href={profileData.github}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-3 rounded-lg font-mono font-semibold text-xs uppercase tracking-wider text-slate-200 bg-white/5 border border-white/10 hover:border-[var(--accent-primary)] hover:text-[var(--accent-primary)] backdrop-blur-md transition-all flex items-center gap-2"
          >
            <Github className="w-4 h-4" />
            GitHub
          </a>

          <a
            href={profileData.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-3 rounded-lg font-mono font-semibold text-xs uppercase tracking-wider text-slate-200 bg-white/5 border border-white/10 hover:border-[var(--accent-primary)] hover:text-[var(--accent-primary)] backdrop-blur-md transition-all flex items-center gap-2"
          >
            <Linkedin className="w-4 h-4" />
            LinkedIn
          </a>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-400 text-xs font-mono uppercase tracking-widest animate-bounce">
        <span>Scroll to explore deeper layers</span>
        <ArrowDown className="w-4 h-4" />
      </div>
    </section>
  );
}
