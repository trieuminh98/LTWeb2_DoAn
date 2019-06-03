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
        ...state,
        alert: {
          status: true,
          data: action.data
        },
      };
    case types.SIGNUP_FAILURE:
      return {
        ...state,
        alert: {
          status: false,
          data: action.err
        },
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
    case types.GET_ALL_DRIVER:
      console.log(action);
      return {
        ...state,
        drivers: action.drivers
      }
    case types.LOG_OUT:
      return {
        ...state,
        currentUser : null
      };
    default:
      return state;
  }
};

export default userReducer;
