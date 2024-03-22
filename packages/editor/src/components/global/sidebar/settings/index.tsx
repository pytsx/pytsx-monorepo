"use client"
import React from "react";
import { useEditor } from "../../../../provider";
import { DimensionsSettings } from "./sections/dimensions";
import { DecorationsSettings } from "./sections/decorations";
import { FlexboxSettings } from "./sections/flexbox";
import { CustomSettings } from "./sections/custom";
import { TypographySettings } from "./sections/typography";

export function Settings() {
  const { state, dispatch } = useEditor()

  const handleOnChanges = (e: any) => {
    const styleSettings = e.target.id
    let value = e.target.value
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
    <section
      style={{ width: "100%" }}
    >
      <CustomSettings />
      <TypographySettings handleOnChanges={handleOnChanges} />
      <DimensionsSettings handleOnChanges={handleOnChanges} />
      <DecorationsSettings handleOnChanges={handleOnChanges} />
      <FlexboxSettings handleOnChanges={handleOnChanges} />
    </section>
  )
}