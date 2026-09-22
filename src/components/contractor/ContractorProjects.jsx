import React, { useState, useEffect, useCallback } from 'react';

const API = 'http://localhost:5050';

export default function ContractorProjects({ setActivePage, activeContract, currentUser }) {
  const [myBids,    setMyBids]    = useState([]);
  const [projects,  setProjects]  = useState({});   // projectId → project obj
  const [loading,   setLoading]   = useState(false);
  const [processing,setProcessing]= useState(null); // bid id being processed
  const [error,     setError]     = useState('');

  const contractorId = currentUser?.id || 'contractor-001';

  // ── Fetch this contractor's bids (selected / accepted) ────────────────────
  const fetchMyBids = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API}/api/bids?contractorId=${contractorId}`);
      if (!res.ok) throw new Error('Failed to fetch bids');
      const all = await res.json();
      // Show bids that are selected (awaiting contractor action) or accepted/active
      const active = all.filter(b => ['selected', 'accepted'].includes(b.status));
      setMyBids(active);

      // Fetch project details for each unique projectId
      const uniqueIds = [...new Set(active.map(b => b.projectId))];
      const projMap   = {};
      await Promise.all(uniqueIds.map(async (pid) => {
        try {
          const pr = await fetch(`${API}/api/projects/${pid}`);
          if (pr.ok) projMap[pid] = await pr.json();
        } catch { /* skip */ }
      }));
      setProjects(projMap);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, [contractorId]);

  useEffect(() => {
    fetchMyBids();
    const t = setInterval(fetchMyBids, 5000); // poll every 5s
    return () => clearInterval(t);
  }, [fetchMyBids]);

  // ── Accept bid ─────────────────────────────────────────────────────────────
  const handleAccept = async (bid) => {
    setProcessing(bid.id); setError('');
    try {
      const res = await fetch(`${API}/api/bids/${bid.id}/contractor-confirm`, {
        method:  'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ action: 'accept' })
      });
      if (!res.ok) throw new Error(await res.text());
      await fetchMyBids();
    } catch (e) {
      setError(e.message);
    } finally {
      setProcessing(null);
    }
  };

  // ── Reject bid ─────────────────────────────────────────────────────────────
  const handleReject = async (bid) => {
    setProcessing(bid.id); setError('');
    try {
      const res = await fetch(`${API}/api/bids/${bid.id}/contractor-confirm`, {
        method:  'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ action: 'reject' })
      });
      if (!res.ok) throw new Error(await res.text());
      await fetchMyBids();
    } catch (e) {
      setError(e.message);
    } finally {
      setProcessing(null);
    }
  };

  // Combine activeContract milestones for confirmed projects
  const confirmedBids = myBids.filter(b => b.status === 'accepted');
  const pendingBids   = myBids.filter(b => b.status === 'selected');

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-3xl border border-[#c2c6d6]/30 shadow-sm">
        <div>
          <span className="text-xs font-bold text-[#006c49] uppercase tracking-widest block mb-1">
            Contractor Page 06 — My Projects
          </span>
          <h2 className="font-display text-2xl font-bold text-[#131b2e]">Active Construction Projects</h2>
          <p className="text-xs text-[#727785] mt-0.5">
            {confirmedBids.length} confirmed · {pendingBids.length} awaiting your decision
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={fetchMyBids}
            disabled={loading}
            className="px-4 py-2.5 bg-[#f2f3ff] text-[#131b2e] rounded-xl text-xs font-bold hover:bg-[#eaedff] cursor-pointer flex items-center gap-1 disabled:opacity-50"
          >
            <span className="material-symbols-outlined text-sm">refresh</span>
            {loading ? 'Loading…' : 'Refresh'}
          </button>
          <button
            onClick={() => setActivePage('progressUpdate')}
            className="px-5 py-2.5 bg-[#006c49] text-white font-bold text-xs rounded-xl shadow-md hover:bg-[#005236] cursor-pointer"
          >
            + Post Progress Log
          </button>
        </div>
      </div>

      {error && (
        <div className="p-4 bg-[#ffdad6] border border-[#ba1a1a]/30 rounded-2xl text-xs text-[#ba1a1a] flex items-center gap-2">
          <span className="material-symbols-outlined text-base">error</span>
          {error}
          <button onClick={() => setError('')} className="ml-auto font-bold underline cursor-pointer">Dismiss</button>
        </div>
      )}

      {/* ── PENDING DECISION — homeowner selected your bid ─────────────────── */}
      {pendingBids.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse" />
            <h3 className="font-bold text-sm text-[#131b2e]">
              Awaiting Your Decision ({pendingBids.length})
            </h3>
          </div>

          {pendingBids.map((bid) => {
            const proj = projects[bid.projectId];
            const pd   = proj?.projectData || {};
            const isProcessing = processing === bid.id;

            return (
              <div
                key={bid.id}
                className="bg-white p-5 rounded-3xl border-2 border-amber-400 shadow-lg space-y-4"
              >
                {/* Alert */}
                <div className="flex items-center gap-3 p-3 bg-amber-50 border border-amber-200 rounded-2xl">
                  <span className="material-symbols-outlined text-amber-500 text-xl">notifications_active</span>
                  <div>
                    <p className="font-bold text-sm text-amber-700">Homeowner accepted your bid!</p>
                    <p className="text-xs text-amber-600">Review project details and confirm or decline.</p>
                  </div>
                </div>

                {/* Project + bid details */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-xs">
                  {[
                    { label: 'Project',    value: proj?.title || bid.projectId },
                    { label: 'Location',   value: pd.city ? `${pd.city}, ${pd.state}` : '—' },
                    { label: 'Quality',    value: pd.constructionType || '—' },
                    { label: 'Your Bid',   value: `₹${bid.totalCost.toLocaleString('en-IN')}` },
                    { label: 'Timeline',   value: bid.timeline },
                    { label: 'Owner',      value: proj?.ownerName || '—' },
                  ].map(({ label, value }) => (
                    <div key={label} className="p-3 bg-[#f2f3ff] rounded-xl">
                      <span className="text-[#727785] block text-[10px]">{label}</span>
                      <span className="font-bold text-[#131b2e]">{value}</span>
                    </div>
                  ))}
                </div>

                {bid.note && (
                  <p className="text-xs text-[#727785] italic px-1">Your note: "{bid.note}"</p>
                )}

                {/* Accept / Reject */}
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => handleReject(bid)}
                    disabled={isProcessing}
                    className="py-3 bg-[#ffdad6] text-[#ba1a1a] rounded-xl text-xs font-bold hover:bg-[#ffb4ab] transition-all cursor-pointer disabled:opacity-50"
                  >
                    {isProcessing ? 'Processing…' : '✕ Decline Project'}
                  </button>
                  <button
                    onClick={() => handleAccept(bid)}
                    disabled={isProcessing}
                    className="py-3 bg-[#006c49] text-white rounded-xl text-xs font-bold hover:bg-[#005236] transition-all cursor-pointer disabled:opacity-50 shadow-md"
                  >
                    {isProcessing ? 'Confirming…' : '✓ Accept & Start Project'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ── CONFIRMED / ACTIVE PROJECTS ───────────────────────────────────── */}
      {confirmedBids.length > 0 && (
        <div className="space-y-3">
          <h3 className="font-bold text-sm text-[#131b2e] flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#006c49]" />
            Confirmed Projects ({confirmedBids.length})
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {confirmedBids.map((bid) => {
              const proj = projects[bid.projectId];
              const pd   = proj?.projectData || {};
              const plotArea   = (Number(pd.length) || 40) * (Number(pd.width) || 60);
              const builtUp    = Math.round(plotArea * (1.2 + (Number(pd.floors) || 1) * 0.45));

              return (
                <div key={bid.id} className="bg-white p-5 rounded-3xl border border-[#006c49]/30 shadow-md space-y-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-bold text-base text-[#131b2e]">{proj?.title || bid.projectId}</p>
                      <p className="text-xs text-[#727785]">{proj?.ownerName} · {bid.projectId}</p>
                    </div>
                    <span className="px-2 py-0.5 bg-[#6cf8bb]/40 text-[#006c49] rounded-full text-[10px] font-bold uppercase">
                      Active
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs">
                    {[
                      { label: 'Location',  value: pd.city ? `${pd.city}, ${pd.state}` : '—' },
                      { label: 'Built-up',  value: `${builtUp.toLocaleString()} sq.ft` },
                      { label: 'Contract',  value: `₹${bid.totalCost.toLocaleString('en-IN')}` },
                      { label: 'Timeline',  value: bid.timeline },
                    ].map(({ label, value }) => (
                      <div key={label} className="p-2.5 bg-[#f2f3ff] rounded-xl">
                        <span className="text-[#727785] block text-[10px]">{label}</span>
                        <span className="font-bold text-[#131b2e]">{value}</span>
                      </div>
                    ))}
                  </div>

                  <div className="p-3 bg-[#eaedff] rounded-xl text-xs">
                    <span className="text-[#727785] block text-[10px] mb-1">Overall Progress</span>
                    <div className="w-full bg-[#c2c6d6]/30 h-2 rounded-full overflow-hidden">
                      <div className="bg-[#006c49] h-2 rounded-full w-0 transition-all" />
                    </div>
                    <span className="text-[10px] text-[#006c49] font-bold block text-right mt-0.5">Just started</span>
                  </div>

                  <button
                    onClick={() => setActivePage('progressUpdate')}
                    className="w-full py-2.5 bg-[#006c49] text-white rounded-xl text-xs font-bold hover:bg-[#005236] cursor-pointer flex items-center justify-center gap-1"
                  >
                    <span className="material-symbols-outlined text-sm">construction</span>
                    Update Site Progress
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ── EMPTY STATE ───────────────────────────────────────────────────── */}
      {!loading && myBids.length === 0 && (
        <div className="bg-white p-12 rounded-3xl border border-[#c2c6d6]/30 text-center space-y-3 text-[#727785]">
          <span className="material-symbols-outlined text-5xl">construction</span>
          <p className="font-bold text-base text-[#131b2e]">No active projects yet</p>
          <p className="text-xs">Submit bids on open projects to get started.</p>
          <button
            onClick={() => setActivePage('projectRequests')}
            className="px-6 py-3 bg-[#006c49] text-white rounded-xl text-xs font-bold hover:bg-[#005236] cursor-pointer"
          >
            Browse Open Projects
          </button>
        </div>
      )}
    </div>
  );
}
