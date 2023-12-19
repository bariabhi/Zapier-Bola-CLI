'use strict';

const testAuth = (z, bundle) => z.request({
  method: 'POST',
  url: `https://${bundle.authData.companyName}.portal.vivomeetings.com/enterprise_api/host/fetch`,
  body: {
    auth_token: bundle.authData.sessionKey,
    host_id: bundle.authData.hostId,
  },
}).then((response) => {
  
  //const rs = JSON.parse(response.json);
  //rs.connectionLabel = `${rs.data.firstName} - ${rs.data.lastName} - ${rs.data.email}`;
  
  const rs = new Object();
  rs.connectionLabel = response.json.name;
  //rs.connectionLabel = ``;
  //rs.smsBalance = response.json;
  bundle.authData.company_id=response.json.company_id;
  // z.console.log(bundle);
  return rs;
}).catch((e)=>{
    throw new z.errors.Error(
    // This message is surfaced to the user
    
    'The email and password or Host Id you supplied is incorrect',
    'AuthenticationError',
    401
  );
});

const getSessionKey = async (z, bundle) => {
  const response = await z.request({
    url: `https://${bundle.authData.companyName}.portal.vivomeetings.com/enterprise_api/authenticate`,
    method: 'POST',
    header:{'Content-Type':'application/json'},
    body: {
      email: bundle.authData.email,
      password: bundle.authData.password,
    },
  }).catch((e)=>{
    throw new z.errors.Error(
      // This message is surfaced to the user
      'The email or password and company name you supplied is incorrect',
      'AuthenticationError'
    );
    
  });
  
  //z.console.log("Res",response)

  // If you're using core v9.x or older, you should call response.throwForStatus()
  // or verify response.status === 200 before you continue.
  return {
    // FIXME: The `|| "secret"` below is just for demo purposes, you should remove it.
    sessionKey: response.data.auth_token || 'secret',
    hostId: bundle.authData.hostId,
    companyName: bundle.authData.companyName,
  };
};

// This function runs before every outbound request. You can have as many as you
// need. They'll need to each be registered in your index.js file.
const includeSessionKeyHeader = (request, z, bundle) => {
  if (bundle.authData.sessionKey) {
    //request.headers = request.headers || {};
    //request.headers['X-API-Key'] = bundle.authData.sessionKey;
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
      { key: 'email', label: 'Email', required: true, helpText: "Go to the Vivomeetings account ('https://vivomeetings.com/') screen from your Website Dashboard to find your Email" },
      { key: 'password', label: 'Password', required: true, type: 'password', helpText: "Go to the Vivomeetings account ('https://vivomeetings.com/') and get youe password"},
      { key: 'companyName', label: 'Company Name', required: true, type: 'string', helpText: "Go to the Vivomeetings account ('https://vkaps.portal.vivomeetings.com/admin/company/users') and get company name which you want add."},
      { key: 'hostId', label: 'Host ID', required: true, type: 'integer', helpText: "Go to the Vivomeetings account ('https://vkaps.portal.vivomeetings.com/admin/company/users') and add that host id wich company name you choice." },
    ],

    // The test method allows Zapier to verify that the credentials a user provides
    // are valid. We'll execute this method whenever a user connects their account for
    // the first time.
    test:testAuth,

    // This template string can access all the data returned from the auth test. If
    // you return the test object, you'll access the returned data with a label like
    // `{{json.X}}`. If you return `response.data` from your test, then your label can
    // be `{{X}}`. This can also be a function that returns a label. That function has
    // the standard args `(z, bundle)` and data returned from the test can be accessed
    // in `bundle.inputData.X`.
    connectionLabel: '{{connectionLabel}}',
  },
  befores: [includeSessionKeyHeader],
  afters: [],
};
