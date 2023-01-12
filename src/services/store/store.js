import { configureStore } from "@reduxjs/toolkit";
import { createLogger } from 'redux-logger'
import { sessionReducer } from '././reducers/session-reducer'
import {taskReducer} from "./reducers/task-reducer";

const logger = createLogger({
  collapsed: true,
});

 const store = configureStore({
   reducer: {
     session: sessionReducer,
     task: taskReducer
   },
   middleware: [logger]
 })

export  default store
