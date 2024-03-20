import React, { CSSProperties } from "react"

const IconVariant = (active: boolean, disabled: boolean) => ({
  width: "2.5rem",
  height: "2.5rem",
  padding: "0",
  opacity: active || !disabled ? "100%" : "60%",
  userSelect: "none",
  cursor: disabled ? "not-allowed" : "pointer"
} as CSSProperties)

type Prop = {
  onClick?: () => void
  children: React.ReactNode
  active?: boolean
  disabled?: boolean
}
export function IconButton({ children, active, onClick, disabled }: Prop) {
  return <button
    disabled={disabled || false}
    style={IconVariant(!!active, disabled ? disabled : false)}
    onClick={onClick}
  >
    {children}
  </button>
}