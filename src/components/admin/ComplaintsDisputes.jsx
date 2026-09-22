import React, { useState } from 'react';

export default function ComplaintsDisputes() {
  const [disputes] = useState([
    { id: 'DSP-882', user: 'Alex Morgan', contractor: 'Skyline Master Builders', issue: 'Material quality mismatch on 1st floor tiles', status: 'Under Investigation' },
    { id: 'DSP-883', user: 'Rajesh Sharma', contractor: 'Apex Constructions', issue: 'Milestone 3 payment release timeline dispute', status: 'Resolved' }
  ]);

  return (
    <div class="space-y-6">
      <div class="bg-white p-6 rounded-3xl border border-[#c2c6d6]/30 shadow-sm space-y-1">
        <span class="text-xs font-bold text-[#4648d4] uppercase tracking-widest">Admin Page 14 — Dispute Resolution</span>
        <h2 class="font-display text-2xl font-bold text-[#131b2e]">Complaints & Dispute Settlement</h2>
        <p class="text-xs text-[#727785]">User vs Contractor arbitration, QA evidence review, and escrow dispute decisions</p>
      </div>

      <div class="bg-white rounded-3xl p-6 border border-[#c2c6d6]/30 shadow-lg space-y-3">
        {disputes.map((d) => (
          <div key={d.id} class="p-4 bg-[#f2f3ff] rounded-2xl flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
            <div>
              <span class="text-xs font-bold text-[#4648d4]">{d.id}</span>
              <h4 class="font-bold text-sm text-[#131b2e]">{d.issue}</h4>
              <p class="text-xs text-[#727785]">User: <strong>{d.user}</strong> vs Contractor: <strong>{d.contractor}</strong></p>
            </div>

            <div class="flex items-center gap-2">
              <span class={`px-3 py-1 rounded-full text-xs font-bold ${
                d.status === 'Resolved' ? 'bg-[#6cf8bb]/40 text-[#00714d]' : 'bg-[#ffdad6] text-[#ba1a1a]'
              }`}>
                {d.status}
              </span>
              <button onClick={() => alert(`Reviewing dispute evidence for ${d.id}...`)} class="px-3 py-1 bg-[#4648d4] text-white rounded-lg text-xs font-bold">
                Investigate
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
