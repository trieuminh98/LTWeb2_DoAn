import React from 'react';
import './App.css';

import Signup from './component/user/signup';
import Login from './component/user/login';
import {Switch,Route} from 'react-router-dom';
import Header from './component/menu/header'



class App extends React.Component {

  constructor(){
    super();
    this.state = {
        members: []
    }
  }
  
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
