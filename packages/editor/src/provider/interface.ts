import { EditorAction } from "./reducer/actions/interface"

export type EditorBtns =
  | 'text'
  | 'container'
  | 'section'
  | 'contactForm'
  | 'link'
  | '3Col'
  | '2Col'
  | 'video'
  | '__body'
  | 'image'
  | null

export type DeviceTypes =
  | 'Desktop'
  | 'Mobile'
  | 'Tablet'

export type EditorElement = {
  id: string
  styles: React.CSSProperties
  name: string
  type: EditorBtns
  content: EditorElement[] | { href?: string; innerText?: string; src?: string }
}

export interface IEditor {
  liveMode: boolean
  elements: EditorElement[]
  selectedElement: EditorElement
  previewMode: boolean
  pageId: string
  device: DeviceTypes
}

export type HistoryState = {
  history: IEditor[]
  currentIndex: number
}

export type EditorState = {
  editor: IEditor
  history: HistoryState
}

export type EditorContextProps = {
  state: EditorState
  dispatch: React.Dispatch<EditorAction>
}

export type IPage = {
  id: string
  title: string
  description: string
  visits?: number
  content?: string
  updatedAt?: string
}

export type EditorProviderProps = {
  children: React.ReactNode
  pageId: string
  pageDetails: IPage | any
}
