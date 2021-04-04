module.exports = {
	root: true,
	env: {
		browser: true,
		node: true
	},
	parserOptions: {
		parser: 'babel-eslint'
	},
	extends: [
		'plugin:vue/essential',
		'eslint:recommended'
	],
	/*extends: [
		'@nuxtjs',
		'plugin:nuxt/recommended'
	],*/
	plugins: [],
	// add your custom rules here
	rules: {
		'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
		'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
		'no-useless-escape': 'off'
	}
}
