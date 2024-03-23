"use client"
import { useTheme } from "@pytsx/ui"
import React from "react"

type Props = {
  children: React.ReactNode
}
export function SettingsContainer({ children }: Props) {
  const { theme } = useTheme()
  return (
    <section
      style={{
        padding: `0 ${theme.spacing[6]}`,
        width: "100%",
      }}>
      {children}
    </section>
  )

}