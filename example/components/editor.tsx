"use client"

import { Editor, EditorProvider, IPage } from "@pytsx/editor"

type Props = {
  pageId: string
  pageDetails: IPage
  liveMode?: boolean
}

export function EditorWrapper({ pageDetails, pageId, liveMode }: Props) {
  return (
    <EditorProvider
      pageId={pageId}
      pageDetails={pageDetails} >
      <Editor
        content={pageDetails.content || ""}
        liveMode={!!liveMode}
      />
    </EditorProvider>
  )
} 