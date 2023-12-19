// create a particular appointments by name
const api = require('../API/api');

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
  //z.console.log("staff",typeof(staffId))

  const response = await z.request({
    method: 'POST',
    url: 'https://app.vivocalendar.com/api/v3/appointments',
    // if `body` is an object, it'll automatically get run through JSON.stringify
    // if you don't want to send JSON, pass a string in your chosen format here instead
    //headers:{'api-key': bundle.authData.api_key},
    body: {
      "appointment": {
          "user_id": staffId.toString(),
          "service_id": bundle.inputData.service,
          "duration": bundle.inputData.duration,
          "appointment_start_time": bundle.inputData.appointment_start_time,          
          "appointment_end_time": bundle.inputData.appointment_end_time,
          "appointment_date": bundle.inputData.appointment_date,          
          "description": bundle.inputData.description,
          "title": bundle.inputData.title                   
      },
      "customer": {
          "name": bundle.inputData.name,
          "email": bundle.inputData.email
      }
    }
  });
  // this should return a single object
  return response.data;
};

module.exports = {
  // see here for a full list of available properties:
  // https://github.com/zapier/zapier-platform/blob/main/packages/schema/docs/build/schema.md#createschema
  key: 'appointments',
  noun: 'Appointments',

  display: {
    label: 'Create Appointments',
    description: 'Creates a new appointments.'
  },

  operation: {
    perform,

    // `inputFields` defines the fields a user could provide
    // Zapier will pass them in as `bundle.inputData` later. They're optional.
    // End-users will map data into these fields. In general, they should have any fields that the API can accept. Be sure to accurately mark which fields are required!
    inputFields: [
     //{key: 'user', label: 'Staff ID',dynamic: 'staff_members.id.name', required: true},
      {key: 'service', label: 'Appointment Type', required: true, choices:{ 126425: '15 Minute Phone Call', 126426: '30 Minute Meeting'}},
      {key: 'duration', label: 'Duration', helpText:'Duration in Minute', required: true},
      {key: 'appointment_start_time', label: 'Appointment Start Time', helpText:'Please use this format: (2023-09-30 15:30)', required: true},
      {key: 'appointment_end_time', label: 'Appointment End Time',helpText:'Please use this format: (2023-09-30 15:30)', required: true},
      {key: 'appointment_date', label: 'Appointment Date',helpText:'Please use this format: (2023-09-30)', required: true},
      //{key: 'price', label: 'Price', required: false},
      {key: 'title', label: 'Title', required: false},
      {key: 'description', label: 'Description', required: false},
      //{key: 'sessions24_join_url', label: 'Join url', required: false},
      {key: 'name', label: 'Customer name', required: true},
      {key: 'email', label: 'Customer email', required: false}
    ],

    // In cases where Zapier needs to show an example record to the user, but we are unable to get a live example
    // from the API, Zapier will fallback to this hard-coded sample. It should reflect the data structure of
    // returned records, and have obvious placeholder values that we can show to any user.
    sample: {
        "message": "Success",
        "appointment": {
            "id": 8057854,
            "category": {
                "category_id": 104813,
                "category_name": "Meeting"
            },
            "service": {
                "service_id": 126182,
                "service_name": "30 Minute Meeting",
                "service_delete": null
            },
            "customer_id": 867770,
            "appointment_date": "2023-09-23",
            "appointment_start_time": "2023-09-23T16:30:00.000+05:30",
            "appointment_end_time": "2023-09-23T16:45:00.000+05:30",
            "title": "test6 | 30 Minute Meeting",
            "description": "",
            "price": "0.0",
            "created_by": "Client",
            "created_by_id": "user_80778",
            "created_at": "2023-11-27T18:45:00.870+05:30",
            "updated_at": "2023-11-27T18:45:00.882+05:30",
            "duration": "45",
            "token": "aeXVPr9AJMFBdzo6xanKjNmQ",
            "gcal_id": null,
            "recurring_date": null,
            "is_active": true,
            "cancel_token": "qJRPLTRu2r3K8kQDRBmtw1jR",
            "is_blocker": false,
            "reminder_flag": true,
            "recurring_delete": null,
            "gcal_created": false,
            "recurring_end_date": null,
            "user_id": 80778,
            "update_token": "YehEbReKnePUqhxG65AnQowu",
            "test_demo": false,
            "recurring": false,
            "domain": null,
            "ocal_created": false,
            "ocal_id": "",
            "outlook_master_id": "",
            "all_day_blocker": false,
            "zoom_meeting_id": null,
            "zoom_join_url": null,
            "webex_join_url": null,
            "teledoc_link": null,
            "is_private": null,
            "vivo_meeting_url": null
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
