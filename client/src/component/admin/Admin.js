import React from "react";
import "./../../cssWebpack/admin.css";
import ListDrivers from "./ListDrivers";
import { connect } from "react-redux";
import adminAction from "./../../actions/adminAction";

class Admin extends React.Component {
    constructor(props){
        super(props);
    }

    componentDidMount(){
        this.props.checkAllDriverRequest();
    }

  render() {
    return (
      <React.Fragment>
          <ListDrivers/>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
    return {
        adminReducer : state.adminReducer
    }
}

const mapDispatchToProps = dispatch => {
    return{
        checkAllDriverRequest : () => dispatch(adminAction.checkAllDriverRequest())
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Admin);
