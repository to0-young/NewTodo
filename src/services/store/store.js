import { configureStore } from "@reduxjs/toolkit";
import { createLogger } from 'redux-logger'
import { sessionReducer } from '././reducers/session-reducer'

const logger = createLogger({
  collapsed: true,
});

 const store = configureStore({
   reducer: {
     session: sessionReducer,
   },
   middleware: [logger]
 })

export  default store
