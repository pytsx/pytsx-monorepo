"use client"
import React from "react"
import { SettingsProps } from "./interface";
import { AlignHorizontalJustifyCenterIcon, AlignHorizontalJustifyEndIcon, AlignHorizontalJustifyStart, AlignHorizontalSpaceAround, AlignHorizontalSpaceBetween, AlignVerticalJustifyCenter, AlignVerticalJustifyStart } from "lucide-react";
import { useEditor } from "../../../../../provider";
import { Input, Tabs, TabsList, TabsTrigger, Typography, useTheme } from "@pytsx/ui";
import { SettingsContainer } from "./settings-container";

export function FlexboxSettings({ handleOnChanges }: SettingsProps) {
  const { state } = useEditor()
  const { theme } = useTheme()
  return (

    <SettingsContainer >
      <Typography className="!no-underline">Flexbox</Typography>
      <div style={{ display: "flex", gap: theme.sizes.sm, flexDirection: "column", width: "100%" }}>
        <Typography >Justify Content</Typography>
        <Tabs
          onValueChange={(e) =>
            handleOnChanges({
              target: {
                id: 'justifyContent',
                value: e,
              },
            })
          }
          value={state.editor.selectedElement.styles.justifyContent}
        >
          <TabsList className="flex items-center flex-row justify-between border-[1px] rounded-md bg-transparent h-fit gap-4"
            style={{
              display: "flex",
              alignContent: "center",
              justifyContent: "space-between",
              borderRadius: theme.sizes.sm
            }}
          >
            <TabsTrigger
              value="space-between"
              style={{
                width: theme.spacing[8],
                height: theme.spacing[8],
              }}
            >
              <AlignHorizontalSpaceBetween size={18} />
            </TabsTrigger>
            <TabsTrigger
              value="space-evenly"
              style={{
                width: theme.spacing[8],
                height: theme.spacing[8],
              }}
            >
              <AlignHorizontalSpaceAround size={18} />
            </TabsTrigger>
            <TabsTrigger
              value="center"
              style={{
                width: theme.spacing[8],
                height: theme.spacing[8],
              }}
            >
              <AlignHorizontalJustifyCenterIcon size={18} />
            </TabsTrigger>
            <TabsTrigger
              value="start"
              style={{
                width: theme.spacing[8],
                height: theme.spacing[8],
              }}
            >
              <AlignHorizontalJustifyStart size={18} />
            </TabsTrigger>
            <TabsTrigger
              value="end"
              style={{
                width: theme.spacing[8],
                height: theme.spacing[8],
              }}
            >
              <AlignHorizontalJustifyEndIcon size={18} />
            </TabsTrigger>
          </TabsList>
        </Tabs>
        <Typography >Align Items</Typography>
        <Tabs
          onValueChange={(e) =>
            handleOnChanges({
              target: {
                id: 'alignItems',
                value: e,
              },
            })
          }
          value={state.editor.selectedElement.styles.alignItems}
        >
          <TabsList className="flex items-center flex-row justify-between border-[1px] rounded-md bg-transparent h-fit gap-4">
            <TabsTrigger
              value="center"
              style={{
                width: theme.spacing[8],
                height: theme.spacing[8],
              }}
            >
              <AlignVerticalJustifyCenter size={18} />
            </TabsTrigger>
            <TabsTrigger
              value="normal"
              style={{
                width: theme.spacing[8],
                height: theme.spacing[8],
              }}
            >
              <AlignVerticalJustifyStart size={18} />
            </TabsTrigger>
          </TabsList>
        </Tabs>

        <div style={{ display: "flex", alignItems: "center", gap: theme.spacing[2] }}>
          <Typography >Flex</Typography>
          <Input
            style={{
              height: theme.spacing[4],
              width: theme.spacing[4],
            }}
            placeholder="px"
            type="checkbox"
            id="display"
            onChange={(va) => {
              handleOnChanges({
                target: {
                  id: 'display',
                  value: va.target.checked ? 'flex' : 'block',
                },
              })
            }}
          />
        </div>
        <div>
          <Typography > Direction</Typography>
          <Input
            placeholder="px"
            id="flexDirection"
            onChange={handleOnChanges}
            value={state.editor.selectedElement.styles.flexDirection}
          />
        </div>


      </div>


    </SettingsContainer>
  )
}