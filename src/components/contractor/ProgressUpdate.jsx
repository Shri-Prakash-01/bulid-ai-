import React, { useState } from 'react';

export default function ProgressUpdate() {
  const [stage, setStage] = useState('6. Plastering & Wiring');
  const [percent, setPercent] = useState(75);
  const [notes, setNotes] = useState('Completed 1st floor plastering and conduit wiring. Curing in progress.');
  const [masons, setMasons] = useState(8);
  const [helpers, setHelpers] = useState(12);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Daily construction progress broadcasted to homeowner dashboard!');
  };

  return (
    <div class="space-y-6 max-w-3xl mx-auto">
      <div class="bg-white p-6 rounded-3xl border border-[#c2c6d6]/30 shadow-sm space-y-1">
        <span class="text-xs font-bold text-[#006c49] uppercase tracking-widest">Contractor Page 07 — Site Logger</span>
        <h2 class="font-display text-2xl font-bold text-[#131b2e]">Daily Construction Progress Update</h2>
        <p class="text-xs text-[#727785]">Upload photos, work completion %, materials used, and labour attendance</p>
      </div>

      <form onSubmit={handleSubmit} class="bg-white p-8 rounded-3xl border border-[#c2c6d6]/30 shadow-lg space-y-4">
        <div>
          <label class="text-xs font-bold text-[#727785] uppercase block mb-1">Current Construction Stage</label>
          <input type="text" value={stage} onChange={(e) => setStage(e.target.value)} class="w-full p-3 rounded-xl bg-[#f2f3ff] text-sm font-bold" />
        </div>

        <div>
          <label class="text-xs font-bold text-[#727785] uppercase block mb-1">Completion Progress: {percent}%</label>
          <input type="range" min="0" max="100" value={percent} onChange={(e) => setPercent(Number(e.target.value))} class="w-full h-2 bg-[#c2c6d6] rounded-lg cursor-pointer accent-[#006c49]" />
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="text-xs font-bold text-[#727785] uppercase block mb-1">Masons On-Site</label>
            <input type="number" value={masons} onChange={(e) => setMasons(Number(e.target.value))} class="w-full p-3 rounded-xl bg-[#f2f3ff] font-bold text-sm" />
          </div>
          <div>
            <label class="text-xs font-bold text-[#727785] uppercase block mb-1">Helpers On-Site</label>
            <input type="number" value={helpers} onChange={(e) => setHelpers(Number(e.target.value))} class="w-full p-3 rounded-xl bg-[#f2f3ff] font-bold text-sm" />
          </div>
        </div>

        <div>
          <label class="text-xs font-bold text-[#727785] uppercase block mb-1">Site Work Notes & Materials Used</label>
          <textarea value={notes} onChange={(e) => setNotes(e.target.value)} class="w-full p-3 rounded-xl bg-[#f2f3ff] text-xs h-24 outline-none border border-transparent focus:border-[#006c49]"></textarea>
        </div>

        <button type="submit" class="w-full py-4 bg-[#006c49] text-white rounded-xl font-bold text-sm shadow-xl hover:bg-[#005236]">
          Broadcast Progress Update & Site Photos
        </button>
      </form>
    </div>
  );
}
