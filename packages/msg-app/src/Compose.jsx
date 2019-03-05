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
import { Header, Icon, Message, Table, Form, Button } from 'semantic-ui-react';

class Compose extends Component {
  static get contextType() {
    return ConfigContext;
  }
  constructor(props) {
    super(props);
    this.state = {
      draftMsg: '',
    };

    this.formRef = React.createRef();

    // bind callbacks
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleKey = this.handleKey.bind(this);
  }

  componentDidMount() {

  }

  async postMessage(msg) {
    const config = this.context;
    try {
      const accessToken = await this.props.auth.getAccessToken();
      /* global fetch */
      const response = await fetch(config.msgSvc.postUrl, {
        method: 'POST',
        body: JSON.stringify({ msg }),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (response.status !== 200) {
        this.setState({ failed: true });
        return;
      }

      const data = await response.json();

      this.setState({ failed: false });
    } catch (err) {
      this.setState({ failed: true });
      /* eslint-disable no-console */
      console.error(err);
    }
  }

  handleChange(e, payload) {
    const { name, value } = payload;
    this.setState({ [name]: value });
  }

  handleSubmit() {
    console.log('handleSubmit');
    const { draftMsg } = this.state;
    this.setState({ submittedMsg: draftMsg, draftMsg: '' });
    this.postMessage(draftMsg);
  }

  handleKey(e) {
    if (e.key === 'Enter') {
      console.log('jackpot');
      this.formRef.current.handleSubmit(e);
    }
  }

  render() {
    const { draftMsg } = this.state;
    return (
      <div>
        <Form ref={this.formRef} onSubmit={this.handleSubmit}>

          <Form.Group inline>
            <label>Message:</label>
            <Form.Input
              placeholder="Enter message..."
              name="draftMsg"
              value={draftMsg}
              onChange={this.handleChange}
              onKeyDown={this.handleKey}
            >
            </Form.Input>
          </Form.Group>
          <Button type="submit">Send</Button>
        </Form>
      </div>
    );
  }
}

export default withAuth(Compose);
