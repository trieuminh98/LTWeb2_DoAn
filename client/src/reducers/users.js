import * as types from "../constants/ActionTypes";

const CurrentUser = localStorage.getItem("email");
const initialState = CurrentUser ? CurrentUser : "";

//Trả state về reducer chính index.js/reducers 
const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SIGNUP_REQUEST:
      return state;
    case types.SIGNUP_SUCCESS:
      return {
        alert: {
          status: true,
          data: action.data
        },
        state
      }
    case types.SIGNUP_FAILURE:
      return {
        alert: {
          status: false,
          data: action.err
        },
        state
      }
    case types.CHECK_CURRENT_USER:
      return state;
    default:
      return state;
  }
};

export default userReducer;
