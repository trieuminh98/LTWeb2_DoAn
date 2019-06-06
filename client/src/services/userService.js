import Axios from 'axios';

const API = "http://localhost:5000";
const token = localStorage.getItem("token") ? localStorage.getItem("token") : "";
// if(token){
//   localStorage.setItem("token",token);
// }
const signup = (data) => {
  return Axios({
    method: "post",
    url: `${API}/user/signup`,
    data,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
}


const login = data => {
  return Axios({
    method: "post",
    url: `${API}/user/login`,
    data,
    headers: {
      'Content-Type': 'application/json'
    }
  });
}

const getProfile = () => {
  return Axios({
    method: "post",
    url: `${API}/user/profile`,
    data:{},
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  });
}


export default {
  signup,
  login,
  getProfile,
}
