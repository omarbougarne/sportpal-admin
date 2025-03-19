"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Palette } from "lucide-react"
import { fitnessThemes } from "@/styles/themes/fitness-theme"

export function ThemeStyleSwitcher() {
  const [mounted, setMounted] = useState(false)

  // Apply theme by updating CSS variables
  const applyTheme = (themeName: keyof typeof fitnessThemes) => {
    const theme = fitnessThemes[themeName]

    Object.entries(theme).forEach(([key, value]) => {
      document.documentElement.style.setProperty(`--${key}`, value)
    })

    // Save theme preference
    localStorage.setItem("fitness-theme", themeName)
  }

  // Initialize theme from localStorage
  useEffect(() => {
    setMounted(true)
    const savedTheme = localStorage.getItem("fitness-theme") as keyof typeof fitnessThemes
    if (savedTheme && fitnessThemes[savedTheme]) {
      applyTheme(savedTheme)
    }
  }, [])

  if (!mounted) return null

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Palette className="h-[1.2rem] w-[1.2rem]" />
          <span className="sr-only">Toggle theme style</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => applyTheme("default")}>Default</DropdownMenuItem>
        <DropdownMenuItem onClick={() => applyTheme("energetic")}>Energetic</DropdownMenuItem>
        <DropdownMenuItem onClick={() => applyTheme("calm")}>Calm</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

