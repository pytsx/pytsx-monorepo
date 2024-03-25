"use client"
import { Trash } from "lucide-react";
import React from "react";
import { colors, useTheme } from "@pytsx/ui";
import { EditorElement, useEditor } from "../../../../provider";

export function DeleteElement({ element }: { element: EditorElement }) {
  const { dispatch } = useEditor()
  const { theme } = useTheme()
  const { xs, sm, md } = theme.sizes

  const handleDeleteElement = () => {
    dispatch({
      type: 'DELETE_ELEMENT',
      payload: {
        elementDetails: element,
      },
    })
  }

  return (
    <button
      style={{
        cursor: "pointer",
        background: colors("dangerous"),
        padding: sm,
        borderRadius: xs,
        width: "fit-content",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}
      onClick={handleDeleteElement}
    >
      <Trash
        style={{
          color: "#fafafaaf",
          width: md,
          height: md
        }}
      />
    </button>
  )
}