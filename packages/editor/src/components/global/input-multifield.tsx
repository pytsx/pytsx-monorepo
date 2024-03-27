"use client"
import { Input, Typography, useTheme } from "@pytsx/ui";
import { LucideIcon, MaximizeIcon, Minimize } from "lucide-react";
import React from "react";

interface IInputBase extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
}

interface IInput {
  label: string
  mainInput: IInputBase
  multipleInputs: IInputBase[]
}


export const InputMultifield = React.forwardRef<HTMLInputElement, IInput>((props, ref) => {
  const { label, mainInput, multipleInputs } = props
  const { theme } = useTheme()

  const [open, setOpen] = React.useState<boolean>(false)

  const Icon: LucideIcon = {
    mazimize: MaximizeIcon,
    minimize: Minimize
  }[open ? "minimize" : "mazimize"]

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      gap: theme.sizes.xs,
    }}>
      <div style={{
        display: "flex",
        gap: theme.sizes.sm,
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
      }}>
        <Typography style={{ userSelect: "none", textTransform: "capitalize" }}>{label}</Typography>
        <Icon
          onClick={() => setOpen(prev => !prev)}
          style={{
            width: theme.spacing[6],
            height: theme.spacing[6],
            color: theme.colors["text-primary"],
            cursor: "pointer"
          }}
        />
      </div>
      {!open && <Input  {...mainInput} />}
      {open && <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(2, 1fr)",
        gridAutoRows: "auto",
        gridAutoFlow: "row dense",
        gap: theme.sizes.xs,
      }}>
        {
          multipleInputs.map(prop => (
            <label htmlFor={prop.id + prop.label} key={prop.id + prop.label}>
              <Typography style={{ userSelect: "none", fontSize: ".8rem" }}>{prop.label}</Typography>
              <Input autoFocus aria-label={prop.id} key={prop.id + prop.label}  {...prop} />
            </label>
          ))
        }
      </div>}
    </div>
  )
})