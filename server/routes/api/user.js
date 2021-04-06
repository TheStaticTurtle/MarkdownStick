const express = require("express")
const jwt = require('jsonwebtoken');

function wrapper(passport) {
	const router = express.Router()

	router.get("/", passport.authenticate('jwt', { session: false }), (req, res) => {
		return res.status(200).json({user: req.user})
	})

	return router
}

module.exports = wrapper