"use client"
import React from "react";
import { useEditor } from "../../../../../provider";
import { SettingsProps } from "./interface";
import { Input, Select, SelectContent, SelectItem, SelectTrigger, SelectValue, Typography, useTheme } from "@pytsx/ui";
import { SettingsContainer } from "./settings-container";

export function TypographySettings({ handleOnChanges }: SettingsProps) {
  const { state } = useEditor()
  const { theme } = useTheme()
  return (
    <SettingsContainer>
      <Typography >
        Typography
      </Typography>
      <div style={{ display: "flex", flexDirection: "column", gap: theme.sizes.sm, width: "100%" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: theme.sizes.sm, width: "100%" }}>
          <Typography style={{ userSelect: "none" }}>Text Align</Typography>
          <Select
            value={state.editor.selectedElement.styles.textAlign}
            onValueChange={(e) =>
              handleOnChanges({
                target: {
                  id: 'textAlign',
                  value: e,
                },
              })
          }>
            <SelectTrigger>
              <SelectValue placeholder="text align" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem
                value="left"
                className="w-10 h-10 p-0 data-[state=active]:bg-muted"
              >
                left
              </SelectItem>
              <SelectItem
                value="right"
                className="w-10 h-10 p-0 data-[state=active]:bg-muted"
              >
                right
              </SelectItem>
              <SelectItem
                value="center"
                className="w-10 h-10 p-0 data-[state=active]:bg-muted"
              >
                center
              </SelectItem>
              <SelectItem
                value="justify"
                className="w-10 h-10 p-0 data-[state=active]:bg-muted "
              >
                justify
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: theme.sizes.sm, width: "100%" }}>
          <Typography style={{ userSelect: "none" }}>Font Family</Typography>
          <Input
            id="DM Sans"
            onChange={handleOnChanges}
            value={state.editor.selectedElement.styles.fontFamily}
          />
        </div>

        <div className="flex flex-col gap-2">
          <Typography style={{ userSelect: "none" }}>Color</Typography>
          <Input
            id="color"
            type="color"
            onChange={handleOnChanges}
            value={state.editor.selectedElement.styles.color}
          />
        </div>


          <div>
          <Typography style={{ userSelect: "none" }}>Weight</Typography>
          <Select onValueChange={(e) =>
            handleOnChanges({
              target: {
                id: 'font-weight',
                value: e,
                  },
            })}>
            <SelectTrigger>
              <SelectValue placeholder="font weight" />
            </SelectTrigger>
            <SelectContent >
              <SelectItem value="bold">Bold</SelectItem>
              <SelectItem value="normal">Regular</SelectItem>
              <SelectItem value="lighter">Light</SelectItem>
            </SelectContent>
          </Select>
          </div>

          <div>
          <Typography style={{ userSelect: "none" }}>Size</Typography>
            <Input
              placeholder="px"
              id="fontSize"
              onChange={handleOnChanges}
              value={state.editor.selectedElement.styles.fontSize}
          />
        </div>
      </div>
    </SettingsContainer>
  )
}