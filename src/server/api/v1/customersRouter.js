
const Router = require("koa-router");
const router = new Router();
const model = require("../../model/oModel.js");
const utils = require("../../utils/utils");
const oCustomer = model.oCustomer;
const oID = model.oID;


router.get("/", async (ctx)=>{
    ctx.body = await oCustomer.list();
});

router.get("/:idString", async (ctx)=>{
    const idString = ctx.params.idString;
    const id = oID.string2ID(idString); 
    ctx.body = await oCustomer.getById(id);
    if (ctx.body.length == 0) {
        utils.throwError( 404, "E_REQUEST_OBJECT_NOT_FOUND");
    }
});

router.post("/", async (ctx)=>{
    const newCustomerData = ctx.request.body;
    const array = await oCustomer.add( newCustomerData );
    
    if (array.length == 1) {
        ctx.status = 201; // something created
        ctx.body = array[0];
    }
    else throw "Error inserting customers";
});

router.delete("/:idString", async (ctx)=>{
    const idString = ctx.params.idString;
    const id = oID.string2ID(idString);
    const array = await model.oCustomer.deleteById( id );
    switch (array.length) {
        case 1: // delete successfully
            ctx.status = 200;
            ctx.body = array[0];
            break;
        case 0: // not such id exist
            ctx.status = 404; // resource not found
            utils.throwError(404, "E_DELETE_OBJECT_NOT_FOUND");
    }
});

router.delete("/", async (ctx)=>{
    utils.throwError(400, "E_TARGET_OBJECT_NOT_SPECIFIED");// , "Do not know which to delete");
})

router.put("/:idString", async (ctx)=>{
    const idString = ctx.params.idString;
    const id = oID.string2ID( idString );
    const updateData = ctx.request.body;

    // console.log("-----");
    // console.log(id);
    // console.log(updateData);

    const updatedCust = await oCustomer.updateById( id, updateData );
    // ctx.status = 200;
    ctx.body = updatedCust;
});

router.put("/", async (ctx)=>{
    utils.throwError(400, "E_TARGET_OBJECT_NOT_SPECIFIED");// , "Do not know which to delete");
})

module.exports = router;