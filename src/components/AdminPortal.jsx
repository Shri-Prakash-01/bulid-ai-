import React, { useState } from 'react';

export default function AdminPortal({ currentUser }) {
  const [activeTab, setActiveTab] = useState('users');
  const [userList, setUserList] = useState([
    { id: 101, name: 'Alex Morgan', email: 'alex.homeowner@buildai.com', role: 'User (Homeowner)', status: 'Active', projects: 2 },
    { id: 102, name: 'Sarah Jenkins', email: 'sarah.contractor@apexbuild.com', role: 'Constructor (Builder)', status: 'Verified', projects: 12 },
    { id: 103, name: 'Michael Scott', email: 'm.scott@scrantonbuild.com', role: 'Constructor (Builder)', status: 'Pending Verification', projects: 0 },
    { id: 104, name: 'Elena Rostova', email: 'elena.r@techcorp.com', role: 'User (Homeowner)', status: 'Active', projects: 1 },
    { id: 105, name: 'David Chen', email: 'david.chen@bayarea.org', role: 'User (Homeowner)', status: 'Active', projects: 3 }
  ]);

  const [priceIndex, setPriceIndex] = useState({
    baseSqFtRate: 185,
    steelTonRate: 2600,
    cementBagRate: 15.0,
    laborDailyRate: 240
  });

  const [toastMsg, setToastMsg] = useState('');

  const handleApproveContractor = (id) => {
    setUserList(prev => prev.map(u => u.id === id ? { ...u, status: 'Verified' } : u));
    setToastMsg(`Contractor #${id} approved & verified!`);
    setTimeout(() => setToastMsg(''), 3000);
  };

  const handleSavePriceIndex = (e) => {
    e.preventDefault();
    setToastMsg('AI Regional Price Index updated & saved across estimation engine!');
    setTimeout(() => setToastMsg(''), 3000);
  };

  return (
    <main class="pt-28 pb-20 px-6 md:px-12 max-w-7xl mx-auto min-h-screen">
      {/* Top Banner Header */}
      <div class="bg-gradient-to-r from-[#4648d4] to-[#2f2ebe] text-white p-6 md:p-8 rounded-3xl shadow-xl mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <div class="flex items-center gap-2 mb-2">
            <span class="material-symbols-outlined text-amber-300" style={{ fontVariationSettings: "'FILL' 1" }}>
              admin_panel_settings
            </span>
            <span class="text-xs font-bold uppercase tracking-widest bg-white/20 px-3 py-1 rounded-full text-white">
              Platform Admin HQ
            </span>
          </div>
          <h1 class="font-display text-2xl md:text-3xl font-bold">
            BuildAI Platform Administration
          </h1>
          <p class="text-sm opacity-90 mt-1">
            Logged in as Super Admin • System Version v4.8.2
          </p>
        </div>

        <div class="flex items-center gap-3 bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20">
          <div>
            <p class="text-xs text-indigo-100 font-semibold uppercase">Total Platform Volume</p>
            <p class="text-2xl font-bold font-display">$42,850,000</p>
          </div>
          <span class="material-symbols-outlined text-3xl text-indigo-200">monitoring</span>
        </div>
      </div>

      {/* Admin KPI Stat Cards */}
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div class="glass-card p-5 rounded-2xl border-l-4 border-l-[#4648d4] bg-white">
          <p class="text-[#727785] text-xs font-bold uppercase">Registered Homeowners</p>
          <p class="text-2xl font-bold font-display text-[#131b2e] mt-1">5,420</p>
          <span class="text-xs text-[#006c49] font-bold mt-2 inline-block">+14% this month</span>
        </div>

        <div class="glass-card p-5 rounded-2xl border-l-4 border-l-[#006c49] bg-white">
          <p class="text-[#727785] text-xs font-bold uppercase">Verified Contractors</p>
          <p class="text-2xl font-bold font-display text-[#006c49] mt-1">380</p>
          <span class="text-xs text-[#006c49] font-bold mt-2 inline-block">1 pending verification</span>
        </div>

        <div class="glass-card p-5 rounded-2xl border-l-4 border-l-[#0058be] bg-white">
          <p class="text-[#727785] text-xs font-bold uppercase">AI Estimations Generated</p>
          <p class="text-2xl font-bold font-display text-[#0058be] mt-1">18,940</p>
          <span class="text-xs text-[#0058be] font-bold mt-2 inline-block">99.4% Cost Accuracy</span>
        </div>

        <div class="glass-card p-5 rounded-2xl border-l-4 border-l-[#4648d4] bg-white">
          <p class="text-[#727785] text-xs font-bold uppercase">System Uptime</p>
          <p class="text-2xl font-bold font-display text-[#4648d4] mt-1">99.99%</p>
          <span class="text-xs text-[#4648d4] font-bold mt-2 inline-block">Engine Healthy</span>
        </div>
      </div>

      {toastMsg && (
        <div class="p-4 bg-[#4648d4]/20 border border-[#4648d4]/30 text-[#07006c] rounded-2xl font-bold mb-6 text-sm flex items-center gap-2 animate-bounce">
          <span class="material-symbols-outlined text-base">check_circle</span>
          {toastMsg}
        </div>
      )}

      {/* Navigation Tabs */}
      <div class="flex gap-2 border-b border-[#c2c6d6]/30 mb-6 pb-2 overflow-x-auto">
        <button
          onClick={() => setActiveTab('users')}
          class={`px-5 py-2.5 rounded-xl font-bold text-sm transition-all cursor-pointer flex items-center gap-2 ${
            activeTab === 'users'
              ? 'bg-[#4648d4] text-white shadow-md'
              : 'text-[#424754] hover:bg-[#eaedff]'
          }`}
        >
          <span class="material-symbols-outlined text-base">group</span>
          User & Contractor Verification
        </button>

        <button
          onClick={() => setActiveTab('config')}
          class={`px-5 py-2.5 rounded-xl font-bold text-sm transition-all cursor-pointer flex items-center gap-2 ${
            activeTab === 'config'
              ? 'bg-[#4648d4] text-white shadow-md'
              : 'text-[#424754] hover:bg-[#eaedff]'
          }`}
        >
          <span class="material-symbols-outlined text-base">tune</span>
          AI Price Index Configurator
        </button>

        <button
          onClick={() => setActiveTab('logs')}
          class={`px-5 py-2.5 rounded-xl font-bold text-sm transition-all cursor-pointer flex items-center gap-2 ${
            activeTab === 'logs'
              ? 'bg-[#4648d4] text-white shadow-md'
              : 'text-[#424754] hover:bg-[#eaedff]'
          }`}
        >
          <span class="material-symbols-outlined text-base">terminal</span>
          System Logs & Audit Trail
        </button>
      </div>

      {/* Tab 1: User & Contractor Management */}
      {activeTab === 'users' && (
        <div class="bg-white rounded-3xl p-6 border border-[#c2c6d6]/30 shadow-lg overflow-x-auto">
          <h3 class="text-lg font-bold text-[#131b2e] mb-4 font-display">Account Directory & Approvals</h3>
          <table class="w-full text-left border-collapse">
            <thead>
              <tr class="border-b border-[#c2c6d6]/30 text-xs font-bold text-[#727785] uppercase tracking-wider">
                <th class="py-3 px-4">ID</th>
                <th class="py-3 px-4">Name</th>
                <th class="py-3 px-4">Email</th>
                <th class="py-3 px-4">Role</th>
                <th class="py-3 px-4">Verification Status</th>
                <th class="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-[#c2c6d6]/20 text-sm">
              {userList.map((u) => (
                <tr key={u.id} class="hover:bg-[#f2f3ff]/60 transition-colors">
                  <td class="py-4 px-4 font-bold text-[#4648d4]">#{u.id}</td>
                  <td class="py-4 px-4 font-bold text-[#131b2e]">{u.name}</td>
                  <td class="py-4 px-4 text-[#424754]">{u.email}</td>
                  <td class="py-4 px-4 font-semibold text-[#0058be]">{u.role}</td>
                  <td class="py-4 px-4">
                    <span
                      class={`px-3 py-1 rounded-full text-xs font-bold ${
                        u.status === 'Verified' || u.status === 'Active'
                          ? 'bg-[#6cf8bb]/40 text-[#00714d]'
                          : 'bg-[#ffdad6] text-[#ba1a1a]'
                      }`}
                    >
                      {u.status}
                    </span>
                  </td>
                  <td class="py-4 px-4 text-right">
                    {u.status === 'Pending Verification' ? (
                      <button
                        onClick={() => handleApproveContractor(u.id)}
                        class="px-3 py-1 rounded-lg bg-[#006c49] text-white font-bold text-xs hover:bg-[#005236] transition-colors cursor-pointer"
                      >
                        Approve & Verify
                      </button>
                    ) : (
                      <span class="text-xs text-[#727785] font-semibold">No action needed</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Tab 2: AI Price Index Configurator */}
      {activeTab === 'config' && (
        <div class="bg-white rounded-3xl p-6 border border-[#c2c6d6]/30 shadow-lg">
          <h3 class="text-lg font-bold text-[#131b2e] mb-2 font-display">Regional Price Index & Baseline Rates</h3>
          <p class="text-xs text-[#424754] mb-6">Modify standard market baseline multipliers consumed by the AI estimation engine.</p>

          <form onSubmit={handleSavePriceIndex} class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="space-y-1">
              <label class="text-xs font-bold text-[#727785] uppercase">Base Construction Rate ($/sq.ft)</label>
              <input
                type="number"
                value={priceIndex.baseSqFtRate}
                onChange={(e) => setPriceIndex({ ...priceIndex, baseSqFtRate: Number(e.target.value) })}
                class="w-full p-3 rounded-xl bg-[#f2f3ff] border border-transparent focus:border-[#4648d4] font-bold text-lg text-[#131b2e] outline-none"
              />
            </div>

            <div class="space-y-1">
              <label class="text-xs font-bold text-[#727785] uppercase">Steel Market Benchmark ($/Ton)</label>
              <input
                type="number"
                value={priceIndex.steelTonRate}
                onChange={(e) => setPriceIndex({ ...priceIndex, steelTonRate: Number(e.target.value) })}
                class="w-full p-3 rounded-xl bg-[#f2f3ff] border border-transparent focus:border-[#4648d4] font-bold text-lg text-[#131b2e] outline-none"
              />
            </div>

            <div class="space-y-1">
              <label class="text-xs font-bold text-[#727785] uppercase">Cement High Alumina Rate ($/Bag)</label>
              <input
                type="number"
                step="0.1"
                value={priceIndex.cementBagRate}
                onChange={(e) => setPriceIndex({ ...priceIndex, cementBagRate: Number(e.target.value) })}
                class="w-full p-3 rounded-xl bg-[#f2f3ff] border border-transparent focus:border-[#4648d4] font-bold text-lg text-[#131b2e] outline-none"
              />
            </div>

            <div class="space-y-1">
              <label class="text-xs font-bold text-[#727785] uppercase">Labor Standard Rate ($/Day)</label>
              <input
                type="number"
                value={priceIndex.laborDailyRate}
                onChange={(e) => setPriceIndex({ ...priceIndex, laborDailyRate: Number(e.target.value) })}
                class="w-full p-3 rounded-xl bg-[#f2f3ff] border border-transparent focus:border-[#4648d4] font-bold text-lg text-[#131b2e] outline-none"
              />
            </div>

            <div class="md:col-span-2 pt-4">
              <button
                type="submit"
                class="px-8 py-3.5 bg-[#4648d4] text-white rounded-xl font-bold text-sm shadow-lg hover:bg-[#2f2ebe] active:scale-95 transition-all cursor-pointer flex items-center gap-2"
              >
                Save New Price Multipliers
                <span class="material-symbols-outlined text-base">save</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Tab 3: System Logs */}
      {activeTab === 'logs' && (
        <div class="bg-[#131b2e] text-emerald-400 p-6 rounded-3xl font-mono text-xs shadow-2xl space-y-2 border border-slate-700">
          <p class="text-slate-400">// BuildAI Server Event Log & Neural Pipeline Stream</p>
          <p>[23:04:12] INFO: AI Engine model loaded (v4.8.2-prod)</p>
          <p>[23:04:15] HTTP GET /api/v1/estimate/plot-2400sqft -&gt; 200 OK (32ms)</p>
          <p>[23:04:18] AUTH: Login successful for role=constructor (Sarah Jenkins)</p>
          <p>[23:04:22] SYNC: Contractor material quotes synced with Palo Alto pricing index</p>
          <p>[23:04:30] CHECK: Environmental risk model computed (Flood: LOW, Wind: MODERATE)</p>
          <p class="text-amber-400">[23:04:35] AUDIT: Admin user modified base price index multiplier</p>
        </div>
      )}
    </main>
  );
}
