import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

class Header extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      isLogged: false,
      fullName: "",
    }
  }

  render() {
    const currentUser = this.props.checkCurrentUser
    console.log(currentUser);
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
                      Đăng nhập
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/signup">
                      Đăng Ký
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
                    <Link className="nav-link" to="/login">
                      <span>{currentUser ? currentUser : '' }</span>
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

const mapStateToProps = (state) => {
  return {
    checkCurrentUser : state.checkCurrentUser
  }
}

export default connect(mapStateToProps, null)(Header);
