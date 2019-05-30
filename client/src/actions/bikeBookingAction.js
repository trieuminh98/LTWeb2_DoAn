import * as types from "./../constants/ActionTypes";
import userService from "./../services/userService";

const findDriversRequest = (latLng) => {
    return {
        type: types.FIND_DRIVERS_REQUEST,
        latLng
    }
}

const findDriversSuccess = (driver) => {
    return {
        type: types.FIND_DRIVERS_SUCCESS,
        driver
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

const acceptBookingSuccess = (guestInfo) => {
    return {
        type: types.RECEIVE_BOOKING_SUCCESS,
        guestInfo
    }
}

const acceptBookingFailure = (guestInfo) => {
    return {
        type: types.RECEIVE_BOOKING_FAILURE,
        guestInfo
    }
}

const bikeBookingAction = {
    findDriversRequest,
    findDriversSuccess,
    findDriversFailure,
    receiBookingRequest,
    acceptBookingSuccess,
    acceptBookingFailure
}

export default bikeBookingAction