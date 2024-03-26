"use client"
import { ArrowUp, ArrowDown, LucideIcon } from "lucide-react"
import React from "react"
import { EditorElement, useEditor } from "../../../../provider"
import { useTheme } from "@pytsx/ui"

export function MoveElement({ element }: { element: EditorElement }) {
  const { theme } = useTheme()
  const { dispatch, state } = useEditor()

  const moveElement = (type: "up" | "down") => {
    dispatch({
      type: "MOVE_ELEMENT_POSITION",
      payload: {
        direction: type,
        elementId: element.id
      }
    })
  }

  const styles = {
    button: {
      padding: theme.sizes.sm,
      background: theme.colors.card,
      borderRadius: theme.sizes.xs,
      boder: theme.borders.muted
    },
    icon: {
      color: theme.colors["text-primary"],
      width: theme.sizes.md,
      height: theme.sizes.md
    }
  }

  return <>
    <button
      onClick={() => moveElement("up")}
      style={styles.button}
      disabled={element.position <= 0}
    >
      <ArrowUp style={styles.icon} />
    </button>
    <button
      onClick={() => moveElement("down")}
      style={styles.button}
    >
      <ArrowDown style={styles.icon} />
    </button>
  </>
}
