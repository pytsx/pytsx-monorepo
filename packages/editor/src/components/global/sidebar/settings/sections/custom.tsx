"use client"
import React from "react";
import { useEditor } from "../../../../../provider";

export function CustomSettings() {
  const { state, dispatch } = useEditor()

  const handleChangeCustomValues = (e: any) => {
    const settingProperty = e.target.id
    let value = e.target.value
    const styleObject = {
      [settingProperty]: value,
    }

    dispatch({
      type: 'UPDATE_ELEMENT',
      payload: {
        elementDetails: {
          ...state.editor.selectedElement,
          content: {
            ...state.editor.selectedElement.content,
            ...styleObject,
          },
        },
      },
    })
  }

  return (
    <section
      // value="Custom"
      className="px-6 py-0  "
    >
      <p className="!no-underline">Custom</p>
      <div className='px-2'>
        {state.editor.selectedElement.type === 'link' &&
          !Array.isArray(state.editor.selectedElement.content) && (
            <div className="flex flex-col gap-2">
              <p className="text-muted-foreground">Link Path</p>
              <input
                id="href"
                placeholder="https:domain.example.com/pathname"
                onChange={handleChangeCustomValues}
                value={state.editor.selectedElement.content.href}
              />
            </div>
          )}
      </div>
    </section>


  )
}