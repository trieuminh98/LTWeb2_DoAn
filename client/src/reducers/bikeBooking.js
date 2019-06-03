import * as types from "../constants/ActionTypes";

const initialState = {
  foundDriver: null,
  isDriving: false,
  guest: null,
  isPickedUp: false,
  pickedUp: false,
  isToGoal: false,
  toGoal: false,
  isPayed: false,
  payed: false
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
        isDriving: true
      };
    case types.RECEIVE_BOOKING_FAILURE:
      return {
        ...state,
        guest: null,
        isDriving: false
      };
    case types.PICKED_UP_REQUEST:
      return {
        ...state,
        isPickedUp: true
      };
    case types.PICKED_UP_SUCCESS:
      return {
        ...state,
        pickedUp: true
      };
    case types.TO_GOAL_REQUEST:
      return {
        ...state,
        isToGoal: true
      };
    case types.TO_GOAL_SUCCESS:
      return {
        ...state,
        toGoal: true
      };
    case types.PAYING_REQUEST:
      return {
        ...state,
        isPayed: true
      };
    case types.PAYING_SUCCESS:
      return {
        ...state,
        payed: true
      };
    default:
      return state;
  }
};

export default bikeBookingReducer;
