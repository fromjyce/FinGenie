"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Send } from "lucide-react"
import LanguageDropdown from "./language-dropdown"

interface Message {
  id: string
  content: string
  sender: "user" | "bot"
  timestamp: Date
}

const QUICK_ACTIONS = [
  "How to save tax?",
  "What is FD?",
  "Best investment for beginners",
  "Explain mutual funds",
  "Government schemes for women",
  "How to get out of debt?"
]

const FINANCIAL_TERMS = {
  "FD": "A Fixed Deposit (FD) is a savings instrument where you deposit money with a bank for a fixed period at a higher interest rate than regular savings accounts. Minimum deposit is typically ₹1,000 with lock-in periods from 7 days to 10 years. Current rates range from 3-7% depending on tenure and bank.",
  "ELSS": "Equity Linked Savings Scheme (ELSS) is a tax-saving mutual fund with 3-year lock-in. It offers ₹1.5 lakh deduction under Section 80C. Returns vary with market performance (historically 12-15% annually).",
  "PPF": "Public Provident Fund (PPF) is a government-backed savings scheme with 15-year tenure. Current interest rate is 7.1%. Offers tax-free returns and qualifies for 80C deduction. Minimum annual deposit is ₹500, maximum ₹1.5 lakh.",
  "NPS": "National Pension System (NPS) is a retirement-focused investment. Tier I accounts have lock-in until age 60. You can claim additional ₹50,000 deduction under Section 80CCD(1B) beyond the ₹1.5 lakh limit.",
  "Sukanya Samriddhi": "This girl child savings scheme offers 8.2% interest (2024). Account can be opened for girls below 10 years with minimum ₹250 deposit. Amount doubles in ~8 years 9 months and qualifies for 80C deduction."
}

export default function ChatUI() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    // Simulate bot response
    setTimeout(() => {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: getBotResponse(input),
        sender: "bot",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, botMessage])
      setIsLoading(false)
    }, 1000)
  }

  const getBotResponse = (message: string): string => {
    const lowerMessage = message.toLowerCase()
    
    // Check for exact financial terms
    for (const [term, explanation] of Object.entries(FINANCIAL_TERMS)) {
      if (new RegExp(`\\b${term.toLowerCase()}\\b`).test(lowerMessage)) {
        return `${term} Explanation:\n${explanation}\n\nWould you like to know about similar alternatives?`
      }
    }

    // Categorized responses
    if (lowerMessage.includes("tax") || lowerMessage.includes("tax saving")) {
      return `Tax Saving Options (Section 80C):
      1. ELSS Funds (3yr lock-in) - ~12% returns
      2. PPF (15yr) - 7.1% interest
      3. 5yr Bank FDs - ~6.5% returns
      4. NPS (Tier I) - Extra ₹50k deduction
      
      You can save up to ₹1.5 lakh annually through these. Which would you like details about?`
      
    } else if (lowerMessage.includes("invest") || lowerMessage.includes("beginner")) {
      return `For beginners in India, I recommend:
      1. Index Funds (Nifty50) - Low cost, 12% avg returns
      2. PPF - Safe 7.1% returns
      3. RD + FD Ladder - For short-term goals
      4. Gold ETFs - 8-10% long-term
      
      Start with ₹500/month SIPs. Need help choosing?`
      
    } else if (lowerMessage.includes("scheme") || lowerMessage.includes("yojana")) {
      return `Government Schemes:
      For Women:
      - Sukanya Samriddhi (8.2%)
      - PM Matru Vandana (₹5,000)
      
      For Farmers:
      - PM Kisan (₹6,000/yr)
      
      For Seniors:
      - PM Vaya Vandana (7.4%)
      
      Which category are you interested in?`
      
    } else if (lowerMessage.includes("debt") || lowerMessage.includes("loan")) {
      return `Debt Management Steps:
      1. List all debts (amount/interest)
      2. Pay highest-interest first
      3. Consider debt consolidation
      4. Negotiate with lenders
      5. Avoid new loans
      
      Need a personalized repayment plan?`
      
    } else {
      return `I can help with:
      - Tax planning (80C, HRA, 80D)
      - Investment options (FD, MF, Stocks)
      - Government schemes
      - Debt management
      
      What specific financial topic would you like to explore?`
    }
  }

  const handleQuickAction = (action: string) => {
    setInput(action)
  }

  return (
    <div className="flex flex-col h-full" suppressHydrationWarning={true}>
      <div className="flex justify-between items-center p-4 border-b">
        <h1 className="text-xl font-semibold">FinGenie Bharat</h1>
        <LanguageDropdown className="w-32" />
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center p-8">
            <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-indigo-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                />
              </svg>
            </div>
            <h2 className="text-xl font-semibold mb-4">How can I help with your finances today?</h2>
            
            <div className="grid grid-cols-2 gap-3 w-full max-w-md">
              {QUICK_ACTIONS.map((action) => (
                <Button
                  key={action}
                  variant="outline"
                  className="h-auto py-2 text-sm whitespace-normal"
                  onClick={() => handleQuickAction(action)}
                >
                  {action}
                </Button>
              ))}
            </div>
          </div>
        ) : (
          messages.map((message) => (
            <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-[80%] rounded-lg px-4 py-2 ${
                  message.sender === "user" ? "bg-indigo-600 text-white" : "bg-gray-200 text-gray-800"
                }`}
              >
                <p className="whitespace-pre-line">{message.content}</p>
                <p className="text-xs opacity-70 mt-1">
                  {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </p>
              </div>
            </div>
          ))
        )}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-gray-200 text-gray-800 rounded-lg px-4 py-2">
              <div className="flex space-x-2">
                <div
                  className="w-2 h-2 rounded-full bg-gray-500 animate-bounce"
                  style={{ animationDelay: "0ms" }}
                ></div>
                <div
                  className="w-2 h-2 rounded-full bg-gray-500 animate-bounce"
                  style={{ animationDelay: "150ms" }}
                ></div>
                <div
                  className="w-2 h-2 rounded-full bg-gray-500 animate-bounce"
                  style={{ animationDelay: "300ms" }}
                ></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 border-t">
        <form onSubmit={handleSendMessage} className="flex space-x-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about taxes, investments, schemes..."
            className="flex-1"
            disabled={isLoading}
          />
          <Button
            type="submit"
            size="icon"
            className="bg-indigo-600 hover:bg-indigo-700"
            disabled={isLoading || !input.trim()}
          >
            <Send className="h-4 w-4" />
            <span className="sr-only">Send message</span>
          </Button>
        </form>
      </div>
    </div>
  )
}