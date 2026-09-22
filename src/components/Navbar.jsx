import React, { useState } from 'react';

export default function Navbar({
  currentView,
  setCurrentView,
  startWizard,
  currentUser,
  isLoggedIn,
  onOpenLoginModal,
  onLogout
}) {
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const getRoleBadgeStyle = (role) => {
    switch (role) {
      case 'constructor':
        return 'bg-[#006c49] text-white';
      case 'admin':
        return 'bg-[#4648d4] text-white';
      default:
        return 'bg-[#0058be] text-white';
    }
  };

  const getRoleLabel = (role) => {
    switch (role) {
      case 'constructor':
        return '2. Constructor';
      case 'admin':
        return '3. Admin';
      default:
        return '1. User';
    }
  };

  return (
    <header class="fixed top-0 w-full z-50 bg-[#faf8ff]/80 backdrop-blur-xl border-b border-[#c2c6d6]/30 shadow-sm flex items-center justify-between px-6 md:px-12 h-20">
      {/* Brand Logo */}
      <div 
        class="flex items-center gap-2 cursor-pointer"
        onClick={() => setCurrentView('landing')}
      >
        <span class="material-symbols-outlined text-[#0058be] text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>
          construction
        </span>
        <span class="font-bold text-2xl tracking-tight text-[#0058be]">
          BuildAI
        </span>
      </div>

      {/* Navigation Links */}
      <nav class="hidden md:flex items-center space-x-6">
        <button
          onClick={() => setCurrentView('landing')}
          class={`font-medium text-sm py-1 transition-colors cursor-pointer ${
            currentView === 'landing'
              ? 'text-[#0058be] border-b-2 border-[#0058be] font-semibold'
              : 'text-[#424754] hover:text-[#0058be]'
          }`}
        >
          Home
        </button>

        {isLoggedIn && currentUser.role === 'user' && (
          <>
            <button
              onClick={startWizard}
              class={`font-medium text-sm py-1 transition-colors cursor-pointer ${
                currentView === 'wizard'
                  ? 'text-[#0058be] border-b-2 border-[#0058be] font-semibold'
                  : 'text-[#424754] hover:text-[#0058be]'
              }`}
            >
              Planning Wizard
            </button>
            <button
              onClick={() => setCurrentView('dashboard')}
              class={`font-medium text-sm py-1 transition-colors cursor-pointer ${
                currentView === 'dashboard'
                  ? 'text-[#0058be] border-b-2 border-[#0058be] font-semibold'
                  : 'text-[#424754] hover:text-[#0058be]'
              }`}
            >
              Executive Report
            </button>
          </>
        )}

        {isLoggedIn && currentUser.role === 'constructor' && (
          <button
            onClick={() => setCurrentView('constructorPortal')}
            class={`font-medium text-sm py-1 transition-colors cursor-pointer ${
              currentView === 'constructorPortal'
                ? 'text-[#006c49] border-b-2 border-[#006c49] font-bold'
                : 'text-[#424754] hover:text-[#006c49]'
            }`}
          >
            Constructor Portal
          </button>
        )}

        {isLoggedIn && currentUser.role === 'admin' && (
          <button
            onClick={() => setCurrentView('adminPortal')}
            class={`font-medium text-sm py-1 transition-colors cursor-pointer ${
              currentView === 'adminPortal'
                ? 'text-[#4648d4] border-b-2 border-[#4648d4] font-bold'
                : 'text-[#424754] hover:text-[#4648d4]'
            }`}
          >
            Admin Portal
          </button>
        )}
      </nav>

      {/* Right Controls */}
      <div class="flex items-center gap-3 relative">
        {!isLoggedIn ? (
          <button
            onClick={onOpenLoginModal}
            class="px-6 py-2.5 rounded-full bg-[#0058be] text-white font-bold text-sm hover:bg-[#004395] transition-all shadow-md active:scale-95 cursor-pointer flex items-center gap-2"
          >
            <span>Log In (User / Constructor / Admin)</span>
            <span class="material-symbols-outlined text-base">login</span>
          </button>
        ) : (
          <div class="flex items-center gap-3">
            {/* Role Switcher Pill */}
            <button
              onClick={onOpenLoginModal}
              class="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#eaedff] hover:bg-[#d8e2ff] transition-all cursor-pointer border border-[#c2c6d6]/40"
              title="Click to Switch Role (User, Constructor, Admin)"
            >
              <span class={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${getRoleBadgeStyle(currentUser.role)}`}>
                {getRoleLabel(currentUser.role)}
              </span>
              <span class="text-xs font-semibold text-[#131b2e] hidden sm:inline">Switch Role</span>
              <span class="material-symbols-outlined text-sm text-[#424754]">unfold_more</span>
            </button>

            {/* Profile Avatar & Dropdown */}
            <div class="relative">
              <div
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                class="w-10 h-10 rounded-full bg-[#d8e2ff] flex items-center justify-center text-[#001a42] font-bold overflow-hidden shadow-sm border-2 border-white cursor-pointer"
                title={currentUser.name}
              >
                <img
                  class="w-full h-full object-cover"
                  alt="Profile Avatar"
                  src={
                    currentUser.role === 'constructor'
                      ? 'https://lh3.googleusercontent.com/aida-public/AB6AXuBE462VENIuAH6UpnbRwfxP4tl0Fpas1j1lQvX1nWR_KzfHw8YPZ4Xnd7hS68XmZ6srxIWNAgmRWVk3BLW2-wqRzbE8X4JAP0y88R5G1kneUqvAk6YYBZ0U0sQx7cw2pcRtkJtwZuKhhoe-1yaCPMpAezTmJqyAy9yo-Uguwlo5DKZA4dLSo2B9ZFe5d8HK1URQjIc3rS8xOcrSPm6P03lk7d40CAAmOAaCI40wMdaXrbiVwCyhQVAkeA'
                      : 'https://lh3.googleusercontent.com/aida-public/AB6AXuAfVHItSzReogs7K3MWL8kpjcfIH_6ZBOalTowf1ZXxeLDUg4DcFAK1uEd89XK9OryeXanU6QHSITBiL8iu7dUdK3c029z3uGL1WshDcuhZTnb9v8zPWCjbGSz8t8u5A12flvOJmwWiAz1PaGhZMd5AgU-z32zAVcN_lH5pbo764qtGHxpGGzQu9WHrEL5NgQhSooK6ux7GH_QC61tAbrbjQiUZidDYwrb8uiFY_G8H3lvB3gBL_yil6A'
                  }
                />
              </div>

              {showProfileMenu && (
                <div class="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-2xl border border-[#c2c6d6]/40 p-3 z-50 space-y-2 animate-fade-in">
                  <div class="p-2 border-b border-[#c2c6d6]/20">
                    <p class="font-bold text-xs text-[#131b2e] truncate">{currentUser.name}</p>
                    <p class="text-[11px] text-[#727785] truncate">{currentUser.email}</p>
                    <span class={`inline-block mt-1 text-[9px] font-bold px-2 py-0.5 rounded ${getRoleBadgeStyle(currentUser.role)}`}>
                      {currentUser.badge}
                    </span>
                  </div>

                  <button
                    onClick={() => {
                      setShowProfileMenu(false);
                      onOpenLoginModal();
                    }}
                    class="w-full text-left p-2 rounded-xl text-xs font-semibold text-[#131b2e] hover:bg-[#eaedff] transition-colors flex items-center gap-2 cursor-pointer"
                  >
                    <span class="material-symbols-outlined text-sm">published_with_changes</span>
                    Switch Role (User/Builder/Admin)
                  </button>

                  <button
                    onClick={() => {
                      setShowProfileMenu(false);
                      onLogout();
                    }}
                    class="w-full text-left p-2 rounded-xl text-xs font-semibold text-[#ba1a1a] hover:bg-[#ffdad6]/40 transition-colors flex items-center gap-2 cursor-pointer"
                  >
                    <span class="material-symbols-outlined text-sm">logout</span>
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
