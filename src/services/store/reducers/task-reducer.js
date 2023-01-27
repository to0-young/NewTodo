import actionTypes from '../action-types'

const defaultState = {
  fetched: false, // for list
  received: false, // for details
  list: null,
  details: null,
}

export const taskReducer = (state = defaultState, action) => {
  switch (action.type) {
    case actionTypes.fetchTasksSuccess:
      return { ...state, fetched: true, list: action.payload }

    case actionTypes.getTaskSuccess:
      return { ...state, received: true, details: action.payload }

    case actionTypes.updateTaskSuccess:
      const indexArray = state.list.findIndex((task) => {
        return task.id === action.payload.id
      })
      const newArray = [...state.list]
      newArray[indexArray] = action.payload
      return { ...state, list: newArray }

    case actionTypes.deleteTaskSuccess:
      if (!state.list) return state
      const taskIdToDelete = action.payload.id
      const list = state.list.filter((t) => t.id !== taskIdToDelete)
      return { ...state, list }

    default:
      return state
  }
}
