// create a particular customers by name
const perform = async (z, bundle) => {
  const response = await z.request({
    method: 'POST',
    url: 'https://app.vivocalendar.com/api/v3/customers',
    // if `body` is an object, it'll automatically get run through JSON.stringify
    // if you don't want to send JSON, pass a string in your chosen format here instead
    //headers:{'api-key': bundle.authData.api_key},
    body: {
      "customer": {
          "name": bundle.inputData.name,
          "email":bundle.inputData.email
      }
    },
    skipThrowForStatus: true
  });
  // this should return a single object
  z.console.log("res",response);
  if (response.data.response.message === "Customer with this name or email already exists.") {
    z.console.log(response.json.message);
    throw new z.errors.Error(response.data.response.message, 'InvalidData', 403);
  }
  return response.data;
};

module.exports = {
  // see here for a full list of available properties:
  // https://github.com/zapier/zapier-platform/blob/main/packages/schema/docs/build/schema.md#createschema
  key: 'customers',
  noun: 'Customers',

  display: {
    label: 'Create Customers',
    description: 'Creates a new customers.'
  },

  operation: {
    perform,

    // `inputFields` defines the fields a user could provide
    // Zapier will pass them in as `bundle.inputData` later. They're optional.
    // End-users will map data into these fields. In general, they should have any fields that the API can accept. Be sure to accurately mark which fields are required!
    inputFields: [
      {key: 'name', label: 'name',  required: true},
      {key: 'email', label: 'email', helpText: 'The combination of name and email must be unique.',required: false}
    ],

    // In cases where Zapier needs to show an example record to the user, but we are unable to get a live example
    // from the API, Zapier will fallback to this hard-coded sample. It should reflect the data structure of
    // returned records, and have obvious placeholder values that we can show to any user.
    sample: {
        "message": "Successfully created.",
        "customer": {
            "id": 868389,
            "created_at": "2023-11-27T13:20:37.292Z",
            "updated_at": "2023-11-27T13:20:37.292Z",
            "email": "test@test.com",
            "name": "Test",
            "customer_detail_hstore": {},
            "soft_delete": false
        }
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
