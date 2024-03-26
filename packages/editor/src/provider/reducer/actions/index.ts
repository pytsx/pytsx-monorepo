export type * from "./interface"
import { emptyEditorElement } from ".."
import { EditorElement, EditorState } from "../../interface"
import { EditorAction } from "./interface"

export const addAnElement = (
  editorArray: EditorElement[],
  action: EditorAction
): EditorElement[] => {
  if (action.type !== 'ADD_ELEMENT')
    throw Error(
      'You sent the wrong action type to the Add Element editor State'
    )
  return editorArray.map((item) => {
    if (item.id === action.payload.containerId && Array.isArray(item.content)) {
      const newItem = action.payload.elementDetails
      newItem.parent = action.payload.containerId

      return {
        ...item,
        content: [...item.content, newItem],
      }
    } else if (item.content && Array.isArray(item.content)) {
      return {
        ...item,
        content: addAnElement(item.content, action),
      }
    }
    return item
  })
}


export const updateAnElement = (
  editorArray: EditorElement[],
  action: EditorAction
): EditorElement[] => {
  if (action.type !== 'UPDATE_ELEMENT') {
    throw Error('You sent the wrong action type to the update Element State')
  }
  return editorArray.map((item) => {
    if (item.id === action.payload.elementDetails.id) {
      return { ...item, ...action.payload.elementDetails }
    } else if (item.content && Array.isArray(item.content)) {
      return {
        ...item,
        content: updateAnElement(item.content, action),
      }
    }
    return item
  })
}

export const moveElement = (
  editorArray: EditorElement[],
  action: EditorAction
): EditorElement[] => {
  if (action.type !== 'MOVE_ELEMENT_POSITION') {
    throw Error('Você enviou o tipo de ação incorreto para o estado Move Element');
  }

  // Criar uma cópia para evitar mutação do array original
  const sortedArray = [...editorArray].sort((a, b) => (a.position || 0) - (b.position || 0));

  return sortedArray.map((item) => {
    if (item.id === action.payload.elementDetails.parent && item.content && Array.isArray(item.content)) {
      const { direction, elementDetails } = action.payload;

      // Verificar se o elemento a ser movido existe
      if (!elementDetails) {
        return item;
      }

      const indexToMove = item.content.findIndex((el) => el.id === elementDetails.id);

      if (indexToMove === -1) {
        return item;
      }

      const nextIndex = indexToMove + 1;
      const prevIndex = indexToMove - 1;

      // Criar uma cópia do conteúdo para modificação
      const newContent = [...item.content];


      if (direction === 'up' && item.content[prevIndex] && item.content[indexToMove].position > 0) {
        const oldPosition = indexToMove
        const newPosition = oldPosition - 1

        newContent[prevIndex].position = oldPosition;
        newContent[indexToMove].position = newPosition;
        console.log("UP",
          "old position: ", oldPosition,
          "new position: ", newPosition
        )
      } else if (direction === 'down' && item.content[nextIndex]) {
        const oldPosition = indexToMove;
        const newPosition = oldPosition + 1

        newContent[nextIndex].position = oldPosition
        newContent[indexToMove].position = newPosition;
        console.log("DOWN",
          "old position: ", oldPosition,
          "new position: ", newPosition
        )
      }

      return { ...item, content: newContent };
    } else if (item.content && Array.isArray(item.content)) {
      return { ...item, content: moveElement(item.content, action) };
    }
    return item;
  });
};


export const deleteAnElement = (
  editorArray: EditorElement[],
  action: EditorAction
): EditorElement[] => {
  if (action.type !== 'DELETE_ELEMENT')
    throw Error(
      'You sent the wrong action type to the Delete Element editor State'
    )
  return editorArray.filter((item) => {
    if (item.id === action.payload.elementDetails.id) {
      return false
    } else if (item.content && Array.isArray(item.content)) {
      item.content = deleteAnElement(item.content, action)
    }
    return true
  })
}


export const updateHistory = (
  state: EditorState,
  newEditorState: EditorState["editor"],
): EditorState["history"] => {
  // Update the history to include the entire updated EditorState
  const newEditorHistory: EditorState["history"]["history"] = [
    ...state.history.history.slice(0, state.history.currentIndex + 1),
    { ...newEditorState }, // Save a copy of the updated state
  ]

  return {
    ...state.history,
    history: newEditorHistory,
    currentIndex: newEditorHistory.length - 1,
  }
}



export const updateEditor = (
  state: EditorState,
  action: EditorAction,
): EditorState["editor"] => {
  switch (action.type) {
    case "ADD_ELEMENT":
      return {
        ...state.editor,
        elements: addAnElement(state.editor.elements, action),
        selectedElement: action.payload.elementDetails
      };
    case "DELETE_ELEMENT":
      return {
        ...state.editor,
        elements: deleteAnElement(state.editor.elements, action),
      }
    case "UPDATE_ELEMENT":
      // Perform your logic to update the element in the state
      const UpdatedElementIsSelected =
        state.editor.selectedElement.id === action.payload.elementDetails.id
      return {
        ...state.editor,
        elements: updateAnElement(state.editor.elements, action),
        selectedElement: UpdatedElementIsSelected
          ? action.payload.elementDetails
          : emptyEditorElement,
      }

    case "MOVE_ELEMENT_POSITION":
      return {
        ...state.editor,
        elements: moveElement(state.editor.elements, action)
      }
    default:
      return state["editor"];
  }
}
