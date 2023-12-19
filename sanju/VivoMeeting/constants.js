const AUTH_BASE_URI = `https://app.portal.vivomeetings.com/oauth`;
const API_BASE_URI = `https://app.portal.vivomeetings.com/enterprise_api`;
const AUTH_SCOPE = `write`;

module.exports = Object.freeze({
    AUTH_SCOPE: AUTH_SCOPE,
    AUTHORIZE_ENDPOINT_URI: `${AUTH_BASE_URI}/authorize`,
    TOKEN_ENDPOINT_URI: `${AUTH_BASE_URI}/token`,
    // ME_URI: `${API_BASE_URI}/token/tokeninfo`,
    // WEBHOOK_SUBSCRIBE_URI: `${API_BASE_URI}/webhook/createwebhookchannel`,
    // WEBHOOK_UNSUBSCRIBE_URI: `${API_BASE_URI}/webhook/deletechannels`,
    // CREATE_FOLDER_ENDPOINT_URI: `${API_BASE_URI}/templates/createFolder`,
    // TEMPLATE_LIST_ENDPOINT_URI: `${API_BASE_URI}/templates/list`,
    // TEMPLATE_DETAIL_ENDPOINT_URI: `${API_BASE_URI}/templates/mytemplate`,
    // FOLDER_DOWNLOAD_ENDPOINT_URI: `${API_BASE_URI}/folders/document/download`,
    // LIST_FOLDER_ENDPOINT_URI: `${API_BASE_URI}/folders/list`,
    // FOLDER_DETAIL_ENDPOINT_URI: `${API_BASE_URI}/folders/myfolder`,


});