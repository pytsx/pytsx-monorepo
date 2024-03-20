'use client'

import clsx from 'clsx'
import React from 'react'
import ComponentsTab from './tabs/components-tab'
import { useEditor } from '../../../provider'
import { TabList } from './tabs'

export type SidebarTabs = "settings" | "components"

export const Sidebar = () => {
  const { state, dispatch } = useEditor()
  const [active, setActive] = React.useState<SidebarTabs>("settings")

  const changeSidebarTab = (tab: SidebarTabs) => setActive(tab)

  return (
    <aside className='max-h-screen h-screen  right-0 top-0 z-50 bg-card '>
      <div
        className="w-full relative"
        defaultValue="Settings"
      >
        <section
          className={clsx(
            'sticky top-0 bg-card/90 backdrop-blur-sm w-full z-[80] py-1 px-2 transition-all',
            { hidden: state.editor.previewMode }
          )}
        >
          <TabList setActive={setActive} active={active} />
        </section>

        <section
          className={clsx(
            'w-80 z-[40] shadow-none p-0 h-full transition-all',
            { hidden: state.editor.previewMode }
          )}
        >
          <div className="w-full flex gap-4 h-full ">
            <div style={{
              ...(active !== "settings" && { display: "none" })
            }} >
              {/* <SettingsTab /> */}
            </div>
            <div style={{ ...(active !== "components" && { display: "none" }) }}>
              <ComponentsTab />
            </div>
          </div>
        </section>

      </div>
    </aside>
  )
}