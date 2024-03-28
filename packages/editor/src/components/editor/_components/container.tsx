"use client"
import { EditorElement, useEditor } from "../../../provider";
import React from "react";
import { Recursive } from "./recursive";
import { createScroll, useTheme } from "@pytsx/ui";
import { SelectionBox } from "./selection-box";
import { v4 } from "uuid"

type Props = { element: EditorElement }

export function Container({ element }: Props) {
  const { content, styles, type, id } = element
  const { state } = useEditor()
  const { theme } = useTheme()


  const editMode: Record<string, React.CSSProperties> = {
    body: {
      height: "100%",
      minHeight: "95vh",
      width: "100%",
      margin: "auto",
      overflowY: "auto",
      paddingTop: theme.sizes["3xl"],
      paddingBottom: theme.sizes["6xl"],
      ...createScroll()
    },
    bodySelection: {
      height: "100%",
      margin: "auto auto",
      borderRadius: theme.sizes["2xs"],
      boxShadow: `0 0 0 1px ${theme.colors.muted}`,
      background: theme.colors.card
    },
    container: {
      border: theme.borders.muted
    }
  }

  const isLiveMode = state.editor.liveMode
  const isEditMode = !isLiveMode
  const isBody = type === '__body'
  const selectedElement = state.editor.selectedElement
  const isSelectedElement = selectedElement.id === id
  const isSelectedElementBody = selectedElement.type === '__body'


  return (
    <SelectionBox element={element} style={{
      ...(isSelectedElement && isEditMode && !isSelectedElementBody) && editMode.container,
      ...(isEditMode && isBody && editMode.bodySelection),
    }}>
      <div style={{
        ...styles,
        ...(isEditMode && isBody && editMode.body),
        ...(!isEditMode && isBody && {
        })
      }}>
      {
        Array.isArray(content) &&
          content.sort((a, b) => (a?.position || 0) - (b?.position || 0)).map((childElement) => (
          <Recursive
              key={childElement.id + v4()}
            element={childElement}
          />
        ))
        }
      </div>

    </SelectionBox>
  )
}