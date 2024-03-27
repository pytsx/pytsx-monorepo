"use client"
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
      disableOnDrop 
    >
      <Typography style={styles}>
        {!Array.isArray(content) &&
          content?.innerText || ""
        }
      </Typography>
    </SelectionBox>
  )
}