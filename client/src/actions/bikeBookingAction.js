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
    payingSuccess
}

export default bikeBookingAction