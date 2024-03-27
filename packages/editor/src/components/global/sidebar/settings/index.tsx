"use client"
import React from "react";
import { useEditor } from "../../../../provider";
import { DimensionsSettings } from "./sections/dimensions";
import { DecorationsSettings } from "./sections/decorations";
import { FlexboxSettings } from "./sections/flexbox";
import { TypographySettings } from "./sections/typography";
import { useTheme } from "@pytsx/ui";

export function Settings() {
  const { state, dispatch } = useEditor()
  const { theme } = useTheme()

  const handleOnChanges = (e: any) => {
    const styleSettings: string = e.target.id
    let value: string = e.target.value

    const styleObject = {
      [styleSettings]: value,
    }
    dispatch({
      type: 'UPDATE_ELEMENT',
      payload: {
        elementDetails: {
          ...state.editor.selectedElement,
          styles: {
            ...state.editor.selectedElement.styles,
            ...styleObject,
          },
        },
      },
    })
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: theme.sizes.md }}>
      {state.editor.selectedElement.type !== "text" ? (
        <>
          <DimensionsSettings />
          <DecorationsSettings handleOnChanges={handleOnChanges} />
          <FlexboxSettings handleOnChanges={handleOnChanges} />
        </>
      ) : (
        <TypographySettings handleOnChanges={handleOnChanges} />
      )}
    </div>
  )
}