
const Router = require("koa-router");
const router = new Router();

router.use("/api/v1", require("./v1/mainRouter").routes());
// router.all("/api/v1",  (ctx)=>{
//         ctx.body = {
//         hey: "hey"
//     };
// });

module.exports = router;
