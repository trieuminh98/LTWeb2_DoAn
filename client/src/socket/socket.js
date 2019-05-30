import messageAction from "./../actions/MessageAction";
import userAction from "./../actions/usersAction";
import bikeBookingAction from "./../actions/bikeBookingAction";

//Chỉ 1 vài action đặc biệt cần socket mới gọi
//Mọi action sẽ đi qua đây,tích hợp socketio vào middleware,gửi về phía server
const middleware = socket => {
  return store => next => action => {
    switch (action.type) {
      case "SEND_MESSAGE":
        socket.emit(action.type, action.payload);
      case "SET_USER_ONLINE":
        socket.emit(action.type, action.userInfo);
      case "FIND_DRIVERS_REQUEST":
        socket.emit(action.type,action.latLng);
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

  socket.on("FIND_DRIVERS_RESULT",driver => {
    if(driver && typeof driver !== 'undefined'){
      dispatchFn(bikeBookingAction.findDriversSuccess(driver))
    }else{
      dispatchFn(bikeBookingAction.findDriversFailure(driver))
    }
  })
};

const socketManager = { middleware, dispatcher };
export default socketManager;
