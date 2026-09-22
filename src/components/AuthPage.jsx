import React, { useState } from 'react';

export default function AuthPage({ onLoginSuccess }) {
  const [mode, setMode] = useState('login'); // 'login' | 'signup'
  const [selectedRole, setSelectedRole] = useState('user'); // 'user' | 'contractor' | 'admin'
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const demoAccounts = {
    user: {
      name: 'Rajesh Sharma',
      email: 'rajesh.homeowner@buildai.com',
      badge: 'Homeowner / User',
      redirectView: 'userDashboard'
    },
    contractor: {
      name: 'Apex Constructions (Sarah Jenkins)',
      email: 'sarah.contractor@apexbuild.com',
      badge: 'Certified Builder',
      redirectView: 'contractorDashboard'
    },
    admin: {
      name: 'Build AI Admin HQ',
      email: 'admin@buildai.com',
      badge: 'System Admin',
      redirectView: 'adminDashboard'
    }
  };

  const handleSelectRole = (roleKey) => {
    setSelectedRole(roleKey);
    setEmail(demoAccounts[roleKey].email);
    setPassword('••••••••');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const demo = demoAccounts[selectedRole];
    onLoginSuccess({
      role: selectedRole,
      name: fullName || demo.name,
      email: email || demo.email,
      badge: demo.badge
    });
  };

  return (
    <div class="min-h-screen bg-[#faf8ff] flex items-center justify-center p-4 md:p-8 relative overflow-hidden">
      {/* Ambient background glows */}
      <div class="absolute top-10 left-10 w-96 h-96 bg-[#0058be]/10 rounded-full blur-[100px] pointer-events-none"></div>
      <div class="absolute bottom-10 right-10 w-96 h-96 bg-[#006c49]/10 rounded-full blur-[100px] pointer-events-none"></div>

      <div class="bg-white rounded-3xl max-w-xl w-full p-6 md:p-10 shadow-2xl border border-[#c2c6d6]/40 relative z-10">
        {/* Brand Header */}
        <div class="flex flex-col items-center text-center mb-8">
          <div class="w-14 h-14 bg-[#0058be] text-white rounded-2xl flex items-center justify-center shadow-lg mb-3">
            <span class="material-symbols-outlined text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>
              construction
            </span>
          </div>
          <h1 class="font-display text-2xl md:text-3xl font-bold text-[#131b2e]">BUILD AI</h1>
          <p class="text-xs text-[#424754] font-semibold tracking-wider uppercase mt-1">
            Plan. Estimate. Build. Verify.
          </p>
        </div>

        {/* Login / Signup Mode Tabs */}
        <div class="flex bg-[#f2f3ff] p-1 rounded-2xl mb-6">
          <button
            onClick={() => setMode('login')}
            class={`flex-1 py-2.5 rounded-xl font-bold text-sm transition-all cursor-pointer ${
              mode === 'login' ? 'bg-white text-[#0058be] shadow-md' : 'text-[#424754]'
            }`}
          >
            Log In
          </button>
          <button
            onClick={() => setMode('signup')}
            class={`flex-1 py-2.5 rounded-xl font-bold text-sm transition-all cursor-pointer ${
              mode === 'signup' ? 'bg-white text-[#0058be] shadow-md' : 'text-[#424754]'
            }`}
          >
            Sign Up
          </button>
        </div>

        {/* Role Selection */}
        <div class="mb-6 space-y-2">
          <label class="text-xs font-bold text-[#727785] uppercase tracking-wider block">
            Select Account Role
          </label>
          <div class="grid grid-cols-3 gap-2">
            {[
              { id: 'user', title: 'Homeowner', icon: 'person' },
              { id: 'contractor', title: 'Contractor', icon: 'engineering' },
              { id: 'admin', title: 'Admin', icon: 'admin_panel_settings' }
            ].map((r) => (
              <button
                key={r.id}
                type="button"
                onClick={() => handleSelectRole(r.id)}
                class={`p-3 rounded-2xl border text-center transition-all flex flex-col items-center gap-1 cursor-pointer ${
                  selectedRole === r.id
                    ? 'border-[#0058be] bg-[#0058be]/10 text-[#0058be] font-bold shadow-sm scale-105'
                    : 'border-[#c2c6d6]/40 text-[#424754] hover:bg-[#eaedff]'
                }`}
              >
                <span class="material-symbols-outlined text-2xl">{r.icon}</span>
                <span class="text-xs font-bold">{r.title}</span>
              </button>
            ))}
          </div>
          <p class="text-[11px] text-[#0058be] font-bold mt-1 text-center">
            {selectedRole === 'user' && '➔ Homeowner Portal: Project setup, BOQ, AI layout, Loan & Contractor discovery'}
            {selectedRole === 'contractor' && '➔ Contractor Portal: Lead requests, BOQ Quotes, Milestone logger & Payments'}
            {selectedRole === 'admin' && '➔ Admin Portal: System oversight, ML models, Verification & Audit logs'}
          </p>
        </div>

        {/* Auth Form */}
        <form onSubmit={handleSubmit} class="space-y-4">
          {mode === 'signup' && (
            <div>
              <label class="text-xs font-bold text-[#727785] uppercase block mb-1">Full Name</label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="e.g. Rajesh Sharma"
                class="w-full p-3 rounded-xl bg-[#f2f3ff] border border-transparent focus:border-[#0058be] focus:bg-white text-sm outline-none font-medium"
                required
              />
            </div>
          )}

          <div>
            <label class="text-xs font-bold text-[#727785] uppercase block mb-1">Email / Phone Number</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={demoAccounts[selectedRole].email}
              class="w-full p-3 rounded-xl bg-[#f2f3ff] border border-transparent focus:border-[#0058be] focus:bg-white text-sm outline-none font-medium"
              required
            />
          </div>

          <div>
            <label class="text-xs font-bold text-[#727785] uppercase block mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              class="w-full p-3 rounded-xl bg-[#f2f3ff] border border-transparent focus:border-[#0058be] focus:bg-white text-sm outline-none font-medium"
              required
            />
          </div>

          {mode === 'signup' && (
            <div>
              <label class="text-xs font-bold text-[#727785] uppercase block mb-1">Confirm Password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                class="w-full p-3 rounded-xl bg-[#f2f3ff] border border-transparent focus:border-[#0058be] focus:bg-white text-sm outline-none font-medium"
                required
              />
            </div>
          )}

          <div class="flex items-center justify-between text-xs text-[#424754] font-medium pt-1">
            <label class="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" defaultChecked class="rounded text-[#0058be]" />
              <span>Remember Me</span>
            </label>
            <a href="#" class="text-[#0058be] hover:underline">Forgot Password?</a>
          </div>

          <button
            type="submit"
            class="w-full py-4 bg-[#0058be] text-white rounded-xl font-bold text-sm shadow-xl hover:bg-[#004395] active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-2 mt-4"
          >
            <span>{mode === 'login' ? 'Log In to Workspace' : 'Create Account & Continue'}</span>
            <span class="material-symbols-outlined text-base">arrow_forward</span>
          </button>
        </form>

        {/* Demo Fast Login Bar */}
        <div class="mt-6 pt-4 border-t border-[#c2c6d6]/20 text-center">
          <p class="text-xs text-[#727785] font-medium">
            ⚡ Quick Demo Logins: Click any role tab above for instant pre-filled credentials!
          </p>
        </div>
      </div>
    </div>
  );
}
