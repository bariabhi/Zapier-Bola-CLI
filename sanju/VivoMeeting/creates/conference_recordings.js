// create a particular conference recordings by name
const api = require('../API/api');

const perform = async (z, bundle) => {
  const response = await z.request({
    method: 'POST',
    url: 'https://app.portal.vivomeetings.com/enterprise_api/conference/fetch',
    // if `body` is an object, it'll automatically get run through JSON.stringify
    // if you don't want to send JSON, pass a string in your chosen format here instead
    body: {
      conference_id: bundle.inputData.conference,
    }
  });
  // this should return a single object
  return response.data;
  //return api.performAPICall(z, response);
};

module.exports = {
  // see here for a full list of available properties:
  // https://github.com/zapier/zapier-platform/blob/master/packages/schema/docs/build/schema.md#createschema
  key: 'conference_recordings',
  noun: 'Conference Recordings',

  display: {
    label: 'Get Conference Recordings',
    description: 'Get a new conference recordings'
  },

  operation: {
    perform,

    // `inputFields` defines the fields a user could provide
    // Zapier will pass them in as `bundle.inputData` later. They're optional.
    // End-users will map data into these fields. In general, they should have any fields that the API can accept. Be sure to accurately mark which fields are required!
    inputFields: [
      { key: 'conference', label: 'Conference Id', required: true},
    ],

    // In cases where Zapier needs to show an example record to the user, but we are unable to get a live example
    // from the API, Zapier will fallback to this hard-coded sample. It should reflect the data structure of
    // returned records, and have obvious placeholder values that we can show to any user.
    sample: {
      "conference_id": 12345678,
      "subject": "Zapier Conference record1",
      "agenda": "An agenda",
      "start": "2023-02-23 11:25:00",
      "time_zone": "Europe/London",
      "duration": 12,
      "auto_record": "none",
      "auto_stream": "none",
      "auto_transcribe": false,
      "active": false,
      "end_time": "2023-02-23 11:36:00",
      "broadcast_stream": {},
      "one_time_access_code": 44621376,
      "mute_mode": "conversation",
      "participants": [
          30919867
      ],
      "moderators": [
          30919867
      ],
      "room_url": "https://vkaps.portal.vivomeetings.com/conf/call/44621376",
      "recordings": [
          {
              "id": 922438,
              "start_time": "2023-02-23T06:25:04.000-05:00",
              "end_time": null,
              "type": "audio",
              "publishing_state": "processing",
              "download_link": null
          }
      ],
      "is_streaming": false,
      "moderator_token": "1ydC6nqQmJS_"
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
