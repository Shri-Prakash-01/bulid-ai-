import React, { useState } from 'react';

export default function CreateProject({ projectData, setProjectData, roomData, setRoomData, setActivePage }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [saveToast, setSaveToast] = useState('');

  const handleChange = (field, val) => {
    setProjectData(prev => ({ ...prev, [field]: val }));
    setSaveToast('Auto-saved changes...');
    setTimeout(() => setSaveToast(''), 1500);
  };

  const steps = [
    { num: 1, title: 'Plot Details' },
    { num: 2, title: 'Construction Details' },
    { num: 3, title: 'Room Requirements' },
    { num: 4, title: 'Quality Level' },
    { num: 5, title: 'Budget & Timeline' },
    { num: 6, title: 'Special Requirements' }
  ];

  const plotArea = (Number(projectData.length) || 40) * (Number(projectData.width) || 60);

  return (
    <div class="space-y-6 max-w-4xl mx-auto pb-12">
      {/* Header & Step Bar */}
      <div class="bg-white p-6 rounded-3xl border border-[#c2c6d6]/30 shadow-md">
        <div class="flex justify-between items-center mb-4">
          <div>
            <span class="text-xs font-bold text-[#0058be] uppercase tracking-widest">
              User Page 02 — Project Setup
            </span>
            <h2 class="font-display text-2xl font-bold text-[#131b2e]">
              Step {currentStep}: {steps[currentStep - 1].title}
            </h2>
          </div>
          {saveToast && (
            <span class="text-xs font-bold text-[#006c49] bg-[#6cf8bb]/30 px-3 py-1 rounded-full animate-fade-in">
              ✓ {saveToast}
            </span>
          )}
        </div>

        {/* Step Progress Pills */}
        <div class="grid grid-cols-6 gap-2">
          {steps.map((s) => (
            <button
              key={s.num}
              onClick={() => setCurrentStep(s.num)}
              class={`py-2 px-1 rounded-xl text-center text-xs font-bold transition-all cursor-pointer ${
                currentStep === s.num
                  ? 'bg-[#0058be] text-white shadow-md'
                  : currentStep > s.num
                  ? 'bg-[#6cf8bb]/40 text-[#00714d]'
                  : 'bg-[#f2f3ff] text-[#727785]'
              }`}
            >
              {s.num}. {s.title.split(' ')[0]}
            </button>
          ))}
        </div>
      </div>

      {/* Form Body */}
      <div class="bg-white p-8 rounded-3xl border border-[#c2c6d6]/30 shadow-lg min-h-[420px]">
        {/* Step 1: Plot Details */}
        {currentStep === 1 && (
          <div class="space-y-4">
            <h3 class="font-bold text-lg text-[#131b2e] mb-2 font-display">Step 1 — Plot & Site Dimensions</h3>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label class="text-xs font-bold text-[#727785] uppercase block mb-1">Plot Length (ft)</label>
                <input
                  type="number"
                  value={projectData.length}
                  onChange={(e) => handleChange('length', Number(e.target.value))}
                  class="w-full p-3 rounded-xl bg-[#f2f3ff] font-bold text-base border border-transparent focus:border-[#0058be]"
                />
              </div>

              <div>
                <label class="text-xs font-bold text-[#727785] uppercase block mb-1">Plot Width (ft)</label>
                <input
                  type="number"
                  value={projectData.width}
                  onChange={(e) => handleChange('width', Number(e.target.value))}
                  class="w-full p-3 rounded-xl bg-[#f2f3ff] font-bold text-base border border-transparent focus:border-[#0058be]"
                />
              </div>

              <div>
                <label class="text-xs font-bold text-[#727785] uppercase block mb-1">Total Plot Area</label>
                <div class="p-3 bg-[#eaedff] rounded-xl font-bold text-base text-[#0058be]">
                  {plotArea.toLocaleString()} sq.ft
                </div>
              </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
              <div>
                <label class="text-xs font-bold text-[#727785] uppercase block mb-1">City / Region</label>
                <input
                  type="text"
                  value={projectData.city}
                  onChange={(e) => handleChange('city', e.target.value)}
                  class="w-full p-3 rounded-xl bg-[#f2f3ff] text-sm font-medium"
                />
              </div>

              <div>
                <label class="text-xs font-bold text-[#727785] uppercase block mb-1">Pincode</label>
                <input
                  type="text"
                  value={projectData.zip}
                  onChange={(e) => handleChange('zip', e.target.value)}
                  class="w-full p-3 rounded-xl bg-[#f2f3ff] text-sm font-medium"
                />
              </div>

              <div>
                <label class="text-xs font-bold text-[#727785] uppercase block mb-1">Plot Facing</label>
                <select
                  value={projectData.facing}
                  onChange={(e) => handleChange('facing', e.target.value)}
                  class="w-full p-3 rounded-xl bg-[#f2f3ff] text-sm font-bold"
                >
                  <option value="E">East Facing (Recommended)</option>
                  <option value="N">North Facing</option>
                  <option value="W">West Facing</option>
                  <option value="S">South Facing</option>
                  <option value="NE">North-East Facing</option>
                  <option value="SW">South-West Facing</option>
                </select>
              </div>
            </div>

            <div class="grid grid-cols-2 gap-4 pt-2">
              <div>
                <label class="text-xs font-bold text-[#727785] uppercase block mb-1">Road Width (ft)</label>
                <input
                  type="number"
                  defaultValue={30}
                  class="w-full p-3 rounded-xl bg-[#f2f3ff] text-sm font-medium"
                />
              </div>

              <div class="flex items-center pt-6 gap-2">
                <input type="checkbox" id="corner" defaultChecked class="rounded text-[#0058be]" />
                <label for="corner" class="text-xs font-bold text-[#131b2e] cursor-pointer">Corner Plot Site</label>
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Construction Details */}
        {currentStep === 2 && (
          <div class="space-y-4">
            <h3 class="font-bold text-lg text-[#131b2e] mb-2 font-display">Step 2 — Built-up Area & Floors</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="text-xs font-bold text-[#727785] uppercase block mb-1">Number of Floors (G+)</label>
                <select
                  value={projectData.floors}
                  onChange={(e) => handleChange('floors', Number(e.target.value))}
                  class="w-full p-3 rounded-xl bg-[#f2f3ff] text-sm font-bold"
                >
                  <option value={1}>G + 1 Floor (Duplex Villa)</option>
                  <option value={2}>G + 2 Floors</option>
                  <option value={3}>G + 3 Floors</option>
                  <option value={4}>G + 4 Floors</option>
                </select>
              </div>

              <div>
                <label class="text-xs font-bold text-[#727785] uppercase block mb-1">Est. Built-up Area</label>
                <div class="p-3 bg-[#eaedff] rounded-xl font-bold text-base text-[#0058be]">
                  {Math.round(plotArea * (1.2 + (projectData.floors || 1) * 0.45)).toLocaleString()} sq.ft
                </div>
              </div>
            </div>

            <div class="grid grid-cols-2 gap-4 pt-4">
              <label class="flex items-center gap-2 p-3 bg-[#f2f3ff] rounded-xl cursor-pointer">
                <input type="checkbox" defaultChecked class="rounded text-[#0058be]" />
                <span class="text-xs font-bold text-[#131b2e]">Car Parking Covered</span>
              </label>

              <label class="flex items-center gap-2 p-3 bg-[#f2f3ff] rounded-xl cursor-pointer">
                <input type="checkbox" defaultChecked class="rounded text-[#0058be]" />
                <span class="text-xs font-bold text-[#131b2e]">Open Terrace Deck</span>
              </label>
            </div>
          </div>
        )}

        {/* Step 3: Room Requirements */}
        {currentStep === 3 && (
          <div class="space-y-4">
            <h3 class="font-bold text-lg text-[#131b2e] mb-2 font-display">Step 3 — Room Requirements</h3>
            <p class="text-xs text-[#727785]">
              Adjust room counts — these values are sent directly to the AI cost estimation engine.
            </p>
            <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { label: 'Bedrooms',    key: 'bedrooms',    min: 1, max: 8 },
                { label: 'Bathrooms',   key: 'bathrooms',   min: 1, max: 8 },
                { label: 'Kitchen',     key: 'kitchen',     min: 1, max: 3 },
                { label: 'Living Room', key: 'livingRoom',  min: 1, max: 3 },
                { label: 'Dining Room', key: 'diningRoom',  min: 0, max: 3 },
                { label: 'Pooja Room',  key: 'poojaRoom',   min: 0, max: 2 },
                { label: 'Store Room',  key: 'storeRoom',   min: 0, max: 3 },
                { label: 'Balcony',     key: 'balcony',     min: 0, max: 6 }
              ].map((r) => (
                <div key={r.key} class="p-3 bg-[#f2f3ff] rounded-2xl space-y-2">
                  <span class="text-xs font-bold text-[#131b2e] block">{r.label}</span>
                  <div class="flex items-center justify-between gap-2">
                    <button
                      type="button"
                      onClick={() => setRoomData(prev => ({ ...prev, [r.key]: Math.max(r.min, (prev[r.key] || 0) - 1) }))}
                      class="w-7 h-7 rounded-lg bg-white border border-[#c2c6d6]/50 text-[#131b2e] font-bold text-sm flex items-center justify-center hover:bg-[#eaedff] transition-colors cursor-pointer"
                    >−</button>
                    <span class="w-6 text-center font-bold text-sm text-[#0058be]">
                      {roomData[r.key] ?? 0}
                    </span>
                    <button
                      type="button"
                      onClick={() => setRoomData(prev => ({ ...prev, [r.key]: Math.min(r.max, (prev[r.key] || 0) + 1) }))}
                      class="w-7 h-7 rounded-lg bg-[#0058be] text-white font-bold text-sm flex items-center justify-center hover:bg-[#004395] transition-colors cursor-pointer"
                    >+</button>
                  </div>
                </div>
              ))}
            </div>

            {/* Live summary of what will be sent to AI */}
            <div class="p-3 bg-[#eaedff] rounded-2xl text-xs text-[#424754]">
              <span class="font-bold text-[#0058be] block mb-1">
                AI will receive this room configuration:
              </span>
              <span class="font-mono">
                {Object.entries(roomData)
                  .map(([k, v]) => `${k}: ${v}`)
                  .join(' • ')}
              </span>
            </div>
          </div>
        )}

        {/* Step 4: Quality Level */}
        {currentStep === 4 && (
          <div class="space-y-4">
            <h3 class="font-bold text-lg text-[#131b2e] mb-2 font-display">Step 4 — Material & Finishing Quality Level</h3>
            <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
              {[
                { type: 'Economy', rate: '₹1,500/sq.ft', desc: 'Functional standard materials & fittings' },
                { type: 'Standard', rate: '₹1,850/sq.ft', desc: 'Durable branded materials & vitrified tiles' },
                { type: 'Premium', rate: '₹2,400/sq.ft', desc: 'High-end teakwood, Italian marble & VRF HVAC' },
                { type: 'Luxury', rate: '₹3,500/sq.ft', desc: 'Ultra-bespoke automated smart home finish' }
              ].map((q) => (
                <button
                  key={q.type}
                  type="button"
                  onClick={() => handleChange('constructionType', q.type)}
                  class={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                    projectData.constructionType === q.type
                      ? 'border-[#0058be] bg-[#0058be]/10 shadow-md scale-105'
                      : 'border-[#c2c6d6]/40 hover:bg-[#eaedff]'
                  }`}
                >
                  <span class="font-bold text-sm text-[#131b2e] block">{q.type}</span>
                  <span class="text-xs font-bold text-[#0058be] block mt-1">{q.rate}</span>
                  <span class="text-[11px] text-[#727785] block mt-2">{q.desc}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 5: Budget & Timeline */}
        {currentStep === 5 && (
          <div class="space-y-4">
            <h3 class="font-bold text-lg text-[#131b2e] mb-2 font-display">Step 5 — Target Budget & Timeline</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="text-xs font-bold text-[#727785] uppercase block mb-1">Expected Budget (₹)</label>
                <input
                  type="number"
                  value={projectData.budget || 3750000}
                  onChange={(e) => handleChange('budget', Number(e.target.value))}
                  class="w-full p-3 rounded-xl bg-[#f2f3ff] font-bold text-lg text-[#0058be]"
                />
              </div>

              <div>
                <label class="text-xs font-bold text-[#727785] uppercase block mb-1">Funding Method</label>
                <select class="w-full p-3 rounded-xl bg-[#f2f3ff] text-sm font-bold">
                  <option>Home Loan Required (80%) + Self Funding (20%)</option>
                  <option>100% Self Funded</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Step 6: Special Requirements */}
        {currentStep === 6 && (
          <div class="space-y-4">
            <h3 class="font-bold text-lg text-[#131b2e] mb-2 font-display">Step 6 — Special & Vastu Constraints</h3>
            <div class="space-y-3">
              <label class="flex items-center gap-3 p-3 bg-[#f2f3ff] rounded-2xl cursor-pointer">
                <input type="checkbox" defaultChecked class="rounded text-[#0058be]" />
                <div>
                  <span class="text-xs font-bold text-[#131b2e] block">Strict Vastu Compliance</span>
                  <span class="text-[11px] text-[#727785]">Align kitchen to SE (Agni) & master bedroom to SW</span>
                </div>
              </label>

              <div>
                <label class="text-xs font-bold text-[#727785] uppercase block mb-1">Soil / Site Notes</label>
                <textarea
                  placeholder="e.g. Medium clay soil, requires 6-ft deep raft foundation footing..."
                  class="w-full p-3 rounded-xl bg-[#f2f3ff] text-xs h-24 outline-none border border-transparent focus:border-[#0058be]"
                ></textarea>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Navigation Buttons */}
      <div class="flex justify-between items-center pt-2">
        <button
          disabled={currentStep === 1}
          onClick={() => setCurrentStep(prev => prev - 1)}
          class={`px-6 py-3 rounded-xl font-bold text-xs transition-all cursor-pointer ${
            currentStep === 1 ? 'opacity-40 text-[#727785]' : 'bg-[#eaedff] text-[#131b2e] hover:bg-[#d8e2ff]'
          }`}
        >
          Previous Step
        </button>

        {currentStep < 6 ? (
          <button
            onClick={() => setCurrentStep(prev => prev + 1)}
            class="px-8 py-3.5 bg-[#0058be] text-white rounded-xl font-bold text-xs shadow-lg hover:bg-[#004395] transition-all cursor-pointer flex items-center gap-2"
          >
            Next Step
            <span class="material-symbols-outlined text-sm">arrow_forward</span>
          </button>
        ) : (
          <div class="flex gap-3">
            <button
              onClick={() => setActivePage('costEstimation')}
              class="px-6 py-3.5 bg-[#0058be] text-white rounded-xl font-bold text-xs shadow-lg hover:bg-[#004395] transition-all cursor-pointer flex items-center gap-2"
            >
              <span class="material-symbols-outlined text-sm">analytics</span>
              AI Cost Estimate
            </button>
            <button
              onClick={() => setActivePage('publishBidding')}
              class="px-8 py-3.5 bg-[#006c49] text-white rounded-xl font-bold text-xs shadow-xl hover:bg-[#005236] transition-all cursor-pointer flex items-center gap-2"
            >
              <span class="material-symbols-outlined text-sm">campaign</span>
              Publish for Bidding
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
