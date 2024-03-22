"use client "

import React from "react"
import { DeviceTypes, useEditor } from "../../../../provider"
import { Laptop, Smartphone, Tablet } from 'lucide-react'
import { IconButton } from "@pytsx/ui"

export function ChangeDeviceMode() {
  const { dispatch, state } = useEditor()
  const [active, setActive] = React.useState<DeviceTypes>("Desktop")

  function handleChange(value: DeviceTypes) {
    setActive(value)
    dispatch({
      type: 'CHANGE_DEVICE',
      payload: { device: value },
    })
  }
  return (
    <section
      className="w-fit "
    >
      <div className="flex w-full flex-row bg-transparent h-fit">
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