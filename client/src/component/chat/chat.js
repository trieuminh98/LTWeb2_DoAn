import React from "react";
import { connect } from "react-redux";
import messageAction from "./../../actions/MessageAction";

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
  componentDidMount() {}

  onRenderMessages = () => {
    const {messages} = this.props.messageReducer;
    if(messages.length < 1 ){
      return null;
    }
    return messages.map((m,index) => {
      return <p key={index}>
        <span className="font-weigth-bold">{m.id}: </span>
        {m.content}
      </p>
    })
  }

  onHandleSubmit = e => {
    let { content } = this.state;
    this.props.sendMessage(content);
    this.setState({
      content: ""
    });
  };

  render() {
    return (
      <React.Fragment>
        <div className="chat-contents">
          {this.onRenderMessages()}
        </div>
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

const mapStateToProps = state => {
  return {
    messageReducer : state.messagesReducer
  }
}

const mapDispatchToProps = dispatch => {
  return{
    sendMessage: (params) => dispatch(messageAction.sendMessage(params))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Chat);
