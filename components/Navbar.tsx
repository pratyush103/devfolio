'use client';

import React, { useState, useEffect } from 'react';
import { profileData } from '@/data/profile';
import { Code, ExternalLink, Menu, X, Mail, FileText, Palette } from 'lucide-react';

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
    // Theme is now managed globally at page.tsx, but Navbar could still know about it if needed.
  }, []);

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
    <header className="fixed top-0 left-0 w-full z-50 bg-primary/55 supports-[backdrop-filter]:bg-primary/45 backdrop-blur-2xl backdrop-saturate-150 border-b border-rule shadow-[0_8px_28px_rgba(3,7,18,0.28)] transition-all">
      <nav className="w-full px-6 md:px-10 py-4 grid grid-cols-[1fr_auto_1fr] items-center">
        <a href="#hero" className="justify-self-start flex items-center gap-2 font-heading font-bold text-xl text-white tracking-tight">
          <Code className="w-5 h-5 text-cyanAccent" />
          <span>Pratyush<span className="text-cyanAccent">.dev</span></span>
        </a>

        {/* Desktop Links */}
        <ul className="hidden md:flex justify-self-center items-center gap-8 lg:gap-10 text-sm font-sans font-medium">
          {navItems.map((item) => {
            const sectionId = item.href.replace('#', '');
            const isActive = activeSection === sectionId;
            return (
              <li key={item.href}>
                <a
                  href={item.href}
                  className={`transition-colors relative py-1 ${
                    isActive ? 'text-cyanAccent font-semibold' : 'text-textMuted hover:text-white'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-[2px] bg-cyanAccent rounded-full" />
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
              className="hidden lg:flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-mono font-semibold text-textMuted bg-secondary border border-rule hover:border-cyanAccent/40 hover:text-cyanAccent transition-all"
            >
              <FileText className="w-3.5 h-3.5 text-cyanAccent" />
              <span>Resume</span>
            </button>
          )}

          {onOpenContact && (
            <button
              onClick={onOpenContact}
              className="hidden sm:flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-mono font-semibold text-textMuted bg-secondary border border-rule hover:border-cyanAccent/40 hover:text-cyanAccent transition-all"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Contact</span>
            </button>
          )}

          <a
            href={profileData.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-lg text-xs font-mono font-semibold text-primary bg-cyanAccent border border-cyanAccent hover:bg-[#b07835] transition-all duration-300 shadow-sm flex items-center gap-1.5"
          >
            <span>Connect</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-textMuted hover:text-white p-1"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6 text-cyanAccent" />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-primary/95 border-b border-rule px-6 py-4 flex flex-col gap-4 backdrop-blur-xl">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
              className="text-textMuted hover:text-cyanAccent py-1 text-sm font-sans font-medium"
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
              className="text-left text-textMuted py-1 text-sm font-mono font-medium flex items-center gap-2"
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
              className="text-left text-cyanAccent py-1 text-sm font-mono font-medium flex items-center gap-2"
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
