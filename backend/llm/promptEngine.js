import Groq from 'groq-sdk';

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function getResponseFromLLM(prompt) {
  const chatCompletion = await groq.chat.completions.create({
    messages: [{ role: 'user', content: prompt }],
    model: 'llama3-8b-8192', // or choose another
  });
  return chatCompletion.choices[0]?.message?.content || 'Sorry, I didn’t understand.';
}
