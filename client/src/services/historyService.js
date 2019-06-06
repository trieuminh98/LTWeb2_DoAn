import Axios from 'axios';

const API = "http://localhost:5000";
const token = localStorage.getItem("token") ? localStorage.getItem("token") : "";

const saveHistory = data => {
    return Axios({
      method: "post",
      url: `${API}/user/saveHistory`,
      data,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  export default {
    saveHistory,
  }