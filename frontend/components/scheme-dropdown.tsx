"use client"

import { useState } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function SchemeDropdown() {
  const [selectedScheme, setSelectedScheme] = useState<string>("")

  const handleSchemeChange = (value: string) => {
    setSelectedScheme(value)
    // Here you would typically fetch scheme details or update the chat
  }

  return (
    <Select value={selectedScheme} onValueChange={handleSchemeChange}>
      <SelectTrigger className="w-[200px]" aria-label="Government scheme lookup">
        <SelectValue placeholder="Govt. Schemes" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="women">Women Schemes</SelectItem>
        <SelectItem value="pwd">PWD Schemes</SelectItem>
        <SelectItem value="sc-st">SC/ST Schemes</SelectItem>
        <SelectItem value="minority">Minority Schemes</SelectItem>
        <SelectItem value="farmer">Farmer Schemes</SelectItem>
        <SelectItem value="senior">Senior Citizen Schemes</SelectItem>
      </SelectContent>
    </Select>
  )
}

