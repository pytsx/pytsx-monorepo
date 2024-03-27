"use client"
import React from "react";
import { SettingsProps } from "./interface";
import { useEditor } from "../../../../../provider";
import { AlignVerticalJustifyCenter, ChevronsLeftRightIcon, LucideImageDown } from "lucide-react";
import { Input, Typography, useTheme } from "@pytsx/ui";
import { SettingsContainer } from "./settings-container";

export function DecorationsSettings({ handleOnChanges }: SettingsProps) {
  const { state } = useEditor()
  const { theme } = useTheme()

  return (
    <SettingsContainer label="Decorations">

        <div>
          <span style={{ display: "flex", width: "100%", justifyContent: "space-between" }}>
            <Typography>Opacity</Typography>
            <Typography style={{ padding: theme.sizes.sm }}>
              {typeof state.editor.selectedElement.styles?.opacity ===
                'number'
                ? state.editor.selectedElement.styles?.opacity
                : parseFloat(
                  (
                    state.editor.selectedElement.styles?.opacity || '0'
                  ).replace('%', '')
                ) || 0}
              %
            </Typography>
          </span>
          <Input
            type="range"
            onChange={(e) => {
              handleOnChanges({
                target: {
                  id: 'opacity',
                  value: `${e.target.value}%`,
                },
              })
            }}
            defaultValue={
              typeof state.editor.selectedElement.styles?.opacity === 'number'
                ? state.editor.selectedElement.styles?.opacity
                : parseFloat(
                  (
                    state.editor.selectedElement.styles?.opacity || '100'
                  ).replace('%', '')
                ) || 0
            }
            max={100}
            step={1}
          />
        </div>
        <div>
          <span style={{ display: "flex", width: "100%", justifyContent: "space-between" }}>

          <Typography>Border Radius</Typography>
            <Typography className="">
              {typeof state.editor.selectedElement.styles?.borderRadius ===
                'number'
                ? state.editor.selectedElement.styles?.borderRadius
                : parseFloat(
                  (
                    state.editor.selectedElement.styles?.borderRadius || '0'
                  ).replace('px', '')
                ) || 0}
              px
            </Typography>
          </span>
          <Input
            type='range'
            onChange={(e) => {
              handleOnChanges({
                target: {
                  id: 'borderRadius',
                  value: `${e.target.value}px`,
                },
              })
            }}
            defaultValue={
              typeof state.editor.selectedElement.styles?.borderRadius ===
                'number'
                ? state.editor.selectedElement.styles?.borderRadius
                : parseFloat(
                  (
                    state.editor.selectedElement.styles?.borderRadius || '0'
                  ).replace('%', '')
                ) || 0
            }
            max={100}
            step={1}
          />
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: theme.sizes.xs }}>
          <Typography>Background Color</Typography>
          <div style={{ display: "flex", border: theme.borders.input, borderRadius: theme.sizes.xs, overflow: "clip" }}>
            <div
              style={{
                width: theme.spacing[8],
                height: "100%",
                backgroundColor:
                  state.editor.selectedElement.styles.backgroundColor,
              }}
            />
            <Input
              placeholder="#HFI245"
              className="!border-y-0 rounded-none !border-r-0 mr-2"
              style={{
                border: "none"
              }}
              id="backgroundColor"
              type="color"
              onChange={handleOnChanges}
              value={state.editor.selectedElement.styles.backgroundColor}
            />
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: theme.sizes.xs }}>
          <Typography>Background Image</Typography>
          <div style={{ display: "flex", border: theme.borders.input, borderRadius: theme.sizes.xs, overflow: "clip" }}>
            <div
              style={{
                width: theme.spacing[8],
                height: "100%",
                backgroundImage:
                  state.editor.selectedElement.styles.backgroundImage,
              }}
            />
            <Input
              placeholder="url()"
              className="!border-y-0 rounded-none !border-r-0 mr-2"
              id="backgroundImage"
              onChange={handleOnChanges}
              value={state.editor.selectedElement.styles.backgroundImage}
            />
          </div>
        </div>
        {/* <div style={{ display: "flex", flexDirection: "column", gap: theme.sizes.xs }}>
          <Typography>Image Position</Typography>
          <div
          // onValueChange={(e) =>
          //   handleOnChanges({
          //     target: {
          //       id: 'backgroundSize',
          //       value: e,
          //     },
          //   })
          // }
          // value={state.editor.selectedElement.styles.backgroundSize?.toString()}
          >
            <div className="flex items-center flex-row justify-between border-[1px] rounded-md bg-transparent h-fit gap-4">
              <span
                // value="cover"
                className="w-10 h-10 p-0 data-[state=active]:bg-muted"
              >
                <ChevronsLeftRightIcon size={18} />
              </span>
              <span
                // value="contain"
                className="w-10 h-10 p-0 data-[state=active]:bg-muted"
              >
                <AlignVerticalJustifyCenter size={22} />
              </span>
              <span
                // value="auto"
                className="w-10 h-10 p-0 data-[state=active]:bg-muted"
              >
                <LucideImageDown size={18} />
              </span>
            </div>
          </div>
        </div> */}
    </SettingsContainer>
  )
}