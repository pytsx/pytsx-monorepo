import { ColorType, ModeType } from "../provider/interface"

export const createColors = (mode: ModeType = "system") => {
  return {
    card: mode == "dark" ? "#0d0d0d" : "#f5f5f5",
    dangerous: "#EA4335",
    primary: "#0066cc",
    secondary: "#1d1d1d",
    warning: "#FBBC05",
    success: "#34A853",
    background: mode == "dark" ? "#000000" : "#ffffff",
    muted: mode == "dark" ? "#3D3D3D" : "#9d9d9d",
    input: mode == "dark" ? "#3D3D3D32" : "#9d9d9d32",
    "text-primary": mode == "dark" ? "#fafafa" : "#1d1d1d",
  } as Record<ColorType, string>
}

export const colors = (type: ColorType = "primary", mode?: ModeType) => {
  const colors = createColors(mode)
  return colors[type]
}