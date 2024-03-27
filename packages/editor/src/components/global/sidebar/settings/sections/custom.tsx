"use client"
import React from "react";
import { useEditor } from "../../../../../provider";
import { Input, Typography } from '@pytsx/ui'
import { SettingsContainer } from "./settings-container";

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
    <SettingsContainer label="Custom">
        {state.editor.selectedElement.type === 'link' &&
          !Array.isArray(state.editor.selectedElement.content) && (
            <div className="flex flex-col gap-2">
            <Typography>Link Path</Typography>
            <Input
                id="href"
                placeholder="https:domain.example.com/pathname"
                onChange={handleChangeCustomValues}
                value={state.editor.selectedElement.content.href}
              />
            </div>
        )}
    </SettingsContainer>
  )
}