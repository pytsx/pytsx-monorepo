import React, { CSSProperties } from "react"
import { size } from "./utils"

const IconVariant = (active: boolean, disabled: boolean) => ({
  width: size("6xl"),
  height: size("6xl"),
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