import React, { useState, useEffect, useCallback } from 'react';

const API = 'http://localhost:5050';

export default function PublishBidding({
  projectData, roomData, aiEstimate, currentUser,
  publishedProject, setPublishedProject,
  bids, setBids,
  setActivePage
}) {
  const [publishing, setPublishing]   = useState(false);
  const [loadingBids, setLoadingBids] = useState(false);
  const [error, setError]             = useState('');

  // ── Publish project ────────────────────────────────────────────────────────
  const handlePublish = async () => {
    setPublishing(true); setError('');
    try {
      const res = await fetch(`${API}/api/projects`, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title:       `${projectData.constructionType} House — ${projectData.city}`,
          ownerId:     currentUser.id   || 'user-001',
          ownerName:   currentUser.name || 'Homeowner',
          projectData,
          roomData,
          aiEstimate
        })
      });
      if (!res.ok) throw new Error(await res.text());
      const proj = await res.json();
      setPublishedProject(proj);
    } catch (e) {
      setError(e.message);
    } finally {
      setPublishing(false);
    }
  };

  // ── Poll bids every 4 s once project is published ─────────────────────────
  const fetchBids = useCallback(async () => {
    if (!publishedProject) return;
    setLoadingBids(true);
    try {
      const res = await fetch(`${API}/api/bids?projectId=${publishedProject.id}`);
      if (res.ok) setBids(await res.json());
    } finally {
      setLoadingBids(false);
    }
  }, [publishedProject, setBids]);

  useEffect(() => {
    if (!publishedProject) return;
    fetchBids();
    const t = setInterval(fetchBids, 4000);
    return () => clearInterval(t);
  }, [publishedProject, fetchBids]);

  const plotArea    = (Number(projectData.length) || 40) * (Number(projectData.width) || 60);
  const builtUpArea = Math.round(plotArea * (1.2 + (Number(projectData.floors) || 1) * 0.45));

  return (
    <div className="space-y-6 max-w-4xl mx-auto">

      {/* Header */}
      <div className="bg-white p-6 rounded-3xl border border-[#c2c6d6]/30 shadow-sm">
        <span className="text-xs font-bold text-[#006c49] uppercase tracking-widest block mb-1">
          User Page — Publish for Bidding
        </span>
        <h2 className="font-display text-2xl font-bold text-[#131b2e]">
          Publish Project for Contractor Bids
        </h2>
        <p className="text-xs text-[#727785] mt-1">
          Once published, verified contractors can view your project and submit competitive bids.
        </p>
      </div>

      {error && (
        <div className="p-4 bg-[#ffdad6] border border-[#ba1a1a]/30 rounded-2xl text-xs text-[#ba1a1a] flex items-center gap-2">
          <span className="material-symbols-outlined text-base">error</span>
          {error}
        </div>
      )}

      {/* Project Summary Card */}
      <div className="bg-white p-6 rounded-3xl border border-[#c2c6d6]/30 shadow-lg space-y-4">
        <h3 className="font-bold text-base text-[#131b2e] font-display">Project Summary</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
          {[
            { label: 'Plot Size',   value: `${plotArea.toLocaleString()} sq.ft` },
            { label: 'Built-up',    value: `${builtUpArea.toLocaleString()} sq.ft` },
            { label: 'Location',    value: `${projectData.city}, ${projectData.state}` },
            { label: 'Floors',      value: `G + ${projectData.floors}` },
            { label: 'Quality',     value: projectData.constructionType },
            { label: 'Budget',      value: `₹${Number(projectData.budget).toLocaleString('en-IN')}` },
            { label: 'AI Estimate', value: aiEstimate?.estimatedCost ? `₹${Number(aiEstimate.estimatedCost).toLocaleString('en-IN')}` : 'Not run yet' },
            { label: 'Timeline',    value: aiEstimate?.timelineMonths ? `${aiEstimate.timelineMonths} months` : '—' },
          ].map(({ label, value }) => (
            <div key={label} className="p-3 bg-[#f2f3ff] rounded-xl">
              <span className="text-[#727785] block">{label}</span>
              <span className="font-bold text-[#131b2e]">{value}</span>
            </div>
          ))}
        </div>

        {/* Room summary */}
        <div className="p-3 bg-[#eaedff] rounded-xl text-xs">
          <span className="font-bold text-[#0058be] block mb-1">Room Configuration</span>
          <span className="text-[#424754]">
            {Object.entries(roomData).map(([k, v]) => `${k}: ${v}`).join(' · ')}
          </span>
        </div>
      </div>

      {/* Not yet published */}
      {!publishedProject && (
        <div className="bg-white p-8 rounded-3xl border border-[#006c49]/30 shadow-lg text-center space-y-4">
          <span className="material-symbols-outlined text-5xl text-[#006c49]">campaign</span>
          <div>
            <h3 className="font-bold text-lg text-[#131b2e]">Ready to go live?</h3>
            <p className="text-xs text-[#727785] mt-1">
              Verified contractors on BuildAI will be notified and can submit bids within minutes.
            </p>
          </div>
          <button
            onClick={handlePublish}
            disabled={publishing}
            className="px-10 py-4 bg-[#006c49] text-white rounded-xl font-bold text-sm shadow-xl hover:bg-[#005236] transition-all cursor-pointer flex items-center gap-2 mx-auto disabled:opacity-60"
          >
            <span className="material-symbols-outlined">rocket_launch</span>
            {publishing ? 'Publishing…' : 'Publish Project for Bidding'}
          </button>
        </div>
      )}

      {/* Published — show live status + bids */}
      {publishedProject && (
        <>
          {/* Status banner */}
          <div className="p-4 bg-[#6cf8bb]/20 border border-[#006c49]/30 rounded-2xl flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="w-3 h-3 rounded-full bg-[#006c49] animate-pulse block" />
              <div>
                <p className="font-bold text-sm text-[#006c49]">Project Live — Open for Bids</p>
                <p className="text-xs text-[#424754]">ID: {publishedProject.id} · Published {new Date(publishedProject.publishedAt).toLocaleTimeString()}</p>
              </div>
            </div>
            <button
              onClick={fetchBids}
              disabled={loadingBids}
              className="px-3 py-1.5 bg-white border border-[#006c49]/30 text-[#006c49] rounded-xl text-xs font-bold flex items-center gap-1 hover:bg-[#eaedff] cursor-pointer"
            >
              <span className="material-symbols-outlined text-sm">refresh</span>
              Refresh
            </button>
          </div>

          {/* Bids list */}
          <div className="bg-white p-6 rounded-3xl border border-[#c2c6d6]/30 shadow-lg space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-base text-[#131b2e] font-display">
                Incoming Bids
                <span className="ml-2 px-2 py-0.5 bg-[#0058be] text-white rounded-full text-[10px] font-bold">
                  {bids.length}
                </span>
              </h3>
              {bids.length > 0 && (
                <button
                  onClick={() => setActivePage('quotations')}
                  className="px-5 py-2 bg-[#0058be] text-white rounded-xl text-xs font-bold hover:bg-[#004395] cursor-pointer flex items-center gap-1"
                >
                  Compare & Accept Bid
                  <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </button>
              )}
            </div>

            {bids.length === 0 ? (
              <div className="text-center py-10 text-[#727785] space-y-2">
                <span className="material-symbols-outlined text-4xl">hourglass_top</span>
                <p className="text-sm font-bold">Waiting for contractor bids…</p>
                <p className="text-xs">Auto-refreshing every 4 seconds</p>
              </div>
            ) : (
              <div className="space-y-3">
                {bids.map((bid) => (
                  <div key={bid.id} className="p-4 bg-[#f2f3ff] rounded-2xl flex items-center justify-between text-xs">
                    <div>
                      <p className="font-bold text-sm text-[#131b2e]">{bid.companyName}</p>
                      <p className="text-[#727785] mt-0.5">{bid.contractorName} · {bid.timeline}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-base text-[#006c49]">₹{bid.totalCost.toLocaleString('en-IN')}</p>
                      <span className={`px-2 py-0.5 rounded-full font-bold text-[10px] ${
                        bid.status === 'pending'  ? 'bg-amber-100 text-amber-700' :
                        bid.status === 'selected' ? 'bg-[#eaedff] text-[#0058be]' :
                        bid.status === 'accepted' ? 'bg-[#6cf8bb]/40 text-[#006c49]' :
                        'bg-[#ffdad6] text-[#ba1a1a]'
                      }`}>{bid.status.toUpperCase()}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
