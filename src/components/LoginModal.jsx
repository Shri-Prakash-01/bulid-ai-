import React, { useState } from 'react';

export default function LoginModal({ isOpen, onClose, onLogin, currentRole }) {
  const [selectedRole, setSelectedRole] = useState(currentRole || 'user');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  if (!isOpen) return null;

  const roleProfiles = {
    user: {
      title: 'Homeowner / User',
      subtitle: 'Build dream home, generate AI cost estimates & view personal reports',
      redirectTarget: 'Redirects to ➔ Planning Wizard Step 1',
      icon: 'person',
      badgeColor: 'bg-[#0058be] text-white',
      demoEmail: 'alex.homeowner@buildai.com',
      demoName: 'Alex Morgan'
    },
    constructor: {
      title: 'Constructor / Builder',
      subtitle: 'Manage client site projects, update milestones & submit material bids',
      redirectTarget: 'Redirects to ➔ Constructor Management Portal',
      icon: 'engineering',
      badgeColor: 'bg-[#006c49] text-white',
      demoEmail: 'sarah.contractor@apexbuild.com',
      demoName: 'Sarah Jenkins (Apex Constructions)'
    },
    admin: {
      title: 'Platform Admin',
      subtitle: 'System oversight, user verification & AI price index configurator',
      redirectTarget: 'Redirects to ➔ Platform Admin HQ Dashboard',
      icon: 'admin_panel_settings',
      badgeColor: 'bg-[#4648d4] text-white',
      demoEmail: 'admin@buildai.system',
      demoName: 'BuildAI Admin HQ'
    }
  };

  const handleSelectRoleQuick = (roleKey) => {
    setSelectedRole(roleKey);
    const profile = roleProfiles[roleKey];
    setEmail(profile.demoEmail);
    setPassword('••••••••');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const profile = roleProfiles[selectedRole];
    onLogin({
      role: selectedRole,
      email: email || profile.demoEmail,
      name: profile.demoName,
      badge: profile.title
    });
    onClose();
  };

  return (
    <div class="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-md p-4 animate-fade-in">
      <div class="bg-white rounded-3xl max-w-lg w-full p-6 md:p-8 shadow-2xl border border-[#c2c6d6]/40 relative overflow-hidden">
        {/* Top Header */}
        <div class="flex items-center justify-between mb-6 pb-4 border-b border-[#c2c6d6]/30">
          <div class="flex items-center gap-3">
            <span class="material-symbols-outlined text-[#0058be] text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>
              construction
            </span>
            <div>
              <h2 class="font-display text-xl font-bold text-[#131b2e]">BuildAI Portal Login</h2>
              <p class="text-xs text-[#424754]">Choose your account role to auto-redirect to your workspace</p>
            </div>
          </div>
          <button
            onClick={onClose}
            class="p-2 hover:bg-[#f2f3ff] rounded-full transition-colors text-[#727785] cursor-pointer"
          >
            <span class="material-symbols-outlined text-lg">close</span>
          </button>
        </div>

        {/* 3 Role Selection Tabs */}
        <div class="space-y-3 mb-6">
          <label class="text-xs font-bold text-[#727785] uppercase tracking-wider block mb-1">
            1. Select Login Role
          </label>
          <div class="grid grid-cols-3 gap-2">
            {[
              { id: 'user', label: '1. User', icon: 'person' },
              { id: 'constructor', label: '2. Constructor', icon: 'engineering' },
              { id: 'admin', label: '3. Admin', icon: 'admin_panel_settings' }
            ].map((r) => (
              <button
                key={r.id}
                type="button"
                onClick={() => handleSelectRoleQuick(r.id)}
                class={`p-3 rounded-2xl border text-center transition-all flex flex-col items-center gap-1 cursor-pointer ${
                  selectedRole === r.id
                    ? 'border-[#0058be] bg-[#0058be]/10 text-[#0058be] font-bold shadow-md scale-105'
                    : 'border-[#c2c6d6]/40 text-[#424754] hover:bg-[#eaedff]'
                }`}
              >
                <span class="material-symbols-outlined text-xl">{r.icon}</span>
                <span class="text-xs">{r.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Active Role Card Overview & Target Destination */}
        <div class="p-4 rounded-2xl bg-[#f2f3ff] border border-[#c2c6d6]/30 mb-6 space-y-2">
          <div class="flex items-start gap-3">
            <div class={`p-2 rounded-xl ${roleProfiles[selectedRole].badgeColor}`}>
              <span class="material-symbols-outlined text-lg">{roleProfiles[selectedRole].icon}</span>
            </div>
            <div>
              <h4 class="font-bold text-sm text-[#131b2e]">{roleProfiles[selectedRole].title} Mode</h4>
              <p class="text-xs text-[#424754]">{roleProfiles[selectedRole].subtitle}</p>
            </div>
          </div>
          <div class="pt-2 border-t border-[#c2c6d6]/30 flex items-center gap-1.5 text-xs font-bold text-[#0058be]">
            <span class="material-symbols-outlined text-sm">swap_calls</span>
            <span>{roleProfiles[selectedRole].redirectTarget}</span>
          </div>
        </div>

        {/* Form Inputs */}
        <form onSubmit={handleSubmit} class="space-y-4">
          <div>
            <label class="text-xs font-bold text-[#727785] uppercase tracking-wider block mb-1">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={roleProfiles[selectedRole].demoEmail}
              class="w-full p-3 rounded-xl bg-[#f2f3ff] border border-transparent focus:border-[#0058be] focus:bg-white text-sm outline-none font-medium transition-all"
              required
            />
          </div>

          <div>
            <label class="text-xs font-bold text-[#727785] uppercase tracking-wider block mb-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              class="w-full p-3 rounded-xl bg-[#f2f3ff] border border-transparent focus:border-[#0058be] focus:bg-white text-sm outline-none font-medium transition-all"
              required
            />
          </div>

          <button
            type="submit"
            class="w-full py-3.5 bg-[#0058be] text-white rounded-xl font-bold text-sm shadow-lg hover:bg-[#004395] active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-2 mt-2"
          >
            <span>Log In & Redirect as {roleProfiles[selectedRole].title}</span>
            <span class="material-symbols-outlined text-base">arrow_forward</span>
          </button>
        </form>

        {/* Quick Demo Switch Hint */}
        <div class="mt-4 pt-3 border-t border-[#c2c6d6]/20 text-center">
          <p class="text-xs text-[#727785]">
            💡 Click any of the 3 role tabs above for automatic credentials & fast login!
          </p>
        </div>
      </div>
    </div>
  );
}
