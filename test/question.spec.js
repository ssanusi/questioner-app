import chai from "chai";
import chaiHttp from "chai-http";
import app from "../src/index";
import questionModel from "../src/api/resourses/question/question.model";

const { expect } = chai;

chai.use(chaiHttp);

describe("/Question Resources", () => {
  beforeEach(done => {
    questionModel.questions = [
      {
        id: 1,
        createdOn: "2019-01-01T22:48:05.633",
        createdBy: 1,
        meetup: 1,
        title: "what is polymorphism?",
        body: "what is polymophism and in what way can we implement it in Javascript",
        votes: 0
      },
      {
        id: 2,
        createdOn: "2019-01-01T22:48:05.633",
        createdBy: 1,
        meetup: 1,
        title: "what is closure?",
        body: "what is closure and in what way can we implement it in Javascript",
        votes: 0
      },
      {
        id: 3,
        createdOn: "2019-01-01T22:48:05.633",
        createdBy: 1,
        meetup: 1,
        title: "what is closure?",
        body: "what is closure and in what way can we implement it in Javascript",
        votes: 0
      }
    ];
    done();
  });
  describe("GET /questions", () => {
    it("should get all questions", done => {
      chai
        .request(app)
        .get("/api/v1/questions")
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.type).to.eql("application/json");
          expect(res.body.status).to.equal(200);
          expect(res.body.data).to.be.a("array");
          expect(res.body.data.length).to.eq(3);
          expect(res.body.data[0]).to.include.keys([
            "id",
            "createdOn",
            "meetup",
            "title",
            "body",
            "votes"
          ]);
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
          user: 1,
          meetup: 1,
          title: "what is execution context",
          body: "How can we implement execution cotext"
        })
        .end((err, res) => {
          expect(res).to.have.status(201);
          expect(res.type).to.eql("application/json");
          expect(res.body.status).to.equal(201);
          expect(res.body.data).to.be.a("array");
          expect(res.body.data.length).to.eq(1);
          expect(res.body.data[0]).to.include.keys(["user", "meetup", "title", "body"]);
          done();
        });
    });
    it("should return error for incomplete meetups", done => {
      chai
        .request(app)
        .post("/api/v1/questions")
        .send({
          user: 1,
          topic: "what is execution context",
          body: "How can we implement execution cotext"
        })
        .end((err, res) => {
          expect(res).to.have.status(404);
          expect(res.type).to.eql("application/json");
          expect(res.body.message).to.equal("All fields are required");
          done();
        });
    });
  });
});