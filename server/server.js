import express from 'express';
import session from 'express-session';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import restApi from './rest'
import passportLocal from 'passport-local';
import passport from 'passport';
import userService from './user/userService';

let app = express();

app.use('/', express.static('./public'));
app.use('/res', express.static('./dist'));

app.use(cookieParser());

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(session({
    secret: 'top secret',
}))

app.use(passport.initialize());
app.use(passport.session());

app.use('/api', restApi);

let LocalStrategy = passportLocal.Strategy;

passport.use(new LocalStrategy({
        usernameField: 'login',
        passwordField: 'password',
        session: true
    }, (username, password, callback) => {
        userService.authenticate(username, password, (user) => {
            if (!user) {
                return callback(null, false, {message: 'Incorrect username or password.'});
            }
            return callback(null, user);
        });
    }
));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    userService.findById(id, (err, user) => {
        if(!err){
            done(err, user);
        }
        else {
            done(err, null)
        }
    });
});

app.listen(3636, () => {
    console.log('ICD listening on port 3636...!');
});
module.exports = app;  

