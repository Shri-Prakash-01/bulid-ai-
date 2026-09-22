import React from 'react';

export default function Sidebar({ userRole, activePage, setActivePage, onLogout }) {
  const userNavItems = [
    { id: 'userDashboard', label: '01. Dashboard', icon: 'dashboard' },
    { id: 'createProject', label: '02. Setup Project', icon: 'add_home' },
    { id: 'costEstimation', label: '03. Cost Estimation ML', icon: 'analytics' },
    { id: 'imageGen', label: '04. AI Layout & Interior', icon: 'palette' },
    { id: 'findContractor', label: '05. Find Contractor', icon: 'badge' },
    { id: 'quotations', label: '06. Quotations & RFQ', icon: 'request_quote' },
    { id: 'loanFeasibility', label: '07. Loan Feasibility ML', icon: 'account_balance_wallet' },
    { id: 'constructionTracking', label: '08. Track Construction', icon: 'foundation' },
    { id: 'userPayments', label: '09. Payments Release', icon: 'payments' },
  ];

  const contractorNavItems = [
    { id: 'contractorDashboard', label: '01. Contractor Dashboard', icon: 'dashboard' },
    { id: 'businessProfile', label: '02. Business Profile', icon: 'domain' },
    { id: 'verificationCenter', label: '03. Verification Center', icon: 'verified_user' },
    { id: 'projectRequests', label: '04. Project Requests (RFQs)', icon: 'outbox' },
    { id: 'quotationBuilder', label: '05. Quotation Builder', icon: 'post_add' },
    { id: 'contractorProjects', label: '06. My Active Projects', icon: 'foundation' },
    { id: 'progressUpdate', label: '07. Daily Site Update', icon: 'photo_camera' },
    { id: 'materialManagement', label: '08. Material Inventory', icon: 'inventory' },
    { id: 'labourManagement', label: '09. Labour Attendance', icon: 'groups' },
    { id: 'contractorPayments', label: '10. Milestone Payments', icon: 'payments' },
  ];

  const adminNavItems = [
    { id: 'adminDashboard', label: '01. Admin Dashboard', icon: 'space_dashboard' },
    { id: 'userManagement', label: '02. User Management', icon: 'manage_accounts' },
    { id: 'contractorManagement', label: '03. Contractor Verification', icon: 'engineering' },
    { id: 'adminProjects', label: '04. Project Management', icon: 'source' },
    { id: 'costAdmin', label: '05. Rate Master Config', icon: 'query_stats' },
    { id: 'contractorMatchingAdmin', label: '06. Contractor Matching', icon: 'hub' },
    { id: 'rfqAdmin', label: '07. RFQ & Quote Monitor', icon: 'request_quote' },
    { id: 'constructionAdmin', label: '08. Construction Monitor', icon: 'domain_verification' },
    { id: 'inspectionAdmin', label: '09. QA & Inspection', icon: 'rule' },
    { id: 'paymentAdmin', label: '10. Payment & Escrow', icon: 'account_balance' },
    { id: 'aiControlCenter', label: '11. AI / ML Control Center', icon: 'psychology' },
    { id: 'aiJobsAdmin', label: '12. AI Jobs & Datasets', icon: 'view_kanban' },
    { id: 'complaintsDisputes', label: '14. Complaints & Disputes', icon: 'gavel' },
    { id: 'auditLogs', label: '19. Audit Trail & Health', icon: 'terminal' },
  ];

  let items = userNavItems;
  let portalTitle = 'Homeowner Portal';
  let badgeClass = 'bg-[#0058be] text-white';

  if (userRole === 'contractor') {
    items = contractorNavItems;
    portalTitle = 'Contractor Portal';
    badgeClass = 'bg-[#006c49] text-white';
  } else if (userRole === 'admin') {
    items = adminNavItems;
    portalTitle = 'Platform Admin HQ';
    badgeClass = 'bg-[#4648d4] text-white';
  }

  return (
    <aside class="w-64 bg-white border-r border-[#c2c6d6]/30 min-h-screen flex flex-col p-4 shadow-sm select-none">
      {/* Brand & Portal Label */}
      <div class="mb-6 px-2">
        <div class="flex items-center gap-2 mb-2">
          <span class="material-symbols-outlined text-[#0058be] text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>
            construction
          </span>
          <span class="font-display font-extrabold text-xl text-[#0058be]">BUILD AI</span>
        </div>
        <span class={`inline-block text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${badgeClass}`}>
          {portalTitle}
        </span>
      </div>

      {/* Navigation List */}
      <nav class="flex-1 space-y-1 overflow-y-auto custom-scrollbar pr-1">
        {items.map((item) => {
          const isActive = activePage === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActivePage(item.id)}
              class={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium text-xs transition-all cursor-pointer text-left ${
                isActive
                  ? 'bg-[#0058be] text-white font-bold shadow-md'
                  : 'text-[#424754] hover:bg-[#eaedff] hover:text-[#0058be]'
              }`}
            >
              <span class="material-symbols-outlined text-lg">{item.icon}</span>
              <span class="truncate">{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Logout button at bottom */}
      <div class="pt-4 border-t border-[#c2c6d6]/20 mt-2">
        <button
          onClick={onLogout}
          class="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold text-[#ba1a1a] hover:bg-[#ffdad6]/40 transition-colors cursor-pointer"
        >
          <span class="material-symbols-outlined text-lg">logout</span>
          <span>Sign Out Account</span>
        </button>
      </div>
    </aside>
  );
}
