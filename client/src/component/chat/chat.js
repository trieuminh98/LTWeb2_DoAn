import React from "react";
import socketIOClient from "socket.io-client";

class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      content: ""
    };
  }

  onHandleChange = e => {
    let content = e.target.value;
    this.setState({ content });
  };

  //Khi vào trang tự động connect tới server socket
  //Thuật ngữ  là emit event
  //Server nhận 1 event từ 1 client nào đó => Server gửi lại event đó tới tất cả client
  componentDidMount() {
    const endpoint = 'http://localhost:5000';
    const socket = socketIOClient(endpoint);
    socket.on('RECEIVE_MESSAGE',data => {
      console.log("Nhận lại event receive message: ",data);
    })
    this.setState({socket})
  }

  onHandleSubmit = e => {
    let {content,socket} = this.state;
    socket.emit('SEND_MESSAGE',content);
    this.setState({
      content: ""
    });
  };

  render() {
    return (
      <React.Fragment>
        <div className="chat-contents" />
        <input
          type="text"
          value={this.state.content}
          onChange={this.onHandleChange}
        />
        <button onClick={this.onHandleSubmit}>OK</button>
      </React.Fragment>
    );
  }
}

export default Chat;
