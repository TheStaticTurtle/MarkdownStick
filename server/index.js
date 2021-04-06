import express from 'express';
import morgan from 'morgan';
import passport from 'passport';
import { Nuxt, Builder } from 'nuxt';

const host = process.env.HOST || '127.0.0.1';
const port = process.env.PORT || 3000;

const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(passport.initialize());

const strategy = require("./passport/test-local-strategy")
passport.use("auth", strategy.strategy())
passport.deserializeUser(strategy.deserialize)
passport.serializeUser(strategy.serialize)

passport.use("jwt", require("./passport/jwt").strategy())

app.use("/auth",require("./routes/api/auth")(passport))
app.use("/user",require("./routes/api/user")(passport))

app.set('port', port);

// Import and Set Nuxt.js options
const config = require('../nuxt.config.js');

config.dev = !(process.env.NODE_ENV === 'production');

// Init Nuxt.js
const nuxt = new Nuxt(config);

// Build only in dev mode
if (config.dev) {
	const builder = new Builder(nuxt);
	builder.build();
}

// Give nuxt middleware to express
app.use(nuxt.render);

// Listen the server
app.listen(port, host);
console.log(`Server listening on ${host}:${port}`); // eslint-disable-line no-console
