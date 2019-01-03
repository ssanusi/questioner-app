import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import app from "../src";
import meetupModel from "../src/api/resourses/meetup/meetup.model";

chai.use(chaiHttp);

describe("/Meetups Resources", () => {
  beforeEach(done => {
    meetupModel.meetups = [
      {
        id: 1,
        createdOn: "2019-01-01T22:48:05.633Z",
        location: "235 adeola adeku VI lagos",
        topic: "Introduction to Javascript",
        happeningOn: "2019-01-22T18:25:44.913Z",
        tags: ["programming", "web", "front-end"]
      },
      {
        id: 2,
        createdOn: "2019-01-01T22:48:05.633Z",
        location: "235 adeola adeku VI lagos",
        topic: "Introduction to CSS3",
        happeningOn: "2019-01-22T18:25:44.913Z",
        tags: ["programming", "web", "front-end"]
      },
      {
        id: 3,
        createdOn: "2019-01-01T22:48:05.633Z",
        location: "235 adeola adeku VI lagos",
        topic: "Introduction to CSS3",
        happeningOn: "2019-01-02T18:25:44.913Z",
        tags: ["programming", "web", "front-end"]
      }
    ];
    done();
  });
  describe("GET /meetups", () => {
    it("should get all meetups", done => {
      chai
        .request(app)
        .get("/api/v1/meetups")
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.type).to.eql("application/json");
          expect(res.body.status).to.equal(200);
          expect(res.body.data).to.be.a("array");
          expect(res.body.data.length).to.eq(3);
          expect(res.body.data[0]).to.include.keys([
            "id",
            "location",
            "topic",
            "happeningOn",
            "tags"
          ]);
          done();
        });
    });
  });
  describe("POST /meetups", () => {
    it("should add a single meetups", done => {
      chai
        .request(app)
        .post("/api/v1/meetups")
        .send({
          location: "235 adeola adeku VI lagos",
          topic: "Introduction to CSS3",
          happeningOn: "2019-01-022T22:48:05.633",
          tags: ["programming", "web", "front-end"]
        })
        .end((err, res) => {
          expect(res).to.have.status(201);
          expect(res.type).to.eql("application/json");
          expect(res.body.status).to.equal(201);
          expect(res.body.data).to.be.a("array");
          expect(res.body.data.length).to.eq(1);
          expect(res.body.data[0]).to.include.keys(["topic", "location", "happeningOn", "tags"]);
          done();
        });
    });
    it("should return error for incomplete meetups", done => {
      chai
        .request(app)
        .post("/api/v1/meetups")
        .send({
          topic: "Introduction to CSS3",
          happeningOn: "2019-01-022T22:48:05.633",
          tags: ["programming", "web", "front-end"]
        })
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.type).to.eql("application/json");
          expect(res.body.message).to.equal("All fields are required");
          done();
        });
    });
  });
  describe("GET /meetups/upcoming", () => {
    it("should get all upcoming meetups", done => {
      chai
        .request(app)
        .get("/api/v1/meetups/upcoming")
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.type).to.eql("application/json");
          expect(res.body.status).to.equal(200);
          expect(res.body.data).to.be.a("array");
          expect(res.body.data.length).to.eq(2);
          expect(res.body.data[0]).to.include.keys([
            "id",
            "location",
            "topic",
            "happeningOn",
            "tags"
          ]);
          done();
        });
    });
  });
  describe("GET /meetups/<id>", () => {
    it("should get single meetup by Id", done => {
      chai
        .request(app)
        .get("/api/v1/meetups/1")
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.type).to.eql("application/json");
          expect(res.body.status).to.equal(200);
          expect(res.body.data).to.be.a("array");
          expect(res.body.data.length).to.eq(1);
          expect(res.body.data[0].id).to.eq(1);
          expect(res.body.data[0]).to.include.keys([
            "id",
            "location",
            "topic",
            "happeningOn",
            "tags"
          ]);
          done();
        });
    });
  });
  describe("GET /meetups/<id>", () => {
    it("should get single meetup by Id", done => {
      chai
        .request(app)
        .get("/api/v1/meetups/4")
        .end((err, res) => {
          expect(res).to.have.status(404);
          expect(res.type).to.eql("application/json");
          expect(res.body.message).to.equal("meetup not found");
          done();
        });
    });
  });
});
