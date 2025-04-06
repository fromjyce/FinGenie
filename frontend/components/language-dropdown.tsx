"use client"

import { useState } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface LanguageDropdownProps {
  className?: string
}

export default function LanguageDropdown({ className }: LanguageDropdownProps) {
  const [language, setLanguage] = useState("English")

  return (
    <Select value={language} onValueChange={setLanguage}>
      <SelectTrigger className={className} aria-label="Select language">
        <SelectValue placeholder="English" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="English">English</SelectItem>
        <SelectItem value="Hindi">Hindi</SelectItem>
        <SelectItem value="Tamil">Tamil</SelectItem>
        <SelectItem value="Bengali">Bengali</SelectItem>
        <SelectItem value="Marathi">Marathi</SelectItem>
      </SelectContent>
    </Select>
  )
}

