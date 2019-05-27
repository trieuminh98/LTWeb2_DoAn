import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers";
import socketClient from "socket.io-client";
import socketManager from "./socket/socket";

const apiUrl = "http://localhost:5000";
const socket = socketClient(apiUrl);

const middleWare = [thunk, socketManager.middleware(socket)];

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(...middleWare))
);

socketManager.dispatcher(socket,store.dispatch);

export default store;
