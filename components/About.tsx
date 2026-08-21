import React from 'react';
import { profileData } from '@/data/profile';
import { Bot, Network, BarChart3, GitBranch, Cpu, Award, ExternalLink } from 'lucide-react';

export default function About() {
  return (
    <section id="about" className="max-w-6xl mx-auto px-6 py-24 relative z-10">
      <div className="mb-14">
        <span className="font-mono text-xs text-cyanAccent tracking-widest uppercase block mb-2">// 01. Overview</span>
        <h2 className="font-heading text-3xl sm:text-4xl font-bold text-white tracking-tight">
          Bridging AI Systems & Quantitative Analytics
        </h2>
        <p className="text-slate-400 text-base sm:text-lg mt-3 max-w-2xl">
          {profileData.summary}
        </p>
      </div>

      {/* Core Engineering Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="p-6 rounded-2xl bg-slate-900/60 backdrop-blur-xl border border-cyanAccent/20 hover:border-cyanAccent/50 transition-all group">
          <div className="w-12 h-12 rounded-xl bg-cyanAccent/10 border border-cyanAccent/30 flex items-center justify-center text-cyanAccent mb-4 group-hover:scale-105 transition-transform">
            <Bot className="w-6 h-6" />
          </div>
          <h3 className="font-heading text-lg font-bold text-white mb-2">Multi-Agent Swarms</h3>
          <p className="text-slate-400 text-sm leading-relaxed">
            Constructing autonomous multi-agent pipelines with LangChain, LangGraph, AutoGen, and Ollama, supporting dynamic reasoning, self-correction, and tool calling.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-slate-900/60 backdrop-blur-xl border border-cyanAccent/20 hover:border-cyanAccent/50 transition-all group">
          <div className="w-12 h-12 rounded-xl bg-tealAccent/10 border border-tealAccent/30 flex items-center justify-center text-tealAccent mb-4 group-hover:scale-105 transition-transform">
            <Network className="w-6 h-6" />
          </div>
          <h3 className="font-heading text-lg font-bold text-white mb-2">Modern Full-Stack</h3>
          <p className="text-slate-400 text-sm leading-relaxed">
            Developing responsive, scalable applications with Next.js, React, FastAPI, Node.js, and .NET. Integrating PostgreSQL, Redis, and containerized CI/CD.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-slate-900/60 backdrop-blur-xl border border-cyanAccent/20 hover:border-cyanAccent/50 transition-all group">
          <div className="w-12 h-12 rounded-xl bg-deepViolet/10 border border-deepViolet/30 flex items-center justify-center text-deepViolet mb-4 group-hover:scale-105 transition-transform">
            <BarChart3 className="w-6 h-6" />
          </div>
          <h3 className="font-heading text-lg font-bold text-white mb-2">Supply Chain Analytics</h3>
          <p className="text-slate-400 text-sm leading-relaxed">
            Practical experience deploying exception automation pipelines, demand forecasting models (ABC/XYZ segmentation), and carrier metrics at enterprise scale.
          </p>
        </div>
      </div>

      {/* Engineering Telemetry Strip */}
      <div className="p-6 rounded-2xl bg-slate-900/60 backdrop-blur-xl border border-cyanAccent/20 grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-3.5 rounded-xl bg-white/5 border border-white/5">
          <div className="flex items-center gap-1.5 text-xs text-slate-400 font-mono mb-1">
            <Cpu className="w-3.5 h-3.5 text-cyanAccent" />
            <span>AI Architecture</span>
          </div>
          <div className="text-white font-bold text-sm">LangGraph Swarms</div>
          <div className="text-[10px] text-tealAccent mt-0.5 font-mono">Cyclical Stategraphs</div>
        </div>

        <div className="p-3.5 rounded-xl bg-white/5 border border-white/5">
          <div className="flex items-center gap-1.5 text-xs text-slate-400 font-mono mb-1">
            <GitBranch className="w-3.5 h-3.5 text-tealAccent" />
            <span>Full-Stack</span>
          </div>
          <div className="text-white font-bold text-sm">Next.js &amp; FastAPI</div>
          <div className="text-[10px] text-slate-400 mt-0.5 font-mono">Async Microservices</div>
        </div>

        <div className="p-3.5 rounded-xl bg-white/5 border border-white/5">
          <div className="flex items-center gap-1.5 text-xs text-slate-400 font-mono mb-1">
            <Award className="w-3.5 h-3.5 text-amber-400" />
            <span>Academics</span>
          </div>
          <div className="text-white font-bold text-sm">CGPA: {profileData.cgpa}</div>
          <div className="text-[10px] text-cyanAccent mt-0.5 font-mono">MPSTME, NMIMS</div>
        </div>

        <div className="p-3.5 rounded-xl bg-white/5 border border-white/5">
          <div className="flex items-center gap-1.5 text-xs text-slate-400 font-mono mb-1">
            <BarChart3 className="w-3.5 h-3.5 text-deepViolet" />
            <span>Experience</span>
          </div>
          <div className="text-white font-bold text-sm">Fortune 100 Scale</div>
          <div className="text-[10px] text-tealAccent mt-0.5 font-mono">Dow &amp; Analytica</div>
        </div>
      </div>
    </section>
  );
}
