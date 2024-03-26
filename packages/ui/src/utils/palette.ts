import { createGradientColors } from "../colors/factories"
import { BaseColors, ColorType, IPaletteColor, ModeType } from "../provider/interface"

type BaseColorsProps = Record<BaseColors, string>

const defaultBaseColors: BaseColorsProps = {
  green: "#34A853",
  red: "#EA4335",
  blue: "#4974a5",
  yellow: "#D2B48C",
  orange: "#D9381E",
  violet: "#7a49a5",
  gray: "#3c3c3c"
}

export const createPalette = (
  mode: ModeType,
  baseColors: BaseColorsProps = defaultBaseColors
): IPaletteColor => {
  const colorsKeys: BaseColors[] = Object.keys(baseColors) as BaseColors[]

  let palette: IPaletteColor = {} as IPaletteColor

  colorsKeys.forEach((colorKey) => {
    const color = baseColors[colorKey]
    palette[colorKey] = createGradientColors(color)
  })
  palette.gray = {
    100: mode == "dark" ? "hsla(0, 0%, 100%, 0.06)" : "rgba(0, 0, 0, .05)",
    200: mode == "dark" ? "hsla(0, 0%, 100%, 0.09)" : "rgba(0, 0, 0, .08)",
    300: mode == "dark" ? "hsla(0, 0%, 100%, 0.13)" : "rgba(0, 0, 0, .1)",
    400: mode == "dark" ? "hsla(0, 0%, 100%, 0.14)" : "rgba(0, 0, 0, .08)",
    500: mode == "dark" ? "hsla(0, 0%, 100%, 0.24)" : "rgba(0, 0, 0, .21)",
    600: mode == "dark" ? "hsla(0, 0%, 100%, 0.51)" : "rgba(0, 0, 0, .34)",
    700: mode == "dark" ? "hsla(0, 0%, 100%, 0.54)" : "rgba(0, 0, 0, .44)",
    800: mode == "dark" ? "hsla(0, 0%, 100%, 0.47)" : "rgba(0, 0, 0, .51)",
    900: mode == "dark" ? "hsla(0, 0%, 100%, 0.61)" : "rgba(0, 0, 0, .61)",
    1000: mode == "dark" ? "hsla(0, 0%, 100%, 0.92)" : "rgba(0, 0, 0, .91)",
  }
  return ({
    ...palette,
  })
}

export const createColors = (mode: ModeType = "system") => {
  const palette = createPalette(mode)
  return {
    card: mode == "dark" ? "#060606" : "#f5f5f5",
    dangerous: "#EA4335",
    primary: "#4974a5",
    secondary: "#7a49a5",
    warning: "#FBBC05",
    success: "#34A853",
    background: mode == "dark" ? "#000000" : "#ffffff",
    muted: mode == "dark" ? "#1d1d1d" : "#4d4d4d",
    input: palette.gray[400],
    "text-primary": mode == "dark" ? "#fafafaaf" : "#1d1d1daf",
  }
}

export const colors = (type: ColorType = "primary", mode?: ModeType) => {
  const colors = createColors(mode)
  return colors[type]
}