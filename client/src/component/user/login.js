import React from "react";
import Axios from "axios";
import service from "../../services/userService";
class Singup extends React.Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: ""
    };
  }

  //Click submit tạo json để gửi trả về server
  onSubmitUser = () => {
    console.log('hello');
    let { email, password } = this.state;
    let postData = {
      email,
      password
    };

    //gửi dữ liệu json trả về server
    service.login(postData).then(result =>{
      const token = result.data.token;
      if(token){
        localStorage.setItem("token",token);
      }
    })
    .catch(err => {
      console.log("err",err);
    })
    //Thay đổi dữ liệu state khi người dùng nhập vào
  };

  onChangeInput = e => {
    let targetValue = e.target.value;
    let targetName = e.target.name;
    this.setState({
      [targetName]: targetValue
    });
  };

  onSeeProfile = (e) => {
    service.getProfile()
      .then(result => {
        console.log("resu;t -> ",result);
      })
  }

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
                <br/>
                <button className="btn btn-success" onClick={this.onSubmitUser}>
                  Submit
                </button>

                <button className="btn btn-primary" onClick={this.onSeeProfile}>
                  Xem profile
                </button>

                button
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Singup;
