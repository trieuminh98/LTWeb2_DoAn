import React from "react";
import { connect } from "react-redux";
import adminAction from "../../actions/adminAction";
import DatePicker from "react-datepicker";
import logo from "./../../icon/coin-us-dollar-icon.png";
import "react-datepicker/dist/react-datepicker.css";

class Statistical extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: new Date()
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    let dateInfo = {
      dateInfo: new Date(this.state.startDate)
    };
    this.props.statisticalRequest(dateInfo);
  }

  Header = index => {
    if (index === 1) {
      return (
        <img
          src="http://cdn.onlinewebfonts.com/svg/img_518831.png"
          alt="Logo"
          width="50px"
          height="50px"
        />
      );
    }
    if (index === 2) {
      return (
        <img
          src="https://img.icons8.com/metro/420/money-bag.png"
          alt="Logo"
          width="50px"
          height="50px"
        />
      );
    }
    if (index === 3) {
      return (
        <img
          src="http://cdn.onlinewebfonts.com/svg/img_7450.png"
          alt="Logo"
          width="50px"
          height="50px"
        />
      );
    }
    if (index === 4) {
      return (
        <img
          src="https://image.flaticon.com/icons/png/512/80/80552.png"
          alt="Logo"
          width="50px"
          height="50px"
        />
      );
    }
  };

  handleChange(date) {
    this.setState({
      startDate: date
    });
    let dateInfo = {
      dateInfo: new Date(date)
    };
    this.props.statisticalRequest(dateInfo);
  }

  render() {
    return (
      <React.Fragment>
        <div className="div-container-satistical">
          <span style={{ fontSize: "30px", top: "20px", margin: "20px" }}>
            Chọn ngày thống kê:
          </span>
          <br />
          <DatePicker
            selected={this.state.startDate}
            onChange={this.handleChange}
            className="data-picker-custom"
          />
          <br />
          <button className="btn-statistical-custom">
            {this.Header(1)}
            Tổng tiền ngày: {this.props.adminReducer.sumDay}
          </button>
          <button className="btn-statistical-custom">
            {this.Header(2)}
            Tổng chuyến trong ngày: {this.props.adminReducer.allBookingDay}
          </button>
          <button className="btn-statistical-custom">
            {this.Header(3)}
            Tổng tiền tháng: {this.props.adminReducer.sumMonth}
          </button>
          <button className="btn-statistical-custom">
            {this.Header(4)}
            Tổng chuyến trong tháng: {this.props.adminReducer.allBookingMonth}
          </button>
        </div>
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
    statisticalRequest: dateInfo =>
      dispatch(adminAction.statisticalRequest(dateInfo))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Statistical);
