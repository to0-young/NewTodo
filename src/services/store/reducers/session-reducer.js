import actionTypes from "../action-types";

const defaultState = {
  loading: false,
  fetched: false,
  details: null,
}

export const sessionReducer = (state = defaultState, action) => {
  switch (action.type) {
    case actionTypes.getSessionSuccess:
      return { ...state, fetched: true, loading: false, details: action.payload }
    case actionTypes.getSessionError:
      return { ...state, fetched: true, loading: false, details: null }
    case actionTypes.deleteSessionSuccess:
      return { ...state, fetched: true, loading: false, details: null }
    default:
      return state
  }
}
