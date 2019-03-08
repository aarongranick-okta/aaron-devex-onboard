import React, { Component } from 'react';

export default class SocketService extends Component {
  constructor(props) {
    super(props);
    const { url } = props;
    /* global Primus */
    this.primus = Primus.connect(url, {
      manual: true,
    });
  }

  render() {
    return <div />;
  }
}
