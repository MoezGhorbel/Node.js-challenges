const passport = require('passport');
const BearerStrategy = require('passport-http-bearer').Strategy;
const jwt = require('jsonwebtoken');
const User = require('../models/user');

passport.use(new BearerStrategy(
    (token, done) => {
        const decodeToken = jwt.verify(token, process.env.SECRET_KEY);
        User.findOne({ _id: decodeToken.user }, function (err, user) {
            if (err) { return done(err); }
            if (!user) { return done(null, false); }
            return done(null, user, { scope: 'all' });
        });
    }
));