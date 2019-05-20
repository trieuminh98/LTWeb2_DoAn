import { combineReducers } from 'redux';
import checkCurrentUser from './users';

const myReducer = combineReducers({
    checkCurrentUser
});

export default myReducer;