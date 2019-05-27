//Socket handle
module.exports = function(io) {
  io.on("connection", client => {
    //nhận event từ 1 client
    client.on("SEND_MESSAGE", data => {
      //Bây giờ emit gửi lại event tới tất cả client còn lại.
      let id = client.id;
      let content = data;
      io.emit("RECEIVE_MESSAGE", { id, content });
    })
  });
};
