import 'babel-polyfill'
// let Book = require('../server/claim/entity/claim');

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server/server');
let should = chai.should();

chai.use(chaiHttp);

describe('/POST user', () => {
    it('It should authenticate to app', (done) => {
        let login = {
            login: "ulf",
            password: "ulf",
        }
        chai.request(server)
            .post('/api/users')
            .send(login)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('authenticate').eql('success');
                done();
            });
    });
    it('It should not autheticate to app', (done) => {
        let login = {
            login: "admin",
            password: "admin",
        }
        chai.request(server)
            .post('/api/users')
            .send(login)
            .end((err, res) => {
                res.should.have.status(401);
                done();
            });
    });
});