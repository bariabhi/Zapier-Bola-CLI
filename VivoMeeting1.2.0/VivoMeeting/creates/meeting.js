// create a particular meeting by name
const perform = async (z, bundle) => {
  const response = await z.request({
    method: 'POST',
    url: `https://app.portal.vivomeetings.com/enterprise_api/conference/create`,
    body: {
      //auth_token: bundle.authData.sessionKey,
      host_id: bundle.inputData.host,
      subject: bundle.inputData.subject,
      duration: bundle.inputData.duration,
      agenda: bundle.inputData.agenda,
      start: bundle.inputData.start,
      mute_mode: bundle.inputData.mute_mode,
      time_zone: bundle.inputData.time_zone,
      auto_record: bundle.inputData.auto_record,
      auto_stream: bundle.inputData.auto_stream,
      auto_transcribe: bundle.inputData.auto_transcribe,
      one_time_access_code: bundle.inputData.one_time_access_code,
      secure_url: bundle.inputData.secure_url,
      security_pin: bundle.inputData.security_pin
    }
  });
  // this should return a single object
  z.console.log("data",response.data);
  return response.data;
};

module.exports = {
  // see here for a full list of available properties:
  // https://github.com/zapier/zapier-platform/blob/master/packages/schema/docs/build/schema.md#createschema
  key: 'meeting',
  noun: 'Meeting',

  display: {
    label: 'Create Meeting',
    description: 'Creates a new Vivo Meeting or Webinar.'
  },

  operation: {
    perform,

    // `inputFields` defines the fields a user could provide
    // Zapier will pass them in as `bundle.inputData` later. They're optional.
    // End-users will map data into these fields. In general, they should have any fields that the API can accept. Be sure to accurately mark which fields are required!
    inputFields: [
      {key: 'subject', label: 'Title', required: true},
      {key: 'host', label: 'Host ID', required: true, dynamic: 'fetchallhost.id.name', altersDynamicFields: true},
      {key: 'start', label: 'When', required: true, type: 'datetime'},
      {key: 'duration', label: 'Duration (In minutes)', required: true},
      {key: 'agenda', label: 'Description', required: false},
      {key: 'mute_mode', label: 'Meeting Mode', required: true, choices:{ conversation: 'Conversation/Collaboration mode',presentation: 'Presentation/Webinar mode', 'q&a': 'Q & A/Classroom mode'}},
      {key: 'time_zone', label: 'Time Zone', required: true, choices:["Asia/Calcutta","Europe/London"]},
      {key: 'auto_record', label: 'Auto Record', required: false, choices:{ none: 'None',audio: 'Audio', video:'Video'}, default:'none'},
      {key: 'auto_stream', label: 'Auto Stream', required: false, choices:{ none: 'None',audio: 'Audio', video:'Video'}, default:'none'},
      {key: 'auto_transcribe', label: 'Auto Transcribe', required: false, type: 'boolean', default: 'false'},
      {key: 'one_time_access_code', label: 'One Time Access Code', required: false, type: 'boolean',default: 'false'},
      {key: 'secure_url', label: 'Secure Url', required: false, type: 'boolean',default: 'false'},
      {key: 'security_pin', label: 'Security Pin', required: false}
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
