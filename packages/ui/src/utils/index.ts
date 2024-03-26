"use client"
import { ColorType, ITheme, ModeType } from "../provider/interface"
import { createBorders } from "./border"
import { colors, createColors, createPalette } from "./palette"
import { createSimpleSizes, createSizes } from "./size"

export * from './palette'
export * from './size'


export const createTheme = (mode: ModeType) => {
  const colors = createColors(mode)
  return {
    colors: colors,
    borders: createBorders(Object.keys(colors) as ColorType[]),
    sizes: createSizes(),
    screens: {
      "screen-xs": "420px",
      "screen-sm": "640px",
      "screen-md": "768px",
      "screen-lg": "1024px",
      "screen-xl": "1280px",
      "screen-2xl": "1536px",
    },
    spacing: createSimpleSizes(),
    palette: createPalette(mode)
  } as ITheme
}

export const createScroll = (): React.CSSProperties => {
  return {
    scrollbarWidth: "auto",
    scrollbarColor: `${colors("muted")} transparent`,
  }
}