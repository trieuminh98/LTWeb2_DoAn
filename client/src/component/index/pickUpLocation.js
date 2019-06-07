import React from "react";

class PickUpLocation extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <React.Fragment>
        <div className="btn-choose-mode">
          <button className="btn btn-success" onClick={() => this.props.onChooseCurrentLocation()}>Lấy vị trí hiện tại</button>&emsp;
          <button className="btn btn-danger" onClick={() => this.props.onChoosePickUpLocation() }>Lấy vị trí đón này</button>&emsp;
          <button className="btn btn-warning" onClick={() => this.props.onChooseGoalLocation() }>Lấy vị trí đến này</button>&emsp;
        </div>
      </React.Fragment>
    );
  }
}

export default PickUpLocation;
