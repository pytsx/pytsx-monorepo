"use client"
import React from "react";
import { useEditor } from "../../../../provider";
import { Edit2, EyeIcon } from "lucide-react";
import Link from "next/link";
import { useTheme } from "@pytsx/ui";

export function Preview() {
  const { state, dispatch } = useEditor()
  const { theme } = useTheme()

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
          bottom: theme.sizes.sm,
          right: theme.sizes.xl,
          background: theme.colors.primary,
          borderRadius: "50rem",
          padding: theme.sizes.md,
          zIndex: 500,
          color: '#fafafa80',
        } : {
            color: theme.colors["text-primary"],
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
