import React, { useEffect, useState } from 'react';

export default function SplashLoading({ onFinishLoading }) {
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState('Initializing Build AI Platform...');

  useEffect(() => {
    const statuses = [
      'Initializing Build AI Platform...',
      'Loading AI Cost Prediction Models...',
      'Connecting Architectural Layout Engine...',
      'Syncing Contractor & Rate Database...',
      'Securing Platform Workspace...'
    ];

    let current = 0;
    const interval = setInterval(() => {
      current += 20;
      setProgress(current);
      if (current < 100) {
        setStatusText(statuses[Math.floor(current / 25)]);
      } else {
        clearInterval(interval);
        setTimeout(() => {
          onFinishLoading();
        }, 400);
      }
    }, 350);

    return () => clearInterval(interval);
  }, [onFinishLoading]);

  return (
    <div class="fixed inset-0 z-[200] bg-[#131b2e] text-white flex flex-col items-center justify-center p-6 select-none overflow-hidden">
      {/* Background Subtle Gradient Glow */}
      <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#0058be]/20 rounded-full blur-[120px] pointer-events-none"></div>

      {/* Brand & Logo Header */}
      <div class="relative z-10 flex flex-col items-center text-center max-w-md">
        <div class="w-20 h-20 bg-gradient-to-tr from-[#0058be] to-[#2170e4] rounded-3xl flex items-center justify-center shadow-2xl shadow-[#0058be]/50 mb-6 border border-white/20 animate-bounce" style={{ animationDuration: '3s' }}>
          <span class="material-symbols-outlined text-4xl text-white" style={{ fontVariationSettings: "'FILL' 1" }}>
            construction
          </span>
        </div>

        <h1 class="font-display text-4xl md:text-5xl font-extrabold tracking-tight mb-2 bg-gradient-to-r from-white via-blue-100 to-blue-300 bg-clip-text text-transparent">
          BUILD AI
        </h1>

        <p class="text-sm font-semibold tracking-widest text-[#6cf8bb] uppercase mb-8">
          Plan. Estimate. Build. Verify.
        </p>

        {/* Progress Bar Container */}
        <div class="w-72 bg-white/10 rounded-full h-2 overflow-hidden mb-3 border border-white/10 p-0.5">
          <div
            class="bg-gradient-to-r from-[#0058be] via-[#2170e4] to-[#6cf8bb] h-full rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        <p class="text-xs text-slate-400 font-mono min-h-[20px] transition-all">
          {statusText} ({progress}%)
        </p>
      </div>

      {/* Footer Tagline */}
      <div class="absolute bottom-8 text-center text-xs text-slate-500 font-medium">
        India's First End-to-End AI-Assisted House Construction Platform
      </div>
    </div>
  );
}
