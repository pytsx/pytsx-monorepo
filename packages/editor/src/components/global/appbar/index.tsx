"use client"

import React from "react";

export * from "./tools"

import { Preview } from "./tools/preview";
import { ChangeDeviceMode } from "./tools/device-mode";
import { UndoRedo } from "./tools/undo-redo";
import { border, colors, size } from "../../ui/utils";
import { AddComponents } from "../add-component";
import { useEditor } from "../../../provider";

export function Appbar() {
  const { state } = useEditor()
  return (
    <nav style={{
      height: state.editor.liveMode ? "0" : "fit-content",
      width: "100%",
      position: "relative",
      borderBottom: state.editor.liveMode ? "" : border("muted"),
      background: colors("card"),
    }}>
      <div style={{
        height: "fit-content",
        width: "100%",
        display: "flex",
        gap: size("sm"),
        borderRadius: size("sm"),
        justifyContent: "space-between",
        alignItems: "center",
        padding: size({
          x: "lg",
          y: "xs"
        })
      }}>
        {!state.editor.liveMode && <AddComponents />}
        {!state.editor.liveMode && <ChangeDeviceMode />}
        <span style={{ display: "flex", gap: size("sm") }}>
          {!state.editor.liveMode && <UndoRedo />}
          <Preview />
        </span>
      </div>
    </nav>
  )
}