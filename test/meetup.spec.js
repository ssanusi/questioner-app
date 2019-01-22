import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import app from "../src";
import db from "../src/db";

chai.use(chaiHttp);
describe("/Meetups Resources", () => {
  describe("POST /meetups", () => {
    it("should add a single meetups", done => {
      chai
        .request(app)
        .post("/api/v1/meetups")
        .send({
          location: "235 adeola adeku VI lagos",
          topic: "Introduction to CSS3",
          images: ["googgle.com", "msn.com"],
          happeningOn: "2019-01-022T22:48:05.633",
          tags: ["programming", "web", "front-end"]
        })
        .end((err, res) => {
          expect(res).to.have.status(201);
          expect(res.type).to.eql("application/json");
          expect(res.body.status).to.equal(201);
          expect(res.body.data).to.be.a("object");
          done();
        });
    });
    it("should return Location field is Required", done => {
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
          expect(res.body.error.location).to.equal("Location field is Required");
          done();
        });
    });
    it("should return Location field is Required if Location is empty", done => {
      chai
        .request(app)
        .post("/api/v1/meetups")
        .send({
          location: "",
          topic: "Introduction to CSS3",
          happeningOn: "2019-01-022T22:48:05.633",
          tags: ["programming", "web", "front-end"]
        })
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.type).to.eql("application/json");
          expect(res.body.error.location).to.equal("Location field is Required");
          done();
        });
    });
    it("should return topic field is Required", done => {
      chai
        .request(app)
        .post("/api/v1/meetups")
        .send({
          location: "235 adeola adeku VI lagos",
          happeningOn: "2019-01-022T22:48:05.633",
          tags: ["programming", "web", "front-end"]
        })
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.type).to.eql("application/json");
          expect(res.body.error.topic).to.equal("Topic field is Required");
          done();
        });
    });
    it("should return topic field is Required if topic is empty", done => {
      chai
        .request(app)
        .post("/api/v1/meetups")
        .send({
          location: "235 adeola adeku VI lagos",
          happeningOn: "2019-01-022T22:48:05.633",
          topic: "",
          tags: ["programming", "web", "front-end"]
        })
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.type).to.eql("application/json");
          expect(res.body.error.topic).to.equal("Topic field is Required");
          done();
        });
    });
    it("should return event date field is Required if its empty", done => {
      chai
        .request(app)
        .post("/api/v1/meetups")
        .send({
          location: "235 adeola adeku VI lagos",
          happeningOn: "",
          topic: "Introduction to CSS3",
          tags: ["programming", "web", "front-end"]
        })
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.type).to.eql("application/json");
          expect(res.body.error.happeningOn).to.equal("happeningOn field is Required");
          done();
        });
    });
    it("should return event date field is Required", done => {
      chai
        .request(app)
        .post("/api/v1/meetups")
        .send({
          location: "235 adeola adeku VI lagos",
          topic: "Introduction to CSS3",
          tags: ["programming", "web", "front-end"]
        })
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.type).to.eql("application/json");
          expect(res.body.error.happeningOn).to.equal("happeningOn field is Required");
          done();
        });
    });
    it("should return tags field is Required if tags is not passed", done => {
      chai
        .request(app)
        .post("/api/v1/meetups")
        .send({
          location: "235 adeola adeku VI lagos",
          topic: "Introduction to CSS3",
          happeningOn: "2019-01-022T22:48:05.633"
        })
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.type).to.eql("application/json");
          expect(res.body.error.tags).to.equal("tags field is Required");
          done();
        });
    });
    it("should return tags field is Required for empty tags", done => {
      chai
        .request(app)
        .post("/api/v1/meetups")
        .send({
          topic: "Introduction to CSS3",
          location: "235 adeola adeku VI lagos",
          happeningOn: "2019-01-022T22:48:05.633",
          tags: []
        })
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.type).to.eql("application/json");
          expect(res.body.error.tags).to.equal("tags field is Required");
          done();
        });
    });
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
          expect(res.body.data[0]).to.include.keys([
            "id",
            "location",
            "topic",
            "happeningon",
            "tags"
          ]);
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
            "happeningon",
            "tags"
          ]);
          done();
        });
    });
  });
  describe("GET /meetups/<id>", () => {
    it("should return error", done => {
      chai
        .request(app)
        .get("/api/v1/meetups/10")
        .end((err, res) => {
          expect(res).to.have.status(404);
          expect(res.type).to.eql("application/json");
          expect(res.body.message).to.equal("meetup not found");
          done();
        });
    });
    it("should return error", done => {
      chai
        .request(app)
        .get("/api/v1/meetups/f")
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.type).to.eql("application/json");
          expect(res.body.err.code).to.equal("22P02");
          done();
        });
    });
  });

  describe("POST /meetups/<id>/rsvps", () => {
    it("should rsvp a meetup by Id", done => {
      chai
        .request(app)
        .post("/api/v1/meetups/1/rsvps")
        .send({
          user: "1",
          topic: "Introduction to javascript",
          status: "no"
        })
        .end((err, res) => {
          expect(res).to.have.status(201);
          expect(res.type).to.eql("application/json");
          expect(res.body.status).to.equal(201);
          expect(res.body.data).to.be.a("array");
          expect(res.body.data.length).to.eq(1);
          done();
        });
    });
  });
  describe("GET /meetups/<id>/rsvps", () => {
    it("should reply with error Topic is not passed", done => {
      chai
        .request(app)
        .post("/api/v1/meetups/1/rsvps")
        .send({
          user: "1",
          status: "no"
        })
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.type).to.eql("application/json");
          expect(res.body.error.topic).to.eql("Topic field is Required");
          done();
        });
    });
    it("should reply with error when empty Topic is passed", done => {
      chai
        .request(app)
        .post("/api/v1/meetups/1/rsvps")
        .send({
          user: "1",
          topic: "",
          status: "no"
        })
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.type).to.eql("application/json");
          expect(res.body.error.topic).to.eql("Topic field is Required");
          done();
        });
    });
    it("should reply with error user field is not passed", done => {
      chai
        .request(app)
        .post("/api/v1/meetups/1/rsvps")
        .send({
          topic: "Introduction to javascript",
          status: "no"
        })
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.type).to.eql("application/json");
          expect(res.body.error.user).to.eql("User field is Required");
          done();
        });
    });
    it("should reply with error when empty User is passed", done => {
      chai
        .request(app)
        .post("/api/v1/meetups/1/rsvps")
        .send({
          topic: "Introduction to javascript",
          user: "",
          status: "no"
        })
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.type).to.eql("application/json");
          expect(res.body.error.user).to.eql("User field is Required");
          done();
        });
    });
    it("should reply with error status field is not passed", done => {
      chai
        .request(app)
        .post("/api/v1/meetups/1/rsvps")
        .send({
          user: "1",
          topic: "Introduction to javascript"
        })
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.type).to.eql("application/json");
          expect(res.body.error.status).to.eql("Status field is Required");
          done();
        });
    });
    it("should reply with error when empty status is passed", done => {
      chai
        .request(app)
        .post("/api/v1/meetups/1/rsvps")
        .send({
          topic: "Introduction to javascript",
          user: "1",
          status: ""
        })
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.type).to.eql("application/json");
          expect(res.body.error.status).to.eql("Status field is Required");
          done();
        });
    });
    it("should reply with error meetups id field is not passed", done => {
      chai
        .request(app)
        .post("/api/v1/meetups/rsvps")
        .send({
          user: "1",
          topic: "Introduction to javascript",
          status: "no"
        })
        .end((err, res) => {
          expect(res).to.have.status(404);
          expect(res.type).to.eql("text/html");
          done();
        });
    });
    it("should reply with error when non numeric id is passed", done => {
      chai
        .request(app)
        .post("/api/v1/meetups/meetupId/rsvps")
        .send({
          topic: "Introduction to javascript",
          user: "1",
          status: "no"
        })
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.type).to.eql("application/json");
          expect(res.body.error.id).to.eql("Meetup id must be numeric");
          done();
        });
    });
    it("should reply with error not exit is passed", done => {
      chai
        .request(app)
        .post("/api/v1/meetups/7/rsvps")
        .send({
          topic: "Introduction to javascript",
          user: "1",
          status: "yes"
        })
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.type).to.eql("application/json");
          expect(res.body.err.code).to.equal("23503");
          done();
        });
    });
  });
});
