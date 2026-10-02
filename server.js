import 'dotenv/config';
import express from 'express';
import OpenAI from 'openai';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const port = Number(process.env.PORT || 3000);

app.use(express.json({ limit: '64kb' }));
app.use(express.static(path.join(__dirname, 'public')));

app.post('/api/chat', async (req, res) => {
  try {
    const messages = Array.isArray(req.body?.messages) ? req.body.messages : [];
    const clean = messages
      .filter(m => m && (m.role === 'user' || m.role === 'assistant') && typeof m.content === 'string')
      .slice(-12);
    if (!clean.length) return res.status(400).json({ error: 'Keine Nachricht erhalten.' });

    const response = await client.responses.create({
      model: 'gpt-5.6-luna',
      instructions: 'Du bist JARVIS, ein freundlicher, präziser persönlicher KI-Assistent. Antworte auf Deutsch, sofern der Nutzer Deutsch spricht. Halte Antworten bei einfachen Fragen kurz. Behaupte nicht, Gerätefunktionen ausgeführt zu haben, wenn du sie nicht wirklich ausführen kannst.',
      input: clean.map(m => ({ role: m.role, content: m.content }))
    });
    res.json({ text: response.output_text });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'KI-Anfrage fehlgeschlagen. Prüfe API-Schlüssel und Server.' });
  }
});

app.get('*', (req, res)=> res.sendFile(path.join(__dirname, 'public', 'index.html')));
app.listen(port, '0.0.0.0', () => console.log(`JARVIS läuft auf Port ${port}`));
