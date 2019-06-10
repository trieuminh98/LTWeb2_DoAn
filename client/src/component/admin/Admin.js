import React from "react";
import "./../../cssWebpack/admin.css";
import ListDrivers from "./ListDrivers";
import { connect } from "react-redux";
import adminAction from "./../../actions/adminAction";
import Statistical from "./Statistical";
import DataPicker from "react-datepicker";

class Admin extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.checkAllDriverRequest();
  }

  ColorBlock = () => {
    let styles = {
      margin: "20px",
      width: "250px",
      height: "250px",
      backgroundColor: "yellow"
    };
  };

  render() {
    return (
      <React.Fragment>
        <ListDrivers />
        <br />
        <Statistical />
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    adminReducer: state.adminReducer
  };
};

const mapDispatchToProps = dispatch => {
  return {
    checkAllDriverRequest: () => dispatch(adminAction.checkAllDriverRequest())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Admin);
