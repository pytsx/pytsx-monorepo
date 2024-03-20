"use client"
import clsx from "clsx";
import { Trash } from "lucide-react";
import { v4 } from "uuid"
import { DeleteComponent } from "./delete-component";
import { EditorBtns, EditorElement, useEditor } from "../../../provider";
import React from "react";
import { Recursive } from "./recursive";

export const defaultStyles: React.CSSProperties = {
  backgroundPosition: 'center',
  objectFit: 'cover',
  backgroundRepeat: 'no-repeat',
  textAlign: 'left',
  opacity: '100%',
  background: "#ffffff10"
}

type Props = { element: EditorElement }

export function Container({ element }: Props) {
  const { content, styles, type, id } = element
  const { state, dispatch } = useEditor()

  const handleOnDrop = (e: React.DragEvent, type: string) => {
    e.stopPropagation()
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
              styles: { ...defaultStyles },
              type: 'container',
            },
          },
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
      style={{ ...styles, minHeight: "10px", minWidth: "10px", background: "#fafafa32" }}
      onDrop={(e) => handleOnDrop(e, id)}
      onDragOver={handleDragOver}
      draggable={type !== "__body"}
      onDragStart={(e) => handleDragStart(e, "container")}
      onClick={handleOnClickBody}
    >
      <sup
        className={clsx(
          'absolute -top-[26px] -left-[2px] rounded-sm  hidden',
          {
            block:
              state.editor.selectedElement.id === element.id &&
              !state.editor.liveMode,
          }
        )}
      >
        {element.name}
      </sup>

      {
        Array.isArray(content) &&
        content.map((childElement) => (
          <Recursive
            key={childElement.id}
            element={childElement}
          />
        ))
      }

      {state.editor.selectedElement.id === element.id &&
        !state.editor.liveMode &&
        state.editor.selectedElement.type !== '__body' && (
          <DeleteComponent handleDelete={handleDeleteElement} />
        )}
    </div>
  )
}

//   return (
//     <div
//       style={{
//         ...styles,
//         ...((type === 'container' || type === '2Col') && {
//           maxWidth: "100%",
//           width: "100%",
//           minHeight: "20px",
//           minWidth: "20px"
//         }),
//         ...(type === '__body' && { height: "100%" }),
//         ...(type === '2Col' && {
//           display: "flex",
//           flexDirection: "row",
//           '@media (max-width: 768px)': {
//             display: 'flex',
//             flexDirection: 'column',
//           },
//         }),
//         ...(state.editor.selectedElement.id === id &&
//           !state.editor.liveMode &&
//           state.editor.selectedElement.type !== '__body' && {
//           border: "1px solid #0066cc50", borderRadius: ".5rem"
//         }),
//         ...(state.editor.selectedElement.id === id &&
//           !state.editor.liveMode &&
//           state.editor.selectedElement.type === '__body' && {
//           border: "1px solid #E9C46A50",
//           borderRadius: ".5rem"
//         }),
//         ...(state.editor.selectedElement.id === id && !state.editor.liveMode && {
//           border: "1px solid #6d6d6d"
//         })
//       } as CSSProperties}

//       onDrop={(e) => handleOnDrop(e, id)}
//       onDragOver={handleDragOver}
//       draggable={type !== "__body"}
//       onDragStart={(e) => handleDragStart(e, "container")}
//       onClick={handleOnClickBody}
//     >
//       <sup
//         style={{
//           position: "absolute",
//           top: "-26px",
//           left: "-2px",
//           borderRadius: ".5rem",
//           display: state.editor.selectedElement.id === element.id &&
//             !state.editor.liveMode ? "block" : "none"
//         }}
//       >
//         {element.name}
//       </sup>

//       {
//         Array.isArray(content) &&
//         content.map((childElement) => (
//           <Recursive
//             key={childElement.id}
//             element={childElement}
//           />
//         ))
//       }

//       {state.editor.selectedElement.id === element.id &&
//         !state.editor.liveMode &&
//         state.editor.selectedElement.type !== '__body' && (
//           <DeleteComponent handleDelete={handleDeleteElement} />
//         )}
//     </div>
//   )
// }