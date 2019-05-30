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

const bikeBookingAction = {
    findDriversRequest,
    findDriversSuccess,
    findDriversFailure
}

export default bikeBookingAction