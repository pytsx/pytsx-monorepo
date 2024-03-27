"use client"

import React from "react";

export * from "./tools"

import { Preview } from "./tools/preview";
import { ChangeDeviceMode } from "./tools/device-mode";
import { UndoRedo } from "./tools/undo-redo";
import { AddComponents } from "../add-component";
import { useEditor } from "../../../provider";
import { Avatar, ToggleThemeMode, size, useTheme } from "@pytsx/ui";

export function Appbar() {
  const { state } = useEditor()
  const { theme } = useTheme()

  return (
    <nav style={{ 
      height: state.editor.liveMode ? "0" : "48px",
      width: "100%",
      position: "relative",
      borderBottom: state.editor.liveMode ? "" : theme.borders.muted,
      background: theme.colors.card,
      display: "flex",
      alignItems: "center"
    }}>
      <div style={{
        height: "fit-content",
        width: "100%",
        display: "flex",
        gap: theme.sizes.sm,
        borderRadius: theme.sizes.sm,
        justifyContent: "space-between",
        alignItems: "center",
        padding: size({
          x: "lg",
          y: "xs"
        })
      }}>
        {!state.editor.liveMode && <AddComponents />}
        {!state.editor.liveMode && <ChangeDeviceMode />}
        <span style={{ display: "flex", gap: theme.sizes.sm }}>
          {!state.editor.liveMode && <ToggleThemeMode />}
          {!state.editor.liveMode && <UndoRedo />}
          <Preview />
          {/* <Avatar seed="oi" /> */}
        </span>


      </div>
    </nav>
  )
}