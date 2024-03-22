"use client"
import { v4 } from "uuid"
import { EditorBtns, EditorElement, useEditor } from "../../../provider";
import React from "react";
import { Recursive } from "./recursive";
import { DeleteComponent } from "./delete-component";
import { size, createScroll, Badge, useTheme } from "@pytsx/ui";
import { SelectionBox } from "./selection-box";


type Props = { element: EditorElement }

export function Container({ element }: Props) {
  const { content, styles, type, id, name } = element
  const { state, dispatch } = useEditor()
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
    if (state.editor.liveMode) return

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

  const editMode: Record<string, React.CSSProperties> = {
    body: {
      minHeight: "90vh",
      maxHeight: "90vh",
      margin: "auto auto",
      borderRadius: theme.sizes.sm,
      overflowY: "auto",
      paddingBottom: theme.sizes["6xl"],
      paddingTop: theme.sizes["6xl"],
      border: theme.borders.muted,
      ...createScroll()
    },
    container: {
      border: theme.borders.primary
    }
  }

  const isLiveMode = state.editor.liveMode
  const isEditMode = !isLiveMode
  const isBody = type === '__body'
  const selectedElement = state.editor.selectedElement
  const isSelectedElement = selectedElement.id === id
  const isSelectedElementBody = selectedElement.type === '__body'


  return (

    <SelectionBox element={element} style={{
      ...(isSelectedElement && isEditMode && !isSelectedElementBody) && editMode.container,
      ...(isEditMode && isBody && editMode.body),
    }}>
      {
        Array.isArray(content) &&
        content.map((childElement) => (
          <Recursive
            key={childElement.id}
            element={childElement}
          />
        ))
      }

    </SelectionBox>
  )
}