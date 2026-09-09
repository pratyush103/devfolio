'use client';

import React, { useState, useEffect } from 'react';
import { profileData } from '@/data/profile';
import { Code, ExternalLink, Menu, X, Mail, FileText } from 'lucide-react';

const navItems = [
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Accolades', href: '#accolades' },
];

interface NavbarProps {
  onOpenContact?: () => void;
  onOpenResume?: () => void;
}

export default function Navbar({ onOpenContact, onOpenResume }: NavbarProps) {
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
    <header className="fixed top-0 left-0 w-full z-50 backdrop-blur-xl bg-[#030712]/85 border-b border-white/10 transition-all">
      <nav className="w-full px-6 md:px-10 py-4 grid grid-cols-[1fr_auto_1fr] items-center">
        <a href="#hero" className="justify-self-start flex items-center gap-2 font-heading font-bold text-xl text-white tracking-tight">
          <Code className="w-5 h-5 theme-text-primary" />
          <span>Pratyush<span className="theme-text-primary">.dev</span></span>
        </a>

        {/* Desktop Links */}
        <ul className="hidden md:flex justify-self-center items-center gap-8 lg:gap-10 text-sm font-medium">
          {navItems.map((item) => {
            const sectionId = item.href.replace('#', '');
            const isActive = activeSection === sectionId;
            return (
              <li key={item.href}>
                <a
                  href={item.href}
                  className={`transition-colors relative py-1 ${
                    isActive ? 'theme-text-primary font-semibold' : 'text-slate-300 hover:text-white'
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

        <div className="justify-self-end flex items-center gap-3">


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
