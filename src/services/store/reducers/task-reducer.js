import actionTypes from "../action-types";

const defaultState = {
  fetched: false,
  list: null
}

export const taskReducer = (state = defaultState, action) => {
  switch (action.type) {
    case actionTypes.getTaskSuccess:
      return { ...state, fetched: true,  list: action.payload  }
    default:
      return state
  }
}
