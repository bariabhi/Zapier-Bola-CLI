var utils = require("./utils");

const performAPICall = (z, options, returnType = 'object') => {
    // You may return a promise or a normal data structure from any perform method.
    return z.request(options)
        .then((response) => {
            z.console.log('res1',response);
            var rs = {};
            if (utils.isJSON(response.content)) {
                z.console.log("rsif",response.content);
                rs = JSON.parse(response.content);
            }
            z.console.log("rsifAfter",rs);
            utils.validateResponse(rs);  
            
            if(rs.hasOwnProperty('error_description')){
                // throw new Error(rs.error_description);
                z.console.log("rsifAfterif",rs);
                throw new z.errors.Error(rs.error_description, 'InvalidData', 400)
            }
            z.console.log("rs2",rs);
            if (response.status == 200) {
                if (typeof rs == 'object') {
                    var rsArray = [rs];
                    var rsObject = rs;
                } else if (typeof rs == 'array') {
                    var rsObject = rsObject[0];
                    var rsArray = rs;
                }
                if (returnType == 'object') {
                    return rsObject;
                } else if (returnType == 'array') {
                    return rsArray;
                }
                return rs;
            }
            if (response.status == 204) {
                return { 'success': true }
            }
        
            throw new Error('Something went wrong, contact zapier support or try again later!');

        });
};



module.exports = {
    performAPICall
}