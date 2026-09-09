'use client';

import React, { useState } from 'react';
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



  return (
    <main className="relative min-h-screen bg-primary">
      {/* Top Reading Progress & Back to Top Floating Button */}
      <ReadingProgress />

      {/* 3D WebGL Canvas Layer */}
      <SeashoreOceanCanvas />
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
      <AudioSynthesizer />

      {/* Quick Contact Modal */}
      <ContactModal isOpen={contactOpen} onClose={() => setContactOpen(false)} />

      {/* Executive Resume Modal */}
      <ResumeModal isOpen={resumeOpen} onClose={() => setResumeOpen(false)} />


    </main>
  );
}
