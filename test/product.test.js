const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../app");
const productModel = require("../app/models/product.model");
const should = chai.should();



chai.use(chaiHttp);

//Triển khai test case kiểm thử API Get All product

describe("RESTFul product API", () => {
    // Test case cho API get all products
    describe("GET all product", () => {
        it("It should get all product of database", (done) => {
            chai.request(server)
                .get("/product")
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.data.should.be.a("array");
                    console.log(server);
                    done();
                })
        })
    })
    // Test case cho API Post Create product
    describe("POST create products", () => {
        it("It should create a product in the database", (done) => {
            chai.request(server)
                .post("/product")
                .send({
                    name: "Cuong",
                    description: "good",
                    type: "drink",
                    imageUrl: "123456",
                    buyPrice: "10000",
                    promotionPrice: "5000",
                    amount: "10"
                })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.should.be.json;
                    res.body.should.be.a("object");
                    res.body.SUCCESS.should.have.property("_id");
                    res.body.SUCCESS.should.have.property("name");
                    res.body.SUCCESS.should.have.property("type");
                    res.body.SUCCESS.should.have.property("imageUrl");
                    res.body.SUCCESS.should.have.property("buyPrice");
                    res.body.SUCCESS.should.have.property("promotionPrice");
                    res.body.SUCCESS.should.have.property("amount");
                    res.body.SUCCESS.name.should.equal("Cuong");
                    res.body.SUCCESS.description.should.equal("good");
                    res.body.SUCCESS.type.should.equal("drink");
                    res.body.SUCCESS.imageUrl.should.equal("123456");
                    res.body.SUCCESS.buyPrice.should.equal("10000");
                    res.body.SUCCESS.promotionPrice.should.equal("5000");
                    res.body.SUCCESS.amount.should.equal("10");
                    done();
                })
        })
    })
    // Test case cho API get products by Id
    describe("GET product by Id", () => {
        it("It should get a single product by Id of database", (done) => {
            var newproduct = new productModel({
                name: "Cuong",
                description: "good",
                type: "drink",
                imageUrl: "123456",
                buyPrice: "10000",
                promotionPrice: "5000",
                amount: "10"
            });
            newproduct.save((err, data) => {
                chai.request(server)
                    .get("/product/" + data._id)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.should.be.json;
                        res.body.should.be.a("object");
                        res.body.should.have.property("_id");
                        res.body.should.have.property("name");
                        res.body.should.have.property("type");
                        res.body.should.have.property("imageUrl");
                        res.body.should.have.property("buyPrice");
                        res.body.should.have.property("promotionPrice");
                        res.body.should.have.property("amount");
                        res.body.name.should.equal("Cuong");
                        res.body.description.should.equal("good");
                        res.body.type.should.equal("drink");
                        res.body.imageUrl.should.equal("123456");
                        res.body.buyPrice.should.equal("10000");
                        res.body.promotionPrice.should.equal("5000");
                        res.body.amount.should.equal("10");
                        res.body._id.should.equal(data._id);
                        done();
                    })
            })
        })
    })
    //Triển khai test case kiểm thử API Update product By ID
    describe("PUT product by Id", () => {
        it("It should update a Single product on Id PUT", (done) => {
            chai.request(server)
                .get("/product")
                .end((err, res) => {
                    chai.request(server)
                        .put("/product" + res.body[0]._id)
                        .send({
                            "name": "Cuong"
                        })
                        .end((error, response) => {
                            response.should.have.status(200);
                            response.should.be.json;
                            response.body.should.be.a("object");
                            response.body.should.have.property("UPDATED");
                            response.body.UPDATED.should.be.a("object");
                            response.body.UPDATED.should.have.property("_id");
                            response.body.UPDATED.should.have.property("name");
                            response.body.UPDATED.name.should.equal("Cuong");
                            done();
                        });
                })
        })
    })
    //Triển khai test case kiểm thử API Delete product By ID
    describe("DELETE product by Id", () => {
        it("It should delete a Single product on Id DELETE", (done) => {
            chai.request(server)
                .get("/product")
                .end((err, res) => {
                    chai.request(server)
                        .delete("/product" + res.body[0]._id)
                        .end((error, response) => {
                            response.should.have.status(200);
                            response.should.be.json;
                            response.body.should.be.a("object");
                            response.body.should.have.property("REMOVED");
                            response.body.REMOVED.should.be.a("object");
                            response.body.REMOVED.should.have.property("_id");
                            response.body.REMOVED.should.have.property("name");
                            response.body.REMOVED.name.should.equal("Cuong");
                            done();
                        });
                })
        })
    })
})