import React from 'react';

export default function RfqAdmin() {
  const rfqs = [
    { id: 'RFQ-901', homeowner: 'Rajesh Sharma', quotesReceived: 2, topQuote: '₹36,20,000', status: 'Quote Received' },
    { id: 'RFQ-902', homeowner: 'David Chen', quotesReceived: 1, topQuote: '₹55,00,000', status: 'Pending Review' }
  ];

  return (
    <div class="space-y-6">
      <div class="bg-white p-6 rounded-3xl border border-[#c2c6d6]/30 shadow-sm space-y-1">
        <span class="text-xs font-bold text-[#4648d4] uppercase tracking-widest">Admin Page 07 — RFQ & Quote Monitoring</span>
        <h2 class="font-display text-2xl font-bold text-[#131b2e]">RFQ & Quotations Overview</h2>
        <p class="text-xs text-[#727785]">Monitor submitted contractor bids, quote comparisons, and response rate</p>
      </div>

      <div class="bg-white rounded-3xl p-6 border border-[#c2c6d6]/30 shadow-lg space-y-3">
        {rfqs.map((r) => (
          <div key={r.id} class="p-4 bg-[#f2f3ff] rounded-2xl flex justify-between items-center text-xs">
            <div>
              <p class="font-bold text-sm text-[#131b2e]">{r.id} — Homeowner: {r.homeowner}</p>
              <p class="text-[#727785]">Quotes Received: {r.quotesReceived} • Top Quote: {r.topQuote}</p>
            </div>
            <span class="px-3 py-1 bg-[#4648d4] text-white font-bold rounded-full">{r.status}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
