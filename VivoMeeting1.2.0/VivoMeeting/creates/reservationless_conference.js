// create a particular reservationlessconference by name
const perform = async (z, bundle) => {
  const response = await z.request({
    method: 'POST',
    url: `https://app.portal.vivomeetings.com/enterprise_api/conference/create/reservationless`,
    // if `body` is an object, it'll automatically get run through JSON.stringify
    // if you don't want to send JSON, pass a string in your chosen format here instead
    body: {
      //auth_token: bundle.authData.sessionKey,
      host_id: bundle.inputData.host,
      one_time_access_code: bundle.inputData.access_code,
      secure_url: bundle.inputData.secure_url,
    }
  });
  // this should return a single object
  return response.data;
};

module.exports = {
  // see here for a full list of available properties:
  // https://github.com/zapier/zapier-platform/blob/master/packages/schema/docs/build/schema.md#createschema
  key: 'reservationless_conference',
  noun: 'Reservationlessconference',

  display: {
    label: 'Create Reservationless Conference',
    description: 'Creates a new Reservationless Conference.'
  },

  operation: {
    perform,

    // `inputFields` defines the fields a user could provide
    // Zapier will pass them in as `bundle.inputData` later. They're optional.
    // End-users will map data into these fields. In general, they should have any fields that the API can accept. Be sure to accurately mark which fields are required!
    inputFields: [
      {key: 'host', label: 'Host ID', required: true, dynamic: 'fetchallhost.id.name', altersDynamicFields: true},
      {key: 'access_code', label: 'One Time Access Code', required: true, type: 'boolean'},
      {key: 'secure_url', label: 'Secure URl', required: true, type: 'boolean'}
    ],

    // In cases where Zapier needs to show an example record to the user, but we are unable to get a live example
    // from the API, Zapier will fallback to this hard-coded sample. It should reflect the data structure of
    // returned records, and have obvious placeholder values that we can show to any user.
    sample: {
      id: 1,
      name: 'Test'
    },

    // If fields are custom to each user (like spreadsheet columns), `outputFields` can create human labels
    // For a more complete example of using dynamic fields see
    // https://github.com/zapier/zapier-platform/tree/master/packages/cli#customdynamic-fields
    // Alternatively, a static field definition can be provided, to specify labels for the fields
    outputFields: [
      // these are placeholders to match the example `perform` above
      // {key: 'id', label: 'Person ID'},
      // {key: 'name', label: 'Person Name'}
    ]
  }
};
