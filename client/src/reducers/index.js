import { combineReducers } from "redux";
import usersReducer from "./users";
import messagesReducer from "./messages";
import bikeBookingReducer from "./bikeBooking";
import adminReducer from "./admin";


//Reducer chính chứa tất cả các reducer khác
const rootReducer = combineReducers({
  usersReducer,
  messagesReducer,
  bikeBookingReducer,
  adminReducer,
});

export default rootReducer;
