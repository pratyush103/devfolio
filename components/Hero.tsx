'use client';

import React from 'react';
import { profileData } from '@/data/profile';
import { Github, Linkedin, ArrowDown, FolderGit2, Mail } from 'lucide-react';

export default function Hero({ onOpenContact }: { onOpenContact?: () => void }) {
  return (
    <section id="hero" className="min-h-screen relative flex items-center px-6 md:px-16 pt-20">
      <div className="max-w-3xl">
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <div className="text-sm font-sans text-textMuted">
            MBA Tech · IT & Finance — {profileData.location}
          </div>
        </div>

        <h1 className="font-heading text-5xl sm:text-7xl md:text-8xl font-extrabold text-textMain leading-[1.04] tracking-tight mb-6">
          Hi, I am{' '}
          <span className="block text-textMain">
            {profileData.name}
          </span>
        </h1>

        <p className="text-lg sm:text-xl text-textMuted leading-relaxed mb-10 max-w-2xl font-sans">
          Dual-degree engineer and MBA student building agentic AI systems — from LLM research pipelines to a low-latency trading engine.
        </p>

        <div className="flex flex-wrap items-center gap-4">
          <a
            href="#projects"
            className="px-6 py-3 rounded-lg font-sans font-bold text-xs uppercase tracking-wider text-primary bg-cyanAccent hover:bg-[#b07835] transition-all transform hover:-translate-y-0.5 shadow-lg shadow-cyanAccent/20 flex items-center gap-2"
          >
            <FolderGit2 className="w-4 h-4" />
            View Projects
          </a>

          {onOpenContact && (
            <button
              onClick={onOpenContact}
              className="px-5 py-3 rounded-lg font-sans font-semibold text-xs uppercase tracking-wider text-textMuted bg-secondary border border-rule hover:border-cyanAccent/40 hover:text-cyanAccent backdrop-blur-md transition-all flex items-center gap-2"
            >
              <Mail className="w-4 h-4" />
              Contact
            </button>
          )}

          <a
            href={profileData.github}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-3 rounded-lg font-sans font-semibold text-xs uppercase tracking-wider text-textMuted bg-secondary border border-rule hover:border-cyanAccent/40 hover:text-cyanAccent backdrop-blur-md transition-all flex items-center gap-2"
          >
            <Github className="w-4 h-4" />
            GitHub
          </a>

          <a
            href={profileData.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-3 rounded-lg font-sans font-semibold text-xs uppercase tracking-wider text-textMuted bg-secondary border border-rule hover:border-cyanAccent/40 hover:text-cyanAccent backdrop-blur-md transition-all flex items-center gap-2"
          >
            <Linkedin className="w-4 h-4" />
            LinkedIn
          </a>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-textMuted text-xs font-sans uppercase tracking-widest animate-bounce">
        <ArrowDown className="w-4 h-4" />
      </div>
    </section>
  );
}
