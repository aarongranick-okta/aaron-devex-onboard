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
const cors = require('cors');
const CONFIG = require('conf/default');

const express = require('express');
const bodyParser = require('body-parser');

const state = {
  messages: [
    {
      date: new Date(),
      text: 'I am a robot.',
    },
    {
      date: new Date(new Date().getTime() - 1000 * 60 * 60),
      text: 'Hello, world!',
    },
  ],
};

const serverState = require('./middleware/state')(state);
const authenticationRequired = require('./middleware/auth')(CONFIG);

const app = express();

/**
 * For local testing only!  Enables CORS for all domains
 */
app.use(cors());

app.use(serverState);

app.get('/', (req, res) => {
  res.json({
    message: 'Hello!  There\'s not much to see here :) Please grab one of our front-end samples for use with this sample resource server',
  });
});

/**
 * An example route that requires a valid access token for authentication, it
 * will echo the contents of the access token if the middleware successfully
 * validated the token.
 */
app.get('/secure', authenticationRequired, (req, res) => {
  res.json(req.jwt);
});

/**
 * Another example route that requires a valid access token for authentication, and
 * print some messages for the user if they are authenticated
 */
app.get('/api/messages', authenticationRequired, require('./endpoints/messages'));

app.use(bodyParser.json());

app.post('/api/post', authenticationRequired, require('./endpoints/post'));

app.listen(CONFIG.msgSvc.port, () => {
  console.log(`Resource Server Ready on port ${CONFIG.msgSvc.port}`);
});
