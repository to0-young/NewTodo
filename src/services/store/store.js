import { configureStore } from "@reduxjs/toolkit";
import { createLogger } from 'redux-logger'

const logger = createLogger({
  collapsed: true,
});

const defaultState = {
  
 }

 const reducer = (state = defaultState, action) => {
   switch (action.type) {
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


 // case "ADD_CASH":
 //   return {...state, cash: state.cash + action.payload}
 // case "GET_CASE":
 //   return {...state, cash: state.cash - action.payload}