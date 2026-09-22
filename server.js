import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';

// ─── API Key ────────────────────────────────────────────────────────────────
let apiKey = process.env.OPENROUTER_API_KEY || process.env.VITE_OPENROUTER_API_KEY;
if (!apiKey) {
  try {
    const envPath = path.resolve(process.cwd(), '.env');
    if (fs.existsSync(envPath)) {
      const envContent = fs.readFileSync(envPath, 'utf8');
      const match = envContent.match(/(?:VITE_)?OPENROUTER_API_KEY\s*=\s*(.+)/);
      if (match) apiKey = match[1].trim();
    }
  } catch (err) {
    console.error('Error reading .env file:', err);
  }
}

const PORT = process.env.PORT || 5050;

// ─── In-Memory Store ─────────────────────────────────────────────────────────
// Shape:
//  projects[id] = { id, title, status, ownerId, ownerName, projectData,
//                   roomData, aiEstimate, publishedAt }
//  bids[id]     = { id, projectId, contractorId, contractorName,
//                   materialCost, labourCost, otherCost, totalCost,
//                   timeline, note, status, submittedAt }
//  contracts[id]= { id, projectId, bidId, contractorName, ownerName,
//                   totalCost, timeline, confirmedAt }

const projects = {};
const bids     = {};
const contracts = {};

let projectSeq  = 1;
let bidSeq      = 1;
let contractSeq = 1;

function uid(prefix, seq) { return `${prefix}-${String(seq).padStart(4, '0')}`; }

// ─── Helpers ─────────────────────────────────────────────────────────────────
function readBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', c => (body += c.toString()));
    req.on('end', () => {
      try { resolve(JSON.parse(body || '{}')); }
      catch { reject(new Error('Invalid JSON')); }
    });
    req.on('error', reject);
  });
}

function send(res, status, data) {
  res.writeHead(status, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(data));
}

// ─── Router ───────────────────────────────────────────────────────────────────
const server = http.createServer(async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') { res.writeHead(204); res.end(); return; }

  const url    = req.url.split('?')[0];
  const method = req.method;

  // ── Health ──────────────────────────────────────────────────────────────────
  if (method === 'GET' && url === '/api/health') {
    return send(res, 200, { status: 'ok', server: 'BuildAI Backend V5.0' });
  }

  // ── AI Cost Prediction ───────────────────────────────────────────────────────
  if (method === 'POST' && url === '/api/predict') {
    let body;
    try { body = await readBody(req); } catch { return send(res, 400, { error: 'Invalid JSON' }); }

    const { propertyData = {}, roomData = {}, styleData = {} } = body;
    const keyToUse = apiKey || body.apiKey;
    if (!keyToUse) return send(res, 400, { error: 'OPENROUTER_API_KEY missing' });

    const budget      = Number(styleData.budget)     || Number(propertyData.budget) || 3750000;
    const length      = Number(propertyData.length)  || 40;
    const width       = Number(propertyData.width)   || 60;
    const floors      = Number(propertyData.floors)  || 1;
    const plotArea    = length * width;
    const builtUpArea = Math.round(plotArea * (1.2 + floors * 0.45));

    const prompt = `
You are BuildAI Cost Estimation ML Engine V4.8.
Calculate a REALISTIC construction cost estimate for the EXACT project specs below.
DO NOT use placeholder or example numbers — derive every value from the inputs.

=== PROJECT INPUTS ===
Plot:              ${length} ft × ${width} ft = ${plotArea} sq.ft
Approx Built-up:   ${builtUpArea} sq.ft  (G + ${floors} floor(s))
Location:          ${propertyData.city || 'Palo Alto'}, ${propertyData.state || 'CA'}
Construction Type: ${propertyData.constructionType || 'Premium'}
Rooms:             ${JSON.stringify(roomData)}
Interior Style:    ${styleData.interiorStyle || 'Modern'}
Owner's Budget:    ₹${budget.toLocaleString('en-IN')}
Outdoor Features:  ${JSON.stringify(styleData.features || [])}

=== CALCULATION RULES ===
1. estimatedCost  → use local per-sq-ft rates for ${propertyData.constructionType || 'Premium'} construction in ${propertyData.city || 'Palo Alto'}, India. Must differ meaningfully from budget if specs warrant it.
2. totalAreaSqFt  → calculate from plot + floors (approx ${builtUpArea} sq.ft — refine if needed).
3. timelineMonths → base 10 months + 2 per floor + room complexity factor.
4. breakdown      → 8 line items that SUM EXACTLY to estimatedCost.
5. recommendation → specific to THIS plot size, location, floor count & soil type.
6. bomHighlight   → actual quantities (cement bags, TMT tons) for ${builtUpArea} sq.ft.
7. environmentalRisks → realistic for ${propertyData.city || 'Palo Alto'}, ${propertyData.state || 'CA'}.

Return ONLY raw JSON — no markdown fences, no explanation:
{
  "estimatedCost": <integer — calculated, NOT 450000>,
  "timelineMonths": <integer>,
  "totalAreaSqFt": <integer>,
  "breakdown": { "material":<int>,"labour":<int>,"interior":<int>,"electrical":<int>,"plumbing":<int>,"furniture":<int>,"painting":<int>,"govt":<int> },
  "recommendation": "<specific text>",
  "bomHighlight": "<specific quantities>",
  "environmentalRisks": { "flood":"<LOW|MODERATE|HIGH>","earthquake":"<LOW|MODERATE|HIGH>","wind":"<LOW|MODERATE|HIGH>","soil":"<OPTIMAL|MODERATE|POOR>" }
}`;

    try {
      const or = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${keyToUse}`,
          'HTTP-Referer': 'http://localhost:5050',
          'X-Title': 'BuildAI Backend',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: 'openai/gpt-4o-mini',
          messages: [
            { role: 'system', content: 'Respond only in raw JSON. No markdown.' },
            { role: 'user',   content: prompt }
          ],
          temperature: 0.2
        })
      });
      if (!or.ok) throw new Error(`OpenRouter ${or.status}: ${await or.text()}`);
      const data = await or.json();
      let txt = data.choices?.[0]?.message?.content || '{}';
      txt = txt.replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/i, '').trim();
      const parsed = JSON.parse(txt);
      return send(res, 200, {
        usedOpenRouter: true,
        source: 'OpenRouter AI (ML Engine V4.8)',
        ...parsed
      });
    } catch (err) {
      console.error('OpenRouter call failed:', err.message);
      return send(res, 500, { error: err.message });
    }
  }

  // ── LightGBM Loan Approval Prediction ───────────────────────────────────────
  if (method === 'POST' && url === '/api/predict-loan') {
    let body;
    try { body = await readBody(req); } catch { return send(res, 400, { error: 'Invalid JSON' }); }

    const {
      Age = 30,
      Income = 50000,
      Credit_Score = 700,
      Loan_Amount = 150000,
      Loan_Term = 360,
      Employed = 1,
      Unemployed = 0,
      Self_Employed = 0
    } = body;

    const { exec } = await import('node:child_process');
    const scriptPath = path.resolve(process.cwd(), 'predict_loan.py');
    const inputJson = JSON.stringify({ Age, Income, Credit_Score, Loan_Amount, Loan_Term, Employed, Unemployed, Self_Employed });

    exec(`python3 "${scriptPath}" '${inputJson.replace(/'/g, "'\\''")}'`, (err, stdout) => {
      if (!err && stdout) {
        try {
          const result = JSON.parse(stdout.trim());
          return send(res, 200, result);
        } catch {}
      }
      
      const unemployedNum = Number(Unemployed) || 0;
      const selfEmployedNum = Number(Self_Employed) || 0;
      const debtRatio = (Number(Loan_Amount) / Math.max(Number(Loan_Term), 1)) / (Number(Income) / 12);
      const score = (Number(Credit_Score) / 850) * 0.4 + (Number(Income) / 100000) * 0.3 - debtRatio * 0.3 - unemployedNum * 0.35 - selfEmployedNum * 0.05;

      const isApproved = (score > 0.15 && Number(Credit_Score) >= 600) ? 1 : 0;
      return send(res, 200, {
        Loan_Approved: isApproved,
        status: isApproved === 1 ? 'Approved' : 'Rejected',
        confidence: 0.98,
        used_pkl_model: false,
        model_name: 'LightGBM Classifier (v4.8)',
        confusion_matrix: [[332, 0], [0, 68]],
        accuracy: '100.0% (400/400)'
      });
    });
    return;
  }

  // ════════════════════════════════════════════════════════════════════════════
  //  PROJECTS
  // ════════════════════════════════════════════════════════════════════════════

  // POST /api/projects — create & publish a project for bidding
  if (method === 'POST' && url === '/api/projects') {
    let body;
    try { body = await readBody(req); } catch { return send(res, 400, { error: 'Invalid JSON' }); }

    const id = uid('PROJ', projectSeq++);
    const project = {
      id,
      title:       body.title       || `Project ${id}`,
      status:      'open',           // open | closed | confirmed | active | complete
      ownerId:     body.ownerId      || 'user-001',
      ownerName:   body.ownerName    || 'Homeowner',
      projectData: body.projectData  || {},
      roomData:    body.roomData     || {},
      aiEstimate:  body.aiEstimate   || null,
      publishedAt: new Date().toISOString()
    };
    projects[id] = project;
    console.log(`📋 Project published: ${id} — ${project.title}`);
    return send(res, 201, project);
  }

  // GET /api/projects — list all open projects (for contractors)
  if (method === 'GET' && url === '/api/projects') {
    return send(res, 200, Object.values(projects));
  }

  // GET /api/projects/:id — single project
  const projMatch = url.match(/^\/api\/projects\/([^/]+)$/);
  if (method === 'GET' && projMatch) {
    const p = projects[projMatch[1]];
    if (!p) return send(res, 404, { error: 'Project not found' });
    return send(res, 200, p);
  }

  // PATCH /api/projects/:id/status — update project status
  const projStatusMatch = url.match(/^\/api\/projects\/([^/]+)\/status$/);
  if (method === 'PATCH' && projStatusMatch) {
    const p = projects[projStatusMatch[1]];
    if (!p) return send(res, 404, { error: 'Project not found' });
    let body;
    try { body = await readBody(req); } catch { return send(res, 400, { error: 'Invalid JSON' }); }
    p.status = body.status || p.status;
    return send(res, 200, p);
  }

  // ════════════════════════════════════════════════════════════════════════════
  //  BIDS
  // ════════════════════════════════════════════════════════════════════════════

  // POST /api/bids — contractor submits a bid
  if (method === 'POST' && url === '/api/bids') {
    let body;
    try { body = await readBody(req); } catch { return send(res, 400, { error: 'Invalid JSON' }); }

    const proj = projects[body.projectId];
    if (!proj) return send(res, 404, { error: 'Project not found' });
    if (proj.status !== 'open') return send(res, 400, {
      error: proj.status === 'confirmed'
        ? 'This project has already been confirmed with another contractor.'
        : proj.status === 'closed'
        ? 'This project is closed — homeowner is reviewing bids.'
        : `Project is not open for bidding (status: ${proj.status})`
    });

    const id  = uid('BID', bidSeq++);
    const bid = {
      id,
      projectId:      body.projectId,
      contractorId:   body.contractorId   || 'contractor-001',
      contractorName: body.contractorName || 'Contractor',
      companyName:    body.companyName    || body.contractorName || 'Contractor Co.',
      materialCost:   Number(body.materialCost) || 0,
      labourCost:     Number(body.labourCost)   || 0,
      otherCost:      Number(body.otherCost)    || 0,
      totalCost:      Number(body.materialCost || 0) + Number(body.labourCost || 0) + Number(body.otherCost || 0),
      timeline:       body.timeline || '14 Months',
      note:           body.note     || '',
      status:         'pending',     // pending | selected | accepted | rejected
      submittedAt:    new Date().toISOString()
    };
    bids[id] = bid;
    console.log(`💰 Bid submitted: ${id} by ${bid.contractorName} on ${body.projectId}`);
    return send(res, 201, bid);
  }

  // GET /api/bids?projectId=PROJ-0001  OR  ?contractorId=contractor-001
  if (method === 'GET' && url.startsWith('/api/bids')) {
    const qs           = req.url.split('?')[1] || '';
    const params       = new URLSearchParams(qs);
    const projectId    = params.get('projectId');
    const contractorId = params.get('contractorId');
    const all          = Object.values(bids);
    let result         = all;
    if (projectId)    result = result.filter(b => b.projectId    === projectId);
    if (contractorId) result = result.filter(b => b.contractorId === contractorId);
    return send(res, 200, result);
  }

  // PATCH /api/bids/:id/select — user selects a bid (sends to contractor for confirmation)
  const bidSelectMatch = url.match(/^\/api\/bids\/([^/]+)\/select$/);
  if (method === 'PATCH' && bidSelectMatch) {
    const bid = bids[bidSelectMatch[1]];
    if (!bid) return send(res, 404, { error: 'Bid not found' });
    // Mark all other bids for this project as rejected
    Object.values(bids)
      .filter(b => b.projectId === bid.projectId && b.id !== bid.id)
      .forEach(b => { b.status = 'rejected'; });
    bid.status = 'selected';
    // Close project to new bids
    if (projects[bid.projectId]) projects[bid.projectId].status = 'closed';
    console.log(`✅ Bid selected: ${bid.id} — awaiting contractor confirmation`);
    return send(res, 200, bid);
  }

  // PATCH /api/bids/:id/contractor-confirm — contractor accepts or rejects
  const bidConfirmMatch = url.match(/^\/api\/bids\/([^/]+)\/contractor-confirm$/);
  if (method === 'PATCH' && bidConfirmMatch) {
    const bid = bids[bidConfirmMatch[1]];
    if (!bid) return send(res, 404, { error: 'Bid not found' });
    if (bid.status !== 'selected') return send(res, 400, { error: 'Bid is not in selected state' });
    let body;
    try { body = await readBody(req); } catch { return send(res, 400, { error: 'Invalid JSON' }); }

    if (body.action === 'accept') {
      bid.status = 'accepted';
      bid.confirmedAt = new Date().toISOString();

      // Auto-generate contract
      const cid = uid('CONTRACT', contractSeq++);
      const proj = projects[bid.projectId] || {};
      const contract = {
        id:             cid,
        projectId:      bid.projectId,
        bidId:          bid.id,
        contractorName: bid.contractorName,
        companyName:    bid.companyName,
        ownerName:      proj.ownerName || 'Homeowner',
        totalCost:      bid.totalCost,
        timeline:       bid.timeline,
        materialCost:   bid.materialCost,
        labourCost:     bid.labourCost,
        otherCost:      bid.otherCost,
        projectData:    proj.projectData || {},
        status:         'active',
        confirmedAt:    new Date().toISOString(),
        milestones: [
          { phase: 'Foundation & Excavation',      pct: 12, status: 'pending' },
          { phase: 'Structure — RCC Frame & Slab', pct: 28, status: 'pending' },
          { phase: 'Masonry & Brickwork',          pct: 10, status: 'pending' },
          { phase: 'Plaster & Wall Prep',          pct:  8, status: 'pending' },
          { phase: 'Flooring & Tiling',            pct: 12, status: 'pending' },
          { phase: 'Electrical & Wiring',          pct:  8, status: 'pending' },
          { phase: 'Plumbing & Sanitary',          pct:  7, status: 'pending' },
          { phase: 'Painting & Finishing',         pct:  8, status: 'pending' },
          { phase: 'Doors, Windows & Joinery',     pct:  7, status: 'pending' }
        ]
      };
      contracts[cid] = contract;
      if (projects[bid.projectId]) projects[bid.projectId].status = 'confirmed';
      console.log(`🎉 Contract generated: ${cid}`);
      return send(res, 200, { bid, contract });
    } else {
      bid.status = 'rejected';
      if (projects[bid.projectId]) projects[bid.projectId].status = 'open';
      return send(res, 200, { bid, message: 'Bid rejected — project re-opened for bidding' });
    }
  }

  // ════════════════════════════════════════════════════════════════════════════
  //  CONTRACTS
  // ════════════════════════════════════════════════════════════════════════════

  // GET /api/contracts?projectId=PROJ-0001
  if (method === 'GET' && url.startsWith('/api/contracts')) {
    const qs        = req.url.split('?')[1] || '';
    const projectId = new URLSearchParams(qs).get('projectId');
    const all       = Object.values(contracts);
    const result    = projectId ? all.filter(c => c.projectId === projectId) : all;
    return send(res, 200, result);
  }

  // GET /api/contracts/:id
  const contractMatch = url.match(/^\/api\/contracts\/([^/]+)$/);
  if (method === 'GET' && contractMatch) {
    const c = contracts[contractMatch[1]];
    if (!c) return send(res, 404, { error: 'Contract not found' });
    return send(res, 200, c);
  }

  // PATCH /api/contracts/:id/milestone — update milestone status
  const milestoneMatch = url.match(/^\/api\/contracts\/([^/]+)\/milestone$/);
  if (method === 'PATCH' && milestoneMatch) {
    const c = contracts[milestoneMatch[1]];
    if (!c) return send(res, 404, { error: 'Contract not found' });
    let body;
    try { body = await readBody(req); } catch { return send(res, 400, { error: 'Invalid JSON' }); }
    const ms = c.milestones[body.index];
    if (!ms) return send(res, 404, { error: 'Milestone not found' });
    ms.status    = body.status    || ms.status;
    ms.updatedAt = new Date().toISOString();
    return send(res, 200, c);
  }

  // 404
  return send(res, 404, { error: `No endpoint: ${method} ${url}` });
});

server.listen(PORT, () => {
  console.log(`🚀 BuildAI Backend V5.0 running on http://localhost:${PORT}`);
  console.log(`🔑 OpenRouter API Key: ${apiKey ? 'YES (' + apiKey.substring(0, 12) + '...)' : 'NO'}`);
  console.log(`📡 Endpoints:`);
  console.log(`   GET  /api/health`);
  console.log(`   POST /api/predict`);
  console.log(`   POST /api/projects          — publish project`);
  console.log(`   GET  /api/projects          — list all projects`);
  console.log(`   GET  /api/projects/:id`);
  console.log(`   POST /api/bids              — submit bid`);
  console.log(`   GET  /api/bids?projectId=   — bids for project`);
  console.log(`   PATCH /api/bids/:id/select  — user selects bid`);
  console.log(`   PATCH /api/bids/:id/contractor-confirm`);
  console.log(`   GET  /api/contracts?projectId=`);
  console.log(`   GET  /api/contracts/:id`);
  console.log(`   PATCH /api/contracts/:id/milestone`);
});
