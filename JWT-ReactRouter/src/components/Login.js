import React, { Component } from 'react';
import AuthService from './AuthService';

import './Login.css';

// This is simple react component with some inputs with a handleChange method,
// which sets the input values to state of component.
class Login extends Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
    this.Auth = new AuthService();
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }
  // Do not want to stay in the login page if already loggedIn.
  // So add this componentWillMount method hook to prevent it.
  componentWillMount() {
    if (this.Auth.loggedIn()) { this.props.history.replace('/'); }
  }

  render() {
    return (
      <div className="center">
        <div className="card">
          <h1>Login</h1>
            <form onSubmit={this.handleFormSubmit}>
            <input
              className="form-item"
              placeholder="Username goes here..."
              name="username"
              type="text"
              onChange={this.handleChange}
            />
            <input
              className="form-item"
              placeholder="Password goes here..."
              name="password"
              type="password"
              onChange={this.handleChange}
            />
            <input
              className="form-submit"
              value="SUBMIT"
              type="submit"
            />
          </form>
        </div>
      </div>
    );
  }
  // Calling login method in the Auth service.
  // If successfully logged in, redirect to home page which we will protect with higher order component later.
  handleFormSubmit(e) {
    e.preventDefault();

    this.Auth.login(this.state.username, this.state.password)
      .then((res) => {
        this.props.history.replace('/');
      })
      .catch((err) => {
        alert(err);
      });
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }
}

export default Login;
