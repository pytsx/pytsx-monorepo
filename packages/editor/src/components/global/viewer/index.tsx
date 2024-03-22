"use client"
import React from "react"
import { Recursive } from "../../editor/_components/recursive"
import { useEditor } from "../../../provider"
import { size } from "../../ui/utils"

type Props = {
  liveMode: boolean
  content: string
}

export function Viewer({ content, liveMode }: Props) {
  const { dispatch, state } = useEditor()

  React.useEffect(() => {
    if (content) {
      dispatch({
        type: "LOAD_DATA",
        payload: {
          elements: JSON.parse(content || ""),
          withLive: !!liveMode
        }
      })
    }
  }, [content])

  return (
    <div
      style={{
        /* Center when not in preview/live modes */
        marginLeft: "auto",
        marginRight: "auto",
        width: "100%",
        height: "100%",
        /* Apply device-specific widths */
        ...(state.editor.device === "Tablet" && { maxWidth: "850px" }),
        ...(state.editor.device === "Mobile" && { maxWidth: "420px" }),
        ...(state.editor.device === "Desktop" && { maxWidth: "100%" }),
        /* Remove padding for preview/live modes */
        ...(state.editor.previewMode || state.editor.liveMode ? {
          padding: 0,
        } : {
          padding: size("4xl")
        }),
      }}
    >
      {Array.isArray(state.editor.elements) &&
        state.editor.elements.map((childElement) => (
          <Recursive element={childElement} key={childElement.id} />
        ))}
    </div>
  )
}