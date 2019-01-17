import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import bcrypt from "bcryptjs";
import app from "../src";
import pool from "../src/db/connection";

chai.use(chaiHttp);

describe("/User Resources", () => {
  before(done => {
    const users = [
      "bashir",
      "musa",
      "ahmed",
      "bashir@icloud.com",
      "08073372043",
      "bbashir",
      "password",
      true
    ];
    const queryText =
      "INSERT INTO users(firstName,lastName,otherName,email,phoneNumber,username,password,isAdmin) VALUES($1,$2,$3,$4,$5,$6,$7,$8)";
    pool.query("TRUNCATE TABLE users CASCADE");
    pool.query(queryText, users);
    done();
  });
  after(done => {
    pool.query("TRUNCATE TABLE users CASCADE");
    done();
  });
  describe("POST User can create account", () => {
    it("user can create account", done => {
      const testUser = {
        firstName: "sanusi",
        lastName: "sulaiman",
        othername: "muhammad",
        email: "sulaiman@icloud.com",
        phoneNumber: "08073372043",
        username: "ssanusi",
        password: "password",
        confirmPassword: "password",
        isadmin: true
      };
      chai
        .request(app)
        .post("/api/v1/auth/signup")
        .send(testUser)
        .end((err, res) => {
          expect(res).to.have.status(201);
          expect(res.type).to.eql("application/json");
          expect(res.body.status).to.equal(201);
          expect(res.body).to.be.an("object");
          expect(res).to.have.header("Authorization");
          expect(res.body.data[0].user).to.include.keys([
            "firstName",
            "lastName",
            "email",
            "phoneNumber",
            "username",
            "password"
          ]);
          expect(res.body.data[0].user.username).eq(testUser.username);
          expect(res.body.data[0].user.email).to.eq(testUser.email);
          done();
        });
    });
    it("user should get error for missing Firstname", done => {
      const testUser = {
        lastName: "sulaiman",
        othername: "muhammad",
        email: "sulaiman@icloud.com",
        phoneNumber: "08073372043",
        username: "ssanusi",
        password: "password",
        confirmPassword: "password",
        isadmin: true
      };
      chai
        .request(app)
        .post("/api/v1/auth/signup")
        .send(testUser)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.type).to.eql("application/json");
          expect(res.body).to.be.an("object");
          expect(res.body.error.firstName).eql("FirstName is Required");
          done();
        });
    });
    it("user should get error for missing lastName", done => {
      const testUser = {
        firstName: "sanusi",
        othername: "muhammad",
        email: "sulaiman@icloud.com",
        phoneNumber: "08073372043",
        username: "ssanusi",
        password: "password",
        confirmPassword: "password",
        isadmin: true
      };
      chai
        .request(app)
        .post("/api/v1/auth/signup")
        .send(testUser)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.type).to.eql("application/json");
          expect(res.body).to.be.an("object");
          expect(res.body.error.lastName).eql("LastName is Required");
          done();
        });
    });
    it("user should get error for missing email", done => {
      const testUser = {
        firstName: "sanusi",
        lastName: "sulaiman",
        othername: "muhammad",
        phoneNumber: "08073372043",
        username: "ssanusi",
        password: "password",
        confirmPassword: "password",
        isadmin: true
      };
      chai
        .request(app)
        .post("/api/v1/auth/signup")
        .send(testUser)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.type).to.eql("application/json");
          expect(res.body).to.be.an("object");
          expect(res.body.error.email).eql("Email is Required");
          done();
        });
    });
    it("user should get error for missing phone Number", done => {
      const testUser = {
        firstName: "sanusi",
        othername: "muhammad",
        email: "sulaiman@icloud.com",
        username: "ssanusi",
        password: "password",
        confirmPassword: "password",
        isadmin: true
      };
      chai
        .request(app)
        .post("/api/v1/auth/signup")
        .send(testUser)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.type).to.eql("application/json");
          expect(res.body).to.be.an("object");
          expect(res.body.error.phoneNumber).eql("Phone No is Required");
          done();
        });
    });
    it("user should get error for missing phone Number", done => {
      const testUser = {
        firstName: "sanusi",
        othername: "muhammad",
        email: "sulaiman@icloud.com",
        phoneNumber: "08073372043",
        password: "password",
        confirmPassword: "password",
        isadmin: true
      };
      chai
        .request(app)
        .post("/api/v1/auth/signup")
        .send(testUser)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.type).to.eql("application/json");
          expect(res.body).to.be.an("object");
          expect(res.body.error.username).eql("username is Required");
          done();
        });
    });
    it("user should get error for missing phone Number", done => {
      const testUser = {
        firstName: "sanusi",
        othername: "muhammad",
        email: "sulaiman@icloud.com",
        phoneNumber: "08073372043",
        username: "ssanusi",
        confirmPassword: "password",
        isadmin: true
      };
      chai
        .request(app)
        .post("/api/v1/auth/signup")
        .send(testUser)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.type).to.eql("application/json");
          expect(res.body).to.be.an("object");
          expect(res.body.error.password).eql("Password must be identical");
          done();
        });
    });
    it("user should get error for missing phone Number", done => {
      const testUser = {
        firstName: "sanusi",
        othername: "muhammad",
        email: "sulaiman@icloud.com",
        phoneNumber: "08073372043",
        username: "ssanusi",
        isadmin: true
      };
      chai
        .request(app)
        .post("/api/v1/auth/signup")
        .send(testUser)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.type).to.eql("application/json");
          expect(res.body).to.be.an("object");
          expect(res.body.error.password).eql("Password is Required");
          done();
        });
    });
    it("user should get error for invalid email ", done => {
      const testUser = {
        firstName: "sanusi",
        lastName: "sulaiman",
        othername: "muhammad",
        email: "sulaimanicloud.com",
        phoneNumber: "08073372043",
        username: "ssanusi",
        password: "password",
        confirmPassword: "password",
        isadmin: true
      };
      chai
        .request(app)
        .post("/api/v1/auth/signup")
        .send(testUser)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.type).to.eql("application/json");
          expect(res.body).to.be.an("object");
          expect(res.body.error.email).eql("Valid email is Required");
          done();
        });
    });
    it("user can create account", done => {
      const testUser = {
        firstName: "bashir",
        lastName: "musa",
        othername: "ahmed",
        email: "bashir@icloud.com",
        phoneNumber: "08073372043",
        username: "bbashir",
        password: "password",
        confirmPassword: "password",
        isadmin: true
      };
      chai
        .request(app)
        .post("/api/v1/auth/signup")
        .send(testUser)
        .end((err, res) => {
          expect(res).to.have.status(409);
          expect(res.type).to.eql("application/json");
          expect(res.body).to.be.an("object");
          expect(res.body.error).eql("username or email exist");
          done();
        });
    });
  });
});
