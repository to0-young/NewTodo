import actionTypes from '../action-types'

const taskActions = {
  fetchTasksSuccess: (payload) => ({ type: actionTypes.fetchTasksSuccess, payload }),
  deleteTaskSuccess: (payload) => ({ type: actionTypes.deleteTaskSuccess, payload }),
  getTaskSuccess: (payload) => ({ type: actionTypes.getTaskSuccess, payload }),
  updateTaskSuccess: (payload) => ({ type: actionTypes.updateTaskSuccess, payload }),
}
export default taskActions
