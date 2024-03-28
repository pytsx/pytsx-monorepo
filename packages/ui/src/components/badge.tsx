'use client'
import React from "react"
import { useTheme } from "../provider"
import { Typography } from "./typography"

type Props = {
  children: React.ReactNode
  style?: React.CSSProperties
  disabled?: boolean
  dense?: boolean
}
export function Badge({ children, style, disabled, dense }: Props) {
  const { theme } = useTheme()

  const customStyle = {
    ...style,
    ...(disabled !== undefined && {
      display: disabled ? "none" : "block"
    }
    )
  }
  return (
    <Typography
      style={{
        borderRadius: theme.sizes["2xs"],
        border: theme.borders.muted,
        fontSize: "smaller",
        padding: dense ? `0 ${theme.sizes.sm}` : `0 ${theme.sizes.md}`,
        ...customStyle,
        background: "trasparent",
        backdropFilter: "blur(8px)",
        userSelect: "none"
      }}
      variant={"span"}
    >
      {children}
    </Typography>
  )
}