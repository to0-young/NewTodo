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
      return { ...state, received: true, details: true }

    case actionTypes.deleteTaskSuccess:
      if (!state.list) return state
      const taskIdToDelete = action.payload.id
      const list = state.list.filter((t) => t.id !== taskIdToDelete)
      return { ...state, list }

    default:
      return state
  }
}
