"use client"
import { Input, Typography, useTheme } from "@pytsx/ui";
import React from "react";

interface IInput extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
  partialInputs: {

  }
}


export const InputMultifield = React.forwardRef<HTMLInputElement, IInput>((props, ref) => {
  const { label } = props
  const { theme } = useTheme()

  return (
    <>
      <Typography >{label}</Typography>
      {/* 
      <div style={{ display: "flex", flexDirection: "column", gap: theme.sizes.sm }}>
        <div style={{ display: "flex", gap: theme.sizes.sm }}>
          <div>
            <Typography >Top</Typography>
            <Input
              id="marginTop"
              placeholder="0"
              value={state.editor.selectedElement.styles.marginTop}
            />
          </div>
          <div>
            <Typography >Bottom</Typography>
            <Input
              placeholder="0"
              id="marginBottom"
              value={state.editor.selectedElement.styles.marginBottom}
            />
          </div>
        </div>
        <div style={{ display: "flex", gap: theme.sizes.sm }}>
          <div>
            <Typography >Left</Typography>
            <Input
              placeholder="0"
              id="marginLeft"
              value={state.editor.selectedElement.styles.marginLeft}
            />
          </div>
          <div>
            <Typography >Right</Typography>
            <Input
              placeholder="0"
              id="marginRight"
              value={state.editor.selectedElement.styles.marginRight}
            />
          </div>
        </div>
      </div> */}
    </>
  )
})