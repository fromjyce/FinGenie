import Sidebar from "@/components/sidebar"
import ChatUI from "@/components/chat-ui"

export default function ChatPage() {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 md:ml-64">
        <ChatUI />
      </div>
    </div>
  )
}

