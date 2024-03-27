"use client"
import React from "react"
import { Recursive } from "../../editor/_components/recursive"
import { useEditor } from "../../../provider"
import { size, useTheme } from "@pytsx/ui"

type Props = {
  liveMode: boolean
  content: string
}

export function Viewer({ content, liveMode }: Props) {
  const { dispatch, state } = useEditor()
  const { theme } = useTheme()
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

  function getPageDeviceWidth() {
    switch (state.editor.device) {
      case "Desktop":
      default:
        return "100%";
      case "Tablet":
        return theme.screens["screen-md"]
      case "Mobile":
        return theme.screens["screen-xs"]
    }
  }

  return (

    <section
      style={{
        /* Center when not in preview/live modes */
        marginLeft: "auto",
        marginRight: "auto",
        width: "100%",
        height: "100%",
        ...(state.editor.liveMode ? {
        /* Remove padding for live mode */
          padding: 0,
        } : {
            padding: `${theme.sizes["3xl"]} ${theme.sizes.md}`,
            maxHeight: "100%",
            /* Apply device-specific widths */
            maxWidth: getPageDeviceWidth(),
            width: "100%",
        }),
      }}
    >
      {Array.isArray(state.editor.elements) &&
        state.editor.elements.sort((a, b) => (a?.position || 0) - (b?.position || 0)).map((childElement) => (
          <Recursive element={childElement} key={childElement.id} />
        ))}
    </section>

  )
}