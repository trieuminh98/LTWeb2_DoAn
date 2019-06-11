import React from "react";

class InfoBooking extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    console.log(this.props.pickUpLocation);
    return (
      <React.Fragment>
        <div className="info-custom">
          <span style={{fontSize: "20px", color: "red", fontWeight: "bold"}}>Vị trí đón:</span><br/>
          <span style={{fontSize: "20px", color: "green", fontWeight: "bold"}}>{this.props.pickUpLocation}</span><br/>
          <span style={{fontSize: "20px", color: "red", fontWeight: "bold"}}>Vị trí đến:</span><br/>
          <span style={{fontSize: "20px", color: "green", fontWeight: "bold"}}>{this.props.goalLocationName}</span><br/>
        </div>
      </React.Fragment>
    );
  }
}

export default InfoBooking;
