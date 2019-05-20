import React from 'react';
import './App.css';

import Signup from './component/user/signup';
import Login from './component/user/login';
import {Switch,Route} from 'react-router-dom';
// import {Bros} from 'react-router'
import Header from './component/menu/header'



class App extends React.Component {

  constructor(props){
    super(props);
    this.state = {
        members: [],
        currentUser: null
    }
  }


  UpdateLoginUser = (email) => {
    console.log(email);
    this.setState({
      currentUser: {
        email
      }
    })
  }

  componentDidMount = () => {
    let email = localStorage.getItem('email');
    if(email){
      this.setState({
        currentUser: {
          email
        }
      })
    }
  }
  
  render(){
    return (
      <React.Fragment>
        <Header currentUser={this.state.currentUser} />
        <Switch>
          <Route path='/login' component={(props) => <Login {...props} UpdateLoginUser={this.UpdateLoginUser} />}></Route>
          <Route path='/signup' component={(props) => <Signup {...props} UpdateLoginUser={this.UpdateLoginUser} />}></Route>
        </Switch>
      </React.Fragment>
    );
  }
}


export default App;
