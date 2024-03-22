'use client'

import React from 'react'
import ComponentsPlaceholders from '../add-component/components-placeholders'
import { useEditor } from '../../../provider'
import { SettingsButton } from './settings/settings-button'
import { border, colors, size, createScroll } from '../../ui/utils'
import { Settings } from './settings'

export type SidebarTabs = "settings" | "components"

export const Sidebar = () => {
  const { state } = useEditor()
  const [active, setActive] = React.useState<SidebarTabs>("settings")
  return (
    <aside
      style={{
        maxHeight: "95vh",
        height: "100%",
        borderLeft: border("muted"),
        background: colors("card"),
        zIndex: 500,
        overflowY: "auto",
        overflowX: "hidden",
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
            padding: size({
              x: "lg",
              y: "xs"
            }),
            borderBottom: border(),
            display: state.editor.previewMode ? "none" : "flex"
          }}
        >
          <SettingsButton setActive={setActive} active={active} />
        </section>

        <section
          style={{
            zIndex: 100,
            height: "100%",
            transition: "all 75ms ease-in-out",
            display: state.editor.previewMode ? "none" : "flex",
            padding: size("md"),
          }}
        >
          <div
            style={{
              width: "100%",
              display: "flex",
              gap: "1rem",
              height: "100%"
            }}
          >
            <div style={{
              ...(active !== "settings" && { display: "none" })
            }} >
              <Settings />
            </div>
            <div style={{ ...(active !== "components" && { display: "none" }) }}>
              <ComponentsPlaceholders />
            </div>
          </div>
        </section>

      </div>
    </aside>
  )
}