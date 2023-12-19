const {
  config: authentication,
  befores = [],
  afters = [],
} = require('./authentication');

const createAppointments = require("./creates/appointments");

const createCustomers = require("./creates/customers");

const createCancelAppointments = require("./creates/cancel_appointments");

const getStaffMembers = require("./triggers/staff_members");

const getGetAppointments = require("./triggers/get_appointments");

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
    [getStaffMembers.key]: getStaffMembers,
    [getGetAppointments.key]: getGetAppointments
  },

  // If you want your searches to show up, you better include it here!
  searches: {},

  // If you want your creates to show up, you better include it here!
  creates: {
    [createAppointments.key]: createAppointments,
    [createCustomers.key]: createCustomers,
    [createCancelAppointments.key]: createCancelAppointments
  },

  resources: {},
};
