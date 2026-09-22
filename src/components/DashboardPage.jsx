import React, { useState } from 'react';

export default function DashboardPage({ propertyData, styleData, roomData, setCurrentView }) {
  const [isExporting, setIsExporting] = useState(false);

  // Dynamic calculations based on user input
  const plotArea = (Number(propertyData.length) || 40) * (Number(propertyData.width) || 60);
  const totalArea = Math.round(plotArea * (1.2 + (propertyData.floors || 1) * 0.45));
  const targetBudget = styleData.budget || 428500;

  // Breakdown percentages
  const costInterior = Math.round(targetBudget * 0.15);
  const costMaterial = Math.round(targetBudget * 0.35);
  const costLabour = Math.round(targetBudget * 0.20);
  const costElectrical = Math.round(targetBudget * 0.08);
  const costPlumbing = Math.round(targetBudget * 0.07);
  const costPainting = Math.round(targetBudget * 0.05);
  const costFurniture = Math.round(targetBudget * 0.06);
  const costGovt = Math.round(targetBudget * 0.04);

  const formatUsd = (num) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(num);
  };

  const handleExportPDF = () => {
    setIsExporting(true);
    setTimeout(() => {
      window.print();
      setIsExporting(false);
    }, 300);
  };

  return (
    <div class="min-h-screen bg-[#faf8ff] text-[#131b2e]">
      {/* Sidebar (Desktop) */}
      <aside class="fixed left-0 top-20 bottom-0 w-64 bg-white border-r border-[#c2c6d6]/30 hidden lg:flex flex-col p-6 z-40 shadow-sm">
        <div class="space-y-6">
          <div class="space-y-1">
            <p class="text-xs font-bold text-[#727785] px-3 mb-2 uppercase tracking-wider">Navigation</p>
            <button
              onClick={() => setCurrentView('dashboard')}
              class="w-full flex items-center gap-3 p-3 bg-[#2170e4] text-white rounded-xl font-bold shadow-md cursor-pointer text-left text-sm"
            >
              <span class="material-symbols-outlined">dashboard</span> Executive Dashboard
            </button>
            <button
              onClick={() => setCurrentView('wizard')}
              class="w-full flex items-center gap-3 p-3 text-[#424754] hover:bg-[#eaedff] rounded-xl transition-all cursor-pointer text-left text-sm font-medium"
            >
              <span class="material-symbols-outlined">architecture</span> Edit Specifications
            </button>
            <button
              onClick={() => setCurrentView('landing')}
              class="w-full flex items-center gap-3 p-3 text-[#424754] hover:bg-[#eaedff] rounded-xl transition-all cursor-pointer text-left text-sm font-medium"
            >
              <span class="material-symbols-outlined">home</span> Landing Overview
            </button>
          </div>

          <div class="space-y-1 border-t border-[#c2c6d6]/20 pt-4">
            <p class="text-xs font-bold text-[#727785] px-3 mb-2 uppercase tracking-wider">Reports</p>
            <a href="#cost-section" class="flex items-center gap-3 p-3 text-[#424754] hover:bg-[#eaedff] rounded-xl transition-all text-sm font-medium">
              <span class="material-symbols-outlined">analytics</span> Cost Breakdown
            </a>
            <a href="#material-section" class="flex items-center gap-3 p-3 text-[#424754] hover:bg-[#eaedff] rounded-xl transition-all text-sm font-medium">
              <span class="material-symbols-outlined">layers</span> Material Specs
            </a>
            <a href="#timeline-section" class="flex items-center gap-3 p-3 text-[#424754] hover:bg-[#eaedff] rounded-xl transition-all text-sm font-medium">
              <span class="material-symbols-outlined">history</span> Milestones
            </a>
          </div>
        </div>

        <div class="mt-auto space-y-2 border-t border-[#c2c6d6]/20 pt-4">
          <div class="p-3 bg-[#eaedff] rounded-xl text-xs text-[#0058be] font-semibold flex items-center gap-2">
            <span class="material-symbols-outlined text-sm">verified</span>
            BuildAI Verified Report #B-2024-X01
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main class="lg:ml-64 pt-28 pb-20 px-6 md:px-12 min-h-screen">
        {/* Header Section */}
        <div class="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div>
            <p class="text-[#0058be] font-bold text-xs uppercase tracking-widest mb-1 flex items-center gap-1.5">
              <span class="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>
                verified
              </span>
              Verified Design Report • ID: #B-2026-X01
            </p>
            <h1 class="font-display text-3xl md:text-4xl font-bold text-[#131b2e] mb-2">
              BuildAI Final Report: {styleData.interiorStyle || 'Modern'} Residence
            </h1>
            <p class="text-[#424754] text-sm max-w-2xl leading-relaxed">
              A comprehensive cost projection, material bill of quantities (BOM), and structural risk analysis generated for plot site in {propertyData.city || 'Palo Alto'}, {propertyData.state || 'CA'}.
            </p>
          </div>

          <div class="flex items-center gap-3">
            <button
              onClick={() => {
                navigator.clipboard?.writeText(window.location.href);
                alert('Report link copied to clipboard!');
              }}
              class="bg-white border border-[#c2c6d6]/40 text-[#131b2e] font-bold text-sm px-5 py-3 rounded-xl flex items-center gap-2 transition-all hover:bg-[#eaedff] cursor-pointer shadow-sm"
            >
              <span class="material-symbols-outlined text-base">share</span> Share Report
            </button>

            <button
              onClick={handleExportPDF}
              class="bg-[#0058be] text-white font-bold text-sm px-6 py-3 rounded-xl shadow-lg shadow-[#0058be]/25 flex items-center gap-2 transition-all active:scale-95 cursor-pointer hover:bg-[#004395]"
            >
              <span class="material-symbols-outlined text-base">picture_as_pdf</span> Export PDF
            </button>
          </div>
        </div>

        {/* Top Stats: Estimated Cost */}
        <section class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div class="md:col-span-2 glass-card rounded-3xl p-8 flex flex-col justify-center relative overflow-hidden bg-gradient-to-br from-white via-white to-[#eaedff]">
            <div class="absolute -right-20 -top-20 w-64 h-64 bg-[#0058be]/10 rounded-full blur-3xl"></div>
            <div class="relative z-10">
              <h3 class="text-[#424754] text-xs font-bold uppercase tracking-widest mb-3">Estimated Construction Cost</h3>
              <div class="flex items-baseline gap-4 flex-wrap">
                <span class="font-display text-4xl md:text-5xl font-bold text-[#0058be]">
                  {formatUsd(targetBudget)}
                </span>
                <span class="text-[#006c49] font-bold bg-[#6cf8bb]/40 px-3 py-1 rounded-full text-xs border border-[#006c49]/20">
                  +2.4% vs Market Baseline
                </span>
              </div>
              <div class="mt-8 flex flex-wrap gap-8 border-t border-[#c2c6d6]/30 pt-6">
                <div>
                  <p class="text-[#727785] text-xs font-semibold uppercase">Project Duration</p>
                  <p class="text-xl font-bold font-display text-[#131b2e]">14 Months</p>
                </div>
                <div>
                  <p class="text-[#727785] text-xs font-semibold uppercase">Built-up Area</p>
                  <p class="text-xl font-bold font-display text-[#131b2e]">{totalArea.toLocaleString()} Sq.Ft</p>
                </div>
                <div>
                  <p class="text-[#727785] text-xs font-semibold uppercase">Building Spec</p>
                  <p class="text-xl font-bold font-display text-[#131b2e]">
                    {propertyData.constructionType || 'Premium'} G+{propertyData.floors || 1}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div class="glass-card rounded-3xl p-8 flex flex-col justify-between bg-white">
            <h3 class="text-[#424754] text-xs font-bold uppercase tracking-widest mb-4">Total Cost Overview</h3>
            <div class="space-y-3">
              <div class="flex justify-between items-center text-sm">
                <span class="text-[#424754]">Base Construction</span>
                <span class="font-bold text-[#131b2e]">{formatUsd(Math.round(targetBudget * 0.79))}</span>
              </div>
              <div class="flex justify-between items-center text-sm">
                <span class="text-[#424754]">Material Upscale</span>
                <span class="font-bold text-[#131b2e]">{formatUsd(Math.round(targetBudget * 0.10))}</span>
              </div>
              <div class="flex justify-between items-center text-sm">
                <span class="text-[#424754]">Labor Premiums</span>
                <span class="font-bold text-[#131b2e]">{formatUsd(Math.round(targetBudget * 0.07))}</span>
              </div>
              <div class="flex justify-between items-center text-sm">
                <span class="text-[#424754]">Compliance & Permits</span>
                <span class="font-bold text-[#131b2e]">{formatUsd(Math.round(targetBudget * 0.04))}</span>
              </div>
              <div class="pt-4 border-t border-[#c2c6d6]/30 flex justify-between items-center">
                <span class="text-base text-[#0058be] font-bold">Total Project Cost</span>
                <span class="text-xl text-[#0058be] font-bold font-display">{formatUsd(targetBudget)}</span>
              </div>
            </div>
          </div>
        </section>

        {/* Cost Breakdown Grid */}
        <section id="cost-section" class="mb-12">
          <h3 class="text-xl font-bold text-[#131b2e] mb-4 font-display">Cost Breakdown by Category</h3>
          <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Interior */}
            <div class="glass-card p-5 rounded-2xl border-l-4 border-l-[#0058be] bg-white">
              <div class="flex justify-between items-start mb-3">
                <span class="material-symbols-outlined text-[#0058be] bg-[#0058be]/10 p-2 rounded-xl">chair</span>
                <span class="text-xs font-bold text-[#0058be]">15%</span>
              </div>
              <p class="text-[#727785] text-xs font-semibold uppercase">Interior</p>
              <p class="text-xl font-bold text-[#131b2e]">{formatUsd(costInterior)}</p>
            </div>

            {/* Material */}
            <div class="glass-card p-5 rounded-2xl border-l-4 border-l-[#006c49] bg-white">
              <div class="flex justify-between items-start mb-3">
                <span class="material-symbols-outlined text-[#006c49] bg-[#006c49]/10 p-2 rounded-xl">foundation</span>
                <span class="text-xs font-bold text-[#006c49]">35%</span>
              </div>
              <p class="text-[#727785] text-xs font-semibold uppercase">Material</p>
              <p class="text-xl font-bold text-[#131b2e]">{formatUsd(costMaterial)}</p>
            </div>

            {/* Labour */}
            <div class="glass-card p-5 rounded-2xl border-l-4 border-l-[#4648d4] bg-white">
              <div class="flex justify-between items-start mb-3">
                <span class="material-symbols-outlined text-[#4648d4] bg-[#4648d4]/10 p-2 rounded-xl">engineering</span>
                <span class="text-xs font-bold text-[#4648d4]">20%</span>
              </div>
              <p class="text-[#727785] text-xs font-semibold uppercase">Labour</p>
              <p class="text-xl font-bold text-[#131b2e]">{formatUsd(costLabour)}</p>
            </div>

            {/* Electrical */}
            <div class="glass-card p-5 rounded-2xl border-l-4 border-l-[#0058be] bg-white">
              <div class="flex justify-between items-start mb-3">
                <span class="material-symbols-outlined text-[#0058be] bg-[#0058be]/10 p-2 rounded-xl">bolt</span>
                <span class="text-xs font-bold text-[#0058be]">8%</span>
              </div>
              <p class="text-[#727785] text-xs font-semibold uppercase">Electrical</p>
              <p class="text-xl font-bold text-[#131b2e]">{formatUsd(costElectrical)}</p>
            </div>

            {/* Plumbing */}
            <div class="glass-card p-5 rounded-2xl border-l-4 border-l-[#0058be] bg-white">
              <div class="flex justify-between items-start mb-3">
                <span class="material-symbols-outlined text-[#0058be] bg-[#0058be]/10 p-2 rounded-xl">water_drop</span>
                <span class="text-xs font-bold text-[#0058be]">7%</span>
              </div>
              <p class="text-[#727785] text-xs font-semibold uppercase">Plumbing</p>
              <p class="text-xl font-bold text-[#131b2e]">{formatUsd(costPlumbing)}</p>
            </div>

            {/* Painting */}
            <div class="glass-card p-5 rounded-2xl border-l-4 border-l-[#0058be] bg-white">
              <div class="flex justify-between items-start mb-3">
                <span class="material-symbols-outlined text-[#0058be] bg-[#0058be]/10 p-2 rounded-xl">format_paint</span>
                <span class="text-xs font-bold text-[#0058be]">5%</span>
              </div>
              <p class="text-[#727785] text-xs font-semibold uppercase">Painting</p>
              <p class="text-xl font-bold text-[#131b2e]">{formatUsd(costPainting)}</p>
            </div>

            {/* Furniture */}
            <div class="glass-card p-5 rounded-2xl border-l-4 border-l-[#0058be] bg-white">
              <div class="flex justify-between items-start mb-3">
                <span class="material-symbols-outlined text-[#0058be] bg-[#0058be]/10 p-2 rounded-xl">bed</span>
                <span class="text-xs font-bold text-[#0058be]">6%</span>
              </div>
              <p class="text-[#727785] text-xs font-semibold uppercase">Furniture</p>
              <p class="text-xl font-bold text-[#131b2e]">{formatUsd(costFurniture)}</p>
            </div>

            {/* Govt Charges */}
            <div class="glass-card p-5 rounded-2xl border-l-4 border-l-[#0058be] bg-white">
              <div class="flex justify-between items-start mb-3">
                <span class="material-symbols-outlined text-[#0058be] bg-[#0058be]/10 p-2 rounded-xl">gavel</span>
                <span class="text-xs font-bold text-[#0058be]">4%</span>
              </div>
              <p class="text-[#727785] text-xs font-semibold uppercase">Govt Charges</p>
              <p class="text-xl font-bold text-[#131b2e]">{formatUsd(costGovt)}</p>
            </div>
          </div>
        </section>

        {/* Main Body Grid: Materials and Timeline */}
        <div class="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Left Column: Material Specifications & Suggestions */}
          <div class="xl:col-span-2 space-y-8">
            <div id="material-section">
              <div class="flex justify-between items-center mb-4">
                <h3 class="text-xl font-bold text-[#131b2e] font-display">Material Specifications (BOM)</h3>
                <span class="text-[#0058be] font-bold text-xs uppercase tracking-wider">AI Verified Sourcing</span>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div class="glass-card p-5 rounded-2xl flex items-center justify-between bg-white">
                  <div class="flex items-center gap-4">
                    <div class="w-12 h-12 bg-[#eaedff] rounded-xl flex items-center justify-center">
                      <span class="material-symbols-outlined text-[#0058be]">layers</span>
                    </div>
                    <div>
                      <p class="font-bold text-sm text-[#131b2e]">Cement (Ultra Grade)</p>
                      <p class="text-[#727785] text-xs">850 Bags • High Alumina OPC</p>
                    </div>
                  </div>
                  <p class="font-display font-bold text-lg text-[#0058be]">{formatUsd(12750)}</p>
                </div>

                <div class="glass-card p-5 rounded-2xl flex items-center justify-between bg-white">
                  <div class="flex items-center gap-4">
                    <div class="w-12 h-12 bg-[#eaedff] rounded-xl flex items-center justify-center">
                      <span class="material-symbols-outlined text-[#0058be]">rebase_edit</span>
                    </div>
                    <div>
                      <p class="font-bold text-sm text-[#131b2e]">Steel Rebars (TMT)</p>
                      <p class="text-[#727785] text-xs">12.5 Tons • Anti-Corrosive Fe-550</p>
                    </div>
                  </div>
                  <p class="font-display font-bold text-lg text-[#0058be]">{formatUsd(32500)}</p>
                </div>

                <div class="glass-card p-5 rounded-2xl flex items-center justify-between bg-white">
                  <div class="flex items-center gap-4">
                    <div class="w-12 h-12 bg-[#eaedff] rounded-xl flex items-center justify-center">
                      <span class="material-symbols-outlined text-[#0058be]">grain</span>
                    </div>
                    <div>
                      <p class="font-bold text-sm text-[#131b2e]">River Sand / M-Sand</p>
                      <p class="text-[#727785] text-xs">4,500 Cu.Ft • Double Washed</p>
                    </div>
                  </div>
                  <p class="font-display font-bold text-lg text-[#0058be]">{formatUsd(8200)}</p>
                </div>

                <div class="glass-card p-5 rounded-2xl flex items-center justify-between bg-white">
                  <div class="flex items-center gap-4">
                    <div class="w-12 h-12 bg-[#eaedff] rounded-xl flex items-center justify-center">
                      <span class="material-symbols-outlined text-[#0058be]">grid_view</span>
                    </div>
                    <div>
                      <p class="font-bold text-sm text-[#131b2e]">Fly Ash Bricks</p>
                      <p class="text-[#727785] text-xs">25,000 Units • High Density</p>
                    </div>
                  </div>
                  <p class="font-display font-bold text-lg text-[#0058be]">{formatUsd(18400)}</p>
                </div>
              </div>
            </div>

            {/* BuildAI Suggestions Bento */}
            <div>
              <h3 class="text-xl font-bold text-[#131b2e] mb-4 flex items-center gap-2 font-display">
                <span class="material-symbols-outlined text-[#0058be]" style={{ fontVariationSettings: "'FILL' 1" }}>
                  auto_awesome
                </span>
                BuildAI Smart Suggestions
              </h3>

              <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div class="bg-[#0058be]/5 border border-[#0058be]/20 p-6 rounded-2xl">
                  <h4 class="font-bold text-[#0058be] text-sm mb-2">Foundation Recommendation</h4>
                  <p class="text-xs text-[#424754] mb-4 leading-relaxed">
                    Switch to Raft Foundation to reduce soil settlement risks based on current Palo Alto geological survey.
                  </p>
                  <span class="bg-[#0058be] text-white text-[10px] px-2.5 py-1 rounded-md uppercase font-bold tracking-wider">
                    Recommended
                  </span>
                </div>

                <div class="bg-[#f2f3ff] border border-[#c2c6d6]/30 p-6 rounded-2xl">
                  <h4 class="font-bold text-[#131b2e] text-sm mb-2">Roofing Innovation</h4>
                  <p class="text-xs text-[#424754] mb-4 leading-relaxed">
                    Install solar-integrated shingles. Initial cost +15%, but estimated payback is only 4.2 years.
                  </p>
                  <span class="bg-[#dae2fd] text-[#131b2e] text-[10px] px-2.5 py-1 rounded-md uppercase font-bold tracking-wider">
                    Optimization
                  </span>
                </div>

                <div class="bg-[#006c49]/5 border border-[#006c49]/20 p-6 rounded-2xl">
                  <h4 class="font-bold text-[#006c49] text-sm mb-2">HVAC Efficiency</h4>
                  <p class="text-xs text-[#424754] mb-4 leading-relaxed">
                    Multi-zone VRF system suggested for 28% reduction in annual cooling energy.
                  </p>
                  <span class="bg-[#006c49] text-white text-[10px] px-2.5 py-1 rounded-md uppercase font-bold tracking-wider">
                    Efficiency
                  </span>
                </div>
              </div>
            </div>

            {/* Environmental Risk Analysis */}
            <div>
              <h3 class="text-xl font-bold text-[#131b2e] mb-4 font-display">Environmental Risk Analysis</h3>
              <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div class="glass-card p-4 rounded-2xl text-center bg-white">
                  <span class="material-symbols-outlined text-[#ba1a1a] text-3xl mb-1">flood</span>
                  <p class="text-xs font-bold text-[#727785] uppercase">Flood Risk</p>
                  <p class="text-[#ba1a1a] font-bold text-sm mt-1">LOW</p>
                </div>
                <div class="glass-card p-4 rounded-2xl text-center bg-white">
                  <span class="material-symbols-outlined text-[#006c49] text-3xl mb-1">volcano</span>
                  <p class="text-xs font-bold text-[#727785] uppercase">Earthquake</p>
                  <p class="text-[#006c49] font-bold text-sm mt-1">NONE</p>
                </div>
                <div class="glass-card p-4 rounded-2xl text-center bg-white">
                  <span class="material-symbols-outlined text-[#0058be] text-3xl mb-1">cyclone</span>
                  <p class="text-xs font-bold text-[#727785] uppercase">Wind Force</p>
                  <p class="text-[#0058be] font-bold text-sm mt-1">MODERATE</p>
                </div>
                <div class="glass-card p-4 rounded-2xl text-center bg-white">
                  <span class="material-symbols-outlined text-[#4648d4] text-3xl mb-1">landscape</span>
                  <p class="text-xs font-bold text-[#727785] uppercase">Soil Stability</p>
                  <p class="text-[#4648d4] font-bold text-sm mt-1">OPTIMAL</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Timeline & Progress */}
          <div id="timeline-section" class="space-y-6">
            <h3 class="text-xl font-bold text-[#131b2e] font-display">Timeline & Milestones</h3>
            <div class="glass-card rounded-3xl p-6 relative timeline-line bg-white">
              <div class="space-y-6 relative z-10">
                {/* Milestone 1 */}
                <div class="flex gap-4 items-start">
                  <div class="w-6 h-6 rounded-full bg-[#006c49] flex items-center justify-center shrink-0 border-4 border-[#6cf8bb]">
                    <span class="material-symbols-outlined text-[12px] text-white">check</span>
                  </div>
                  <div>
                    <p class="font-bold text-sm text-[#131b2e]">Foundation & Plinth</p>
                    <p class="text-[#727785] text-xs">Completed Oct 2025</p>
                    <p class="text-xs text-[#424754] mt-1">Structural integrity verified by AI scan.</p>
                  </div>
                </div>

                {/* Milestone 2 */}
                <div class="flex gap-4 items-start">
                  <div class="w-6 h-6 rounded-full bg-[#006c49] flex items-center justify-center shrink-0 border-4 border-[#6cf8bb]">
                    <span class="material-symbols-outlined text-[12px] text-white">check</span>
                  </div>
                  <div>
                    <p class="font-bold text-sm text-[#131b2e]">Superstructure (RCC Frame)</p>
                    <p class="text-[#727785] text-xs">Completed Jan 2026</p>
                    <p class="text-xs text-[#424754] mt-1">L1 & L2 casting finished within budget.</p>
                  </div>
                </div>

                {/* Milestone 3 */}
                <div class="flex gap-4 items-start">
                  <div class="w-6 h-6 rounded-full bg-[#0058be] flex items-center justify-center shrink-0 border-4 border-[#d8e2ff]">
                    <span class="w-2 h-2 rounded-full bg-white animate-ping"></span>
                  </div>
                  <div>
                    <p class="font-bold text-sm text-[#131b2e]">MEP & Plumbing</p>
                    <p class="text-[#0058be] font-bold text-xs">In Progress (65%)</p>
                    <p class="text-xs text-[#424754] mt-1">Final pipe layout pending site sign-off.</p>
                  </div>
                </div>

                {/* Milestone 4 */}
                <div class="flex gap-4 items-start opacity-60">
                  <div class="w-6 h-6 rounded-full bg-[#c2c6d6] flex items-center justify-center shrink-0">
                    <span class="w-2 h-2 rounded-full bg-white"></span>
                  </div>
                  <div>
                    <p class="font-bold text-sm text-[#131b2e]">Finishing & Interiors</p>
                    <p class="text-[#727785] text-xs">Scheduled Starts June 2026</p>
                  </div>
                </div>

                {/* Milestone 5 */}
                <div class="flex gap-4 items-start opacity-60">
                  <div class="w-6 h-6 rounded-full bg-[#c2c6d6] flex items-center justify-center shrink-0">
                    <span class="w-2 h-2 rounded-full bg-white"></span>
                  </div>
                  <div>
                    <p class="font-bold text-sm text-[#131b2e]">Final Inspection & Key Handover</p>
                    <p class="text-[#727785] text-xs">Scheduled Aug 2026</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Micro Charts: Budget Utilization */}
            <div class="glass-card p-6 rounded-3xl bg-white shadow-md">
              <h4 class="font-bold text-sm text-[#131b2e] mb-3">Budget Utilization</h4>
              <div class="h-3 w-full bg-[#eaedff] rounded-full overflow-hidden flex mb-3">
                <div class="h-full bg-[#0058be] transition-all duration-1000" style={{ width: '72%' }}></div>
                <div class="h-full bg-[#006c49] transition-all duration-1000" style={{ width: '15%' }}></div>
              </div>
              <div class="flex justify-between text-xs text-[#727785] font-semibold">
                <span>Spent: {formatUsd(Math.round(targetBudget * 0.72))} (72%)</span>
                <span>Remaining: {formatUsd(Math.round(targetBudget * 0.28))}</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
