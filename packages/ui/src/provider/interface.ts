
export type ModeType = "dark" | "light" | "system"

type Extralarge<T extends string | number> = `${T}xl`

export type SizeExtraLargeType = Extralarge<2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24 | 25 | 26 | 27 | 28>
export type SizeType =
  | "2xs"
  | "xs"
  | "sm"
  | "md"
  | "lg"
  | "xl"
  | SizeExtraLargeType

export type BaseColors =
  | "red"
  | "green"
  | "blue"
  | "yellow"
  | "orange"
  | "violet"
  | "gray"

export type PaletteGradient = 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 | 1000
export type IPaletteColor<T extends number = PaletteGradient> = Record<BaseColors, Record<T, string>> 

export type ColorType =
  | "primary"
  | "secondary"
  | "card"
  | "dangerous"
  | "warning"
  | "success"
  | "background"
  | "muted"
  | "input"
  | "text-primary"


type ScreenTypes = "screen-xs" | "screen-sm" | "screen-md" | "screen-lg" | "screen-xl" | "screen-2xl"

export interface ITheme {
  colors: Record<ColorType, string>,
  borders: Record<ColorType, string>,
  sizes: Record<SizeType, string>,
  screens: Record<ScreenTypes, string>
  spacing: Record<number, string>,
  palette: IPaletteColor
}

export interface IThemeContext {
  mode: ModeType
  setMode: React.Dispatch<React.SetStateAction<ModeType>>
  theme: ITheme
}