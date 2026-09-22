import React from 'react';

export default function MobileBottomNav({ currentView, setCurrentView, startWizard }) {
  return (
    <nav class="md:hidden fixed bottom-0 w-full z-50 bg-[#faf8ff]/85 backdrop-blur-lg border-t border-[#c2c6d6]/20 shadow-[0_-4px_20px_rgba(0,0,0,0.05)] flex justify-around items-center h-16 px-4">
      <button
        onClick={() => setCurrentView('landing')}
        class={`flex flex-col items-center py-1 px-3 rounded-full transition-all ${
          currentView === 'landing'
            ? 'bg-[#6cf8bb] text-[#00714d] font-bold scale-105'
            : 'text-[#424754] opacity-75'
        }`}
      >
        <span class="material-symbols-outlined text-xl">home</span>
        <span class="text-[11px]">Home</span>
      </button>

      <button
        onClick={startWizard}
        class={`flex flex-col items-center py-1 px-3 rounded-full transition-all ${
          currentView === 'wizard'
            ? 'bg-[#6cf8bb] text-[#00714d] font-bold scale-105'
            : 'text-[#424754] opacity-75'
        }`}
      >
        <span class="material-symbols-outlined text-xl">foundation</span>
        <span class="text-[11px]">Wizard</span>
      </button>

      <button
        onClick={() => setCurrentView('dashboard')}
        class={`flex flex-col items-center py-1 px-3 rounded-full transition-all ${
          currentView === 'dashboard'
            ? 'bg-[#6cf8bb] text-[#00714d] font-bold scale-105'
            : 'text-[#424754] opacity-75'
        }`}
      >
        <span class="material-symbols-outlined text-xl">auto_awesome</span>
        <span class="text-[11px]">Dashboard</span>
      </button>
    </nav>
  );
}
