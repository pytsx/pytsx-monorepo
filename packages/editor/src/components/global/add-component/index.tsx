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
          left: "2px",
          background: theme.palette.gray[100],
          backdropFilter: "blur(8px)",
          borderRadius: theme.sizes.xs,
          zIndex: 600,
          display: "flex",
        }}>
          <ComponentsPlaceholders />
        </div>
      }
    </>
  )
}