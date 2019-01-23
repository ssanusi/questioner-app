import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import app from "../src";

chai.use(chaiHttp);
describe("/Comment Resourse", () => {
  describe("Post Comment", () => {
    it("Should post comment to a question", done => {
      chai
        .request(app)
        .post("/api/v1/comments")
        .send({
          userId: "1",
          questionId: "1",
          comment: "what is execution context fdfdsfsddsfdof javacript"
        })
        .end((err, res) => {
          expect(res).to.have.status(201);
          expect(res.type).to.equal("application/json");
          expect(res.body.status).to.equal(201);
          done();
        });
    });
    it("Should respond with error  to a question", done => {
      chai
        .request(app)
        .post("/api/v1/comments")
        .send({
          userId: "1",
          questionId: "10",
          comment: "what is execution context fdfdsfsddsfdof javacript"
        })
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.type).to.equal("application/json");
          expect(res.body.message).to.equal("question does not exist");
          done();
        });
    });
    it("Should respond with error  to a question", done => {
      chai
        .request(app)
        .post("/api/v1/comments")
        .send({
          userId: "1",
          comment: "what is execution context fdfdsfsddsfdof javacript"
        })
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.type).to.equal("application/json");
          expect(res.body.error.questionId).to.equal("quetionId is Required");
          done();
        });
    });
    it("Should respond with error  to a question", done => {
      chai
        .request(app)
        .post("/api/v1/comments")
        .send({
          userId: "1",
          questionId: "m",
          comment: "what is execution context fdfdsfsddsfdof javacript"
        })
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.type).to.equal("application/json");
          expect(res.body.error.questionId).to.equal("questionId should be numeric");
          done();
        });
    });
    it("Should respond with error to a question", done => {
      chai
        .request(app)
        .post("/api/v1/comments")
        .send({
          questionId: "10",
          comment: "what is execution context fdfdsfsddsfdof javacript"
        })
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.type).to.equal("application/json");
          expect(res.body.error.userId).to.equal("userId is required");
          done();
        });
    });
    it("Should respond with error to a question", done => {
      chai
        .request(app)
        .post("/api/v1/comments")
        .send({
          userId: "m",
          questionId: "1",
          comment: "what is execution context fdfdsfsddsfdof javacript"
        })
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.type).to.equal("application/json");
          expect(res.body.error.userId).to.equal("userId should be numeric");
          done();
        });
    });
    it("Should respond with error to a question", done => {
      chai
        .request(app)
        .post("/api/v1/comments")
        .send({
          userId: "1",
          questionId: "1",

        })
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.type).to.equal("application/json");
          expect(res.body.error.comment).to.equal("comment field is required");
          done();
        });
    });
  });
});
