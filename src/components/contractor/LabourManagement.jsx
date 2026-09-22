import React, { useState } from 'react';

export default function LabourManagement() {
  const [labour] = useState([
    { trade: 'Masons', count: 8, dailyRate: 850, totalDaily: 6800 },
    { trade: 'Helpers / Labourers', count: 12, dailyRate: 550, totalDaily: 6600 },
    { trade: 'Carpenters & Centering', count: 4, dailyRate: 900, totalDaily: 3600 },
    { trade: 'Electricians & Plumbers', count: 4, dailyRate: 950, totalDaily: 3800 }
  ]);

  return (
    <div class="space-y-6">
      <div class="bg-white p-6 rounded-3xl border border-[#c2c6d6]/30 shadow-sm space-y-1">
        <span class="text-xs font-bold text-[#006c49] uppercase tracking-widest">Contractor Page 09 — Labour</span>
        <h2 class="font-display text-2xl font-bold text-[#131b2e]">Labour Attendance & Daily Wage Tracker</h2>
        <p class="text-xs text-[#727785]">Manage trade breakdown, daily worker count, and muster roll</p>
      </div>

      <div class="bg-white rounded-3xl p-6 border border-[#c2c6d6]/30 shadow-lg space-y-3">
        {labour.map((l, idx) => (
          <div key={idx} class="p-4 bg-[#f2f3ff] rounded-2xl flex items-center justify-between text-xs">
            <div>
              <h4 class="font-bold text-sm text-[#131b2e]">{l.trade}</h4>
              <p class="text-[#727785]">On-Site Today: <strong>{l.count} Workers</strong> @ ₹{l.dailyRate}/day</p>
            </div>
            <span class="font-bold text-sm text-[#006c49]">₹{l.totalDaily.toLocaleString('en-IN')}/day</span>
          </div>
        ))}
      </div>
    </div>
  );
}
