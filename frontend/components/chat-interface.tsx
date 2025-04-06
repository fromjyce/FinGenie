"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Send } from "lucide-react"
import ExpenseModal from "./expense-modal"
import SchemeDropdown from "./scheme-dropdown"
import type { Message } from "@/types/chat"

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "FD क्या है?",
      sender: "user",
      timestamp: new Date(Date.now() - 60000).toISOString(),
    },
    {
      id: "2",
      content: "FD (Fixed Deposit) में आप बैंक में पैसा जमा करके ब्याज कमाते हैं!",
      sender: "bot",
      timestamp: new Date(Date.now() - 30000).toISOString(),
    },
  ])
  const [input, setInput] = useState("")
  const [isExpenseModalOpen, setIsExpenseModalOpen] = useState(false)

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    const newUserMessage: Message = {
      id: Date.now().toString(),
      content: input,
      sender: "user",
      timestamp: new Date().toISOString(),
    }

    setMessages([...messages, newUserMessage])
    setInput("")

    // Simulate bot response after a short delay
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: "मैं आपकी सहायता करने के लिए यहां हूं। कृपया अपना प्रश्न पूछें।",
        sender: "bot",
        timestamp: new Date().toISOString(),
      }
      setMessages((prev) => [...prev, botResponse])
    }, 1000)
  }

  const handleExpenseSubmit = (amount: number, category: string) => {
    const newUserMessage: Message = {
      id: Date.now().toString(),
      content: `Spent ₹${amount} on ${category}`,
      sender: "user",
      timestamp: new Date().toISOString(),
    }

    setMessages([...messages, newUserMessage])
    setIsExpenseModalOpen(false)

    // Simulate bot response after a short delay
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: `आपका ₹${amount} का ${category} खर्च दर्ज कर लिया गया है। आपका इस महीने का कुल खर्च ₹${amount + 2500} है।`,
        sender: "bot",
        timestamp: new Date().toISOString(),
      }
      setMessages((prev) => [...prev, botResponse])
    }, 1000)
  }

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] py-4">
      <div className="flex space-x-2 mb-4">
        <Button onClick={() => setIsExpenseModalOpen(true)} className="bg-emerald-600 hover:bg-emerald-700 text-white">
          Log Expense
        </Button>
        <SchemeDropdown />
      </div>

      <div className="flex-1 overflow-y-auto mb-4 space-y-4 p-4 rounded-lg border border-gray-200 bg-white">
        {messages.map((message) => (
          <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-[80%] rounded-lg px-4 py-2 ${
                message.sender === "user" ? "bg-indigo-600 text-white" : "bg-gray-200 text-gray-800"
              }`}
            >
              <p>{message.content}</p>
              <p className="text-xs opacity-70 mt-1">
                {new Date(message.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
              </p>
            </div>
          </div>
        ))}
      </div>

      <form onSubmit={handleSendMessage} className="flex space-x-2">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="पूछें... (Ask in Hindi/English)"
          className="flex-1"
          aria-label="Message input"
        />
        <Button type="submit" size="icon" className="bg-indigo-600 hover:bg-indigo-700">
          <Send className="h-4 w-4" />
          <span className="sr-only">Send message</span>
        </Button>
      </form>

      <ExpenseModal
        isOpen={isExpenseModalOpen}
        onClose={() => setIsExpenseModalOpen(false)}
        onSubmit={handleExpenseSubmit}
      />
    </div>
  )
}

