import * as types from "./../constants/ActionTypes";
import adminService from "../services/adminService.js";

//Action ở đây sẽ được View import vào
//Action gửi yêu cầu đăng ký tới server

const checkAllDriverRequest = () => {
  return dispatch => {
    adminService
      .checkAllDriver()
      .then(result => {
        let { status, data , mess } = result.data;
        console.log(result);
        if (status) {
          dispatch(checkAllDriverSuccess(data));
        } else {
          dispatch(checkAllDriverFailure(mess));
        }
      })
      .catch(err => {
        console.log("thất bại => ", err);
        dispatch(checkAllDriverFailure(err.toString()));
      });
  };
};

const checkAllDriverSuccess = data => {
  return {
    type: types.CHECK_ALL_DRIVER_SUCCESS,
    data
  };
};

const checkAllDriverFailure = err => {
  return {
    type: types.CHECK_ALL_DRIVER_FAILURE,
    err
  };
};

const activeRequest = driverEmail => {
    return dispatch => {
        adminService
        .activeRequest(driverEmail)
        .then(result => {
            const {status,data} = result.data;
            if(status){
                dispatch(activeSuccess());
                dispatch(checkAllDriverRequest())
         }
            else{
                dispatch(activeFailure(data));
            }
        })
        .catch(err => {
            console.log("thất bại => ", err);
            dispatch(activeFailure(err.toString()));
        })
    }
}

const activeSuccess = () => {
    return {
        type: types.ACTIVE_SUCCESS
    }
}

const activeFailure = err => {
    return {
        type: types.ACTIVE_FAILURE,
        err
    }
}



const adminAction = {
  checkAllDriverRequest,
  checkAllDriverSuccess,
  checkAllDriverFailure,
  activeRequest,
  activeSuccess,
  activeFailure
};

export default adminAction;
