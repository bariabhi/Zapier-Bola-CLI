const {
  config: authentication,
  befores = [],
  afters = [],
} = require('./authentication');

const getMeeting = require("./triggers/meeting");

const createMeeting = require("./creates/meeting");

const createReservationlessConference = require("./creates/reservationless_conference");

const createUpdateConference = require("./creates/update_conference");

const getFetchallhost = require("./triggers/fetchallhost");

module.exports = {
  // This is just shorthand to reference the installed dependencies you have.
  // Zapier will need to know these before we can upload.
  version: require('./package.json').version,
  platformVersion: require('zapier-platform-core').version,

  authentication,

  beforeRequest: [...befores],

  afterResponse: [...afters],

  // If you want your trigger to show up, you better include it here!
  triggers: {
    [getMeeting.key]: getMeeting,
    [getFetchallhost.key]: getFetchallhost
  },

  // If you want your searches to show up, you better include it here!
  searches: {},

  // If you want your creates to show up, you better include it here!
  creates: {
    [createMeeting.key]: createMeeting,
    [createReservationlessConference.key]: createReservationlessConference,
    [createUpdateConference.key]: createUpdateConference
  },

  resources: {},
};
