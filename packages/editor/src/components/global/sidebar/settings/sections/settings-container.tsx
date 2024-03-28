"use client"
import { Typography, useTheme } from "@pytsx/ui"
import React from "react"

type Props = {
  children: React.ReactNode
  label?: string
  actions?: React.ReactNode
}
export function SettingsContainer({ children, label, actions }: Props) {
  const { theme } = useTheme()
  return (
    <section
      style={{
        width: "100%",
        borderBottom: theme.borders.muted
      }}>
      <div style={{
        width: "100%",
        padding: `${theme.sizes.md} ${theme.sizes.lg}`,
        display: "flex",
        flexDirection: "column",
        gap: theme.sizes.md,
        fontSize: ".84rem !important"
      }}>
        <span style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          gap: theme.sizes.sm
        }}>

          <Typography style={{ fontWeight: 600, userSelect: "none" }}>{label}</Typography>
          {actions && actions}
        </span>
        <div style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          gap: theme.sizes.md
        }}>

          {children}
        </div>
      </div>
    </section>
  )

}