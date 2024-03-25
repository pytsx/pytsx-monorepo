import React, { Dispatch, SetStateAction } from 'react'
import { SettingsIcon } from 'lucide-react'
import { SidebarTabs } from '..'
import { IconButton } from '@pytsx/ui'


export const SettingsButton = () => {
  return (
    <IconButton >
        <SettingsIcon />
    </IconButton>
  )
}
