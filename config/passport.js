var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/user');

module.exports = function(passport) {
	passport.use('local-signup', new LocalStrategy({
		usernameField: 'email',
		passwordField: 'password',
		passReqToCallback: true
	},
	function(req, email, password, done) {
		process.nextTick(function() {
			User.findOne({ 'local.email': email }, function(err, user) {
				if(err) return done(err);

				if(user) {
					return done(null, false, { 'message': 'Your email address has already been registered.' });
				} else {
					var newUser = new User();

					newUser.local.email = email;
					newUser.local.password = newUser.generateHash(password);

					newUser.save(function(err) {
						if(err) {
							throw err;
						}

						return done(null, newUser);
					});
				}
			});
		});
	}));

	passport.use('local-login', new LocalStrategy({
		usernameField: 'email',
		passwordField: 'password',
		passReqToCallback: true
	},
	function(req, email, password, done) {
		process.nextTick(function() {
			User.findOne({ 'local.email': email }, function(err, user) {
				if(err) return done(err);

				if(user && user.isValidPassword(password)) {
					return done(null, user);
				} else {
					return done(null, false, { 'message': 'Oh noes! You broke teh Interwebs wit ur creds. Try again!' });
				}
			});
		});
	}));
};
