'use client';

import React, { useState } from 'react';
import { profileData } from '@/data/profile';
import { Mail, Copy, Check, Send, X } from 'lucide-react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [copied, setCopied] = useState<boolean>(false);
  const [selectedTopic, setSelectedTopic] = useState<string>('ai');

  if (!isOpen) return null;

  const topics = [
    { id: 'ai', label: 'Multi-Agent AI / LLM Systems', subject: 'Inquiry: Multi-Agent AI Collaboration' },
    { id: 'fullstack', label: 'Full-Stack Development', subject: 'Inquiry: Full-Stack Project Collaboration' },
    { id: 'analytics', label: 'Quantitative Analytics / Finance', subject: 'Inquiry: Analytics & Finance Discussion' },
  ];

  const handleCopy = () => {
    navigator.clipboard.writeText(profileData.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSendEmail = () => {
    const currentTopic = topics.find((t) => t.id === selectedTopic) || topics[0];
    const mailtoUrl = `mailto:${profileData.email}?subject=${encodeURIComponent(currentTopic.subject)}`;
    window.location.href = mailtoUrl;
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md transition-all"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg bg-[#081226] border border-cyanAccent/40 rounded-3xl p-8 shadow-2xl shadow-cyanAccent/20"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-6 right-6 w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        <h3 className="font-heading text-2xl font-bold text-white mb-2">Get in Touch</h3>
        <p className="text-slate-400 text-sm mb-6">
          Reach out for multi-agent system architecture, full-stack consulting, or technology & analytics discussions.
        </p>

        <div className="mb-6">
          <label className="block text-xs font-mono text-cyanAccent uppercase tracking-wider mb-2">
            Select Inquiry Area
          </label>
          <div className="flex flex-col gap-2">
            {topics.map((t) => (
              <button
                key={t.id}
                onClick={() => setSelectedTopic(t.id)}
                className={`p-3 rounded-xl text-left text-xs font-semibold transition-all border ${
                  selectedTopic === t.id
                    ? 'bg-cyanAccent/10 border-cyanAccent text-white'
                    : 'bg-white/5 border-white/10 text-slate-400 hover:text-slate-200'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-white/10">
          <button
            onClick={handleSendEmail}
            className="flex-1 py-3 px-5 rounded-xl font-semibold text-xs text-primary bg-gradient-to-r from-cyanAccent to-tealAccent hover:opacity-90 transition-all flex items-center justify-center gap-2 shadow-lg shadow-cyanAccent/20"
          >
            <Send className="w-4 h-4" />
            Open Mail Client
          </button>

          <button
            onClick={handleCopy}
            className="py-3 px-4 rounded-xl font-semibold text-xs text-slate-200 bg-white/5 border border-white/10 hover:border-cyanAccent/40 hover:text-cyanAccent transition-all flex items-center justify-center gap-2"
          >
            {copied ? <Check className="w-4 h-4 text-tealAccent" /> : <Copy className="w-4 h-4" />}
            {copied ? 'Copied' : 'Copy Email'}
          </button>
        </div>
      </div>
    </div>
  );
}
