import * as types from "../constants/ActionTypes";

const initialState = {
  foundDriver: null,
  isDriving : false,
  guest : null,
};

//Trả state về reducer chính index.js/reducers
const bikeBookingReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.FIND_DRIVERS_REQUEST:
      return {
        ...state,
        loading: true
      };
    case types.FIND_DRIVERS_SUCCESS:
      return {
        ...state,
        foundDriver: action.driver,
        loading: false
      };
    case types.FIND_DRIVERS_FAILURE:
      return {
        ...state,
        error: "No driver for you",
        loading: false
      };
    case types.RECEIVE_BOOKING_REQUEST:
      return {
        ...state,
        guest: action.guestInfo
      };
    case types.RECEIVE_BOOKING_SUCCESS:
      return {
        ...state,
        isDriving : true,
      };
    case types.RECEIVE_BOOKING_FAILURE:
      return {
        ...state,
        guest: null,
        isDriving : false
      };
    default:
      return state;
  }
};

export default bikeBookingReducer;
