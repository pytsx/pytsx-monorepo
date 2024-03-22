"use client"
import React from "react"
import { SettingsProps } from "./interface"
import { useEditor } from "../../../../../provider"
import { Input, Typography } from "@pytsx/ui"


export function DimensionsSettings({ handleOnChanges }: SettingsProps) {
  const { state } = useEditor()


  return (
    <section
      className=" px-6 py-0 "
    >
      <Typography className="!no-underline">
        Dimensions
      </Typography>
      <div className='px-2' >
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <div className="flex gap-4 flex-col">
              <div className="flex gap-4">
                <div>
                  <Typography >Height</Typography>
                  <Input
                    id="height"
                    placeholder="px"
                    onChange={handleOnChanges}
                    value={state.editor.selectedElement.styles.height}
                  />
                </div>
                <div>
                  <Typography >Width</Typography>
                  <Input
                    placeholder="px"
                    id="width"
                    onChange={handleOnChanges}
                    value={state.editor.selectedElement.styles.width}
                  />
                </div>
              </div>
            </div>
            <p>Margin px</p>
            <div className="flex gap-4 flex-col">
              <div className="flex gap-4">
                <div>
                  <Typography >Top</Typography>
                  <Input
                    id="marginTop"
                    placeholder="px"
                    onChange={handleOnChanges}
                    value={state.editor.selectedElement.styles.marginTop}
                  />
                </div>
                <div>
                  <Typography >Bottom</Typography>
                  <Input
                    placeholder="px"
                    id="marginBottom"
                    onChange={handleOnChanges}
                    value={state.editor.selectedElement.styles.marginBottom}
                  />
                </div>
              </div>
              <div className="flex gap-4">
                <div>
                  <Typography >Left</Typography>
                  <Input
                    placeholder="px"
                    id="marginLeft"
                    onChange={handleOnChanges}
                    value={state.editor.selectedElement.styles.marginLeft}
                  />
                </div>
                <div>
                  <Typography >Right</Typography>
                  <Input
                    placeholder="px"
                    id="marginRight"
                    onChange={handleOnChanges}
                    value={state.editor.selectedElement.styles.marginRight}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <p>Padding px</p>
            <div className="flex gap-4 flex-col">
              <div className="flex gap-4">
                <div>
                  <Typography >Top</Typography>
                  <Input
                    placeholder="px"
                    id="paddingTop"
                    onChange={handleOnChanges}
                    value={state.editor.selectedElement.styles.paddingTop}
                  />
                </div>
                <div>
                  <Typography >Bottom</Typography>
                  <Input
                    placeholder="px"
                    id="paddingBottom"
                    onChange={handleOnChanges}
                    value={state.editor.selectedElement.styles.paddingBottom}
                  />
                </div>
              </div>
              <div className="flex gap-4">
                <div>
                  <Typography >Left</Typography>
                  <Input
                    placeholder="px"
                    id="paddingLeft"
                    onChange={handleOnChanges}
                    value={state.editor.selectedElement.styles.paddingLeft}
                  />
                </div>
                <div>
                  <Typography >Right</Typography>
                  <Input
                    placeholder="px"
                    id="paddingRight"
                    onChange={handleOnChanges}
                    value={state.editor.selectedElement.styles.paddingRight}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}