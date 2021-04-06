const LocalStrategy = require('passport-local').Strategy;

/*
	THIS IS TEMPORARY FILE
 */

users = [
	{
		id: 0,
		username: "usera",
		password: "azertyuiop",
		email:    "echo@toto.sexy",
		groups: [
			"TestGroupA",
			"TestGroupC"
		]
	},
	{
		id: 1,
		username: "userb",
		password: "azertyuiop",
		email:    "echo@toto.sexy",
		groups: [
			"TestGroupB",
			"TestGroupC"
		]
	}
]

function strategy() {
	return new LocalStrategy({
		usernameField: 'username',
		passwordField: 'password'
	}, function(username, password, done) {
		const r = users.find(x=> x.username===username && x.password===password)
		if(r) {
			done(null, r);
		} else {
			return done(null, false, { message: 'Incorrect username, or password.' });
		}
	})
}


function serialize(user, done) {
	done(null, user.id);
}

function deserialize(id, done) {
	const r = users.find(x=> x.id===id)
	if(r) {
		done(null, r);
	} else {
		return done(null, false, { message: 'Incorrect user id' });
	}
}

module.exports = {
	strategy,
	serialize,
	deserialize,
}