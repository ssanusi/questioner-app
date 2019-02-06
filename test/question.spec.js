import chai from "chai";
import chaiHttp from "chai-http";
import app from "../src/index";

const { expect } = chai;

chai.use(chaiHttp);

describe("/Question Resources", () => {
  let userToken;
  before(done => {
    chai
      .request(app)
      .post("/api/v1/auth/login")
      .send({ email: "test@yahoo.com", password: "secret" })
      .end((err, res) => {
        const { authorization } = res.header;
        userToken = authorization;
        done();
      });
  });
  describe("GET /questions", () => {
    it("should get all questions", done => {
      chai
        .request(app)
        .get("/api/v1/questions?id=1")
        .set("Authorization", userToken)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.type).to.equal("application/json");
          expect(res.body.status).to.equal(200);
          expect(res.body.data).to.be.a("array");
          expect(res.body.data.length).to.eq(3);
          done();
        });
    });
  });
  describe("POST /questions", () => {
    it("should add a question", done => {
      chai
        .request(app)
        .post("/api/v1/questions")
        .set("Authorization", userToken)
        .send({
          meetupId: "1",
          title: "what is execution context",
          body: "How can we implement execution cotext"
        })
        .end((err, res) => {
          expect(res).to.have.status(201);
          expect(res.type).to.equal("application/json");
          expect(res.body.status).to.equal(201);
          expect(res.body.data).to.be.a("object");
          expect(res.body.status).to.equal(201);
        });
      done();
    });
    it("should return error meetupId not found", done => {
      chai
        .request(app)
        .post("/api/v1/questions")
        .set("Authorization", userToken)
        .send({
          meetupId: "5",
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
        .set("Authorization", userToken)
        .send({
          meetupId: "1",
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
        .set("Authorization", userToken)
        .send({
          meetupId: "1",
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
    it("should return error for missing meetupId field", done => {
      chai
        .request(app)
        .post("/api/v1/questions")
        .set("Authorization", userToken)
        .send({
          title: "what is closure",
          body: "How can we implement execution cotext"
        })
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.type).to.equal("application/json");
          expect(res.body.error.meetupId).to.equal("meetupId field is required");
          done();
        });
    });
    it("should return error for empty meetupId field", done => {
      chai
        .request(app)
        .post("/api/v1/questions")
        .set("Authorization", userToken)
        .send({
          title: "what is closure",
          meetupId: "",
          body: "How can we implement execution cotext"
        })
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.type).to.equal("application/json");
          expect(res.body.error.meetupId).to.equal("meetupId field is required");
          done();
        });
    });
    it("should return error for missing body field", done => {
      chai
        .request(app)
        .post("/api/v1/questions")
        .set("Authorization", userToken)
        .send({
          title: "what is closure",
          meetupId: "1"
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
        .set("Authorization", userToken)
        .send({
          title: "what is closure",
          meetupId: "1",
          body: ""
        })
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.type).to.equal("application/json");
          expect(res.body.error.body).to.equal("body field is required");
          done();
        });
    });
    it("should return error meetupId does not exit ", done => {
      chai
        .request(app)
        .post("/api/v1/questions")
        .set("Authorization", userToken)
        .send({
          title: "what is closure",
          meetupId: "10",
          body: "nkdsfbdsfjnsdaknsnfsdnfknakdnkldsnaknfsd"
        })
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.type).to.equal("application/json");
        });
      done();
    });
    it("should return error meetupId should be a number  ", done => {
      chai
        .request(app)
        .post("/api/v1/questions")
        .set("Authorization", userToken)
        .send({
          title: "what is closure",
          meetupId: "me",
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
        .set("Authorization", userToken)
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
    it("should return error", done => {
      chai
        .request(app)
        .get("/api/v1/questions/9")
        .set("Authorization", userToken)
        .end((err, res) => {
          expect(res).to.have.status(404);
          expect(res.type).to.equal("application/json");
          expect(res.body.message).to.equal("question not found");
          done();
        });
    });
  });
  // describe("GET /questions/<id>", () => {

  // });
  describe("PATCH /questions/<id>/upvote", () => {
    it("should upvote a question", done => {
      chai
        .request(app)
        .patch("/api/v1/questions/1/upvote")
        .set("Authorization", userToken)
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
        .set("Authorization", userToken)
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
        .set("Authorization", userToken)
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
        .set("Authorization", userToken)
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
        .set("Authorization", userToken)
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
