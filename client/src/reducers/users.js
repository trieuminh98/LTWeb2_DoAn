import * as types from "../constants/ActionTypes";

let currentUser = localStorage.getItem('user');
currentUser = JSON.parse(currentUser);
const initialState = {
  currentUser: currentUser ? currentUser : ''
}


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
      };
    case types.SIGNUP_FAILURE:
      return {
        alert: {
          status: false,
          data: action.err
        },
        state
      };
    case types.LOGIN_REQUEST:
      return state;
    case types.LOGIN_SUCCESS:
      return {
        ...state,
        currentUser : action.data,
        alert: {
          status: true,
          data: 'Login success'
        }
      }
    case types.LOGIN_FAILURE:
      return {
        ...state,
        alert: {
          status: false,
          data: action.err
        }
      }
    case types.CLEAR_SIGN_ALERT:
      return{
        ...state,
        alert : null
      }
    case types.CHECK_CURRENT_USER:
      return state;
    default:
      return state;
  }
};

export default userReducer;
