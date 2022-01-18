import { combineReducers } from "redux";
import UsersReducer, { initialState } from "./users";

export interface rootState {
  users: initialState;
}

const rootReducer = combineReducers({
  users: UsersReducer,
});

export default rootReducer;
