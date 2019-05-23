import React from "react";
import service from "../../services/userService";
import { connect } from "react-redux";
import usersAction from "./../../actions/usersAction";

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
    };
  }

  //Click submit tạo json để gửi trả về server
  onSubmitUser = () => {
    let { email, password } = this.state;
    let postData = {
      email,
      password
    };
    this.props.loginRequest(postData);
  };

  //Thay đổi dữ liệu state khi người dùng nhậ
  onChangeInput = e => {
    let targetValue = e.target.value;
    let targetName = e.target.name;
    this.setState({
      [targetName]: targetValue
    });
  };

  componentDidMount(){
    this.props.clearSignAlert();
  }

  //Kiểm tra alert trong userReducer để lấy trạng thái
  onRenderAlert = () => {
    const { alert } = this.props.usersReducer;
    if (alert) {
      let className = alert.status ? "text-success" : "text-danger";
      return <p className={className}> {alert.data} </p>;
    } else {
      return null;
    }
  };

  onSeeProfile = e => {
    service.getProfile().then(result => {
      console.log("result -> ", result);
    });
  };

  render() {
    return (
      <React.Fragment>
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <h1>Đăng Nhập</h1>
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
                <br />
                {this.onRenderAlert()}
                <br />
                <button className="btn btn-success" onClick={this.onSubmitUser}>
                  Đăng nhập
                </button>
                <button className="btn btn-primary" onClick={this.onSeeProfile}>
                  Xem profile
                </button>
                <br />
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    usersReducer: state.usersReducer
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loginRequest: param => dispatch(usersAction.loginRequest(param)),
    clearSignAlert : () => dispatch(usersAction.clearSignAlert())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
