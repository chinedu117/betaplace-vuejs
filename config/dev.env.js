'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  ROOT_URL: '"http://localhost:8080"',
  ROOT_API: '"http://betaplace.test/api"',
  GOOGLE_CLIENT_ID: '"41873985302-a6bgttc1vqo4me4vn4ji5r19ourjkda6.apps.googleusercontent.com"',
  GOOGLE_CALLBACK_URL: '"${ROOT_URL}/login/google/callback"',
  FACEBOOK_CLIENT_ID: '"838567409811629"',
  FACEBOOK_CALLBACK_URL: '"${ROOT_URL}/login/facebook/callback"',
})