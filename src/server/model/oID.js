const utils = require("../utils/utils");

module.exports = {
    string2ID : function (sID) {
        const id = parseInt(sID);
        if ( isNaN(id)) utils.throwError(400, "E_INVALID_ID");
        return id;
    },
};
