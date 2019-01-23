import chai from "chai";
import chaiHttp from "chai-http";
import app from "../src/index";

const { expect } = chai;

chai.use(chaiHttp);

describe("/Question Resources", () => {
  describe("GET /questions", () => {
    it("should get all questions", done => {
      chai
        .request(app)
        .get("/api/v1/questions")
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.type).to.equal("application/json");
          expect(res.body.status).to.equal(200);
          expect(res.body.data).to.be.a("array");
          expect(res.body.data.length).to.eq(5);
          done();
        });
    });
  });
  describe("POST /questions", () => {
    it("should add a question", done => {
      chai
        .request(app)
        .post("/api/v1/questions")
        .send({
          user: "1",
          meetup: "1",
          title: "what is execution context",
          body: "How can we implement execution cotext"
        })
        .end((err, res) => {
          expect(res).to.have.status(201);
          expect(res.type).to.equal("application/json");
          expect(res.body.status).to.equal(201);
          expect(res.body.data).to.be.a("object");
          done();
        });
    });
    it("should return error Meetup not found", done => {
      chai
        .request(app)
        .post("/api/v1/questions")
        .send({
          user: "1",
          meetup: "5",
          title: "what is execution context",
          body: "How can we implement execution cotext"
        })
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.type).to.equal("application/json");
          expect(res.body).to.be.a("object");
        });
      done();
    });
    it("should return error for missing title field", done => {
      chai
        .request(app)
        .post("/api/v1/questions")
        .send({
          user: "1",
          meetup: "1",
          body: "How can we implement execution cotext"
        })
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.type).to.equal("application/json");
          expect(res.body.error.title).to.equal("title field is required");
          done();
        });
    });
    it("should return error for empty title field", done => {
      chai
        .request(app)
        .post("/api/v1/questions")
        .send({
          user: "1",
          meetup: "1",
          body: "How can we implement execution cotext",
          title: ""
        })
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.type).to.equal("application/json");
          expect(res.body.error.title).to.equal("title field is required");
          done();
        });
    });
    it("should return error for missing user field", done => {
      chai
        .request(app)
        .post("/api/v1/questions")
        .send({
          title: "what is closure",
          topic: "what is execution context",
          body: "How can we implement execution cotext"
        })
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.type).to.equal("application/json");
          expect(res.body.error.user).to.equal("user field is required");
          done();
        });
    });
    it("should return error for empty user field", done => {
      chai
        .request(app)
        .post("/api/v1/questions")
        .send({
          user: "",
          title: "what is closure",
          topic: "what is execution context",
          body: "How can we implement execution cotext"
        })
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.type).to.equal("application/json");
          expect(res.body.error.user).to.equal("user field is required");
          done();
        });
    });
    it("should return error for missing meetup field", done => {
      chai
        .request(app)
        .post("/api/v1/questions")
        .send({
          user: "1",
          title: "what is closure",
          body: "How can we implement execution cotext"
        })
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.type).to.equal("application/json");
          expect(res.body.error.meetup).to.equal("meetup field is required");
          done();
        });
    });
    it("should return error for empty meetup field", done => {
      chai
        .request(app)
        .post("/api/v1/questions")
        .send({
          user: "1",
          title: "what is closure",
          meetup: "",
          body: "How can we implement execution cotext"
        })
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.type).to.equal("application/json");
          expect(res.body.error.meetup).to.equal("meetup field is required");
          done();
        });
    });
    it("should return error for missing body field", done => {
      chai
        .request(app)
        .post("/api/v1/questions")
        .send({
          user: "1",
          title: "what is closure",
          meetup: "1"
        })
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.type).to.equal("application/json");
          expect(res.body.error.body).to.equal("body field is required");
          done();
        });
    });
    it("should return error for empty body field", done => {
      chai
        .request(app)
        .post("/api/v1/questions")
        .send({
          user: "1",
          title: "what is closure",
          meetup: "1",
          body: ""
        })
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.type).to.equal("application/json");
          expect(res.body.error.body).to.equal("body field is required");
          done();
        });
    });
    it("should return error user does not exit ", done => {
      chai
        .request(app)
        .post("/api/v1/questions")
        .send({
          user: "10",
          title: "what is closure",
          meetup: "1",
          body: "nkdsfbdsfjnsdaknsnfsdnfknakdnkldsnaknfsd"
        })
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.type).to.equal("application/json");
        });
      done();
    });
    it("should return error meetup does not exit ", done => {
      chai
        .request(app)
        .post("/api/v1/questions")
        .send({
          user: "1",
          title: "what is closure",
          meetup: "10",
          body: "nkdsfbdsfjnsdaknsnfsdnfknakdnkldsnaknfsd"
        })
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.type).to.equal("application/json");
        });
      done();
    });
    it("should return error user should be a number  ", done => {
      chai
        .request(app)
        .post("/api/v1/questions")
        .send({
          user: "me",
          title: "what is closure",
          meetup: "10",
          body: "nkdsfbdsfjnsdaknsnfsdnfknakdnkldsnaknfsd"
        })
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.type).to.equal("application/json");
          done();
        });
    });
    it("should return error meetup should be a number  ", done => {
      chai
        .request(app)
        .post("/api/v1/questions")
        .send({
          user: "1",
          title: "what is closure",
          meetup: "me",
          body: "nkdsfbdsfjnsdaknsnfsdnfknakdnkldsnaknfsd"
        })
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.type).to.equal("application/json");
          done();
        });
    });
  });
  describe("GET /questions/<id>", () => {
    it("should get single question by Id", done => {
      chai
        .request(app)
        .get("/api/v1/questions/1")
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.type).to.equal("application/json");
          expect(res.body.status).to.equal(200);
          expect(res.body.data).to.be.a("array");
          expect(res.body.data.length).to.eq(1);
          expect(res.body.data[0].id).to.eq(1);
          done();
        });
    });
  });
  describe("GET /questions/<id>", () => {
    it("should return error", done => {
      chai
        .request(app)
        .get("/api/v1/questions/9")
        .end((err, res) => {
          expect(res).to.have.status(404);
          expect(res.type).to.equal("application/json");
          expect(res.body.message).to.equal("question not found");
          done();
        });
    });
  });
  describe("PATCH /questions/<id>/upvote", () => {
    it("should upvote a question", done => {
      chai
        .request(app)
        .patch("/api/v1/questions/1/upvote")
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.type).to.equal("application/json");
          expect(res.body.status).to.equal(200);
          expect(res.body.data).to.be.a("object");
          done();
        });
    });
  });
  describe("PATCH /questions/<id>/upvote", () => {
    it("should return error ", done => {
      chai
        .request(app)
        .patch("/api/v1/questions/10/upvote")
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.type).to.equal("application/json");
          expect(res.body.data).to.be.a("undefined");
          expect(res.body.message).to.equal("question not found");
          done();
        });
    });
  });
  describe("PATCH /questions/<id>/downvote", () => {
    it("should return vote non-negetive after downvote a question", done => {
      chai
        .request(app)
        .patch("/api/v1/questions/1/downvote")
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.type).to.equal("application/json");
          expect(res.body.status).to.equal(200);
          expect(res.body.data).to.be.a("object");
          done();
        });
    });
  });
  describe("PATCH /questions/<id>/downvote", () => {
    it("should downvote a question", done => {
      chai
        .request(app)
        .patch("/api/v1/questions/3/downvote")
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.type).to.equal("application/json");
          expect(res.body.status).to.equal(200);
          expect(res.body.data).to.be.a("object");
          done();
        });
    });
  });
  describe("PATCH /questions/<id>/downvote", () => {
    it("should return error", done => {
      chai
        .request(app)
        .patch("/api/v1/questions/10/downvote")
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.type).to.equal("application/json");
          expect(res.body.data).to.be.a("undefined");
          expect(res.body.message).to.equal("question not found");
          done();
        });
    });
  });
});
