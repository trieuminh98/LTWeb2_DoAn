import React from "react";
import { connect } from "react-redux";
import adminAction from "../../actions/adminAction";

class ListDrivers extends React.Component {
  constructor(props) {
    super(props);
  }

  onActiveRequest = (driverEmail) => {
      this.props.activeRequest(driverEmail);
  }

  render() {
    const listItems = this.props.adminReducer.listDrivers.map((driver,index) => {
      return (
        <tbody>
          <tr>
            <td>{index+1}</td>
            <td>{driver.fullName}</td>
            <td>{driver.email}</td>
            <td>{driver.number}</td>
            <td>
                <button 
                    className={driver.status == "lock" ? "btn btn-custom-lock" : "btn btn-custom-active"}
                    onClick={e => this.onActiveRequest({driverEmail: driver.email})}
                >
                    {driver.status == "lock" ? "Khóa" : "Kích hoạt"}
                </button>
            </td>
          </tr>
        </tbody>
      );
    });
    return (
      <React.Fragment>
        <div className="div-container-driver">
          <span style={{ fontSize: "30px" }}>Danh sách tài xế</span>
          <table className="table table-driver">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Họ tên</th>
                <th scope="col">Email</th>
                <th scope="col">Số điện thoại</th>
                <th scope="col">Trạng thái</th>
              </tr>
            </thead>
            {listItems}
          </table>
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
        activeRequest: (driverEmail) => dispatch(adminAction.activeRequest(driverEmail))
    }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListDrivers);
