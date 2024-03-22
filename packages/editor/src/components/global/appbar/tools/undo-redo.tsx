"use client"
import React from "react";
import { useEditor } from "../../../../provider";
import { Redo2, Undo2 } from "lucide-react";
import { IconButton } from "@pytsx/ui";

export function UndoRedo() {
  const { dispatch, state } = useEditor()

  const handleUndo = () => {
    dispatch({ type: 'UNDO' })
  }

  const handleRedo = () => {
    dispatch({ type: 'REDO' })
  }

  return (
    <aside style={{
      display: "flex",
      flexDirection: "row",
      gap: ".25rem"
    }}>
      <IconButton
        disabled={!(state.history.currentIndex > 0)}
        onClick={handleUndo}
      >
        <Undo2 />
      </IconButton>
      <IconButton
        disabled={
          !(state.history.currentIndex < state.history.history.length - 1)
        }
        onClick={handleRedo}
      >
        <Redo2 />
      </IconButton>
    </aside>
  )
}