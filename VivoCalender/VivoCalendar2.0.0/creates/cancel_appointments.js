// create a particular cancel_appointments by name
const perform = async (z, bundle) => {

  const getStaff = await z.request({
    method: 'GET',
    url: `https://app.vivocalendar.com/api/v3/staff_members`,
    //headers: {'api-key': bundle.authData.api_key},
  });
  const emailToFind = bundle.authData.email; // Email to match
  var staffId = null;
  const staffMembers = getStaff.data.response.staff_members;
  for (const member of staffMembers) {
    if (member.email === emailToFind) {
      staffId = member.id;
      break; // Once found, exit the loop
    }
  }

  const response = await z.request({
    method: 'DELETE',
    url: `https://app.vivocalendar.com/api/v3/appointments/${bundle.inputData.appointment}`,
    //headers:{'api-key': bundle.authData.api_key},
    // if `body` is an object, it'll automatically get run through JSON.stringify
    // if you don't want to send JSON, pass a string in your chosen format here instead
    body: {    
      "appointment":{        
          "user_id":staffId.toString()
      }
    }
  });
  // this should return a single object
  return response.data;
};

module.exports = {
  // see here for a full list of available properties:
  // https://github.com/zapier/zapier-platform/blob/main/packages/schema/docs/build/schema.md#createschema
  key: 'cancel_appointments',
  noun: 'Cancel appointments',

  display: {
    label: 'Cancel Appointments',
    description: 'Cancel a appointment.'
  },

  operation: {
    perform,

    // `inputFields` defines the fields a user could provide
    // Zapier will pass them in as `bundle.inputData` later. They're optional.
    // End-users will map data into these fields. In general, they should have any fields that the API can accept. Be sure to accurately mark which fields are required!
    inputFields: [
      //{key: 'user',  label: 'Staff',dynamic: 'staff_members.id.name', required: true},
      {key: 'appointment',  label: 'Appointment Id', required: true,dynamic: 'get_appointments.id.title'},

    ],

    // In cases where Zapier needs to show an example record to the user, but we are unable to get a live example
    // from the API, Zapier will fallback to this hard-coded sample. It should reflect the data structure of
    // returned records, and have obvious placeholder values that we can show to any user.
    sample: {
        "message": "Successfully deleted."
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
