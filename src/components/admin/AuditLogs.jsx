import React from 'react';

export default function AuditLogs() {
  const auditEntries = [
    { id: 'LOG-991', admin: 'SuperAdmin HQ', action: 'Update Rate Master Multipliers', resource: 'Cost Estimation ML Rate Master', timestamp: '23:04:35', ip: '192.168.1.1' },
    { id: 'LOG-992', admin: 'SuperAdmin HQ', action: 'Approve Contractor Verification', resource: 'Contractor #CTR-201 (Apex)', timestamp: '23:04:18', ip: '192.168.1.1' },
    { id: 'LOG-993', admin: 'System Auto', action: 'Immutable Ledger Checksum Verified', resource: 'Escrow Milestone Payments', timestamp: '23:00:00', ip: '127.0.0.1' }
  ];

  return (
    <div class="space-y-6">
      <div class="bg-white p-6 rounded-3xl border border-[#c2c6d6]/30 shadow-sm space-y-1">
        <span class="text-xs font-bold text-[#4648d4] uppercase tracking-widest">Admin Page 19 — Immutable Audit Log</span>
        <h2 class="font-display text-2xl font-bold text-[#131b2e]">Platform Audit Trail & Security Health</h2>
        <p class="text-xs text-[#727785]">Immutable audit log of all sensitive admin modifications, rate updates & RBAC access</p>
      </div>

      <div class="bg-[#131b2e] text-emerald-400 p-6 rounded-3xl font-mono text-xs shadow-2xl space-y-3 border border-slate-700">
        <p class="text-slate-400">// Build AI Platform Security Audit Stream & Immutable Ledger</p>
        {auditEntries.map((l) => (
          <div key={l.id} class="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-1">
            <div class="flex justify-between text-amber-400 font-bold">
              <span>{l.id} • {l.action}</span>
              <span>{l.timestamp}</span>
            </div>
            <p class="text-slate-300">Admin: {l.admin} | Resource: {l.resource} | IP: {l.ip}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
