import React from 'react';

export default function UserDashboard({ setActivePage, projectData }) {
  const plotArea = (Number(projectData.length) || 40) * (Number(projectData.width) || 60);
  const totalCost = projectData.budget || 3750000; // in INR or USD

  return (
    <div class="space-y-6">
      {/* Welcome Banner */}
      <div class="bg-gradient-to-r from-[#0058be] to-[#2170e4] text-white p-6 md:p-8 rounded-3xl shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative overflow-hidden">
        <div class="z-10">
          <span class="text-xs font-bold uppercase tracking-widest bg-white/20 px-3 py-1 rounded-full text-white">
            Homeowner Control Center
          </span>
          <h1 class="font-display text-2xl md:text-3xl font-bold mt-2">
            Welcome back, Rajesh Sharma!
          </h1>
          <p class="text-sm opacity-90 mt-1 max-w-xl">
            Your house construction project in Palo Alto is currently in Phase 3 (MEP & Plumbing). AI quality scan passed.
          </p>
        </div>

        <button
          onClick={() => setActivePage('createProject')}
          class="z-10 px-6 py-3 bg-white text-[#0058be] font-bold text-sm rounded-xl shadow-lg hover:bg-blue-50 transition-all cursor-pointer flex items-center gap-2 active:scale-95"
        >
          <span class="material-symbols-outlined text-base">add_home</span>
          Create / Edit Project
        </button>

        {/* Decorative background glow */}
        <div class="absolute -right-10 -bottom-10 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
      </div>

      {/* Quick Action Grid */}
      <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {[
          { page: 'createProject', title: 'Setup Project', icon: 'add_home', color: 'text-[#0058be] bg-[#0058be]/10' },
          { page: 'costEstimation', title: 'AI Cost Estimate', icon: 'analytics', color: 'text-[#006c49] bg-[#006c49]/10' },
          { page: 'imageGen', title: 'Layout & Design', icon: 'palette', color: 'text-[#4648d4] bg-[#4648d4]/10' },
          { page: 'findContractor', title: 'Find Contractor', icon: 'badge', color: 'text-[#0058be] bg-[#0058be]/10' },
          { page: 'loanFeasibility', title: 'Loan Feasibility', icon: 'account_balance_wallet', color: 'text-[#006c49] bg-[#006c49]/10' },
          { page: 'constructionTracking', title: 'Track Construction', icon: 'foundation', color: 'text-[#4648d4] bg-[#4648d4]/10' },
        ].map((item) => (
          <button
            key={item.page}
            onClick={() => setActivePage(item.page)}
            class="glass-card p-4 rounded-2xl flex flex-col items-center text-center gap-2 hover:border-[#0058be] transition-all cursor-pointer bg-white"
          >
            <div class={`w-10 h-10 rounded-xl flex items-center justify-center ${item.color}`}>
              <span class="material-symbols-outlined text-xl">{item.icon}</span>
            </div>
            <span class="font-bold text-xs text-[#131b2e]">{item.title}</span>
          </button>
        ))}
      </div>

      {/* Primary Overview Cards */}
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Active Project Card */}
        <div class="glass-card p-6 rounded-3xl bg-white border border-[#c2c6d6]/30 space-y-4">
          <div class="flex justify-between items-center border-b border-[#c2c6d6]/20 pb-3">
            <div>
              <span class="text-[10px] font-bold uppercase tracking-wider text-[#0058be] bg-[#eaedff] px-2.5 py-0.5 rounded-full">
                Active Project
              </span>
              <h3 class="font-bold text-lg text-[#131b2e] mt-1 font-display">Palo Alto Modern Residence</h3>
            </div>
            <span class="text-xs font-bold text-[#006c49] bg-[#6cf8bb]/40 px-2.5 py-1 rounded-full">
              In Progress (65%)
            </span>
          </div>

          <div class="space-y-2 text-xs">
            <div class="flex justify-between">
              <span class="text-[#727785]">Plot Area:</span>
              <span class="font-bold text-[#131b2e]">{plotArea.toLocaleString()} sq.ft ({projectData.length || 40}ft × {projectData.width || 60}ft)</span>
            </div>
            <div class="flex justify-between">
              <span class="text-[#727785]">Building Type:</span>
              <span class="font-bold text-[#131b2e]">{projectData.constructionType || 'Premium'} G+{projectData.floors || 1} Villa</span>
            </div>
            <div class="flex justify-between">
              <span class="text-[#727785]">Location:</span>
              <span class="font-bold text-[#131b2e]">{projectData.city || 'Palo Alto'}, {projectData.state || 'CA'}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-[#727785]">Target Completion:</span>
              <span class="font-bold text-[#0058be]">August 2026</span>
            </div>
          </div>

          <div class="pt-2">
            <div class="flex justify-between text-xs font-bold text-[#131b2e] mb-1">
              <span>Overall Progress</span>
              <span>65%</span>
            </div>
            <div class="w-full bg-[#eaedff] h-2.5 rounded-full overflow-hidden">
              <div class="bg-[#0058be] h-full w-[65%] rounded-full"></div>
            </div>
          </div>
        </div>

        {/* Financial & Cost Summary */}
        <div class="glass-card p-6 rounded-3xl bg-white border border-[#c2c6d6]/30 space-y-4">
          <div class="flex justify-between items-center border-b border-[#c2c6d6]/20 pb-3">
            <h3 class="font-bold text-lg text-[#131b2e] font-display">Cost & Budget Status</h3>
            <button onClick={() => setActivePage('costEstimation')} class="text-xs font-bold text-[#0058be] hover:underline">
              View ML Model ➔
            </button>
          </div>

          <div class="space-y-3">
            <div>
              <p class="text-xs text-[#727785] uppercase font-semibold">Indicative Project Cost (ML + 25% Buffer)</p>
              <p class="font-display text-3xl font-bold text-[#0058be]">
                ₹{(totalCost).toLocaleString('en-IN')}
              </p>
            </div>

            <div class="p-3 bg-[#f2f3ff] rounded-xl text-xs space-y-1">
              <div class="flex justify-between">
                <span class="text-[#424754]">ML Predicted Base Cost:</span>
                <span class="font-bold text-[#131b2e]">₹{Math.round(totalCost * 0.8).toLocaleString('en-IN')}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-[#006c49] font-bold">25% Contingency Buffer:</span>
                <span class="font-bold text-[#006c49]">₹{Math.round(totalCost * 0.2).toLocaleString('en-IN')}</span>
              </div>
            </div>

            <div class="flex justify-between items-center text-xs">
              <span class="text-[#727785]">Loan Feasibility:</span>
              <span class="px-2.5 py-1 rounded-full bg-[#6cf8bb]/40 text-[#00714d] font-bold">
                Strong (₹45 Lakh Eligible)
              </span>
            </div>
          </div>
        </div>

        {/* Selected Contractor & Inspection */}
        <div class="glass-card p-6 rounded-3xl bg-white border border-[#c2c6d6]/30 space-y-4">
          <div class="flex justify-between items-center border-b border-[#c2c6d6]/20 pb-3">
            <h3 class="font-bold text-lg text-[#131b2e] font-display">Contractor & Quality QA</h3>
            <button onClick={() => setActivePage('findContractor')} class="text-xs font-bold text-[#0058be] hover:underline">
              Manage ➔
            </button>
          </div>

          <div class="flex items-center gap-3 p-3 bg-[#eaedff]/50 rounded-2xl border border-[#c2c6d6]/30">
            <div class="w-12 h-12 rounded-xl bg-[#006c49] text-white flex items-center justify-center font-bold text-sm">
              APEX
            </div>
            <div>
              <p class="font-bold text-sm text-[#131b2e]">Apex Constructions</p>
              <p class="text-xs text-[#006c49] font-semibold flex items-center gap-1">
                <span class="material-symbols-outlined text-xs">verified</span> Certified Contractor (4.9 ★)
              </p>
            </div>
          </div>

          <div class="p-3 bg-[#6cf8bb]/20 border border-[#006c49]/30 rounded-xl text-xs space-y-1">
            <div class="flex justify-between items-center">
              <span class="font-bold text-[#00714d]">Latest QA Inspection</span>
              <span class="px-2 py-0.5 bg-[#006c49] text-white rounded font-bold text-[10px]">PASSED</span>
            </div>
            <p class="text-[#424754]">Foundation & Structure verified compliant with BIS building code.</p>
          </div>
        </div>
      </div>

      {/* Bottom Grid: Recent Design & Recent Quotations */}
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Recent Design Thumbnail */}
        <div class="glass-card p-6 rounded-3xl bg-white border border-[#c2c6d6]/30 flex flex-col justify-between">
          <div class="flex justify-between items-center mb-4">
            <h3 class="font-bold text-base text-[#131b2e] font-display">AI Generated Interior Design</h3>
            <button onClick={() => setActivePage('imageGen')} class="text-xs font-bold text-[#0058be] hover:underline">
              Generate New ➔
            </button>
          </div>
          <div class="h-48 rounded-2xl overflow-hidden relative group border border-[#c2c6d6]/30">
            <img
              src="/hero-house.png"
              alt="Recent AI Modern Interior Design"
              class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div class="absolute bottom-3 left-3 bg-black/70 text-white text-xs px-3 py-1 rounded-full backdrop-blur-md">
              Style: Modern Architectural Villa
            </div>
          </div>
        </div>

        {/* Pending Actions & Notifications */}
        <div class="glass-card p-6 rounded-3xl bg-white border border-[#c2c6d6]/30 space-y-3">
          <h3 class="font-bold text-base text-[#131b2e] font-display mb-3">Pending Actions & Alerts</h3>

          <div class="flex items-start gap-3 p-3 bg-[#f2f3ff] rounded-2xl border border-[#c2c6d6]/20">
            <span class="material-symbols-outlined text-[#0058be] text-xl mt-0.5">payments</span>
            <div class="flex-1 text-xs">
              <p class="font-bold text-[#131b2e]">Milestone 3 Payment Release Claimed</p>
              <p class="text-[#727785]">Apex Constructions claimed ₹4,20,000 for MEP piping completion.</p>
            </div>
            <button onClick={() => setActivePage('userPayments')} class="px-3 py-1 bg-[#0058be] text-white rounded-lg text-xs font-bold">
              Review
            </button>
          </div>

          <div class="flex items-start gap-3 p-3 bg-[#f2f3ff] rounded-2xl border border-[#c2c6d6]/20">
            <span class="material-symbols-outlined text-[#006c49] text-xl mt-0.5">verified</span>
            <div class="flex-1 text-xs">
              <p class="font-bold text-[#131b2e]">Structural Quality Report Approved</p>
              <p class="text-[#727785]">Inspector report #R-902 ready for download.</p>
            </div>
            <button onClick={() => setActivePage('constructionTracking')} class="px-3 py-1 bg-[#006c49] text-white rounded-lg text-xs font-bold">
              View
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
