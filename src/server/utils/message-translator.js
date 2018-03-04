const path = require('path')
let version
const messages = require("../api/messages"); 

module.exports = function (options = {}) {

  return async function messageTranslator (ctx, next) {
      await next();
        
      const message_id = ctx.body.message;
      if (message_id) {
        const message = messages[message_id];
        if (message != undefined)
            ctx.body.message = message;
      }
  }
}
