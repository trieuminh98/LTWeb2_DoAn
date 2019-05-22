import React from "react";
import "./App.css";
import { Provider } from "react-redux";
import store from "./store";
import Signup from "./component/user/signup";
import Login from "./component/user/login";
import { Switch, Route } from "react-router-dom";
// import {Bros} from 'react-router'
import Header from "./component/menu/header";
class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Header />
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
        </Switch>
      </Provider>
    );
  }
}

export default App;
