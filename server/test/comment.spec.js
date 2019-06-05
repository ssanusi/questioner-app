import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../src';

chai.use(chaiHttp);
describe('/Comment Resourse', () => {
  let userToken;
  beforeEach((done) => {
    chai
      .request(app)
      .post('/api/v1/auth/login')
      .send({ email: 'admin@yahoo.com', password: 'adminsecret' })
      .end((err, res) => {
        const { authorization } = res.header;
        userToken = authorization;
        done();
      });
  });
  describe('Post Comment', () => {
    it('Should post comment to a question', (done) => {
      chai
        .request(app)
        .post('/api/v1/comments')
        .set('Authorization', userToken)
        .send({
          userId: '1',
          questionId: '1',
          comment: 'what is execution context fdfdsfsddsfdof javacript'
        })
        .end((err, res) => {
          expect(res).to.have.status(201);
          expect(res.type).to.equal('application/json');
          expect(res.body.status).to.equal(201);
          done();
        });
    });
    it('Should respond with error  to a question', (done) => {
      chai
        .request(app)
        .post('/api/v1/comments')
        .set('Authorization', userToken)
        .send({
          userId: '1',
          questionId: '10',
          comment: 'what is execution context fdfdsfsddsfdof javacript'
        })
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.type).to.equal('application/json');
          expect(res.body.message).to.equal('question does not exist');
          done();
        });
    });
    it('Should respond with error  to a question', (done) => {
      chai
        .request(app)
        .post('/api/v1/comments')
        .set('Authorization', userToken)
        .send({
          userId: '1',
          comment: 'what is execution context fdfdsfsddsfdof javacript'
        })
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.type).to.equal('application/json');
          expect(res.body.error.questionId).to.equal('quetionId is Required');
          done();
        });
    });
    it('Should respond with error  to a question', (done) => {
      chai
        .request(app)
        .post('/api/v1/comments')
        .set('Authorization', userToken)
        .send({
          userId: '1',
          questionId: 'm',
          comment: 'what is execution context fdfdsfsddsfdof javacript'
        })
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.type).to.equal('application/json');
          expect(res.body.error.questionId).to.equal('questionId should be numeric');
          done();
        });
    });
    it('Should respond with error to a question', (done) => {
      chai
        .request(app)
        .post('/api/v1/comments')
        .set('Authorization', userToken)
        .send({
          questionId: '10',
          comment: 'what is execution context fdfdsfsddsfdof javacript'
        })
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.type).to.equal('application/json');
          done();
        });
    });
    it('Should respond with error to a question', (done) => {
      chai
        .request(app)
        .post('/api/v1/comments')
        .set('Authorization', userToken)
        .send({
          userId: '1',
          questionId: '1',
        })
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.type).to.equal('application/json');
          expect(res.body.error.comment).to.equal('comment field is required');
          done();
        });
    });
  });

  describe('GET /comments', () => {
    it('Should get all comments for a specific question', (done) => {
      chai
        .request(app)
        .get('/api/v1/comments?questionId=1')
        .set('Authorization', userToken)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.type).to.equal('application/json');
          done();
        });
    });
    it('Should return error comments not found question', (done) => {
      chai
        .request(app)
        .get('/api/v1/comments?questionId=th')
        .set('Authorization', userToken)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.type).to.equal('application/json');
          done();
        });
    });
  });
});
