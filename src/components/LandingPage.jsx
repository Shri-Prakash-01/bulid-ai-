import React from 'react';

export default function LandingPage({ startWizard, setCurrentView }) {
  return (
    <main class="pt-20">
      {/* Hero Section */}
      <section class="relative min-h-[720px] flex flex-col items-center justify-center px-6 md:px-12 py-16 hero-gradient overflow-hidden">
        <div class="max-w-4xl text-center z-10">
          <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0058be]/10 text-[#0058be] text-xs font-semibold uppercase tracking-wider mb-6 border border-[#0058be]/20">
            <span class="material-symbols-outlined text-sm">auto_awesome</span>
            AI-Powered Architectural Suite
          </div>
          <h1 class="font-display text-[40px] md:text-6xl font-bold leading-[1.1] text-[#131b2e] mb-6">
            Build Your <span class="text-[#0058be]">Dream Home</span> with AI
          </h1>
          <p class="text-lg md:text-xl text-[#424754] mb-10 max-w-2xl mx-auto leading-relaxed">
            Transform your vision into reality with high-precision AI cost estimation, automated home plans, and intelligent material calculations. Precision in every pixel, for every brick.
          </p>
          <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={startWizard}
              class="w-full sm:w-auto px-8 py-4 bg-[#0058be] text-white rounded-xl font-semibold text-base shadow-[0_4px_0_0_#004395] active:shadow-none active:translate-y-[2px] transition-all flex items-center justify-center gap-2 cursor-pointer hover:bg-[#004395]"
            >
              Start Planning
              <span class="material-symbols-outlined">arrow_forward</span>
            </button>
            <button
              onClick={() => {
                const el = document.getElementById('features');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              class="w-full sm:w-auto px-8 py-4 glass-card text-[#131b2e] rounded-xl font-semibold text-base hover:bg-[#e2e7ff]/50 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              Explore Features
              <span class="material-symbols-outlined">play_circle</span>
            </button>
          </div>
        </div>

        {/* Hero Visual Container */}
        <div class="mt-12 relative w-full max-w-5xl mx-auto px-4">
          <div class="aspect-[16/9] glass-card rounded-2xl overflow-hidden p-2 md:p-4 animate-float">
            <div class="relative w-full h-full rounded-xl overflow-hidden bg-[#dae2fd]">
              <img
                class="w-full h-full object-cover opacity-95 hover:scale-105 transition-transform duration-700"
                alt="Modern House Under Construction Architectural 3D Render"
                src="/hero-house.png"
              />
              
              {/* Overlay Estimated Budget Card */}
              <div class="absolute top-6 right-6 p-4 glass-card rounded-xl flex flex-col gap-2 max-w-[220px] shadow-lg border border-white/60">
                <div class="flex items-center gap-2 text-[#0058be]">
                  <span class="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>
                    monetization_on
                  </span>
                  <span class="text-xs font-bold uppercase tracking-wider">Estimated Budget</span>
                </div>
                <div class="text-2xl font-bold text-[#131b2e]">$428,500</div>
                <div class="w-full bg-[#c2c6d6]/30 h-1.5 rounded-full overflow-hidden">
                  <div class="bg-[#4edea3] h-full w-[75%] rounded-full"></div>
                </div>
              </div>

              {/* Live Status Overlay */}
              <div class="absolute bottom-6 left-6 p-3 glass-card rounded-xl flex items-center gap-3 shadow-lg border border-white/60">
                <div class="w-3 h-3 rounded-full bg-[#006c49] animate-ping"></div>
                <div>
                  <p class="text-xs font-bold text-[#131b2e]">AI Real-Time Optimization Active</p>
                  <p class="text-[11px] text-[#424754]">Location: Palo Alto, CA (Plot: 2,400 sq.ft)</p>
                </div>
              </div>
            </div>
          </div>

          {/* Decorative ambient glows */}
          <div class="absolute -z-10 -top-20 -left-20 w-64 h-64 bg-[#0058be]/10 rounded-full blur-[80px]"></div>
          <div class="absolute -z-10 -bottom-20 -right-20 w-80 h-80 bg-[#006c49]/10 rounded-full blur-[80px]"></div>
        </div>
      </section>

      {/* Feature Bento Grid */}
      <section id="features" class="px-6 md:px-12 py-16 max-w-7xl mx-auto">
        <div class="text-center mb-16">
          <span class="text-xs font-bold text-[#006c49] bg-[#6cf8bb]/30 px-4 py-1.5 rounded-full uppercase tracking-wider border border-[#006c49]/20">
            Features
          </span>
          <h2 class="font-display text-3xl md:text-4xl font-semibold text-[#131b2e] mt-4">
            Smart Tools for Modern Building
          </h2>
          <p class="text-[#424754] text-base mt-2 max-w-xl mx-auto">
            Everything you need from initial plot measurement to material calculations and final cost delivery.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Card 1: AI Cost Estimation */}
          <div class="md:col-span-8 glass-card rounded-2xl p-8 flex flex-col justify-between overflow-hidden relative group">
            <div class="z-10">
              <div class="w-12 h-12 bg-[#0058be]/10 rounded-xl flex items-center justify-center mb-6 text-[#0058be]">
                <span class="material-symbols-outlined text-3xl">analytics</span>
              </div>
              <h3 class="text-2xl font-semibold text-[#131b2e] mb-3">AI Cost Estimation</h3>
              <p class="text-[#424754] text-base max-w-md">
                Get hyper-accurate local price estimates for materials and labor based on historical data and current market trends.
              </p>
            </div>
            <div class="mt-8 flex gap-4 overflow-x-auto pb-2">
              <div class="min-w-[210px] p-4 bg-white rounded-xl border border-[#c2c6d6]/40 shadow-sm flex items-center gap-3">
                <div class="w-2 h-10 bg-[#0058be] rounded-full"></div>
                <div>
                  <div class="text-xs text-[#424754]">Concrete Foundation</div>
                  <div class="font-bold text-[#131b2e]">$12,400.00</div>
                </div>
              </div>
              <div class="min-w-[210px] p-4 bg-white rounded-xl border border-[#c2c6d6]/40 shadow-sm flex items-center gap-3">
                <div class="w-2 h-10 bg-[#006c49] rounded-full"></div>
                <div>
                  <div class="text-xs text-[#424754]">Framing Timber</div>
                  <div class="font-bold text-[#131b2e]">$28,950.00</div>
                </div>
              </div>
              <div class="min-w-[210px] p-4 bg-white rounded-xl border border-[#c2c6d6]/40 shadow-sm flex items-center gap-3">
                <div class="w-2 h-10 bg-[#4648d4] rounded-full"></div>
                <div>
                  <div class="text-xs text-[#424754]">MEP & Plumbing</div>
                  <div class="font-bold text-[#131b2e]">$34,280.00</div>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Material Calculator */}
          <div class="md:col-span-4 glass-card rounded-2xl p-8 flex flex-col justify-between">
            <div>
              <div class="w-12 h-12 bg-[#006c49]/10 rounded-xl flex items-center justify-center mb-6 text-[#006c49]">
                <span class="material-symbols-outlined text-3xl">calculate</span>
              </div>
              <h3 class="text-2xl font-semibold text-[#131b2e] mb-3">Material Calculator</h3>
              <p class="text-[#424754] text-base">
                Precise volume and quantity breakdowns to eliminate waste and optimize your ordering schedule.
              </p>
            </div>
            <div class="mt-8 flex justify-center">
              <div class="w-full h-32 bg-[#6cf8bb]/15 rounded-xl border border-dashed border-[#006c49]/40 flex flex-col items-center justify-center p-4 text-center">
                <span class="text-3xl font-bold text-[#006c49]">98.4%</span>
                <span class="text-xs font-semibold text-[#00714d] uppercase tracking-wider mt-1">Material Efficiency Rate</span>
              </div>
            </div>
          </div>

          {/* Card 3: Interior Designer */}
          <div class="md:col-span-4 glass-card rounded-2xl p-8">
            <div class="w-12 h-12 bg-[#4648d4]/10 rounded-xl flex items-center justify-center mb-6 text-[#4648d4]">
              <span class="material-symbols-outlined text-3xl">palette</span>
            </div>
            <h3 class="text-2xl font-semibold text-[#131b2e] mb-3">Interior Designer</h3>
            <p class="text-[#424754] text-base">
              Generate stunning interior layouts and lighting schemes using specialized architectural generative AI.
            </p>
          </div>

          {/* Card 4: Timeline Prediction */}
          <div class="md:col-span-8 glass-card rounded-2xl p-8 flex flex-col md:flex-row items-center gap-8">
            <div class="flex-1">
              <div class="w-12 h-12 bg-[#0058be]/10 rounded-xl flex items-center justify-center mb-6 text-[#0058be]">
                <span class="material-symbols-outlined text-3xl">history_toggle_off</span>
              </div>
              <h3 class="text-2xl font-semibold text-[#131b2e] mb-3">Timeline Prediction</h3>
              <p class="text-[#424754] text-base">
                Dynamic Gantt charts that adjust based on weather forecasts, contractor availability, and shipping delays.
              </p>
            </div>
            <div class="w-full md:w-64 space-y-3">
              <div class="flex justify-between text-xs text-[#424754] mb-1 font-semibold">
                <span>Phase 1: Foundation</span>
                <span>100%</span>
              </div>
              <div class="h-4 w-full bg-[#eaedff] rounded-full overflow-hidden">
                <div class="h-full bg-[#0058be] w-[100%] rounded-full"></div>
              </div>
              <div class="flex justify-between text-xs text-[#424754] mb-1 font-semibold">
                <span>Phase 2: Framing</span>
                <span>65%</span>
              </div>
              <div class="h-4 w-full bg-[#eaedff] rounded-full overflow-hidden">
                <div class="h-full bg-[#4edea3] w-[65%] rounded-full"></div>
              </div>
              <div class="flex justify-between text-xs text-[#424754] mb-1 font-semibold">
                <span>Phase 3: Finishing</span>
                <span>25%</span>
              </div>
              <div class="h-4 w-full bg-[#eaedff] rounded-full overflow-hidden">
                <div class="h-full bg-[#4648d4] w-[25%] rounded-full"></div>
              </div>
            </div>
          </div>

          {/* Card 5: 3D Home Preview */}
          <div class="md:col-span-6 glass-card rounded-2xl p-8 flex flex-col justify-between overflow-hidden">
            <div>
              <div class="w-12 h-12 bg-[#0058be]/10 rounded-xl flex items-center justify-center mb-6 text-[#0058be]">
                <span class="material-symbols-outlined text-3xl">view_in_ar</span>
              </div>
              <h3 class="text-2xl font-semibold text-[#131b2e] mb-3">3D Home Preview</h3>
              <p class="text-[#424754] text-base">
                Immersive walkthroughs and bird's eye views of your architectural plans before ground is broken.
              </p>
            </div>
            <div class="mt-8 relative h-48 rounded-xl overflow-hidden border border-[#c2c6d6]/30">
              <img
                class="w-full h-full object-cover"
                alt="3D Floorplan Rendering"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCLMBXKPGGSrfxfQpT5xJWi2wAjRDuVj700oyLjMCVl0tSb54Kh5uqXetg-rpURi8KeR97YIRZx5gITNVdBtjPerd4AY-oABiAqLdzSqlEvKUbVdcHaEBzLPg0eyuXkRJuI6pJSCmDGl0sYAH1YSpFSEi5tSfNFcNgx9ZUi-r33J9gI2fRJq71P7OD7hmk__Lpk2YI2J5DI9DEWcHLUwNcFqfgXHsYKcBAOTTXb0SzQIJMWKjNKnQ3Lww"
              />
            </div>
          </div>

          {/* Card 6: Smart Budget Planning */}
          <div class="md:col-span-6 glass-card rounded-2xl p-8 flex flex-col justify-between">
            <div>
              <div class="w-12 h-12 bg-[#006c49]/10 rounded-xl flex items-center justify-center mb-6 text-[#006c49]">
                <span class="material-symbols-outlined text-3xl">account_balance_wallet</span>
              </div>
              <h3 class="text-2xl font-semibold text-[#131b2e] mb-3">Smart Budget Planning</h3>
              <p class="text-[#424754] text-base">
                Financial forecasting that suggests tax incentives, sustainable building rebates, and financing options tailored to your project.
              </p>
            </div>
            <div class="mt-8 flex justify-end">
              <div class="p-4 bg-[#e2e7ff] rounded-xl flex items-center gap-4">
                <div class="text-right">
                  <div class="text-xs text-[#424754] font-semibold uppercase">Potential Savings</div>
                  <div class="text-2xl font-bold text-[#006c49]">+$14,200</div>
                </div>
                <span class="material-symbols-outlined text-4xl text-[#006c49]">trending_up</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Banner Section */}
      <section class="px-6 md:px-12 py-12">
        <div class="max-w-5xl mx-auto glass-card bg-[#2170e4] text-white rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center gap-10 text-center md:text-left relative overflow-hidden shadow-2xl">
          <div class="z-10 flex-1">
            <h2 class="font-display text-3xl md:text-4xl font-semibold mb-4">Ready to build the future?</h2>
            <p class="text-lg opacity-90 mb-8 max-w-xl">
              Join 5,000+ homeowners and project managers who are using BuildAI to deliver projects on time and under budget.
            </p>
            <button
              onClick={startWizard}
              class="px-10 py-5 bg-white text-[#2170e4] rounded-xl font-bold text-lg hover:shadow-xl transition-all active:scale-95 cursor-pointer shadow-md"
            >
              Get Started Free
            </button>
          </div>
          <div class="relative w-full md:w-[340px] h-64 md:h-72 rounded-2xl overflow-hidden shadow-2xl z-10 border border-white/20">
            <img
              class="w-full h-full object-cover"
              alt="BuildAI Tablet Studio Interface"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBvAOpulWb19sI1ZoLgfSN8MpEEohio7x4X_gkYnO34sLjxbb9GCX0TGwgMa5QhUbHEx7BgY-FNoBdS2UX6RjB2TIq3G-yUR--rV83d-KxgOPl-WYjAEsy_q5ZuKZGVpEh8M90TiPui42rv5bxFcDzMBcVtl211KZUTzi66MDeBnu4ObuD6veYkIrRvmsI0ZxmNcFt_u0HdmuIgrZWfSMWG4wsYE4LYzNfe_Fu_7HiWMNDND4_il4lSYA"
            />
          </div>
          <div class="absolute -top-10 -right-10 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
          <div class="absolute -bottom-20 -left-20 w-96 h-96 bg-[#006c49]/20 rounded-full blur-3xl"></div>
        </div>
      </section>
    </main>
  );
}
