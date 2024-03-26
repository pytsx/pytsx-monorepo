"use client"
import { ArrowUp, ArrowDown, LucideIcon } from "lucide-react"
import React from "react"
import { EditorElement, useEditor } from "../../../../provider"
import { useTheme } from "@pytsx/ui"

export function MoveElement({ element }: { element: EditorElement }) {
  const { theme } = useTheme()
  const { dispatch, state } = useEditor()

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
      onClick={() => dispatch({
        type: "MOVE_ELEMENT_POSITION",
        payload: {
          direction: "up",
          elementDetails: element
        }
      })}
      style={styles.button}
      disabled={element.position <= 0}
    >
      <ArrowUp style={styles.icon} />
    </button>
    <button
      onClick={() => dispatch({
        type: "MOVE_ELEMENT_POSITION",
        payload: {
          direction: "down",
          elementDetails: element
        }
      })}
      style={styles.button}
    >
      <ArrowDown style={styles.icon} />
    </button>
  </>
}
