'use client';

import React, { useState, useEffect, useRef } from 'react';
import { VolumeX, Palette } from 'lucide-react';

interface AudioSynthesizerProps {
  onCycleTheme?: () => void;
}

export default function AudioSynthesizer({ onCycleTheme }: AudioSynthesizerProps) {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const filterNodeRef = useRef<BiquadFilterNode | null>(null);
  const pannerNodeRef = useRef<StereoPannerNode | null>(null);

  const toggleAudio = () => {
    if (!audioCtxRef.current) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioCtx();
      audioCtxRef.current = ctx;

      // Master Gain
      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0.08, ctx.currentTime);
      masterGain.connect(ctx.destination);
      gainNodeRef.current = masterGain;

      // Stereo Panner for Spatial Binaural Audio
      if (ctx.createStereoPanner) {
        const panner = ctx.createStereoPanner();
        panner.pan.setValueAtTime(0, ctx.currentTime);
        panner.connect(masterGain);
        pannerNodeRef.current = panner;
      }

      // Lowpass Filter for Depth
      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(450, ctx.currentTime);
      
      const destination = pannerNodeRef.current || masterGain;
      filter.connect(destination);
      filterNodeRef.current = filter;

      // 1. Oceanic Pink/White Noise Generator
      const bufferSize = ctx.sampleRate * 2;
      const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      let b0 = 0, b1 = 0, b2 = 0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        b0 = 0.99 * b0 + white * 0.05;
        b1 = 0.95 * b1 + white * 0.08;
        b2 = 0.85 * b2 + white * 0.15;
        output[i] = (b0 + b1 + b2) * 0.4;
      }
      const noise = ctx.createBufferSource();
      noise.buffer = noiseBuffer;
      noise.loop = true;
      noise.connect(filter);
      noise.start();

      // 2. Harmonic Ambient Resonance Drone
      const osc1 = ctx.createOscillator();
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(110, ctx.currentTime);
      const osc1Gain = ctx.createGain();
      osc1Gain.gain.setValueAtTime(0.04, ctx.currentTime);
      osc1.connect(osc1Gain);
      osc1Gain.connect(filter);
      osc1.start();

      const osc2 = ctx.createOscillator();
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(164.81, ctx.currentTime);
      const osc2Gain = ctx.createGain();
      osc2Gain.gain.setValueAtTime(0.025, ctx.currentTime);
      osc2.connect(osc2Gain);
      osc2Gain.connect(filter);
      osc2.start();

      setIsPlaying(true);
    } else {
      if (audioCtxRef.current.state === 'suspended') {
        audioCtxRef.current.resume();
        setIsPlaying(true);
      } else if (audioCtxRef.current.state === 'running') {
        audioCtxRef.current.suspend();
        setIsPlaying(false);
      }
    }
  };

  // Adjust filter cutoff with scroll depth & adjust stereo panning with cursor X position
  useEffect(() => {
    const handleScroll = () => {
      if (filterNodeRef.current && audioCtxRef.current) {
        const scrollY = window.scrollY || document.documentElement.scrollTop;
        const progress = Math.min(1, scrollY / (window.innerHeight * 1.5));
        const freq = 550 - progress * 330;
        filterNodeRef.current.frequency.setTargetAtTime(freq, audioCtxRef.current.currentTime, 0.1);
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (pannerNodeRef.current && audioCtxRef.current) {
        const panValue = (e.clientX / window.innerWidth) * 2 - 1;
        pannerNodeRef.current.pan.setTargetAtTime(panValue * 0.45, audioCtxRef.current.currentTime, 0.1);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2">
      {/* Theme Toggle */}
      {onCycleTheme && (
        <button
          onClick={onCycleTheme}
          className="p-3 rounded-full backdrop-blur-xl border transition-all shadow-xl bg-secondary/80 border-rule text-textMuted hover:text-cyanAccent hover:border-cyanAccent/40"
          title="Cycle Theme"
          aria-label="Cycle theme"
        >
          <Palette className="w-4 h-4" />
        </button>
      )}

      {/* Sound Toggle */}
      <button
        onClick={toggleAudio}
        className={`p-3 rounded-full backdrop-blur-xl border transition-all shadow-xl ${
          isPlaying
            ? 'bg-cyanAccent/15 border-cyanAccent text-cyanAccent shadow-cyanAccent/20'
            : 'bg-secondary/80 border-rule text-textMuted hover:text-textMain hover:border-cyanAccent/40'
        }`}
        title={isPlaying ? 'Mute Oceanic Ambience' : 'Play Ambient Ocean Sound'}
        aria-label="Toggle ambient oceanic soundscape"
      >
        {isPlaying ? (
          <div className="flex items-end gap-0.5 h-4 w-4">
            <span className="w-1 bg-cyanAccent animate-[pulse_0.8s_ease-in-out_infinite] h-full rounded-full" />
            <span className="w-1 bg-textMuted animate-[pulse_0.6s_ease-in-out_infinite_0.2s] h-2/3 rounded-full" />
            <span className="w-1 bg-cyanAccent animate-[pulse_1.0s_ease-in-out_infinite_0.4s] h-4/5 rounded-full" />
          </div>
        ) : (
          <VolumeX className="w-4 h-4" />
        )}
      </button>
    </div>
  );
}
