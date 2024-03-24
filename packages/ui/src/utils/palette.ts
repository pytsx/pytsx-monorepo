import { ColorType, ModeType } from "../provider/interface"

export const createColors = (mode: ModeType = "system") => {
  return {
    card: mode == "dark" ? "#060606" : "#f5f5f5",
    dangerous: "#EA4335",
    primary: "#4974a5",
    secondary: "#7a49a5",
    warning: "#FBBC05",
    success: "#34A853",
    background: mode == "dark" ? "#000000" : "#ffffff",
    muted: mode == "dark" ? "#1d1d1d" : "#4d4d4d",
    input: mode == "dark" ? "#1d1d1d32" : "#4d4d4d32",
    "text-primary": mode == "dark" ? "#fafafaaf" : "#1d1d1daf",
  } as Record<ColorType, string>
}

export const colors = (type: ColorType = "primary", mode?: ModeType) => {
  const colors = createColors(mode)
  return colors[type]
}