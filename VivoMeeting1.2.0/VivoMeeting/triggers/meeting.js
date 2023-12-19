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
    description: 'Triggers when a new Vivo Meeting or Webinar is created.'
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
      "id": 2, "subject": "Alice", "agenda": "My Zapier testing"
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
