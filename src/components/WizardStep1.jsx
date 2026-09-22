import React from 'react';

export default function WizardStep1({ propertyData, setPropertyData }) {
  const handleChange = (field, value) => {
    setPropertyData(prev => ({ ...prev, [field]: value }));
  };

  const calculatedArea = (Number(propertyData.length) || 0) * (Number(propertyData.width) || 0);

  return (
    <div class="space-y-6">
      <div class="mb-6">
        <h2 class="text-2xl md:text-3xl font-bold text-[#131b2e] mb-2 font-display">Where are we building?</h2>
        <p class="text-[#424754] text-base">Tell us about your plot location and dimensions to start the AI estimation.</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Location & Dimension Form */}
        <div class="space-y-4">
          <div class="grid grid-cols-2 gap-4">
            <div class="flex flex-col gap-1">
              <label class="text-xs font-semibold text-[#424754] uppercase tracking-wider">Country</label>
              <select
                value={propertyData.country}
                onChange={(e) => handleChange('country', e.target.value)}
                class="p-3 rounded-xl bg-[#f2f3ff] border-transparent focus:border-[#0058be] focus:bg-white text-sm font-medium transition-all"
              >
                <option>United States</option>
                <option>India</option>
                <option>United Kingdom</option>
                <option>Australia</option>
                <option>Canada</option>
              </select>
            </div>
            <div class="flex flex-col gap-1">
              <label class="text-xs font-semibold text-[#424754] uppercase tracking-wider">State / Province</label>
              <input
                type="text"
                value={propertyData.state}
                onChange={(e) => handleChange('state', e.target.value)}
                class="p-3 rounded-xl bg-[#f2f3ff] border-transparent focus:border-[#0058be] focus:bg-white text-sm font-medium transition-all"
                placeholder="e.g. California"
              />
            </div>
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div class="flex flex-col gap-1">
              <label class="text-xs font-semibold text-[#424754] uppercase tracking-wider">City</label>
              <input
                type="text"
                value={propertyData.city}
                onChange={(e) => handleChange('city', e.target.value)}
                class="p-3 rounded-xl bg-[#f2f3ff] border-transparent focus:border-[#0058be] focus:bg-white text-sm font-medium transition-all"
                placeholder="e.g. Palo Alto"
              />
            </div>
            <div class="flex flex-col gap-1">
              <label class="text-xs font-semibold text-[#424754] uppercase tracking-wider">PIN / ZIP Code</label>
              <input
                type="text"
                value={propertyData.zip}
                onChange={(e) => handleChange('zip', e.target.value)}
                class="p-3 rounded-xl bg-[#f2f3ff] border-transparent focus:border-[#0058be] focus:bg-white text-sm font-medium transition-all"
                placeholder="94301"
              />
            </div>
          </div>

          {/* Plot Dimensions Card */}
          <div class="p-4 bg-[#2170e4]/10 rounded-xl border border-[#0058be]/20 mt-4">
            <h3 class="text-sm font-bold text-[#0058be] mb-3 flex items-center gap-1.5">
              <span class="material-symbols-outlined text-sm">square_foot</span>
              Plot Dimensions
            </h3>
            <div class="grid grid-cols-2 gap-4">
              <div class="flex flex-col gap-1">
                <label class="text-[11px] font-semibold text-[#424754] uppercase tracking-wider">Length (ft)</label>
                <input
                  type="number"
                  min="1"
                  value={propertyData.length}
                  onChange={(e) => handleChange('length', e.target.value)}
                  class="p-3 rounded-lg bg-white border border-[#c2c6d6]/40 text-xl font-bold text-[#0058be]"
                />
              </div>
              <div class="flex flex-col gap-1">
                <label class="text-[11px] font-semibold text-[#424754] uppercase tracking-wider">Width (ft)</label>
                <input
                  type="number"
                  min="1"
                  value={propertyData.width}
                  onChange={(e) => handleChange('width', e.target.value)}
                  class="p-3 rounded-lg bg-white border border-[#c2c6d6]/40 text-xl font-bold text-[#0058be]"
                />
              </div>
            </div>
            <div class="mt-4 pt-3 border-t border-[#0058be]/15 flex justify-between items-center">
              <span class="text-sm text-[#424754] font-medium">Calculated Plot Area</span>
              <span class="text-2xl font-bold font-display text-[#0058be]">
                {calculatedArea.toLocaleString()} <small class="text-xs font-normal text-[#424754]">sq.ft</small>
              </span>
            </div>
          </div>
        </div>

        {/* Map Visual Card */}
        <div class="relative rounded-2xl overflow-hidden glass-card group min-h-[280px]">
          <div class="absolute inset-0 z-0">
            <img
              class="w-full h-full object-cover grayscale-[0.3] contrast-[1.1] group-hover:scale-105 transition-transform duration-700"
              alt="Suburban Parcel Map Interface"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCasfuj8nnWpTNmPXB8Jrw_3OwD2zZWJUT45q_1AZn6XCzzGK4agmbHyj_qAoX9gRPx4dctFHfQrTcOdKmM1QHEHzUZao4sjp9lpE3arSjvasw9RdgRIVEUouJX0ppf9sfj61Se-2VzxYQXsvP93WKGCRPpzsCyaU3sZ0lpBM-18EfDBZwkt9DMjzadNHhNRYTua8V-wqTG_Ah_C5U7NIsMuXQBq3n4kiiD9x04ShwGEgIGjyH6m_VnOg"
            />
          </div>
          <div class="absolute inset-0 bg-gradient-to-t from-white/90 via-transparent to-transparent flex flex-col justify-end p-4 z-10">
            <div class="flex items-center gap-3 bg-white/95 backdrop-blur-md p-3 rounded-xl shadow-lg border border-white/80">
              <span class="material-symbols-outlined text-[#0058be]">location_on</span>
              <div>
                <p class="text-[10px] font-bold text-[#424754] uppercase tracking-wider">Selected Plot Site</p>
                <p class="text-xs font-bold text-[#131b2e]">
                  {propertyData.city || 'Palo Alto'}, {propertyData.state || 'CA'} • {calculatedArea.toLocaleString()} sq.ft
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Details Grid */}
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-[#c2c6d6]/30">
        {/* Construction Type */}
        <div class="flex flex-col gap-2">
          <label class="text-sm font-bold text-[#424754]">Construction Type</label>
          <div class="grid grid-cols-1 gap-2">
            {[
              { type: 'Standard', desc: 'Functional & Efficient' },
              { type: 'Premium', desc: 'High-end materials & finish' },
              { type: 'Luxury', desc: 'Ultra-bespoke smart home finish' }
            ].map((item) => (
              <label
                key={item.type}
                onClick={() => handleChange('constructionType', item.type)}
                class={`flex items-center p-3 rounded-xl border cursor-pointer transition-all ${
                  propertyData.constructionType === item.type
                    ? 'border-[#0058be] bg-[#2170e4]/10 shadow-sm'
                    : 'border-[#c2c6d6]/40 hover:border-[#0058be] bg-white'
                }`}
              >
                <input
                  type="radio"
                  name="const-type"
                  checked={propertyData.constructionType === item.type}
                  onChange={() => {}}
                  class="text-[#0058be] focus:ring-[#0058be] mr-3"
                />
                <div>
                  <span class={`block text-sm ${propertyData.constructionType === item.type ? 'font-bold text-[#0058be]' : 'font-medium text-[#131b2e]'}`}>
                    {item.type}
                  </span>
                  <span class="text-xs text-[#424754]">{item.desc}</span>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* House Type & Floors */}
        <div class="flex flex-col gap-3">
          <div class="flex flex-col gap-1">
            <label class="text-sm font-bold text-[#424754]">House Type</label>
            <select
              value={propertyData.houseType}
              onChange={(e) => handleChange('houseType', e.target.value)}
              class="p-3 rounded-xl bg-[#f2f3ff] border-transparent text-sm font-medium"
            >
              <option>Villa / Individual House</option>
              <option>Duplex House</option>
              <option>Penthouse</option>
              <option>Row House</option>
            </select>
          </div>

          <div class="flex flex-col gap-1 mt-1">
            <label class="text-sm font-bold text-[#424754]">Floors (G+)</label>
            <div class="flex items-center gap-3 bg-[#f2f3ff] p-1.5 rounded-xl border border-[#c2c6d6]/30">
              <button
                type="button"
                onClick={() => handleChange('floors', Math.max(1, propertyData.floors - 1))}
                class="w-10 h-10 rounded-lg bg-white flex items-center justify-center text-[#0058be] active:scale-90 transition-transform shadow-sm font-bold cursor-pointer"
              >
                <span class="material-symbols-outlined">remove</span>
              </button>
              <span class="flex-1 text-center font-bold text-xl font-display text-[#131b2e]">
                G + {propertyData.floors}
              </span>
              <button
                type="button"
                onClick={() => handleChange('floors', Math.min(5, propertyData.floors + 1))}
                class="w-10 h-10 rounded-lg bg-white flex items-center justify-center text-[#0058be] active:scale-90 transition-transform shadow-sm font-bold cursor-pointer"
              >
                <span class="material-symbols-outlined">add</span>
              </button>
            </div>
          </div>
        </div>

        {/* Facing Direction */}
        <div class="flex flex-col gap-2">
          <label class="text-sm font-bold text-[#424754]">Facing Direction</label>
          <div class="grid grid-cols-3 gap-2 text-center">
            {['N', 'E', 'W', 'S', 'NE', 'SW'].map((dir) => (
              <button
                key={dir}
                type="button"
                onClick={() => handleChange('facing', dir)}
                class={`p-3 rounded-xl border text-sm font-bold transition-all cursor-pointer ${
                  propertyData.facing === dir
                    ? 'border-[#0058be] bg-[#0058be] text-white shadow-md scale-105'
                    : 'border-[#c2c6d6]/40 hover:bg-[#0058be]/10 text-[#131b2e] bg-white'
                }`}
              >
                {dir}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
