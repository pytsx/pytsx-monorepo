
import React from 'react'
import TextPlaceholder from './text-placeholder'
import ContainerPlaceholder from './container-placeholder'
import TwoColumnsPlaceholder from './two-columns-placeholder'
import { EditorBtns } from '../../../../../provider'

type Props = {}

const ComponentsTab = (props: Props) => {
  const elements: {
    Component: React.ReactNode
    label: string
    id: EditorBtns
    group: 'layout' | 'elements'
  }[] = [
      {
        Component: <TextPlaceholder />,
        label: 'texto',
        id: 'text',
        group: 'elements',
      },
      {
        Component: <ContainerPlaceholder />,
        label: 'container',
        id: 'container',
        group: 'layout',
      },
      {
        Component: <TwoColumnsPlaceholder />,
        label: '2 colunas',
        id: '2Col',
        group: 'layout',
      }
    ]

  return (
    <section
      className="w-full"
      defaultValue={['Layout', 'Elements']}
    >
      <div
        className="px-6 py-0 border-y-[1px]"
      >
        <p className="!no-underline">Layout</p>
        <div className="flex flex-wrap gap-2 ">
          {elements
            .filter((element) => element.group === 'layout')
            .map((element) => (
              <div
                key={element.id}
                className="flex-col items-center justify-center flex"
              >
                {element.Component}
                <span className="text-muted-foreground">{element.label}</span>
              </div>
            ))}
        </div>
      </div>

      <div className="px-6 py-0 " >
        <p className="!no-underline">Elementos</p>
        <div className="flex flex-wrap gap-2 ">
          {elements
            .filter((element) => element.group === 'elements')
            .map((element) => (
              <div
                key={element.id}
                className="flex-col items-center justify-center flex"
              >
                {element.Component}
                <span className="text-muted-foreground">{element.label}</span>
              </div>
            ))}
        </div>
      </div>
    </section>
  )
}

export default ComponentsTab
