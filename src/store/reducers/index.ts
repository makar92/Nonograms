import { combineReducers, createStore } from "redux";
import { isAdminReducer } from "./isAdminReduser";
import { log } from "console";
import { nonogramsReducer } from "./nonogramsReduser";
import { nonogramReducer } from "./nonogramReduser";

export const rootReducer = combineReducers({
  isAdminReducer,
  nonogramsReducer,
  nonogramReducer,
})

export type RootState = ReturnType<typeof rootReducer>
