import React, { Component } from 'react';
import AuthService from './components/AuthService';
import withAuth from './components/withAuth';
import logo from './logo.svg';

import './App.css';

const Auth = new AuthService();

class App extends Component {
  // This method that we create in the AuthService will clear the token from localStorage.
  handleLogout(){
    Auth.logout()
    this.props.history.replace('/login');
 }

  render() {
    return(
      <div className="App">
          <div className="App-header">
              <img src={logo} className="App-logo" alt="logo" />
              <h2>Welcome {this.props.user.username}</h2>
          </div>
          <p className="App-intro">
            <button type="button" className="form-submit" onClick={this.handleLogout.bind(this)}>Logout</button>
        </p>
      </div>
    );
  }
}

export default withAuth(App);
