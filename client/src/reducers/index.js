import { combineReducers } from "redux";
import usersReducer from "./users";
import messagesReducer from "./messages";
import bikeBookingReducer from "./bikeBooking";


//Reducer chính chứa tất cả các reducer khác
const rootReducer = combineReducers({
  usersReducer,
  messagesReducer,
  bikeBookingReducer
});

export default rootReducer;
