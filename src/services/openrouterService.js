/**
 * BuildAI Cost Estimation ML Engine V4.8
 * Service to interface with OpenRouter API using VITE_OPENROUTER_API_KEY
 */

export const getOpenRouterApiKey = () => {
  return (
    import.meta.env.VITE_OPENROUTER_API_KEY ||
    import.meta.env.OPENROUTER_API_KEY ||
    localStorage.getItem('OPENROUTER_API_KEY') ||
    ''
  );
};

export const setOpenRouterApiKey = (key) => {
  if (key) {
    localStorage.setItem('OPENROUTER_API_KEY', key);
  } else {
    localStorage.removeItem('OPENROUTER_API_KEY');
  }
};

/**
 * Calculates local ML Engine V4.8 fallback estimates
 */
export const calculateLocalEstimates = (propertyData = {}, roomData = {}, styleData = {}) => {
  const length  = Number(propertyData.length) || 40;
  const width   = Number(propertyData.width)  || 60;
  const plotArea = length * width;
  const floors  = Number(propertyData.floors) || 1;
  const totalArea = Math.round(plotArea * (1.2 + floors * 0.45));
  const ownerBudget = Number(styleData.budget) || Number(propertyData.budget) || 3750000;

  // Per sq.ft rate by construction type — gives unique cost per project
  const rateMap = { Economy: 1500, Standard: 1850, Premium: 2400, Luxury: 3500 };
  const rate = rateMap[propertyData.constructionType] || 2400;
  const estimatedCost = Math.round(totalArea * rate);

  const roomCount = Object.values(roomData).reduce((sum, v) => sum + (Number(v) || 0), 0);

  return {
    source: 'ML Engine V4.8 (Local Fallback)',
    plotArea,
    totalAreaSqFt: totalArea,
    totalArea,
    ownerBudget,
    estimatedCost,
    timelineMonths: Math.round(10 + floors * 2 + (roomCount > 8 ? 2 : 0)),
    breakdown: {
      material:   Math.round(estimatedCost * 0.35),
      labour:     Math.round(estimatedCost * 0.20),
      interior:   Math.round(estimatedCost * 0.15),
      electrical: Math.round(estimatedCost * 0.08),
      plumbing:   Math.round(estimatedCost * 0.07),
      furniture:  Math.round(estimatedCost * 0.06),
      painting:   Math.round(estimatedCost * 0.05),
      govt:       Math.round(estimatedCost * 0.04),
    },
    recommendation: `For a ${floors}-floor ${propertyData.constructionType || 'Premium'} build on ${plotArea} sq.ft in ${propertyData.city || 'Palo Alto'}: Raft Foundation recommended for optimal load distribution.`,
    bomHighlight: `~${Math.round(totalArea * 0.38)} bags cement & ${(totalArea * 0.004).toFixed(1)} tons TMT Fe-550 required for ${totalArea} sq.ft built-up.`,
    environmentalRisks: {
      flood:      'LOW',
      earthquake: 'LOW',
      wind:       'MODERATE',
      soil:       'OPTIMAL'
    }
  };
};

/**
 * Predicts output for USER PAGE 03 - Cost Estimation ML Engine V4.8 using OpenRouter
 */
export const predictCostAndOutcome = async ({ propertyData = {}, roomData = {}, styleData = {} }) => {
  // 1. Try Backend Server — uses Vite proxy (/api) in dev, falls back to absolute ports
  const backendUrls = [
    '/api/predict',                       // Vite dev proxy (port-agnostic)
    'http://localhost:5050/api/predict',  // Direct to Node server
    'http://localhost:5000/api/predict'   // Legacy port fallback
  ];
  for (const backendUrl of backendUrls) {
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 5000);
      const backendRes = await fetch(backendUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ propertyData, roomData, styleData }),
        signal: controller.signal
      });
      clearTimeout(timeout);
      if (backendRes.ok) {
        const data = await backendRes.json();
        return {
          usedOpenRouter: true,
          source: 'Backend Server Endpoint (OpenRouter)',
          bomHighlight: data.bomHighlight || '',
          ...data
        };
      }
    } catch {
      // Continue to next URL
    }
  }

  // 2. Direct OpenRouter API Call
  const apiKey = getOpenRouterApiKey();

  if (!apiKey || apiKey === 'your_openrouter_api_key_here') {
    return {
      ...calculateLocalEstimates(propertyData, roomData, styleData),
      usedOpenRouter: false,
      message: 'Using local ML Engine V4.8 (Set VITE_OPENROUTER_API_KEY in .env for live predictions).'
    };
  }

  const budget   = Number(styleData.budget)   || Number(propertyData.budget) || 3750000;
  const length   = Number(propertyData.length) || 40;
  const width    = Number(propertyData.width)  || 60;
  const floors   = Number(propertyData.floors) || 1;
  const plotArea = length * width;
  // Approximate built-up area so the model has a concrete starting figure
  const builtUpArea = Math.round(plotArea * (1.2 + floors * 0.45));

  const prompt = `
You are BuildAI Cost Estimation ML Engine V4.8.
Calculate a REALISTIC construction cost estimate for the EXACT project specs below.
DO NOT use placeholder or example numbers — derive every value from the inputs.

=== PROJECT INPUTS ===
Plot:             ${length} ft × ${width} ft = ${plotArea} sq.ft
Approx Built-up:  ${builtUpArea} sq.ft  (G + ${floors} floor(s))
Location:         ${propertyData.city || 'Palo Alto'}, ${propertyData.state || 'CA'}
Construction Type:${propertyData.constructionType || 'Premium'}
Rooms:            ${JSON.stringify(roomData)}
Interior Style:   ${styleData.interiorStyle || 'Modern'}
Owner's Budget:   ₹${budget.toLocaleString('en-IN')}
Outdoor Features: ${JSON.stringify(styleData.features || [])}

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
  "breakdown": {
    "material":   <integer>,
    "labour":     <integer>,
    "interior":   <integer>,
    "electrical": <integer>,
    "plumbing":   <integer>,
    "furniture":  <integer>,
    "painting":   <integer>,
    "govt":       <integer>
  },
  "recommendation": "<specific text>",
  "bomHighlight":   "<specific quantities>",
  "environmentalRisks": {
    "flood":      "<LOW|MODERATE|HIGH>",
    "earthquake": "<LOW|MODERATE|HIGH>",
    "wind":       "<LOW|MODERATE|HIGH>",
    "soil":       "<OPTIMAL|MODERATE|POOR>"
  }
}
`;

  try {
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'HTTP-Referer': typeof window !== 'undefined' ? window.location.origin : 'http://localhost:5173',
        'X-Title': 'BuildAI Architectural Platform',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'openai/gpt-4o-mini',
        messages: [
          { role: 'system', content: 'You respond only in raw JSON format. No markdown. No explanation.' },
          { role: 'user', content: prompt }
        ],
        temperature: 0.2
      })
    });

    if (!response.ok) {
      const errText = await response.text();
      throw new Error(`OpenRouter API error (${response.status}): ${errText}`);
    }

    const data = await response.json();
    let contentText = data.choices?.[0]?.message?.content || '{}';

    // Strip markdown code fences if present (e.g. ```json ... ```)
    contentText = contentText.replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/i, '').trim();

    const parsed = JSON.parse(contentText);

    return {
      usedOpenRouter: true,
      source: 'OpenRouter AI Prediction (ML Engine V4.8)',
      bomHighlight: parsed.bomHighlight || '',
      recommendation: parsed.recommendation || '',
      environmentalRisks: parsed.environmentalRisks || {},
      ...parsed
    };
  } catch (err) {
    console.warn('OpenRouter prediction failed, falling back to local ML Engine V4.8:', err);
    return {
      ...calculateLocalEstimates(propertyData, roomData, styleData),
      usedOpenRouter: false,
      error: err.message
    };
  }
};

/**
 * Chat with BuildAI Assistant using OpenRouter
 * Used by AiChatWidget for real AI responses
 */
export const chatWithBuildAI = async ({ userMessage, propertyData = {}, styleData = {} }) => {
  const apiKey = getOpenRouterApiKey();

  // Fallback: rule-based smart responses if no API key
  if (!apiKey || apiKey === 'your_openrouter_api_key_here') {
    return { reply: generateFallbackReply(userMessage, propertyData, styleData), usedAI: false };
  }

  const systemPrompt = `You are BuildAI Assistant — an expert AI construction consultant and architect for the BuildAI platform.
You help homeowners with: construction cost estimates, material recommendations, structural advice, timelines, loan feasibility, contractor selection, and Vastu compliance.
Keep replies concise (2-3 sentences max), practical, and specific to the user's project context.
Always use Indian Rupee (₹) for amounts. Be professional yet friendly.

User's Current Project Context:
- Plot: ${propertyData.length || 40}ft × ${propertyData.width || 60}ft in ${propertyData.city || 'Palo Alto'}, ${propertyData.state || 'CA'}
- Construction Type: ${propertyData.constructionType || 'Premium'}
- Floors: G + ${propertyData.floors || 1}
- Budget: ₹${(styleData.budget || propertyData.budget || 3750000).toLocaleString()}
- Interior Style: ${styleData.interiorStyle || 'Modern'}`;

  try {
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'HTTP-Referer': typeof window !== 'undefined' ? window.location.origin : 'http://localhost:5173',
        'X-Title': 'BuildAI Chat Assistant',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'openai/gpt-4o-mini',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userMessage }
        ],
        temperature: 0.7,
        max_tokens: 200
      })
    });

    if (!response.ok) {
      throw new Error(`OpenRouter error: ${response.statusText}`);
    }

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content?.trim() || 'I could not generate a response. Please try again.';
    return { reply, usedAI: true };

  } catch (err) {
    console.warn('BuildAI chat fallback triggered:', err.message);
    return {
      reply: generateFallbackReply(userMessage, propertyData, styleData),
      usedAI: false
    };
  }
};

/**
 * Rule-based fallback reply for AiChatWidget when API key is not available
 */
function generateFallbackReply(userMessage, propertyData, styleData) {
  const lower = userMessage.toLowerCase();
  const budget = (styleData.budget || propertyData.budget || 3750000).toLocaleString('en-IN');
  const city = propertyData.city || 'your city';
  const floors = propertyData.floors || 1;
  const area = ((Number(propertyData.length) || 40) * (Number(propertyData.width) || 60));

  if (lower.includes('cost') || lower.includes('save') || lower.includes('budget') || lower.includes('price')) {
    return `Based on your target budget of ₹${budget}, you can save 8-12% by using Fly Ash bricks and Raft Foundation in ${city}.`;
  } else if (lower.includes('foundation') || lower.includes('structure') || lower.includes('soil')) {
    return `For a ${floors}-floor build on a ${area} sq.ft plot, Raft Foundation offers superior load distribution and strong earthquake resilience.`;
  } else if (lower.includes('timeline') || lower.includes('duration') || lower.includes('long') || lower.includes('month')) {
    return `Estimated completion is ${10 + floors * 2} months. Foundation takes ~2.5 months, framing 4 months, and finishing 4.5 months.`;
  } else if (lower.includes('solar') || lower.includes('green') || lower.includes('energy')) {
    return `A 10kW roof solar array will cut annual energy costs by ~34%, with a 4.2-year ROI payback period.`;
  } else if (lower.includes('material') || lower.includes('steel') || lower.includes('cement')) {
    return `Your project needs approx ${Math.round(area * 0.38)} bags of High Alumina Cement and ${(area * 0.004).toFixed(1)} tons of TMT Fe-550 steel rebars.`;
  } else if (lower.includes('loan') || lower.includes('emi') || lower.includes('bank')) {
    return `For a ₹${budget} project, a typical 20-year home loan at 8.5% gives an EMI of approx ₹${Math.round((Number(propertyData.budget || 3750000) * 0.4 * 0.085 / 12 * Math.pow(1.007083, 240)) / (Math.pow(1.007083, 240) - 1)).toLocaleString('en-IN')}/month. Check the Loan Feasibility page for detailed analysis.`;
  } else if (lower.includes('contractor') || lower.includes('hire') || lower.includes('labour')) {
    return `For a ${propertyData.constructionType || 'Premium'} build in ${city}, verified contractors on BuildAI typically charge ₹${floors > 1 ? '1,800-2,400' : '1,500-2,000'}/sq.ft all-inclusive.`;
  }

  return `Your ${propertyData.constructionType || 'Premium'} project for a ${styleData.interiorStyle || 'Modern'} interior looks well-balanced. Would you like a detailed breakdown of labor vs materials?`;
}
