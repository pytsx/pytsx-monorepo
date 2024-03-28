'use client'

import React from 'react'
import { useEditor } from '../../../../provider'
import { createScroll, useTheme, IconButton } from '@pytsx/ui'
import { SettingsIcon } from 'lucide-react'
import { DimensionsSettings } from './sections/dimensions'
import { DecorationsSettings } from './sections/decorations'
import { FlexboxSettings } from './sections/flexbox'
import { TypographySettings } from './sections/typography'
import { SidebarContainer } from '../container'

export type SidebarTabs = "settings" | "components"

export const SettingsSidebar = () => {
  const { state, dispatch } = useEditor()
  const { theme } = useTheme()

  const handleOnChanges = (e: any) => {
    const styleSettings: string = e.target.id
    let value: string = e.target.value

    const styleObject = {
      [styleSettings]: value,
    }
    dispatch({
      type: 'UPDATE_ELEMENT',
      payload: {
        elementDetails: {
          ...state.editor.selectedElement,
          styles: {
            ...state.editor.selectedElement.styles,
            ...styleObject,
          },
        },
      },
    })
  }

  return (
    <SidebarContainer side='right'>
      <div
        style={{
          width: "100%",
          position: "relative"
        }}
      >
        <section
          style={{
            width: "100%",
            zIndex: 200,
            padding: theme.sizes.sm,
            borderBottom: theme.borders.muted,
          }}
        >
          <IconButton >
            <SettingsIcon />
          </IconButton>
        </section>

        <section
          style={{
            zIndex: 500,
            height: "100%",
            width: "100%",
          }}
        >
          <div style={{
            display: "flex",
            flexDirection: "column",
            gap: theme.sizes.md,
            fontSize: ".8rem !important",
          }}>
            {state.editor.selectedElement.type !== "text" ? (
              <>
                <DimensionsSettings />
                <DecorationsSettings handleOnChanges={handleOnChanges} />
                <FlexboxSettings handleOnChanges={handleOnChanges} />
              </>
            ) : (
              <TypographySettings handleOnChanges={handleOnChanges} />
            )}
          </div>
        </section>

      </div>
    </SidebarContainer>
  )
}