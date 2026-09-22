import React from 'react';

export default function PaymentAdmin() {
  const transactions = [
    { txId: 'TX-701', project: '#B-2026-X01', milestone: 'Milestone 1 — Advance', amount: '₹3,75,000', status: 'Released' },
    { txId: 'TX-702', project: '#B-2026-X01', milestone: 'Milestone 2 — Plinth', amount: '₹7,50,000', status: 'Released' },
    { txId: 'TX-703', project: '#B-2026-X01', milestone: 'Milestone 3 — Structure Slab', amount: '₹9,37,500', status: 'Escrow Held (Pending Review)' }
  ];

  return (
    <div class="space-y-6">
      <div class="bg-white p-6 rounded-3xl border border-[#c2c6d6]/30 shadow-sm space-y-1">
        <span class="text-xs font-bold text-[#4648d4] uppercase tracking-widest">Admin Page 10 — Payment Control</span>
        <h2 class="font-display text-2xl font-bold text-[#131b2e]">Payment Ledger & Escrow Monitoring</h2>
        <p class="text-xs text-[#727785]">Audit transaction ledger, milestone releases, and payment disputes</p>
      </div>

      <div class="bg-white rounded-3xl p-6 border border-[#c2c6d6]/30 shadow-lg space-y-3">
        {transactions.map((t) => (
          <div key={t.txId} class="p-4 bg-[#f2f3ff] rounded-2xl flex justify-between items-center text-xs">
            <div>
              <p class="font-bold text-sm text-[#131b2e]">{t.txId} — {t.project} ({t.milestone})</p>
              <p class="text-[#727785]">Transaction Amount: <strong class="text-[#0058be]">{t.amount}</strong></p>
            </div>
            <span class={`px-3 py-1 rounded-full text-xs font-bold ${
              t.status === 'Released' ? 'bg-[#006c49] text-white' : 'bg-amber-100 text-amber-900'
            }`}>
              {t.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
