
import React from 'react'
import TextPlaceholder from './text-placeholder'
import ContainerPlaceholder from './container-placeholder'
import { EditorBtns } from '../../../../provider'
import { PlaceholderList } from './placeholders-list'
import { size } from '../../../ui/utils'

type Props = {}

export type PlaceholderElement = {
  Component: React.ReactNode
  label: string
  id: EditorBtns
  group: 'layout' | 'elements'
}

const ComponentsPlaceholders = (props: Props) => {
  const elements: PlaceholderElement[] = [
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
    }
  ]

  return (
    <section style={{
      width: 'fit-content',
      padding: size({
        x: "md",
        y: "sm"
      })
    }}>
      <PlaceholderList
        title='Layout'
        elements={elements.filter((element) => element.group === 'layout')}
      />
      <PlaceholderList
        title='Elementos'
        elements={elements.filter((element) => element.group === 'elements')}
      />
    </section>
  )
}

export default ComponentsPlaceholders
