import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import userAction from "../../actions/usersAction";

class Header extends React.Component {
  constructor(props){
    super(props);
  }

  logOut = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    this.props.logOut();
  }
    
  render() {
    const {currentUser} = this.props.userReducers;
    const token = localStorage.getItem("token");
    return (
      <React.Fragment>
        <div className="row bg-light">
          <div className="col-md-8">
            <nav className="navbar navbar-expand-lg navbar-light">
              <span>MMLBike</span>
              <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                  <li className="nav-item">
                    <Link className="nav-link" to="/login">
                      {currentUser ? '' : 'Đăng nhập'}
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/signup">
                    {currentUser ? '' : 'Đăng ký'}
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/map">
                      Bản Đồ
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/chat">
                      Nhắn tin
                    </Link>
                  </li>
                </ul>
              </div>
            </nav>
          </div>
          <div className="col-md-4">
          <nav className="navbar navbar-expand-lg navbar-light">
                <ul className="navbar-nav">
                  <li className="nav-item">
                    <Link className="nav-link">
                      <span>{currentUser ? currentUser.fullName : '' }</span>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/login" onClick={(e)=>{this.logOut()}}>
                    <span>{currentUser ? "Log out" : '' }</span>
                    </Link>
                  </li>
                </ul>
            </nav>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    userReducers : state.usersReducer
  }
}

const mapDispatchToProps = dispatch => {
  return {
    logOut : () => dispatch(userAction.logOut())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
