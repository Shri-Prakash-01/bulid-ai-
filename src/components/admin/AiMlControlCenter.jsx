import React from 'react';

export default function AiMlControlCenter() {
  const models = [
    {
      name: 'Model 01 — Cost Estimation ML Model',
      version: 'v4.8.2-prod',
      accuracy: '99.4% Precision',
      features: ['Location Pincode', 'Plot Built-up Area', 'Floors', 'Finishing Quality Tier', 'Regional Cement/Steel Rate'],
      outputFormat: 'ML Base Cost + 25% Contingency Buffer = Indicative Project Cost'
    },
    {
      name: 'Model 02 — Loan Feasibility ML Model',
      version: 'v2.1.0-prod',
      accuracy: '97.8% ROC-AUC',
      features: ['Annual Income', 'Existing Monthly EMI', 'Required Loan Amount', 'Tenure Years', 'CIBIL Score', 'Co-applicant Income'],
      outputFormat: 'Indicative Feasibility (Strong / Moderate / Needs Improvement) + EMI & FOIR Ratio'
    }
  ];

  return (
    <div class="space-y-6">
      <div class="bg-gradient-to-r from-[#4648d4] to-[#2f2ebe] text-white p-6 md:p-8 rounded-3xl shadow-xl flex justify-between items-center">
        <div>
          <span class="text-xs font-bold uppercase tracking-widest bg-white/20 px-3 py-1 rounded-full text-white">
            Admin Page 11 — AI / ML Control Center
          </span>
          <h2 class="font-display text-2xl font-bold mt-2">
            Central ML Model Registry & OpenRouter LLM Engine
          </h2>
          <p class="text-xs opacity-90 mt-1">
            Build AI platform utilizes Cost Estimation ML Engine V4.8 + OpenRouter API key (`VITE_OPENROUTER_API_KEY`) for real-time predictions.
          </p>
        </div>
      </div>

      {/* Model Cards */}
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        {models.map((m, idx) => (
          <div key={idx} class="glass-card p-6 rounded-3xl bg-white border border-[#c2c6d6]/30 shadow-lg space-y-4">
            <div class="flex justify-between items-center border-b border-[#c2c6d6]/20 pb-3">
              <div>
                <h3 class="font-bold text-base text-[#131b2e] font-display">{m.name}</h3>
                <span class="text-xs text-[#727785]">Version: {m.version}</span>
              </div>
              <span class="px-3 py-1 bg-[#4648d4] text-white rounded-full text-xs font-bold">
                {m.accuracy}
              </span>
            </div>

            <div class="space-y-2 text-xs">
              <span class="font-bold text-[#131b2e] block">Primary ML Features:</span>
              <div class="flex flex-wrap gap-1.5">
                {m.features.map((f, i) => (
                  <span key={i} class="px-2.5 py-1 bg-[#eaedff] text-[#4648d4] rounded-lg font-semibold">
                    {f}
                  </span>
                ))}
              </div>
            </div>

            <div class="p-3 bg-[#f2f3ff] rounded-xl text-xs space-y-1">
              <span class="font-bold text-[#131b2e]">Pipeline Output Structure:</span>
              <p class="text-[#424754]">{m.outputFormat}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
