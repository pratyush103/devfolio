import React from 'react';
import { profileData } from '@/data/profile';
import { Github, Linkedin, Mail } from 'lucide-react';

export default function Footer({ onOpenContact }: { onOpenContact?: () => void }) {
  return (
    <footer className="border-t border-white/10 bg-[#030712]/90 relative z-10 py-12 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center justify-between">
        <div>
          <h3 className="font-heading text-2xl font-bold text-white mb-2">{profileData.name}</h3>
          <p className="text-slate-400 text-sm max-w-md mb-4">
            Building intelligent agent swarms, modern cloud APIs, and data-driven systems.
          </p>
          <div className="flex gap-3">
            <a
              href={profileData.github}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 hover:text-primary hover:bg-cyanAccent transition-all"
              title="GitHub"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href={profileData.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 hover:text-primary hover:bg-cyanAccent transition-all"
              title="LinkedIn"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            {onOpenContact && (
              <button
                onClick={onOpenContact}
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 hover:text-primary hover:bg-cyanAccent transition-all"
                title="Send Message"
              >
                <Mail className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        <div className="md:text-right">
          <div className="text-sm font-semibold text-white mb-1">MBA Tech (IT & Finance) • Class of {profileData.graduationYear}</div>
          <div className="text-xs text-slate-400 mb-1">{profileData.institution}</div>
          <div className="text-xs font-mono text-cyanAccent">CGPA: {profileData.cgpa}</div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto mt-8 pt-6 border-t border-white/5 text-center text-xs text-slate-500">
        Designed & Built with WebGL, Next.js, React & Three.js Particle Shaders • © 2026 {profileData.name}
      </div>
    </footer>
  );
}
