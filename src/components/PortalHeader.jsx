import React from 'react';

export default function PortalHeader({ currentUser, onSwitchRole, activePage }) {
  const formatPageTitle = (page) => {
    switch(page) {
      case 'userDashboard': return 'Homeowner Dashboard';
      case 'createProject': return 'Create Project Setup';
      case 'costEstimation': return 'Cost Estimation ML Model';
      case 'imageGen': return 'AI Layout & Interior Design Generator';
      case 'findContractor': return 'Find & Match Contractor';
      case 'quotations': return 'RFQ & Quotations Comparison';
      case 'loanFeasibility': return 'Loan Feasibility ML Model';
      case 'constructionTracking': return 'Construction Milestone Tracking';
      case 'userPayments': return 'Milestone Payment Release';
      case 'contractorDashboard': return 'Contractor Workspace';
      case 'adminDashboard': return 'Platform Admin Control Center';
      case 'aiControlCenter': return 'AI / ML Control Center & Models';
      default: return page.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
    }
  };

  return (
    <header class="bg-white/80 backdrop-blur-md border-b border-[#c2c6d6]/30 h-16 px-6 flex items-center justify-between sticky top-0 z-40">
      {/* Left Title & Breadcrumb */}
      <div class="flex items-center gap-3">
        <h2 class="font-display font-bold text-lg text-[#131b2e]">
          {formatPageTitle(activePage)}
        </h2>
        <span class="text-xs text-[#727785] bg-[#eaedff] px-2.5 py-0.5 rounded-full font-semibold border border-[#c2c6d6]/30 hidden md:inline">
          Active Project: #B-2026-X01 (Palo Alto Villa)
        </span>
      </div>

      {/* Right User Controls */}
      <div class="flex items-center gap-3">
        {/* Switch Role Button */}
        <button
          onClick={onSwitchRole}
          class="flex items-center gap-1.5 text-xs font-bold text-[#0058be] bg-[#eaedff] hover:bg-[#d8e2ff] px-3 py-1.5 rounded-full transition-all cursor-pointer border border-[#c2c6d6]/40"
          title="Switch role mode"
        >
          <span class="material-symbols-outlined text-sm">published_with_changes</span>
          <span class="hidden sm:inline">Role:</span>
          <span class="uppercase tracking-wider">{currentUser.role}</span>
        </button>

        {/* Notifications Icon */}
        <button
          onClick={() => alert('Notifications: 2 new inspection reports ready!')}
          class="w-9 h-9 rounded-full bg-[#f2f3ff] flex items-center justify-center text-[#424754] hover:bg-[#eaedff] relative transition-colors cursor-pointer"
        >
          <span class="material-symbols-outlined text-lg">notifications</span>
          <span class="w-2 h-2 rounded-full bg-[#ba1a1a] absolute top-1 right-1"></span>
        </button>

        {/* User Info & Avatar */}
        <div class="flex items-center gap-2 border-l border-[#c2c6d6]/30 pl-3">
          <div class="w-8 h-8 rounded-full bg-[#0058be] text-white flex items-center justify-center font-bold text-xs shadow-sm overflow-hidden">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAfVHItSzReogs7K3MWL8kpjcfIH_6ZBOalTowf1ZXxeLDUg4DcFAK1uEd89XK9OryeXanU6QHSITBiL8iu7dUdK3c029z3uGL1WshDcuhZTnb9v8zPWCjbGSz8t8u5A12flvOJmwWiAz1PaGhZMd5AgU-z32zAVcN_lH5pbo764qtGHxpGGzQu9WHrEL5NgQhSooK6ux7GH_QC61tAbrbjQiUZidDYwrb8uiFY_G8H3lvB3gBL_yil6A"
              alt="User profile"
              class="w-full h-full object-cover"
            />
          </div>
          <div class="hidden lg:block text-left">
            <p class="text-xs font-bold text-[#131b2e] leading-tight">{currentUser.name}</p>
            <p class="text-[10px] text-[#727785]">{currentUser.badge}</p>
          </div>
        </div>
      </div>
    </header>
  );
}
