//Socket handle
module.exports = function(io) {
  let connectedUser = [
    {
      username: "fakeDriver01",
      fullName: "fakerDriver01",
      latLng: {
        lat: 10.786404,
        lng: 106.680871
      },
      role: "driver"
    },
    {
      username: "fakeDriver02",
      fullName: "fakerDriver02",
      latLng: {
        lat: 10.8346,
        lng: 106.66377
      },
      role: "driver"
    }
  ];
  let getAllDrivers = function(connectedUser) {
    return connectedUser.filter(u => u.role === "driver");
  };

  io.on("connection", client => {
    //nhận event từ 1 client
    client.on("SEND_MESSAGE", data => {
      //Bây giờ emit gửi lại event tới tất cả client còn lại.
      let id = client.id;
      let content = data;
      io.emit("RECEIVE_MESSAGE", { id, content });
    });

    client.on("SET_USER_ONLINE", data => {
      //Thêm những user đang online và mảng connectedUser
      let userInfo = {
        clientid: client.id,
        ...data
      };
      //Kiểm tra trùng
      connectedUser = connectedUser.filter(u => {
        return u.username !== data.username;
      });

      //Danh sách những user và tài xế đang online
      connectedUser.push(userInfo);
      //Danh sách những tài xế đang online
      let allDrivers = getAllDrivers(connectedUser);

      //Nếu người đăng nhập online là user thì gửi toàn bộ tài xế qua cho user thấy
      if (userInfo.role === "user") {
        let allDrivers = getAllDrivers(connectedUser);
        io.emit("GET_ALL_DRIVER", allDrivers);
      }
      //Nếu là driver thì tìm toàn bộ thông tin user và emit tới cho họ biết mình online
      else {
        for (let u of connectedUser) {
          if (typeof u.clientid !== "undefined" && u.role === "user") {
            io.to(u.clientid).emit("GET_ALL_DRIVER", allDrivers);
          }
        }
      }
    });

    client.on("disconnect", () => {
      connectedUser = connectedUser.filter(u => {
        return u.clientid != client.id;
      });
      let allDrivers = getAllDrivers(connectedUser);
      for (let u of connectedUser) {
        if (typeof u.clientid !== "undefined" && u.role === "user") {
          io.to(u.clientid).emit("GET_ALL_DRIVER", allDrivers);
        }
      }
    });
  });
};
