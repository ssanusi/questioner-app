import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../src';

chai.use(chaiHttp);

describe('/Meetups Resources', () => {
  describe('GET /meetups', () => {
    it('should get all meetups', done => {
      chai
        .request(app)
        .get('/api/V1/meetups')
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res).to.be.json;
          expect(res.body.status).to.equal(200);
          expect(res.body.data).to.be.a('array');
          done();
        });
    });
  });
});
