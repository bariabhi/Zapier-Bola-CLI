// triggers on a new get_appointments with a certain tag
const perform = async (z, bundle) => {
  var get_user=bundle.inputData.user
  var user_email=get_user.split("_")
  const response = await z.request({
    method: 'GET',
    url: 'https://app.vivocalendar.com/api/v3/appointments',
    params: {
      email: user_email[1]
    },
    headers:{'api-key': bundle.authData.api_key},
    // body: {
    //   email:""
    // }
  });
  // this should return an array of objects
  return response.data.response.appointment;
};

module.exports = {
  // see here for a full list of available properties:
  // https://github.com/zapier/zapier-platform/blob/main/packages/schema/docs/build/schema.md#triggerschema
  key: 'get_appointments',
  noun: 'Get_appointments',

  display: {
    label: 'New Get_appointments',
    description: 'Triggers when a new get_appointments is created.',
    hidden: true
  },

  operation: {
    perform,

    // `inputFields` defines the fields a user could provide
    // Zapier will pass them in as `bundle.inputData` later. They're optional.
    inputFields: [],

    // In cases where Zapier needs to show an example record to the user, but we are unable to get a live example
    // from the API, Zapier will fallback to this hard-coded sample. It should reflect the data structure of
    // returned records, and have obvious placeholder values that we can show to any user.
    sample: {
      id: 1,
      name: 'Test'
    },

    // If fields are custom to each user (like spreadsheet columns), `outputFields` can create human labels
    // For a more complete example of using dynamic fields see
    // https://github.com/zapier/zapier-platform/tree/main/packages/cli#customdynamic-fields
    // Alternatively, a static field definition can be provided, to specify labels for the fields
    outputFields: [
      // these are placeholders to match the example `perform` above
      // {key: 'id', label: 'Person ID'},
      // {key: 'name', label: 'Person Name'}
    ]
  }
};
