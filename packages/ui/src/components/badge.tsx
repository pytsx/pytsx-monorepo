'use client'
import React from "react"
import { useTheme } from "../provider"
import { Typography } from "./typography"

type Props = {
  children: React.ReactNode
  style?: React.CSSProperties
  disabled?: boolean
}
export function Badge({ children, style, disabled }: Props) {
  const { theme } = useTheme()
  const { xs, md } = theme.sizes

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
        borderRadius: xs,
        border: theme.borders.primary,
        fontSize: "smaller",
        padding: `0 ${md}`,
        ...customStyle,
        background: "trasparent",
        backdropFilter: "blur(8px)"
      }}
      variant={"span"}
    >
      {children}
    </Typography>
  )
}