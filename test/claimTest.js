import 'babel-polyfill'

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server/server');
let should = chai.should();

chai.use(chaiHttp);

describe('Claim - Authorized user', function () {

    const agent = chai.request.agent(server);

    //before all the tests run, log in
    before(function (done) {
        chai.request(server)
            .post('/api/users')
            .send({
                login: 'ulf',
                password: 'ulf'
            })
            .end(function (err, res) {
                if (err) { return done(err); }

                agent.saveCookies(res);

                done();
            });

    });

    it('/GET claim - it should GET all claims', function (done) {
        const req = chai.request(server).get('/api/claim');

        agent.attachCookies(req);

        req.end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('array');
            res.body.length.should.be.eql(2);
            done();
        });
    });

    it('/PUT claim - It should update claim', function (done) {
        const claim = {
            name: "Gerhard Mustermann",
            email: "gerhard@mustermann.de",
            policyId: 2353423,
            type: 'theft',
            amount: 244,
            dateOccured: '2017-05-06',
            status: 'accepted'
        }

        // Get all claims to obtain claimId
        const claimListReq = chai.request(server).get('/api/claim');

        agent.attachCookies(claimListReq);

        claimListReq.end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('array');
            res.body.length.should.be.eql(2);
            const claimId = res.body[0].id;
            // PUT claim with id
            const req = chai.request(server).put('/api/claim/' + claimId);
            //attach the logged in cookies to the agent
            agent.attachCookies(req);

            req
                .send(claim)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('status').eql('ok');
                    done();
                });

        });

    });
})

describe('Claim - Unauthorized user', () => {

    it('/GET claim - It should return unauthorized', function (done) {
        chai.request(server)
            .get('/api/claim')
            .end((err, res) => {
                res.should.have.status(401);
                done();
            });
    });

    it('/PUT claim - It should return unauthorized', function (done) {
        const claim = {
            name: "Gerhard Mustermann",
            email: "gerhard@mustermann.de",
            policyId: 2353423,
            type: 'theft',
            amount: 244,
            dateOccured: '2017-05-06',
            status: 'new'
        }

        chai.request(server)
            .put('/api/claim/75a453f3-76be-4ca1-b170-a08e95ed3bda')
            .send(claim)
            .end((err, res) => {
                res.should.have.status(401);
                done();
            });



    });

    it('/POST claim - It should POST a claim ', (done) => {
        const claim = {
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