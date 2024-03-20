"use client"

import React from "react";
export * from "./_components"
import { Viewer } from "./_components";

import { useEditor } from "../../provider";
import { Sidebar } from "../global/sidebar";
import { Appbar } from "../global";

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

  return (
    <section style={{ display: "flex", flexDirection: "column" }}>
      <Appbar />
      <div style={{ display: "flex" }}>
        <Viewer content={content} liveMode={!!liveMode} />
        {!state.editor.liveMode && <Sidebar />}
      </div>
    </section>
  );
}