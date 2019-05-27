import * as types from "../constants/ActionTypes";

const initialState = {
    messages: []
  }
//Trả state về reducer chính index.js/reducers
const messagesReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.RECEIVE_MESSAGE:
        let newMessage = state.messages.push(action.payload);
      return { 
          messages: newMessage,
          ...state 
    };
    default:
      return state;
  }
};

export default messagesReducer;
