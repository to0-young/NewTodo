import actionTypes from "../action-types";

const taskActions = {
  getTaskSuccess: (payload) => ({ type: actionTypes.getTaskSuccess, payload }),
  deleteTaskSuccess: (id) => ({ type: actionTypes.deleteTaskSuccess, payload: { id } }),
}
export default taskActions
