"use client"
import { DeleteComponent } from "./delete-component"
import { EditorElement, useEditor } from "../../../provider"
import React from "react"

type Props = {
  element: EditorElement
}
export function Text({ element }: Props) {
  const { content, styles, id } = element
  const { dispatch, state } = useEditor()

  const handleDeleteElement = () => {
    dispatch({
      type: 'DELETE_ELEMENT',
      payload: { elementDetails: element },
    })
  }

  const handleOnClickBody = (e: React.MouseEvent) => {
    e.stopPropagation()
    dispatch({
      type: 'CHANGE_CLICKED_ELEMENT',
      payload: {
        elementDetails: element,
      },
    })
  }

  return (
    <div
      style={{
        ...styles,
        position: "relative",
        width: "100%",
        border: (state.editor.selectedElement.id === id &&
          !state.editor.liveMode &&
          state.editor.selectedElement.type !== '__body')
          ? "1px solid #0066cc"
          : (state.editor.selectedElement.id === id &&
            !state.editor.liveMode &&
            state.editor.selectedElement.type === '__body')
            ? "1px solid #003232"
            : ""
      }}
      onClick={handleOnClickBody}
    >
      <span
        contentEditable={!state.editor.liveMode}
        onBlur={(e) => {
          const spanElement = e.target as HTMLSpanElement
          dispatch({
            type: 'UPDATE_ELEMENT',
            payload: {
              elementDetails: {
                ...element,
                content: {
                  innerText: spanElement.innerText,
                },
              },
            },
          })
        }}
      >
        {!Array.isArray(content) &&
          content.innerText}
      </span>

      {state.editor.selectedElement.id === id &&
        !state.editor.liveMode && (
          <DeleteComponent handleDelete={handleDeleteElement} />
        )}

    </div>
  )
}