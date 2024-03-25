export * from "./actions"
export type * from "./actions"

import { EditorElement, EditorState } from "..";
import { EditorAction, updateEditor, updateHistory } from "./actions";
import { initialState } from "./initial-state";


export const emptyEditorElement: EditorElement = {
  id: '',
  content: [],
  name: '',
  styles: {},
  type: null,
  position: 1,
  parent: null
}

export const editorReducer = (
  state: EditorState = initialState,
  action: EditorAction
): EditorState => {
  switch (action.type) {
    case "ADD_ELEMENT":
    case 'UPDATE_ELEMENT':
    case 'DELETE_ELEMENT':
    case "MOVE_ELEMENT_POSITION":
      const newEditorState: EditorState["editor"] = updateEditor(state, action)
      const newHistoryState: EditorState["history"] = updateHistory(state, newEditorState)
      return {
        ...state,
        editor: newEditorState,
        history: newHistoryState,
      }
    case "CHANGE_CLICKED_ELEMENT":
      return {
        ...state,
        editor: {
          ...state.editor,
          selectedElement: action.payload.elementDetails || emptyEditorElement,
        }
      }
    case "TOGGLE_LIVE_MODE":
      const toggleLiveMode: EditorState = {
        ...state,
        editor: {
          ...state.editor,
          liveMode: action.payload
            ? !!action.payload.value
            : !state.editor.liveMode
        }
      }
      return toggleLiveMode
    case 'TOGGLE_PREVIEW_MODE':
      const toggleState = {
        ...state,
        editor: {
          ...state.editor,
          previewMode: !state.editor.previewMode,
        },
      }
      return toggleState

    case "CHANGE_DEVICE":
      const changedDeviceState = {
        ...state,
        editor: {
          ...state.editor,
          device: action.payload.device,
        },
      }
      return changedDeviceState

    case "LOAD_DATA":
      const loadedData: EditorState = {
        ...initialState,
        editor: {
          ...initialState.editor,
          elements: action.payload.elements || initialState.editor.elements,
          liveMode: !!action.payload.withLive
        }
      }
      return loadedData
    case 'REDO':
      if (state.history.currentIndex < state.history.history.length - 1) {
        const nextIndex = state.history.currentIndex + 1
        const nextEditorState = { ...state.history.history[nextIndex] }
        const redoState = {
          ...state,
          editor: nextEditorState,
          history: {
            ...state.history,
            currentIndex: nextIndex,
          },
        }
        return redoState
      }
      return state

    case 'UNDO':
      if (state.history.currentIndex > 0) {
        const prevIndex = state.history.currentIndex - 1
        const prevEditorState = { ...state.history.history[prevIndex] }
        const undoState = {
          ...state,
          editor: prevEditorState,
          history: {
            ...state.history,
            currentIndex: prevIndex,
          },
        }
        return undoState
      }
      return state
    case 'SET_PAGE_ID':
      const { pageId } = action.payload
      const updatedEditorStateWithFunnelPageId = {
        ...state.editor,
        pageId,
      }

      const updatedHistoryWithFunnelPageId = [
        ...state.history.history.slice(0, state.history.currentIndex + 1),
        { ...updatedEditorStateWithFunnelPageId }, // Save a copy of the updated state
      ]

      const funnelPageIdState = {
        ...state,
        editor: updatedEditorStateWithFunnelPageId,
        history: {
          ...state.history,
          history: updatedHistoryWithFunnelPageId,
          currentIndex: updatedHistoryWithFunnelPageId.length - 1,
        },
      }
      return funnelPageIdState

    default:
      return state
  }
}