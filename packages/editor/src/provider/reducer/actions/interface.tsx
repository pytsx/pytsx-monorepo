import { DeviceTypes, EditorElement } from "../../interface"

export type EditorAction =
  | {
    type: 'ADD_ELEMENT'
    payload: {
      containerId: string
      elementDetails: EditorElement
    }

  } | {
    type: 'UPDATE_ELEMENT'
    payload: {
      elementDetails: EditorElement
    }
  } | {
    type: 'DELETE_ELEMENT'
    payload: {
      elementDetails: EditorElement
    }
  } | {
    type: "MOVE_ELEMENT_POSITION"
    payload: {
      elementDetails: EditorElement
      direction: "up" | "down"
    }
  } | {
    type: "TOGGLE_LIVE_MODE"
    payload?: {
      value?: boolean
    }
  } | {
    type: "TOGGLE_PREVIEW_MODE"
  } | {
    type: "LOAD_DATA"
    payload: {
      elements: EditorElement[]
      withLive: boolean
    }
  } | {
    type: "CHANGE_CLICKED_ELEMENT"
    payload: {
      elementDetails?:
      | EditorElement
    }
  } | {
    type: "SET_PAGE_ID"
    payload: {
      pageId: string
    }
  } | {
    type: 'CHANGE_DEVICE'
    payload: {
      device: DeviceTypes
    }
  }
  | { type: 'REDO' }
  | { type: 'UNDO' }