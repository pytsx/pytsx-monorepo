"use client"
import React from "react"
import { SettingsProps } from "./interface";
import { AlignHorizontalJustifyCenterIcon, AlignHorizontalJustifyEndIcon, AlignHorizontalJustifyStart, AlignHorizontalSpaceAround, AlignHorizontalSpaceBetween, AlignVerticalJustifyCenter, AlignVerticalJustifyStart } from "lucide-react";
import { useEditor } from "../../../../../provider";
import { Input, Typography } from "@pytsx/ui";

export function FlexboxSettings({ handleOnChanges }: SettingsProps) {
  const { state } = useEditor()

  return (

    <section
      className="px-6 py-0  "
    >
      <Typography className="!no-underline">Flexbox</Typography>
      <div className='px-2 space-y-2'>
        <Typography >Justify Content</Typography>
        <div
        // onValueChange={(e) =>
        //   handleOnChanges({
        //     target: {
        //       id: 'justifyContent',
        //       value: e,
        //     },
        //   })
        // }
        // value={state.editor.selectedElement.styles.justifyContent}
        >
          <div className="flex items-center flex-row justify-between border-[1px] rounded-md bg-transparent h-fit gap-4">
            <span
              // value="space-between"
              className="w-10 h-10 p-0 data-[state=active]:bg-muted"
            >
              <AlignHorizontalSpaceBetween size={18} />
            </span>
            <span
              // value="space-evenly"
              className="w-10 h-10 p-0 data-[state=active]:bg-muted"
            >
              <AlignHorizontalSpaceAround size={18} />
            </span>
            <span
              // value="center"
              className="w-10 h-10 p-0 data-[state=active]:bg-muted"
            >
              <AlignHorizontalJustifyCenterIcon size={18} />
            </span>
            <span
              // value="start"
              className="w-10 h-10 p-0 data-[state=active]:bg-muted "
            >
              <AlignHorizontalJustifyStart size={18} />
            </span>
            <span
              // value="end"
              className="w-10 h-10 p-0 data-[state=active]:bg-muted "
            >
              <AlignHorizontalJustifyEndIcon size={18} />
            </span>
          </div>
        </div>
        <Typography >Align Items</Typography>
        <div
        // onValueChange={(e) =>
        //   handleOnChanges({
        //     target: {
        //       id: 'alignItems',
        //       value: e,
        //     },
        //   })
        // }
        // value={state.editor.selectedElement.styles.alignItems}
        >
          <div className="flex items-center flex-row justify-between border-[1px] rounded-md bg-transparent h-fit gap-4">
            <span
              // value="center"
              className="w-10 h-10 p-0 data-[state=active]:bg-muted"
            >
              <AlignVerticalJustifyCenter size={18} />
            </span>
            <span
              // value="normal"
              className="w-10 h-10 p-0 data-[state=active]:bg-muted "
            >
              <AlignVerticalJustifyStart size={18} />
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Input
            className="h-4 w-4"
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
          <Typography >Flex</Typography>
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
    </section>
  )
}