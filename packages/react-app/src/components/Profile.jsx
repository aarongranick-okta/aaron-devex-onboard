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
import { Header, Icon, Table } from 'semantic-ui-react';

const Profile = (props) => {
  const { userinfo } = props;
  const ready = !!userinfo;
  const claims = userinfo ? Object.entries(userinfo) : [];
  return (
    <div>
      {!ready && <p>Fetching user profile..</p>}
      {ready &&
      <div>
        <Header as="h1"><Icon name="drivers license outline" /> My User Profile (ID Token Claims) </Header>
        <p>
          Below is the information from your ID token which was obtained during the
          <a href="https://developer.okta.com/authentication-guide/implementing-authentication/implicit">Implicit Flow</a> and is now stored in local storage.
        </p>
        <p>This route is protected with the <code>&lt;SecureRoute&gt;</code> component, which will ensure that this page cannot be accessed until you have authenticated.</p>
        <Table>
          <thead>
            <tr>
              <th>Claim</th><th>Value</th>
            </tr>
          </thead>
          <tbody>
            {claims.map((claimEntry) => {
              const claimName = claimEntry[0];
              const claimValue = claimEntry[1];
              const claimId = `claim-${claimName}`;
              return <tr key={claimName}><td>{claimName}</td><td id={claimId}>{claimValue}</td></tr>;
            })}
          </tbody>
        </Table>
      </div>
      }
    </div>
  );
};

export default Profile;
