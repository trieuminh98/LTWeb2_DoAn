import * as types from "../constants/ActionTypes";

const initialState = {
  listDrivers: [],
  sumDay: null,
  sumMonth: null,
  allBookingDay : null,
  allBookingMonth : null,
};

//Trả state về reducer chính index.js/reducers
const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.CHECK_ALL_DRIVER_REQUEST:
      return {
        ...state
      };
    case types.CHECK_ALL_DRIVER_SUCCESS:
      return {
        ...state,
        listDrivers: action.data
      };
    case types.CHECK_ALL_DRIVER_FAILURE:
      return {
        ...state,
        err: action.err
      };
    case types.ACTIVE_REQUEST:
      return {
        ...state
      };
    case types.ACTIVE_SUCCESS:
      return {
        ...state
      };
    case types.ACTIVE_FAILURE:
      return {
        ...state,
        err: action.err
      };
    case types.STATISTICAL_REQUEST:
      return {
        ...state,
      };
    case types.STATISTICAL_SUCCESS:
      return {
        ...state,
        sumDay: action.data.sumDay,
        sumMonth: action.data.sumMonth,
        allBookingDay: action.data.allBookingDay,
        allBookingMonth: action.data.allBookingMonth,
      };
    case types.STATISTICAL_FAILURE:
      return {
        ...state,
        err: action.err
      };
    default:
      return state;
  }
};

export default userReducer;
