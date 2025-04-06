"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Send, PieChart, AlertTriangle } from "lucide-react"
import LanguageDropdown from "./language-dropdown"

interface Message {
  id: string
  content: string
  sender: "user" | "bot"
  timestamp: Date
  metadata?: {
    type?: "expense" | "scheme" | "alert"
    data?: any
  }
}

const QUICK_ACTIONS = [
  "FD क्या है? (What is FD?)",
  "How to save tax?",
  "Government schemes for women",
  "I have multiple loans",
  "What is SIP?",
  "क्या Mutual Fund सुरक्षित है?",
  "Tell me about PPF",
  "Best way to build credit score",
  "What is EMI?",
  "Tips to reduce monthly expenses",
  "Senior citizen saving schemes",
  "How to start investing with ₹500?"
]

const FINANCIAL_TERMS = {
  "FD": "एफडी (फिक्स्ड डिपॉजिट) एक बचत उपकरण है जहां आप निश्चित अवधि के लिए बैंक में पैसा जमा करते हैं जिस पर बचत खाते से अधिक ब्याज मिलता है। न्यूनतम जमा आमतौर पर ₹1,000 होता है और लॉक-इन अवधि 7 दिन से 10 वर्ष तक होती है। वर्तमान दरें 3-7% के बीच हैं।",
  
  "SIP": "SIP (Systematic Investment Plan) एक तरीका है जिससे आप म्यूचुअल फंड्स में नियमित रूप से एक तय राशि निवेश कर सकते हैं। यह लंबी अवधि में कंपाउंडिंग के ज़रिए अच्छा रिटर्न दे सकता है।\n\nक्या आप ₹500 से SIP शुरू करना चाहेंगे?",
  
  "Mutual Fund": "म्यूचुअल फंड कई निवेशकों से पैसा इकट्ठा करके शेयर, बॉन्ड आदि में निवेश करता है। ये पेशेवर मैनेजर्स द्वारा चलाए जाते हैं। जोखिम स्तर फंड पर निर्भर करता है।\n\nक्या आप Equity या Debt Funds के बारे में जानना चाहेंगे?",
  
  "PPF": "PPF (Public Provident Fund) एक लॉन्ग-टर्म सेविंग स्कीम है जो 7.1% ब्याज देती है और टैक्स फ्री होती है। लॉक-इन 15 साल का होता है। अधिकतम निवेश सीमा ₹1.5 लाख प्रति वर्ष है।",
  
  "loan": "Warning: Multiple loans can lead to debt traps! Here's what to do:\n1. List all loans with interest rates\n2. Prioritize paying highest-interest loans first\n3. Consider debt consolidation\n4. Avoid taking new loans\n\nWould you like help creating a repayment plan?",
  
  "credit score": "Credit score एक 3-अंकों की संख्या होती है जो आपकी लोन चुकाने की क्षमता दर्शाती है। 750+ स्कोर अच्छा माना जाता है।\n\nबढ़ाने के लिए:\n- समय पर EMI चुकाएं\n- क्रेडिट कार्ड का संतुलित इस्तेमाल करें\n- पुराने अकाउंट बंद ना करें",
  
  "EMI": "EMI (Equated Monthly Installment) वह राशि है जो आप लोन चुकाने के लिए हर महीने भुगतान करते हैं। इसमें मूलधन और ब्याज दोनों शामिल होते हैं। आप EMI calculator का उपयोग करके जान सकते हैं कि कितनी किस्त बनेगी।",
  
  "expenses": "बचत के लिए महीने के खर्चों को ट्रैक करना ज़रूरी है। कुछ टिप्स:\n1. ज़रूरी और गैर-ज़रूरी खर्च अलग करें\n2. Cash flow ट्रैक करें (जैसे कि ₹2000/month बचाना)\n3. बजट बनाएं और उसका पालन करें\n4. UPI/credit कार्ड खर्चों का विश्लेषण करें"
}


const EXPENSE_CATEGORIES = [
  { name: "Groceries", emoji: "🛒", color: "#3B82F6" },
  { name: "Transport", emoji: "🚗", color: "#10B981" },
  { name: "Healthcare", emoji: "🏥", color: "#EF4444" },
  { name: "Utilities", emoji: "💡", color: "#F59E0B" }
]

export default function ChatUI() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [showExpenseModal, setShowExpenseModal] = useState(false)
  const [expenseData, setExpenseData] = useState({
    amount: "",
    category: "",
    description: ""
  })
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
      const botResponse = getBotResponse(input)
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: botResponse.response,
        sender: "bot",
        timestamp: new Date(),
        metadata: botResponse.metadata
      }
      setMessages((prev) => [...prev, botMessage])
      setIsLoading(false)
    }, 1000)
  }

  const getBotResponse = (message: string): { response: string, metadata?: any } => {
    const lowerMessage = message.toLowerCase()
    
    // Check for exact financial terms
    for (const [term, explanation] of Object.entries(FINANCIAL_TERMS)) {
      if (new RegExp(`\\b${term.toLowerCase()}\\b`).test(lowerMessage)) {
        return { 
          response: explanation,
          metadata: term === "loan" ? { type: "alert" } : undefined
        }
      }
    }

    // Expense tracking
    if (lowerMessage.includes("spent") || lowerMessage.includes("kharch")) {
      const amountMatch = message.match(/₹?(\d+)/)
      const categoryMatch = EXPENSE_CATEGORIES.find(cat => 
        lowerMessage.includes(cat.name.toLowerCase())
      )
      
      if (amountMatch) {
        const amount = amountMatch[1]
        const category = categoryMatch?.name || "Other"
        return {
          response: `I've recorded ₹${amount} spent on ${category}. Would you like to see your spending patterns?`,
          metadata: {
            type: "expense",
            data: {
              amount: parseInt(amount),
              category,
              description: message
            }
          }
        }
      }
    }

    // Government schemes
    if (lowerMessage.includes("scheme") || lowerMessage.includes("yojana")) {
      return {
        response: "Based on your profile (Women), I recommend:\n1. Sukanya Samriddhi Yojana (Girl child savings)\n2. PM Matru Vandana Yojana (₹5,000 maternity benefit)\n\nWould you like details on any of these?",
        metadata: {
          type: "scheme",
          data: {
            schemes: ["Sukanya Samriddhi", "PM Matru Vandana"]
          }
        }
      }
    }

    return {
      response: `I can help with:\n- Financial terms (FD, SIP, etc.)\n- Expense tracking\n- Government schemes\n- Debt management\n\nWhat would you like to know?`
    }
  }

  const handleQuickAction = (action: string) => {
    setInput(action)
    setTimeout(() => {
      handleSendMessage({ preventDefault: () => {} } as React.FormEvent)
    }, 100) // Let the input state update first
  }
  

  const renderExpenseChart = (data: any) => {
    const total = EXPENSE_CATEGORIES.reduce((sum, cat) => sum + 
      (data.category === cat.name ? data.amount : 0), 0)
    
    return (
      <div className="mt-4 p-4 bg-white rounded-lg shadow">
        <div className="flex items-center mb-2">
          <PieChart className="w-5 h-5 mr-2 text-indigo-600" />
          <h3 className="font-medium">Expense Recorded</h3>
        </div>
        <div className="flex items-center justify-between mb-1">
          <span className="text-sm">{data.category}</span>
          <span className="font-medium">₹{data.amount}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div 
            className="bg-indigo-600 h-2.5 rounded-full" 
            style={{ width: `${(data.amount / (total || 1)) * 100}%` }}
          ></div>
        </div>
        <p className="text-xs text-gray-500 mt-2">{data.description}</p>
      </div>
    )
  }

  const renderSchemeCard = (schemes: string[]) => {
    return (
      <div className="mt-4 space-y-2">
        {schemes.map(scheme => (
          <div key={scheme} className="p-3 bg-green-50 border border-green-100 rounded-lg">
            <h4 className="font-medium text-green-800">{scheme}</h4>
            <p className="text-sm text-green-600 mt-1">
              {scheme === "Sukanya Samriddhi" 
                ? "Girl child savings with 8.2% interest"
                : "Maternity benefit of ₹5,000"}
            </p>
            <Button variant="outline" size="sm" className="mt-2 text-xs h-8">
              Learn More
            </Button>
          </div>
        ))}
      </div>
    )
  }

  const renderAlert = () => {
    return (
      <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
        <div className="flex items-start">
          <AlertTriangle className="w-5 h-5 mr-2 text-red-600 flex-shrink-0" />
          <div>
            <h4 className="font-medium text-red-800">Debt Alert</h4>
            <p className="text-sm text-red-600 mt-1">
              Having multiple loans can lead to financial stress. Consider:
              <ul className="list-disc pl-5 mt-1 space-y-1">
                <li>Debt consolidation</li>
                <li>Prioritizing high-interest loans</li>
                <li>Seeking financial counseling</li>
              </ul>
            </p>
          </div>
        </div>
      </div>
    )
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
                {new Intl.DateTimeFormat("en-IN", { hour: "2-digit", minute: "2-digit" }).format(message.timestamp)}
                </p>
                
                {message.metadata?.type === "expense" && renderExpenseChart(message.metadata.data)}
                {message.metadata?.type === "scheme" && renderSchemeCard(message.metadata.data.schemes)}
                {message.metadata?.type === "alert" && renderAlert()}
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