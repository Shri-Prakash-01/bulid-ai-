import React from 'react';

export default function AdminProjects() {
  const projects = [
    { id: '#B-2026-X01', homeowner: 'Rajesh Sharma', contractor: 'Apex Constructions', budget: '₹37,50,000', stage: 'MEP & Wiring', progress: 65, status: 'Active' },
    { id: '#B-2026-X02', homeowner: 'David Chen', contractor: 'Skyline Master Builders', budget: '₹55,00,000', stage: 'Foundation Plinth', progress: 30, status: 'Active' }
  ];

  return (
    <div class="space-y-6">
      <div class="bg-white p-6 rounded-3xl border border-[#c2c6d6]/30 shadow-sm space-y-1">
        <span class="text-xs font-bold text-[#4648d4] uppercase tracking-widest">Admin Page 04 — Project Management</span>
        <h2 class="font-display text-2xl font-bold text-[#131b2e]">All Platform Construction Projects</h2>
        <p class="text-xs text-[#727785]">Master view of homeowner projects, assigned builders, budgets & completion %</p>
      </div>

      <div class="bg-white rounded-3xl p-6 border border-[#c2c6d6]/30 shadow-lg overflow-x-auto">
        <table class="w-full text-left border-collapse">
          <thead>
            <tr class="border-b border-[#c2c6d6]/30 text-xs font-bold text-[#727785] uppercase tracking-wider">
              <th class="py-3 px-3">Project ID</th>
              <th class="py-3 px-3">Homeowner</th>
              <th class="py-3 px-3">Contractor</th>
              <th class="py-3 px-3">Target Budget</th>
              <th class="py-3 px-3">Current Stage</th>
              <th class="py-3 px-3">Progress</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-[#c2c6d6]/20 text-xs font-medium">
            {projects.map((p) => (
              <tr key={p.id} class="hover:bg-[#f2f3ff]/60 transition-colors">
                <td class="py-3.5 px-3 font-bold text-[#4648d4]">{p.id}</td>
                <td class="py-3.5 px-3 font-bold text-[#131b2e]">{p.homeowner}</td>
                <td class="py-3.5 px-3 text-[#006c49] font-bold">{p.contractor}</td>
                <td class="py-3.5 px-3 font-bold text-[#0058be]">{p.budget}</td>
                <td class="py-3.5 px-3">{p.stage}</td>
                <td class="py-3.5 px-3 font-bold text-[#006c49]">{p.progress}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
