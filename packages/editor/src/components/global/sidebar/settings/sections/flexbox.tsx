"use client"
import React from "react"
import { SettingsProps } from "./interface";
import { AlignHorizontalJustifyCenterIcon, AlignHorizontalJustifyEndIcon, AlignHorizontalJustifyStart, AlignHorizontalSpaceAround, AlignHorizontalSpaceBetween, AlignVerticalJustifyCenter, AlignVerticalJustifyStart } from "lucide-react";
import { useEditor } from "../../../../../provider";

export function FlexboxSettings({ handleOnChanges }: SettingsProps) {
  const { state } = useEditor()

  return (

    <section
      className="px-6 py-0  "
    >
      <p className="!no-underline">Flexbox</p>
      <div className='px-2 space-y-2'>
        <label className="text-muted-foreground">Justify Content</label>
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
        <label className="text-muted-foreground">Align Items</label>
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
          <input
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
          <label className="text-muted-foreground">Flex</label>
        </div>
        <div>
          <label className="text-muted-foreground"> Direction</label>
          <input
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