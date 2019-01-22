



describe("/User Resources", () => {
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
          console.log(res.body)
          expect(res).to.have.status(201);
          expect(res.type).to.eql("application/json");
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
          done();
        });
    });
    // it("user should get error for missing Firstname", done => {
    //   const testUser = {
    //     lastName: "sulaiman",
    //     othername: "muhammad",
    //     email: "sulaiman@icloud.com",
    //     phoneNumber: "08073372043",
    //     username: "ssanusi",
    //     password: "password",
    //     confirmPassword: "password",
    //     isadmin: true
    //   };
    //   chai
    //     .request(app)
    //     .post("/api/v1/auth/signup")
    //     .send(testUser)
    //     .end((err, res) => {
    //       expect(res).to.have.status(400);
    //       expect(res.type).to.eql("application/json");
    //       expect(res.body).to.be.an("object");
    //       expect(res.body.error.firstName).eql("FirstName is Required");
    //       done();
    //     });
    // });
    // it("user should get error for missing lastName", done => {
    //   const testUser = {
    //     firstName: "sanusi",
    //     othername: "muhammad",
    //     email: "sulaiman@icloud.com",
    //     phoneNumber: "08073372043",
    //     username: "ssanusi",
    //     password: "password",
    //     confirmPassword: "password",
    //     isadmin: true
    //   };
    //   chai
    //     .request(app)
    //     .post("/api/v1/auth/signup")
    //     .send(testUser)
    //     .end((err, res) => {
    //       expect(res).to.have.status(400);
    //       expect(res.type).to.eql("application/json");
    //       expect(res.body).to.be.an("object");
    //       expect(res.body.error.lastName).eql("LastName is Required");
    //       done();
    //     });
    // });
    // it("user should get error for missing email", done => {
    //   const testUser = {
    //     firstName: "sanusi",
    //     lastName: "sulaiman",
    //     othername: "muhammad",
    //     phoneNumber: "08073372043",
    //     username: "ssanusi",
    //     password: "password",
    //     confirmPassword: "password",
    //     isadmin: true
    //   };
    //   chai
    //     .request(app)
    //     .post("/api/v1/auth/signup")
    //     .send(testUser)
    //     .end((err, res) => {
    //       expect(res).to.have.status(400);
    //       expect(res.type).to.eql("application/json");
    //       expect(res.body).to.be.an("object");
    //       expect(res.body.error.email).eql("Email is Required");
    //       done();
    //     });
    // });
    // it("user should get error for missing phone Number", done => {
    //   const testUser = {
    //     firstName: "sanusi",
    //     othername: "muhammad",
    //     email: "sulaiman@icloud.com",
    //     username: "ssanusi",
    //     password: "password",
    //     confirmPassword: "password",
    //     isadmin: true
    //   };
    //   chai
    //     .request(app)
    //     .post("/api/v1/auth/signup")
    //     .send(testUser)
    //     .end((err, res) => {
    //       expect(res).to.have.status(400);
    //       expect(res.type).to.eql("application/json");
    //       expect(res.body).to.be.an("object");
    //       expect(res.body.error.phoneNumber).eql("Phone No is Required");
    //       done();
    //     });
    // });
    // it("user should get error for missing phone Number", done => {
    //   const testUser = {
    //     firstName: "sanusi",
    //     othername: "muhammad",
    //     email: "sulaiman@icloud.com",
    //     phoneNumber: "08073372043",
    //     password: "password",
    //     confirmPassword: "password",
    //     isadmin: true
    //   };
    //   chai
    //     .request(app)
    //     .post("/api/v1/auth/signup")
    //     .send(testUser)
    //     .end((err, res) => {
    //       expect(res).to.have.status(400);
    //       expect(res.type).to.eql("application/json");
    //       expect(res.body).to.be.an("object");
    //       expect(res.body.error.username).eql("username is Required");
    //       done();
    //     });
    // });
    // it("user should get error for missing phone Number", done => {
    //   const testUser = {
    //     firstName: "sanusi",
    //     othername: "muhammad",
    //     email: "sulaiman@icloud.com",
    //     phoneNumber: "08073372043",
    //     username: "ssanusi",
    //     confirmPassword: "password",
    //     isadmin: true
    //   };
    //   chai
    //     .request(app)
    //     .post("/api/v1/auth/signup")
    //     .send(testUser)
    //     .end((err, res) => {
    //       expect(res).to.have.status(400);
    //       expect(res.type).to.eql("application/json");
    //       expect(res.body).to.be.an("object");
    //       expect(res.body.error.password).eql("Password must be identical");
    //       done();
    //     });
    // });
    // it("user should get error for missing phone Number", done => {
    //   const testUser = {
    //     firstName: "sanusi",
    //     othername: "muhammad",
    //     email: "sulaiman@icloud.com",
    //     phoneNumber: "08073372043",
    //     username: "ssanusi",
    //     isadmin: true
    //   };
    //   chai
    //     .request(app)
    //     .post("/api/v1/auth/signup")
    //     .send(testUser)
    //     .end((err, res) => {
    //       expect(res).to.have.status(400);
    //       expect(res.type).to.eql("application/json");
    //       expect(res.body).to.be.an("object");
    //       expect(res.body.error.password).eql("Password is Required");
    //       done();
    //     });
    // });
    // it("user should get error for invalid email ", done => {
    //   const testUser = {
    //     firstName: "sanusi",
    //     lastName: "sulaiman",
    //     othername: "muhammad",
    //     email: "sulaimanicloud.com",
    //     phoneNumber: "08073372043",
    //     username: "ssanusi",
    //     password: "password",
    //     confirmPassword: "password",
    //     isadmin: true
    //   };
    //   chai
    //     .request(app)
    //     .post("/api/v1/auth/signup")
    //     .send(testUser)
    //     .end((err, res) => {
    //       expect(res).to.have.status(400);
    //       expect(res.type).to.eql("application/json");
    //       expect(res.body).to.be.an("object");
    //       expect(res.body.error.email).eql("Valid email is Required");
    //       done();
    //     });
    // });
    //
  });

  // describe("POST User signin", () => {
  //   it("user can login", done => {
  //     const testUser = {
  //       email: "sulaiman@icloud.com",
  //       password: "password"
  //     };
  //     chai
  //       .request(app)
  //       .post("/api/v1/auth/login")
  //       .send(testUser)
  //       .end((err, res) => {
  //         expect(res).to.have.status(200);
  //         expect(res.type).to.eql("application/json");
  //         expect(res.body.status).to.equal(200);
  //         expect(res.body).to.be.an("object");
  //         expect(res).to.have.header("Authorization");
  //         done();
  //       });
  //   });
  //   it("user get invalid login", done => {
  //     const testUser = {
  //       email: "sulaiman@icloud.com",
  //       password: "passwordeee"
  //     };
  //     chai
  //       .request(app)
  //       .post("/api/v1/auth/login")
  //       .send(testUser)
  //       .end((err, res) => {
  //         expect(res).to.have.status(404);
  //         expect(res.type).to.eql("application/json");
  //         expect(res.body.status).to.equal(404);
  //         expect(res.body).to.be.an("object");
  //         expect(res.body.error).to.equal("invalid credentials");
  //         done();
  //       });
  //   });
  //   it("user get invalid login", done => {
  //     const testUser = {
  //       email: "sulaimanddd@icloud.com",
  //       password: "passwordeee"
  //     };
  //     chai
  //       .request(app)
  //       .post("/api/v1/auth/login")
  //       .send(testUser)
  //       .end((err, res) => {
  //         expect(res).to.have.status(404);
  //         expect(res.type).to.eql("application/json");
  //         expect(res.body.status).to.equal(404);
  //         expect(res.body).to.be.an("object");
  //         expect(res.body.error).to.equal("User not Found");
  //         done();
  //       });
  //   });
  // });
});
