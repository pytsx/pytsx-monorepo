"use client"
import { LucideIcon, MaximizeIcon, Minimize } from "lucide-react";
import React from "react";
import { useTheme } from "../provider";
import { Input, InputProps } from "./input";
import { Typography } from "./typography";
import { IconButton } from "./icon-button";

interface IInput {
  label: string
  mainInput: InputProps | InputProps[]
  multipleInputs: InputProps[]
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
        <IconButton active={open} onClick={() => setOpen(prev => !prev)}>
          <Icon
            height={theme.sizes.lg}
            width={theme.sizes.lg}
          />
        </IconButton>
      </div>
      {<div style={{
        display: "grid",
        gridTemplateColumns: "repeat(2, 1fr)",
        gridAutoRows: "auto",
        gridAutoFlow: "row dense",
        gap: theme.sizes.sm,
      }}>
        {
          !open && (!Array.isArray(mainInput)
            ? <Input  {...mainInput} />
            : mainInput.map((prop) => (
              <Input aria-label={prop.id} key={prop.id} {...prop} />
            )))
        }
        {
          open && multipleInputs.map((prop, index) => (
            <Input autoFocus={index == 0 ? true : false} aria-label={prop.id} key={prop.id}  {...prop} />
          ))
        }
      </div>}
    </div>
  )
})