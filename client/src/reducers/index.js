import { combineReducers } from "redux";
import usersReducer from "./users";

//Reducer chính chứa tất cả các reducer khác
const rootReducer = combineReducers({
  usersReducer
});

export default rootReducer;
