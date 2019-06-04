import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../src';

chai.use(chaiHttp);

describe('/User Resources', () => {
  describe('POST User can create account', () => {
    it('user  can create account', (done) => {
      const testUser = {
        fullName: 'sanusi sulaiman',
        email: 'sulaimantest@andela.com',
        password: 'password',
        confirmPassword: 'password',
      };
      chai
        .request(app)
        .post('/api/v1/auth/signup')
        .send(testUser)
        .end((err, res) => {
          expect(res).to.have.status(201);
        });
      done();
    });
    it('Admin can create account', (done) => {
      const adminUser = {
        fullName: 'admin test',
        email: 'admintest@andela.com',
        password: 'password',
        confirmPassword: 'password',
      };
      chai
        .request(app)
        .post('/api/v1/admin/auth/signup')
        .send(adminUser)
        .end((err, res) => {
          expect(res).to.have.status(201);
        });
      done();
    });
    it('user should get error for missing email', (done) => {
      const testUser = {
        fullName: 'sanusi sanusi',
        password: 'password',
        confirmPassword: 'password',
      };
      chai
        .request(app)
        .post('/api/v1/auth/signup')
        .send(testUser)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.type).to.equal('application/json');
          expect(res.body).to.be.an('object');
          expect(res.body.error.email).equal('Email is Required');
          done();
        });
    });
    it('user should get error for identical password', (done) => {
      const testUser = {
        fullName: 'sanusi sanusi',
        email: 'sulaiman@icloud.com',
        username: 'ssanusi',
        confirmPassword: 'password',
      };
      chai
        .request(app)
        .post('/api/v1/auth/signup')
        .send(testUser)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.type).to.equal('application/json');
          expect(res.body).to.be.an('object');
          expect(res.body.error.password).equal('Password must be identical');
          done();
        });
    });
    it('user should get error for missing Full Name', (done) => {
      const testUser = {
        email: 'sulaiman@icloud.com',
        password: 'password',
        confirmPassword: 'password',
      };
      chai
        .request(app)
        .post('/api/v1/auth/signup')
        .send(testUser)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.type).to.equal('application/json');
          expect(res.body).to.be.an('object');
          expect(res.body.error.fullName).equal('FullName is Required');
          done();
        });
    });
    it('user should get error for missing password', (done) => {
      const testUser = {
        fullName: 'sanusi',
        email: 'sulaiman@icloud.com',
      };
      chai
        .request(app)
        .post('/api/v1/auth/signup')
        .send(testUser)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.type).to.equal('application/json');
          expect(res.body).to.be.an('object');
          expect(res.body.error.password).equal('Password is Required');
          done();
        });
    });
    it('user should get error for invalid email ', (done) => {
      const testUser = {
        fullName: 'sanusi',
        email: 'sulaimanicloud.com',
        password: 'password',
        confirmPassword: 'password',
      };
      chai
        .request(app)
        .post('/api/v1/auth/signup')
        .send(testUser)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.type).to.equal('application/json');
          expect(res.body).to.be.an('object');
          expect(res.body.error.email).equal('Valid email is Required');
          done();
        });
    });
    it('user should get error duplicate', (done) => {
      const testUser = {
        fullName: 'bashir abdullahi',
        email: 'bashir@yahoo.com',
        password: 'password',
        confirmPassword: 'password',
      };
      chai
        .request(app)
        .post('/api/v1/auth/signup')
        .send(testUser)
        .end((err, res) => {
          expect(res).to.have.status(409);
          expect(res.type).to.equal('application/json');
          expect(res.body).to.be.an('object');
          expect(res.body.error).equal('Account Already exit');
        });
      done();
    });
  });
  describe('POST User signin', () => {
    it('user can login', (done) => {
      const testUser = {
        email: 'bashir@yahoo.com',
        password: 'football',
      };
      chai
        .request(app)
        .post('/api/v1/auth/login')
        .send(testUser)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.type).to.equal('application/json');
          expect(res.body.status).to.equal(200);
          expect(res.body).to.be.an('object');
          expect(res).to.have.header('Authorization');
          done();
        });
    });
    it('user get invalid login', (done) => {
      const testUser = {
        email: 'bashir@yahoo.com',
        password: 'passwordeee',
      };
      chai
        .request(app)
        .post('/api/v1/auth/login')
        .send(testUser)
        .end((err, res) => {
          expect(res).to.have.status(404);
          expect(res.type).to.equal('application/json');
          expect(res.body.status).to.equal(404);
          expect(res.body).to.be.an('object');
          expect(res.body.error).to.equal('invalid credentials');
          done();
        });
    });
    it('user get invalid login', (done) => {
      const testUser = {
        email: 'sulaimanddd@icloud.com',
        password: 'passwordeee',
      };
      chai
        .request(app)
        .post('/api/v1/auth/login')
        .send(testUser)
        .end((err, res) => {
          expect(res).to.have.status(404);
          expect(res.type).to.equal('application/json');
          expect(res.body.status).to.equal(404);
          expect(res.body).to.be.an('object');
          expect(res.body.error).to.equal('Account not Registered');
          done();
        });
    });
  });
  it('User should get Unauthorized', (done) => {
    const testUser = { email: 'testuser@yahoo.com', password: 'secret' };

    chai
      .request(app)
      .post('/api/v1/admin/auth/login')
      .send(testUser)
      .end((err, res) => {
        expect(res).to.have.status(401);
        expect(res.type).to.equal('application/json');
        expect(res.body.status).to.equal(401);
        expect(res.body).to.be.an('object');
        expect(res.body.error).to.equal('Admin only');
        done();
      });
  });
});
