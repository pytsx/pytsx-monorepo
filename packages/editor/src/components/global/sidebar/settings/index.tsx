"use client"
import React from "react";
import { useEditor } from "../../../../provider";
import { DimensionsSettings } from "./sections/dimensions";
import { DecorationsSettings } from "./sections/decorations";
import { FlexboxSettings } from "./sections/flexbox";
import { TypographySettings } from "./sections/typography";

export function Settings() {
  const { state, dispatch } = useEditor()

  const handleOnChanges = (e: any) => {
    const styleSettings: string = e.target.id
    let value: string = e.target.value

    const pxInputs = ["margin", "padding", "height", "width", "top", "left", "right", "bottom"]
    const pxLabel = ["p", "px", "ppx", "pxx", "x"]
    if (pxInputs.includes(styleSettings)) {
      if (!pxLabel.includes(value)) {
        value = value.concat("px")
      }
    }

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
    <>
      {state.editor.selectedElement.type !== "text" ? (
        <>
          <DimensionsSettings handleOnChanges={handleOnChanges} />
          <DecorationsSettings handleOnChanges={handleOnChanges} />
          <FlexboxSettings handleOnChanges={handleOnChanges} />
        </>
      ) : (
        <TypographySettings handleOnChanges={handleOnChanges} />
      )}
    </>
  )
}