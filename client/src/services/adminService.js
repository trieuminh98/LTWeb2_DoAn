import Axios from 'axios';
const API = "http://localhost:5000";

const checkAllDriver = () => {
    return Axios({
      method: "get",
      url: `${API}/user/checkAllDriver`,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

const activeRequest = (driverEmail) => {
  console.log("adminService")
    return Axios({
      method: "post",
      url: `${API}/user/activeRequest`,
      data: driverEmail,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  export default {
    checkAllDriver,
    activeRequest,
  }