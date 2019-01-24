import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import app from "../src";

chai.use(chaiHttp);
describe("/Meetups Resources", () => {
  let userToken;
  beforeEach(done => {
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
  describe("POST /meetups", () => {
    it("should add a single meetups", done => {
      chai
        .request(app)
        .post("/api/v1/meetups")
        .set("Authorization", userToken)
        .send({
          location: "235 adeola adeku VI lagos",
          topic: "Introduction to CSS3",
          images: ["googgle.com", "msn.com"],
          happeningOn: "2019-01-022T22:48:05.633",
          tags: ["programming", "web", "front-end"]
        })
        .end((err, res) => {
          expect(res).to.have.status(201);
          expect(res.type).to.equal("application/json");
          expect(res.body.status).to.equal(201);
          expect(res.body.data).to.be.a("object");
        });
      done();
    });
    it("should return Location field is Required", done => {
      chai
        .request(app)
        .post("/api/v1/meetups")
        .set("Authorization", userToken)
        .send({
          topic: "Introduction to CSS3",
          happeningOn: "2019-01-022T22:48:05.633",
          tags: ["programming", "web", "front-end"]
        })
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.type).to.equal("application/json");
          expect(res.body.error.location).to.equal("Location field is Required");
          done();
        });
    });
    it("should return Location field is Required if Location is empty", done => {
      chai
        .request(app)
        .post("/api/v1/meetups")
        .set("Authorization", userToken)
        .send({
          location: "",
          topic: "Introduction to CSS3",
          happeningOn: "2019-01-022T22:48:05.633",
          tags: ["programming", "web", "front-end"]
        })
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.type).to.equal("application/json");
          expect(res.body.error.location).to.equal("Location field is Required");
          done();
        });
    });
    it("should return topic field is Required", done => {
      chai
        .request(app)
        .post("/api/v1/meetups")
        .set("Authorization", userToken)
        .send({
          location: "235 adeola adeku VI lagos",
          happeningOn: "2019-01-022T22:48:05.633",
          tags: ["programming", "web", "front-end"]
        })
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.type).to.equal("application/json");
          expect(res.body.error.topic).to.equal("Topic field is Required");
          done();
        });
    });
    it("should return topic field is Required if topic is empty", done => {
      chai
        .request(app)
        .post("/api/v1/meetups")
        .set("Authorization", userToken)
        .send({
          location: "235 adeola adeku VI lagos",
          happeningOn: "2019-01-022T22:48:05.633",
          topic: "",
          tags: ["programming", "web", "front-end"]
        })
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.type).to.equal("application/json");
          expect(res.body.error.topic).to.equal("Topic field is Required");
          done();
        });
    });
    it("should return event date field is Required if its empty", done => {
      chai
        .request(app)
        .post("/api/v1/meetups")
        .set("Authorization", userToken)
        .send({
          location: "235 adeola adeku VI lagos",
          happeningOn: "",
          topic: "Introduction to CSS3",
          tags: ["programming", "web", "front-end"]
        })
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.type).to.equal("application/json");
          expect(res.body.error.happeningOn).to.equal("happeningOn field is Required");
          done();
        });
    });
    it("should return event date field is Required", done => {
      chai
        .request(app)
        .post("/api/v1/meetups")
        .set("Authorization", userToken)
        .send({
          location: "235 adeola adeku VI lagos",
          topic: "Introduction to CSS3",
          tags: ["programming", "web", "front-end"]
        })
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.type).to.equal("application/json");
          expect(res.body.error.happeningOn).to.equal("happeningOn field is Required");
          done();
        });
    });
    it("should return tags field is Required if tags is not passed", done => {
      chai
        .request(app)
        .post("/api/v1/meetups")
        .set("Authorization", userToken)
        .send({
          location: "235 adeola adeku VI lagos",
          topic: "Introduction to CSS3",
          happeningOn: "2019-01-022T22:48:05.633"
        })
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.type).to.equal("application/json");
          expect(res.body.error.tags).to.equal("tags field is Required");
          done();
        });
    });
    it("should return tags field is Required for empty tags", done => {
      chai
        .request(app)
        .post("/api/v1/meetups")
        .set("Authorization", userToken)
        .send({
          topic: "Introduction to CSS3",
          location: "235 adeola adeku VI lagos",
          happeningOn: "2019-01-022T22:48:05.633",
          tags: []
        })
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.type).to.equal("application/json");
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
        .set("Authorization", userToken)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.type).to.equal("application/json");
          expect(res.body.status).to.equal(200);
          expect(res.body.data).to.be.a("array");
          expect(res.body.data[0]).to.include.keys([
            "id",
            "location",
            "topic",
            "happeningon",
            "tags"
          ]);
        });
      done();
    });
  });
  describe("GET /meetups/upcoming", () => {
    it("should get all upcoming meetups", done => {
      chai
        .request(app)
        .get("/api/v1/meetups/upcoming")
        .set("Authorization", userToken)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.type).to.equal("application/json");
          expect(res.body.status).to.equal(200);
          expect(res.body.data).to.be.a("array");
        });
      done();
    });
  });
  describe("GET /meetups/<id>", () => {
    it("should get single meetup by Id", done => {
      chai
        .request(app)
        .get("/api/v1/meetups/1")
        .set("Authorization", userToken)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.type).to.equal("application/json");
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
        });
      done();
    });
  });
  describe("GET /meetups/<id>", () => {
    it("should return error", done => {
      chai
        .request(app)
        .get("/api/v1/meetups/10")
        .set("Authorization", userToken)
        .end((err, res) => {
          expect(res).to.have.status(404);
          expect(res.type).to.equal("application/json");
          expect(res.body.message).to.equal("meetup not found");
          done();
        });
    });
    it("should return error", done => {
      chai
        .request(app)
        .get("/api/v1/meetups/f")
        .set("Authorization", userToken)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.type).to.equal("application/json");
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
        .set("Authorization", userToken)
        .send({
          user: "1",
          topic: "Introduction to javascript",
          status: "no"
        })
        .end((err, res) => {
          expect(res).to.have.status(201);
          expect(res.type).to.equal("application/json");
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
        .set("Authorization", userToken)
        .send({
          user: "1",
          status: "no"
        })
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.type).to.equal("application/json");
          expect(res.body.error.topic).to.equal("Topic field is Required");
          done();
        });
    });
    it("should reply with error when empty Topic is passed", done => {
      chai
        .request(app)
        .post("/api/v1/meetups/1/rsvps")
        .set("Authorization", userToken)
        .send({
          user: "1",
          topic: "",
          status: "no"
        })
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.type).to.equal("application/json");
          expect(res.body.error.topic).to.equal("Topic field is Required");
          done();
        });
    });
    it("should reply with error user field is not passed", done => {
      chai
        .request(app)
        .post("/api/v1/meetups/1/rsvps")
        .set("Authorization", userToken)
        .send({
          topic: "Introduction to javascript",
          status: "no"
        })
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.type).to.equal("application/json");
          expect(res.body.error.user).to.equal("User field is Required");
          done();
        });
    });
    it("should reply with error when empty User is passed", done => {
      chai
        .request(app)
        .post("/api/v1/meetups/1/rsvps")
        .set("Authorization", userToken)
        .send({
          topic: "Introduction to javascript",
          user: "",
          status: "no"
        })
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.type).to.equal("application/json");
          expect(res.body.error.user).to.equal("User field is Required");
          done();
        });
    });
    it("should reply with error status field is not passed", done => {
      chai
        .request(app)
        .post("/api/v1/meetups/1/rsvps")
        .set("Authorization", userToken)
        .send({
          user: "1",
          topic: "Introduction to javascript"
        })
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.type).to.equal("application/json");
          expect(res.body.error.status).to.equal("Status field is Required");
          done();
        });
    });
    it("should reply with error when empty status is passed", done => {
      chai
        .request(app)
        .post("/api/v1/meetups/1/rsvps")
        .set("Authorization", userToken)
        .send({
          topic: "Introduction to javascript",
          user: "1",
          status: ""
        })
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.type).to.equal("application/json");
          expect(res.body.error.status).to.equal("Status field is Required");
          done();
        });
    });
    it("should reply with error meetups id field is not passed", done => {
      chai
        .request(app)
        .post("/api/v1/meetups/rsvps")
        .set("Authorization", userToken)
        .send({
          user: "1",
          topic: "Introduction to javascript",
          status: "no"
        })
        .end((err, res) => {
          expect(res).to.have.status(404);
          expect(res.type).to.equal("text/html");
          done();
        });
    });
    it("should reply with error when non numeric id is passed", done => {
      chai
        .request(app)
        .post("/api/v1/meetups/meetupId/rsvps")
        .set("Authorization", userToken)
        .send({
          topic: "Introduction to javascript",
          user: "1",
          status: "no"
        })
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.type).to.equal("application/json");
          expect(res.body.error.id).to.equal("Meetup id must be numeric");
          done();
        });
    });
    it("should reply with error not exit is passed", done => {
      chai
        .request(app)
        .post("/api/v1/meetups/7/rsvps")
        .set("Authorization", userToken)
        .send({
          topic: "Introduction to javascript",
          user: "1",
          status: "yes"
        })
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.type).to.equal("application/json");
          expect(res.body.err.code).to.equal("23503");
          done();
        });
    });
  });

  describe("DELETE /meetup/<id>", () => {
    it("its should delete spesific meetup ", done => {
      chai
        .request(app)
        .del("/api/v1/meetups/3")
        .set("Authorization", userToken)
        .end((err, res) => {
          expect(res.status).to.be.equal(200);
        });
      done();
    });
    it("its should send error deleting spesific meetup ", done => {
      chai
        .request(app)
        .del("/api/v1/meetups/8")
        .set("Authorization", userToken)
        .end((err, res) => {
          expect(res.status).to.be.equal(404);
        });
      done();
    });
  });
});

describe("UnAuthorized", () => {
  it("should respond with no Token provided ", done => {
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
        expect(res).to.have.status(401);
        expect(res.body.error.token).to.equal("no token provided");
      });
    done();
  });
  describe("UnAuthorized", () => {
    it("should respond with UnAuthorized ", done => {
      chai
        .request(app)
        .post("/api/v1/meetups")
        .set("Authorization", "jkdsbfjbsdakfjbsdjkbfjkbdsjfbjsabbjkbkl")
        .send({
          location: "235 adeola adeku VI lagos",
          topic: "Introduction to CSS3",
          images: ["googgle.com", "msn.com"],
          happeningOn: "2019-01-022T22:48:05.633",
          tags: ["programming", "web", "front-end"]
        })
        .end((err, res) => {
          expect(res).to.have.status(401);
          expect(res.body.error.message).to.equal("Unauthorized");
        });
      done();
    });
  });
  describe("User Request Admin Route", () => {
    let userToken;
    beforeEach(done => {
      chai
        .request(app)
        .post("/api/v1/auth/login")
        .send({ email: "testuser@yahoo.com", password: "secret" })
        .end((err, res) => {
          const { authorization } = res.header;
          userToken = authorization;
          done();
        });
    });
    it("should respond with UnAuthorized Admin Route ", done => {
      chai
        .request(app)
        .post("/api/v1/meetups")
        .set("Authorization", userToken)
        .send({
          location: "235 adeola adeku VI lagos",
          topic: "Introduction to CSS3",
          images: ["googgle.com", "msn.com"],
          happeningOn: "2019-01-022T22:48:05.633",
          tags: ["programming", "web", "front-end"]
        })
        .end((err, res) => {
          expect(res).to.have.status(401);
          expect(res.body.message).to.equal("Unauthorized Admin Route");
        });
      done();
    });
  });
});
