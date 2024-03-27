"use client"
import React, { CSSProperties } from "react"
import { useEditor } from "../../../../../provider"
import { Input, InputMultifield, useTheme } from "@pytsx/ui"
import { SettingsContainer } from "./settings-container"
import { ArrowDownFromLine, ArrowLeftFromLine, ArrowRightFromLine, ArrowUpFromLine } from "lucide-react"

function parceSpace(initialSpace: string): [vertical: string, horizontal: string, left: string, top: string, right: string, bottom: string] {
  const SpaceSplited = initialSpace.split(" ")
  if (SpaceSplited.length == 1) {
    const [p] = SpaceSplited
    return [p, p, p, p, p, p]
  } else if (SpaceSplited.length == 2) {
    // p -> v h
    const [v, h] = SpaceSplited
    return [v, h, h, v, h, v]
  } else if (SpaceSplited.length == 4) {
    // p -> l t b r
    const [l, t, b, r] = SpaceSplited
    const vertical = l == r ? l : "mixed"
    const horizontal = t == b ? t : "mixed"

    return [vertical, horizontal, l, t, b, r]
  } else {
    const rest = SpaceSplited[0] || `0rem`
    return [rest, rest, rest, rest, rest, rest]
  }
}

function stringifySpace(initialSpace: string | number | undefined, opts: { type: "all" | "left" | "right" | "horizontal" | "top" | "bottom" | "vertical" } = { type: "all" }) {
  if (initialSpace == undefined) {
    initialSpace = "0rem"
  } else if (typeof initialSpace == "number") {
    initialSpace = `${initialSpace}`
  }
  const [v, h, l, t, r, b] = parceSpace(initialSpace)

  switch (opts.type) {
    case "all":
    default:
      return [l, t, r, b].join(" ")
    case "horizontal":
      return h
    case "vertical":
      return v
    case "bottom":
      return b
    case "left":
      return l
    case "right":
      return r
  }
}

export function DimensionsSettings() {
  const { state, dispatch } = useEditor()
  const { theme } = useTheme()

  const handleOnChanges = (e: any) => {
    let styleSettings: string = e.target.id
    // verificar se styleSettings é do tipo horizontal ou vertical, se sim, normalizar os valores para LTRB e remover o nome horizontal ou vertical
    let value: string = e.target.value
    const { styles } = state.editor.selectedElement

    const [property, orientation] = styleSettings.split("_")
    let current: string

    if (orientation) {
      current = (styles as Record<string, any>)[property || ""]
      const [v, h] = parceSpace(current || "")
      styleSettings = property

      if (orientation === "vertical") {
        value = `${value} ${h}`
      } else if (orientation === "horizontal") {
        value = `${v} ${value}`
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
    <SettingsContainer label="Dimensions">
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: theme.sizes.sm }}>
          <div style={{ display: "flex", flexDirection: "column", gap: theme.sizes.sm }}>

            <div style={{ display: "flex", gap: theme.sizes.sm }}>
                  <Input
                label="h"
                    id="height"
                placeholder="0"
                    onChange={handleOnChanges}
                    value={state.editor.selectedElement.styles.height}
                  />

                  <Input
                label="w"
                placeholder="0"
                    id="width"
                    onChange={handleOnChanges}
                    value={state.editor.selectedElement.styles.width}
              />
            </div>
          </div>
            <InputMultifield
              label={"Margin"}
            mainInput={
              [
                {
                  id: "margin_vertical",
                  placeholder: "0",
                  label: "v",
                  onChange: handleOnChanges,
                  defaultValue: stringifySpace(state.editor.selectedElement.styles.margin, { type: "vertical" })
                },
                {
                  id: "margin_horizontal",
                  placeholder: "0",
                  label: "h",
                  onChange: handleOnChanges,
                  defaultValue: stringifySpace(state.editor.selectedElement.styles.margin, { type: "horizontal" })
                }
              ]
            }

              multipleInputs={[
                {
                  id: "marginTop",
                  placeholder: "0",
                  startAdornment: <ArrowDownFromLine width={theme.sizes.lg} height={theme.sizes.lg} />,
                  onChange: handleOnChanges,
                  defaultValue: state.editor.selectedElement.styles.marginTop || state.editor.selectedElement.styles.margin
                },
                {
                  id: "marginLeft",
                  placeholder: "0",
                  startAdornment: <ArrowRightFromLine width={theme.sizes.lg} height={theme.sizes.lg} />,
                  onChange: handleOnChanges,
                  defaultValue: state.editor.selectedElement.styles.marginLeft || state.editor.selectedElement.styles.margin
                },
                {
                  id: "marginBottom",
                  startAdornment: <ArrowUpFromLine width={theme.sizes.lg} height={theme.sizes.lg} />,
                  placeholder: "0",
                  onChange: handleOnChanges,
                  defaultValue: state.editor.selectedElement.styles.marginBottom || state.editor.selectedElement.styles.margin,
                },
                {
                  id: "marginRight",
                  placeholder: "0",
                  startAdornment: <ArrowLeftFromLine width={theme.sizes.lg} height={theme.sizes.lg} />,
                  onChange: handleOnChanges,
                  defaultValue: state.editor.selectedElement.styles.marginRight || state.editor.selectedElement.styles.margin
                },

              ]}
            />

            <InputMultifield
              label={"padding"}
            mainInput={
              {
                id: "padding",
                placeholder: "0",
                onChange: handleOnChanges,
                defaultValue: stringifySpace(state.editor.selectedElement.styles.padding, { type: "all" })
              }
            }
              multipleInputs={[
                {
                  id: "paddingTop",
                  placeholder: "0",
                  startAdornment: <ArrowDownFromLine width={theme.sizes.lg} height={theme.sizes.lg} />,
                  onChange: handleOnChanges,
                  defaultValue: state.editor.selectedElement.styles.paddingTop || state.editor.selectedElement.styles.padding
                },
                {
                  id: "paddingLeft",
                  placeholder: "0",
                  startAdornment: <ArrowRightFromLine width={theme.sizes.lg} height={theme.sizes.lg} />,
                  onChange: handleOnChanges,
                  defaultValue: state.editor.selectedElement.styles.paddingLeft || state.editor.selectedElement.styles.padding
                },
                {
                  id: "paddingBottom",
                  placeholder: "0",
                  startAdornment: <ArrowUpFromLine width={theme.sizes.lg} height={theme.sizes.lg} />,
                  onChange: handleOnChanges,
                  defaultValue: state.editor.selectedElement.styles.paddingBottom || state.editor.selectedElement.styles.padding
                },
                {
                  id: "paddingRight",
                  placeholder: "0",
                  startAdornment: <ArrowLeftFromLine width={theme.sizes.lg} height={theme.sizes.lg} />,
                  onChange: handleOnChanges,
                  defaultValue: state.editor.selectedElement.styles.paddingRight || state.editor.selectedElement.styles.padding
                },
              ]}

            />
          </div>
      </div>
    </SettingsContainer>
  )
}