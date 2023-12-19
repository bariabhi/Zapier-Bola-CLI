// triggers on a new staffmembers with a certain tag
const perform = async (z, bundle) => {
  const response = await z.request({
    method: 'GET',
    url: 'https://app.vivocalendar.com/api/v3/staff_members',
    /*params: {
      tag: bundle.inputData.tagName
    }*/
    headers:{'api-key': bundle.authData.api_key},
  });
  // this should return an array of objects
  z.console.log("res",response);
  var field=response.data.response.staff_members
  field.map((item) => {
    item.id=item.id+"_"+item.email;
  });
  return field;
};

module.exports = {
  // see here for a full list of available properties:
  // https://github.com/zapier/zapier-platform/blob/main/packages/schema/docs/build/schema.md#triggerschema
  key: 'staff_members',
  noun: 'Staffmembers',

  display: {
    label: 'New Staffmembers',
    description: 'Triggers when a new staffmembers is created.',
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
