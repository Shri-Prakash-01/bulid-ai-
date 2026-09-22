import React, { useState, useEffect, useCallback } from 'react';

const API = 'http://localhost:5050';

export default function ProjectConfirmed({
  acceptedBid, activeContract, setActiveContract,
  publishedProject, setActivePage
}) {
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState('');

  // Poll for contract (generated when contractor confirms)
  const fetchContract = useCallback(async () => {
    if (!publishedProject?.id) return;
    setLoading(true);
    try {
      const res = await fetch(`${API}/api/contracts?projectId=${publishedProject.id}`);
      if (res.ok) {
        const list = await res.json();
        if (list.length > 0) setActiveContract(list[0]);
      }
    } finally {
      setLoading(false);
    }
  }, [publishedProject, setActiveContract]);

  useEffect(() => {
    fetchContract();
    const t = setInterval(fetchContract, 4000);
    return () => clearInterval(t);
  }, [fetchContract]);

  if (!acceptedBid) {
    return (
      <div className="flex flex-col items-center justify-center py-24 space-y-4 text-[#727785]">
        <span className="material-symbols-outlined text-5xl">pending</span>
        <p className="font-bold text-lg text-[#131b2e]">No bid selected yet</p>
        <button onClick={() => setActivePage('quotations')} className="text-xs font-bold text-[#0058be] underline cursor-pointer">
          ← Go to Bids
        </button>
      </div>
    );
  }

  // Contract confirmed
  if (activeContract) {
    return (
      <div className="space-y-6 max-w-3xl mx-auto">
        {/* Confirmation banner */}
        <div className="p-6 bg-[#6cf8bb]/20 border border-[#006c49]/40 rounded-3xl text-center space-y-2">
          <span className="material-symbols-outlined text-5xl text-[#006c49]">task_alt</span>
          <h2 className="font-display text-2xl font-bold text-[#006c49]">Project Confirmed!</h2>
          <p className="text-sm text-[#424754]">
            Mutual agreement reached. Construction contract is now active.
          </p>
        </div>

        {/* Contract card */}
        <div className="bg-white p-6 rounded-3xl border border-[#c2c6d6]/30 shadow-lg space-y-4">
          <div className="flex justify-between items-start">
            <div>
              <span className="text-xs font-bold text-[#0058be] uppercase tracking-widest block mb-1">
                Construction Contract
              </span>
              <h3 className="font-display text-xl font-bold text-[#131b2e]">
                {activeContract.id}
              </h3>
              <p className="text-xs text-[#727785] mt-0.5">
                Confirmed {new Date(activeContract.confirmedAt).toLocaleString()}
              </p>
            </div>
            <span className="px-3 py-1 bg-[#6cf8bb]/40 text-[#006c49] rounded-full text-xs font-bold uppercase">
              Active
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs">
            {[
              { label: 'Contractor',  value: activeContract.companyName },
              { label: 'Owner',       value: activeContract.ownerName },
              { label: 'Total Cost',  value: `₹${Number(activeContract.totalCost).toLocaleString('en-IN')}` },
              { label: 'Timeline',    value: activeContract.timeline },
              { label: 'Material',    value: `₹${Number(activeContract.materialCost).toLocaleString('en-IN')}` },
              { label: 'Labour',      value: `₹${Number(activeContract.labourCost).toLocaleString('en-IN')}` },
            ].map(({ label, value }) => (
              <div key={label} className="p-3 bg-[#f2f3ff] rounded-xl">
                <span className="text-[#727785] block">{label}</span>
                <span className="font-bold text-[#131b2e]">{value}</span>
              </div>
            ))}
          </div>

          {/* Milestone progress */}
          <div>
            <h4 className="font-bold text-sm text-[#131b2e] mb-3">Construction Milestones</h4>
            <div className="space-y-2">
              {activeContract.milestones?.map((ms, i) => (
                <div key={i} className="flex items-center gap-3 text-xs">
                  <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0 ${
                    ms.status === 'completed' ? 'bg-[#006c49] text-white' :
                    ms.status === 'active'    ? 'bg-[#0058be] text-white' :
                    'bg-[#c2c6d6]/40 text-[#727785]'
                  }`}>{i + 1}</span>
                  <span className={`flex-1 font-medium ${ms.status === 'completed' ? 'line-through text-[#727785]' : 'text-[#131b2e]'}`}>
                    {ms.phase}
                  </span>
                  <span className="text-[#727785]">{ms.pct}%</span>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                    ms.status === 'completed' ? 'bg-[#6cf8bb]/40 text-[#006c49]' :
                    ms.status === 'active'    ? 'bg-[#eaedff] text-[#0058be]' :
                    'bg-[#f2f3ff] text-[#727785]'
                  }`}>{ms.status}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <button
              onClick={() => setActivePage('constructionTracking')}
              className="flex-1 py-3 bg-[#0058be] text-white rounded-xl text-xs font-bold hover:bg-[#004395] cursor-pointer"
            >
              Track Construction Progress
            </button>
            <button
              onClick={() => setActivePage('userPayments')}
              className="flex-1 py-3 bg-[#f2f3ff] text-[#131b2e] rounded-xl text-xs font-bold hover:bg-[#eaedff] cursor-pointer border border-[#c2c6d6]/30"
            >
              View Payment Schedule
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Awaiting contractor confirmation
  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <div className="bg-white p-8 rounded-3xl border border-[#c2c6d6]/30 shadow-lg text-center space-y-4">
        <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto">
          <span className="material-symbols-outlined text-3xl text-amber-600">pending</span>
        </div>
        <div>
          <h2 className="font-display text-xl font-bold text-[#131b2e]">
            Awaiting Contractor Confirmation
          </h2>
          <p className="text-sm text-[#727785] mt-2">
            You selected <strong>{acceptedBid.companyName}</strong>. The contractor is reviewing your acceptance.
          </p>
        </div>

        {/* Selected bid summary */}
        <div className="p-4 bg-[#f2f3ff] rounded-2xl text-xs space-y-2 text-left">
          <div className="flex justify-between">
            <span className="text-[#727785]">Contractor</span>
            <span className="font-bold">{acceptedBid.companyName}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#727785]">Total Bid</span>
            <span className="font-bold text-[#006c49]">₹{acceptedBid.totalCost.toLocaleString('en-IN')}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#727785]">Timeline</span>
            <span className="font-bold">{acceptedBid.timeline}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#727785]">Status</span>
            <span className="font-bold text-amber-700 uppercase">{acceptedBid.status}</span>
          </div>
        </div>

        <div className="flex items-center gap-2 justify-center text-xs text-[#727785]">
          <span className="w-2 h-2 bg-amber-400 rounded-full animate-pulse" />
          Auto-refreshing every 4 seconds
          {loading && <span className="material-symbols-outlined text-sm animate-spin">progress_activity</span>}
        </div>

        <button
          onClick={fetchContract}
          className="px-6 py-2.5 bg-[#f2f3ff] text-[#131b2e] rounded-xl text-xs font-bold hover:bg-[#eaedff] cursor-pointer border border-[#c2c6d6]/30"
        >
          Check Now
        </button>
      </div>

      {error && (
        <div className="p-4 bg-[#ffdad6] border border-[#ba1a1a]/30 rounded-2xl text-xs text-[#ba1a1a]">
          {error}
        </div>
      )}
    </div>
  );
}
