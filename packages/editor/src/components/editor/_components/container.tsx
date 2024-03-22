"use client"
import clsx from "clsx";
import { v4 } from "uuid"
import { EditorBtns, EditorElement, useEditor } from "../../../provider";
import React from "react";
import { Recursive } from "./recursive";
import { DeleteComponent } from "./delete-component";
import { Badge } from "../../ui/badge";
import { size, createScroll } from "../../ui/utils";

export const defaultStyles: React.CSSProperties = {
  backgroundPosition: 'center',
  objectFit: 'cover',
  backgroundRepeat: 'no-repeat',
  textAlign: 'left',
  opacity: '100%',
  background: "#1d1d1d32",
  padding: size("sm")
}

type Props = { element: EditorElement }

export function Container({ element }: Props) {
  const { content, styles, type, id } = element
  const { state, dispatch } = useEditor()

  const handleOnDrop = (e: React.DragEvent, type: string) => {
    e.stopPropagation()
    if (state.editor.liveMode) return

    const componentType = e.dataTransfer.getData('componentType') as EditorBtns
    switch (componentType) {
      case 'text':
        dispatch({
          type: 'ADD_ELEMENT',
          payload: {
            containerId: id,
            elementDetails: {
              content: { innerText: 'Text Element' },
              id: v4(),
              name: 'Text',
              styles: {
                color: 'black',
                ...defaultStyles,
              },
              type: 'text',
            },
          },
        })
        break
      case 'container':
        dispatch({
          type: 'ADD_ELEMENT',
          payload: {
            containerId: id,
            elementDetails: {
              content: [],
              id: v4(),
              name: 'Container',
              styles: { ...defaultStyles, minHeight: "320px" },
              type: 'container',
            },
          }
        })
        break
      case '2Col':
        dispatch({
          type: 'ADD_ELEMENT',
          payload: {
            containerId: id,
            elementDetails: {
              content: [
                {
                  content: [],
                  id: v4(),
                  name: 'Container',
                  styles: { ...defaultStyles, width: '100%' },
                  type: 'container',
                },
                {
                  content: [],
                  id: v4(),
                  name: 'Container',
                  styles: { ...defaultStyles, width: '100%' },
                  type: 'container',
                },
              ],
              id: v4(),
              name: 'Two Columns',
              styles: { ...defaultStyles, display: 'flex' },
              type: '2Col',
            },
          },
        })
        break
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  const handleDragStart = (e: React.DragEvent, type: string) => {
    if (type === '__body') return
    e.dataTransfer.setData('componentType', type) // share data during drag-and-drop operations
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

  const handleDeleteElement = () => {
    dispatch({
      type: 'DELETE_ELEMENT',
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
        ...(!state.editor.liveMode && element.type === '__body' && {
          minHeight: "64vh ",
          maxHeight: "90vh",
          overflowY: "auto",
          paddingBottom: size("6xl"),
          paddingTop: size("6xl"),
          ...createScroll()
        }),

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
      onDrop={(e) => handleOnDrop(e, id)}
      onDragOver={handleDragOver}
      draggable={false}
      onClick={handleOnClickBody}
    >
      <Badge
        style={{
          position: "absolute",
          top: '-26px',
          left: "-2px",
        }}
        disabled={!(state.editor.selectedElement.id === element.id &&
          !state.editor.liveMode)}
      >
        {element.name}
      </Badge>

      {state.editor.selectedElement.id === element.id &&
        !state.editor.liveMode &&
        state.editor.selectedElement.type !== '__body' && (
          <DeleteComponent handleDelete={handleDeleteElement} />
        )}

      {
        Array.isArray(content) &&
        content.map((childElement) => (
          <Recursive
            key={childElement.id}
            element={childElement}
          />
        ))
      }

    </div>
  )
}