import 'babel-polyfill'
// let Book = require('../server/claim/entity/claim');

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server/server');
let should = chai.should();

chai.use(chaiHttp);

// TODO: remove authentication for tests 
// describe('Claims', () => {
//     describe('/GET claim', () => {
//         it('it should GET all the claims', (done) => {
//             chai.request(server)
//                 .get('/api/claim')
//                 .end((err, res) => {
//                     res.should.have.status(200);
//                     res.body.should.be.a('array');
//                     res.body.length.should.be.eql(2);
//                     done();
//                 });
//         });
//     });

// });

describe('/POST claim', () => {
    it('It should POST a claim ', (done) => {
        let claim = {
            name: "Gerhard Mustermann",
            email: "gerhard@mustermann.de",
            policyId: 2353423,
            type: 'theft',
            amount: 244,
            dateOccured: '2017-05-06',
            status: 'new'
        }
        chai.request(server)
            .post('/api/claim')
            .send(claim)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('status').eql('ok');
                done();
            });
    });
});