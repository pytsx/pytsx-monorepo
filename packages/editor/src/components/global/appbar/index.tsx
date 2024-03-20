"use client"

import React from "react";

export * from "./tools"

import { Preview } from "./tools/preview";
import { ChangeDeviceMode } from "./tools/device-mode";
import { UndoRedo } from "./tools/undo-redo";

export function Appbar() {
  return (
    <nav style={{
      height: "fit",
      width: "100%",
      padding: ".25rem .5rem",
    }}>
      <div style={{
        background: "#0066cc",
        border: "2px solid #0066cc40",
        height: "fit",
        width: "100%",
        display: "flex",
        gap: ".5rem",
        padding: "0 1rem",
        borderRadius: ".5rem",
        justifyContent: "space-between",
        alignItems: "center"
      }}>
        <UndoRedo />
        <ChangeDeviceMode />
        <Preview />
      </div>
    </nav>
  )
}