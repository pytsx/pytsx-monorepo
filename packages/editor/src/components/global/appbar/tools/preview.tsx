"use client"
import React from "react";
import { useEditor } from "../../../../provider";
import { Edit2, EyeIcon } from "lucide-react";
import { colors, size } from "../../../ui/utils";
import Link from "next/link";

export function Preview() {
  const { state, dispatch } = useEditor()


  const handlePreviewClick = () => {
    dispatch({ type: 'TOGGLE_PREVIEW_MODE' })
    dispatch({ type: 'TOGGLE_LIVE_MODE' })
  }

  return (
    <Link
      href={"#editor"}
      onClick={handlePreviewClick}
      style={{
        ...(state.editor.liveMode ? {
          position: "fixed",
          bottom: size("sm"),
          right: size("xl"),
          background: colors("primary"),
          borderRadius: "50rem",
          padding: size("md"),
          zIndex: 500,
        } : {
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }),
      }}
    >
      {state.editor.liveMode ? <Edit2 /> : <EyeIcon />}
    </Link>
  )
}
