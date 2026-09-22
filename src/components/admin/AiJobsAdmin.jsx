import React from 'react';

export default function AiJobsAdmin() {
  const jobs = [
    { id: 'JOB-301', task: 'Floor Layout CAD Generation', queue: 'Queue-01', duration: '1.2s', status: 'Completed' },
    { id: 'JOB-302', task: 'Interior Design Rendering (Indian Modern)', queue: 'Queue-02', duration: '3.4s', status: 'Completed' },
    { id: 'JOB-303', task: 'ML Cost Model Retraining Dataset Batch #44', queue: 'Queue-03', duration: 'Running (45s)', status: 'Processing' }
  ];

  return (
    <div class="space-y-6">
      <div class="bg-white p-6 rounded-3xl border border-[#c2c6d6]/30 shadow-sm space-y-1">
        <span class="text-xs font-bold text-[#4648d4] uppercase tracking-widest">Admin Pages 12 & 13 — AI Job Queue</span>
        <h2 class="font-display text-2xl font-bold text-[#131b2e]">AI Background Job Queue & Dataset Manager</h2>
        <p class="text-xs text-[#727785]">Asynchronous queue for image generation, CAD rendering, and dataset retraining</p>
      </div>

      <div class="bg-white rounded-3xl p-6 border border-[#c2c6d6]/30 shadow-lg space-y-3">
        {jobs.map((j) => (
          <div key={j.id} class="p-4 bg-[#f2f3ff] rounded-2xl flex justify-between items-center text-xs">
            <div>
              <p class="font-bold text-sm text-[#131b2e]">{j.id} — {j.task}</p>
              <p class="text-[#727785]">Queue: {j.queue} • Processing Time: {j.duration}</p>
            </div>
            <span class={`px-3 py-1 rounded-full text-xs font-bold ${
              j.status === 'Completed' ? 'bg-[#006c49] text-white' : 'bg-[#0058be] text-white animate-pulse'
            }`}>
              {j.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
