import React from 'react';
import { profileData } from '@/data/profile';

export default function About() {
  return (
    <section id="about" className="max-w-6xl mx-auto px-6 py-24 relative z-10">
      <div className="mb-12">
        <h2 className="font-heading text-3xl sm:text-4xl font-bold text-textMain tracking-tight">
          Building with AI &amp; Data
        </h2>
        <p className="text-textMuted text-base sm:text-lg mt-4 max-w-2xl font-sans">
          {profileData.summary}
        </p>
        
        <div className="mt-8 flex flex-wrap gap-3">
          <span className="px-3 py-1.5 bg-secondary border border-rule text-textMuted text-sm font-mono rounded-md">
            3.51/4 CGPA
          </span>
          <span className="px-3 py-1.5 bg-secondary border border-rule text-textMuted text-sm font-mono rounded-md">
            50+ custom notation symbols
          </span>
          <span className="px-3 py-1.5 bg-secondary border border-rule text-textMuted text-sm font-mono rounded-md">
            ~40% latency reduction
          </span>
          <span className="px-3 py-1.5 bg-secondary border border-rule text-textMuted text-sm font-mono rounded-md">
            ₹1 Cr deal advanced
          </span>
        </div>
      </div>
    </section>
  );
}
