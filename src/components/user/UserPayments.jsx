import React, { useState } from 'react';

export default function UserPayments({ projectData }) {
  const [released, setReleased] = useState({});

  const totalBudget = projectData.budget || 3750000;

  const paymentMilestones = [
    { id: 1, name: 'Milestone 1 — Advance & Site Preparation', amount: Math.round(totalBudget * 0.10), status: 'Released', date: 'Oct 02, 2025' },
    { id: 2, name: 'Milestone 2 — Foundation & Plinth Footing', amount: Math.round(totalBudget * 0.20), status: 'Released', date: 'Nov 20, 2025' },
    { id: 3, name: 'Milestone 3 — Superstructure Slab & Masonry', amount: Math.round(totalBudget * 0.25), status: 'Claimed by Contractor', date: 'Pending Review' },
    { id: 4, name: 'Milestone 4 — Flooring, Electrical & Plumbing', amount: Math.round(totalBudget * 0.25), status: 'Locked', date: 'Scheduled May 2026' },
    { id: 5, name: 'Milestone 5 — Final Handover & Painting', amount: Math.round(totalBudget * 0.20), status: 'Locked', date: 'Scheduled Aug 2026' }
  ];

  const handleRelease = (id) => {
    setReleased(prev => ({ ...prev, [id]: true }));
    alert('Payment claim approved! ₹4,20,000 released to Apex Constructions escrow account.');
  };

  return (
    <div class="space-y-6">
      {/* Header */}
      <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-3xl border border-[#c2c6d6]/30 shadow-sm">
        <div>
          <span class="text-xs font-bold text-[#0058be] uppercase tracking-widest">
            User Page 11 — Milestone Escrow & Payments
          </span>
          <h2 class="font-display text-2xl font-bold text-[#131b2e]">
            Milestone Payment Release Workflow
          </h2>
          <p class="text-xs text-[#727785] mt-0.5">
            Contractor Claim ➔ QA Inspection Passed ➔ Homeowner Approval ➔ Escrow Release
          </p>
        </div>

        <div class="text-right">
          <span class="text-xs text-[#727785] block uppercase font-semibold">Total Budget</span>
          <span class="font-display text-2xl font-bold text-[#0058be]">₹{totalBudget.toLocaleString('en-IN')}</span>
        </div>
      </div>

      {/* Payment Milestones List */}
      <div class="bg-white p-6 rounded-3xl border border-[#c2c6d6]/30 shadow-lg space-y-4">
        <h3 class="font-bold text-base text-[#131b2e] font-display">Escrow Payment Tranches</h3>

        <div class="space-y-3">
          {paymentMilestones.map((m) => {
            const isDone = m.status === 'Released' || released[m.id];
            const isClaimed = m.status === 'Claimed by Contractor' && !released[m.id];

            return (
              <div key={m.id} class="p-4 bg-[#f2f3ff] rounded-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div>
                  <div class="flex items-center gap-2">
                    <h4 class="font-bold text-sm text-[#131b2e]">{m.name}</h4>
                    <span class={`text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase ${
                      isDone
                        ? 'bg-[#006c49] text-white'
                        : isClaimed
                        ? 'bg-amber-100 text-amber-900 border border-amber-300'
                        : 'bg-[#c2c6d6] text-[#424754]'
                    }`}>
                      {isDone ? 'Payment Released' : isClaimed ? 'Claim Pending Approval' : 'Locked'}
                    </span>
                  </div>
                  <p class="text-xs text-[#727785] mt-0.5">{m.date}</p>
                </div>

                <div class="flex items-center gap-4">
                  <span class="font-display font-bold text-base text-[#0058be]">
                    ₹{m.amount.toLocaleString('en-IN')}
                  </span>

                  {isClaimed && (
                    <button
                      onClick={() => handleRelease(m.id)}
                      class="px-5 py-2 bg-[#006c49] text-white rounded-xl text-xs font-bold shadow-md hover:bg-[#005236] transition-all cursor-pointer animate-bounce"
                    >
                      Approve & Release Payment
                    </button>
                  )}

                  {isDone && (
                    <span class="text-xs font-bold text-[#006c49] flex items-center gap-1">
                      <span class="material-symbols-outlined text-sm">check_circle</span> Approved
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
