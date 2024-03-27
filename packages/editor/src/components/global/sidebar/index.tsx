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
        width: "320px",
        minWidth: "320px",
        maxWidth: "320px",
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
            zIndex: 100,
            height: "100%",
            width: "100%",
            transition: "all 75ms ease-in-out",
            display: state.editor.previewMode ? "none" : "flex",
            padding: theme.sizes.md,
          }}
        >
          <div
            style={{
              width: "100%",
              display: "flex",
              height: "100%"
            }}
          >
            <div style={{
              gap: theme.sizes.md,
              display: "flex",
              flexDirection: "column",
              width: "100%",
            }} >
              <Settings />
            </div>

          </div>
        </section>

      </div>
    </aside>
  )
}