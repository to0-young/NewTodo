import { configureStore } from "@reduxjs/toolkit";
import { createLogger } from 'redux-logger'
import actionTypes from "./actionTypes";

const logger = createLogger({
  collapsed: true,
});

const defaultState = {
  loading: false,
  fetched: false,
  details: null,
}

 const reducer = (state = defaultState, action) => {
   switch (action.type) {
     case actionTypes.getSessionSuccess:
       return { ...state, fetched: true, loading: false, details: action.payload }
     case actionTypes.getSessionError:
       return { ...state, fetched: true, loading: false, details: null }
     default:
       return state
   }
 }

 const store = configureStore({
   reducer: {
     session: reducer,
   },
   middleware: [logger]
 })

export  default store
