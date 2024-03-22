'use client'

import * as React from "react"
import { colors, size } from "../utils"
import { useTheme } from "../provider"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> { }

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ style, type, ...props }, ref) => {
    const { theme } = useTheme()
    return (
      <input
        type={type}
        style={{
          display: "flex",
          height: theme.sizes["4xl"],
          width: "100%",
          borderRadius: theme.sizes.sm,
          border: theme.borders.input,
          background: theme.colors.input,
          color: theme.colors["text-primary"],
          padding: size({
            x: "lg",
            y: "md"
          }),
          ...style
        }}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
