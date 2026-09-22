import React, { useState } from 'react';

export default function ContractorManagement() {
  const [contractors, setContractors] = useState([
    { id: 'CTR-201', name: 'Apex Constructions', owner: 'Sarah Jenkins', tier: 'Verified Tier 1', docs: '4/4 Uploaded', status: 'Approved' },
    { id: 'CTR-202', name: 'Scranton Builders', owner: 'Michael Scott', tier: 'Pending', docs: '2/4 Uploaded', status: 'Under Review' }
  ]);

  const handleApprove = (id) => {
    setContractors(prev => prev.map(c => c.id === id ? { ...c, status: 'Approved', tier: 'Verified Tier 1' } : c));
  };

  return (
    <div class="space-y-6">
      <div class="bg-white p-6 rounded-3xl border border-[#c2c6d6]/30 shadow-sm space-y-1">
        <span class="text-xs font-bold text-[#4648d4] uppercase tracking-widest">Admin Page 03 — Contractor Oversight</span>
        <h2 class="font-display text-2xl font-bold text-[#131b2e]">Contractor Verification & Tier Management</h2>
        <p class="text-xs text-[#727785]">Review GST, PAN, licenses, and assign verification tiers</p>
      </div>

      <div class="bg-white rounded-3xl p-6 border border-[#c2c6d6]/30 shadow-lg overflow-x-auto">
        <table class="w-full text-left border-collapse">
          <thead>
            <tr class="border-b border-[#c2c6d6]/30 text-xs font-bold text-[#727785] uppercase tracking-wider">
              <th class="py-3 px-3">Contractor ID</th>
              <th class="py-3 px-3">Firm Name</th>
              <th class="py-3 px-3">Owner</th>
              <th class="py-3 px-3">Docs Status</th>
              <th class="py-3 px-3">Verification Tier</th>
              <th class="py-3 px-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-[#c2c6d6]/20 text-xs">
            {contractors.map((c) => (
              <tr key={c.id} class="hover:bg-[#f2f3ff]/60 transition-colors">
                <td class="py-3.5 px-3 font-bold text-[#4648d4]">{c.id}</td>
                <td class="py-3.5 px-3 font-bold text-[#131b2e]">{c.name}</td>
                <td class="py-3.5 px-3 text-[#727785]">{c.owner}</td>
                <td class="py-3.5 px-3 font-semibold text-[#0058be]">{c.docs}</td>
                <td class="py-3.5 px-3">
                  <span class="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#6cf8bb]/40 text-[#00714d]">
                    {c.tier}
                  </span>
                </td>
                <td class="py-3.5 px-3 text-right">
                  {c.status === 'Under Review' ? (
                    <button onClick={() => handleApprove(c.id)} class="px-3 py-1 bg-[#006c49] text-white font-bold rounded-lg hover:bg-[#005236]">
                      Approve & Verify
                    </button>
                  ) : (
                    <span class="text-xs text-[#006c49] font-bold">✓ Verified</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
