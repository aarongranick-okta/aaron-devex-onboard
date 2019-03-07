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

import React, { Component } from 'react';
import { Table } from 'semantic-ui-react';

class MessageList extends Component {
  render() {
    const { messages } = this.props;
    return (

      <Table>
        <thead>
          <tr>
            <th>Date</th><th>Message</th>
          </tr>
        </thead>
        <tbody>
          {messages.map(message => <tr id={message.id} key={message.id}><td>{message.date}</td><td>{message.text}</td></tr>)}
        </tbody>
      </Table>
    );
  }
}

export default MessageList;
