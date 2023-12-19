// triggers on a new fetchallhost with a certain tag
const perform = async (z, bundle) => {
  const response = await z.request({
    url: `https://app.portal.vivomeetings.com/enterprise_api/host/fetch_all`,
    method: 'POST',
  });
  // this should return an array of objects
  let field = response.json;
  
  field.map((item) => {
    item.id=item.host_id;
  });
  return response.json;
};

module.exports = {
  // see here for a full list of available properties:
  // https://github.com/zapier/zapier-platform/blob/master/packages/schema/docs/build/schema.md#triggerschema
  key: 'fetchallhost',
  noun: 'Fetchallhost',

  display: {
    label: 'New Fetchallhost',
    description: 'Triggers when a new fetchallhost is created.',
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
    // https://github.com/zapier/zapier-platform/tree/master/packages/cli#customdynamic-fields
    // Alternatively, a static field definition can be provided, to specify labels for the fields
    outputFields: [
      // these are placeholders to match the example `perform` above
      {key: 'host_id', label: 'Host ID', type: 'integer'},
      {key: 'name', label: 'name',type: 'string'},
      {key: 'email', label: 'email',type: 'string'},
      {key: 'meeting_url', label: 'Meeting Url',type: 'string'},
      {key: 'role', label: 'Role', type: 'string'},
      {key: 'access_code', label: 'Access Code', type: 'integer'},
      {key: 'id', label: 'Host ID', type: 'integer'},
    ]
  }
};
