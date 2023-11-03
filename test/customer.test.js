const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../app");
const customerModel = require("../app/models/customer.model");
const should = chai.should();



chai.use(chaiHttp);

//Triển khai test case kiểm thử API Get All Customer

describe("RESTFul Customer API", () => {
    // Test case cho API get all Customers
    describe("GET all Customer", () => {
        it("It should get all Customer of database", (done) => {
            chai.request(server)
                .get("/customer")
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.data.should.be.a("array");
                    console.log(server);
                    done();
                })
        })
    })
    // Test case cho API Post Create Customer
    describe("POST create Customers", () => {
        it("It should create a Customer in the database", (done) => {
            chai.request(server)
                .post("/customer")
                .send({
                    fullName: "Cuong",
                    phone: "0966170992",
                    email: "cuong@gmail.com",
                    address: "24c2",
                    city: "hanoi",
                    country: "Vietnam"
                })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.should.be.json;
                    res.body.should.be.a("object");
                    res.body.SUCCESS.should.have.property("_id");
                    res.body.SUCCESS.should.have.property("fullName");
                    res.body.SUCCESS.should.have.property("email");
                    res.body.SUCCESS.should.have.property("address");
                    res.body.SUCCESS.should.have.property("city");
                    res.body.SUCCESS.should.have.property("country");
                    res.body.SUCCESS.fullName.should.equal("Cuong");
                    res.body.SUCCESS.phone.should.equal("0966170992");
                    res.body.SUCCESS.email.should.equal("cuong@gmail.com");
                    res.body.SUCCESS.address.should.equal("24c2);
                    res.body.SUCCESS.city.should.equal("hanoi");
                    res.body.SUCCESS.country.should.equal("Vietnam");
                    done();
                })
        })
    })
    // Test case cho API get Customers by Id
    describe("GET Customer by Id", () => {
        it("It should get a single Customer by Id of database", (done) => {
            var newCustomer = new customerModel({
                fullName: "Cuong",
                phone: "0966170992",
                email: "cuong@gmail.com",
                address: "24c2",
                city: "hanoi",
                country: "Vietnam"
            });
            newCustomer.save((err, data) => {
                chai.request(server)
                    .get("/customer/" + data._id)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.should.be.json;
                        res.body.should.be.a("object");
                        res.body.should.have.property("_id");
                        res.body.should.have.property("fullName");
                        res.body.should.have.property("email");
                        res.body.should.have.property("address");
                        res.body.should.have.property("city");
                        res.body.should.have.property("country");
                        res.body.fullName.should.equal("Cuong");
                        res.body.phone.should.equal("0966170992");
                        res.body.email.should.equal("cuong@gmail.com");
                        res.body.address.should.equal("24c2");
                        res.body.city.should.equal("hanoi");
                        res.body.country.should.equal("Vietnam");
                        res.body._id.should.equal(data._id);
                        done();
                    })
            })
        })
    })
    //Triển khai test case kiểm thử API Update Customer By ID
    describe("PUT Customer by Id", () => {
        it("It should update a Single Customer on Id PUT", (done) => {
            chai.request(server)
                .get("/customer")
                .end((err, res) => {
                    chai.request(server)
                        .put("/customer" + res.body[0]._id)
                        .send({
                            "fullName": "Cuong Trinh"
                        })
                        .end((error, response) => {
                            response.should.have.status(200);
                            response.should.be.json;
                            response.body.should.be.a("object");
                            response.body.should.have.property("UPDATED");
                            response.body.UPDATED.should.be.a("object");
                            response.body.UPDATED.should.have.property("_id");
                            response.body.UPDATED.should.have.property("fullName");
                            response.body.UPDATED.fullName.should.equal("Cuong Trinh");
                            done();
                        });
                })
        })
    })
    //Triển khai test case kiểm thử API Delete Customer By ID
    describe("DELETE Customer by Id", () => {
        it("It should delete a Single Customer on Id DELETE", (done) => {
            chai.request(server)
                .get("/Customers")
                .end((err, res) => {
                    chai.request(server)
                        .delete("/customer" + res.body[0]._id)
                        .end((error, response) => {
                            response.should.have.status(200);
                            response.should.be.json;
                            response.body.should.be.a("object");
                            response.body.should.have.property("REMOVED");
                            response.body.REMOVED.should.be.a("object");
                            response.body.REMOVED.should.have.property("_id");
                            response.body.REMOVED.should.have.property("fullName");
                            response.body.REMOVED.fullName.should.equal("Cuong");
                            done();
                        });
                })
        })
    })
})