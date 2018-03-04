
const Router = require("koa-router");
const router = new Router();

// router.get( "/customers", (ctx)=>{
//     ctx.body = {
//         // status: "success",
//         // message: "hello moview",
//         user_name : "paul",
//         last_name :"pool",
//     }
// });

router.use( "/customers", require("./customersRouter").routes());


module.exports = router;
