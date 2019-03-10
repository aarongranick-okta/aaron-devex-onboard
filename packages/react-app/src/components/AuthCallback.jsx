import React, { Component } from 'react';

export default class AuthCallback extends Component {
  componentDidMount() {
    const { authenticated, handleAuthCallback } = this.props;
    if (authenticated) {
      console.log('Authenticated on callback page. redirect fail?');
      return;
    }
    handleAuthCallback();
  }

  render() {
    const { authenticated, error } = this.props;
    return (
      <div>
        <div>{ `Authenticated: ${authenticated}` }</div>
        { error && <div>{ `Error: ${error}` }</div> }
      </div>
    );
  }
}
