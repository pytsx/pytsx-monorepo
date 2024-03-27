"use client"
import React from "react"
import { useTheme } from "../provider"


type Prop = {
  onClick?: () => void
  children: React.ReactNode
  active?: boolean
  disabled?: boolean
}
export function IconButton({ children, active, onClick, disabled }: Prop) {
  const { theme } = useTheme()  
  const [mouseEnter, setMouseEnter] = React.useState<boolean>(false)
  const handleOnMouse = () => setMouseEnter(prev => !prev)

  return <button
    onMouseEnter={handleOnMouse}
    onMouseLeave={handleOnMouse}
    disabled={disabled || false}
    style={
      {
        width: theme.sizes["2xl"],
        height: theme.sizes["2xl"],
        padding: theme.sizes["2xs"],
        opacity: active ? "100%" : "60%",
        userSelect: "none",
        cursor: disabled ? "not-allowed" : "pointer",
        color: theme.colors["text-primary"],
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: theme.sizes["2xs"],
        boxShadow: active ? `0 0 0 2px ${theme.colors.muted}` : mouseEnter ? `0 0 0 1px ${theme.colors.muted}` : ""
      }
    }
    onClick={onClick}
  >
    {children}
  </button>
}