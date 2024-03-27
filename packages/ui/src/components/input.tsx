"use client"
import * as React from "react"
import { useTheme } from "../provider"
import { Typography } from "./typography"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  startAdornment?: string | React.ReactNode
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ style, type, label, id, startAdornment, ...props }, ref) => {
    const { theme } = useTheme()
    const [mouseEnter, setMouseEnter] = React.useState<boolean>(false)
    const [isSelected, setisSelected] = React.useState<boolean>(false)
    const handleMouseEnter = () => setMouseEnter(prev => isSelected ? true : !prev)
    const onClick = () => setisSelected(true)
    const onClose = () => {
      setisSelected(false)
      setMouseEnter(false)
    }
    return (
      <label
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseEnter}
        onFocus={onClick}
        onBlur={onClose}
        htmlFor={id}
        style={{
          color: theme.colors["text-primary"],
          padding: `${theme.sizes.xs} ${theme.sizes.md}`,
          boxShadow: mouseEnter && !isSelected ? `0 0 0 1px ${theme.colors["text-primary"]}` : isSelected ? `0 0 0 2px ${theme.colors["text-primary"]}` : "",
          borderRadius: theme.sizes["2xs"],
          display: "flex",
          alignItems: "center",
          gap: theme.sizes.sm,
          fontSize: ".85rem !important"
        }}
      >
        {label && <Typography style={{ userSelect: "none", textTransform: "capitalize" }}>
          {label}
        </Typography>}

        {startAdornment && startAdornment}

      <input
          id={id}
        style={{
          all: "unset",
          background: theme.colors.card,
          padding: `${theme.sizes.xs} ${theme.sizes.sm}`,
          border: "none !important",
          outline: "none !important",
          width: "100%",
          ...style
        }}
        type={type}
        ref={ref}
        {...props}
        />
      </label>
    )
  }
)
Input.displayName = "Input"

export { Input }
