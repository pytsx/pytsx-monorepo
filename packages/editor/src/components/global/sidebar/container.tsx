"use client"
import React from "react"
import { createScroll, useTheme } from '@pytsx/ui'
import { useEditor } from "../../../provider"

export const SidebarContainer = ({ children, side = "left" }: { children: React.ReactNode, side?: "left" | "right" }) => {
  const { theme } = useTheme()
  const { state } = useEditor()
  return (
    <aside
      style={{
        display: state.editor.previewMode ? "none" : "flex",
        maxHeight: "calc(100vh - 48px)",
        height: "100%",
        width: "264px",
        minWidth: "264px",
        maxWidth: "264px",
        borderLeft: side == "right" ? theme.borders.muted : "",
        borderRight: side == "left" ? theme.borders.muted : "",
        background: theme.colors.card,
        zIndex: 500,
        overflowY: "auto",
        overflowX: "hidden",
        paddingBottom: theme.sizes['6xl'],
        fontSize: ".8rem !important",
        ...createScroll(),
      }}
    >
      {children}
    </aside>
  )
}