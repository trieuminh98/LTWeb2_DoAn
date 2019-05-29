import messageAction from "./../actions/MessageAction";
import userAction from "./../actions/usersAction";

//Chỉ 1 vài action đặc biệt cần socket mới gọi
//Mọi action sẽ đi qua đây,tích hợp socketio vào middleware,gửi về phía server
const middleware = socket => {
  return store => next => action => {
    switch (action.type) {
      case "SEND_MESSAGE":
        socket.emit(action.type, action.payload);
      case "SET_USER_ONLINE":
        socket.emit(action.type, action.userInfo);
      default:
        break;
    }
    next(action);
  };
};

//Nhận lại event từ phía server thông qua socket.on
const dispatcher = (socket, dispatchFn) => {
  socket.on("RECEIVE_MESSAGE", data => {
    dispatchFn(messageAction.receiveMessage(data));
  });


  socket.on("GET_ALL_DRIVER", drivers => {
    dispatchFn(userAction.getAllDrivers(drivers));  });
};

const socketManager = { middleware, dispatcher };
export default socketManager;
