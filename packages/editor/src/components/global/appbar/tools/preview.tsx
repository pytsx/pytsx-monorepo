"use client"
import React from "react";
import { useEditor } from "../../../../provider";
import { EyeIcon } from "lucide-react";

export function Preview() {
  const { state, dispatch } = useEditor()

  const handlePreviewClick = () => {
    dispatch({ type: 'TOGGLE_PREVIEW_MODE' })
    dispatch({ type: 'TOGGLE_LIVE_MODE' })
  }

  return (
    <button onClick={handlePreviewClick}>
      <EyeIcon />
    </button>
  )
}
