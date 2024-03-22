"use client"

import * as React from "react"
import { useTheme } from "next-themes"
import { MoonIcon, SunIcon } from "lucide-react"


export function ModeToggle() {
  const { setTheme, theme } = useTheme()

  return (
    <section>
      <div >
        <button onClick={() => setTheme(theme !== "dark" ? "dark" : "light")}>
          <SunIcon />
          <MoonIcon />
        </button>
      </div>


    </section>
  )
}
