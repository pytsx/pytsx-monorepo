"use client"

import React from "react";
export * from "./_components"
import { Viewer } from "./_components";

import { useEditor } from "../../provider";
import { Sidebar } from "../global/sidebar";
import { Appbar } from "../global";
import { createScroll } from "../../components/ui/utils"

type Props = {
  liveMode?: boolean
  content: string
}

export function Editor({ liveMode, content }: Props) {
  const { dispatch, state } = useEditor()

  React.useEffect(() => {
    dispatch({
      type: "TOGGLE_LIVE_MODE",
      payload: { value: !!liveMode }
    })
  }, [liveMode])

  React.useEffect(() => {
    const isBrowser = () => typeof window !== 'undefined'; //The approach recommended by Next.js
    function scrollToTop() {
      if (!isBrowser()) return;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    scrollToTop()
  }, [state.editor.liveMode])

  return (
    <section
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        position: "relative",
        overflow: state.editor.liveMode ? "auto" : "hidden",
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