import React, { useState } from 'react';

export default function CostAdmin() {
  const [rates, setRates] = useState({
    economyRate: 1500,
    standardRate: 1850,
    premiumRate: 2400,
    luxuryRate: 3500,
    modelVersion: 'v4.8.2-prod'
  });

  const [toast, setToast] = useState('');

  const handleSave = (e) => {
    e.preventDefault();
    setToast('Rate Master & ML Model v4.8.2 configuration saved!');
    setTimeout(() => setToast(''), 2500);
  };

  return (
    <div class="space-y-6">
      <div class="bg-white p-6 rounded-3xl border border-[#c2c6d6]/30 shadow-sm space-y-1">
        <span class="text-xs font-bold text-[#4648d4] uppercase tracking-widest">Admin Page 05 — Cost Rate Master</span>
        <h2 class="font-display text-2xl font-bold text-[#131b2e]">Cost Estimation Model & Rate Master</h2>
        <p class="text-xs text-[#727785]">Manage base sq.ft rate multipliers and maintain reproducible ML model versioning</p>
      </div>

      {toast && <div class="p-3 bg-[#6cf8bb]/30 text-[#00714d] rounded-xl font-bold text-xs">{toast}</div>}

      <form onSubmit={handleSave} class="bg-white p-6 rounded-3xl border border-[#c2c6d6]/30 shadow-lg space-y-4">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="text-xs font-bold text-[#727785] uppercase block mb-1">Economy Quality Rate (₹/sq.ft)</label>
            <input type="number" value={rates.economyRate} onChange={(e) => setRates({...rates, economyRate: Number(e.target.value)})} class="w-full p-3 rounded-xl bg-[#f2f3ff] font-bold text-sm" />
          </div>

          <div>
            <label class="text-xs font-bold text-[#727785] uppercase block mb-1">Standard Quality Rate (₹/sq.ft)</label>
            <input type="number" value={rates.standardRate} onChange={(e) => setRates({...rates, standardRate: Number(e.target.value)})} class="w-full p-3 rounded-xl bg-[#f2f3ff] font-bold text-sm" />
          </div>

          <div>
            <label class="text-xs font-bold text-[#727785] uppercase block mb-1">Premium Quality Rate (₹/sq.ft)</label>
            <input type="number" value={rates.premiumRate} onChange={(e) => setRates({...rates, premiumRate: Number(e.target.value)})} class="w-full p-3 rounded-xl bg-[#f2f3ff] font-bold text-sm" />
          </div>

          <div>
            <label class="text-xs font-bold text-[#727785] uppercase block mb-1">Luxury Quality Rate (₹/sq.ft)</label>
            <input type="number" value={rates.luxuryRate} onChange={(e) => setRates({...rates, luxuryRate: Number(e.target.value)})} class="w-full p-3 rounded-xl bg-[#f2f3ff] font-bold text-sm" />
          </div>
        </div>

        <button type="submit" class="px-6 py-3 bg-[#4648d4] text-white rounded-xl text-xs font-bold shadow-md hover:bg-[#2f2ebe]">
          Save ML Rate Master Version {rates.modelVersion}
        </button>
      </form>
    </div>
  );
}
