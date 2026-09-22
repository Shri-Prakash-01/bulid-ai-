import React, { useState } from 'react';

export default function ImageGeneration({ projectData }) {
  const [activePart, setActivePart] = useState('layout'); // 'layout' | 'interior'
  const [selectedStyle, setSelectedStyle] = useState('Indian');
  const [selectedRoom, setSelectedRoom] = useState('Living Room');
  const [isGenerating, setIsGenerating] = useState(false);

  const plotArea = (Number(projectData.length) || 40) * (Number(projectData.width) || 60);

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => setIsGenerating(false), 1200);
  };

  const interiorStyles = [
    { name: 'Modern', desc: 'Clean lines, recessed LED, glass & neutral tones' },
    { name: 'Minimal', desc: 'Sleek decluttered wood, white oak & raw concrete' },
    { name: 'Luxury', desc: 'Italian marble, gold trims, velvet & chandeliers' },
    { name: 'Traditional', desc: 'Teakwood wainscoting, carved pillars & warm clay' },
    { name: 'Contemporary', desc: 'Dynamic textures, open concept & ambient glow' },
    { name: 'Indian', desc: 'Jali wood panels, brass accents & vibrant motifs' }
  ];

  return (
    <div class="space-y-6">
      {/* Header */}
      <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-3xl border border-[#c2c6d6]/30 shadow-sm">
        <div>
          <span class="text-xs font-bold text-[#0058be] uppercase tracking-widest">
            User Page 05 — Generative Architectural Engine
          </span>
          <h2 class="font-display text-2xl font-bold text-[#131b2e]">
            AI Layout & Interior Visualizer
          </h2>
          <p class="text-xs text-[#727785] mt-0.5">
            Structured CAD Floorplan Generator & Generative Interior Renderer
          </p>
        </div>

        {/* Mode Switcher */}
        <div class="flex bg-[#f2f3ff] p-1 rounded-2xl">
          <button
            onClick={() => setActivePart('layout')}
            class={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activePart === 'layout' ? 'bg-[#0058be] text-white shadow-md' : 'text-[#424754]'
            }`}
          >
            Part A — Floor Layout
          </button>
          <button
            onClick={() => setActivePart('interior')}
            class={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activePart === 'interior' ? 'bg-[#0058be] text-white shadow-md' : 'text-[#424754]'
            }`}
          >
            Part B — Interior Design
          </button>
        </div>
      </div>

      {/* PART A — Structured Floor Layout Generation */}
      {activePart === 'layout' && (
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div class="lg:col-span-4 bg-white p-6 rounded-3xl border border-[#c2c6d6]/30 shadow-lg space-y-4">
            <h3 class="font-bold text-base text-[#131b2e] font-display">Layout Constraints Input</h3>
            <div class="space-y-2 text-xs">
              <div class="p-3 bg-[#f2f3ff] rounded-xl flex justify-between">
                <span class="text-[#727785]">Plot Size:</span>
                <span class="font-bold text-[#131b2e]">{plotArea.toLocaleString()} sq.ft ({projectData.length}ft × {projectData.width}ft)</span>
              </div>
              <div class="p-3 bg-[#f2f3ff] rounded-xl flex justify-between">
                <span class="text-[#727785]">Facing Direction:</span>
                <span class="font-bold text-[#0058be]">{projectData.facing || 'East'} Facing</span>
              </div>
              <div class="p-3 bg-[#f2f3ff] rounded-xl flex justify-between">
                <span class="text-[#727785]">Floors:</span>
                <span class="font-bold text-[#131b2e]">G + {projectData.floors || 1}</span>
              </div>
            </div>

            <div class="p-3 bg-[#6cf8bb]/20 border border-[#006c49]/30 rounded-xl text-xs space-y-1">
              <span class="font-bold text-[#00714d] block">✓ Vastu Layout Rules Applied</span>
              <p class="text-[#424754]">Kitchen placed in Agni (SE), Master Bedroom in SW, Entrance in NE.</p>
            </div>

            <button
              onClick={handleGenerate}
              disabled={isGenerating}
              class="w-full py-3.5 bg-[#0058be] text-white rounded-xl font-bold text-xs shadow-lg hover:bg-[#004395] transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <span class="material-symbols-outlined text-base">auto_awesome</span>
              {isGenerating ? 'Computing CAD Layout...' : 'Generate New Floor Layout Options'}
            </button>
          </div>

          <div class="lg:col-span-8 bg-white p-6 rounded-3xl border border-[#c2c6d6]/30 shadow-lg flex flex-col justify-between min-h-[400px]">
            <div class="flex justify-between items-center mb-4">
              <h3 class="font-bold text-base text-[#131b2e] font-display">Generated Vastu Architectural Floor Plan</h3>
              <span class="text-xs font-bold text-[#006c49] bg-[#6cf8bb]/40 px-3 py-1 rounded-full">Option 1 of 3</span>
            </div>

            <div class="flex-1 rounded-2xl border border-[#c2c6d6]/40 overflow-hidden relative min-h-[300px] flex items-center justify-center bg-slate-900">
              {isGenerating ? (
                <div class="text-center text-white space-y-2 animate-pulse">
                  <span class="material-symbols-outlined text-4xl text-[#0058be]">architecture</span>
                  <p class="text-xs font-bold">Computing wall dimensions & load-bearing columns...</p>
                </div>
              ) : (
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCLMBXKPGGSrfxfQpT5xJWi2wAjRDuVj700oyLjMCVl0tSb54Kh5uqXetg-rpURi8KeR97YIRZx5gITNVdBtjPerd4AY-oABiAqLdzSqlEvKUbVdcHaEBzLPg0eyuXkRJuI6pJSCmDGl0sYAH1YSpFSEi5tSfNFcNgx9ZUi-r33J9gI2fRJq71P7OD7hmk__Lpk2YI2J5DI9DEWcHLUwNcFqfgXHsYKcBAOTTXb0SzQIJMWKjNKnQ3Lww"
                  alt="3D Floorplan layout render"
                  class="w-full h-full object-cover"
                />
              )}
            </div>
          </div>
        </div>
      )}

      {/* PART B — Interior Design Generation */}
      {activePart === 'interior' && (
        <div class="space-y-6">
          {/* Controls */}
          <div class="bg-white p-6 rounded-3xl border border-[#c2c6d6]/30 shadow-md space-y-4">
            <div class="flex flex-wrap gap-4 items-center justify-between">
              <div>
                <h3 class="font-bold text-base text-[#131b2e] font-display">Part B — Room Interior Visualizer</h3>
                <p class="text-xs text-[#727785]">Select Room & Design Aesthetic to render AI preview</p>
              </div>

              <div class="flex items-center gap-2">
                <select
                  value={selectedRoom}
                  onChange={(e) => setSelectedRoom(e.target.value)}
                  class="p-2.5 rounded-xl bg-[#f2f3ff] text-xs font-bold text-[#131b2e]"
                >
                  <option>Living Room</option>
                  <option>Master Bedroom</option>
                  <option>Modular Kitchen</option>
                  <option>Luxury Bathroom</option>
                  <option>Pooja Sanctuary</option>
                </select>

                <button
                  onClick={handleGenerate}
                  disabled={isGenerating}
                  class="px-5 py-2.5 bg-[#0058be] text-white rounded-xl text-xs font-bold shadow-md hover:bg-[#004395] transition-all cursor-pointer flex items-center gap-1.5"
                >
                  <span class="material-symbols-outlined text-sm">auto_awesome</span>
                  {isGenerating ? 'Rendering...' : 'Render AI Image'}
                </button>
              </div>
            </div>

            {/* Style Choices */}
            <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              {interiorStyles.map((s) => (
                <button
                  key={s.name}
                  onClick={() => setSelectedStyle(s.name)}
                  class={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                    selectedStyle === s.name
                      ? 'border-[#0058be] bg-[#0058be]/10 shadow-md scale-105'
                      : 'border-[#c2c6d6]/40 hover:bg-[#eaedff]'
                  }`}
                >
                  <span class="font-bold text-xs text-[#131b2e] block">{s.name}</span>
                  <span class="text-[10px] text-[#727785] block mt-1">{s.desc}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Render Result Card */}
          <div class="bg-white p-6 rounded-3xl border border-[#c2c6d6]/30 shadow-lg space-y-4">
            <div class="flex justify-between items-center">
              <div>
                <span class="text-xs font-bold text-[#0058be]">{selectedRoom} • {selectedStyle} Style Rendering</span>
                <h4 class="font-bold text-lg text-[#131b2e] font-display">AI Generated Visual</h4>
              </div>
              <button onClick={() => alert('High-res render saved to project document vault!')} class="px-4 py-2 bg-[#f2f3ff] text-[#131b2e] rounded-xl text-xs font-bold hover:bg-[#eaedff]">
                Save to Vault
              </button>
            </div>

            <div class="h-96 rounded-2xl overflow-hidden relative border border-[#c2c6d6]/30 group">
              <img
                src="/hero-house.png"
                alt="AI Generated Interior Render"
                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div class="absolute bottom-4 left-4 bg-black/70 text-white text-xs px-4 py-2 rounded-xl backdrop-blur-md">
                <span class="font-bold">Render Specs:</span> {selectedRoom} ({selectedStyle} Aesthetic) • 4K Resolution
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
