import React, { useState, useEffect } from 'react';

const API = 'http://localhost:5050';

export default function ProjectRequests({ setActivePage, currentUser, setSelectedProject }) {
  const [projects, setProjects]   = useState([]);
  const [loading,  setLoading]    = useState(false);
  const [error,    setError]      = useState('');

  const fetchProjects = async () => {
    setLoading(true); setError('');
    try {
      const res = await fetch(`${API}/api/projects`);
      if (!res.ok) throw new Error('Failed to fetch projects');
      const all = await res.json();
      // Show only open projects
      setProjects(all.filter(p => p.status === 'open'));
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchProjects(); }, []);

  const handleBidOnProject = (project) => {
    setSelectedProject(project);
    setActivePage('quotationBuilder');
  };

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-3xl border border-[#c2c6d6]/30 shadow-sm">
        <div>
          <span className="text-xs font-bold text-[#006c49] uppercase tracking-widest block mb-1">
            Contractor Page 04 — Open Projects
          </span>
          <h2 className="font-display text-2xl font-bold text-[#131b2e]">
            Open Projects for Bidding
          </h2>
          <p className="text-xs text-[#727785] mt-0.5">
            {projects.length} project{projects.length !== 1 ? 's' : ''} open for bids
          </p>
        </div>
        <button
          onClick={fetchProjects}
          disabled={loading}
          className="px-4 py-2.5 bg-[#f2f3ff] text-[#131b2e] rounded-xl text-xs font-bold hover:bg-[#eaedff] cursor-pointer flex items-center gap-1 disabled:opacity-50"
        >
          <span className="material-symbols-outlined text-sm">refresh</span>
          {loading ? 'Loading…' : 'Refresh'}
        </button>
      </div>

      {error && (
        <div className="p-4 bg-[#ffdad6] border border-[#ba1a1a]/30 rounded-2xl text-xs text-[#ba1a1a] flex items-center gap-2">
          <span className="material-symbols-outlined text-base">error</span>
          {error}
        </div>
      )}

      {/* No projects */}
      {!loading && projects.length === 0 && !error && (
        <div className="bg-white p-12 rounded-3xl border border-[#c2c6d6]/30 text-center space-y-3 text-[#727785]">
          <span className="material-symbols-outlined text-5xl">search_off</span>
          <p className="font-bold text-base text-[#131b2e]">No open projects right now</p>
          <p className="text-xs">New projects will appear here when homeowners publish for bidding.</p>
        </div>
      )}

      {/* Project cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {projects.map((project) => {
          const pd         = project.projectData || {};
          const plotArea   = (Number(pd.length) || 40) * (Number(pd.width) || 60);
          const builtUp    = Math.round(plotArea * (1.2 + (Number(pd.floors) || 1) * 0.45));
          const aiEstimate = project.aiEstimate;

          return (
            <div key={project.id} className="bg-white p-5 rounded-3xl border border-[#c2c6d6]/30 shadow-lg space-y-4">
              {/* Title & status */}
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-bold text-base text-[#131b2e]">{project.title}</p>
                  <p className="text-xs text-[#727785]">ID: {project.id} · by {project.ownerName}</p>
                </div>
                <span className="px-2 py-0.5 bg-[#6cf8bb]/40 text-[#006c49] rounded-full text-[10px] font-bold uppercase">
                  {project.status}
                </span>
              </div>

              {/* Key specs */}
              <div className="grid grid-cols-2 gap-2 text-xs">
                {[
                  { label: 'Location',    value: `${pd.city || '—'}, ${pd.state || ''}` },
                  { label: 'Built-up',    value: `${builtUp.toLocaleString()} sq.ft` },
                  { label: 'Floors',      value: `G + ${pd.floors || 1}` },
                  { label: 'Quality',     value: pd.constructionType || '—' },
                  { label: 'Owner Budget',value: `₹${Number(pd.budget || 0).toLocaleString('en-IN')}` },
                  { label: 'AI Estimate', value: aiEstimate?.estimatedCost
                      ? `₹${Number(aiEstimate.estimatedCost).toLocaleString('en-IN')}`
                      : 'Not available' },
                ].map(({ label, value }) => (
                  <div key={label} className="p-2.5 bg-[#f2f3ff] rounded-xl">
                    <span className="text-[#727785] block text-[10px]">{label}</span>
                    <span className="font-bold text-[#131b2e]">{value}</span>
                  </div>
                ))}
              </div>

              {/* Room summary */}
              {project.roomData && (
                <div className="p-2.5 bg-[#eaedff] rounded-xl text-[10px] text-[#424754]">
                  <span className="font-bold text-[#0058be] block mb-0.5">Rooms</span>
                  {Object.entries(project.roomData)
                    .filter(([, v]) => Number(v) > 0)
                    .map(([k, v]) => `${k}: ${v}`)
                    .join(' · ')}
                </div>
              )}

              {/* AI recommendation */}
              {aiEstimate?.recommendation && (
                <p className="text-[10px] text-[#727785] italic line-clamp-2">
                  "{aiEstimate.recommendation}"
                </p>
              )}

              <div className="flex justify-between items-center text-[10px] text-[#727785]">
                <span>Published {new Date(project.publishedAt).toLocaleDateString()}</span>
              </div>

              <button
                onClick={() => handleBidOnProject(project)}
                className="w-full py-3 bg-[#006c49] text-white rounded-xl text-xs font-bold hover:bg-[#005236] transition-all cursor-pointer flex items-center justify-center gap-2 shadow-md"
              >
                <span className="material-symbols-outlined text-sm">gavel</span>
                Submit Bid for This Project
              </button>
            </div>
          );
        })}
      </div>

      {/* Check pending bid */}
      <div className="bg-white p-4 rounded-2xl border border-[#c2c6d6]/30 flex items-center justify-between">
        <div>
          <p className="font-bold text-sm text-[#131b2e]">Have a pending bid?</p>
          <p className="text-xs text-[#727785]">Check if a homeowner has selected your bid and confirm acceptance.</p>
        </div>
        <button
          onClick={() => setActivePage('bidAccept')}
          className="px-4 py-2 bg-amber-100 text-amber-700 rounded-xl text-xs font-bold hover:bg-amber-200 cursor-pointer flex items-center gap-1"
        >
          <span className="material-symbols-outlined text-sm">notifications</span>
          Check Bid Status
        </button>
      </div>
    </div>
  );
}
