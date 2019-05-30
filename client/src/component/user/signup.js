import React from "react";
import { Redirect } from "react-router";
import { connect } from "react-redux";
import usersAction from "./../../actions/usersAction";
class Signup extends React.Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      fullName: ""
    };
  }

  //Click submit gọi tới usersAction signupRequest
  onSubmitUser = () => {
    let { email, password, fullName } = this.state;
    let postData = {
      email,
      password,
      fullName
    };
    this.props.signupRequest(postData);
  };

  componentDidUpdate() {
    const {alert} = this.props.usersReducer;
    if(alert){
      this.props.history.push('/login');
    }
  }

  componentDidMount(){
    this.props.clearSignAlert();
    const {currentUser} = this.props.usersReducer;
    if(currentUser){
      this.props.history.push('/index');
    }
  }
  //Thay đổi dữ liệu state khi người dùng nhập vào
  onChangeInput = e => {
    let targetValue = e.target.value;
    let targetName = e.target.name;
    this.setState({
      [targetName]: targetValue
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

  render() {
    console.log("render ");
    return (
      <React.Fragment>
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <h1> Đăng Ký </h1>{" "}
              <div className="form-group">
                <label> Email: </label>{" "}
                <input
                  value={this.state.email}
                  type="email"
                  className="form-control"
                  placeholder="Nhập email"
                  name="email"
                  onChange={this.onChangeInput}
                />{" "}
                <label> Mật Khẩu: </label>{" "}
                <input
                  value={this.state.password}
                  type="password"
                  className="form-control"
                  placeholder="Nhập mật khẩu"
                  name="password"
                  onChange={this.onChangeInput}
                />{" "}
                <label> Tên đầy đủ: </label>{" "}
                <input
                  value={this.state.fullName}
                  type="text"
                  className="form-control"
                  placeholder="Nhập tên đầy đủ"
                  name="fullName"
                  onChange={this.onChangeInput}
                />{" "}
                <br /> {this.onRenderAlert()} <br />
                <button className="btn btn-success" onClick={this.onSubmitUser}>
                  Submit{" "}
                </button>{" "}
              </div>{" "}
            </div>{" "}
          </div>{" "}
        </div>{" "}
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
    clearSignAlert : () => dispatch(usersAction.clearSignAlert())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Signup);
