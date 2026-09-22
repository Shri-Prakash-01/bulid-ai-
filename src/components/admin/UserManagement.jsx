import React, { useState } from 'react';

export default function UserManagement() {
  const [users, setUsers] = useState([
    { id: 'USR-101', name: 'Rajesh Sharma', email: 'rajesh.homeowner@buildai.com', projects: 2, status: 'Active' },
    { id: 'USR-102', name: 'Elena Rostova', email: 'elena.r@techcorp.com', projects: 1, status: 'Active' },
    { id: 'USR-103', name: 'David Chen', email: 'david.chen@bayarea.org', projects: 3, status: 'Active' }
  ]);

  const toggleStatus = (id) => {
    setUsers(prev => prev.map(u => u.id === id ? { ...u, status: u.status === 'Active' ? 'Suspended' : 'Active' } : u));
  };

  return (
    <div class="space-y-6">
      <div class="bg-white p-6 rounded-3xl border border-[#c2c6d6]/30 shadow-sm space-y-1">
        <span class="text-xs font-bold text-[#4648d4] uppercase tracking-widest">Admin Page 02 — User Management</span>
        <h2 class="font-display text-2xl font-bold text-[#131b2e]">Homeowner Account Directory</h2>
        <p class="text-xs text-[#727785]">Manage registered homeowners, view created projects, and suspend/activate accounts</p>
      </div>

      <div class="bg-white rounded-3xl p-6 border border-[#c2c6d6]/30 shadow-lg overflow-x-auto">
        <table class="w-full text-left border-collapse">
          <thead>
            <tr class="border-b border-[#c2c6d6]/30 text-xs font-bold text-[#727785] uppercase tracking-wider">
              <th class="py-3 px-3">User ID</th>
              <th class="py-3 px-3">Name</th>
              <th class="py-3 px-3">Email</th>
              <th class="py-3 px-3">Projects</th>
              <th class="py-3 px-3">Status</th>
              <th class="py-3 px-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-[#c2c6d6]/20 text-xs">
            {users.map((u) => (
              <tr key={u.id} class="hover:bg-[#f2f3ff]/60 transition-colors">
                <td class="py-3.5 px-3 font-bold text-[#4648d4]">{u.id}</td>
                <td class="py-3.5 px-3 font-bold text-[#131b2e]">{u.name}</td>
                <td class="py-3.5 px-3 text-[#727785]">{u.email}</td>
                <td class="py-3.5 px-3 font-bold text-[#0058be]">{u.projects} Created</td>
                <td class="py-3.5 px-3">
                  <span class={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                    u.status === 'Active' ? 'bg-[#6cf8bb]/40 text-[#00714d]' : 'bg-[#ffdad6] text-[#ba1a1a]'
                  }`}>
                    {u.status}
                  </span>
                </td>
                <td class="py-3.5 px-3 text-right">
                  <button onClick={() => toggleStatus(u.id)} class="px-3 py-1 bg-[#eaedff] text-[#4648d4] font-bold rounded-lg hover:bg-[#d8e2ff]">
                    {u.status === 'Active' ? 'Suspend' : 'Activate'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
