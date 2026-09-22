import React, { useState, useEffect } from 'react';

const API = 'http://localhost:5050';

export default function ContractorDashboard({ setActivePage, currentUser }) {
  const [selectedBidsCount, setSelectedBidsCount] = useState(0);
  const [activeBidsCount,   setActiveBidsCount]   = useState(0);
  const [openProjectCount,  setOpenProjectCount]  = useState(0);

  const contractorId = currentUser?.id || 'contractor-001';

  // ── Fetch live counts for dashboard metrics ──────────────────────────────
  useEffect(() => {
    const fetchCounts = async () => {
      try {
        // Contractor's own bids
        const bidsRes = await fetch(`${API}/api/bids?contractorId=${contractorId}`);
        if (bidsRes.ok) {
          const bids = await bidsRes.json();
          setSelectedBidsCount(bids.filter(b => b.status === 'selected').length);
          setActiveBidsCount(bids.filter(b => b.status === 'accepted').length);
        }
        // Open projects available to bid on
        const projRes = await fetch(`${API}/api/projects`);
        if (projRes.ok) {
          const projs = await projRes.json();
          setOpenProjectCount(projs.filter(p => p.status === 'open').length);
        }
      } catch { /* silent */ }
    };

    fetchCounts();
    const t = setInterval(fetchCounts, 5000);
    return () => clearInterval(t);
  }, [contractorId]);

  return (
    <div className="space-y-6">

      {/* Hero header */}
      <div className="bg-gradient-to-r from-[#006c49] to-[#005236] text-white p-6 md:p-8 rounded-3xl shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest bg-white/20 px-3 py-1 rounded-full text-white">
            Contractor Page 01 — Dashboard
          </span>
          <h1 className="font-display text-2xl md:text-3xl font-bold mt-2">
            Welcome, {currentUser?.name || 'Contractor'}!
          </h1>
          <p className="text-xs opacity-90 mt-1">
            {currentUser?.company || 'Your Construction Company'} · Verified Builder
          </p>
        </div>
        <button
          onClick={() => setActivePage('projectRequests')}
          className="px-5 py-2.5 bg-white text-[#006c49] rounded-xl text-xs font-bold shadow-md hover:bg-emerald-50 cursor-pointer"
        >
          View Open Projects ➔
        </button>
      </div>

      {/* ── Notification banner — homeowner selected your bid ─────────────── */}
      {selectedBidsCount > 0 && (
        <div
          onClick={() => setActivePage('contractorProjects')}
          className="p-4 bg-amber-50 border-2 border-amber-400 rounded-2xl flex items-center gap-4 cursor-pointer hover:bg-amber-100 transition-colors"
        >
          <span className="w-10 h-10 rounded-full bg-amber-400 flex items-center justify-center flex-shrink-0">
            <span className="material-symbols-outlined text-white text-xl">notifications_active</span>
          </span>
          <div className="flex-1">
            <p className="font-bold text-sm text-amber-800">
              {selectedBidsCount} homeowner{selectedBidsCount > 1 ? 's have' : ' has'} selected your bid!
            </p>
            <p className="text-xs text-amber-600">
              Review and accept or decline — click to view Active Projects.
            </p>
          </div>
          <span className="material-symbols-outlined text-amber-500">chevron_right</span>
        </div>
      )}

      {/* ── Metrics grid ─────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

        {/* Open RFQs / projects to bid */}
        <div className="glass-card p-5 rounded-2xl bg-white border-l-4 border-l-[#006c49] shadow-sm relative">
          {openProjectCount > 0 && (
            <span className="absolute top-3 right-3 w-5 h-5 bg-[#006c49] text-white rounded-full text-[10px] font-bold flex items-center justify-center">
              {openProjectCount}
            </span>
          )}
          <p className="text-xs font-bold text-[#727785] uppercase">Open Projects</p>
          <p className="text-2xl font-bold font-display text-[#131b2e] mt-1">
            {openProjectCount} Lead{openProjectCount !== 1 ? 's' : ''}
          </p>
          <button
            onClick={() => setActivePage('projectRequests')}
            className="text-xs font-bold text-[#006c49] mt-2 block hover:underline cursor-pointer"
          >
            Browse & Bid ➔
          </button>
        </div>

        {/* Bids awaiting contractor decision */}
        <div className={`glass-card p-5 rounded-2xl bg-white border-l-4 shadow-sm relative ${selectedBidsCount > 0 ? 'border-l-amber-400' : 'border-l-[#0058be]'}`}>
          {selectedBidsCount > 0 && (
            <span className="absolute top-3 right-3 w-5 h-5 bg-amber-400 text-white rounded-full text-[10px] font-bold flex items-center justify-center animate-pulse">
              {selectedBidsCount}
            </span>
          )}
          <p className="text-xs font-bold text-[#727785] uppercase">Awaiting Decision</p>
          <p className={`text-2xl font-bold font-display mt-1 ${selectedBidsCount > 0 ? 'text-amber-600' : 'text-[#0058be]'}`}>
            {selectedBidsCount} Selected
          </p>
          <button
            onClick={() => setActivePage('contractorProjects')}
            className="text-xs font-bold text-amber-600 mt-2 block hover:underline cursor-pointer"
          >
            {selectedBidsCount > 0 ? 'Action Required ➔' : 'View Status ➔'}
          </button>
        </div>

        {/* Active confirmed projects */}
        <div className="glass-card p-5 rounded-2xl bg-white border-l-4 border-l-[#4648d4] shadow-sm">
          <p className="text-xs font-bold text-[#727785] uppercase">Active Sites</p>
          <p className="text-2xl font-bold font-display text-[#4648d4] mt-1">
            {activeBidsCount} Project{activeBidsCount !== 1 ? 's' : ''}
          </p>
          <button
            onClick={() => setActivePage('contractorProjects')}
            className="text-xs font-bold text-[#4648d4] mt-2 block hover:underline cursor-pointer"
          >
            Manage Sites ➔
          </button>
        </div>

        {/* Verification */}
        <div className="glass-card p-5 rounded-2xl bg-white border-l-4 border-l-[#006c49] shadow-sm">
          <p className="text-xs font-bold text-[#727785] uppercase">Verification</p>
          <p className="text-lg font-bold font-display text-[#006c49] mt-1">Verified Tier 1</p>
          <button
            onClick={() => setActivePage('verificationCenter')}
            className="text-xs font-bold text-[#006c49] mt-2 block hover:underline cursor-pointer"
          >
            View Docs ➔
          </button>
        </div>
      </div>

      {/* ── Quick actions ─────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <button
          onClick={() => setActivePage('projectRequests')}
          className="p-4 bg-white rounded-2xl border border-[#c2c6d6]/30 shadow-sm text-left hover:bg-[#f2f3ff] transition-colors cursor-pointer"
        >
          <span className="material-symbols-outlined text-[#006c49] text-2xl block mb-2">search</span>
          <p className="font-bold text-sm text-[#131b2e]">Browse Open Projects</p>
          <p className="text-xs text-[#727785] mt-0.5">Find new projects and submit bids</p>
        </button>

        <button
          onClick={() => setActivePage('contractorProjects')}
          className="p-4 bg-white rounded-2xl border border-[#c2c6d6]/30 shadow-sm text-left hover:bg-[#f2f3ff] transition-colors cursor-pointer relative"
        >
          {selectedBidsCount > 0 && (
            <span className="absolute top-3 right-3 px-2 py-0.5 bg-amber-400 text-white rounded-full text-[10px] font-bold animate-pulse">
              Action needed
            </span>
          )}
          <span className="material-symbols-outlined text-[#0058be] text-2xl block mb-2">construction</span>
          <p className="font-bold text-sm text-[#131b2e]">My Active Projects</p>
          <p className="text-xs text-[#727785] mt-0.5">View, accept or manage ongoing sites</p>
        </button>

        <button
          onClick={() => setActivePage('businessProfile')}
          className="p-4 bg-white rounded-2xl border border-[#c2c6d6]/30 shadow-sm text-left hover:bg-[#f2f3ff] transition-colors cursor-pointer"
        >
          <span className="material-symbols-outlined text-[#4648d4] text-2xl block mb-2">badge</span>
          <p className="font-bold text-sm text-[#131b2e]">Business Profile</p>
          <p className="text-xs text-[#727785] mt-0.5">Update your certifications & portfolio</p>
        </button>
      </div>
    </div>
  );
}
