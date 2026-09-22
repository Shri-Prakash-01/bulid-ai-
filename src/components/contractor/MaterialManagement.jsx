import React from 'react';

export default function MaterialManagement() {
  const inventory = [
    { name: 'OPC High Alumina Cement', req: '850 Bags', purchased: '600 Bags', used: '520 Bags', rem: '80 Bags', status: 'Reorder Soon' },
    { name: 'TMT Steel Rebars Fe-550', req: '12.5 Tons', purchased: '12.5 Tons', used: '10.2 Tons', rem: '2.3 Tons', status: 'Sufficient' },
    { name: 'Double Washed River Sand', req: '4,500 Cu.Ft', purchased: '3,800 Cu.Ft', used: '3,100 Cu.Ft', rem: '700 Cu.Ft', status: 'Sufficient' }
  ];

  return (
    <div class="space-y-6">
      <div class="bg-white p-6 rounded-3xl border border-[#c2c6d6]/30 shadow-sm space-y-1">
        <span class="text-xs font-bold text-[#006c49] uppercase tracking-widest">Contractor Page 08 — Materials</span>
        <h2 class="font-display text-2xl font-bold text-[#131b2e]">Material Inventory & Vendor Procurement</h2>
        <p class="text-xs text-[#727785]">Track BOQ required vs purchased vs on-site remaining quantities</p>
      </div>

      <div class="bg-white rounded-3xl p-6 border border-[#c2c6d6]/30 shadow-lg space-y-3">
        {inventory.map((i, idx) => (
          <div key={idx} class="p-4 bg-[#f2f3ff] rounded-2xl flex flex-col md:flex-row justify-between items-start md:items-center gap-3 text-xs">
            <div>
              <h4 class="font-bold text-sm text-[#131b2e]">{i.name}</h4>
              <p class="text-[#727785]">BOQ Req: <strong>{i.req}</strong> • Purchased: <strong>{i.purchased}</strong></p>
            </div>
            <div class="flex items-center gap-4">
              <span class="font-bold text-[#006c49]">Remaining: {i.rem}</span>
              <span class={`px-2.5 py-1 rounded text-[10px] font-bold ${
                i.status === 'Reorder Soon' ? 'bg-[#ffdad6] text-[#ba1a1a]' : 'bg-[#6cf8bb]/40 text-[#00714d]'
              }`}>
                {i.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
