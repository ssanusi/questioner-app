import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import app from "../src";

chai.use(chaiHttp);

describe("/User Resources", () => {
  describe("POST User can create account", () => {
    it("user can create account", done => {
      const testUser = {
        firstName: "sanusi",
        lastName: "sulaiman",
        phoneNumber: "08073372043",
        email: "sulaiman@icloud.com",
        username: "ssanusi",
        password: "password",
        confirmPassword: "password"
      };
      chai
        .request(app)
        .post("/api/v1/auth/signup")
        .send(testUser)
        .end((err, res) => {
          expect(res).to.have.status(201);
          expect(res.type).to.equal("application/json");
          expect(res.body.status).to.equal(201);
          expect(res.body).to.be.an("object");
          expect(res).to.have.header("Authorization");
          expect(res.body.data[0].user).to.include.keys([
            "firstname",
            "lastname",
            "email",
            "phonenumber",
            "username"
          ]);
          expect(res.body.data[0].user.username).eq(testUser.username);
          expect(res.body.data[0].user.email).to.eq(testUser.email);
        });
      done();
    });
    it("Admin can create account", done => {
      const testUser = {
        firstName: "admintest",
        lastName: "admintest",
        phoneNumber: "08073372043",
        email: "admintest@icloud.com",
        username: "admintest",
        password: "password",
        confirmPassword: "password"
      };
      chai
        .request(app)
        .post("/api/v1/admin/auth/signup")
        .send(testUser)
        .end((err, res) => {
          expect(res).to.have.status(201);
          expect(res.type).to.equal("application/json");
          expect(res.body.status).to.equal(201);
          expect(res.body).to.be.an("object");
          expect(res).to.have.header("Authorization");
          expect(res.body.data[0].user).to.include.keys([
            "firstname",
            "lastname",
            "email",
            "phonenumber",
            "username"
          ]);
          expect(res.body.data[0].user.username).eq(testUser.username);
          expect(res.body.data[0].user.email).to.eq(testUser.email);
        });
      done();
    });
    it("user should get error for missing email", done => {
      const testUser = {
        firstName: "sanusi",
        lastName: "sulaiman",
        phoneNumber: "08073372043",
        username: "ssanusi",
        password: "password",
        confirmPassword: "password"
      };
      chai
        .request(app)
        .post("/api/v1/auth/signup")
        .send(testUser)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.type).to.equal("application/json");
          expect(res.body).to.be.an("object");
          expect(res.body.error.email).equal("Email is Required");
          done();
        });
    });
    it("user should get error for missing phone Number", done => {
      const testUser = {
        firstName: "sanusi",
        email: "sulaiman@icloud.com",
        username: "ssanusi",
        password: "password",
        confirmPassword: "password"
      };
      chai
        .request(app)
        .post("/api/v1/auth/signup")
        .send(testUser)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.type).to.equal("application/json");
          expect(res.body).to.be.an("object");
          expect(res.body.error.phoneNumber).equal("Phone No is Required");
          done();
        });
    });
    it("user should get error for missing phone Number", done => {
      const testUser = {
        firstName: "sanusi",
        phoneNumber: "08073372043",
        email: "sulaiman@icloud.com",
        password: "password",
        confirmPassword: "password"
      };
      chai
        .request(app)
        .post("/api/v1/auth/signup")
        .send(testUser)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.type).to.equal("application/json");
          expect(res.body).to.be.an("object");
          expect(res.body.error.username).equal("username is Required");
          done();
        });
    });
    it("user should get error for missing phone Number", done => {
      const testUser = {
        firstName: "sanusi",
        phoneNumber: "08073372043",
        email: "sulaiman@icloud.com",
        username: "ssanusi",
        confirmPassword: "password"
      };
      chai
        .request(app)
        .post("/api/v1/auth/signup")
        .send(testUser)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.type).to.equal("application/json");
          expect(res.body).to.be.an("object");
          expect(res.body.error.password).equal("Password must be identical");
          done();
        });
    });
    it("user should get error for missing First Name", done => {
      const testUser = {
        lastName: "sulaiman",
        phoneNumber: "08073372043",
        email: "sulaiman@icloud.com",
        username: "ssanusi",
        password: "password",
        confirmPassword: "password"
      };
      chai
        .request(app)
        .post("/api/v1/auth/signup")
        .send(testUser)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.type).to.equal("application/json");
          expect(res.body).to.be.an("object");
          expect(res.body.error.firstName).equal("FirstName is Required");
          done();
        });
    });
    it("user should get error for missing phone Number", done => {
      const testUser = {
        firstName: "sanusi",
        email: "sulaiman@icloud.com",
        phoneNumber: "08073372043",
        username: "ssanusi"
      };
      chai
        .request(app)
        .post("/api/v1/auth/signup")
        .send(testUser)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.type).to.equal("application/json");
          expect(res.body).to.be.an("object");
          expect(res.body.error.password).equal("Password is Required");
          done();
        });
    });
    it("user should get error for invalid email ", done => {
      const testUser = {
        firstName: "sanusi",
        lastName: "sulaiman",
        phoneNumber: "08073372043",
        email: "sulaimanicloud.com",
        username: "ssanusi",
        password: "password",
        confirmPassword: "password"
      };
      chai
        .request(app)
        .post("/api/v1/auth/signup")
        .send(testUser)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.type).to.equal("application/json");
          expect(res.body).to.be.an("object");
          expect(res.body.error.email).equal("Valid email is Required");
          done();
        });
    });
    it("user should get error duplicate", done => {
      const testUser = {
        firstName: "bashir",
        lastName: "musa",
        phoneNumber: "08073372043",
        email: "bashir@icloud.com",
        username: "bbashir",
        password: "password",
        confirmPassword: "password"
      };
      chai
        .request(app)
        .post("/api/v1/auth/signup")
        .send(testUser)
        .end((err, res) => {
          expect(res).to.have.status(409);
          expect(res.type).to.equal("application/json");
          expect(res.body).to.be.an("object");
          expect(res.body.error).equal("username or email exist");
          done();
        });
    });
  });
  describe("POST User signin", () => {
    it("user can login", done => {
      const testUser = {
        email: "bashir@yahoo.com",
        password: "football"
      };
      chai
        .request(app)
        .post("/api/v1/auth/login")
        .send(testUser)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.type).to.equal("application/json");
          expect(res.body.status).to.equal(200);
          expect(res.body).to.be.an("object");
          expect(res).to.have.header("Authorization");
          done();
        });
    });
    it("user get invalid login", done => {
      const testUser = {
        email: "sulaiman@icloud.com",
        password: "passwordeee"
      };
      chai
        .request(app)
        .post("/api/v1/auth/login")
        .send(testUser)
        .end((err, res) => {
          expect(res).to.have.status(404);
          expect(res.type).to.equal("application/json");
          expect(res.body.status).to.equal(404);
          expect(res.body).to.be.an("object");
          expect(res.body.error).to.equal("invalid credentials");
          done();
        });
    });
    it("user get invalid login", done => {
      const testUser = {
        email: "sulaimanddd@icloud.com",
        password: "passwordeee"
      };
      chai
        .request(app)
        .post("/api/v1/auth/login")
        .send(testUser)
        .end((err, res) => {
          expect(res).to.have.status(404);
          expect(res.type).to.equal("application/json");
          expect(res.body.status).to.equal(404);
          expect(res.body).to.be.an("object");
          expect(res.body.error).to.equal("User not Found");
          done();
        });
    });
  });
});
