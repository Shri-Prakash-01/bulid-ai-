import React, { useState } from 'react';

export default function ConstructorPortal({ currentUser, propertyData, styleData }) {
  const [activeTab, setActiveTab] = useState('projects');
  const [projects, setProjects] = useState([
    {
      id: '#B-2026-X01',
      client: 'Alex Morgan',
      location: `${propertyData.city || 'Palo Alto'}, ${propertyData.state || 'CA'}`,
      type: `${propertyData.constructionType || 'Premium'} Villa G+${propertyData.floors || 1}`,
      area: `${((Number(propertyData.length) || 40) * (Number(propertyData.width) || 60)).toLocaleString()} sq.ft`,
      budget: `$${(styleData.budget || 450000).toLocaleString()}`,
      stage: 'MEP & Plumbing',
      progress: 65,
      status: 'On Schedule'
    },
    {
      id: '#B-2026-X02',
      client: 'David Chen',
      location: 'San Jose, CA',
      type: 'Modern Duplex G+2',
      area: '3,100 sq.ft',
      budget: '$620,000',
      stage: 'Foundation & Plinth',
      progress: 30,
      status: 'In Inspection'
    },
    {
      id: '#B-2026-X03',
      client: 'Elena Rostova',
      location: 'Mountain View, CA',
      type: 'Luxury Villa G+1',
      area: '4,200 sq.ft',
      budget: '$1,150,000',
      stage: 'Superstructure Framing',
      progress: 85,
      status: 'Material Procurement'
    }
  ]);

  const [materials, setMaterials] = useState([
    { name: 'OPC High Alumina Cement', unit: 'Bag', aiRate: 15.0, contractorRate: 14.2, status: 'In Stock' },
    { name: 'TMT Steel Rebars Fe-550', unit: 'Ton', aiRate: 2600.0, contractorRate: 2550.0, status: 'Price Dropped' },
    { name: 'Double Washed River Sand', unit: 'Cu.Ft', aiRate: 1.82, contractorRate: 1.75, status: 'Optimal' },
    { name: 'Fly Ash High Density Bricks', unit: 'Unit', aiRate: 0.74, contractorRate: 0.70, status: 'Discount Available' }
  ]);

  const [selectedProject, setSelectedProject] = useState(projects[0]);
  const [updateMsg, setUpdateMsg] = useState('');

  const handleUpdateProgress = (projId, delta) => {
    setProjects(prev => prev.map(p => {
      if (p.id === projId) {
        const next = Math.min(100, Math.max(0, p.progress + delta));
        return { ...p, progress: next };
      }
      return p;
    }));
    setUpdateMsg(`Updated project ${projId} progress!`);
    setTimeout(() => setUpdateMsg(''), 3000);
  };

  return (
    <main class="pt-28 pb-20 px-6 md:px-12 max-w-7xl mx-auto min-h-screen">
      {/* Top Banner Header */}
      <div class="bg-gradient-to-r from-[#006c49] to-[#005236] text-white p-6 md:p-8 rounded-3xl shadow-xl mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <div class="flex items-center gap-2 mb-2">
            <span class="material-symbols-outlined text-amber-300" style={{ fontVariationSettings: "'FILL' 1" }}>
              engineering
            </span>
            <span class="text-xs font-bold uppercase tracking-widest bg-white/20 px-3 py-1 rounded-full text-white">
              Constructor Portal
            </span>
          </div>
          <h1 class="font-display text-2xl md:text-3xl font-bold">
            Welcome, {currentUser.name || 'Sarah Jenkins (Apex Constructions)'}
          </h1>
          <p class="text-sm opacity-90 mt-1">
            Contractor License: #CAL-BUILD-88492 • Verified Master Builder
          </p>
        </div>

        <div class="flex items-center gap-3 bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20">
          <div>
            <p class="text-xs text-emerald-100 font-semibold uppercase">Active Construction Projects</p>
            <p class="text-2xl font-bold font-display">{projects.length} Sites Live</p>
          </div>
          <span class="material-symbols-outlined text-3xl text-emerald-200">construction</span>
        </div>
      </div>

      {/* KPI Stat Cards */}
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div class="glass-card p-5 rounded-2xl border-l-4 border-l-[#006c49] bg-white">
          <p class="text-[#727785] text-xs font-bold uppercase">Contract Work Volume</p>
          <p class="text-2xl font-bold font-display text-[#131b2e] mt-1">$2,220,000</p>
          <span class="text-xs text-[#006c49] font-bold mt-2 inline-block">3 Active Contracts</span>
        </div>

        <div class="glass-card p-5 rounded-2xl border-l-4 border-l-[#0058be] bg-white">
          <p class="text-[#727785] text-xs font-bold uppercase">Material BOM Savings</p>
          <p class="text-2xl font-bold font-display text-[#0058be] mt-1">$48,500</p>
          <span class="text-xs text-[#0058be] font-bold mt-2 inline-block">Wholesale Discount Applied</span>
        </div>

        <div class="glass-card p-5 rounded-2xl border-l-4 border-l-[#4648d4] bg-white">
          <p class="text-[#727785] text-xs font-bold uppercase">On-Site Labor Crew</p>
          <p class="text-2xl font-bold font-display text-[#4648d4] mt-1">32 Workers</p>
          <span class="text-xs text-[#4648d4] font-bold mt-2 inline-block">Engineers & Craftsmen</span>
        </div>

        <div class="glass-card p-5 rounded-2xl border-l-4 border-l-[#006c49] bg-white">
          <p class="text-[#727785] text-xs font-bold uppercase">Milestone Efficiency</p>
          <p class="text-2xl font-bold font-display text-[#006c49] mt-1">98.2%</p>
          <span class="text-xs text-[#006c49] font-bold mt-2 inline-block">On-Time Completion</span>
        </div>
      </div>

      {updateMsg && (
        <div class="p-4 bg-[#6cf8bb]/30 border border-[#006c49]/30 text-[#005236] rounded-2xl font-bold mb-6 text-sm flex items-center gap-2 animate-bounce">
          <span class="material-symbols-outlined text-base">check_circle</span>
          {updateMsg}
        </div>
      )}

      {/* Tabs */}
      <div class="flex gap-2 border-b border-[#c2c6d6]/30 mb-6 pb-2 overflow-x-auto">
        <button
          onClick={() => setActiveTab('projects')}
          class={`px-5 py-2.5 rounded-xl font-bold text-sm transition-all cursor-pointer flex items-center gap-2 ${
            activeTab === 'projects'
              ? 'bg-[#006c49] text-white shadow-md'
              : 'text-[#424754] hover:bg-[#eaedff]'
          }`}
        >
          <span class="material-symbols-outlined text-base">foundation</span>
          Live Client Projects ({projects.length})
        </button>

        <button
          onClick={() => setActiveTab('materials')}
          class={`px-5 py-2.5 rounded-xl font-bold text-sm transition-all cursor-pointer flex items-center gap-2 ${
            activeTab === 'materials'
              ? 'bg-[#006c49] text-white shadow-md'
              : 'text-[#424754] hover:bg-[#eaedff]'
          }`}
        >
          <span class="material-symbols-outlined text-base">inventory_2</span>
          Material Supply Bids
        </button>

        <button
          onClick={() => setActiveTab('blueprints')}
          class={`px-5 py-2.5 rounded-xl font-bold text-sm transition-all cursor-pointer flex items-center gap-2 ${
            activeTab === 'blueprints'
              ? 'bg-[#006c49] text-white shadow-md'
              : 'text-[#424754] hover:bg-[#eaedff]'
          }`}
        >
          <span class="material-symbols-outlined text-base">architecture</span>
          Client Specs & Blueprints
        </button>
      </div>

      {/* Tab 1: Live Client Projects Table */}
      {activeTab === 'projects' && (
        <div class="space-y-6">
          <div class="bg-white rounded-3xl p-6 border border-[#c2c6d6]/30 shadow-lg overflow-x-auto">
            <h3 class="text-lg font-bold text-[#131b2e] mb-4 font-display">Active Site Management</h3>
            <table class="w-full text-left border-collapse">
              <thead>
                <tr class="border-b border-[#c2c6d6]/30 text-xs font-bold text-[#727785] uppercase tracking-wider">
                  <th class="py-3 px-4">Project ID</th>
                  <th class="py-3 px-4">Client Name</th>
                  <th class="py-3 px-4">Location & Specs</th>
                  <th class="py-3 px-4">Est. Budget</th>
                  <th class="py-3 px-4">Current Stage</th>
                  <th class="py-3 px-4">Progress %</th>
                  <th class="py-3 px-4 text-right">Quick Actions</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-[#c2c6d6]/20 text-sm">
                {projects.map((p) => (
                  <tr key={p.id} class="hover:bg-[#f2f3ff]/60 transition-colors">
                    <td class="py-4 px-4 font-bold text-[#006c49]">{p.id}</td>
                    <td class="py-4 px-4 font-semibold text-[#131b2e]">{p.client}</td>
                    <td class="py-4 px-4">
                      <p class="font-medium text-[#131b2e]">{p.type}</p>
                      <p class="text-xs text-[#727785]">{p.location} • {p.area}</p>
                    </td>
                    <td class="py-4 px-4 font-bold text-[#0058be]">{p.budget}</td>
                    <td class="py-4 px-4">
                      <span class="px-3 py-1 rounded-full text-xs font-bold bg-[#6cf8bb]/40 text-[#00714d]">
                        {p.stage}
                      </span>
                    </td>
                    <td class="py-4 px-4">
                      <div class="flex items-center gap-2">
                        <div class="w-24 bg-[#eaedff] h-2 rounded-full overflow-hidden">
                          <div class="bg-[#006c49] h-2 rounded-full" style={{ width: `${p.progress}%` }}></div>
                        </div>
                        <span class="text-xs font-bold text-[#131b2e]">{p.progress}%</span>
                      </div>
                    </td>
                    <td class="py-4 px-4 text-right space-x-2">
                      <button
                        onClick={() => handleUpdateProgress(p.id, 5)}
                        class="px-2.5 py-1 rounded-lg bg-[#006c49] text-white font-bold text-xs hover:bg-[#005236] transition-colors cursor-pointer"
                        title="Increase progress by 5%"
                      >
                        + Progress
                      </button>
                      <button
                        onClick={() => setSelectedProject(p)}
                        class="px-2.5 py-1 rounded-lg border border-[#c2c6d6] text-[#131b2e] font-semibold text-xs hover:bg-[#eaedff] transition-colors cursor-pointer"
                      >
                        Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Site Inspection Logger */}
          <div class="glass-card p-6 rounded-3xl bg-white">
            <h3 class="text-lg font-bold text-[#131b2e] mb-2 font-display">Contractor Daily Log Submission</h3>
            <p class="text-xs text-[#424754] mb-4">Post real-time status updates directly to homeowner executive report.</p>
            <div class="flex flex-col md:flex-row gap-4">
              <input
                type="text"
                placeholder="e.g. Completed RCC Slab casting for 1st floor; concrete cured for 48 hours..."
                class="flex-1 p-3 rounded-xl bg-[#f2f3ff] border border-transparent focus:border-[#006c49] focus:bg-white text-sm outline-none"
              />
              <button
                onClick={() => {
                  setUpdateMsg('Daily site log broadcasted to client dashboard!');
                  setTimeout(() => setUpdateMsg(''), 3000);
                }}
                class="px-6 py-3 bg-[#006c49] text-white rounded-xl font-bold text-sm hover:bg-[#005236] transition-all cursor-pointer shadow-md"
              >
                Broadcast Log
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Material Bidding */}
      {activeTab === 'materials' && (
        <div class="bg-white rounded-3xl p-6 border border-[#c2c6d6]/30 shadow-lg space-y-6">
          <div class="flex justify-between items-center">
            <div>
              <h3 class="text-lg font-bold text-[#131b2e] font-display">Constructor Material Wholesale Bids</h3>
              <p class="text-xs text-[#424754]">Compare BuildAI market index against wholesale supplier bids</p>
            </div>
            <button
              onClick={() => alert('New contractor material bid submitted successfully!')}
              class="px-5 py-2.5 bg-[#006c49] text-white rounded-xl font-bold text-xs hover:bg-[#005236] transition-all cursor-pointer shadow-md"
            >
              + Submit New Supply Quote
            </button>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            {materials.map((m, idx) => (
              <div key={idx} class="glass-card p-5 rounded-2xl flex items-center justify-between bg-white border border-[#c2c6d6]/40">
                <div>
                  <h4 class="font-bold text-sm text-[#131b2e]">{m.name}</h4>
                  <span class="text-xs text-[#727785]">Per {m.unit}</span>
                  <div class="mt-2 flex items-center gap-2">
                    <span class="px-2 py-0.5 rounded bg-[#6cf8bb]/40 text-[#00714d] text-[10px] font-bold">
                      {m.status}
                    </span>
                  </div>
                </div>

                <div class="text-right">
                  <p class="text-xs text-[#727785] line-through">AI Rate: ${m.aiRate.toFixed(2)}</p>
                  <p class="text-xl font-bold text-[#006c49] font-display">${m.contractorRate.toFixed(2)}</p>
                  <p class="text-[10px] font-bold text-[#0058be]">Save ${(m.aiRate - m.contractorRate).toFixed(2)} / unit</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Client Blueprints */}
      {activeTab === 'blueprints' && (
        <div class="bg-white rounded-3xl p-6 border border-[#c2c6d6]/30 shadow-lg space-y-6">
          <h3 class="text-lg font-bold text-[#131b2e] font-display">Client Architectural Blueprints & Site Specs</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="rounded-2xl overflow-hidden border border-[#c2c6d6]/40 relative h-64">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCLMBXKPGGSrfxfQpT5xJWi2wAjRDuVj700oyLjMCVl0tSb54Kh5uqXetg-rpURi8KeR97YIRZx5gITNVdBtjPerd4AY-oABiAqLdzSqlEvKUbVdcHaEBzLPg0eyuXkRJuI6pJSCmDGl0sYAH1YSpFSEi5tSfNFcNgx9ZUi-r33J9gI2fRJq71P7OD7hmk__Lpk2YI2J5DI9DEWcHLUwNcFqfgXHsYKcBAOTTXb0SzQIJMWKjNKnQ3Lww"
                alt="Blueprint CAD floorplan"
                class="w-full h-full object-cover"
              />
              <div class="absolute bottom-3 left-3 bg-black/70 text-white text-xs px-3 py-1 rounded-full backdrop-blur-md">
                Blueprint Version 3.4 • Structural Verified
              </div>
            </div>

            <div class="space-y-4">
              <div class="p-4 bg-[#f2f3ff] rounded-2xl border border-[#c2c6d6]/30">
                <h4 class="font-bold text-sm text-[#131b2e] mb-2">Selected Specifications</h4>
                <ul class="text-xs text-[#424754] space-y-1.5">
                  <li>• <strong>Plot Area:</strong> {selectedProject.area} ({propertyData.length}ft × {propertyData.width}ft)</li>
                  <li>• <strong>Facing Direction:</strong> {propertyData.facing || 'East'}</li>
                  <li>• <strong>Construction Finish:</strong> {propertyData.constructionType || 'Premium'} Grade</li>
                  <li>• <strong>Floors:</strong> Ground + {propertyData.floors || 1} Floors</li>
                  <li>• <strong>Interior Aesthetic:</strong> {styleData.interiorStyle || 'Modern'}</li>
                  <li>• <strong>Target Budget:</strong> {selectedProject.budget}</li>
                </ul>
              </div>

              <button
                onClick={() => alert('CAD Blueprint DWG files downloaded!')}
                class="w-full py-3 bg-[#0058be] text-white rounded-xl font-bold text-sm hover:bg-[#004395] transition-all cursor-pointer flex items-center justify-center gap-2 shadow-md"
              >
                <span class="material-symbols-outlined text-base">download</span>
                Download Structural CAD Files (.DWG / .BIM)
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
