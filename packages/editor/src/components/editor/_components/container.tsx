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
      minHeight: "90vh",
      maxHeight: "90vh",
      width: "100%",
      margin: "auto",
      overflowY: "auto",
      paddingBottom: theme.sizes["3xl"],
      paddingTop: theme.sizes["6xl"],
      ...createScroll()
    },
    bodySelection: {
      margin: "auto auto",
      borderRadius: theme.sizes.sm,
      border: theme.borders.primary,
    },
    container: {
      border: theme.borders.primary
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
        borderRadius: isEditMode && isSelectedElement && !styles.borderRadius ? theme.sizes.xs : styles.borderRadius || "" 
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