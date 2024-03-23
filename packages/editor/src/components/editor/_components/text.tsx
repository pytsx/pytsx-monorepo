"use client"
import { DeleteComponent } from "./delete-component"
import { EditorElement, useEditor } from "../../../provider"
import React from "react"
import { Typography, useTheme } from "@pytsx/ui"
import { SelectionBox } from "./selection-box"

type Props = {
  element: EditorElement
}
export function Text({ element }: Props) {
  const { content, styles } = element
  const { dispatch, state } = useEditor()

  return (
    <SelectionBox
      element={element}
      style={{ width: "100%" }}
      strictStyle
      disableOnDrop 
    >
      <Typography
        style={styles}
        contentEditable={!state.editor.liveMode}
        onBlur={(e) => {
          const spanElement = e.target as HTMLSpanElement
          dispatch({
            type: 'UPDATE_ELEMENT',
            payload: {
              elementDetails: {
                ...element,
                content: {
                  innerText: spanElement.innerText || "",
                },
              },
            },
          })
        }}
      >
        {!Array.isArray(content) &&
          content.innerText || ""
        }
      </Typography>
    </SelectionBox>
  )
}