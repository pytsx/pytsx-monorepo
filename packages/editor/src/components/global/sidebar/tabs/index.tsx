import React, { Dispatch, SetStateAction } from 'react'
import { Plus, SettingsIcon } from 'lucide-react'
import { IconButton } from '../../../ui/icon-button'
import { SidebarTabs } from '..'

type Props = {
  setActive: Dispatch<SetStateAction<SidebarTabs>>
  active: string
}

export const TabList = ({ active, setActive }: Props) => {
  return (
    <section className="space-x-2 flex justify-stretch w-full bg-transparent h-fit  ">
      <IconButton active={active == "settings"} onClick={() => setActive("settings")}>
        <SettingsIcon />
      </IconButton>
      <IconButton active={active == "components"} onClick={() => setActive("components")}>
        <Plus />
      </IconButton>
    </section>
  )
}
