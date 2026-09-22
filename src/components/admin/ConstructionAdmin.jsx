import React from 'react';

export default function ConstructionAdmin() {
  const sites = [
    { project: '#B-2026-X01', homeowner: 'Rajesh Sharma', contractor: 'Apex Constructions', stage: 'Plastering & Wiring', progress: 65, delayStatus: 'On Schedule' },
    { project: '#B-2026-X02', homeowner: 'David Chen', contractor: 'Skyline Master Builders', stage: 'Foundation Plinth', progress: 30, delayStatus: 'On Schedule' }
  ];

  return (
    <div class="space-y-6">
      <div class="bg-white p-6 rounded-3xl border border-[#c2c6d6]/30 shadow-sm space-y-1">
        <span class="text-xs font-bold text-[#4648d4] uppercase tracking-widest">Admin Page 08 — Construction Monitoring</span>
        <h2 class="font-display text-2xl font-bold text-[#131b2e]">Active Construction Monitoring</h2>
        <p class="text-xs text-[#727785]">Monitor current stage, completion %, delays, and QA status across active sites</p>
      </div>

      <div class="bg-white rounded-3xl p-6 border border-[#c2c6d6]/30 shadow-lg space-y-3">
        {sites.map((s) => (
          <div key={s.project} class="p-4 bg-[#f2f3ff] rounded-2xl flex justify-between items-center text-xs">
            <div>
              <p class="font-bold text-sm text-[#131b2e]">{s.project} ({s.homeowner} / {s.contractor})</p>
              <p class="text-[#727785]">Current Stage: {s.stage} ({s.progress}%)</p>
            </div>
            <span class="px-3 py-1 bg-[#006c49] text-white font-bold rounded-full">{s.delayStatus}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
