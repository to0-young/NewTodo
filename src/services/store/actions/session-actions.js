import actionTypes from "../action-types";

const sessionActions = {
  getSessionSuccess: (payload) => ({ type: actionTypes.getSessionSuccess, payload }),
  getSessionError: () => ({ type: actionTypes.getSessionError }),
  deleteSessionSuccess: () => ({ type: actionTypes.deleteSessionSuccess }),
}
export default sessionActions
