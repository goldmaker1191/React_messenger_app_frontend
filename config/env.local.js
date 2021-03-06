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

// Grab NODE_ENV and CUSTOMER_REACT_APP_* environment variables and prepare them to be
// injected into the application via DefinePlugin in Webpack configuration.
const REACT_APP = /^CUSTOMER_REACT_APP_/i;

function getClientEnvironment(publicUrl) {
  const raw = Object.keys(process.env)
    .filter(key => REACT_APP.test(key))
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
      HOTJAR_TRACK_ID: '987055',
      HOTJAR_VERSION: '6',
      GOOGLE_OPTIMIZE_CONTAINER_ID: 'GTM-M2KBS5T',
      GOOGLE_TRACK_ID: 'UA-79878595-5',
      FACEBOOK_TRACK_ID: '519736865145268',
      STRIPE_KEY: 'pk_test_QHwSBRXAbcgdgrHjI6WVM88B',
      STRIPE_SECRET_KEY: 'sk_test_huciaEWexT3yYfYY0BzgLkKy',
      FB_APP_ID: '1479531445450567',
      PAYPAL_SANBOX_ID: 'AQ6p5mZNiTJIF13P3jG54Kl2ShBjK7uJ50-Tu0yM2-wQ4EgT2olEcjdaFCu5lANk4weufmUyEOiZ3teM',
      PAYPAL_PRODUCTION_ID: 'process.env.CUSTOMER_REACT_APP_PAYPAL_PRODUCTION_ID',
      SANCTION_USERNAME: 'PlutoServices',
      SANCTION_PASSWORD: 'Z4d@9x8K7vh4SXD5ad^fP&h^4o!%qX',
      SANCTION_API_KEY: 'cb5c303b8558966add566477693ccfa5'
    })
  };

  return { raw, stringified };
}

module.exports = getClientEnvironment;
