"use client"

import React from "react"
import { SidebarContainer } from "../container"
import { useEditor } from "../../../../provider"
import { Typography, useTheme } from "@pytsx/ui"
import { Explorer } from "./explorer"

export const ExplorerSidebar = () => {
  const { state } = useEditor()
  const { theme } = useTheme()
  return (
    <SidebarContainer>

      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column"
        }}
      >

        <div
          style={{
            borderBottom: theme.borders.muted,
            padding: theme.sizes.sm,
            width: "100%",
            overflow: "hidden",
            whiteSpace: "nowrap"
          }}
        >
          <Typography>
            {state.editor.selectedElement.name}
          </Typography>
        </div>

        <Explorer />
      </div>
    </SidebarContainer>
  )
}