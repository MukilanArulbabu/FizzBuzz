require('mocha');
const serverApp = require('../server.js');
const request = require('supertest')(serverApp);

const data = {
    username: 'admin',
    password: 'password'
}
const fData = {
    username: 'admin',
    password: 'dummy'
}

let token;

describe('It shoud not login', () => {
    it('Should fail to get FizzBuzz', (done) => {
        request
        .get('/api/fizzBuzz/10')
        .expect(403)
        .end(done);
    });
    it('Should fail to login', (done) => {
        request
        .post('/api/login')
        .send(fData)
        .expect(403)
        .end(done);
    });
    it('Should login', (done) => {
        request
        .post('/api/login')
        .send(data)
        .expect(200)
        .end((err, res) => {
            token = res.body.token;
            if (err) return done(err);
            return done();
        });
    });
    it('Should run fizzBuzz', (done) => {
        request
        .get('/api/fizzBuzz/10')
        .set('Authorization', `Bearer ${token}`)
        .expect(200)
        .end(done);
    });
    it('Should run fizzBuzz from cache', (done) => {
        request
        .get('/api/fizzBuzz/5')
        .set('Authorization', `Bearer ${token}`)
        .expect(200)
        .end(done);
    });
});