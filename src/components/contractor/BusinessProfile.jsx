import React, { useState } from 'react';

export default function BusinessProfile() {
  const [profile, setProfile] = useState({
    firmName: 'Apex Constructions & Engineers',
    ownerName: 'Sarah Jenkins',
    contact: '+1 (555) 392-8810',
    location: 'Palo Alto, CA',
    yearsActive: 14,
    teamSize: 32,
    serviceRadius: '50 Miles',
    specializations: ['Luxury Residential Villas', 'Duplex Housing', 'RCC Frame Structure']
  });

  const [toast, setToast] = useState('');

  const handleSave = (e) => {
    e.preventDefault();
    setToast('Business profile updated & saved!');
    setTimeout(() => setToast(''), 2500);
  };

  return (
    <div class="space-y-6">
      <div class="bg-white p-6 rounded-3xl border border-[#c2c6d6]/30 shadow-sm space-y-1">
        <span class="text-xs font-bold text-[#006c49] uppercase tracking-widest">Contractor Page 02 — Business Profile</span>
        <h2 class="font-display text-2xl font-bold text-[#131b2e]">Company Profile & Portfolio</h2>
        <p class="text-xs text-[#727785]">Manage firm information, team capacity, and completed showcase portfolio</p>
      </div>

      {toast && <div class="p-3 bg-[#6cf8bb]/30 text-[#00714d] rounded-xl font-bold text-xs">{toast}</div>}

      <form onSubmit={handleSave} class="bg-white p-6 rounded-3xl border border-[#c2c6d6]/30 shadow-lg space-y-4">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="text-xs font-bold text-[#727785] uppercase block mb-1">Firm / Business Name</label>
            <input type="text" value={profile.firmName} onChange={(e) => setProfile({...profile, firmName: e.target.value})} class="w-full p-3 rounded-xl bg-[#f2f3ff] text-sm font-bold" />
          </div>
          <div>
            <label class="text-xs font-bold text-[#727785] uppercase block mb-1">Owner Name</label>
            <input type="text" value={profile.ownerName} onChange={(e) => setProfile({...profile, ownerName: e.target.value})} class="w-full p-3 rounded-xl bg-[#f2f3ff] text-sm font-bold" />
          </div>
          <div>
            <label class="text-xs font-bold text-[#727785] uppercase block mb-1">Years Active</label>
            <input type="number" value={profile.yearsActive} onChange={(e) => setProfile({...profile, yearsActive: Number(e.target.value)})} class="w-full p-3 rounded-xl bg-[#f2f3ff] text-sm font-bold" />
          </div>
          <div>
            <label class="text-xs font-bold text-[#727785] uppercase block mb-1">Team Size</label>
            <input type="number" value={profile.teamSize} onChange={(e) => setProfile({...profile, teamSize: Number(e.target.value)})} class="w-full p-3 rounded-xl bg-[#f2f3ff] text-sm font-bold" />
          </div>
        </div>

        <button type="submit" class="px-6 py-3 bg-[#006c49] text-white rounded-xl text-xs font-bold shadow-md hover:bg-[#005236]">
          Save Business Profile
        </button>
      </form>
    </div>
  );
}
