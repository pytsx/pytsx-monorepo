"use client"
import React from "react"
import { useEditor } from "../../../../../provider"
import { Input, InputMultifield, useTheme } from "@pytsx/ui"
import { SettingsContainer } from "./settings-container"
import { ArrowDownFromLine, ArrowLeftFromLine, ArrowRightFromLine, ArrowUpFromLine, BoxSelect } from "lucide-react"

export function DimensionsSettings() {
  const { state, dispatch } = useEditor()
  const { theme } = useTheme()

  const handleOnChanges = (e: React.ChangeEvent<HTMLInputElement>) => {
    let styleSettings: string = e.target.id
    // verificar se styleSettings é do tipo horizontal ou vertical, se sim, normalizar os valores para LTRB e remover o nome horizontal ou vertical
    let value: string = e.target.value

    const { styles } = state.editor.selectedElement

    const styleObject = {
      [styleSettings]: value,
    }
    dispatch({
      type: 'UPDATE_ELEMENT',
      payload: {
        elementDetails: {
          ...state.editor.selectedElement,
          styles: {
            ...styles,
            ...styleObject,
          },
        },
      },
    })
  }

  return (
    <SettingsContainer label="Dimensions">
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: theme.sizes.sm }}>
          <div style={{ display: "flex", gap: theme.sizes.sm }}>
            <Input
              label="H"
              id="height"
              placeholder="0"
              onChange={handleOnChanges}
              value={state.editor.selectedElement.styles.height}
            />
            <Input
              label="W"
              placeholder="0"
              id="width"
              onChange={handleOnChanges}
              value={state.editor.selectedElement.styles.width}
            />
          </div>

          <InputMultifield
            label={"Margin"}
            mainInput={{
              id: "margin",
              placeholder: "0",
              startAdornment: <BoxSelect width={theme.sizes.lg} height={theme.sizes.lg} />,
              onChange: handleOnChanges,
              defaultValue: state.editor.selectedElement.styles.margin
            }}
            multipleInputs={[
              {
                id: "marginTop",
                placeholder: "0",
                startAdornment: <ArrowDownFromLine width={theme.sizes.lg} height={theme.sizes.lg} />,
                onChange: handleOnChanges,
                defaultValue: state.editor.selectedElement.styles.marginTop
              },
              {
                id: "marginLeft",
                placeholder: "0",
                startAdornment: <ArrowRightFromLine width={theme.sizes.lg} height={theme.sizes.lg} />,
                onChange: handleOnChanges,
                defaultValue: state.editor.selectedElement.styles.marginLeft
              },
              {
                id: "marginBottom",
                startAdornment: <ArrowUpFromLine width={theme.sizes.lg} height={theme.sizes.lg} />,
                placeholder: "0",
                onChange: handleOnChanges,
                defaultValue: state.editor.selectedElement.styles.marginBottom
              },
              {
                id: "marginRight",
                placeholder: "0",
                startAdornment: <ArrowLeftFromLine width={theme.sizes.lg} height={theme.sizes.lg} />,
                onChange: handleOnChanges,
                defaultValue: state.editor.selectedElement.styles.marginRight
              },
            ]}
          />

          <InputMultifield
            label={"padding"}
            mainInput={{
              id: "padding",
              placeholder: "0",
              startAdornment: <BoxSelect width={theme.sizes.lg} height={theme.sizes.lg} />,
              onChange: handleOnChanges,
              defaultValue: state.editor.selectedElement.styles.padding
            }}
            multipleInputs={[
              {
                id: "paddingTop",
                placeholder: "0",
                startAdornment: <ArrowDownFromLine width={theme.sizes.lg} height={theme.sizes.lg} />,
                onChange: handleOnChanges,
                defaultValue: state.editor.selectedElement.styles.paddingTop
              },
              {
                id: "paddingLeft",
                placeholder: "0",
                startAdornment: <ArrowRightFromLine width={theme.sizes.lg} height={theme.sizes.lg} />,
                onChange: handleOnChanges,
                defaultValue: state.editor.selectedElement.styles.paddingLeft
              },
              {
                id: "paddingBottom",
                placeholder: "0",
                startAdornment: <ArrowUpFromLine width={theme.sizes.lg} height={theme.sizes.lg} />,
                onChange: handleOnChanges,
                defaultValue: state.editor.selectedElement.styles.paddingBottom
              },
              {
                id: "paddingRight",
                placeholder: "0",
                startAdornment: <ArrowLeftFromLine width={theme.sizes.lg} height={theme.sizes.lg} />,
                onChange: handleOnChanges,
                defaultValue: state.editor.selectedElement.styles.paddingRight
              },
            ]} 
          />
        </div>
      </div>
    </SettingsContainer>
  )
}