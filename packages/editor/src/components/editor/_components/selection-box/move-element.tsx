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

  return (["up", "down"] as const).map(action => {
    const Icons: Record<string, LucideIcon> = {
      up: ArrowUp,
      down: ArrowDown
    }
    const Icon = Icons[action]

    return (
      <button
        key={action + "_" + element.id}
        onClick={() => dispatch({
          type: "MOVE_ELEMENT_POSITION",
          payload: {
            direction: action,
            elementId: element.id
          }
        })}
        style={styles.button}
        disabled={action == "up" && element.position <= 0}
      >
        <Icon style={styles.icon} />
      </button>
    )
  })
}
