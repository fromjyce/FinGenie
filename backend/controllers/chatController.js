import { getResponseFromLLM } from '../../llm/promptEngine.js';

export async function handleChat(req, res) {
  const { message } = req.body;
  try {
    const reply = await getResponseFromLLM(message);
    res.json({ reply });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
