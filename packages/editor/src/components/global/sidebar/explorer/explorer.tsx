"use client"

import React from "react"
import { EditorElement, useEditor } from "../../../../provider"
import { Typography, useTheme } from "@pytsx/ui"

export const Explorer = () => {
  const { state } = useEditor()
  const elements = state.editor.elements
  const { theme } = useTheme()
  return (
    <section style={{
      display: "flex",
      flexDirection: "column",
      padding: theme.sizes.sm
    }}>
      {
        elements.map(element => (
          <ExplorerRecursive
            element={element}
            key={element.id + "_explorer"}
          />
        ))
      }
    </section>
  )
}


export const ExplorerRecursive = ({ element }: { element: EditorElement }) => {
  const needRecursive = !!Array.isArray(element.content)
  const { theme } = useTheme()

  return (
    <section style={{
      border: theme.colors.muted,
      paddingLeft: theme.sizes.sm
    }}>
      <ExplorerItem element={element}>
        <Typography>
          {element.name}
        </Typography>
      </ExplorerItem>
    </section>
  )
}

export const ExplorerItem = ({
  children,
  element
}: {
  children: React.ReactNode,
  element: EditorElement

}) => {
  const { theme } = useTheme()
  return (
    <section
      style={{
        display: "flex",
        flexDirection: "column",
        gap: theme.sizes.xs
      }}
    >
      <div
        style={{
          display: "flex",
          padding: theme.sizes.sm,
          width: "100%",
          boxShadow: `0 0 0 1px ${theme.colors.muted}`,
          borderRadius: theme.sizes["2xs"]
        }}
      >
        {children}
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: theme.sizes.xs,
        }}
      >
        {Array.isArray(element.content) && element.content.map(item => (
          <ExplorerRecursive element={item} key={item.id + "_child_" + element.id} />
        ))
        }
      </div>
    </section>
  )
}