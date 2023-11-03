const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../app");
const orderModel = require("../app/models/order.model");
const should = chai.should();



chai.use(chaiHttp);

//Triển khai test case kiểm thử API Get All Order

describe("RESTFul Order API", () => {
    // Test case cho API get all Orders
    describe("GET all Order", () => {
        it("It should get all Order of database", (done) => {
            chai.request(server)
                .get("/order")
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.data.should.be.a("array");
                    console.log(server);
                    done();
                })
        })
    })
    // Test case cho API Post Create Order
    describe("POST create Orders", () => {
        it("It should create a Order in the database", (done) => {
            chai.request(server)
                .post("/order")
                .send({
                    orderDate: Date.now(),
                    shippedDate: "27/09/2023",
                    note: "good",
                    orderDetails: "24c2",
                    cost: "1000"
                })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.should.be.json;
                    res.body.should.be.a("object");
                    res.body.SUCCESS.should.have.property("_id");
                    res.body.SUCCESS.should.have.property("orderDate");
                    res.body.SUCCESS.should.have.property("note");
                    res.body.SUCCESS.should.have.property("orderDetails");
                    res.body.SUCCESS.should.have.property("cost");
                    res.body.SUCCESS.orderDate.should.equal(Date.now());
                    res.body.SUCCESS.shippedDate.should.equal("27/09/2023");
                    res.body.SUCCESS.note.should.equal("good");
                    res.body.SUCCESS.orderDetails.should.equal("24c2");
                    res.body.SUCCESS.cost.should.equal("1000");
                    done();
                })
        })
    })
    // Test case cho API get Orders by Id
    describe("GET Order by Id", () => {
        it("It should get a single Order by Id of database", (done) => {
            var newOrder = new orderModel({
                orderDate: Date.now(),
                shippedDate: "27/09/2023",
                note: "good",
                orderDetails: "24c2",
                cost: "1000"
            });
            newOrder.save((err, data) => {
                chai.request(server)
                    .get("/order/" + data._id)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.should.be.json;
                        res.body.should.be.a("object");
                        res.body.should.have.property("_id");
                        res.body.should.have.property("orderDate");
                        res.body.should.have.property("note");
                        res.body.should.have.property("orderDetails");
                        res.body.should.have.property("cost");
                        res.body.orderDate.should.equal(Date.now());
                        res.body.shippedDate.should.equal("27/09/2023");
                        res.body.note.should.equal("good");
                        res.body.orderDetails.should.equal("24c2");
                        res.body.cost.should.equal("1000");
                        res.body._id.should.equal(data._id);
                        done();
                    })
            })
        })
    })
    //Triển khai test case kiểm thử API Update Order By ID
    describe("PUT Order by Id", () => {
        it("It should update a Single Order on Id PUT", (done) => {
            chai.request(server)
                .get("/order")
                .end((err, res) => {
                    chai.request(server)
                        .put("/order" + res.body[0]._id)
                        .send({
                            "orderDate": Date.now()
                        })
                        .end((error, response) => {
                            response.should.have.status(200);
                            response.should.be.json;
                            response.body.should.be.a("object");
                            response.body.should.have.property("UPDATED");
                            response.body.UPDATED.should.be.a("object");
                            response.body.UPDATED.should.have.property("_id");
                            response.body.UPDATED.should.have.property("orderDate");
                            response.body.UPDATED.orderDate.should.equal(Date.now());
                            done();
                        });
                })
        })
    })
    //Triển khai test case kiểm thử API Delete Order By ID
    describe("DELETE Order by Id", () => {
        it("It should delete a Single Order on Id DELETE", (done) => {
            chai.request(server)
                .get("/orders")
                .end((err, res) => {
                    chai.request(server)
                        .delete("/order" + res.body[0]._id)
                        .end((error, response) => {
                            response.should.have.status(200);
                            response.should.be.json;
                            response.body.should.be.a("object");
                            response.body.should.have.property("REMOVED");
                            response.body.REMOVED.should.be.a("object");
                            response.body.REMOVED.should.have.property("_id");
                            response.body.REMOVED.should.have.property("orderDate");
                            response.body.REMOVED.orderDate.should.equal(Date.now());
                            done();
                        });
                })
        })
    })
})