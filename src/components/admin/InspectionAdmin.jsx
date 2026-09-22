import React from 'react';

export default function InspectionAdmin() {
  const reports = [
    { id: 'QA-901', project: '#B-2026-X01', stage: 'RCC Slab Casting', inspector: 'Eng. Ramesh Verma', status: 'Passed' },
    { id: 'QA-902', project: '#B-2026-X01', stage: 'MEP Piping Layout', inspector: 'Eng. Anil Kulkarni', status: 'Conditional' }
  ];

  return (
    <div class="space-y-6">
      <div class="bg-white p-6 rounded-3xl border border-[#c2c6d6]/30 shadow-sm space-y-1">
        <span class="text-xs font-bold text-[#4648d4] uppercase tracking-widest">Admin Page 09 — Quality Control</span>
        <h2 class="font-display text-2xl font-bold text-[#131b2e]">Inspection & QA Control</h2>
        <p class="text-xs text-[#727785]">Review inspector reports, defects, rework orders, and approval statuses</p>
      </div>

      <div class="bg-white rounded-3xl p-6 border border-[#c2c6d6]/30 shadow-lg space-y-3">
        {reports.map((r) => (
          <div key={r.id} class="p-4 bg-[#f2f3ff] rounded-2xl flex justify-between items-center text-xs">
            <div>
              <p class="font-bold text-sm text-[#131b2e]">{r.id} — Project: {r.project} ({r.stage})</p>
              <p class="text-[#727785]">Inspector: {r.inspector}</p>
            </div>
            <span class={`px-3 py-1 rounded-full text-xs font-bold ${
              r.status === 'Passed' ? 'bg-[#006c49] text-white' : 'bg-amber-100 text-amber-800'
            }`}>
              {r.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
