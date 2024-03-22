"use client"
export type * from "./interface"
export * from "./reducer"
export type * from "./reducer"

import React, { useReducer } from "react"
import { initialState } from "./reducer/initial-state"
import { EditorContextProps, EditorProviderProps } from "./interface"
import { editorReducer } from "./reducer"

import { ThemeProvider } from '@pytsx/ui'

export const EditorContext = React.createContext<EditorContextProps>({
  state: initialState,
  dispatch: () => { }
})

export const EditorProvider = ({ children }: EditorProviderProps) => {
  const [state, dispatch] = useReducer(editorReducer, initialState)

  return (
    <EditorContext.Provider value={{
      state,
      dispatch
    }}>
      <ThemeProvider>
        {children}
      </ThemeProvider>
    </EditorContext.Provider>
  )
}


export const useEditor = () => {
  const context = React.useContext(EditorContext)
  if (!context) {
    throw new Error("useEditor Hook must be used within the editor Provider")
  }
  return context
}