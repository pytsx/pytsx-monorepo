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
      return {
        ...item,
        content: [...item.content, newItem],
      }
    } else if (item.content && Array.isArray(item.content)) {
      return {
        ...item,
        parent: action.payload.containerId,
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
    throw Error('Tipo de ação inválido: "MOVE_ELEMENT_POSITION" esperado.');
  }

  // Clonar o array original para evitar mutação
  const sortedArray = [...editorArray].sort((a, b) => (a.position || 0) - (b.position || 0));

  // Criar um novo array para armazenar os elementos movidos
  const newEditorArray: EditorElement[] = [];

  for (const item of sortedArray) {
    if (item.id === action.payload.elementId) {
      const { direction } = action.payload;
      const newPosition = calculateNewPosition(item.position, direction, sortedArray);

      // Mover o elemento para a nova posição
      newEditorArray.splice(newPosition, 0, {
        ...item,
        position: newPosition,
      });
    } else if (item.content && Array.isArray(item.content)) {
      // Mover elementos recursivamente dentro do conteúdo
      newEditorArray.push({
        ...item,
        content: moveElement(item.content, action),
      });
    } else {
      // Adicionar elementos sem modificação
      newEditorArray.push(item);
    }
  }

  return newEditorArray;
};

// Função para calcular a nova posição do elemento
function calculateNewPosition(
  position: number,
  direction: 'up' | 'down',
  sortedArray: EditorElement[]
): number {
  const nextIndex = direction === 'down' ? position + 1 : position - 1;

  // Validar se a nova posição está dentro dos limites do array
  if (nextIndex < 0 || nextIndex >= sortedArray.length) {
    return position;
  }

  // Retornar a nova posição
  return nextIndex;
}

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
