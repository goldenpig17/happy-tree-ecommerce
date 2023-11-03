const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../app");
const orderDetailDetailModel = require("../app/models/orderDetailDetail.model");
const should = chai.should();



chai.use(chaiHttp);

//Triển khai test case kiểm thử API Get All orderDetail

describe("RESTFul orderDetail API", () => {
    // Test case cho API get all orderDetails
    describe("GET all orderDetail", () => {
        it("It should get all orderDetail of database", (done) => {
            chai.request(server)
                .get("/orderDetail")
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.data.should.be.a("array");
                    console.log(server);
                    done();
                })
        })
    })
    // Test case cho API Post Create orderDetail
    describe("POST create orderDetails", () => {
        it("It should create a orderDetail in the database", (done) => {
            chai.request(server)
                .post("/orderDetail")
                .send({
                    product: "Pepsi",
                    quantity: "100"
                })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.should.be.json;
                    res.body.should.be.a("object");
                    res.body.SUCCESS.should.have.property("_id");
                    res.body.SUCCESS.should.have.property("product");
                    res.body.SUCCESS.should.have.property("quantity");
                    res.body.SUCCESS.product.should.equal("Pepsi");
                    res.body.SUCCESS.quantity.should.equal("100");
                    done();
                })
        })
    })
    // Test case cho API get orderDetails by Id
    describe("GET orderDetail by Id", () => {
        it("It should get a single orderDetail by Id of database", (done) => {
            var neworderDetail = new orderDetailModel({
                product: Pepsi,
                quantity: "100"
            });
            neworderDetail.save((err, data) => {
                chai.request(server)
                    .get("/orderDetail/" + data._id)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.should.be.json;
                        res.body.should.be.a("object");
                        res.body.should.have.property("_id");
                        res.body.should.have.property("product");
                        res.body.should.have.property("quantity");
                        res.body.product.should.equal("Pepsi");
                        res.body.quantity.should.equal("100");
                        res.body._id.should.equal(data._id);
                        done();
                    })
            })
        })
    })
    //Triển khai test case kiểm thử API Update orderDetail By ID
    describe("PUT orderDetail by Id", () => {
        it("It should update a Single orderDetail on Id PUT", (done) => {
            chai.request(server)
                .get("/orderDetail")
                .end((err, res) => {
                    chai.request(server)
                        .put("/orderDetail" + res.body[0]._id)
                        .send({
                            "product": Pepsi
                        })
                        .end((error, response) => {
                            response.should.have.status(200);
                            response.should.be.json;
                            response.body.should.be.a("object");
                            response.body.should.have.property("UPDATED");
                            response.body.UPDATED.should.be.a("object");
                            response.body.UPDATED.should.have.property("_id");
                            response.body.UPDATED.should.have.property("product");
                            response.body.UPDATED.product.should.equal("Pepsi");
                            done();
                        });
                })
        })
    })
    //Triển khai test case kiểm thử API Delete orderDetail By ID
    describe("DELETE orderDetail by Id", () => {
        it("It should delete a Single orderDetail on Id DELETE", (done) => {
            chai.request(server)
                .get("/orderDetails")
                .end((err, res) => {
                    chai.request(server)
                        .delete("/orderDetail" + res.body[0]._id)
                        .end((error, response) => {
                            response.should.have.status(200);
                            response.should.be.json;
                            response.body.should.be.a("object");
                            response.body.should.have.property("REMOVED");
                            response.body.REMOVED.should.be.a("object");
                            response.body.REMOVED.should.have.property("_id");
                            response.body.REMOVED.should.have.property("product");
                            response.body.REMOVED.product.should.equal("Pepsi");
                            done();
                        });
                })
        })
    })
})