import messageAction from "./../actions/MessageAction";
import userAction from "./../actions/usersAction";
import bikeBookingAction from "./../actions/bikeBookingAction";

//Chỉ 1 vài action đặc biệt cần socket mới gọi
//Mọi action sẽ đi qua đây,tích hợp socketio vào middleware,gửi về phía server
const middleware = socket => {
  return store => next => action => {
    console.log("ACTION =? ",action);
    switch (action.type) {
      case "SEND_MESSAGE":
        socket.emit(action.type, action.payload);
        break;
      case "SET_USER_ONLINE":
        socket.emit(action.type, action.userInfo);
        break;
      case "FIND_DRIVERS_REQUEST":
        socket.emit(action.type, action.latLng);
        break;
      case "RECEIVE_BOOKING_SUCCESS":
        socket.emit(action.type, action.guestMoneyInfo);
        break;
      case "RECEIVE_BOOKING_FAILURE":
        console.log("AAAAAAAAAAAAAAAAAAa")
        socket.emit(action.type, action.guestInfo);
        break;
      case "PICKED_UP_REQUEST":
        socket.emit(action.type, action.foundDriver);
        break;
      case "TO_GOAL_REQUEST":
        socket.emit(action.type, action.foundDriver);
        break;
      case "PAYING_REQUEST":
        socket.emit(action.type, action.guest);
        break;
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
    dispatchFn(userAction.getAllDrivers(drivers));
  });

  socket.on("FIND_DRIVER_SUCCESS", driverMoneyInfo => {
    dispatchFn(bikeBookingAction.findDriversSuccess(driverMoneyInfo));
  });

  socket.on("FIND_DRIVERS_FAILURE", () => {
    dispatchFn(bikeBookingAction.findDriversFailure());
  });

  socket.on("RECEIVE_BOOKING_REQUEST", guestInfo => {
    dispatchFn(bikeBookingAction.receiBookingRequest(guestInfo));
  });

  socket.on("PICKED_UP_SUCCESS", () => {
    dispatchFn(bikeBookingAction.pickedUpSuccess());
  });

  socket.on("TO_GOAL_SUCCESS", () => {
    dispatchFn(bikeBookingAction.toGoalSuccess());
  });

  socket.on("PAYING_SUCCESS", () => {
    dispatchFn(bikeBookingAction.payingSuccess());
  });
};

const socketManager = { middleware, dispatcher };
export default socketManager;
