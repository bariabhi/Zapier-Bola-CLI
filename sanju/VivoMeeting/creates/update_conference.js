const api = require('../API/api');

// create a particular update_conference by name
const perform = (z, bundle) => {
  const data = bundle.inputData.participant_emails;
  var list=[];
  data.forEach((item) => {
      var email={"email":item}
      var res=JSON.stringify(email);
      var res1 = JSON.parse(res)
      list.push(res1);      
  });
  const options = {
    method: 'POST',
    url: `https://app.portal.vivomeetings.com/enterprise_api/conference/update`,
    // if `body` is an object, it'll automatically get run through JSON.stringify
    // if you don't want to send JSON, pass a string in your chosen format here instead
    body: {
      conference_id: bundle.inputData.conference,
      subject: bundle.inputData.subject,
      participant_emails: list,      
      duration: bundle.inputData.duration,
      agenda: bundle.inputData.agenda,
      start: bundle.inputData.start,
      time_zone: bundle.inputData.time_zone,
      auto_record: bundle.inputData.auto_record,
      auto_stream: bundle.inputData.auto_stream,
      auto_transcribe: bundle.inputData.auto_transcribe,
      one_time_access_code: bundle.inputData.one_time_access_code,
      mute_mode: bundle.inputData.mute_mode
    }
  };
  return api.performAPICall(z, options);
};

module.exports = {
  // see here for a full list of available properties:
  // https://github.com/zapier/zapier-platform/blob/master/packages/schema/docs/build/schema.md#createschema
  key: 'update_conference',
  noun: 'Update_conference',

  display: {
    label: 'Update Conference',
    description: 'Update Conference or Webinar.'
  },

  operation: {
    perform,

    // `inputFields` defines the fields a user could provide
    // Zapier will pass them in as `bundle.inputData` later. They're optional.
    // End-users will map data into these fields. In general, they should have any fields that the API can accept. Be sure to accurately mark which fields are required!
    inputFields: [
      {key: 'host', label: 'Host ID', required: true, dynamic: 'fetchallhost.id.name', altersDynamicFields: true},
      { key: 'conference', label: 'Conference Id', dynamic: 'meeting.id.subject', altersDynamicFields: true, required: true},
      {key: 'subject', label: 'Title', required: true},
      {key: 'participant_emails', label: 'Participant Emails', required: true , list:true},
      {key: 'duration', label: 'Duration (In minutes)', required: false},
      {key: 'agenda', label: 'Description', required: false},
      {key: 'start', label: 'When', required: true, helpText:'Please enter Date and Time example: 2002-01-23 13:15:00', type: 'datetime'},
      {key: 'mute_mode', label: 'Meeting Mode', required: true, choices:{ conversation: 'Conversation/Collaboration mode',presentation: 'Presentation/Webinar mode', 'q&a': 'Q & A/Classroom mode'}},
      {key: 'time_zone', label: 'Time Zone', required: true, choices:{'Asia/Calcutta':"Asia/Calcutta",'Europe/London':"Europe/London", 'Pacific/Easter':"Canada",'America/Chicago':"America/Chicago", 'America/Nome':"United States - South Dakota"}},
      {key: 'auto_record', label: 'Auto Record', required: false, choices:{ none: 'None',audio: 'Audio', video:'Video'}, default:'none'},
      {key: 'auto_stream', label: 'Auto Stream', required: false, choices:{ none: 'None',audio: 'Audio', video:'Video'}, default:'none'},
      {key: 'auto_transcribe', label: 'Auto Transcribe',helpText:'If select True you needs Auto Record set to Audio or Video.', required: false, type: 'boolean', default: 'false'},
      {key: 'one_time_access_code', label: 'One Time Access Code', required: false, type: 'boolean',default: 'false'},
     ],

    // In cases where Zapier needs to show an example record to the user, but we are unable to get a live example
    // from the API, Zapier will fallback to this hard-coded sample. It should reflect the data structure of
    // returned records, and have obvious placeholder values that we can show to any user.
    sample: {
      "conference_id": 24738304,
      "subject": "Test Conference",
      "agenda": "An agenda",
      "start": "2020-09-19 13:00:00",
      "time_zone": "Europe/London",
      "duration": 60,
      "auto_record": "none",
      "auto_stream": "none",
      "auto_transcribe": false,
      "active": false,
      "end_time": "2020-09-19 14:00:00",
      "broadcast_stream": {},
      "security_pin": "123456",
      "mute_mode": "conversation",
      "participants": [
          30919867,
          32436334,
          32436335
      ],
      "moderators": [
          30919867
      ],
      "room_url": "https://vkaps.portal.vivomeetings.com/conf/call/aWJid0pmN0ZzWnFEZWtWRCtuYWRJdz09LS1OTnBMZ0Z6K0E4OC9TU1JlazZuMXRnPT0=--486cacc6c7f2d28306121d1696594c71330e6f04?encrypted_pin=true",
      "recordings": [],
      "is_streaming": false,
      "moderator_token": "SDDmk3hEy0QR"
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
