import sessionActions from "./actions/session-actions";
import taskActions from "./actions/task-actions";

const actionCreator = {
  ...sessionActions,
  ...taskActions
}

export default actionCreator