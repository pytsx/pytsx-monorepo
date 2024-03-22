"use client"

import React from "react";
import { Plus } from "lucide-react";
import ComponentsPlaceholders from "./components-placeholders";
import { IconButton, useTheme } from "@pytsx/ui";

export function AddComponents() {
  const [active, setActive] = React.useState<boolean>(false)
  const { theme } = useTheme()
  return (
    <>
      <IconButton onClick={() => setActive(prev => !prev)} >
        <Plus />
      </IconButton>

      {
        active && <div style={{
          position: 'absolute',
          width: "fit-content",
          boxSizing: "border-box",
          top: "106%",
          border: theme.borders.muted,
          left: theme.sizes.xs,
          background: theme.colors.card,
          borderRadius: theme.sizes.xs,
          zIndex: 400,
          display: "flex",
        }}>
          <ComponentsPlaceholders />
        </div>
      }
    </>
  )
}