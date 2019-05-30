import * as types from "./../constants/ActionTypes";
import userService from "./../services/userService";

//Action ở đây sẽ được View import vào
//Action gửi yêu cầu đăng ký tới server
const signupRequest = ({ fullName, email, password }) => {
  return dispatch => {
    userService
      .signup({ fullName, email, password })
      .then(result => {
        let { status, data } = result.data;
        if (status) {
          dispatch(signupSuccess(data));
        } else {
          dispatch(signupFailure(data));
        }
      })
      .catch(err => {
        console.log("thất bại => ", err);
        dispatch(signupFailure(err.toString()));
      });
  };
};

//Action khi yêu cầu đăng ký thành công => gửi trả dữ liệu
const signupSuccess = data => {
  return {
    type: types.SIGNUP_SUCCESS,
    data
  };
};

//Action khi yêu cầu đăng ký thất bại => gửi lỗi về
const signupFailure = err => {
  return {
    type: types.SIGNUP_FAILURE,
    err
  };
};

//Action gửi yêu cầu đăng ký tới server
const loginRequest = ({email, password }) => {
  return dispatch => {
    userService.login({email,password})
      .then(result => {
        let { data, status, token} = result.data;
        if(status){
          let user = {
            fullName: data.fullName,
            role: data.role,
            email
          }
          localStorage.setItem('token',token);
          localStorage.setItem('user',JSON.stringify(user))
          dispatch(loginSuccess(user));
        }else{
          dispatch(loginFailure(data));
        }
      })
      .catch(err => {
        dispatch(loginFailure(err.toString()));
      })
  }
};

//Action khi yêu cầu đăng ký thành công => gửi trả dữ liệu
const loginSuccess = data => {
  return {
    type: types.LOGIN_SUCCESS,
    data
  };
};

//Action khi yêu cầu đăng ký thất bại => gửi lỗi về
const loginFailure = err => {
  return {
    type: types.LOGIN_FAILURE,
    err
  };
};

const logOut = () => {
  return {
    type: types.LOG_OUT,
  };
};

const clearSignAlert = () => {
  return {
    type: types.CLEAR_SIGN_ALERT
  };
};

const setUserOnline = (userInfo) => {
  return {
    type: types.SET_USER_ONLINE,
    userInfo
  }
}

const getAllDrivers = (drivers) => {
  return {
    type: types.GET_ALL_DRIVER,
    drivers
  }
}

const userAction = {
  signupRequest,
  signupSuccess,
  signupFailure,
  loginRequest,
  loginSuccess,
  loginFailure,
  clearSignAlert,
  setUserOnline,
  getAllDrivers,
  logOut,
};


export default userAction;
