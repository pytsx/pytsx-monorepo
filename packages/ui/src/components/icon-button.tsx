"use client"
import React, { CSSProperties } from "react"
import { useTheme } from "../provider"


type Prop = {
  onClick?: () => void
  children: React.ReactNode
  active?: boolean
  disabled?: boolean
}
export function IconButton({ children, active, onClick, disabled }: Prop) {
  const { theme } = useTheme()

  return <button
    disabled={disabled || false}
    style={
      {
        width: theme.sizes["6xl"],
        height: theme.sizes["6xl"],
        padding: "0",
        opacity: active || !disabled ? "100%" : "60%",
        userSelect: "none",
        cursor: disabled ? "not-allowed" : "pointer",
        color: theme.colors["text-primary"]
      }
    }
    onClick={onClick}
  >
    {children}
  </button>
}