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
    },
    {
      username: "fakeDriver03",
      fullName: "fakerDriver03",
      latLng: {
        lat: 20.86318,
        lng: 106.68019
      },
      role: "driver"
    },
    {
      username: "fakeDriver04",
      fullName: "fakerDriver04",
      latLng: {
        lat: 21.02828,
        lng: 105.85388
      },
      role: "driver"
    }
  ];

  //Hàm công thức tính khoảng cách giữa 2 lat long
  //Tham khảo tại https://www.geodatasource.com/developers/javascript
  let distance = (lat1, lon1, lat2, lon2, unit) => {
    if (lat1 == lat2 && lon1 == lon2) {
      return 0;
    } else {
      var radlat1 = (Math.PI * lat1) / 180;
      var radlat2 = (Math.PI * lat2) / 180;
      var theta = lon1 - lon2;
      var radtheta = (Math.PI * theta) / 180;
      var dist =
        Math.sin(radlat1) * Math.sin(radlat2) +
        Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
      if (dist > 1) {
        dist = 1;
      }
      dist = Math.acos(dist);
      dist = (dist * 180) / Math.PI;
      dist = dist * 60 * 1.1515;
      if (unit == "K") {
        dist = dist * 1.609344;
      }
      if (unit == "N") {
        dist = dist * 0.8684;
      }
      return dist;
    }
  };

  //Hàm lấy toàn bộ những ai là tài xế
  let getAllDrivers = function(connectedUser) {
    return connectedUser.filter(u => u.role === "driver");
  };

  io.on("connection", client => {
    //nhận event từ 1 client rồi emit gửi lại event tới tất cả client còn lại.
    client.on("SEND_MESSAGE", data => {
      let id = client.id;
      let content = data;
      io.emit("RECEIVE_MESSAGE", { id, content });
    });

    //Thêm những user đang online và mảng connectedUser
    client.on("SET_USER_ONLINE", data => {
      if (data) {
        let userInfo = {
          clientid: client.id,
          ...data
        };
        //Kiểm tra trùng
        connectedUser = connectedUser.filter(u => {
          return u.username !== data.username;
        });

        //Thêm danh sách những user và tài xế đang online
        connectedUser.push(userInfo);

        //Lấy danh sách những tài xế đang online
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
      }
      console.log("Nhung user dang online => ", connectedUser);
    });

    client.on("FIND_DRIVERS_REQUEST", latLng => {
      if (latLng && latLng !== "undefined") {
        //Nếu không có tài xế nào thì tính là khách hàng đó request fail
        let allDrivers = getAllDrivers(connectedUser);
        console.log("AllDrivers", allDrivers);
        console.log("ConnectedUser", connectedUser);
        if (allDrivers.length <= 0) {
          client.emit("FIND_DRIVERS_FAILURE");
          return null;
        } else {
          //Tìm tài xế gần nhất với user
          let sortDrivers = allDrivers.sort((driver1, driver2) => {
            let userLat = latLng.lat;
            let userLng = latLng.lng;

            let driver1Lat = driver1.latLng.lat;
            let driver1Lng = driver1.latLng.lng;

            let driver2Lat = driver2.latLng.lat;
            let driver2Lng = driver2.latLng.lng;

            let rangeDriver1 = distance(
              userLat,
              userLng,
              driver1Lat,
              driver1Lng,
              "K"
            );
            let rangeDriver2 = distance(
              userLat,
              userLng,
              driver2Lat,
              driver2Lng,
              "K"
            );

            return rangeDriver1 - rangeDriver2;
          });
          //Tối thiểu 1 tài xế
          if (sortDrivers.length > 1) {
            //Gửi event booking tới tài xế
            let driver01Info = sortDrivers[0];
            if (driver01Info) {
              let userLat = latLng.lat;
              let userLng = latLng.lng;
              let guestInfo = connectedUser.find(
                u => u.latLng.lat === userLat && u.latLng.lng === userLng
              );
              io.to(driver01Info.clientid).emit(
                "RECEIVE_BOOKING_REQUEST",
                guestInfo
              );
            }
            // io.to(sortDrivers[0].clientid).emit('RECEIVE_BOOKING_REQUEST')
            return sortDrivers[0];
          }
          //Nếu không có tài xế nào thì tính là khách hàng đó request fail
          else {
            client.emit("FIND_DRIVERS_FAILURE");
            return null;
          }
        }
      }
    });

    client.on("RECEIVE_BOOKING_SUCCESS", guestInfo => {
      let driver = getAllDrivers(connectedUser).find(u => u.clientid === client.id);
      if(guestInfo && guestInfo.clientid !== null && typeof guestInfo.clientid !== 'undefined'){
        let guestClientId = guestInfo.clientid;
        io.to(guestClientId).emit("FIND_DRIVER_SUCCESS",driver);
      }
    });

    client.on("RECEIVE_BOOKING_FAILURE", guestInfo => {
      let guestClientId = guestInfo.clientid;
      io.to(guestClientId).emit("FIND_DRIVER_FAILURE");
    });

    client.on("PICKED_UP_REQUEST", foundDriver => {
      let driverInfo = foundDriver;
      if(driverInfo && driverInfo.clientid !== null && typeof driverInfo.clientid !== 'undefined'){
        let driverClientId = driverInfo.clientid;
        console.log("thông tin tài xế client in",driverInfo);
        io.to(driverClientId).emit("PICKED_UP_SUCCESS");
      }
    })

    client.on("TO_GOAL_REQUEST", foundDriver => {
      let driverInfo = foundDriver;
      if(driverInfo && driverInfo.clientid !== null && typeof driverInfo.clientid !== 'undefined'){
        let driverClientId = driverInfo.clientid;
        io.to(driverClientId).emit("TO_GOAL_SUCCESS");
      }
    })

    client.on("PAYING_REQUEST", guest => {
      let guestInfo = guest;
      if(guestInfo && guestInfo.clientid !== null && typeof guestInfo.clientid !== 'undefined'){
        let guestClientId = guestInfo.clientid;
        io.to(guestClientId).emit("PAYING_SUCCESS");
      }
    })

    //Kiểm tra thoát kết nối
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
