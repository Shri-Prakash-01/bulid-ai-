import React, { useState } from 'react';
import { getOpenRouterApiKey, setOpenRouterApiKey } from '../services/openrouterService';

export default function WizardStep3({ styleData, setStyleData, onGenerateEstimate }) {
  const [apiKeyInput, setApiKeyInput] = useState(getOpenRouterApiKey());
  const [showKeyModal, setShowKeyModal] = useState(false);
  const currentKey = getOpenRouterApiKey();

  const handleSaveApiKey = () => {
    setOpenRouterApiKey(apiKeyInput.trim());
    setShowKeyModal(false);
  };

  const styles = [
    {
      name: 'Modern',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDv6rlzBoZKP3MpXYvxpzvZPj6DqOvrjHVNh8jz5tWIsK13xeNC0X-sHFAzX66YpObYO-H51zRHVkQM4mn1CCAejxJJUsebDPycvNXBw2HoNyFrSw8tNYs77_MHgxtx2Ik5iUAW-Doaw_bNBaXOBcelB0patsJY48XaP3FXOB5E-LikRsnlyYaMtkeE5gxDs650BP128XDCYbZtg6JakiRY6i1KFkYv_aUy1d9jDnxlJWqbfWA5YXSANg',
    },
    {
      name: 'Luxury',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDeG890geW0NdeNQ1cR0_k6iDdnsh3xIQvybDs_skfGdphR36Lme8kv3PNKRwOnOJ9qzjAqkLmU64nL7uEAJm6I1Z8P8N9RrVcHINyTwDO3OX5wn2UD9nETXmeQDrY0vGfBl4rLD8w_wAQ2kmW3DIBm0cS3p7q9gluRd4k7dgTW-wp8-Nq5NoF4gieY_Xsc_JT7WKu89BbIsyWJuUriKw_s_vyw9KxqFvtXrvBpG0fezi5u_QboAkfStg',
    },
    {
      name: 'Minimal',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAdiOnhrREjP9kwvYCEevc5rwMx9GDTe9kNtPgfrU4b7pdam8KYQB5llyznO6iH02ikdjek9kkUYczSswJi3ku7jizlAdaPTZb12jJHgXOw81towpggISs_tU6OnTmUXDkv6W48VDkw_GUONHN2rx7y0y_FMM4_zXunibJbUWMgK9-7pElmDFXipNAjYfIfM-9pCx1WFCJNEi-RH0Eb-ad3VrmJQbyaDZ3s-Cf3_bX-OnRNzRTfaCaTRQ',
    },
    {
      name: 'Scandinavian',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCvbpn1GUOuxQnTLfH0rfRpjako14yl-_KDispWUezP4h3cSybhlZm_LBgvmNRLvLeB23LKWRaiD14PO8wYJzrlLPcMiVTfHGlPK7SGBWrOH3qKrLEZRDh-4coEF_JvvCeIjutoJDx95yqZFRQNNPiIAFJrklqF7UZ8Y7_bDLnJNoUqf1khaVzZm8bkI4AzldLwtaVAEVMydEGZUIR9Y7Ce6Bb18P317jjfYYkAR8U-aglptKmYQlzV4g',
    },
    {
      name: 'Classic',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDHygK6rz7suz6Hi1rhwd-kc85MyaPmK3k2YrOUp9x5HXJAqmamD5mVzq0rPcBUNrM8mXI1iFUt8pOjUd4CDrm12rhBpgJgIf159Luq1ECz0fdGucZBeUsPqSeOPqT6Dfat4wgGqd4TSNpK1qTIWKPAsKC7y2jpBsmkCqiXvuCKpBCQtWgKZ2yZ9rxNUjbsUjDfZGEXaDjE4YwB0l8ogSyfMQaAFvKjj203E3aIDOPhgiNDFYuc9yDY9g',
    }
  ];

  const exteriorFeatures = [
    { name: 'Garden', icon: 'park' },
    { name: 'Solar', icon: 'solar_power' },
    { name: 'Rainwater', icon: 'water_drop' },
    { name: 'Lawn', icon: 'grass' },
    { name: 'EV Charging', icon: 'ev_station' },
    { name: 'Outdoor Kitchen', icon: 'outdoor_grill' },
    { name: 'Gazebo', icon: 'deck' },
    { name: 'Pool', icon: 'pool' }
  ];

  const handleStyleSelect = (name) => {
    setStyleData(prev => ({ ...prev, interiorStyle: name }));
  };

  const handleBudgetChange = (val) => {
    setStyleData(prev => ({ ...prev, budget: Number(val) }));
  };

  const toggleFeature = (name) => {
    setStyleData(prev => {
      const exists = prev.features.includes(name);
      return {
        ...prev,
        features: exists ? prev.features.filter(f => f !== name) : [...prev.features, name]
      };
    });
  };

  const formattedBudget = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0
  }).format(styleData.budget || 450000);

  return (
    <div class="space-y-6">
      <div class="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#0058be]/5 p-5 rounded-2xl border border-[#0058be]/20">
        <div>
          <span class="text-[#0058be] font-bold text-xs uppercase tracking-widest block mb-1">
            USER PAGE 03 — COST ESTIMATION ML ENGINE V4.8
          </span>
          <h2 class="text-2xl md:text-3xl font-bold text-[#131b2e] font-display">Style, Features & AI Predictions</h2>
          <p class="text-[#424754] text-sm mt-1">Define project aesthetics and compute predicted outcomes using OpenRouter API key.</p>
        </div>

        <div class="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setShowKeyModal(true)}
            class={`px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-sm ${
              currentKey
                ? 'bg-[#006c49]/15 text-[#006c49] border border-[#006c49]/30 hover:bg-[#006c49]/25'
                : 'bg-amber-500/15 text-amber-700 border border-amber-500/30 hover:bg-amber-500/25'
            }`}
          >
            <span class="material-symbols-outlined text-sm">key</span>
            {currentKey ? 'OpenRouter API Key Set' : 'Configure OpenRouter Key'}
          </button>
        </div>
      </div>

      {showKeyModal && (
        <div class="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div class="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl border border-[#c2c6d6]/40 space-y-4">
            <div class="flex justify-between items-center">
              <h3 class="font-bold text-lg text-[#131b2e] flex items-center gap-2">
                <span class="material-symbols-outlined text-[#0058be]">key</span>
                OpenRouter API Key
              </h3>
              <button
                type="button"
                onClick={() => setShowKeyModal(false)}
                class="text-[#727785] hover:text-[#131b2e]"
              >
                <span class="material-symbols-outlined">close</span>
              </button>
            </div>
            <p class="text-xs text-[#424754] leading-relaxed">
              Enter your OpenRouter API Key (`VITE_OPENROUTER_API_KEY`) to run live LLM predictions for cost, BOM, and structural risk in USER PAGE 03.
            </p>
            <input
              type="password"
              value={apiKeyInput}
              onChange={(e) => setApiKeyInput(e.target.value)}
              placeholder="sk-or-v1-..."
              class="w-full p-3 rounded-xl bg-[#f2f3ff] border border-[#c2c6d6]/40 text-sm focus:ring-2 focus:ring-[#0058be] outline-none font-mono"
            />
            <div class="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowKeyModal(false)}
                class="px-4 py-2 rounded-xl text-xs font-bold text-[#424754] hover:bg-[#eaedff]"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSaveApiKey}
                class="px-5 py-2 rounded-xl text-xs font-bold bg-[#0058be] text-white hover:bg-[#004395]"
              >
                Save Key
              </button>
            </div>
          </div>
        </div>
      )}


      <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Style & Budget */}
        <div class="lg:col-span-8 space-y-6">
          {/* Interior Style Selector */}
          <div class="space-y-3">
            <h3 class="text-lg font-bold text-[#131b2e]">Interior Style Selector</h3>
            <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
              {styles.map((s) => {
                const isSelected = styleData.interiorStyle === s.name;
                return (
                  <button
                    key={s.name}
                    type="button"
                    onClick={() => handleStyleSelect(s.name)}
                    class={`group relative flex flex-col items-center p-2 rounded-xl border-2 transition-all duration-300 bg-white cursor-pointer ${
                      isSelected ? 'border-[#0058be] bg-[#0058be]/5 shadow-md scale-105' : 'border-[#c2c6d6]/40 hover:border-[#0058be]'
                    }`}
                  >
                    <div class="w-full h-24 mb-2 rounded-lg overflow-hidden relative">
                      <div
                        class="w-full h-full bg-cover bg-center group-hover:scale-110 transition-transform duration-500"
                        style={{ backgroundImage: `url(${s.image})` }}
                      ></div>
                    </div>
                    <span class={`text-sm ${isSelected ? 'font-bold text-[#0058be]' : 'font-medium text-[#131b2e]'}`}>
                      {s.name}
                    </span>
                    {isSelected && (
                      <div class="absolute top-2 right-2 bg-[#0058be] text-white rounded-full p-1 shadow-md">
                        <span class="material-symbols-outlined text-xs text-white">check</span>
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Budget Slider */}
          <div class="bg-[#f2f3ff] p-6 rounded-2xl border border-[#c2c6d6]/40 shadow-sm">
            <div class="flex justify-between items-end mb-3">
              <div>
                <h3 class="text-lg font-bold text-[#131b2e]">Budget Allocation</h3>
                <p class="text-sm text-[#424754]">Adjust target budget & material quality</p>
              </div>
              <div class="text-right">
                <span class="font-display text-2xl font-bold text-[#0058be]">{formattedBudget}</span>
              </div>
            </div>

            <input
              type="range"
              min="100000"
              max="2500000"
              step="50000"
              value={styleData.budget}
              onChange={(e) => handleBudgetChange(e.target.value)}
              class="w-full h-2 bg-[#c2c6d6] rounded-lg appearance-none cursor-pointer accent-[#0058be]"
            />

            <div class="flex justify-between mt-2 text-xs font-semibold text-[#424754]">
              <span>Basic ($100k)</span>
              <span>Standard ($500k)</span>
              <span>Premium ($1M)</span>
              <span>Luxury ($2.5M)</span>
            </div>
          </div>
        </div>

        {/* Right Column: Exterior Features */}
        <div class="lg:col-span-4 space-y-3">
          <h3 class="text-lg font-bold text-[#131b2e]">Exterior Features</h3>
          <div class="grid grid-cols-2 gap-3">
            {exteriorFeatures.map((feat) => {
              const isSelected = styleData.features.includes(feat.name);
              return (
                <button
                  key={feat.name}
                  type="button"
                  onClick={() => toggleFeature(feat.name)}
                  class={`flex items-center gap-2 p-3 rounded-xl border-2 transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#0058be] border-[#0058be] text-white shadow-md'
                      : 'bg-white border-[#c2c6d6]/40 hover:bg-[#e2e7ff] text-[#131b2e]'
                  }`}
                >
                  <span class={`material-symbols-outlined ${isSelected ? 'text-white' : 'text-[#0058be]'}`}>
                    {feat.icon}
                  </span>
                  <span class="text-xs font-bold">{feat.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div class="mt-8 flex justify-between items-center pt-4 border-t border-[#c2c6d6]/30">
        <span class="text-xs text-[#424754] font-medium">Ready to compute precision estimation engine.</span>
        <button
          onClick={onGenerateEstimate}
          class="px-8 py-4 bg-[#0058be] text-white rounded-xl font-bold shadow-xl hover:scale-105 active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
        >
          Generate AI Estimate
          <span class="material-symbols-outlined">auto_awesome</span>
        </button>
      </div>
    </div>
  );
}
