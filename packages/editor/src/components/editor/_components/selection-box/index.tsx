"use client"

import React from "react"
import { EditorBtns, EditorElement, useEditor } from "../../../../provider"
import { Badge, useTheme } from "@pytsx/ui"
import { v4 } from 'uuid'
import { DeleteElement } from "./delete-element"
import { MoveElement } from "./move-element"

type Props = {
  element: EditorElement
  style?: React.CSSProperties
  children: React.ReactNode
  disableOnDrop?: boolean
}

export function SelectionBox({ element, style: selectionBoxStyles, children, disableOnDrop }: Props) {
  const { state, dispatch } = useEditor()
  const { id, name, content, type } = element
  const { theme } = useTheme()

  const defaultStyles: React.CSSProperties = {
    backgroundPosition: 'center',
    objectFit: 'cover',
    backgroundRepeat: 'no-repeat',
    textAlign: 'left',
    opacity: '100%',
    padding: theme.sizes.sm,
  }

  const handleOnDrop = (e: React.DragEvent, type: string) => {
    e.stopPropagation()
    if (state.editor.liveMode || !!disableOnDrop) return
    let position = 0

    if (Array.isArray(content)) {
      const lastPosition = content[content.length - 1] || 0
      position = lastPosition.position + 1
    }

    const componentType = e.dataTransfer.getData('componentType') as EditorBtns
    switch (componentType) {
      case 'text':
        dispatch({
          type: 'ADD_ELEMENT',
          payload: {
            containerId: id,
            elementDetails: {
              id: v4(),
              name: 'Text',
              styles: {
                ...defaultStyles,
              },
              type: 'text',
              position: position || 0,
              content: {
                innerText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
              },
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
              position: position || 0
            },
          }
        })
        break
      case '2Col':
        const parentId = v4()
        dispatch({
          type: 'ADD_ELEMENT',
          payload: {
            containerId: id,
            elementDetails: {
              id: parentId,
              name: 'Two Columns',
              styles: { ...defaultStyles, display: 'flex' },
              type: '2Col',
              position: position || 0,
              content: [
                {
                  content: [],
                  id: v4(),
                  name: 'Container',
                  styles: { ...defaultStyles, width: '100%' },
                  type: 'container',
                  position: 0,
                  parent: parentId
                },
                {
                  content: [],
                  id: v4(),
                  name: 'Container',
                  styles: { ...defaultStyles, width: '100%' },
                  type: 'container',
                  position: 1,
                  parent: parentId
                },
              ],
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

  const isLiveMode = state.editor.liveMode
  const isEditMode = !isLiveMode

  const selectedElement = state.editor.selectedElement
  const isSelectedElement = selectedElement.id === id
  const isSelectedElementBody = type === '__body'

  return (
    <div
      style={{
        position: "relative",
        ...(isEditMode && (
          isSelectedElement
            && !isSelectedElementBody
            ? {
              border: theme.borders.muted,
              borderRadius: theme.sizes["2xs"]
          } : {
            border: "1px solid transparent",
          }
        )),
        ...selectionBoxStyles,
      }}
      onDrop={(e) => handleOnDrop(e, id)}
      onDragOver={handleDragOver}
      draggable={false}
      onClick={handleOnClickBody}
    >
      {
        isSelectedElement && isEditMode && !isSelectedElementBody &&
        <span
          style={{
            position: "absolute",
            top: '-26px',
            left: "-1px",
              display: "flex",
              gap: theme.sizes["2xs"],
            }}
          >
            <Badge dense>
              {element.position || 0}
            </Badge>
          <Badge>
            {name}
          </Badge>
        </span>
      }

      {isSelectedElement && isEditMode && !isSelectedElementBody && (
        <nav style={{
          position: "absolute",
          right: theme.sizes.sm,
          top: `-${theme.sizes.lg}`,
          border: theme.borders.muted,
          background: "transparent",
          backdropFilter: "blur(8px)",
          borderRadius: theme.sizes["2xs"],
          padding: `${theme.sizes.xs} ${theme.sizes.sm}`,
          display: "flex",
          gap: theme.sizes.xs,
          alignItems: "center",
          justifyContent: "center",
          zIndex: 700
        }}>
          <DeleteElement element={element} />
          <MoveElement element={element} />
        </nav>
      )}

      <div style={{
        ...(isEditMode && isSelectedElement && {
          overflow: "hidden",
          borderRadius: theme.sizes["2xs"]
        })
      }}>

      {children}
      </div>
    </div>
  )
}