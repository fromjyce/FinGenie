"use client";
import { useState } from 'react';
import global

export default function Home() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  const askFinGenie = async () => {
    const reply = await fetch("http://localhost:3001/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: input, user: "villager" }),
    }).then(res => res.json());

    setMessages([...messages, { text: input, isUser: true }, { text: reply.text, isUser: false }]);
    setInput("");
  };

  return (
    <div className="min-h-screen  p-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-primary">FinGenie Bharat</h1>
        <div className="mt-6 space-y-4">
          {messages.map((msg, i) => (
            <div key={i} className={`p-4 rounded-lg ${msg.isUser ? "bg-blue-100 ml-auto" : "bg-gray-200"}`}>
              {msg.text}
            </div>
          ))}
        </div>
        <div className="mt-6 flex">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="पूछें... (Ask in Hindi/English)"
            className="flex-1 p-2 border rounded-l-lg"
          />
          <button 
            onClick={askFinGenie}
            className="bg-primary text-white px-4 rounded-r-lg"
          >
            पूछें
          </button>
        </div>
      </div>
    </div>
  );
}