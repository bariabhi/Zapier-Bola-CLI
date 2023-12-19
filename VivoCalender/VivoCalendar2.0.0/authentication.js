'use strict';

// You want to make a request to an endpoint that is either specifically designed
// to test auth, or one that every user will have access to. eg: `/me`.
// By returning the entire request object, you have access to the request and
// response data for testing purposes. Your connection label can access any data
// from the returned response using the `json.` prefix. eg: `{{json.username}}`.
const test = (z, bundle) =>
  z.request({ url: 'https://app.vivocalendar.com/api/v3/me',
              method: 'GET',
              headers:{'api-key': bundle.authData.api_key}
           });

const getSessionKey = async (z, bundle) => {
  const response = await z.request({
    url: 'https://app.vivocalendar.com/api/v3/authenticate',
    method: 'POST',
    body: {
      "user":{
        "email": bundle.authData.email,
        "password": bundle.authData.password
      }
    },
    skipThrowForStatus: true,
  });

  // If you're using core v9.x or older, you should call response.throwForStatus()
  // or verify response.status === 200 before you continue.
  //z.console.log('response',response);
  if (response.status === 404) {
    throw new z.errors.Error(response.json.error, 'InvalidData', 404);
  }
  return {
    // FIXME: The `|| "secret"` below is just for demo purposes, you should remove it.
    api_key: response.data.api_key,
  };
};

// This function runs before every outbound request. You can have as many as you
// need. They'll need to each be registered in your index.js file.
const includeSessionKeyHeader = (request, z, bundle) => {
  if (bundle.authData.api_key) {
    request.headers = request.headers || {};
    request.headers['api-key'] = bundle.authData.api_key;
  }

  return request;
};

module.exports = {
  config: {
    // "session" auth exchanges user data for a different session token (that may be
    // periodically refreshed")
    type: 'session',
    sessionConfig: { perform: getSessionKey },

    // Define any input app's auth requires here. The user will be prompted to enter
    // this info when they connect their account.
    fields: [
      { key: 'email', label: 'Email',helpText: 'Go to the [Vivocalendar](https://app.vivocalendar.com/).', required: true },
      {
        key: 'password',
        label: 'Password',
        required: true,

        // this lets the user enter masked data
        type: 'password',
      },
    ],

    // The test method allows Zapier to verify that the credentials a user provides
    // are valid. We'll execute this method whenever a user connects their account for
    // the first time.
    test,

    // This template string can access all the data returned from the auth test. If
    // you return the test object, you'll access the returned data with a label like
    // `{{json.X}}`. If you return `response.data` from your test, then your label can
    // be `{{X}}`. This can also be a function that returns a label. That function has
    // the standard args `(z, bundle)` and data returned from the test can be accessed
    // in `bundle.inputData.X`.
    connectionLabel: '{{json.email}}',
  },
  befores: [includeSessionKeyHeader],
  afters: [],
};
