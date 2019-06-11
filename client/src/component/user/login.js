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

  //Thay đổi dữ liệu state khi người dùng nhập
  onChangeInput = e => {
    let targetValue = e.target.value;
    let targetName = e.target.name;
    this.setState({
      [targetName]: targetValue
    });
  };

  componentDidMount(){
    this.props.clearSignAlert();
    const {currentUser} = this.props.usersReducer;
    if(currentUser){
      this.props.history.push('/index');
    }
  }

  componentDidUpdate() {
    const {currentUser} = this.props.usersReducer;
    if(currentUser){
      this.props.history.push('/index');
    }
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
        <div className="page-wrapper bg-dark p-t-100 p-b-50">
          <div className="wrapper wrapper--w900">
            <div className="card card-6">
              <div className="card-heading">
                <h2 className="title">Đăng nhập</h2>
              </div>
              <div className="card-body">
                <form method="POST">
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
                </form>
              </div>
              <div className="card-footer">
                {this.onRenderAlert()}
                <button
                  className="btn btn--radius-2 btn--blue-2"
                  type="submit"
                  onClick={this.onSubmitUser}
                >
                  Đăng nhập
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
