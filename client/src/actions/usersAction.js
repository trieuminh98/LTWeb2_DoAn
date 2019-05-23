import * as types from "./../constants/ActionTypes";
import userService from "./../services/userService";

//Action ở đây sẽ được View import vào

//Action kiểm tra currentUser
const checkCurrentUSer = () => {
  return {
    type: types.CHECK_CURRENT_USER
  };
};

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

const userAction = {
  checkCurrentUSer,
  signupRequest,
  signupSuccess,
  signupFailure
};

export default userAction;
