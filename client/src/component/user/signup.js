import React from "react";
import Axios from "axios";
class Singup extends React.Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      fullName: ""
    };
  }

  //Click submit tạo json để gửi trả về server
  onSubmitUser = () => {
    let {email,password,fullName} = this.state;
    let postData = {
        email,
        password,
        fullName
      };

  //gửi dữ liệu json trả về server
    Axios({
      method: "post",
      url: "http://localhost:5000/user/signup",
      data: postData,
      responseType: "json"
    }).then(result => console.log(result));
  };

  //Thay đổi dữ liệu state khi người dùng nhập vào
  onChangeInput = e => {
    let targetValue = e.target.value;
    let targetName = e.target.name;
    this.setState({
      [targetName]: targetValue
    });
  };

  render() {
    return (
      <React.Fragment>
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <h1>Đăng Ký</h1>
              <div className="form-group">
                <label>Email:</label>
                <input
                  value={this.state.email}
                  type="email"
                  className="form-control"
                  placeholder="Nhập email"
                  name="email"
                  onChange={this.onChangeInput}
                />
                <label>Mật Khẩu:</label>
                <input
                  value={this.state.password}
                  type="password"
                  className="form-control"
                  placeholder="Nhập mật khẩu"
                  name="password"
                  onChange={this.onChangeInput}
                />
                <label>Tên đầy đủ:</label>
                <input
                  value={this.state.fullName}
                  type="text"
                  className="form-control"
                  placeholder="Nhập tên đầy đủ"
                  name="fullName"
                  onChange={this.onChangeInput}
                />
                <button className="btn btn-success" onClick={this.onSubmitUser}>
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Singup;
