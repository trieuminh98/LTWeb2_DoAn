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

  onSubmitUser = () => {
    let {email,password,fullName} = this.state;
    let postData = {
        email,
        password,
        fullName
      };

    Axios({
      method: "post",
      url: "http://localhost:5000/user/signup",
      data: postData,
      responseType: "json"
    }).then(result => console.log(result));
  };

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
        <div class="container">
          <div class="row">
            <div class="col-md-6">
              <h1>Đăng Ký</h1>
              <div class="form-group">
                <label>Email:</label>
                <input
                  value={this.state.email}
                  type="email"
                  class="form-control"
                  placeholder="Nhập email"
                  name="email"
                  onChange={this.onChangeInput}
                />
                <label>Mật Khẩu:</label>
                <input
                  value={this.state.password}
                  type="password"
                  class="form-control"
                  placeholder="Nhập mật khẩu"
                  name="password"
                  onChange={this.onChangeInput}
                />
                <label>Tên đầy đủ:</label>
                <input
                  value={this.state.fullName}
                  type="text"
                  class="form-control"
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
