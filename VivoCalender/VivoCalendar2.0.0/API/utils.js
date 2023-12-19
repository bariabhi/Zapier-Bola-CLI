const validateResponse = (response) => {
    var message = "";
    if (response.hasOwnProperty('error_description')) {
        message = response.error_description;
    } else if (response.hasOwnProperty('error_description')) {
        message = response.error;
    }
    if (message != "") { throw new Error(message); }
    return response;
};


const isJSON = (str) => {
    z.console.log('str',str)
    try {
        return !!(JSON.parse(str) && str);
    } catch (e) {
        return false;
    }
}

module.exports = {
    validateResponse: validateResponse,
    isJSON: isJSON
}
