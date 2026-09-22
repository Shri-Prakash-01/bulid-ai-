import React, { useState } from 'react';

export default function FindContractor({ setActivePage }) {
  const [contractors] = useState([
    {
      id: 1,
      name: 'Apex Constructions & Engineers',
      logo: 'APEX',
      location: 'Palo Alto / San Jose, CA',
      exp: '14 Years Active',
      specialization: 'Luxury Residential & Duplex Villas',
      rating: 4.9,
      reviews: 48,
      status: 'Certified',
      matchScore: 98,
      completed: '34 Projects',
      capacity: 'Available for immediate start'
    },
    {
      id: 2,
      name: 'Skyline Master Builders',
      logo: 'SKY',
      location: 'Mountain View, CA',
      exp: '9 Years Active',
      specialization: 'Modern RCC & Steel Framing',
      rating: 4.7,
      reviews: 32,
      status: 'Verified',
      matchScore: 91,
      completed: '22 Projects',
      capacity: 'Starts next month'
    },
    {
      id: 3,
      name: 'VastuCraft Heritage Housing',
      logo: 'VAS',
      location: 'San Francisco, CA',
      exp: '18 Years Active',
      specialization: 'Vastu-Compliant Villa Construction',
      rating: 4.8,
      reviews: 64,
      status: 'Certified',
      matchScore: 89,
      completed: '58 Projects',
      capacity: 'Available for immediate start'
    }
  ]);

  const [rfqSent, setRfqSent] = useState({});

  const handleSendRfq = (id) => {
    setRfqSent(prev => ({ ...prev, [id]: true }));
    setTimeout(() => {
      setActivePage('quotations');
    }, 1200);
  };

  return (
    <div class="space-y-6">
      {/* Header */}
      <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-3xl border border-[#c2c6d6]/30 shadow-sm">
        <div>
          <span class="text-xs font-bold text-[#0058be] uppercase tracking-widest">
            User Page 06 — Contractor Discovery & Matching
          </span>
          <h2 class="font-display text-2xl font-bold text-[#131b2e]">
            Find & Match Verified Contractors
          </h2>
          <p class="text-xs text-[#727785] mt-0.5">
            AI matched builders based on location, budget, QA performance & cost adherence
          </p>
        </div>

        <button onClick={() => setActivePage('quotations')} class="px-5 py-2.5 bg-[#eaedff] text-[#0058be] font-bold text-xs rounded-xl hover:bg-[#d8e2ff]">
          View Submitted Quotes ➔
        </button>
      </div>

      {/* Contractor Cards */}
      <div class="space-y-4">
        {contractors.map((c) => (
          <div key={c.id} class="glass-card p-6 rounded-3xl bg-white border border-[#c2c6d6]/30 shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div class="flex items-start gap-4">
              <div class="w-14 h-14 rounded-2xl bg-[#0058be] text-white font-bold flex items-center justify-center text-sm shrink-0 shadow-md">
                {c.logo}
              </div>
              <div class="space-y-1">
                <div class="flex items-center gap-2 flex-wrap">
                  <h3 class="font-bold text-base text-[#131b2e] font-display">{c.name}</h3>
                  <span class={`text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase ${
                    c.status === 'Certified' ? 'bg-[#006c49] text-white' : 'bg-[#0058be] text-white'
                  }`}>
                    ✓ {c.status}
                  </span>
                  <span class="text-xs font-bold text-[#006c49] bg-[#6cf8bb]/30 px-2 py-0.5 rounded-full">
                    {c.matchScore}% Match Score
                  </span>
                </div>

                <p class="text-xs text-[#727785]">
                  {c.location} • {c.exp} • {c.completed} Completed
                </p>
                <p class="text-xs text-[#424754] font-medium">
                  Specialization: {c.specialization}
                </p>
                <div class="flex items-center gap-1 text-xs font-bold text-amber-600 pt-1">
                  <span>★ {c.rating}</span>
                  <span class="text-[#727785] font-normal">({c.reviews} reviews)</span>
                </div>
              </div>
            </div>

            <div class="w-full md:w-auto flex flex-col sm:flex-row gap-2">
              <button
                onClick={() => handleSendRfq(c.id)}
                disabled={rfqSent[c.id]}
                class={`px-6 py-3 rounded-xl font-bold text-xs shadow-md transition-all cursor-pointer ${
                  rfqSent[c.id]
                    ? 'bg-[#006c49] text-white'
                    : 'bg-[#0058be] text-white hover:bg-[#004395]'
                }`}
              >
                {rfqSent[c.id] ? '✓ RFQ Sent! Redirecting...' : 'Send RFQ for Quote'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
