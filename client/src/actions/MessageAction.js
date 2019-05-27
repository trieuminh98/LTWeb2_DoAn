import * as types from "./../constants/ActionTypes";

const sendMessage = payload => {
  return {
    type: types.SEND_MESSAGE,
    payload
  };
};

const receiveMessage = payload => {
    return {
      type: types.RECEIVE_MESSAGE,
      payload
    };
  };

const messageAction = {
    sendMessage,
    receiveMessage
};

export default messageAction;
