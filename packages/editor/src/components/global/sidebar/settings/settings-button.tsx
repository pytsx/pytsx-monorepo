import React, { Dispatch, SetStateAction } from 'react'
import { SettingsIcon } from 'lucide-react'
import { SidebarTabs } from '..'
import { IconButton } from '@pytsx/ui'

type Props = {
  setActive: Dispatch<SetStateAction<SidebarTabs>>
  active: string
}

export const SettingsButton = ({ active, setActive }: Props) => {
  return (
    <section
      className="space-x-2 flex justify-stretch w-full bg-transparent h-fit  "
      style={{
        display: "flex",

      }}
    >
      <IconButton active={active == "settings"} onClick={() => setActive("settings")}>
        <SettingsIcon />
      </IconButton>

    </section>
  )
}
