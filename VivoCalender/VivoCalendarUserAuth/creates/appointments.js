// create a particular appointments by name
const perform = async (z, bundle) => {
  const response = await z.request({
    method: 'POST',
    url: 'https://app.vivocalendar.com/api/v3/appointments',
    // if `body` is an object, it'll automatically get run through JSON.stringify
    // if you don't want to send JSON, pass a string in your chosen format here instead
    header:{'api-key': bundle.authData.api_key},
    body: {
      "appointment": {
          "user_id": bundle.inputData.user_id,
          "service_id": bundle.inputData.service_id,
          "duration": bundle.inputData.duration,
          "appointment_start_time": bundle.inputData.appointment_start_time,          
          "appointment_end_time": bundle.inputData.appointment_end_time,
          "appointment_date": bundle.inputData.appointment_date,
          "price": bundle.inputData.price,
          "description": bundle.inputData.description,
          "title": bundle.inputData.title,
          "sessions24_join_url": bundle.inputData.sessions24_join_url,          
      },
      "customer": {
          "name": bundle.inputData.name,
          "email": bundle.inputData.email
      }
    }
  });
  // this should return a single object
  z.console.log(response);
  return response.data;
};

module.exports = {
  // see here for a full list of available properties:
  // https://github.com/zapier/zapier-platform/blob/main/packages/schema/docs/build/schema.md#createschema
  key: 'appointments',
  noun: 'Appointments',

  display: {
    label: 'Create Appointments',
    description: 'Creates a new appointments, probably with input from previous steps.'
  },

  operation: {
    perform,

    // `inputFields` defines the fields a user could provide
    // Zapier will pass them in as `bundle.inputData` later. They're optional.
    // End-users will map data into these fields. In general, they should have any fields that the API can accept. Be sure to accurately mark which fields are required!
    inputFields: [
      {key: 'user_id', label: 'User ID', required: true},
      {key: 'service_id', label: 'Service ID', required: true},
      {key: 'duration', label: 'Duration', required: true},
      {key: 'appointment_start_time', label: 'Appointment Start Time', required: true},
      {key: 'appointment_end_time', label: 'Appointment End Time', required: true},
      {key: 'appointment_date', label: 'Appointment Date', required: true},
      {key: 'price', label: 'Price', required: false},
      {key: 'title', label: 'Title', required: false},
      {key: 'description', label: 'Description', required: false},
      {key: 'sessions24_join_url', label: 'Join url', required: false},
      {key: 'name', label: 'Customer name', required: false},
      {key: 'email', label: 'Customer email', required: false}
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
    // https://github.com/zapier/zapier-platform/tree/main/packages/cli#customdynamic-fields
    // Alternatively, a static field definition can be provided, to specify labels for the fields
    outputFields: [
      // these are placeholders to match the example `perform` above
      // {key: 'id', label: 'Person ID'},
      // {key: 'name', label: 'Person Name'}
    ]
  }
};
