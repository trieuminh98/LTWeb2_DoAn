import * as types from '../constants/ActionTypes';

var CurrentUser = localStorage.getItem('email');
var initialState = CurrentUser ? CurrentUser : "";

var myReducer = (state = initialState, action) => {
    switch(action.type){
        case types.CHECK_CURRENT_USER:
            return state;
        default:
            return state;
    }
};

export default myReducer;