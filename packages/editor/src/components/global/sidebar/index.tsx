'use client'

import React from 'react'
import { useEditor } from '../../../provider'
import { Settings } from './settings'
import { createScroll, useTheme, IconButton } from '@pytsx/ui'
import { SettingsIcon } from 'lucide-react'

export type SidebarTabs = "settings" | "components"

export const Sidebar = () => {
  const { state } = useEditor()
  const { theme } = useTheme()
  return (
    <aside
      style={{
        maxHeight: "95vh",
        height: "100%",
        width: "280px",
        minWidth: "280px",
        maxWidth: "280px",
        borderLeft: theme.borders.muted,
        background: theme.colors.card,
        zIndex: 500,
        overflowY: "auto",
        overflowX: "hidden",
        paddingBottom: theme.sizes['6xl'],
        ...createScroll(),
      }}
    >
      <div
        style={{
          width: "100%",
          position: "relative"
        }}
      >
        <section
          style={{
            width: "100%",
            zIndex: 200,
            padding: theme.sizes.sm,
            borderBottom: theme.borders.muted,
            display: state.editor.previewMode ? "none" : "flex"
          }}
        >
          <IconButton >
            <SettingsIcon />
          </IconButton>
        </section>

        <section
          style={{
            zIndex: 500,
            height: "100%",
            width: "100%",
            display: state.editor.previewMode ? "none" : "flex",
          }}
        >
          <Settings />
        </section>

      </div>
    </aside>
  )
}