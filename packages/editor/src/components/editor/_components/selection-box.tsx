"use client"

import React from "react"
import { EditorBtns, EditorElement, useEditor } from "../../../provider"
import { Badge, useTheme } from "@pytsx/ui"
import { v4 } from 'uuid'
import { DeleteComponent } from "./delete-component"

type Props = {
  element: EditorElement
  style?: React.CSSProperties
  children: React.ReactNode
  disableOnDrop?: boolean
  strictStyle?: boolean
}

export function SelectionBox({ element, style: selectionBoxStyles, children, disableOnDrop, strictStyle }: Props) {
  const { state, dispatch } = useEditor()
  const { id, name, styles } = element
  const { theme } = useTheme()

  const defaultStyles: React.CSSProperties = {
    backgroundPosition: 'center',
    objectFit: 'cover',
    backgroundRepeat: 'no-repeat',
    textAlign: 'left',
    opacity: '100%',
    padding: theme.sizes.md,
  }

  const handleOnDrop = (e: React.DragEvent, type: string) => {
    e.stopPropagation()
    if (state.editor.liveMode || !!disableOnDrop) return

    const componentType = e.dataTransfer.getData('componentType') as EditorBtns
    switch (componentType) {
      case 'text':
        dispatch({
          type: 'ADD_ELEMENT',
          payload: {
            containerId: id,
            elementDetails: {
              content: { innerText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.' },
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
              styles: { ...defaultStyles, height: "320px" },
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



  const isLiveMode = state.editor.liveMode
  const isEditMode = !isLiveMode

  const selectedElement = state.editor.selectedElement
  const isSelectedElement = selectedElement.id === id
  const isSelectedElementBody = selectedElement.type === '__body'


  return (
    <div
      style={{
        position: "relative",
        border: (state.editor.selectedElement.id === id &&
          !state.editor.liveMode &&
          state.editor.selectedElement.type !== '__body')
          ? theme.borders.primary
          : "",
        ...(strictStyle ? {} : styles),
        ...selectionBoxStyles,
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
        disabled={!(isSelectedElement && isEditMode)}
      >
        {name}
      </Badge>

      {isSelectedElement && isEditMode && !isSelectedElementBody && (
        <DeleteComponent handleDelete={handleDeleteElement} />
      )}

      {children}

    </div>
  )
}