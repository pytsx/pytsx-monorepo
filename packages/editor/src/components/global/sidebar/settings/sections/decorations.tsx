"use client"
import React from "react";
import { SettingsProps } from "./interface";
import { useEditor } from "../../../../../provider";
import { AlignVerticalJustifyCenter, ChevronsLeftRightIcon, LucideImageDown } from "lucide-react";
import { Input, Typography } from "@pytsx/ui";

export function DecorationsSettings({ handleOnChanges }: SettingsProps) {
  const { state } = useEditor()

  return (
    <section
      className="px-6 py-0 "
    >
      <Typography className="!no-underline">
        Decorations
      </Typography>
      <div className="px-2 flex flex-col gap-4">
        <div>
          <Typography>Opacity</Typography>
          <div className="flex items-center justify-end">
            <small className="p-2">
              {typeof state.editor.selectedElement.styles?.opacity ===
                'number'
                ? state.editor.selectedElement.styles?.opacity
                : parseFloat(
                  (
                    state.editor.selectedElement.styles?.opacity || '0'
                  ).replace('%', '')
                ) || 0}
              %
            </small>
          </div>
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
                    state.editor.selectedElement.styles?.opacity || '0'
                  ).replace('%', '')
                ) || 0
            }
            max={100}
            step={1}
          />
        </div>
        <div>
          <Typography>Border Radius</Typography>
          <div className="flex items-center justify-end">
            <small className="">
              {typeof state.editor.selectedElement.styles?.borderRadius ===
                'number'
                ? state.editor.selectedElement.styles?.borderRadius
                : parseFloat(
                  (
                    state.editor.selectedElement.styles?.borderRadius || '0'
                  ).replace('px', '')
                ) || 0}
              px
            </small>
          </div>
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
        <div className="flex flex-col gap-2">
          <Typography>Background Color</Typography>
          <div className="flex  border-[1px] rounded-md overflow-clip">
            <div
              className="w-12 "
              style={{
                backgroundColor:
                  state.editor.selectedElement.styles.backgroundColor,
              }}
            />
            <Input
              placeholder="#HFI245"
              className="!border-y-0 rounded-none !border-r-0 mr-2"
              id="backgroundColor"
              onChange={handleOnChanges}
              value={state.editor.selectedElement.styles.backgroundColor}
            />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <Typography>Background Image</Typography>
          <div className="flex  border-[1px] rounded-md overflow-clip">
            <div
              className="w-12 "
              style={{
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
        <div className="flex flex-col gap-2">
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
        </div>
      </div>
    </section>
  )
}