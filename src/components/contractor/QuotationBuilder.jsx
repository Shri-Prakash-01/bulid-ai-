import React, { useState, useEffect } from 'react';

const API = 'http://localhost:5050';

export default function QuotationBuilder({
  setActivePage, currentUser, selectedProject, setMyBid
}) {
  const [materialCost, setMaterialCost] = useState(2100000);
  const [labourCost,   setLabourCost]   = useState(1200000);
  const [otherCost,    setOtherCost]    = useState(450000);
  const [timeline,     setTimeline]     = useState('14 Months');
  const [note,         setNote]         = useState('');
  const [submitting,   setSubmitting]   = useState(false);
  const [error,        setError]        = useState('');
  const [projectStatus, setProjectStatus] = useState(null); // live status from backend

  const totalQuote = materialCost + labourCost + otherCost;
  const aiEst      = selectedProject?.aiEstimate;

  // ── Verify project is still open when page loads ───────────────────────────
  useEffect(() => {
    if (!selectedProject?.id) return;
    fetch(`${API}/api/projects/${selectedProject.id}`)
      .then(r => r.ok ? r.json() : null)
      .then(proj => { if (proj) setProjectStatus(proj.status); })
      .catch(() => {});
  }, [selectedProject?.id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedProject) {
      setError('No project selected. Go back to Project Requests and choose a project.');
      return;
    }

    // Re-check live status before submitting
    try {
      const checkRes = await fetch(`${API}/api/projects/${selectedProject.id}`);
      if (checkRes.ok) {
        const proj = await checkRes.json();
        if (proj.status !== 'open') {
          setProjectStatus(proj.status);
          setError(
            proj.status === 'confirmed'
              ? 'This project has already been confirmed with another contractor. Please choose a different open project.'
              : proj.status === 'closed'
              ? 'This project is closed for new bids. The homeowner is reviewing existing bids.'
              : `This project is no longer open (status: ${proj.status}).`
          );
          return;
        }
      }
    } catch { /* proceed — backend check failed, let server validate */ }

    setSubmitting(true); setError('');
    try {
      const res = await fetch(`${API}/api/bids`, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          projectId:      selectedProject.id,
          contractorId:   currentUser?.id   || 'contractor-001',
          contractorName: currentUser?.name || 'Contractor',
          companyName:    currentUser?.company || currentUser?.name || 'Contractor Co.',
          materialCost,
          labourCost,
          otherCost,
          timeline,
          note
        })
      });
      if (!res.ok) throw new Error(await res.text());
      const bid = await res.json();
      setMyBid(bid);
      setActivePage('bidAccept');   // go to bid status page
    } catch (e) {
      setError(e.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6 max-w-3xl mx-auto">

      {/* Header */}
      <div className="bg-white p-6 rounded-3xl border border-[#c2c6d6]/30 shadow-sm space-y-1">
        <span className="text-xs font-bold text-[#006c49] uppercase tracking-widest">
          Contractor Page 05 — Quotation Builder
        </span>
        <h2 className="font-display text-2xl font-bold text-[#131b2e]">Structured Quotation Builder</h2>
        <p className="text-xs text-[#727785]">
          {selectedProject
            ? `Building quote for: ${selectedProject.title} (${selectedProject.id})`
            : 'No project selected — go to Project Requests first'}
        </p>
      </div>

      {/* Project specs quick view */}
      {selectedProject && (
        <div className={`p-4 rounded-2xl text-xs space-y-2 ${
          projectStatus && projectStatus !== 'open'
            ? 'bg-[#ffdad6] border border-[#ba1a1a]/30'
            : 'bg-[#eaedff]'
        }`}>
          <div className="flex justify-between items-center">
            <span className={`font-bold block ${projectStatus && projectStatus !== 'open' ? 'text-[#ba1a1a]' : 'text-[#0058be]'}`}>
              Project Specs
            </span>
            {projectStatus && (
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                projectStatus === 'open'      ? 'bg-[#6cf8bb]/40 text-[#006c49]' :
                projectStatus === 'confirmed' ? 'bg-[#ffdad6] text-[#ba1a1a]' :
                projectStatus === 'closed'    ? 'bg-amber-100 text-amber-700' :
                'bg-[#f2f3ff] text-[#727785]'
              }`}>
                {projectStatus}
              </span>
            )}
          </div>
          <div className="grid grid-cols-3 gap-2">
            {[
              { label: 'Location', value: `${selectedProject.projectData?.city}, ${selectedProject.projectData?.state}` },
              { label: 'Quality',  value: selectedProject.projectData?.constructionType },
              { label: 'Budget',   value: `₹${Number(selectedProject.projectData?.budget || 0).toLocaleString('en-IN')}` },
              { label: 'Floors',   value: `G + ${selectedProject.projectData?.floors}` },
              { label: 'AI Est.',  value: aiEst?.estimatedCost ? `₹${Number(aiEst.estimatedCost).toLocaleString('en-IN')}` : '—' },
              { label: 'Timeline', value: aiEst?.timelineMonths ? `${aiEst.timelineMonths} mo` : '—' },
            ].map(({ label, value }) => (
              <div key={label} className="p-2 bg-white rounded-xl">
                <span className="text-[#727785] block text-[10px]">{label}</span>
                <span className="font-bold text-[#131b2e]">{value}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Project not open — block submission with clear message */}
      {selectedProject && projectStatus && projectStatus !== 'open' && (
        <div className="p-5 bg-[#ffdad6] border border-[#ba1a1a]/30 rounded-2xl space-y-3">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#ba1a1a] text-xl">block</span>
            <p className="font-bold text-sm text-[#ba1a1a]">This project is no longer open for bids</p>
          </div>
          <p className="text-xs text-[#ba1a1a]">
            {projectStatus === 'confirmed'
              ? 'A contractor has already been confirmed for this project. You cannot submit a bid.'
              : projectStatus === 'closed'
              ? 'The homeowner has closed bidding and is reviewing existing bids.'
              : `Project status: ${projectStatus}`}
          </p>
          <button
            onClick={() => setActivePage('projectRequests')}
            className="px-5 py-2.5 bg-[#006c49] text-white rounded-xl text-xs font-bold hover:bg-[#005236] cursor-pointer"
          >
            ← Browse Open Projects
          </button>
        </div>
      )}

      {error && (
        <div className="p-4 bg-[#ffdad6] border border-[#ba1a1a]/30 rounded-2xl text-xs text-[#ba1a1a] flex items-start gap-2">
          <span className="material-symbols-outlined text-base flex-shrink-0">error</span>
          <div className="flex-1">
            <p>{error}</p>
            {(error.includes('confirmed') || error.includes('closed')) && (
              <button
                onClick={() => setActivePage('projectRequests')}
                className="mt-2 px-4 py-1.5 bg-[#006c49] text-white rounded-lg text-xs font-bold hover:bg-[#005236] cursor-pointer"
              >
                Browse Open Projects →
              </button>
            )}
          </div>
        </div>
      )}

      {/* Quote form */}
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-3xl border border-[#c2c6d6]/30 shadow-lg space-y-5">

        <div className="space-y-4">
          <div>
            <label className="text-xs font-bold text-[#727785] uppercase block mb-1">Material Cost (₹)</label>
            <input
              type="number" value={materialCost}
              onChange={(e) => setMaterialCost(Number(e.target.value))}
              className="w-full p-3 rounded-xl bg-[#f2f3ff] font-bold text-base text-[#131b2e] focus:ring-2 focus:ring-[#006c49] outline-none"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-[#727785] uppercase block mb-1">Labour Cost (₹)</label>
            <input
              type="number" value={labourCost}
              onChange={(e) => setLabourCost(Number(e.target.value))}
              className="w-full p-3 rounded-xl bg-[#f2f3ff] font-bold text-base text-[#131b2e] focus:ring-2 focus:ring-[#006c49] outline-none"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-[#727785] uppercase block mb-1">Overheads & Contingency (₹)</label>
            <input
              type="number" value={otherCost}
              onChange={(e) => setOtherCost(Number(e.target.value))}
              className="w-full p-3 rounded-xl bg-[#f2f3ff] font-bold text-base text-[#131b2e] focus:ring-2 focus:ring-[#006c49] outline-none"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-[#727785] uppercase block mb-1">Proposed Construction Timeline</label>
            <input
              type="text" value={timeline}
              onChange={(e) => setTimeline(e.target.value)}
              className="w-full p-3 rounded-xl bg-[#f2f3ff] font-bold text-sm text-[#131b2e] focus:ring-2 focus:ring-[#006c49] outline-none"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-[#727785] uppercase block mb-1">Note to Homeowner (optional)</label>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="e.g. Price includes all materials as per BOQ. Solar panel installation extra."
              rows={3}
              className="w-full p-3 rounded-xl bg-[#f2f3ff] text-xs text-[#131b2e] focus:ring-2 focus:ring-[#006c49] outline-none resize-none"
            />
          </div>
        </div>

        {/* Total */}
        <div className="p-4 bg-[#6cf8bb]/20 border border-[#006c49]/30 rounded-2xl flex justify-between items-center">
          <span className="font-bold text-sm text-[#00714d]">Total Quoted Price</span>
          <span className="font-display font-bold text-2xl text-[#006c49]">
            ₹{totalQuote.toLocaleString('en-IN')}
          </span>
        </div>

        {/* Comparison with AI estimate */}
        {aiEst?.estimatedCost && (
          <div className="text-xs text-[#727785] text-center">
            AI estimated ₹{Number(aiEst.estimatedCost).toLocaleString('en-IN')} ·
            Your bid is {totalQuote > aiEst.estimatedCost ? '+' : ''}
            {(((totalQuote - aiEst.estimatedCost) / aiEst.estimatedCost) * 100).toFixed(1)}% vs AI
          </div>
        )}

        <button
          type="submit"
          disabled={submitting || !selectedProject || (projectStatus && projectStatus !== 'open')}
          className="w-full py-4 bg-[#006c49] text-white rounded-xl font-bold text-sm shadow-xl hover:bg-[#005236] transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          <span className="material-symbols-outlined">send</span>
          {submitting ? 'Submitting Bid…' :
           projectStatus && projectStatus !== 'open' ? 'Project Not Available' :
           'Submit Bid to Homeowner'}
        </button>
      </form>
    </div>
  );
}
