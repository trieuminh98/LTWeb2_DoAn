//import thư viện
import React from "react";
import { Redirect } from "react-router";
import { connect } from "react-redux";
import usersAction from "./../../actions/usersAction";

//import css
import "./../../cssWebpack/signup.css";

class Signup extends React.Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      fullName: "",
      number: "",
      role: "",
      filePortrait: null,
      fileLicense: null
    };
  }

  //Click submit gọi tới usersAction signupRequest
  onSubmitUser = () => {
    let { email, password, fullName, number, role } = this.state;
    if (role == "user") {
      const fdData = new FormData();
      fdData.append("email", email);
      fdData.append("number", number);
      fdData.append("password", password);
      fdData.append("role", role);
      fdData.append("fullName", fullName);
      this.props.signupRequest(fdData);
    } else {
      const fdData = new FormData();
      fdData.append(
        "imgs",
        this.state.filePortrait,
        this.state.filePortrait.name
      );
      fdData.append(
        "imgs",
        this.state.fileLicense,
        this.state.fileLicense.name
      );
      fdData.append("email", email);
      fdData.append("number", number);
      fdData.append("password", password);
      fdData.append("role", role);
      fdData.append("fullName", fullName);
      this.props.signupRequest(fdData);
    }
  };

  componentDidUpdate() {
    const { alert } = this.props.usersReducer;
    const {role } = this.state.role;
    if (alert) {
      this.props.history.push("/login");
    }
    if(role == "user"){
      this.setState({
        filePortrait: null,
        fileLicense: null
      })
    }
  }

  componentDidMount() {
    this.props.clearSignAlert();
    const { currentUser } = this.props.usersReducer;
    if (currentUser) {
      this.props.history.push("/index");
    }
  }
  //Thay đổi dữ liệu state khi người dùng nhập vào
  onChangeInput = e => {
    let targetValue = e.target.value;
    let targetName = e.target.name;
    if(targetName == 'role'){
      if(targetValue == 'user'){
        this.setState({
          [targetName]: targetValue,
          fileLicense : null,
          filePortrait: null
        });
      }else{
        this.setState({
          [targetName]: targetValue
        });
      }
    }else{
      this.setState({
        [targetName]: targetValue
      });
    }
  };

  onChangeHandlerPortrait = event => {
    this.setState({
      filePortrait: event.target.files[0]
    });
  };

  onChangeHandlerLicense = event => {
    this.setState({
      fileLicense: event.target.files[0]
    });
  };

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

  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to="/app" />;
    }
  };

  onRenderInputFile = () => {
    if (this.state.role === "driver") {
      return (
        <div>
          <div className="form-row">
            <div className="name">Chân dung</div>
            <div className="value">
              <div className="input-group js-input-file">
                <input
                  className="input-file"
                  type="file"
                  name="filePortrait"
                  id="filePortrait"
                  onChange={this.onChangeHandlerPortrait}
                />
                <label className="label--file" htmlFor="filePortrait">
                  Choose file
                </label>
                <span className="input-file__info">
                  {this.state.filePortrait
                    ? this.state.filePortrait.name
                    : "No file chosen"}
                </span>
              </div>
            </div>
          </div>
          <div className="form-row">
            <div className="name">Biển số xe</div>
            <div className="value">
              <div className="input-group js-input-file">
                <input
                  className="input-file"
                  type="file"
                  name="fileLicense"
                  id="fileLicense"
                  onChange={this.onChangeHandlerLicense}
                />
                <label className="label--file" htmlFor="fileLicense">
                  Choose file
                </label>
                <span className="input-file__info">
                  {this.state.fileLicense
                    ? this.state.fileLicense.name
                    : "No file chosen"}
                </span>
              </div>
            </div>
          </div>
        </div>
      );
    }
  };

  render() {
    return (
      <React.Fragment>
        <div className="page-wrapper bg-dark p-t-100 p-b-50">
          <div className="wrapper wrapper--w900">
            <div className="card card-6">
              <div className="card-heading">
                <h2 className="title">Đăng ký thành viên</h2>
              </div>
              <div className="card-body">
                <form method="POST">
                  <div className="form-row">
                    <div className="name">Tên đầy đủ:</div>
                    <div className="value">
                      <input
                        value={this.state.fullName}
                        className="input--style-6"
                        type="text"
                        name="fullName"
                        onChange={this.onChangeInput}
                      />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="name">Địa chỉ email: </div>
                    <div className="value">
                      <div className="input-group">
                        <input
                          value={this.state.email}
                          className="input--style-6"
                          type="email"
                          name="email"
                          placeholder="vidu@email.com"
                          onChange={this.onChangeInput}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="name">Mật khẩu</div>
                    <div className="value">
                      <div className="input-group">
                        <input
                          className="input--style-6"
                          name="password"
                          placeholder="Nhập mật khẩu"
                          value={this.state.password}
                          type="password"
                          onChange={this.onChangeInput}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="name">Số điện thoại:</div>
                    <div className="value">
                      <input
                        value={this.state.number}
                        className="input--style-6"
                        type="text"
                        name="number"
                        onChange={this.onChangeInput}
                      />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-check">
                      <label className="form-check-label">Người dùng</label>
                      <input
                        type="radio"
                        className="form-check-input"
                        name="role"
                        value="user"
                        onChange={this.onChangeInput}
                      />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-check">
                      <label className="form-check-label">Tài xế</label>
                      <input
                        type="radio"
                        className="form-check-input"
                        name="role"
                        value="driver"
                        onChange={this.onChangeInput}
                      />
                    </div>
                  </div>
                  {this.onRenderInputFile()};
                </form>
              </div>
              <div className="card-footer">
                <button
                  className="btn btn--radius-2 btn--blue-2"
                  type="submit"
                  onClick={this.onSubmitUser}
                >
                  Đăng ký
                </button>
              </div>
            </div>
          </div>
        </div>
        ); } });
      </React.Fragment>
    );
  }
}

//Lấy state của userReducer từ store
const mapStateToProps = state => {
  return {
    usersReducer: state.usersReducer
  };
};

const mapDispatchToProps = dispatch => {
  return {
    signupRequest: param => dispatch(usersAction.signupRequest(param)),
    clearSignAlert: () => dispatch(usersAction.clearSignAlert())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Signup);
