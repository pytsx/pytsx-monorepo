"use client"

import React from "react";
export * from "./_components"
import { Viewer } from "./_components";

import { useEditor } from "../../provider";
import { Sidebar } from "../global/sidebar";
import { Appbar } from "../global";
import { createScroll, useTheme, Palette } from "@pytsx/ui"

type Props = {
  liveMode?: boolean
  content: string
}

export function Editor({ liveMode, content }: Props) {
  const { dispatch, state } = useEditor()
  const { theme } = useTheme()

  React.useEffect(() => {
    dispatch({
      type: "TOGGLE_LIVE_MODE",
      payload: { value: !!liveMode }
    })
  }, [liveMode])

  return (
    <section
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        maxHeight: state.editor.liveMode ? "100%" : "100vh",
        position: "relative",
        overflow: state.editor.liveMode ? "auto" : "hidden",
        background: theme.colors.background, 
        ...createScroll()
      }}>
      <span id="editor" />

      <Appbar />

      <div style={{ display: "flex" }}>
        <Viewer content={content} liveMode={!!liveMode} />
        {!state.editor.liveMode && <Sidebar />}
      </div>
    </section>
  );
}