import React from 'react';

export default function VerificationCenter() {
  const docs = [
    { title: 'Contractor License #CAL-BUILD-88492', type: 'Government License', status: 'Verified' },
    { title: 'GST Registration Certificate', type: 'Tax ID', status: 'Verified' },
    { title: 'PAN Card & Business Identity', type: 'ID Proof', status: 'Verified' },
    { title: 'Workmen Compensation Insurance', type: 'Insurance', status: 'Verified' }
  ];

  return (
    <div class="space-y-6">
      <div class="bg-white p-6 rounded-3xl border border-[#c2c6d6]/30 shadow-sm space-y-1">
        <span class="text-xs font-bold text-[#006c49] uppercase tracking-widest">Contractor Page 03 — Verification Center</span>
        <h2 class="font-display text-2xl font-bold text-[#131b2e]">Build AI Contractor Verification</h2>
        <p class="text-xs text-[#727785]">Verification documents required to bid on client RFQs</p>
      </div>

      <div class="bg-white p-6 rounded-3xl border border-[#c2c6d6]/30 shadow-lg space-y-3">
        {docs.map((d, idx) => (
          <div key={idx} class="p-4 bg-[#f2f3ff] rounded-2xl flex items-center justify-between">
            <div>
              <p class="font-bold text-sm text-[#131b2e]">{d.title}</p>
              <p class="text-xs text-[#727785]">{d.type}</p>
            </div>
            <span class="px-3 py-1 rounded-full text-xs font-bold bg-[#006c49] text-white">
              ✓ {d.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
