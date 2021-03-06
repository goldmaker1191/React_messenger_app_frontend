'use strict';

const fs = require('fs');
const path = require('path');
const paths = require('./paths');

// Make sure that including paths.js after env.js will read .env variables.
delete require.cache[require.resolve('./paths')];

const NODE_ENV = process.env.NODE_ENV;

console.log('process.env HEROKU:', process.env);

if (!NODE_ENV) {
  throw new Error(
    'The NODE_ENV environment variable is required but was not specified.'
  );
}

// https://github.com/bkeepers/dotenv#what-other-env-files-can-i-use
var dotenvFiles = [
  `${paths.dotenv}.${NODE_ENV}.local`,
  `${paths.dotenv}.${NODE_ENV}`,
  // Don't include `.env.local` for `test` environment
  // since normally you expect tests to produce the same
  // results for everyone
  NODE_ENV !== 'test' && `${paths.dotenv}.local`,
  paths.dotenv,
].filter(Boolean);

// Load environment variables from .env* files. Suppress warnings using silent
// if this file is missing. dotenv will never modify any environment variables
// that have already been set.  Variable expansion is supported in .env files.
// https://github.com/motdotla/dotenv
// https://github.com/motdotla/dotenv-expand
dotenvFiles.forEach(dotenvFile => {
  if (fs.existsSync(dotenvFile)) {
    require('dotenv-expand')(
      require('dotenv').config({
        path: dotenvFile,
      })
    );
  }
});

// We support resolving modules according to `NODE_PATH`.
// This lets you use absolute paths in imports inside large monorepos:
// https://github.com/facebookincubator/create-react-app/issues/253.
// It works similar to `NODE_PATH` in Node itself:
// https://nodejs.org/api/modules.html#modules_loading_from_the_global_folders
// Note that unlike in Node, only *relative* paths from `NODE_PATH` are honored.
// Otherwise, we risk importing Node.js core modules into an app instead of Webpack shims.
// https://github.com/facebookincubator/create-react-app/issues/1023#issuecomment-265344421
// We also resolve them to make sure all tools using them work consistently.
const appDirectory = fs.realpathSync(process.cwd());
process.env.NODE_PATH = (process.env.NODE_PATH || '')
  .split(path.delimiter)
  .filter(folder => folder && !path.isAbsolute(folder))
  .map(folder => path.resolve(appDirectory, folder))
  .join(path.delimiter);

// Grab NODE_ENV and * environment variables and prepare them to be
// injected into the application via DefinePlugin in Webpack configuration.

function getClientEnvironment(publicUrl) {
  const raw = Object.keys(process.env)
    .reduce(
      (env, key) => {
        env[key] = process.env[key];
        return env;
      },
      {
        // Useful for determining whether we’re running in production mode.
        // Most importantly, it switches React into the correct mode.
        NODE_ENV: process.env.NODE_ENV || 'development',
        // Useful for resolving the correct path to static assets in `public`.
        // For example, <img src={process.env.PUBLIC_URL + '/img/logo.png'} />.
        // This should only be used as an escape hatch. Normally you would put
        // images into the `src` and `import` them in code to get their paths.
        PUBLIC_URL: publicUrl,
      }
    );
  // Stringify all values so we can feed into Webpack DefinePlugin
  const stringified = {
    'process.env': Object.keys(raw).reduce((env, key) => {
      env[key] = JSON.stringify(raw[key]);
      return env;
    }, {}),
    CONFIG: JSON.stringify({
      HOTJAR_TRACK_ID: process.env.HOTJAR_TRACK_ID,
      HOTJAR_VERSION: process.env.HOTJAR_VERSION,
      GOOGLE_OPTIMIZE_CONTAINER_ID: process.env.GOOGLE_OPTIMIZE_CONTAINER_ID,
      GOOGLE_TRACK_ID: process.env.GOOGLE_TRACK_ID,
      FACEBOOK_TRACK_ID: process.env.FACEBOOK_TRACK_ID,
      FB_APP_ID: process.env.FACEBOOK_APP_ID,
      STRIPE_KEY: process.env.STRIPE_KEY,
      STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
      PAYPAL_SANBOX_ID: process.env.PAYPAL_SANBOX_ID,
      PAYPAL_PRODUCTION_ID: process.env.PAYPAL_PRODUCTION_ID,
      SANCTION_USERNAME: process.env.SANCTION_USERNAME,
      SANCTION_PASSWORD: process.env.SANCTION_PASSWORD,
      SANCTION_API_KEY: process.env.SANCTION_API_KEY,
      SANCTION_API_URL: process.env.SANCTION_API_URL || 'http://localhost:5050/sanctions-check',
      PAYPAL_ENV: process.env.PAYPAL_ENV || 'sandbox',
      PAYPAL_PAYMENT_API: process.env.PAYPAL_PAYMENT_API,
      PAYPAL_AUTHORIZE_API: process.env.PAYPAL_AUTHORIZE_API
    })
  };
  return { raw, stringified };
}

module.exports = getClientEnvironment;
