"use client"
import React from "react"
import { SettingsProps } from "./interface"
import { useEditor } from "../../../../../provider"


export function DimensionsSettings({ handleOnChanges }: SettingsProps) {
  const { state } = useEditor()


  return (
    <section
      className=" px-6 py-0 "
    >
      <p className="!no-underline">
        Dimensions
      </p>
      <div className='px-2' >
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <div className="flex gap-4 flex-col">
              <div className="flex gap-4">
                <div>
                  <label className="text-muted-foreground">Height</label>
                  <input
                    id="height"
                    placeholder="px"
                    onChange={handleOnChanges}
                    value={state.editor.selectedElement.styles.height}
                  />
                </div>
                <div>
                  <label className="text-muted-foreground">Width</label>
                  <input
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
                  <label className="text-muted-foreground">Top</label>
                  <input
                    id="marginTop"
                    placeholder="px"
                    onChange={handleOnChanges}
                    value={state.editor.selectedElement.styles.marginTop}
                  />
                </div>
                <div>
                  <label className="text-muted-foreground">Bottom</label>
                  <input
                    placeholder="px"
                    id="marginBottom"
                    onChange={handleOnChanges}
                    value={state.editor.selectedElement.styles.marginBottom}
                  />
                </div>
              </div>
              <div className="flex gap-4">
                <div>
                  <label className="text-muted-foreground">Left</label>
                  <input
                    placeholder="px"
                    id="marginLeft"
                    onChange={handleOnChanges}
                    value={state.editor.selectedElement.styles.marginLeft}
                  />
                </div>
                <div>
                  <label className="text-muted-foreground">Right</label>
                  <input
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
                  <label className="text-muted-foreground">Top</label>
                  <input
                    placeholder="px"
                    id="paddingTop"
                    onChange={handleOnChanges}
                    value={state.editor.selectedElement.styles.paddingTop}
                  />
                </div>
                <div>
                  <label className="text-muted-foreground">Bottom</label>
                  <input
                    placeholder="px"
                    id="paddingBottom"
                    onChange={handleOnChanges}
                    value={state.editor.selectedElement.styles.paddingBottom}
                  />
                </div>
              </div>
              <div className="flex gap-4">
                <div>
                  <label className="text-muted-foreground">Left</label>
                  <input
                    placeholder="px"
                    id="paddingLeft"
                    onChange={handleOnChanges}
                    value={state.editor.selectedElement.styles.paddingLeft}
                  />
                </div>
                <div>
                  <label className="text-muted-foreground">Right</label>
                  <input
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