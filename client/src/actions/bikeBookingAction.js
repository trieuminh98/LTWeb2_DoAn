import * as types from "./../constants/ActionTypes";
import userService from "./../services/userService";
import historyService from "./../services/historyService";

const findDriversRequest = (latLng) => {
    return {
        type: types.FIND_DRIVERS_REQUEST,
        latLng
    }
}

const closeLoadingForm = () => {
    return {
        type: types.CLOSE_LOADING_FORM,
    }
}

const findDriversSuccess = (driverMoneyInfo) => {
    return {
        type: types.FIND_DRIVERS_SUCCESS,
        driverMoneyInfo
    }
}

const findDriversFailure = () => {
    return {
        type: types.FIND_DRIVERS_FAILURE
        }
}

const receiBookingRequest = (guestInfo) => {
    return {
        type: types.RECEIVE_BOOKING_REQUEST,
        guestInfo
    }
}

const acceptBookingSuccess = (guestMoneyInfo) => {
    return {
        type: types.RECEIVE_BOOKING_SUCCESS,
        guestMoneyInfo
    }
}

const acceptBookingFailure = (guestInfo) => {
    console.log("guestInfo",guestInfo);
    return {
        type: types.RECEIVE_BOOKING_FAILURE,
        guestInfo
    }
}

const pickedUpRequest = (foundDriver) => {
    return {
        type: types.PICKED_UP_REQUEST,
        foundDriver
    }
}

const pickedUpSuccess = () => {
    return {
        type: types.PICKED_UP_SUCCESS,
    }
}

const toGoalRequest = (foundDriver) => {
    return {
        type: types.TO_GOAL_REQUEST,
        foundDriver
    }
}

const toGoalSuccess = () => {
    return {
        type: types.TO_GOAL_SUCCESS,
    }
}

const payingRequest = (guest) => {
    return {
        type: types.PAYING_REQUEST,
        guest
    }
}

const payingSuccess = () => {
    return {
        type: types.PAYING_SUCCESS,
    }
}

const completeByGuest = () =>{
    return {
        type: types.COMPLETE_BY_GUEST,
    }
}

const completeByDriver = (history) =>{
    return dispatch => {
        historyService.saveHistory(history)
            .then(result => {
                let {status} = result;
                if(status){
                    dispatch(saveHistorySuccess());
                }else{
                    dispatch(saveHistoryFailure());
                }
            })
            .catch(err => {
                dispatch(saveHistoryFailure());
            })
    }
}

const saveHistorySuccess = () => {
    return {
        type: types.SAVE_HISTORY_SUCCESS
    }
}

const saveHistoryFailure = () => {
    return {
        type: types.SAVE_HISTORY_FAILURE
    }
}

const bikeBookingAction = {
    findDriversRequest,
    findDriversSuccess,
    findDriversFailure,
    receiBookingRequest,
    acceptBookingSuccess,
    acceptBookingFailure,
    pickedUpRequest,
    pickedUpSuccess,
    toGoalRequest,
    toGoalSuccess,
    payingRequest,
    payingSuccess,
    completeByGuest,
    completeByDriver,
    saveHistorySuccess,
    saveHistoryFailure,
    closeLoadingForm
}

export default bikeBookingAction