module.exports = {
    parseInt : function (str) {
        const id = parseInt(str);
        if ( isNaN(id)) this.throwError(400, "E_INVALID_INTEGER");
        return id;
    },

    throwError : ( status, message )=> {
        const error = new Error(message);
        error.status = status;
        throw error;
    },

}