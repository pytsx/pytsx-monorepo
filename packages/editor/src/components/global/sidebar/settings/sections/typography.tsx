"use client"
import React from "react";
import { useEditor } from "../../../../../provider";
import { AlignCenter, AlignJustify, AlignLeft, AlignRight } from "lucide-react";
import { SettingsProps } from "./interface";




export function TypographySettings({ handleOnChanges }: SettingsProps) {
  const { state } = useEditor()

  return (
    <section
      // value="Typography"
      className="px-6 py-0  border-y-[1px]"
    >
      <p className="!no-underline">
        Typography
      </p>
      <div className="px-2 flex flex-col gap-2 ">
        <div className="flex flex-col gap-2 ">
          <p className="text-muted-foreground">Text Align</p>
          <select
            onChange={(e) =>
              handleOnChanges({
                target: {
                  id: 'textAlign',
                  value: e,
                },
              })
            }
            value={state.editor.selectedElement.styles.textAlign}
          >
            <option
              value="left"
              className="w-10 h-10 p-0 data-[state=active]:bg-muted"
            >
              <AlignLeft size={18} />
            </option>
            <option
              value="right"
              className="w-10 h-10 p-0 data-[state=active]:bg-muted"
            >
              <AlignRight size={18} />
            </option>
            <option
              value="center"
              className="w-10 h-10 p-0 data-[state=active]:bg-muted"
            >
              <AlignCenter size={18} />
            </option>
            <option
              value="justify"
              className="w-10 h-10 p-0 data-[state=active]:bg-muted "
            >
              <AlignJustify size={18} />
            </option>
          </select>
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-muted-foreground">Font Family</p>
          <input
            id="DM Sans"
            onChange={handleOnChanges}
            value={state.editor.selectedElement.styles.fontFamily}
          />
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-muted-foreground">Color</p>
          <input
            id="color"
            onChange={handleOnChanges}
            value={state.editor.selectedElement.styles.color}
          />
        </div>
        <div className="flex gap-4">
          <div>
            <label className="text-muted-foreground">Weight</label>
            <select
              onChange={(e) =>
                handleOnChanges({
                  target: {
                    id: 'font-weight',
                    value: e,
                  },
                })
              }
            >
              <label>Font Weights</label>
              <option value="bold">Bold</option>
              <option value="normal">Regular</option>
              <option value="lighter">Light</option>
            </select>
          </div>
          <div>
            <label className="text-muted-foreground">Size</label>
            <input
              placeholder="px"
              id="fontSize"
              onChange={handleOnChanges}
              value={state.editor.selectedElement.styles.fontSize}
            />
          </div>
        </div>
      </div>
    </section>
  )
}