'use client';

import React, { useState, useEffect } from 'react';
import { profileData } from '@/data/profile';
import { Code, ExternalLink, Menu, X, Mail, Search, FileText } from 'lucide-react';

const navItems = [
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Accolades', href: '#accolades' },
];

interface NavbarProps {
  onOpenContact?: () => void;
  onOpenSearch?: () => void;
  onOpenResume?: () => void;
}

export default function Navbar({ onOpenContact, onOpenSearch, onOpenResume }: NavbarProps) {
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'about', 'experience', 'projects', 'skills', 'accolades'];
      const scrollPos = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 w-full z-50 backdrop-blur-md bg-[#030712]/50 border-b border-white/5 transition-all">
      <nav className="max-w-7xl mx-auto px-6 md:px-12 py-4 flex items-center justify-between">
        <a href="#hero" className="flex items-center gap-2 font-heading font-bold text-xl text-white tracking-tight">
          <Code className="w-5 h-5 theme-text-primary" />
          <span>Pratyush<span className="theme-text-primary">.dev</span></span>
        </a>

        {/* Desktop Links */}
        <ul className="hidden md:flex items-center gap-8 text-sm font-medium">
          {navItems.map((item) => {
            const sectionId = item.href.replace('#', '');
            const isActive = activeSection === sectionId;
            return (
              <li key={item.href}>
                <a
                  href={item.href}
                  className={`transition-colors relative py-1 ${
                    isActive ? 'theme-text-primary font-semibold' : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] rounded-full" />
                  )}
                </a>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-3">
          {/* Search Trigger */}
          {onOpenSearch && (
            <button
              onClick={onOpenSearch}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-mono text-slate-400 bg-white/5 border border-white/10 hover:border-cyanAccent/40 hover:text-white transition-all"
              title="Search Portfolio (Ctrl+K / Cmd+K)"
            >
              <Search className="w-3.5 h-3.5 theme-text-primary" />
              <span className="hidden sm:inline">Search</span>
              <kbd className="hidden sm:inline px-1.5 py-0.5 text-[10px] font-mono bg-white/10 rounded text-slate-300">⌘K</kbd>
            </button>
          )}

          {/* Resume Overview Button */}
          {onOpenResume && (
            <button
              onClick={onOpenResume}
              className="hidden lg:flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-mono font-semibold text-slate-300 bg-white/5 border border-white/10 hover:border-cyanAccent/40 hover:text-cyanAccent transition-all"
            >
              <FileText className="w-3.5 h-3.5 theme-text-secondary" />
              <span>Resume</span>
            </button>
          )}

          {onOpenContact && (
            <button
              onClick={onOpenContact}
              className="hidden sm:flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-mono font-semibold text-slate-300 bg-white/5 border border-white/10 hover:border-cyanAccent/40 hover:text-cyanAccent transition-all"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Contact</span>
            </button>
          )}

          <a
            href={profileData.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-lg text-xs font-mono font-semibold text-white bg-gradient-to-r from-[var(--accent-primary)]/20 to-[var(--accent-secondary)]/20 border border-[var(--accent-primary)]/40 hover:from-[var(--accent-primary)] hover:to-[var(--accent-secondary)] hover:text-primary transition-all duration-300 shadow-sm flex items-center gap-1.5"
          >
            <span>Connect</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-slate-400 hover:text-white p-1"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6 theme-text-primary" />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#030712]/95 border-b border-white/10 px-6 py-4 flex flex-col gap-4 backdrop-blur-xl">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
              className="text-slate-300 hover:theme-text-primary py-1 text-sm font-medium"
            >
              {item.label}
            </a>
          ))}
          {onOpenResume && (
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenResume();
              }}
              className="text-left theme-text-secondary py-1 text-sm font-mono font-medium flex items-center gap-2"
            >
              <FileText className="w-4 h-4" />
              <span>View Executive CV</span>
            </button>
          )}
          {onOpenContact && (
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenContact();
              }}
              className="text-left theme-text-primary py-1 text-sm font-mono font-medium flex items-center gap-2"
            >
              <Mail className="w-4 h-4" />
              <span>Contact Pratyush</span>
            </button>
          )}
        </div>
      )}
    </header>
  );
}
