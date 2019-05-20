import { combineReducers } from 'redux';
import tasks from './task';

const myReducer = combineReducers({
    tasks
});

export default myReducer;