"use client"

import React from "react";
export * from "./_components"
import { Viewer } from "./_components";

import { useEditor } from "../../provider";
import { SettingsSidebar } from "../global/sidebar/settings";
import { Appbar } from "../global";
import { createScroll, useTheme, Palette } from "@pytsx/ui"
import { ExplorerSidebar } from "../global/sidebar";

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

      <div style={{ display: "flex", height: state.editor.liveMode ? "auto" : "calc(100vh - 48px)" }}>
        {!state.editor.liveMode && <ExplorerSidebar />}
        <Viewer content={content} liveMode={!!liveMode} />
        {!state.editor.liveMode && <SettingsSidebar />}
      </div>
    </section>
  );
}