import React from "react";
import "./../../cssWebpack/admin.css";
import ListDrivers from "./ListDrivers";

class Admin extends React.Component {
  render() {
    return (
      <React.Fragment>
          <ListDrivers/>
      </React.Fragment>
    );
  }
}

export default Admin;
