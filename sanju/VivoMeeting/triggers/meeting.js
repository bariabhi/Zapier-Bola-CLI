// triggers on a new meeting with a certain tag
const perform = async (z, bundle) => {
  const response = await z.request({
    url: `https://app.portal.vivomeetings.com/enterprise_api/conference/fetch_all`,
    method: 'POST',
    body: {
      //auth_token: bundle.authData.sessionKey,
      host_id: bundle.inputData.host,
    },
  }).catch((e)=>{
    
    z.console.log('e',e)
  });
  // this should return an array of objects
  
  let field = response.json;
 
  field.map((item) => {
    item.id=item.conference_id;
    const start = new Date(item.start);
    const end_time = new Date(item.end_time);
    item.start=start.toISOString();
    item.end_time=end_time.toISOString();
  });
  // z.console.log("field",field);
  return response.json;
};

module.exports = {
  // see here for a full list of available properties:
  // https://github.com/zapier/zapier-platform/blob/master/packages/schema/docs/build/schema.md#triggerschema
  key: 'meeting',
  noun: 'Meeting',

  display: {
    label: 'New Meeting',
    description: "Triggers when there's a new VivoMeeting or Webinar is created.",
    hidden: false,
    important: true
  },

  operation: {
    perform,

    // `inputFields` defines the fields a user could provide
    // Zapier will pass them in as `bundle.inputData` later. They're optional.
    inputFields: [
      {key: 'host', label: 'Host ID', required: true, dynamic: 'fetchallhost.id.name', altersDynamicFields: true},
    ],

    // In cases where Zapier needs to show an example record to the user, but we are unable to get a live example
    // from the API, Zapier will fallback to this hard-coded sample. It should reflect the data structure of
    // returned records, and have obvious placeholder values that we can show to any user.
    sample: {
      "id": 24737390,
      "conference_id": 24737390,
      "subject": "Make Test 2",
      "agenda": "This second make test 2",
      "start": "2023-02-15 20:00:00",
      "time_zone": "Asia/Kolkata",
      "duration": 60,
      "auto_record": "none",
      "auto_stream": "none",
      "auto_transcribe": false,
      "active": false,
      "end_time": "2023-02-15 21:00:00",
      "broadcast_stream": {},
      "one_time_access_code": 60865828,
      "mute_mode": "conversation",
      "participants": [
          30919867
      ],
      "moderators": [
          30919867
      ],
      "room_url": "https://vkaps.portal.vivomeetings.com/conf/call/60865828",
      "recordings": [],
      "is_streaming": false,
      "moderator_token": "EL9IiPB8Uzy9"
    },

    // If fields are custom to each user (like spreadsheet columns), `outputFields` can create human labels
    // For a more complete example of using dynamic fields see
    // https://github.com/zapier/zapier-platform/tree/master/packages/cli#customdynamic-fields
    // Alternatively, a static field definition can be provided, to specify labels for the fields
    outputFields: [
      // these are placeholders to match the example `perform` above
      {key: 'conference_id', label: 'Person ID', type: 'integer'},
      {key: 'subject', label: 'subject',type: 'string'},
      {key: 'agenda', label: 'Agenda',type: 'string'},
      {key: 'start', label: 'Start Date',type: 'string'},
      {key: 'end_time', label: 'End Date', type: 'string'},
      {key: 'time_zone', label: 'Time zone' ,type: 'string'},
      {key: 'duration', label: 'Duration',type: 'integer'},
      {key: 'auto_record', label: 'Auto Record',type: 'string'},
      {key: 'auto_stream', label: 'Auto Stream' ,type: 'string'},
      {key: 'auto_transcribe', label: 'Auto Transcribe',type: 'boolean'},
      {key: 'active', label: 'Active',type: 'boolean'},
      {key: 'broadcast_stream[]', label: 'Broadcast Stream',type: 'string'},
      {key: 'one_time_access_code', label: 'One rime access code',type: 'integer'},
      {key: 'mute_mode', label: 'Mute mode',type: 'string'},
      {key: 'participants[]', label: 'Participants',type: 'integer'},
      {key: 'moderators[]', label: 'Moderators',type: 'integer'},
      {key: 'room_url', label: 'Room url',type: 'string'},
      {key: 'is_streaming', label: 'Is streaming',type: 'boolean'},
      {key: 'moderator_token', label: 'Moderators token',type: 'string'},
      // {key: 'name', label: 'Person Name'}
    ]
  }
};
