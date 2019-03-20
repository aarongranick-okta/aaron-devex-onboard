require('dotenv').config();

const webpack = require('webpack');

module.exports = {
  mode: 'development',
  plugins: [
    new webpack.EnvironmentPlugin(['CLIENT_ID', 'DOMAIN']),
  ],
};
