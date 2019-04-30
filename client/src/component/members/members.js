import React from 'react';
import './members.css';

class Members extends React.Component {

    render(){
        var { fullName } = this.props //Kiểu ES6,hoặc var members = this.props.members ; Nhận biến truyền từ component cha
      return (
        <div>
          <h1>{fullName}</h1>
        </div>
      );
    }
  }

export default Members;
