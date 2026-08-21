import React from 'react';
import { profileData } from '@/data/profile';
import { GitBranch, Cpu, Award, BarChart3 } from 'lucide-react';

export default function About() {
  return (
    <section id="about" className="max-w-6xl mx-auto px-6 py-24 relative z-10">
      <div className="mb-12">
        <span className="font-mono text-xs text-cyanAccent tracking-widest uppercase block mb-2">// 01. Domain Architecture</span>
        <h2 className="font-heading text-3xl sm:text-4xl font-bold text-white tracking-tight">
          Multi-Agent Consensus &amp; Enterprise Telemetry
        </h2>
        <p className="text-slate-400 text-base sm:text-lg mt-3 max-w-2xl">
          {profileData.summary}
        </p>
      </div>

      {/* Domain Artifacts replacing generic icon boxes */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Artifact 1: LangGraph State Machine */}
        <div className="p-6 rounded-xl bg-slate-900/60 backdrop-blur-xl border border-cyanAccent/20 hover:border-cyanAccent/50 transition-all flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between font-mono text-[11px] text-tealAccent uppercase tracking-wider mb-4 border-b border-white/5 pb-2">
              <span>LangGraph Topology</span>
              <span className="text-slate-500">v0.2</span>
            </div>
            <div className="bg-[#030712]/90 rounded-lg p-3 font-mono text-[11px] text-slate-300 mb-4 border border-white/5 space-y-1">
              <div><span className="text-cyanAccent">[Supervisor]</span> ──► <span className="text-amber-300">Router</span></div>
              <div className="pl-4 text-slate-400">├── <span className="text-tealAccent">IndAS_Auditor</span> (RAG)</div>
              <div className="pl-4 text-slate-400">└── <span className="text-tealAccent">ForecastNode</span> (Variance)</div>
              <div><span className="text-slate-500">Trace Latency:</span> <span className="text-tealAccent">1.4s (LangSmith)</span></div>
            </div>
            <h3 className="font-heading text-base font-bold text-white mb-1">Stateful Agent Graphs</h3>
            <p className="text-slate-400 text-xs leading-relaxed">
              Cyclical state graphs with LangGraph, deterministic routing, and structured schema verification.
            </p>
          </div>
        </div>

        {/* Artifact 2: In-Memory Order Book */}
        <div className="p-6 rounded-xl bg-slate-900/60 backdrop-blur-xl border border-cyanAccent/20 hover:border-cyanAccent/50 transition-all flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between font-mono text-[11px] text-tealAccent uppercase tracking-wider mb-4 border-b border-white/5 pb-2">
              <span>Matching Engine</span>
              <span className="text-slate-500">.NET 8 WebAPI</span>
            </div>
            <div className="bg-[#030712]/90 rounded-lg p-3 font-mono text-[11px] text-slate-300 mb-4 border border-white/5 space-y-1">
              <div className="flex justify-between text-[10px]">
                <span className="text-tealAccent">BID 142.50</span>
                <span className="text-slate-500">SPREAD 0.05</span>
                <span className="text-red-400">ASK 142.55</span>
              </div>
              <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden flex">
                <div className="bg-tealAccent/70 w-3/5 h-full" />
                <div className="bg-red-400/70 w-2/5 h-full" />
              </div>
              <div className="pt-1 text-[10px] text-slate-500">WebSocket Latency: <span className="text-tealAccent">&lt;12ms</span></div>
            </div>
            <h3 className="font-heading text-base font-bold text-white mb-1">Low-Latency Paper Trading</h3>
            <p className="text-slate-400 text-xs leading-relaxed">
              In-memory order matching and portfolio equity simulation across Tauri and .NET WebAPI.
            </p>
          </div>
        </div>

        {/* Artifact 3: Supply Chain Variance Matrix */}
        <div className="p-6 rounded-xl bg-slate-900/60 backdrop-blur-xl border border-cyanAccent/20 hover:border-cyanAccent/50 transition-all flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between font-mono text-[11px] text-tealAccent uppercase tracking-wider mb-4 border-b border-white/5 pb-2">
              <span>ABC/XYZ Segmentation</span>
              <span className="text-slate-500">Dow Logistics</span>
            </div>
            <div className="bg-[#030712]/90 rounded-lg p-3 font-mono text-[11px] text-slate-300 mb-4 border border-white/5 space-y-1">
              <div className="grid grid-cols-3 gap-1 text-[9px] text-center">
                <div className="p-1 rounded bg-tealAccent/20 text-tealAccent font-bold">AX (High Vol)</div>
                <div className="p-1 rounded bg-white/5 text-slate-400">AY</div>
                <div className="p-1 rounded bg-white/5 text-slate-400">AZ</div>
              </div>
              <div className="text-[10px] text-slate-400 pt-1">Thresholds: <span className="text-cyanAccent">Dynamic Multi-Lag</span></div>
            </div>
            <h3 className="font-heading text-base font-bold text-white mb-1">Enterprise Analytics</h3>
            <p className="text-slate-400 text-xs leading-relaxed">
              Automated exception pipelines, SAP HANA payload validation, and carrier penalty recovery.
            </p>
          </div>
        </div>
      </div>

      {/* Engineering Telemetry Row */}
      <div className="p-5 rounded-xl bg-slate-900/60 backdrop-blur-xl border border-cyanAccent/20 grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-3 rounded-lg bg-white/5 border border-white/5 font-mono">
          <div className="text-[10px] text-slate-400 uppercase mb-1">Architecture</div>
          <div className="text-white font-bold text-xs">LangGraph Graphs</div>
          <div className="text-[10px] text-tealAccent mt-0.5">Cyclical Nodes</div>
        </div>

        <div className="p-3 rounded-lg bg-white/5 border border-white/5 font-mono">
          <div className="text-[10px] text-slate-400 uppercase mb-1">Backend Stack</div>
          <div className="text-white font-bold text-xs">FastAPI &amp; .NET 8</div>
          <div className="text-[10px] text-slate-400 mt-0.5">Async Microservices</div>
        </div>

        <div className="p-3 rounded-lg bg-white/5 border border-white/5 font-mono">
          <div className="text-[10px] text-slate-400 uppercase mb-1">Academic Rank</div>
          <div className="text-white font-bold text-xs">CGPA: {profileData.cgpa}</div>
          <div className="text-[10px] text-cyanAccent mt-0.5">MPSTME, NMIMS</div>
        </div>

        <div className="p-3 rounded-lg bg-white/5 border border-white/5 font-mono">
          <div className="text-[10px] text-slate-400 uppercase mb-1">Domain Scale</div>
          <div className="text-white font-bold text-xs">Fortune 100 Logistics</div>
          <div className="text-[10px] text-tealAccent mt-0.5">Dow Chemicals</div>
        </div>
      </div>
    </section>
  );
}
