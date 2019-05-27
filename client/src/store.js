import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers";
import socketClient from "socket.io-client";
import messageAction from "./actions/MessageAction";

const apiUrl = "http://localhost:5000";
const socket = socketClient(apiUrl);

//Chỉ 1 vài action đặc biệt cần socket mới gọi
//Mọi action sẽ đi qua đây,tích hợp socketio vào middleware,gửi về phía server
const socketMiddleware = store => next => action => {
  switch (action.type) {
    case "SEND_MESSAGE":
      socket.emit("SEND_MESSAGE", action.payload);
    default:
      break;
  }
  next(action);
};

//Nhận lại event từ phía server thông qua socket.on
socket.on("RECEIVE_MESSAGE", data => {
  store.dispatch(messageAction.receiveMessage(data));
});

const middleWare = [thunk, socketMiddleware];

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(...middleWare))
);

export default store;
