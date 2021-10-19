import request from "supertest";
import app from "../src/app";
import { expect} from "chai";

describe("POST /get", () => {
    it("should return false from assert when no message is found", (done) => {
        request(app).post("/get")
            .field("k", "John Doe")
            .end(function(err, res) {
                expect(res.error).to.be.false;
                done();
            })
            .expect(302);
    });
});

describe("POST /set", () => {
    it("should return false from assert when no message is found", (done) => {
        request(app).post("/set")
            .field("k", "John Doe")
            .field("v", "john@me.com")
            .end(function(err, res) {
                expect(res.error).to.be.false;
                done();
            })
            .expect(302);
        request(app).post("/get")
            .field("k", "John Doe")
            .end(function(err, res) {
                console.log({data: res.body});
                expect(res.body).to.have.property("success", true);
                done();
            })
            .expect(302);

    });
});

describe("POST /delete", () => {
    it("should return false from assert when no message is found", (done) => {
        request(app).post("/delete")
            .field("k", "John Doe")
            .end(function(err, res) {
                expect(res.error).to.be.false;
                done();
            })
            .expect(302);
    });
});

describe("POST /flush", () => {
    it("should return false from assert when no message is found", (done) => {
        request(app).post("/flush")
            .end(function(err, res) {
                expect(res.error).to.be.false;
                done();
            })
            .expect(302);
    });
});

describe("POST /size", () => {
    it("should return false from assert when no message is found", (done) => {
        request(app).post("/size")
            .field("name", "John Doe")
            .field("email", "john@me.com")
            .end(function(err, res) {
                expect(res.error).to.be.false;
                done();
            })
            .expect(302);
    });
});
