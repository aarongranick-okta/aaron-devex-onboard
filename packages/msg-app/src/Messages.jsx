/*
 * Copyright (c) 2018, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and limitations under the License.
 */

import { withAuth } from '@okta/okta-react';
import React, { Component } from 'react';
import { ConfigContext } from 'app-common/context';
import { Header, Icon, Message, Table } from 'semantic-ui-react';
import Compose from './Compose';
import MessageList from './MessageList';

class Messages extends Component {
  static get contextType() {
    return ConfigContext;
  }
  constructor(props) {
    super(props);
    this.state = { messages: null, failed: null };
  }

  componentDidMount() {
    this.getMessages();
  }

  async getMessages() {
    const config = this.context;
    if (!this.state.messages) {
      try {
        const accessToken = await this.props.auth.getAccessToken();
        /* global fetch */
        const response = await fetch(config.msgSvc.messagesUrl, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        if (response.status !== 200) {
          this.setState({ failed: true });
          return;
        }

        //let index = 0;
        const data = await response.json();
        const { allMessages, sentMessages } = data;
        // const messages = data.messages.map((message) => {
        //   const date = new Date(message.date);
        //   const day = date.toLocaleDateString();
        //   const time = date.toLocaleTimeString();
        //   index += 1;
        //   return {
        //     date: `${day} ${time}`,
        //     text: message.text,
        //     id: `message-${index}`,
        //   };
        // });
        this.setState({ allMessages, sentMessages, failed: false });
      } catch (err) {
        this.setState({ failed: true });
        /* eslint-disable no-console */
        console.error(err);
      }
    }
  }

  render() {
    const possibleErrors = [
      'You\'ve downloaded one of our resource server examples, and it\'s running on port 8000.',
      'Your resource server example is using the same Okta authorization server (issuer) that you have configured this React application to use.',
    ];
    return (
      <div>
        <Compose />
        <Header as="h1"><Icon name="mail outline" /> My Messages</Header>
        {this.state.failed === true && <Message error header="Failed to fetch messages.  Please verify the following:" list={possibleErrors} />}
        {this.state.failed === null && <p>Fetching Messages..</p>}
        {this.state.sentMessages && (
          <div>
            <b>Sent messages</b>
            <hr />
            <MessageList messages={this.state.sentMessages} />
          </div>
        )}
        {this.state.allMessages && (
          <div>
            <b>ALL messages</b>
            <hr />
            <MessageList messages={this.state.allMessages} />
          </div>
        )}
      </div>
    );
  }
}

export default withAuth(Messages);
