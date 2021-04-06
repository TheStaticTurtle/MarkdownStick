const express = require("express")
const jwt = require('jsonwebtoken');

function omit(keys, obj) {
	if (!keys.length) return obj
	const { [keys.pop()]: omitted, ...rest } = obj;
	return omit(keys, rest);
}

function wrapper(passport) {
	const router = express.Router()

	router.post("/login", (req, res, next) => {
		passport.authenticate("auth", (err, user, info)=>{
			if(err) {
				return res.status(500).send({ err, info})
			}
			if(!user) {
				return res.status(400).send({ err, info })
			}

			const token = jwt.sign({ user:omit(["password"], user) }, 'TOP_SECRET');

			return res.status(200).json({ token });
		})(req, res, next)
	})

	return router
}

module.exports = wrapper