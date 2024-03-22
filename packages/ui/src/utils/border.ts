import { ColorType } from "../provider/interface"
import { colors } from "./palette"

export const createBorders = (colors: ColorType[]) => {
  const borderObj: Record<ColorType, string> = {} as Record<ColorType, string>
  for (let color of colors) {
    borderObj[color] = border(color)
  }
  return borderObj
}

export const border = (
  type: ColorType = "muted",
  borderType: "solid" | "dashed" = "solid"
): string => {
  return `1px ${borderType} ${colors(type)}`
}
