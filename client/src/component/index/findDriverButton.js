import React from "react";

class FindDriverButton extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <React.Fragment>
        <div className="find_driver-btn">
          <button
            className="btn btn-success"
            onClick={() => this.props.onFindDriver()}
          >
            Tìm tài xế
          </button>
        </div>
      </React.Fragment>
    );
  }
}

export default FindDriverButton;
