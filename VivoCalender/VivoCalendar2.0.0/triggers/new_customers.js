// triggers on a new new_customers with a certain tag
const perform = async (z, bundle) => {
  const response = await z.request({
    url: 'https://app.vivocalendar.com/api/v3/customers',
    /*params: {
      tag: bundle.inputData.tagName
    }*/
  });
  // this should return an array of objects
  return response.data.response.customers;
};

module.exports = {
  // see here for a full list of available properties:
  // https://github.com/zapier/zapier-platform/blob/main/packages/schema/docs/build/schema.md#triggerschema
  key: 'new_customers',
  noun: 'Customer',

  display: {
    label: 'New Customers',
    description: 'Triggers when a new customers is created.',
    hidden: true
  },

  operation: {
    perform,

    // `inputFields` defines the fields a user could provide
    // Zapier will pass them in as `bundle.inputData` later. They're optional.
    inputFields: [],

    // In cases where Zapier needs to show an example record to the user, but we are unable to get a live example
    // from the API, Zapier will fallback to this hard-coded sample. It should reflect the data structure of
    // returned records, and have obvious placeholder values that we can show to any user.
    sample: {
     "message": "Success",
       "customers": [
           {
             "id": 870515,
             "title_deleted": null,
             "name_deleted": null,
             "email_deleted": null,
             "country_code_deleted": null,
             "state_deleted": null,
             "address_deleted": null,
             "city_deleted": null,
             "zip_code_deleted": null,
             "mobile_deleted": null,
             "client_id": 37618,
             "booker_id": null,
             "category_id": null,
             "service_id": null,
             "worker_id": null,
             "created_at": "2023-12-12T08:22:57.748Z",
             "updated_at": "2023-12-12T08:22:57.748Z",
             "token": null,
             "is_fake": false,
             "is_synced": false,
             "customer_detail_hstore": {
                 "name": "Testing",
                 "email": "test@test.com",
                 "first_name": "Test",
                 "last_name": ""
             },
             "notes": null,
             "image": null,
             "custom_detail_order_hstore": {
                 "0": "name",
                 "1": "email",
                 "2": "phone"
             },
             "soft_delete": false,
             "full_contact_list": null,
             "full_contact_import_time": null,
             "color_pattern": "#2ECC71",
             "customer_language": null,
             "review_sent_at": "2022-06-21T11:37:17.354Z",
             "review_sent_count": null
          },
       ]
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
