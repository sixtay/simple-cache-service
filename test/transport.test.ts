import request from "supertest";
import app from "../src/app";
import { expect} from "chai";

describe("POST /set", () => {
    it("should return get set an item when a kv pair is posted to it", (done) => {
        request(app).post("/set")
            .send({k: "jd", v: "John Doe"})
            .end(function(err, res) {
                expect(res.error).to.be.false;
                done();
            })
            .expect(302);
        request(app).post("/get")
            .send({k: "jd"})
            .end(function(err, res) {
                expect(res.body).to.have.property("success", true);
                done();
            })
            .expect(302);

    });
});

describe("POST /delete", () => {
    it("should delete an item in a key", (done) => {
        request(app).post("/set")
            .send({k: "jd", v: "John Doe"})
            .end(function(err, res) {
                expect(res.error).to.be.false;
                done();
            })
            .expect(302);
        request(app).post("/get")
            .send({k: "jd"})
            .end(function(err, res) {
                expect(res.body.payload).to.have.property("value", "John Doe");
                done();
            })
            .expect(302);
        request(app).post("/delete")
            .send({k: "jd"})
            .end(function(err, res) {
                expect(res.error).to.be.false;
                done();
            })
            .expect(302);
        request(app).post("/get")
            .send({k: "jd"})
            .end(function(err, res) {
                expect(res.error).to.be.false;
                expect(res.body.payload).to.have.property("value", null);
                done();
            })
            .expect(302);
    });
});

describe("POST /size", () => {
    it("should return return the size of the cache", (done) => {
        request(app).post("/set")
            .send({k: "jd1", v: "John Doe"})
            .end(function(err, res) {
                expect(res.error).to.be.false;
                done();
            })
            .expect(302);
        request(app).post("/set")
            .send({k: "jd2", v: "John Doe"})
            .end(function(err, res) {
                expect(res.error).to.be.false;
                done();
            })
            .expect(302);
        request(app).post("/set")
            .send({k: "jd3", v: "John Doe"})
            .end(function(err, res) {
                expect(res.error).to.be.false;
                done();
            })
            .expect(302);
        request(app).get("/size")
            .end(function(err, res) {
                expect(res.error).to.be.false;
                expect(res.body.payload).to.have.property("size", 3);
                done();
            })
            .expect(302);

    });
});

describe("POST /flush", () => {
    it("should return empty every item in the cache", (done) => {
        request(app).post("/set")
            .send({k: "jd1", v: "John Doe"})
            .end(function(err, res) {
                expect(res.error).to.be.false;
                done();
            })
            .expect(302);
        request(app).post("/set")
            .send({k: "jd2", v: "John Doe"})
            .end(function(err, res) {
                expect(res.error).to.be.false;
                done();
            })
            .expect(302);
        request(app).post("/set")
            .send({k: "jd3", v: "John Doe"})
            .end(function(err, res) {
                expect(res.error).to.be.false;
                done();
            })
            .expect(302);
        request(app).get("/size")
            .end(function(err, res) {
                expect(res.error).to.be.false;
                expect(res.body.payload).to.have.property("size", 3);
                done();
            })
            .expect(302);
        request(app).get("/flush")
            .end(function(err, res) {
                expect(res.error).to.be.false;
                done();
            })
            .expect(302);
        request(app).get("/size")
            .end(function(err, res) {
                expect(res.error).to.be.false;
                expect(res.body.payload).to.have.property("size", 0);
                done();
            })
            .expect(302);
    });
});
