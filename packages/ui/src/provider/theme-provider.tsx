"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { type ThemeProviderProps } from "next-themes/dist/types"
import { ITheme, IThemeContext, ModeType } from "./interface"
import { createTheme } from "../utils"

const ThemeContext = React.createContext<IThemeContext>({
  mode: "dark",
  setMode: () => { },
  theme: createTheme("dark")
})

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  const [mode, setMode] = React.useState<ModeType>("dark")
  const [theme, setTheme] = React.useState<ITheme>(createTheme(mode))

  React.useEffect(() => {
    setTheme(createTheme(mode))
  }, [mode])

  return <ThemeContext.Provider value={{ mode, setMode, theme }}>
    <NextThemesProvider
      attribute="data-*"
      defaultTheme={mode}
      enableSystem
      disableTransitionOnChange
      {...props}
    >
      {children}
    </NextThemesProvider>
  </ThemeContext.Provider>
}


export const useTheme = () => {
  const context = React.useContext(ThemeContext)
  if (!context) throw new Error("cannot use theme hook without a ThemeProvider")
  return context
}