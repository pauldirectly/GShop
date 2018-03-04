
const PORT = 8080;
const Koa = require("koa");
const logger = require("koa-logger");
const bodyParser = require("koa-bodyparser");
const JsonError = require("koa-json-error")
const handleError = require("koa-handle-error");
const messageTranslator = require("./utils/message-translator");
const responseFormatter = require("koa-res");

const app = new Koa();


const apiRouter = require("./api/mainRouter");
const onAppError = (error)=>{
    console.log("onAppError():");
    console.error(error);
};

app.use(handleError(onAppError));  
app.use(logger());
// body parsing
app.use(bodyParser());
app.use(messageTranslator());
app.use(responseFormatter({debug:false}));

app.use( apiRouter.routes());

const server = app.listen( PORT, ()=> {
    console.log( `Listen on ${PORT}..`);
});


module.exports = server;
