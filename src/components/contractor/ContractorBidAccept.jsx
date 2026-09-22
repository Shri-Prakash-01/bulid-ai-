import React, { useState, useEffect, useCallback } from 'react';

const API = 'http://localhost:5050';

export default function ContractorBidAccept({
  myBid, setMyBid, activeContract, setActiveContract,
  setActivePage, currentUser
}) {
  const [processing, setProcessing] = useState(false);
  const [error,      setError]      = useState('');
  const [searching,  setSearching]  = useState(false);

  const contractorId = currentUser?.id || 'contractor-001';

  // ── On mount: if myBid is null/stale, auto-fetch from backend ─────────────
  // This handles the case where contractor navigates directly to bidAccept
  // without going through quotationBuilder in the same session.
  const findSelectedBid = useCallback(async () => {
    setSearching(true);
    try {
      const res = await fetch(`${API}/api/bids?contractorId=${contractorId}`);
      if (!res.ok) return;
      const all = await res.json();

      // Priority: selected > pending (most actionable first)
      const selected = all.find(b => b.status === 'selected');
      const pending  = all.find(b => b.status === 'pending');
      const active   = all.find(b => b.status === 'accepted');

      const best = selected || active || pending || null;
      if (best) setMyBid(best);
    } catch { /* silent */ }
    finally { setSearching(false); }
  }, [contractorId, setMyBid]);

  useEffect(() => {
    // Always refresh on mount — picks up bids even after page reload
    findSelectedBid();
  }, [findSelectedBid]);

  // ── Poll: keep bid status in sync while page is open ──────────────────────
  const refreshBid = useCallback(async () => {
    if (!myBid?.id) return;
    try {
      const res = await fetch(`${API}/api/bids?contractorId=${contractorId}`);
      if (!res.ok) return;
      const all     = await res.json();
      const updated = all.find(b => b.id === myBid.id);
      if (updated) setMyBid(updated);
    } catch { /* silent */ }
  }, [myBid, contractorId, setMyBid]);

  useEffect(() => {
    const t = setInterval(refreshBid, 4000);
    return () => clearInterval(t);
  }, [refreshBid]);

  // ── Confirm or reject ─────────────────────────────────────────────────────
  const handleConfirm = async (action) => {
    setProcessing(true); setError('');
    try {
      const res = await fetch(`${API}/api/bids/${myBid.id}/contractor-confirm`, {
        method:  'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ action })
      });
      if (!res.ok) throw new Error(await res.text());
      const data = await res.json();
      setMyBid(data.bid);
      if (action === 'accept' && data.contract) {
        setActiveContract(data.contract);
        setActivePage('contractorProjects');
      } else {
        // Rejected — clear bid, go back to project list
        setMyBid(null);
        setActivePage('projectRequests');
      }
    } catch (e) {
      setError(e.message);
    } finally {
      setProcessing(false);
    }
  };

  // ── Loading state while searching ─────────────────────────────────────────
  if (searching && !myBid) {
    return (
      <div className="flex flex-col items-center justify-center py-24 space-y-4 text-[#727785]">
        <span className="material-symbols-outlined text-4xl animate-spin text-[#0058be]">
          progress_activity
        </span>
        <p className="font-bold text-base text-[#131b2e]">Checking your bids…</p>
      </div>
    );
  }

  // ── No bid found at all ───────────────────────────────────────────────────
  if (!myBid) {
    return (
      <div className="flex flex-col items-center justify-center py-24 space-y-4 text-[#727785]">
        <span className="material-symbols-outlined text-5xl">inbox</span>
        <p className="font-bold text-lg text-[#131b2e]">No pending bids found</p>
        <p className="text-xs text-center max-w-xs">
          Submit a bid on an open project first. You'll be notified here when a homeowner selects your bid.
        </p>
        <button
          onClick={() => setActivePage('projectRequests')}
          className="px-6 py-3 bg-[#006c49] text-white rounded-xl text-xs font-bold hover:bg-[#005236] cursor-pointer"
        >
          Browse Open Projects
        </button>
      </div>
    );
  }

  // ── Bid already accepted — show contract summary ───────────────────────────
  if (myBid.status === 'accepted') {
    return (
      <div className="space-y-6 max-w-2xl mx-auto">
        <div className="p-6 bg-[#6cf8bb]/20 border border-[#006c49]/40 rounded-3xl text-center space-y-2">
          <span className="material-symbols-outlined text-5xl text-[#006c49]">handshake</span>
          <h2 className="font-display text-2xl font-bold text-[#006c49]">Project Confirmed!</h2>
          <p className="text-sm text-[#424754]">
            You accepted this project. Head to Active Projects to begin execution.
          </p>
        </div>

        {activeContract && (
          <div className="bg-white p-6 rounded-3xl border border-[#c2c6d6]/30 shadow-lg space-y-3 text-xs">
            <h3 className="font-bold text-base text-[#131b2e]">Contract: {activeContract.id}</h3>
            {[
              { label: 'Owner',       value: activeContract.ownerName },
              { label: 'Total Value', value: `₹${Number(activeContract.totalCost).toLocaleString('en-IN')}` },
              { label: 'Timeline',    value: activeContract.timeline },
            ].map(({ label, value }) => (
              <div key={label} className="flex justify-between p-3 bg-[#f2f3ff] rounded-xl">
                <span className="text-[#727785]">{label}</span>
                <span className="font-bold text-[#131b2e]">{value}</span>
              </div>
            ))}
          </div>
        )}

        <button
          onClick={() => setActivePage('contractorProjects')}
          className="w-full py-3.5 bg-[#006c49] text-white rounded-xl text-xs font-bold hover:bg-[#005236] cursor-pointer shadow-md"
        >
          Go to Active Projects →
        </button>
      </div>
    );
  }

  // ── Bid pending — waiting for homeowner to select ─────────────────────────
  if (myBid.status === 'pending') {
    return (
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="bg-white p-8 rounded-3xl border border-[#c2c6d6]/30 shadow-lg text-center space-y-4">
          <span className="material-symbols-outlined text-5xl text-[#0058be]">schedule</span>
          <h2 className="font-display text-xl font-bold text-[#131b2e]">Bid Submitted — Awaiting Selection</h2>
          <p className="text-sm text-[#727785]">
            Your bid of <strong>₹{myBid.totalCost.toLocaleString('en-IN')}</strong> is live.
            You'll be notified when the homeowner selects a bid.
          </p>

          <div className="p-4 bg-[#f2f3ff] rounded-2xl text-xs space-y-2 text-left">
            {[
              { label: 'Project ID',    value: myBid.projectId },
              { label: 'Your Total Bid',value: `₹${myBid.totalCost.toLocaleString('en-IN')}` },
              { label: 'Timeline',      value: myBid.timeline },
              { label: 'Bid ID',        value: myBid.id },
            ].map(({ label, value }) => (
              <div key={label} className="flex justify-between">
                <span className="text-[#727785]">{label}</span>
                <span className="font-bold text-[#131b2e]">{value}</span>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-2 justify-center text-xs text-[#727785]">
            <span className="w-2 h-2 bg-[#0058be] rounded-full animate-pulse" />
            Auto-checking every 4 seconds
          </div>
        </div>
      </div>
    );
  }

  // ── Bid SELECTED by homeowner — contractor must accept or reject ───────────
  if (myBid.status === 'selected') {
    return (
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="bg-white p-8 rounded-3xl border-2 border-amber-400 shadow-xl space-y-6">

          {/* Notification banner */}
          <div className="p-4 bg-amber-50 border border-amber-200 rounded-2xl flex items-center gap-3">
            <span className="material-symbols-outlined text-amber-500 text-2xl">notifications_active</span>
            <div>
              <p className="font-bold text-sm text-amber-700">Homeowner selected your bid!</p>
              <p className="text-xs text-amber-600">Review the project and confirm or decline below.</p>
            </div>
          </div>

          <div>
            <span className="text-xs font-bold text-[#0058be] uppercase tracking-widest block mb-1">
              Contractor — Bid Acceptance
            </span>
            <h2 className="font-display text-2xl font-bold text-[#131b2e]">Confirm Project Acceptance</h2>
          </div>

          {/* Bid breakdown */}
          <div className="grid grid-cols-2 gap-3 text-xs">
            {[
              { label: 'Project ID',  value: myBid.projectId },
              { label: 'Your Total',  value: `₹${myBid.totalCost.toLocaleString('en-IN')}` },
              { label: 'Material',    value: `₹${myBid.materialCost.toLocaleString('en-IN')}` },
              { label: 'Labour',      value: `₹${myBid.labourCost.toLocaleString('en-IN')}` },
              { label: 'Overheads',   value: `₹${myBid.otherCost.toLocaleString('en-IN')}` },
              { label: 'Timeline',    value: myBid.timeline },
            ].map(({ label, value }) => (
              <div key={label} className="p-3 bg-[#f2f3ff] rounded-xl">
                <span className="text-[#727785] block">{label}</span>
                <span className="font-bold text-[#131b2e]">{value}</span>
              </div>
            ))}
          </div>

          {myBid.note && (
            <p className="text-xs text-[#727785] italic p-3 bg-[#f2f3ff] rounded-xl">
              Your note: "{myBid.note}"
            </p>
          )}

          {error && (
            <div className="p-3 bg-[#ffdad6] border border-[#ba1a1a]/30 rounded-xl text-xs text-[#ba1a1a]">
              {error}
            </div>
          )}

          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => handleConfirm('reject')}
              disabled={processing}
              className="py-3.5 bg-[#ffdad6] text-[#ba1a1a] rounded-xl text-xs font-bold hover:bg-[#ffb4ab] transition-all cursor-pointer disabled:opacity-50"
            >
              {processing ? 'Processing…' : '✕ Decline Project'}
            </button>
            <button
              onClick={() => handleConfirm('accept')}
              disabled={processing}
              className="py-3.5 bg-[#006c49] text-white rounded-xl text-xs font-bold hover:bg-[#005236] transition-all cursor-pointer disabled:opacity-50 shadow-lg"
            >
              {processing ? 'Confirming…' : '✓ Accept & Start Project'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ── Bid rejected ──────────────────────────────────────────────────────────
  return (
    <div className="max-w-xl mx-auto text-center py-16 space-y-4">
      <span className="material-symbols-outlined text-5xl text-[#ba1a1a]">cancel</span>
      <h2 className="font-display text-xl font-bold text-[#131b2e]">Bid Not Selected</h2>
      <p className="text-sm text-[#727785]">The homeowner selected another contractor for this project.</p>
      <button
        onClick={() => setActivePage('projectRequests')}
        className="px-6 py-3 bg-[#0058be] text-white rounded-xl text-xs font-bold hover:bg-[#004395] cursor-pointer"
      >
        Browse More Projects
      </button>
    </div>
  );
}
