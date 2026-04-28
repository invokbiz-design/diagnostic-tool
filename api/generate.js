// File location: /api/generate.js

export default async function handler(req, res) {

  // ── CORS ──
  const allowedOrigins = ['https://invokbiz.com', 'http://localhost:3000', 'https://invokbiz-diagnostic.vercel.app'];
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  res.setHeader('Access-Control-Allow-Methods', 'POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { messages } = req.body;

    if (!messages) {
      return res.status(400).json({ error: 'Messages are required' });
    }

    // ── CHANGED: Groq instead of Anthropic ──
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        max_tokens: 1000,
        messages
      }),
    });

    const data = await response.json();

    // ── CHANGED: Convert Groq response → Anthropic format ──
    // So App.jsx needs zero changes
    return res.status(200).json({
      content: [{ text: data.choices?.[0]?.message?.content || "No response generated." }]
    });

  } catch (error) {
    console.error('API error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}