import React from 'react';

export default function ContractorMatchingAdmin() {
  const matches = [
    { homeowner: 'Rajesh Sharma', contractor: 'Apex Constructions', matchScore: '98%', reason: 'Geographic proximity, Villa specialization & budget fit' },
    { homeowner: 'David Chen', contractor: 'Skyline Master Builders', matchScore: '91%', reason: 'San Jose service radius & Duplex RCC capacity' }
  ];

  return (
    <div class="space-y-6">
      <div class="bg-white p-6 rounded-3xl border border-[#c2c6d6]/30 shadow-sm space-y-1">
        <span class="text-xs font-bold text-[#4648d4] uppercase tracking-widest">Admin Page 06 — Contractor Matching</span>
        <h2 class="font-display text-2xl font-bold text-[#131b2e]">Contractor Matching Engine Review</h2>
        <p class="text-xs text-[#727785]">Review capability, rating, cost adherence, and matching factors</p>
      </div>

      <div class="bg-white rounded-3xl p-6 border border-[#c2c6d6]/30 shadow-lg space-y-3">
        {matches.map((m, idx) => (
          <div key={idx} class="p-4 bg-[#f2f3ff] rounded-2xl flex flex-col md:flex-row justify-between items-start md:items-center gap-3 text-xs">
            <div>
              <p class="font-bold text-sm text-[#131b2e]">Homeowner: {m.homeowner} ➔ Matched Contractor: {m.contractor}</p>
              <p class="text-[#727785]">Match Rationale: {m.reason}</p>
            </div>
            <span class="px-3 py-1 rounded-full bg-[#6cf8bb]/40 text-[#00714d] font-bold text-xs">
              {m.matchScore} Match Score
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
