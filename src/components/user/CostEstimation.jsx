import React, { useState, useEffect } from 'react';
import { predictCostAndOutcome } from '../../services/openrouterService';

export default function CostEstimation({ projectData, roomData = {}, setActivePage, onEstimateReady }) {
  const [aiResult, setAiResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const runPrediction = async () => {
    setLoading(true);
    setError('');
    try {
      const result = await predictCostAndOutcome({
        propertyData: {
          length:           Number(projectData.length)  || 40,
          width:            Number(projectData.width)   || 60,
          city:             projectData.city            || 'Palo Alto',
          state:            projectData.state           || 'CA',
          zip:              projectData.zip             || '',
          facing:           projectData.facing          || 'E',
          floors:           Number(projectData.floors)  || 1,
          constructionType: projectData.constructionType || 'Premium',
          budget:           Number(projectData.budget)  || 3750000,
        },
        roomData: {
          bedrooms:   Number(roomData.bedrooms   ?? 3),
          bathrooms:  Number(roomData.bathrooms  ?? 2),
          kitchen:    Number(roomData.kitchen    ?? 1),
          livingRoom: Number(roomData.livingRoom ?? 1),
          diningRoom: Number(roomData.diningRoom ?? 1),
          poojaRoom:  Number(roomData.poojaRoom  ?? 1),
          storeRoom:  Number(roomData.storeRoom  ?? 1),
          balcony:    Number(roomData.balcony    ?? 2),
        },
        styleData: {
          interiorStyle: projectData.constructionType || 'Premium',
          budget:        Number(projectData.budget)   || 3750000,
          features:      projectData.features         || [],
        },
      });
      setAiResult(result);
      if (onEstimateReady) onEstimateReady(result);
    } catch (err) {
      setError(err.message || 'Prediction failed.');
    } finally {
      setLoading(false);
    }
  };

  // Auto-call API as soon as page loads
  useEffect(() => {
    runPrediction();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="space-y-6">
      {/* Loading */}
      {loading && (
        <div className="flex items-center gap-3 p-5 bg-[#eaedff] rounded-2xl border border-[#0058be]/20">
          <span className="material-symbols-outlined text-[#0058be] animate-spin">progress_activity</span>
          <div>
            <p className="text-sm font-bold text-[#0058be]">AI is predicting your cost estimate…</p>
            <p className="text-xs text-[#727785] mt-0.5">
              {projectData.city} · {projectData.constructionType} · ₹{Number(projectData.budget || 3750000).toLocaleString('en-IN')}
            </p>
          </div>
        </div>
      )}

      {/* Error */}
      {error && !loading && (
        <div className="flex items-center gap-3 p-4 bg-[#ffdad6] border border-[#ba1a1a]/30 rounded-2xl text-xs text-[#ba1a1a]">
          <span className="material-symbols-outlined text-base">error</span>
          <span className="flex-1">{error}</span>
          <button onClick={runPrediction} className="font-bold underline cursor-pointer">Retry</button>
        </div>
      )}

      {/* Result */}
      {aiResult && !loading && (
        <div className="space-y-4">
          {/* Source badge */}
          <div className="flex justify-between items-center p-4 bg-white rounded-2xl border border-[#c2c6d6]/30 shadow-sm">
            <div>
              <p className="text-xs font-bold text-[#0058be] uppercase tracking-widest">
                USER PAGE 03 — AI COST ESTIMATION
              </p>
              <h2 className="font-display text-2xl font-bold text-[#131b2e] mt-1">
                AI Construction Cost Estimate
              </h2>
              <p className="text-xs text-[#727785] mt-0.5">
                {aiResult.source} · {projectData.city} · {Number(aiResult.totalAreaSqFt || 0).toLocaleString('en-IN')} sq.ft
              </p>
            </div>
            <div className="flex flex-col items-end gap-2">
              <span className={`px-3 py-1 rounded-full text-[10px] font-bold ${
                aiResult.usedOpenRouter
                  ? 'bg-[#6cf8bb]/50 text-[#006c49]'
                  : 'bg-amber-100 text-amber-700'
              }`}>
                {aiResult.usedOpenRouter ? '✦ Live OpenRouter AI' : '● Local Fallback'}
              </span>
              <button
                onClick={runPrediction}
                className="px-3 py-1.5 bg-[#0058be] text-white rounded-xl text-xs font-bold hover:bg-[#004395] transition-all cursor-pointer flex items-center gap-1"
              >
                <span className="material-symbols-outlined text-sm">refresh</span>
                Re-run
              </button>
            </div>
          </div>

          {/* Key numbers */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-5 bg-white rounded-2xl border border-[#c2c6d6]/30 shadow-sm">
              <span className="text-xs text-[#727785] uppercase font-bold block mb-1">Estimated Cost</span>
              <span className="font-display text-3xl font-bold text-[#0058be]">
                ₹{Number(aiResult.estimatedCost || 0).toLocaleString('en-IN')}
              </span>
            </div>
            <div className="p-5 bg-white rounded-2xl border border-[#c2c6d6]/30 shadow-sm">
              <span className="text-xs text-[#727785] uppercase font-bold block mb-1">Timeline</span>
              <span className="font-display text-3xl font-bold text-[#131b2e]">
                {aiResult.timelineMonths || '—'} <small className="text-sm font-normal text-[#727785]">months</small>
              </span>
            </div>
            <div className="p-5 bg-white rounded-2xl border border-[#c2c6d6]/30 shadow-sm">
              <span className="text-xs text-[#727785] uppercase font-bold block mb-1">Built-up Area</span>
              <span className="font-display text-3xl font-bold text-[#131b2e]">
                {Number(aiResult.totalAreaSqFt || 0).toLocaleString('en-IN')} <small className="text-sm font-normal text-[#727785]">sq.ft</small>
              </span>
            </div>
          </div>

          {/* Cost breakdown */}
          {aiResult.breakdown && (
            <div className="p-5 bg-white rounded-2xl border border-[#c2c6d6]/30 shadow-sm space-y-3">
              <h3 className="font-bold text-sm text-[#131b2e]">Cost Breakdown</h3>
              {Object.entries(aiResult.breakdown).map(([key, val]) => {
                const total = Object.values(aiResult.breakdown).reduce((a, b) => a + Number(b), 0);
                const pct   = total > 0 ? Math.round((Number(val) / total) * 100) : 0;
                return (
                  <div key={key} className="flex items-center gap-3 text-xs">
                    <span className="w-24 font-bold text-[#424754] capitalize">{key}</span>
                    <div className="flex-1 bg-[#f2f3ff] rounded-full h-2 overflow-hidden">
                      <div className="bg-[#0058be] h-2 rounded-full" style={{ width: `${pct}%` }} />
                    </div>
                    <span className="w-28 text-right font-bold text-[#131b2e]">
                      ₹{Number(val).toLocaleString('en-IN')}
                    </span>
                    <span className="w-8 text-right text-[#727785]">{pct}%</span>
                  </div>
                );
              })}
            </div>
          )}

          {/* Recommendation */}
          {aiResult.recommendation && (
            <div className="p-4 bg-[#eaedff] border border-[#0058be]/20 rounded-2xl text-sm text-[#131b2e]">
              <span className="font-bold text-[#0058be] block mb-1">AI Recommendation</span>
              {aiResult.recommendation}
            </div>
          )}

          {/* BOM highlight */}
          {aiResult.bomHighlight && (
            <div className="p-4 bg-[#6cf8bb]/20 border border-[#006c49]/20 rounded-2xl text-sm text-[#131b2e]">
              <span className="font-bold text-[#006c49] block mb-1">BOM Highlight</span>
              {aiResult.bomHighlight}
            </div>
          )}

          {/* Environmental risks */}
          {aiResult.environmentalRisks && Object.keys(aiResult.environmentalRisks).length > 0 && (
            <div className="p-4 bg-white rounded-2xl border border-[#c2c6d6]/30 shadow-sm">
              <span className="font-bold text-sm text-[#131b2e] block mb-3">Environmental Risk Assessment</span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {Object.entries(aiResult.environmentalRisks).map(([key, val]) => {
                  const color = {
                    LOW:      'bg-[#6cf8bb]/30 text-[#006c49]',
                    NONE:     'bg-[#6cf8bb]/30 text-[#006c49]',
                    OPTIMAL:  'bg-[#6cf8bb]/30 text-[#006c49]',
                    MODERATE: 'bg-amber-100 text-amber-700',
                    HIGH:     'bg-[#ffdad6] text-[#ba1a1a]',
                  }[val?.toUpperCase()] || 'bg-[#f2f3ff] text-[#424754]';
                  return (
                    <div key={key} className={`px-3 py-2 rounded-xl text-center ${color}`}>
                      <span className="font-bold text-[10px] uppercase block">{key}</span>
                      <span className="font-bold text-xs">{val}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Navigate to Bidding */}
          <div className="flex justify-end gap-3">
            <button
              onClick={() => setActivePage('publishBidding')}
              className="px-8 py-3.5 bg-[#006c49] text-white rounded-xl text-xs font-bold shadow-md hover:bg-[#005236] transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined text-sm">campaign</span>
              Publish for Bidding
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
