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

import React from 'react';
import { Header, Icon, Message } from 'semantic-ui-react';
import Compose from '../components/Compose';
import MessageList from '../components/MessageList';

const Messages = (props) => {
  const possibleErrors = [
    'You\'ve downloaded one of our resource server examples, and it\'s running on port 8000.',
    'Your resource server example is using the same Okta authorization server (issuer) that you have configured this React application to use.',
  ];

  const { failed, sentMessages, allMessages } = props;
  return (
    <div>
      <Compose />
      <Header as="h1"><Icon name="mail outline" /> My Messages</Header>
      {failed === true && <Message error header="Failed to fetch messages.  Please verify the following:" list={possibleErrors} />}
      {failed === null && <p>Fetching Messages..</p>}
      {sentMessages && (
        <div>
          <b>Sent messages</b>
          <hr />
          <MessageList messages={sentMessages} />
        </div>
      )}
      {allMessages && (
        <div>
          <b>ALL messages</b>
          <hr />
          <MessageList messages={allMessages} />
        </div>
      )}
    </div>
  );
};

export default Messages;
