import React from 'react';

export default function Footer({ setCurrentView }) {
  return (
    <footer class="bg-white border-t border-[#c2c6d6]/40 mt-16">
      <div class="max-w-7xl mx-auto px-6 md:px-12 py-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-10">
        <div class="flex flex-col gap-4">
          <div class="flex items-center gap-2 cursor-pointer" onClick={() => setCurrentView('landing')}>
            <span class="material-symbols-outlined text-[#0058be] text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>
              construction
            </span>
            <span class="font-bold text-2xl text-[#0058be]">BuildAI</span>
          </div>
          <p class="text-sm text-[#424754] max-w-xs">
            © 2026 BuildAI Systems Inc. Precision in every pixel. Transform your vision into reality with AI architecture.
          </p>
        </div>

        <div class="flex flex-wrap gap-x-12 gap-y-6">
          <div class="flex flex-col gap-3">
            <h4 class="font-semibold text-sm text-[#131b2e]">Product</h4>
            <button onClick={() => setCurrentView('wizard')} class="text-left text-sm text-[#424754] hover:text-[#0058be] transition-colors">
              Planning Wizard
            </button>
            <button onClick={() => setCurrentView('dashboard')} class="text-left text-sm text-[#424754] hover:text-[#0058be] transition-colors">
              AI Dashboard Report
            </button>
          </div>
          <div class="flex flex-col gap-3">
            <h4 class="font-semibold text-sm text-[#131b2e]">Company</h4>
            <a href="#" class="text-sm text-[#424754] hover:text-[#0058be] transition-colors">
              Privacy Policy
            </a>
            <a href="#" class="text-sm text-[#424754] hover:text-[#0058be] transition-colors">
              Terms of Service
            </a>
          </div>
          <div class="flex flex-col gap-3">
            <h4 class="font-semibold text-sm text-[#131b2e]">Support</h4>
            <a href="#" class="text-sm text-[#424754] hover:text-[#0058be] transition-colors">
              Contact Support
            </a>
            <a href="#" class="text-sm text-[#424754] hover:text-[#0058be] transition-colors">
              Help Center
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
