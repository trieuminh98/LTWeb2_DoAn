import * as types from "../constants/ActionTypes";

const initialState = {
    foundDriver : null
};

//Trả state về reducer chính index.js/reducers
const bikeBookingReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.FIND_DRIVERS_SUCCESS:
      return {
        ...state,
        foundDriver: action.driver
      };
    case types.FIND_DRIVERS_SUCCESS:
      return {
        error : "No driver for you",
        ...state
      };
    default:
      return state;
  }
};

export default bikeBookingReducer;
