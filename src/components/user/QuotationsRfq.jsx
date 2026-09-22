import React, { useState, useEffect, useCallback } from 'react';

const API = 'http://localhost:5050';

export default function QuotationsRfq({
  publishedProject, bids, setBids,
  acceptedBid, setAcceptedBid,
  setActivePage
}) {
  const [accepting, setAccepting]   = useState(null); // bid id being accepted
  const [loadingBids, setLoadingBids] = useState(false);
  const [error, setError]           = useState('');

  // ── Fetch latest bids ──────────────────────────────────────────────────────
  const fetchBids = useCallback(async () => {
    if (!publishedProject?.id) return;
    setLoadingBids(true);
    try {
      const res = await fetch(`${API}/api/bids?projectId=${publishedProject.id}`);
      if (res.ok) setBids(await res.json());
    } finally {
      setLoadingBids(false);
    }
  }, [publishedProject, setBids]);

  useEffect(() => { fetchBids(); }, [fetchBids]);

  // ── User selects / accepts a bid ───────────────────────────────────────────
  const handleAcceptBid = async (bid) => {
    setAccepting(bid.id); setError('');
    try {
      const res = await fetch(`${API}/api/bids/${bid.id}/select`, { method: 'PATCH' });
      if (!res.ok) throw new Error(await res.text());
      const updated = await res.json();
      setAcceptedBid(updated);
      await fetchBids();               // refresh all bid statuses
      setActivePage('projectConfirmed');
    } catch (e) {
      setError(e.message);
    } finally {
      setAccepting(null);
    }
  };

  // No project published yet
  if (!publishedProject) {
    return (
      <div className="flex flex-col items-center justify-center py-24 space-y-4 text-[#727785]">
        <span className="material-symbols-outlined text-5xl">inbox</span>
        <p className="font-bold text-lg text-[#131b2e]">No project published yet</p>
        <p className="text-xs">First publish your project so contractors can submit bids.</p>
        <button
          onClick={() => setActivePage('publishBidding')}
          className="px-6 py-3 bg-[#006c49] text-white rounded-xl text-xs font-bold hover:bg-[#005236] cursor-pointer"
        >
          Go to Publish Project
        </button>
      </div>
    );
  }

  const sorted = [...bids].sort((a, b) => a.totalCost - b.totalCost);
  const lowest = sorted[0]?.totalCost;

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-3xl border border-[#c2c6d6]/30 shadow-sm">
        <div>
          <span className="text-xs font-bold text-[#0058be] uppercase tracking-widest block mb-1">
            User Page 07 — Bid Comparison
          </span>
          <h2 className="font-display text-2xl font-bold text-[#131b2e]">
            Contractor Bids — {publishedProject.title}
          </h2>
          <p className="text-xs text-[#727785] mt-0.5">
            Project ID: {publishedProject.id} · {bids.length} bid{bids.length !== 1 ? 's' : ''} received
          </p>
        </div>
        <button
          onClick={fetchBids}
          disabled={loadingBids}
          className="px-4 py-2 bg-[#f2f3ff] text-[#131b2e] rounded-xl text-xs font-bold hover:bg-[#eaedff] cursor-pointer flex items-center gap-1 disabled:opacity-50"
        >
          <span className="material-symbols-outlined text-sm">refresh</span>
          {loadingBids ? 'Refreshing…' : 'Refresh Bids'}
        </button>
      </div>

      {error && (
        <div className="p-4 bg-[#ffdad6] border border-[#ba1a1a]/30 rounded-2xl text-xs text-[#ba1a1a] flex items-center gap-2">
          <span className="material-symbols-outlined text-base">error</span>
          {error}
          <button onClick={() => setError('')} className="ml-auto font-bold underline cursor-pointer">Dismiss</button>
        </div>
      )}

      {/* Already accepted a bid */}
      {acceptedBid && (
        <div className="p-4 bg-[#6cf8bb]/20 border border-[#006c49]/30 rounded-2xl flex items-center gap-3">
          <span className="material-symbols-outlined text-[#006c49]">check_circle</span>
          <div className="flex-1">
            <p className="font-bold text-sm text-[#006c49]">
              You selected: {acceptedBid.companyName} — ₹{acceptedBid.totalCost.toLocaleString('en-IN')}
            </p>
            <p className="text-xs text-[#424754]">Awaiting contractor confirmation. Status: {acceptedBid.status}</p>
          </div>
          <button
            onClick={() => setActivePage('projectConfirmed')}
            className="px-4 py-2 bg-[#006c49] text-white rounded-xl text-xs font-bold hover:bg-[#005236] cursor-pointer"
          >
            Track Status →
          </button>
        </div>
      )}

      {/* No bids yet */}
      {bids.length === 0 && (
        <div className="bg-white p-12 rounded-3xl border border-[#c2c6d6]/30 shadow-sm text-center space-y-3 text-[#727785]">
          <span className="material-symbols-outlined text-5xl">hourglass_top</span>
          <p className="font-bold text-base text-[#131b2e]">No bids received yet</p>
          <p className="text-xs">Contractors are reviewing your project. Check back soon.</p>
          <button
            onClick={() => setActivePage('publishBidding')}
            className="text-xs font-bold text-[#0058be] underline cursor-pointer"
          >
            ← Back to Project Page
          </button>
        </div>
      )}

      {/* Bid cards */}
      {bids.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {sorted.map((bid, idx) => {
            const isLowest   = bid.totalCost === lowest;
            const isSelected = bid.status === 'selected' || bid.status === 'accepted';
            const isRejected = bid.status === 'rejected';

            return (
              <div
                key={bid.id}
                className={`bg-white p-5 rounded-3xl border shadow-lg space-y-4 relative transition-all ${
                  isSelected  ? 'border-[#006c49] ring-2 ring-[#006c49]/30' :
                  isRejected  ? 'border-[#c2c6d6]/30 opacity-50' :
                  isLowest    ? 'border-[#0058be] ring-2 ring-[#0058be]/20' :
                  'border-[#c2c6d6]/30'
                }`}
              >
                {/* Badges */}
                <div className="flex gap-2 flex-wrap">
                  {idx === 0 && !isRejected && (
                    <span className="px-2 py-0.5 bg-[#0058be] text-white rounded-full text-[10px] font-bold">
                      Lowest Bid
                    </span>
                  )}
                  {isSelected && (
                    <span className="px-2 py-0.5 bg-[#6cf8bb]/50 text-[#006c49] rounded-full text-[10px] font-bold">
                      ✓ Selected
                    </span>
                  )}
                  {isRejected && (
                    <span className="px-2 py-0.5 bg-[#ffdad6] text-[#ba1a1a] rounded-full text-[10px] font-bold">
                      Not Selected
                    </span>
                  )}
                </div>

                {/* Contractor info */}
                <div>
                  <p className="font-bold text-base text-[#131b2e]">{bid.companyName}</p>
                  <p className="text-xs text-[#727785]">{bid.contractorName}</p>
                </div>

                {/* Cost breakdown */}
                <div className="space-y-1.5 text-xs">
                  <div className="flex justify-between">
                    <span className="text-[#727785]">Material</span>
                    <span className="font-bold">₹{bid.materialCost.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#727785]">Labour</span>
                    <span className="font-bold">₹{bid.labourCost.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#727785]">Overheads</span>
                    <span className="font-bold">₹{bid.otherCost.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between pt-1.5 border-t border-[#c2c6d6]/30">
                    <span className="font-bold text-[#131b2e]">Total</span>
                    <span className="font-bold text-lg text-[#006c49]">₹{bid.totalCost.toLocaleString('en-IN')}</span>
                  </div>
                </div>

                <div className="text-xs text-[#424754]">
                  <span className="font-bold">Timeline:</span> {bid.timeline}
                </div>

                {bid.note && (
                  <p className="text-xs text-[#727785] italic">"{bid.note}"</p>
                )}

                {/* Accept button */}
                {!acceptedBid && !isRejected && (
                  <button
                    onClick={() => handleAcceptBid(bid)}
                    disabled={!!accepting}
                    className="w-full py-2.5 bg-[#006c49] text-white rounded-xl text-xs font-bold hover:bg-[#005236] transition-all cursor-pointer disabled:opacity-50"
                  >
                    {accepting === bid.id ? 'Selecting…' : 'Accept This Bid'}
                  </button>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
