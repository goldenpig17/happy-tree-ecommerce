const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../app");
const productTypeModel = require("../app/models/productType.model");
const should = chai.should();



chai.use(chaiHttp);

//Triển khai test case kiểm thử API Get All productType

describe("RESTFul productType API", () => {
    // Test case cho API get all productTypes
    describe("GET all productType", () => {
        it("It should get all productType of database", (done) => {
            chai.request(server)
                .get("/productType")
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.data.should.be.a("array");
                    console.log(server);
                    done();
                })
        })
    })
    // Test case cho API Post Create productType
    describe("POST create productTypes", () => {
        it("It should create a productType in the database", (done) => {
            chai.request(server)
                .post("/productType")
                .send({
                    name: "drink",
                    description: "good"
                })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.should.be.json;
                    res.body.should.be.a("object");
                    res.body.SUCCESS.should.have.property("_id");
                    res.body.SUCCESS.should.have.property("name");
                    res.body.SUCCESS.should.have.property("description");
                    res.body.SUCCESS.name.should.equal("drink");
                    res.body.SUCCESS.description.should.equal("good");
                    done();
                })
        })
    })
    // Test case cho API get productTypes by Id
    describe("GET productType by Id", () => {
        it("It should get a single productType by Id of database", (done) => {
            var newProductType = new productTypeModel({
                name: "drink",
                description: "good"
            });
            newProductType.save((err, data) => {
                chai.request(server)
                    .get("/productType/" + data._id)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.should.be.json;
                        res.body.should.be.a("object");
                        res.body.should.have.property("_id");
                        res.body.should.have.property("name");
                        res.body.should.have.property("description");
                        res.body.name.should.equal("drink");
                        res.body.description.should.equal("good");
                        res.body._id.should.equal(data._id);
                        done();
                    })
            })
        })
    })
    //Triển khai test case kiểm thử API Update productType By ID
    describe("PUT productType by Id", () => {
        it("It should update a Single productType on Id PUT", (done) => {
            chai.request(server)
                .get("/productType")
                .end((err, res) => {
                    chai.request(server)
                        .put("/productType" + res.body[0]._id)
                        .send({
                            "name": "drink"
                        })
                        .end((error, response) => {
                            response.should.have.status(200);
                            response.should.be.json;
                            response.body.should.be.a("object");
                            response.body.should.have.property("UPDATED");
                            response.body.UPDATED.should.be.a("object");
                            response.body.UPDATED.should.have.property("_id");
                            response.body.UPDATED.should.have.property("name");
                            response.body.UPDATED.name.should.equal("drink");
                            done();
                        });
                })
        })
    })
    //Triển khai test case kiểm thử API Delete productType By ID
    describe("DELETE productType by Id", () => {
        it("It should delete a Single productType on Id DELETE", (done) => {
            chai.request(server)
                .get("/productTypes")
                .end((err, res) => {
                    chai.request(server)
                        .delete("/productType" + res.body[0]._id)
                        .end((error, response) => {
                            response.should.have.status(200);
                            response.should.be.json;
                            response.body.should.be.a("object");
                            response.body.should.have.property("REMOVED");
                            response.body.REMOVED.should.be.a("object");
                            response.body.REMOVED.should.have.property("_id");
                            response.body.REMOVED.should.have.property("name");
                            response.body.REMOVED.name.should.equal("drink");
                            done();
                        });
                })
        })
    })
})