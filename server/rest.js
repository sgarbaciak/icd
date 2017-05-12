import express from 'express';
import service from './claim/claimService';
import passport from 'passport';


let router = express.Router();

router.route('/claim')
    .get(ensureAuthenticated, (req, res) => {
        res.json(service.list());
    })
    .post((req, res) => {
        service.create(req.body, () => {
            res.json({status: 'ok'});
        });
    });

router.route('/claim/:id')
    .get(ensureAuthenticated, (req, res) => {
        res.json(service.get(req.params.id));
    })
    .put(ensureAuthenticated, (req, res) => {
        service.update(req.body, () => {
            res.json({status: 'ok'});
        })
    });

router.route('/users')
    .get(ensureAuthenticated, (req, res) => {
        res.json({id: req.user.id, username: req.user.username});
    })
    .post(passport.authenticate('local'), (req, res, next) => {
        res.json({user: req.user.username, authenticate: "success"});

    });

router.route('/users/logout')
    .get((req, res) => {
        req.logout();
        res.json({authenticate: "logout"});
    });

function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.statusCode = 401;
    res.json({authenticate: "fail"});
}

export default router;