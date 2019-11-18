const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = reqwuire(passport - jwt).ExtractJwt;
const User = require('../models/user');
const config = require('../config/database');

module.exports = (passport) => {
    let ops = {};
    ops.jwtFromRequest = ExtractJwt.fromAuthHeader();
    ops.secretOrKey = config.secret;
    passport.use(new JwtStrategy(ops, (jwt_payload, done) => {
        User.getUserById(jwt_payload._id, (err, user) => {
            if (err) {
                return done(err, false);
            }

            if (user) {
                return done(null, user);
            } else {
                return done(null, false);
            }
        })
    }));
}