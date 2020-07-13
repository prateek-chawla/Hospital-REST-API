const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;

const Doctor = require("../models/doctor");

const opts = {}; // JWT configuration
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.JWTSecret;

passport.use(
	new JwtStrategy(opts, function (jwt_payload, done) {
		Doctor.findById(jwt_payload._id, function (err, doctor) {
            if (err) {
                console.log(err)
				return done(err, false);
			}
			if (doctor) {
				return done(null, doctor);
			} else {
				return done(null, false);
			}
		});
	})
);

module.exports = passport;
