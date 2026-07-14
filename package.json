require('dotenv').config();
const express = require('express');
const fetch = require('node-fetch');

const app = express();
const PORT = process.env.PORT || 3000;

const DEEPSEEK_API_KEY = process.env.DEEPSEEK_API_KEY;
const DEEPSEEK_API_URL = 'https://api.deepseek.com/chat/completions';
const MODEL = 'deepseek-chat';
const MAX_TOKENS = 16000;

// ============ TUS GUÍAS COMPLETAS VAN AQUÍ ============
const PHASE_1_GUIDE = `AQUÍ PEGAS TODO EL TEXTO DE TU FASE 1`;
const PHASE_2_GUIDE = `AQUÍ PEGAS TODO EL TEXTO DE TU FASE 2`;
// =====================================================

app.use(express.json({ limit: '200kb' }));
app.use(express.static('public'));

app.post('/api/reescribir', async (req, res) => {
  const { text: original } = req.body;
  if (!original || original.length < 80) {
    return res.status(400).json({ error: 'Texto demasiado corto.' });
  }
  if (original.length > 180000) {
    return res.status(400).json({ error: 'Texto demasiado largo.' });
  }

  try {
    const phase1Messages = [
      { role: 'system', content: 'Analiza el texto según la guía de detección de IA. Responde solo JSON.' },
      { role: 'user', content: `${PHASE_1_GUIDE}\n\nTEXTO:\n${original}` }
    ];
    const phase1Resp = await callDeepSeek(phase1Messages, 0.0, 2000);
    let analisis = phase1Resp.content;
    try {
      analisis = JSON.stringify(JSON.parse(analisis.replace(/```json/g, '').replace(/```/g, '')));
    } catch (e) {}

    const phase2Messages = [
      { role: 'system', content: 'Reescribe el texto usando el análisis previo y la guía de humanización. Solo devuelve el texto final.' },
      { role: 'user', content: `ANÁLISIS:\n${analisis}\n\nGUÍA:\n${PHASE_2_GUIDE}\n\nORIGINAL:\n${original}` }
    ];
    const phase2Resp = await callDeepSeek(phase2Messages, 0.55, MAX_TOKENS);
    let rewritten = phase2Resp.content.replace(/```[\s\S]*?```/g, '').replace(/^texto reescrito:?\s*/i, '').trim();

    res.json({ text: rewritten, usage: { totalTokens: (phase1Resp.usage.total_tokens || 0) + (phase2Resp.usage.total_tokens || 0) } });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

async function callDeepSeek(messages, temperature, maxTokens) {
  const response = await fetch(DEEPSEEK_API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${DEEPSEEK_API_KEY}` },
    body: JSON.stringify({ model: MODEL, messages, temperature, max_tokens: maxTokens, stream: false })
  });
  const data = await response.json();
  if (data.error) throw new Error(data.error.message);
  return { content: data.choices[0].message.content, usage: data.usage };
}

app.listen(PORT, () => console.log(`Servidor en puerto ${PORT}`));