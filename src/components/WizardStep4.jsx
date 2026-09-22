import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { predictCostAndOutcome, getOpenRouterApiKey } from '../services/openrouterService';

export default function WizardStep4({ onFinishSimulation, propertyData = {}, roomData = {}, styleData = {} }) {
  const [progress, setProgress] = useState(0);
  const [msgIndex, setMsgIndex] = useState(0);
  const [isDone, setIsDone] = useState(false);
  const [aiResult, setAiResult] = useState(null);
  const currentKey = getOpenRouterApiKey();

  useEffect(() => {
    // Fire OpenRouter prediction asynchronously
    predictCostAndOutcome({ propertyData, roomData, styleData }).then((res) => {
      setAiResult(res);
    });
  }, []);


  const messages = [
    "Analyzing location & site survey data...",
    "Calculating structural foundation cost...",
    "Estimating material volume (BOM)...",
    "Generating dynamic Gantt timeline...",
    "Designing interior layout & lighting...",
    "Preparing executive report..."
  ];

  useEffect(() => {
    let currentProgress = 0;
    let msgIdx = 0;
    const totalLength = 754;

    const interval = setInterval(() => {
      currentProgress += Math.random() * 6 + 2;
      if (currentProgress >= 100) {
        currentProgress = 100;
        setProgress(100);
        setIsDone(true);
        clearInterval(interval);

        // Fire celebratory confetti
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
        return;
      }

      setProgress(Math.floor(currentProgress));

      const stepThreshold = (msgIdx + 1) * (100 / messages.length);
      if (currentProgress > stepThreshold && msgIdx < messages.length - 1) {
        msgIdx++;
        setMsgIndex(msgIdx);
      }
    }, 200);

    return () => clearInterval(interval);
  }, []);

  const totalLength = 754;
  const strokeDashoffset = totalLength - (progress / 100) * totalLength;

  return (
    <div class="min-h-[550px] flex flex-col items-center justify-center space-y-8 py-8">
      {/* Central Animation Cluster */}
      <div class="relative w-80 h-80 flex items-center justify-center">
        {/* Background Glow */}
        <div class="absolute inset-0 bg-[#0058be]/20 blur-[80px] rounded-full animate-pulse"></div>

        {/* Rotating Rings */}
        <div class="absolute inset-0 border-4 border-dashed border-[#0058be]/30 rounded-full animate-rotate-slow"></div>
        <div class="absolute inset-4 border-2 border-[#0058be]/20 rounded-full animate-spin" style={{ animationDuration: '10s' }}></div>

        {/* Inner Progress Circle */}
        <div class="relative w-64 h-64 glass-card rounded-full flex flex-col items-center justify-center z-10 border-2 border-white/60 shadow-2xl">
          <svg class="absolute inset-0 w-full h-full -rotate-90">
            <circle
              cx="128"
              cy="128"
              r="120"
              fill="transparent"
              stroke="#eaedff"
              strokeWidth="8"
            />
            <circle
              cx="128"
              cy="128"
              r="120"
              fill="transparent"
              stroke="#0058be"
              strokeWidth="8"
              strokeDasharray={totalLength}
              strokeDashoffset={strokeDashoffset}
              style={{ transition: 'stroke-dashoffset 0.3s ease-out' }}
            />
          </svg>
          <span class="font-display text-[54px] font-bold text-[#0058be]">
            {progress}%
          </span>
          <span class="text-xs font-semibold text-[#424754] uppercase tracking-wider">
            {isDone ? 'Estimation Ready' : 'AI Computing'}
          </span>
        </div>

        {/* Floating Orbital Badges */}
        <div class="absolute -top-3 -right-3 glass-card p-2 rounded-xl flex items-center gap-2 animate-bounce shadow-md">
          <span class="material-symbols-outlined text-[#006c49]">account_balance_wallet</span>
          <span class="text-xs font-bold text-[#131b2e]">Budgeting...</span>
        </div>
        <div class="absolute -bottom-6 -left-3 glass-card p-2 rounded-xl flex items-center gap-2 animate-bounce shadow-md" style={{ animationDuration: '4s' }}>
          <span class="material-symbols-outlined text-[#4648d4]">architecture</span>
          <span class="text-xs font-bold text-[#131b2e]">Drafting...</span>
        </div>
      </div>

      {/* Status Text Area */}
      <div class="text-center space-y-4 max-w-lg">
        <div class="h-10 flex items-center justify-center">
          <p class="font-bold text-xl text-[#131b2e] transition-all duration-300">
            {isDone ? '🎉 Estimation Complete!' : messages[msgIndex]}
          </p>
        </div>

        <div class="flex items-center justify-center gap-2">
          <span class="w-2 h-2 rounded-full bg-[#0058be] animate-ping"></span>
          <span class="text-xs font-semibold text-[#424754] tracking-wider uppercase">
            Processing BuildAI Neural Engine
          </span>
        </div>
      </div>

      {/* Details Reveal Card */}
      <div class={`w-full max-w-3xl glass-card p-6 rounded-2xl transition-all duration-700 ${isDone ? 'opacity-100 translate-y-0 shadow-xl' : 'opacity-40 translate-y-4'}`}>
        {aiResult && (
          <div class="mb-4 p-3 bg-[#0058be]/10 border border-[#0058be]/30 rounded-xl flex items-center justify-between text-xs font-bold text-[#0058be]">
            <span class="flex items-center gap-1.5">
              <span class="material-symbols-outlined text-sm">auto_awesome</span>
              {aiResult.source || 'OpenRouter AI Engine'}
            </span>
            <span class="bg-[#0058be] text-white px-2.5 py-0.5 rounded-full text-[10px]">
              {aiResult.usedOpenRouter ? 'Live OpenRouter Key Connected' : 'Local Fallback'}
            </span>
          </div>
        )}

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div class="space-y-1">
            <p class="text-[#424754] text-xs font-bold uppercase">Structural Integrity</p>
            <div class="w-full bg-[#eaedff] rounded-full h-2">
              <div class="bg-[#006c49] h-2 rounded-full transition-all duration-1000" style={{ width: `${Math.min(100, progress * 1.0)}%` }}></div>
            </div>
            <p class="text-[11px] text-[#006c49] font-bold">100% Verified Code Compliance</p>
          </div>

          <div class="space-y-1">
            <p class="text-[#424754] text-xs font-bold uppercase">Material Sourcing</p>
            <div class="w-full bg-[#eaedff] rounded-full h-2">
              <div class="bg-[#0058be] h-2 rounded-full transition-all duration-1000" style={{ width: `${Math.min(100, progress * 0.95)}%` }}></div>
            </div>
            <p class="text-[11px] text-[#0058be] font-bold">Local Market Rates Matched</p>
          </div>

          <div class="space-y-1">
            <p class="text-[#424754] text-xs font-bold uppercase">Environmental ROI</p>
            <div class="w-full bg-[#eaedff] rounded-full h-2">
              <div class="bg-[#4648d4] h-2 rounded-full transition-all duration-1000" style={{ width: `${Math.min(100, progress * 0.88)}%` }}></div>
            </div>
            <p class="text-[11px] text-[#4648d4] font-bold">Solar & Thermal Optimized</p>
          </div>
        </div>
      </div>

      {isDone && (
        <button
          onClick={onFinishSimulation}
          class="px-10 py-4 bg-[#0058be] text-white rounded-xl font-bold text-lg shadow-2xl hover:scale-105 active:scale-95 transition-all flex items-center gap-3 cursor-pointer animate-pulse"
        >
          View Final Report Dashboard
          <span class="material-symbols-outlined">arrow_forward</span>
        </button>
      )}
    </div>
  );
}
