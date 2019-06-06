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
  payed: false,
  money: null
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
        foundDriver: action.driverMoneyInfo.driver,
        loading: false,
        money: action.driverMoneyInfo.money
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
        guest: action.guestInfo.guestInfo,
        money: action.guestInfo.money
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
        isDriving: false,
        money: null
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
    case types.COMPLETE_BY_GUEST:
      return {
        ...state,
        foundDriver: null,
        isPickedUp: false,
        toGoal: false,
        payed: false,
        money: null
      };
    case types.COMPLETE_BY_DRIVER: 
      return state
    case types.SAVE_HISTORY_SUCCESS:
      return {
        ...state,
        isDriving: false,
        guest: null,
        pickedUp: false,
        isToGoal: false,
        isPayed: false,
        money: null
      };
    case types.SAVE_HISTORY_FAILURE:
      return {
        ...state,
        ...state,
        isDriving: false,
        guest: null,
        pickedUp: false,
        isToGoal: false,
        isPayed: false,
        money: null,
        err : "lỗi khi save lịch sử chuyến đi"
      };
    default:
      return state;
  }
};

export default bikeBookingReducer;
