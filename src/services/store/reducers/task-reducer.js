import actionTypes from '../action-types'

const defaultState = {
  fetched: false,
  list: null,
}

export const taskReducer = (state = defaultState, action) => {
  switch (action.type) {
    case actionTypes.getTaskSuccess:
      return { ...state, fetched: true, list: action.payload }
    case actionTypes.deleteTaskSuccess:
      if (!state.list) return state
      const taskIdToDelete = action.payload.id
      const list = state.list.filter((t) => t.id !== taskIdToDelete)
      return { ...state, fetched: true, list }

    default:
      return state
  }
}
