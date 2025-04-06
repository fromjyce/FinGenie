"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"

export default function Navbar() {
  const [language, setLanguage] = useState<"en" | "hi">("hi")

  return (
    <header className="sticky top-0 z-10 bg-white border-b border-gray-200 shadow-sm">
      <div className="container mx-auto max-w-4xl px-4 py-3 flex justify-between items-center">
        <h1 className="text-lg font-bold text-indigo-600">
          FinGenie Bharat – <span className="text-indigo-500">भारत का वित्त साथी</span>
        </h1>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setLanguage(language === "en" ? "hi" : "en")}
          className="text-sm"
        >
          {language === "en" ? "हिंदी" : "English"}
        </Button>
      </div>
    </header>
  )
}

