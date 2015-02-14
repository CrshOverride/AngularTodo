var User = require('../models/user');

module.exports = function(app, cors, passport) {
	app.get('/api/todos', cors(), function(req, res) {
		User.findOne({ 'local.email': req.user.email }, function(err, user) {
			if(err) return res.json(500, err);
			if(!user) return res.json(500, { message: 'Invalid user!' });
			return res.json(user.items);
		});
	});

	app.post('/api/todos', cors(), function(req, res) {
		User.findOne({ 'local.email': req.user.email }, function(err, user) {
			if(err) return res.json(500, err);
			if(!user) return res.json(500, { message: 'Invalid user!' });
			user.items.push(req.body.todo.text);
			user.save(function(err) {
				if(err) {
					return res.json(500, err);
				}

				return res.json({ success: true });
			})
		});
	});

	app.delete('/api/todos/:item', cors(), function(req, res) {
		User.findOne({ 'local.email': req.user.email }, function(err, user) {
			if(err) return res.json(500, err);
			if(!user) return res.json(500, { message: 'Invalid user!' });
			user.items.splice(user.items.indexOf(req.params.item), 1);
			user.save(function(err) {
				if(err) {
					return res.json(500, err);
				}

				return res.json({ success: true });
			})
		});
	});
};
