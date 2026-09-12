'use client';

import React, { useState, useEffect, useRef } from 'react';
import SeashoreOceanCanvas from '@/components/SeashoreOceanCanvas';
import CausticsOverlay from '@/components/CausticsOverlay';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Experience from '@/components/Experience';
import Projects from '@/components/Projects';
import Skills from '@/components/Skills';
import Accolades from '@/components/Accolades';
import Footer from '@/components/Footer';
import AudioSynthesizer from '@/components/AudioSynthesizer';
import ContactModal from '@/components/ContactModal';

import ReadingProgress from '@/components/ReadingProgress';
import ResumeModal from '@/components/ResumeModal';

export default function Home() {
  const [contactOpen, setContactOpen] = useState<boolean>(false);
  const [resumeOpen, setResumeOpen] = useState<boolean>(false);

  // Theme Sync
  const [theme, setTheme] = useState<'golden'|'twilight'|'biolum'|'mono'>('golden');
  const paletteFnRef = useRef<((mode: 'golden'|'twilight'|'biolum'|'mono') => void) | null>(null);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const cycleTheme = () => {
    const themes: ('golden'|'twilight'|'biolum'|'mono')[] = ['golden', 'twilight', 'biolum', 'mono'];
    const idx = themes.indexOf(theme);
    const nextTheme = themes[(idx + 1) % themes.length];
    setTheme(nextTheme);
    if (paletteFnRef.current) {
      paletteFnRef.current(nextTheme);
    }
  };



  return (
    <main className="relative min-h-screen bg-primary">
      {/* Top Reading Progress & Back to Top Floating Button */}
      <ReadingProgress />

      {/* 3D WebGL Canvas Layer */}
      <SeashoreOceanCanvas onPaletteRefReady={(fn) => { paletteFnRef.current = fn; }} />
      <CausticsOverlay />

      {/* Foreground UI Layer */}
      <div className="relative z-10">
        <Navbar
          onOpenContact={() => setContactOpen(true)}
          onOpenResume={() => setResumeOpen(true)}
        />
        <Hero onOpenContact={() => setContactOpen(true)} />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Accolades />
        <Footer onOpenContact={() => setContactOpen(true)} />
      </div>

      {/* Oceanic Ambient Audio Synthesizer */}
      <AudioSynthesizer onCycleTheme={cycleTheme} />

      {/* Quick Contact Modal */}
      <ContactModal isOpen={contactOpen} onClose={() => setContactOpen(false)} />

      {/* Executive Resume Modal */}
      <ResumeModal isOpen={resumeOpen} onClose={() => setResumeOpen(false)} />


    </main>
  );
}
