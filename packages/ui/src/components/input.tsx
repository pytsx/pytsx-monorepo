"use client"
import * as React from "react"
import { useTheme } from "../provider"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> { }

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ style, type, ...props }, ref) => {
    const { theme } = useTheme()
    return (
      <input
        style={{
          background: theme.colors.input,
          border: theme.borders.muted,
          padding: `${theme.sizes.sm} ${theme.sizes.lg}`,
          color: theme.colors["text-primary"],
          borderRadius: theme.sizes.xs,
          width: "100%",
          ...style
        }}
        type={type}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
