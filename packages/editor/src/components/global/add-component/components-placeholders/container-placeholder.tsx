import React from 'react'
import { EditorBtns } from '../../../../provider'

type Props = {}

const ContainerPlaceholder = (props: Props) => {
  const handleDragStart = (e: React.DragEvent, type: EditorBtns) => {
    if (type === null) return
    e.dataTransfer.setData('componentType', type)
  }
  return (
    <div
      draggable
      onDragStart={(e) => handleDragStart(e, 'container')}
      // className=" h-14 w-14 bg-muted/70 rounded-lg p-2 flex flex-row gap-[4px]"
      style={{
        height: '3.5rem',
        width: '3.5rem',
        backgroundColor: 'rgba(226, 232, 240, 0.7)', // Assuming "muted" translates to #e2e8f0
        borderRadius: '8px',
        padding: '2px',
        display: 'flex',
        flexDirection: 'row',
        gap: '4px',
      }}
    >
      <div style={{
        borderStyle: 'dashed',
        borderWidth: '1px',
        height: '100%',
        borderRadius: '4px',
        backgroundColor: 'rgba(226, 232, 240, 0.5)',
        borderColor: 'rgba(226, 232, 240, 0.25)',
        width: '100%',
      }} />
    </div>
  )
}

export default ContainerPlaceholder
