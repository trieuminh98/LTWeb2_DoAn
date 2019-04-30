import React from 'react';
import logo from './logo.svg';
import './App.css';
import Members from './component/members/members';
import axios from 'axios';

import Signup from './component/user/signup';
import Login from './component/user/login';
import {Switch,Route} from 'react-router-dom';
import Header from './component/menu/header'
import Footer from './component/menu/footer'



class App extends React.Component {

  constructor(){
    super();
    this.state = {
        members: []
    }
  }

  //Lấy dữ liệu từ local 5000
  // componentDidMount(){
  //   axios.get('http://localhost:5000/api/members')
  //     .then(members => this.setState({members : members.data},() => console.log(members.data)))
  // }

  
  render(){
    return (
      <React.Fragment>
        <Header />
        <Switch>
          <Route path='/login' component={Login}></Route>
          <Route path='/signup' component={Signup}></Route>
        </Switch>
      </React.Fragment>
    );
    




  }
}


export default App;
