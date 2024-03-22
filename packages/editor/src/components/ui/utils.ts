"use client"

const prefersDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;

type ColorType =
  | "primary"
  | "secondary"
  | "card"
  | "dangerous"
  | "warning"
  | "success"
  | "background"
  | "muted"

export const colors = (type: ColorType = "primary") => {
  const colors = {
    card: prefersDarkMode ? "#0d0d0d" : "#f5f5f5",
    dangerous: "#EA4335",
    primary: "#0066cc",
    secondary: "#1d1d1d",
    warning: "#FBBC05",
    success: "#34A853",
    background: prefersDarkMode ? "#000000" : "#ffffff",
    muted: prefersDarkMode ? "#3D3D3D" : "#9d9d9d"
  } as Record<ColorType, string>


  return colors[type]
}

export const border = (
  type: ColorType = "muted",
  borderType: "solid" | "dashed" = "solid"
) => {
  return `1px ${borderType} ${colors(type)}`
}

type SizeType = "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "6xl"
type OrientationType = "x" | "y" | "xy"

const sizefactor = .25

const basesizes = (factor: number = sizefactor): Record<SizeType, number> => {
  return {
    xs: factor,         // .25rem
    sm: factor * 2,      // .5rem
    md: factor * 3,      // .75rem
    lg: factor * 4,      // 1rem
    xl: factor * 5,      // 1.25rem
    "2xl": factor * 6,   // 1.5rem
    "3xl": factor * 7,   // 1.75rem
    "4xl": factor * 8,   // 2rem
    "5xl": factor * 9,   // 2.25rem
    "6xl": factor * 10,   // 2.5rem
  }
}

export const obtainSize = (size: SizeType, factor: number = sizefactor) => {
  return basesizes(factor)[size]
}

type SizeProps = Partial<Record<OrientationType, SizeType>>

export const size = (option?: SizeProps | SizeType, factor?: number): string => {
  if (typeof option == "object") {
    const { x, xy, y } = option
    if (x && y) {
      return `${obtainSize(y, factor)}rem ${obtainSize(x, factor)}rem`
    }
    return `${obtainSize(x || y || xy || "md", factor)}rem`
  }
  return `${obtainSize(option || "md", factor)}rem`
}


export const sizes = (factor: number = sizefactor): Record<SizeType, string> => {
  const values: SizeType[] = ["xs", "sm", "md", "lg", "xl", "2xl", "3xl", "4xl", "5xl", "6xl"]
  const response: Record<SizeType, string> = {} as Record<SizeType, string>
  for (let size of values) {
    response[size] = obtainSize(size, factor).toString().concat("rem")
  }
  return response
}


export const createScroll = (): React.CSSProperties => {
  return {
    scrollbarWidth: "auto",
    scrollbarColor: `${colors("muted")} transparent`,
  }
}