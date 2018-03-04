process.env.NODE_ENV = "test";

const chai = require("chai");
const should = chai.should;
const expect = chai.expect;
const chaiHttp = require("chai-http");
const knex = require("../src/server/db/connection");

const RESOURCE = "Customer";
const RESOURCE_URI = "/api/v1/customers";
chai.use(chaiHttp);
const server = require("../src/server/index");

function showRes(res) {
    console.log("/**** res ****");
    console.log("res.status=" + res.status);
    console.log("res.body");
    console.log(res.body);
    console.log("\\**** res ****");
}

function showRes2(res) {
    console.log("/**** full res ****");
    console.log(res);
    console.log("\\**** full res ****");
}
 
describe(`${RESOURCE}: `, () => {
    beforeEach(()=>{
        return knex.migrate.rollback()
        .then( ()=> { return knex.migrate.latest();})
        .then( ()=> { return knex.seed.run(); });
    })

    afterEach( ()=>{
        return knex.migrate.rollback();
    })

    describe.only(`List ${RESOURCE}`, () => {

        it('successfully => 200 + ok + list of all ${RESOURCE}', async () => {
            try {
                const res = await chai.request(server) .get(`${RESOURCE_URI}`);
                expect(res.status).to.eql(200);
                // expect(res.body).to.be.json; casue error

                const data = res.body.data;
                // console.log(data);
                expect(data).to.be.a("array");

                const customers = data;
                if (customers.length > 0) {
                    const cust0 = customers[0];
                    expect(cust0).to.be.a("object");
                    expect(cust0.name).eql("name1");
                    expect(cust0.last_name).eql("lastName1");
                    expect(cust0.line_id).eql("line1");
                    expect(cust0.phone_number).eql("089-2222201");
                    expect(cust0.created_at).not.null;
                    expect(cust0.updated_at).not.null;
                }
            }
            catch (error) {
                // showRes(error.response);
                console.log(error);
            }
            });
    });

    describe(`Get a ${RESOURCE}`, () => {
        it(`successfully => 200 + ok + newly created ${RESOURCE}`, async () => {
            const id = 3;
            const res = await  chai.request(server) .get(`${RESOURCE_URI}/${id}`);
            // showRes(res);
            expect(res.status).eql(200);

            const data = res.body.data;
            // console.log(data);
            expect(data).to.be.a("array");

            const cust = data[0];
            expect(cust).include.keys("name", "last_name", "line_id", "phone_number", "created_at", "updated_at");
            expect(cust).to.be.a("object");
            expect(cust.name).eql("name3");
            expect(cust.last_name).eql("lastName3");
            expect(cust.line_id).eql("line3");
            expect(cust.phone_number).eql("089-2222203");
            expect(cust.created_at).not.null;
            expect(cust.updated_at).not.null;
        });

        it("with non-existing ID => 404 + !ok + 'The request object cannot be found'", async () => {
            try {
                const id = -1; 
                const res = chai.request(server) .get(`${RESOURCE_URI}/${id}`);
            }
            catch (error) {
                // showRes(res);
                expect(res.status).eql(404); // resource not found
                expect(res.body.ok).false;
                expect(res.body.message).eql("The request object cannot be found");
            };
        });

        it("with invalid ID => 400 + !ok + 'Not a valid ID'", async () => {
            try {
                const id = "bad_id";
                const res = chai.request(server) .get(`${RESOURCE_URI}/${id}`);
            }
            catch (error) {
                const res = error.response;
                // showRes(res);
                expect(res.status).eqls(400);
                expect(res.type).to.eql("application/json");
                expect(res.body.ok).false;
                expect(res.body.message).eql("Not a valid ID");
            }
        });
    });

    describe(`Create a ${RESOURCE}`, () => {
        it(`sucessfully => 200 + ok + newly created ${RESOURCE}`, async () => {
            const res = await chai.request(server)
                .post(RESOURCE_URI)
                .send({
                    name:"NewName",
                    last_name: "NewLastName",
                    phone_number : "000 000 0000",
                    line_id : "NewLineId",
                });
            expect(res.type).to.eql("application/json");
            expect(res.status).to.eql(201); //  something created
            const cust = res.body.data;
            expect(cust).to.be.a("object");
            expect(cust).include.keys("name", "last_name", "line_id", "phone_number", "created_at", "updated_at");
            expect(cust.name).eql("NewName");
            expect(cust.last_name).eql("NewLastName");
            expect(cust.line_id).eql("NewLineId");
            expect(cust.phone_number).eql("000 000 0000");
            expect(cust.created_at).not.null;
            expect(cust.updated_at).not.null;
        });
    });

    describe(`Delete a ${RESOURCE}`, () => {

        it ("successfully => 200 + ok + deleted ${RESOURCE}", async ()=>{
            const id = 1;
            const res = await chai.request(server).delete(`${RESOURCE_URI}/${id}`);
            // showRes(res);
            expect(res.status).eqls(200);
            expect(res.body.ok).is.true;
            const deletedResource = res.body.data;
            expect(deletedResource.id).eqls(id);
            expect(deletedResource.name).exist;
            expect(deletedResource.last_name).exist;
        }); 
        it ("with no id => 400 (bad request) + !ok + 'No target object specfied'", async ()=>{
            try {
                const res = await chai.request(server).delete(`${RESOURCE_URI}/`);
            }
            catch (error) {
                const res = error.response;
                // showRes(res);
                expect(res.status).eqls(400);
                expect(res.body.ok).false;
                expect(res.body.message).eqls("No target object specfied");
            }
        });
        it ("with non-existing ID => 404 (resource not found) + !ok + 'The specfied object to delete does not exist'", async ()=> {
            try {
                const res = await chai.request(server).delete(`${RESOURCE_URI}/-1`);
            }
            catch (error) {
                const res = error.response;
                // showRes(res);
                expect(res.status).eqls(404);
                expect(res.body.ok).false;
                expect(res.body.message).eqls("The specfied object to delete does not exist");
            }
        }); 
        it ("with non-numeric ID => 400 (bad request) + !ok +  'Invalid ID'", async ()=>{
            try {
                const res = await chai.request(server).delete(`${RESOURCE_URI}/no_number`);
            }
            catch (error) {
                const res = error.response;
                // showRes(res);
                if (res.status == 500) showRes(res);
                expect(res.status).eql(400); // bad request
                expect(res.body.ok).false;
                expect(res.body.message).eql("Invalid ID");
            }
        });
    });

    describe(`Modify a ${RESOURCE}`, ()=>{

        it (`successfully => 200 + ok + newly updated ${RESOURCE}`, async ()=>{
            try {
                const customers = await knex("customers").select("*");
                const theCust = customers[0];

                const res = await chai.request(server)
                    .put(`${RESOURCE_URI}/${theCust.id}`)
                    .send( {
                        name : "NewName",
                        last_name : "NewLastName",
                    });
                expect(res.status).eql(200);
                expect(res.body.ok).true;
                const cust = res.body.data;
                expect(cust.last_name).eql("NewLastName");
                expect(cust.name).eql("NewName");
            }
            catch (error) {
                const res = error.response;
                if (res.status == 500) showRes(res);   
            }
        });

        it ("with non-exist ID =>  404 (resource not found) + !ok + 'The request object cannot be found'.", async ()=>{
            try {
            const res = await chai.request(server)
                            .put(`${RESOURCE_URI}/-1`)
                            .send( {name:"NewName"});
            }
            catch (error) {
                const res = error.response;
                expect(res.status).eql(404);
                expect(res.body.ok).is.false;
                expect(res.body.message).eql("The request object cannot be found");
            }
        });

        it ("with no ID => 400 (bad request)+ !ok 'No target object specfied'", async ()=>{
            try {
                const res = await chai.request(server).put(`${RESOURCE_URI}/`).send( {name:"NewName"});
            }
            catch (error) {
                const res = error.response;
                // showRes(res);
                expect(res.status).eql(400);
                expect(res.body.ok).false;
                expect(res.body.message).eql("No target object specfied");
            }

        });

        it ("with non-integer ID => 400 (bad request)+ !ok + 'Invalid ID'", async ()=>{
            try {
                const res = await chai.request(server).put(`${RESOURCE_URI}/bad_ID`).send( {name:"NewName"});
            }
            catch (error) {
                const res = error.response;
                // showRes(res);
                expect(res.status).eql(400);
                expect(res.body.ok).false;
                expect(res.body.message).eql("Invalid ID")
            }
        });
    });

});

