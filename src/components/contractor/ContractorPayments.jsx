import React, { useState } from 'react';

export default function ContractorPayments() {
  const [claims] = useState([
    { milestone: 'Milestone 1 — Advance & Site Preparation', amount: 375000, status: 'Received', date: 'Oct 02, 2025' },
    { milestone: 'Milestone 2 — Foundation & Footing', amount: 750000, status: 'Received', date: 'Nov 20, 2025' },
    { milestone: 'Milestone 3 — Superstructure Slab & Masonry', amount: 937500, status: 'Claim Submitted (Pending Escrow Release)', date: 'Mar 15, 2026' }
  ]);

  const handleClaim = () => {
    alert('Milestone payment claim submitted to Homeowner & Admin for QA review!');
  };

  return (
    <div class="space-y-6">
      <div class="flex justify-between items-center bg-white p-6 rounded-3xl border border-[#c2c6d6]/30 shadow-sm">
        <div>
          <span class="text-xs font-bold text-[#006c49] uppercase tracking-widest">Contractor Page 10 — Payments</span>
          <h2 class="font-display text-2xl font-bold text-[#131b2e]">Contractor Milestone Payment Claims</h2>
          <p class="text-xs text-[#727785]">Submit completed milestone claims for homeowner & QA approval</p>
        </div>

        <button onClick={handleClaim} class="px-5 py-2.5 bg-[#006c49] text-white font-bold text-xs rounded-xl shadow-md hover:bg-[#005236]">
          + Claim Milestone Payment
        </button>
      </div>

      <div class="bg-white rounded-3xl p-6 border border-[#c2c6d6]/30 shadow-lg space-y-3">
        {claims.map((c, idx) => (
          <div key={idx} class="p-4 bg-[#f2f3ff] rounded-2xl flex flex-col md:flex-row justify-between items-start md:items-center gap-3 text-xs">
            <div>
              <h4 class="font-bold text-sm text-[#131b2e]">{c.milestone}</h4>
              <p class="text-[#727785]">{c.date}</p>
            </div>
            <div class="flex items-center gap-4">
              <span class="font-bold text-sm text-[#0058be]">₹{c.amount.toLocaleString('en-IN')}</span>
              <span class={`px-3 py-1 rounded-full text-xs font-bold ${
                c.status === 'Received' ? 'bg-[#6cf8bb]/40 text-[#00714d]' : 'bg-amber-100 text-amber-900'
              }`}>
                {c.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
