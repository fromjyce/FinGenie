"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Trash2, Download, Menu, X } from "lucide-react"

interface ChatItem {
  id: string
  title: string
}

export default function Sidebar() {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const [chats, setChats] = useState<ChatItem[]>([
    { id: "1", title: "How to save tax?" },
    { id: "2", title: "What is FD?" },
  ])

  const handleDeleteChat = (id: string) => {
    setChats(chats.filter((chat) => chat.id !== id))
  }

  const handleExportChat = (id: string) => {
    console.log("Export clicked for chat:", id)
  }

  const toggleSidebar = () => {
    setIsOpen(!isOpen)
  }

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        className="md:hidden fixed top-4 left-4 z-50"
        onClick={toggleSidebar}
        aria-label={isOpen ? "Close sidebar" : "Open sidebar"}
      >
        {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </Button>

      <div
        className={`
        fixed inset-y-0 left-0 z-40 w-64 bg-white border-r transform transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full"} 
        md:translate-x-0
      `}
      >
        <div className="flex flex-col h-full">
          {/* Top: App Logo + Title */}
          <div className="p-4 border-b">
            <Link href="/chat" className="flex items-center space-x-2">
              <span className="text-2xl font-bold text-indigo-600">FinGenie</span>
              <span className="font-medium">Bharat</span>
            </Link>
          </div>

          {/* Middle: Chat List */}
          <div className="flex-1 overflow-y-auto p-4">
            <h2 className="text-sm font-semibold text-gray-500 mb-3">PREVIOUS CHATS</h2>
            <div className="space-y-2">
              {chats.map((chat) => (
                <div key={chat.id} className="flex items-center justify-between p-2 rounded-md hover:bg-gray-100 group">
                  <Link href={`/chat/${chat.id}`} className="flex-1 truncate">
                    <span className="text-sm">{chat.title}</span>
                  </Link>
                  <div className="flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7"
                      onClick={(e) => {
                        e.preventDefault()
                        handleExportChat(chat.id)
                      }}
                      aria-label="Export chat"
                    >
                      <Download className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7 text-red-500"
                      onClick={(e) => {
                        e.preventDefault()
                        handleDeleteChat(chat.id)
                      }}
                      aria-label="Delete chat"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
              {chats.length === 0 && <p className="text-sm text-gray-500 text-center py-4">No previous chats</p>}
            </div>
          </div>

          {/* Bottom: User Info */}
          <div className="p-4 border-t">
            <div className="flex items-center space-x-3">
              <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center">
                <span className="text-indigo-600 font-medium">PS</span>
              </div>
              <div>
                <p className="text-sm font-medium">Pratika Sharma</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

