"use client"
import React from "react"
import { SettingsProps } from "./interface"
import { useEditor } from "../../../../../provider"
import { Input, Typography, useTheme } from "@pytsx/ui"
import { SettingsContainer } from "./settings-container"
import { InputMultifield } from "../../../input-multifield"


export function DimensionsSettings({ handleOnChanges }: SettingsProps) {
  const { state } = useEditor()
  const { theme } = useTheme()
  return (
    <SettingsContainer label="Dimensions">

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: theme.sizes.sm }}>
          <div style={{ display: "flex", flexDirection: "column", gap: theme.sizes.sm }}>

            <div style={{ display: "flex", gap: theme.sizes.xs }}>
                <div>

                  <Typography style={{ userSelect: "none" }} >Height</Typography>
                  <Input
                    id="height"
                    placeholder="0px"
                    onChange={handleOnChanges}
                    value={state.editor.selectedElement.styles.height}
                  />

                </div>

                <div>
                  <Typography style={{ userSelect: "none" }} >Width</Typography>
                  <Input
                    placeholder="0px"
                    id="width"
                    onChange={handleOnChanges}
                    value={state.editor.selectedElement.styles.width}
                  />
                </div>
              </div>
            </div>
            <InputMultifield
              label={"Margin"}
              mainInput={{
                id: "margin",
                placeholder: "0px",
                label: "margin",
                onChange: handleOnChanges,
                defaultValue: state.editor.selectedElement.styles.margin
              }}
              multipleInputs={[
                {
                  id: "marginTop",
                  placeholder: "0px",
                  label: "top",
                  onChange: handleOnChanges,
                  defaultValue: state.editor.selectedElement.styles.marginTop || state.editor.selectedElement.styles.margin
                },
                {
                  id: "marginLeft",
                  placeholder: "0px",
                  label: "Left",
                  onChange: handleOnChanges,
                  defaultValue: state.editor.selectedElement.styles.marginLeft || state.editor.selectedElement.styles.margin
                },
                {
                  id: "marginRight",
                  placeholder: "0px",
                  label: "Right",
                  onChange: handleOnChanges,
                  defaultValue: state.editor.selectedElement.styles.marginRight || state.editor.selectedElement.styles.margin
                },
                {
                  id: "marginBottom",
                  placeholder: "0px",
                  label: "Bottom",
                  onChange: handleOnChanges,
                  defaultValue: state.editor.selectedElement.styles.marginBottom || state.editor.selectedElement.styles.margin
                }
              ]}
            />

            <InputMultifield
              label={"padding"}
              mainInput={{
                id: "padding",
                placeholder: "0px",
                label: "padding",
                onChange: handleOnChanges,
                defaultValue: state.editor.selectedElement.styles.padding
              }}
              multipleInputs={[
                {
                  id: "paddingTop",
                  placeholder: "0px",
                  label: "top",
                  onChange: handleOnChanges,
                  defaultValue: state.editor.selectedElement.styles.paddingTop || state.editor.selectedElement.styles.padding
                },
                {
                  id: "paddingLeft",
                  placeholder: "0px",
                  label: "Left",
                  onChange: handleOnChanges,
                  defaultValue: state.editor.selectedElement.styles.paddingLeft || state.editor.selectedElement.styles.padding
                },
                {
                  id: "paddingRight",
                  placeholder: "0px",
                  label: "Right",
                  onChange: handleOnChanges,
                  defaultValue: state.editor.selectedElement.styles.paddingRight || state.editor.selectedElement.styles.padding
                },
                {
                  id: "paddingBottom",
                  placeholder: "0px",
                  label: "Bottom",
                  onChange: handleOnChanges,
                  defaultValue: state.editor.selectedElement.styles.paddingBottom || state.editor.selectedElement.styles.padding
                }
              ]}

            />
          </div>
      </div>
    </SettingsContainer>
  )
}