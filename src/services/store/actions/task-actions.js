import actionTypes from '../action-types'

const taskActions = {
  fetchTasksSuccess: (payload) => ({ type: actionTypes.fetchTasksSuccess, payload }),
  deleteTaskSuccess: (id) => ({ type: actionTypes.deleteTaskSuccess, payload: { id } }),
  getTaskSuccess: (id) => ({ type: actionTypes.getTaskSuccess, payload: { id } }),
}
export default taskActions
