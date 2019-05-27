import { combineReducers } from "redux";
import usersReducer from "./users";
import messagesReducer from "./messages";

//Reducer chính chứa tất cả các reducer khác
const rootReducer = combineReducers({
  usersReducer,
  messagesReducer
});

export default rootReducer;
