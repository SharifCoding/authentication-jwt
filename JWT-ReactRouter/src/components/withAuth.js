// Import React and AuthService
import React, { Component } from 'react';
import AuthService from './AuthService';

// Higer Order Component
// Export a function withAuth which takes a AuthComponent as a parameter
export default function withAuth(AuthComponent) {
  // Instantiate AuthService
  const Auth = new AuthService('http://localhost:8080');
  // Return a class AuthWrapped in which auth is handled
  return class AuthWrapped extends Component {
    // Add contructor to class and initialize its state with user as null
    constructor() {
      super();
      this.state = {
        user: null,
      };
    }
    // Add componentWillMount hook which checks the auth
    componentWillMount() {
      // Checking if we are loggedIn() which check the token from the localStorage.
      if (!Auth.loggedIn()) {
        this.props.history.replace('/login');
      } else {
        // Then we are decoding the token so that we may set it to our state.
        try {
          const profile = Auth.getProfile();
          this.setState({
            user: profile,
          });
        }
        // If we failed to decode it so we will redirect to login page.
        catch (err) {
          Auth.logout();
          this.props.history.replace('/login');
        }
      }
    }

    // Add render method
    render() {
      // In render methods we are checking of user exists are passing user to the component.
      if (this.state.user) {
        return (
          <AuthComponent history={this.props.history} user={this.state.user} />
        );
      }
      else {
        return null;
      }
    }
  };
}
