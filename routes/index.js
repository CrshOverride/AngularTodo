module.exports = function(app, cors, passport, jwt, secret) {
	app.post('/add-user', cors(), function(req, res, next) {
		passport.authenticate('local-signup', function(err, user, info) {
			if(err) return res.json(500, { error: err });
			else if(!user) return res.json(422, { success: false, message: info });
			else return res.json({ success: true });
		})(req, res, next);
	});

	app.post('/authenticate', cors(), function(req, res, next) {
		passport.authenticate('local-login', function(err, user, info) {
			var token;
			if(err) return res.json(500, { error: err });
			else if(!user) return res.json(401, { success: false, message: info });
			else {
				token = jwt.sign({ email: user.local.email }, secret, { expiresInMinutes: 60 * 5 });
				return res.json({ success: true, token: token });
			}
		})(req, res, next);
	});

	app.get('*', function(req, res) {
		res.render('index', { title: 'Yet Another Todo App' });
	});
};
