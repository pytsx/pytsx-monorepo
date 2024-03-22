
import React from "react"
import { colors, sizes } from "./utils"

type Props = {
  children: React.ReactNode
  style?: React.CSSProperties
  disabled?: boolean
}
export function Badge({ children, style, disabled }: Props) {
  const { xs } = sizes()
  const customStyle = {
    ...style,
    ...(disabled !== undefined && {
      display: disabled ? "none" : "block"
    }
    )
  }
  return (
    <span
      style={{
        borderRadius: xs,
        border: "1px solid #3d3d3daf",
        background: "#fafafa",
        color: colors("card"),
        fontSize: "smaller",
        padding: `0 ${xs}`,
        ...customStyle,
      }}
    >
      {children}
    </span>
  )
}