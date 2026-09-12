'use client';

import React from 'react';

export default function Skills() {
  return (
    <section id="skills" className="max-w-4xl mx-auto px-6 py-24 relative z-10">
      <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-textMain tracking-tight">
            Skills &amp; Competencies
          </h2>
          <p className="text-textMuted text-base sm:text-lg mt-4 font-sans">
            Proficiencies across multi-agent AI frameworks, full-stack architectures, and enterprise analytics.
          </p>
        </div>
      </div>

      <div className="flex flex-col text-textMain font-sans">
        <div className="py-6 border-b border-rule flex flex-col md:flex-row md:items-baseline gap-2 md:gap-8">
          <div className="font-mono text-sm text-textMuted md:w-32 uppercase tracking-widest shrink-0">
            Core
          </div>
          <div>
            Python · FastAPI · LangGraph · Next.js · SQL
          </div>
        </div>

        <div className="py-6 border-b border-rule flex flex-col md:flex-row md:items-baseline gap-2 md:gap-8">
          <div className="font-mono text-sm text-textMuted md:w-32 uppercase tracking-widest shrink-0">
            Also Use
          </div>
          <div>
            TypeScript · React · Docker · Power BI · Azure
          </div>
        </div>

        <div className="py-6 border-b border-rule flex flex-col md:flex-row md:items-baseline gap-2 md:gap-8">
          <div className="font-mono text-sm text-textMuted md:w-32 uppercase tracking-widest shrink-0">
            Exposure To
          </div>
          <div>
            MS AutoGen · Copilot Studio · SAP HANA · Three.js
          </div>
        </div>
      </div>
    </section>
  );
}
