import React from 'react';

export default function ConstructionTracking({ setActivePage }) {
  const milestones = [
    { name: '1. Site Excavation & Clearing', date: 'Oct 01, 2025', status: 'Completed', percent: 100 },
    { name: '2. Foundation & Plinth Footing', date: 'Nov 15, 2025', status: 'Completed', percent: 100 },
    { name: '3. Plinth Beam & Filling', date: 'Dec 10, 2025', status: 'Completed', percent: 100 },
    { name: '4. Superstructure Frame (RCC)', date: 'Jan 20, 2026', status: 'Completed', percent: 100 },
    { name: '5. Masonry & Brickwork', date: 'Feb 28, 2026', status: 'Completed', percent: 100 },
    { name: '6. Plastering (Internal & External)', date: 'Mar 15, 2026', status: 'In Progress', percent: 75 },
    { name: '7. Flooring & Tiling', date: 'Apr 20, 2026', status: 'Scheduled', percent: 0 },
    { name: '8. Electrical & Plumbing Piping', date: 'May 10, 2026', status: 'Scheduled', percent: 0 },
    { name: '9. Painting & Interior Joinery', date: 'Jun 30, 2026', status: 'Scheduled', percent: 0 },
    { name: '10. Final Handover & Inspection', date: 'Aug 15, 2026', status: 'Scheduled', percent: 0 }
  ];

  return (
    <div class="space-y-6">
      {/* Header */}
      <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-3xl border border-[#c2c6d6]/30 shadow-sm">
        <div>
          <span class="text-xs font-bold text-[#0058be] uppercase tracking-widest">
            User Page 09 — Live Site Tracking
          </span>
          <h2 class="font-display text-2xl font-bold text-[#131b2e]">
            10-Stage Construction Progress Tracker
          </h2>
          <p class="text-xs text-[#727785] mt-0.5">
            Real-time milestone updates posted directly from contractor site logs
          </p>
        </div>

        <button onClick={() => setActivePage('userPayments')} class="px-5 py-2.5 bg-[#006c49] text-white font-bold text-xs rounded-xl shadow-md hover:bg-[#005236] cursor-pointer">
          Milestone Payments ➔
        </button>
      </div>

      {/* 10 Milestones List */}
      <div class="bg-white p-6 rounded-3xl border border-[#c2c6d6]/30 shadow-lg space-y-4">
        <h3 class="font-bold text-base text-[#131b2e] font-display">Construction Workflow Milestones</h3>
        <div class="space-y-3">
          {milestones.map((m, idx) => (
            <div key={idx} class="p-4 bg-[#f2f3ff] rounded-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div class="space-y-1">
                <div class="flex items-center gap-2">
                  <h4 class="font-bold text-sm text-[#131b2e]">{m.name}</h4>
                  <span class={`text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase ${
                    m.status === 'Completed'
                      ? 'bg-[#006c49] text-white'
                      : m.status === 'In Progress'
                      ? 'bg-[#0058be] text-white'
                      : 'bg-[#c2c6d6] text-[#424754]'
                  }`}>
                    {m.status}
                  </span>
                </div>
                <p class="text-xs text-[#727785]">Target Date: {m.date}</p>
              </div>

              <div class="w-full md:w-48 space-y-1">
                <div class="flex justify-between text-xs font-bold text-[#131b2e]">
                  <span>Completion</span>
                  <span>{m.percent}%</span>
                </div>
                <div class="w-full bg-[#c2c6d6]/30 h-2 rounded-full overflow-hidden">
                  <div class="bg-[#0058be] h-2 rounded-full" style={{ width: `${m.percent}%` }}></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
