# 💸 FinGenie – Your Inclusive Personal Finance Coach

FinGenie is an AI-powered, multilingual financial literacy chatbot built for the next billion users in India. Tailored for underserved communities — including women, rural citizens, people with disabilities (PWDs), and those with limited literacy — FinGenie offers practical financial guidance through natural language conversations via voice or text.

---

## 🧠 Problem Statement

Financial literacy remains a major challenge across large sections of the Indian population, especially for non-English speakers and those unfamiliar with digital tools. Most fintech apps are designed for educated, urban users, leaving behind millions of underserved individuals.

---

## 🚀 Solution Overview

FinGenie is a purpose-driven AI chatbot that offers personalized, regional, and inclusive financial guidance. It helps users:

- Understand basic financial terms and habits
- Set and track financial goals
- Manage budgets and detect overspending patterns
- Learn how to save, invest, and build credit — in their native language and preferred format (voice/text)

---

## ✨ Key Features

- 🔊 Voice-first interface for accessibility
- 🌐 Supports regional Indian languages (multilingual LLM)
- 🧾 Simulated banking integration to track expenses
- 🎯 Personalized nudges and goal reminders
- 🧠 GROQ SDK (LLaMA) for contextual conversation
- 📲 Works on low-end smartphones and platforms like WhatsApp
- 🧍 Inclusive UX optimized for women, rural users, and PWDs

---

## 🎯 Target Users

FinGenie is built for:

- First-time digital users in Tier-2 and Tier-3 India
- Women seeking financial independence
- Persons with disabilities who require voice-based interaction
- Non-literate users who cannot read financial documents
- Minority communities lacking access to trusted financial guidance

---

## ⚙️ Tech Stack

| Layer         | Technology                    |
|---------------|-------------------------------|
| Frontend      | Next.js, Tailwind CSS          |
| Backend       | Node.js (Express.js)           |
| Database      | MongoDB                        |
| LLM Engine    | GROQ SDK (LLaMA-based)         |
| APIs          | Mock Bank API, TTS/STT (optional) |
| Platforms     | Web, WhatsApp (planned)        |

---

## 🏗 Architecture

1. User enters text or speaks a query (voice or chat)
2. Input is sent to backend → routed to GROQ SDK for NLP
3. LLM understands context, financial intent, and past data
4. MongoDB fetches user profile, goals, and transaction data
5. A personalized, contextual response is generated
6. If voice mode is on, the bot replies via text-to-speech
7. Response shown in the UI or returned via WhatsApp

---

## 📚 Use Case Scenarios

- “How much did I spend on food last week?”  
- “Remind me to save ₹500 every Friday.”  
- “What is a credit score and how do I build one?”  
- “My income is ₹8000/month. What should I prioritize?”  
- “I want to save for my child’s education. Where do I start?”  

---

## 💡 Why FinGenie Stands Out

- Designed for India-first use cases — local language, low bandwidth, and voice support.
- Goes beyond rule-based chatbots using LLM for smart, contextual coaching.
- Inclusive by design: every feature accounts for accessibility and empathy.
- Offers real-time engagement and financial nudges, not just static replies.

---

## 🔌 API & Database Integration

- Mock Banking API: Simulates real-time transactions and financial history.
- GROQ SDK: Handles multi-turn dialogue, financial education Q&A, and translation.
- MongoDB: Stores user profiles, goals, conversation history.
- Optional TTS/STT APIs: Converts text to regional language speech and vice versa.

---

## 🌍 Deployment Strategy

- Primary deployment via a web app (React/Next.js)
- Optional deployment over WhatsApp (using Twilio or similar)
- Voice support enabled through browser or mobile app microphone
- Hosted via Vercel (Frontend) + Render or Railway (Backend)

---

## 🔮 Future Enhancements

- Integration with UPI and real-time finance tracking
- Partnership with NGOs for rural financial literacy drives
- In-app gamified lessons on finance
- Offline mode with SMS fallback
- Income-based customized investment suggestions

---

## 🧑‍💻 Team & Contact

FinGenie is developed as part of the “Chatbot Evolution: Show Off Your Hotbot!” Hackathon.

Made with ❤️ by:

- Jyce – [GitHub](https://github.com/fromjyce)  
- Nidhi – [GitHub](https://github.com/Nidhi045)  

Feel free to fork, contribute, or open an issue. We’re open to collaboration and feedback!
