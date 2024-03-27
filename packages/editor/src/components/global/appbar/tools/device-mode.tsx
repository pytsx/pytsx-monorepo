"use client "

import React from "react"
import { DeviceTypes, useEditor } from "../../../../provider"
import { Laptop, Smartphone, Tablet } from 'lucide-react'
import { IconButton, useTheme } from "@pytsx/ui"

export function ChangeDeviceMode() {
  const { dispatch, state } = useEditor()
  const [active, setActive] = React.useState<DeviceTypes>("Desktop")
  const { theme } = useTheme()
  function handleChange(value: DeviceTypes) {
    setActive(value)
    dispatch({
      type: 'CHANGE_DEVICE',
      payload: { device: value },
    })
  }
  return (
    <section
      style={{
        width: "fit-content",
      }}
    >
      <div
        style={{
          display: "flex",
          width: "fit-content",
          flexDirection: "row",
          height: "fit-content",
          gap: theme.sizes.sm
        }}
      >
        <IconButton
          active={active == "Desktop"}
          onClick={() => handleChange("Desktop")}
        >
          <Laptop />
        </IconButton>

        <IconButton
          active={active == "Tablet"}
          onClick={() => handleChange("Tablet")}
        >
          <Tablet />
        </IconButton>

        <IconButton
          active={active == "Mobile"}
          onClick={() => handleChange("Mobile")}
        >
          <Smartphone />
        </IconButton>
      </div>
    </section>
  )
}