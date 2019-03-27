'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  ROOT_URL: '"http://localhost:8080"',
  ROOT_API: '"http://betaplace.test/api"',
  GOOGLE_CLIENT_ID: '"41873985302-a6bgttc1vqo4me4vn4ji5r19ourjkda6.apps.googleusercontent.com"',
  GOOGLE_CALLBACK_URL: '"http://localhost:8080/login/google/callback"',
  FACEBOOK_CLIENT_ID: '"838567409811629"',
  FACEBOOK_CALLBACK_URL: '"http://localhost:8080/login/facebook/callback"',
  PAYSTACK_PUBLIC_KEY: '"pk_test_22bdd340817a7abd23c1ade4fb5f131c60be3e7f"',
})