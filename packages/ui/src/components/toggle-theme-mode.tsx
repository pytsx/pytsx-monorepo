'use client'
import { MoonIcon, SunIcon } from 'lucide-react'
import React from 'react'
import { useTheme } from '../provider'
import * as NextProvider from "next-themes"

export function ToggleThemeMode() {
  const { setMode, mode, theme } = useTheme()
  const { setTheme } = NextProvider.useTheme()

  function toggleMode() {
    const newMode = mode !== "dark" ? "dark" : "light"
    setMode(newMode)
    setTheme(newMode)
  }

  return (
    <button onClick={toggleMode}
      style={{
        color: theme.colors["text-primary"]
      }}>
      {mode === 'dark' ? <SunIcon /> : <MoonIcon />}

    </button>
  )
}