import colors from 'vuetify/es5/util/colors'

export default {
	// Global page headers: https://go.nuxtjs.dev/config-head
	server: {
		host: '0.0.0.0'
	},

	head: {
		titleTemplate: '%s - MarkdownStick',
		title: 'MarkdownStick',
		meta: [
			{charset: 'utf-8'},
			{name: 'viewport', content: 'width=device-width, initial-scale=1'},
			{hid: 'description', name: 'description', content: ''}
		],
		link: [
			{rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'}
		]
	},

	// Global CSS: https://go.nuxtjs.dev/config-css
	css: [
		"~/node_modules/katex/dist/katex.css"
	],

	// Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
	plugins: [],

	// Auto import components: https://go.nuxtjs.dev/config-components
	components: true,

	// Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
	buildModules: [
		// https://go.nuxtjs.dev/eslint
		//'@nuxtjs/eslint-module',
		// https://go.nuxtjs.dev/vuetify
		'@nuxtjs/vuetify'
	],

	// Modules: https://go.nuxtjs.dev/config-modules
	modules: [
		// https://go.nuxtjs.dev/axios
		'@nuxtjs/axios',
		// https://go.nuxtjs.dev/pwa
		'@nuxtjs/pwa',
		// https://go.nuxtjs.dev/content
		'@nuxt/content'
	],

	// Axios module configuration: https://go.nuxtjs.dev/config-axios
	axios: {},

	// PWA module configuration: https://go.nuxtjs.dev/pwa
	pwa: {
		manifest: {
			lang: 'en'
		}
	},

	// Content module configuration: https://go.nuxtjs.dev/config-content
	content: {
		liveEdit: false,
		markdown: {
			prism: {
				theme: 'prismjs/themes/prism-tomorrow.css'
			},
			remarkPlugins: [
				'remark-math',
			],
			rehypePlugins: [
				'rehype-katex',
			]
		}
	},

	// Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
	vuetify: {
		customVariables: ['~/assets/variables.scss'],
		theme: {
			options: { customProperties: true },
			dark: true,
			themes: {
				light: {
					background: '#ffffff',

					primary: colors.red.accent2,
					accent: colors.orange.darken3,
					secondary: colors.purple.accent2,

					info: colors.teal.lighten1,
					warning: colors.amber.base,
					error: colors.deepOrange.accent4,
					success: colors.green.accent3,

					hover: colors.grey.lighten4,
					border: colors.grey.base,
					componentBackground: colors.shades.white,
					componentHeadBackground: colors.grey.lighten3,

					mermaid: {
						background: "#474747",
						primaryColor: colors.pink.base,
						secondaryColor: colors.purple.base,
						tertiaryColor: colors.deepPurple.base,
						primaryTextColor: "#fff",
						secondaryTextColor: "#fff",
						tertiaryTextColor: "#fff",
						noteBkgColor: "#ececec",
						noteTextColor: "#101010",
						noteBorderColor: "#ffffff00",
						lineColor: "#0f0",
						textColor: "#000000",
						mainBkg: colors.pink.base,
					},
				},
				dark: {
					background: '#1B1B1B',

					primary: colors.red.accent2,
					accent: colors.orange.darken3,
					secondary: colors.purple.accent2,
					info: colors.teal.lighten1,
					warning: colors.amber.base,
					error: colors.deepOrange.accent4,
					success: colors.green.accent3,

					hover: colors.grey.darken3,
					border: colors.grey.darken2,
					componentBackground: colors.grey.darken4,
					componentHeadBackground: colors.grey.darken4,

					mermaid: {
						background: "#f4f4f4",
						primaryColor: colors.pink.base,
						secondaryColor: colors.blue.base,
						tertiaryColor: colors.green.base,
						primaryTextColor: "#fff",
						secondaryTextColor: "#fff",
						tertiaryTextColor: "#fff",
						noteBkgColor: "#393939",
						noteTextColor: "#f5f5f5",
						noteBorderColor: "#ffffff00",
						lineColor: "#0f0",
						textColor: "#fff",
						mainBkg: colors.pink.base,
					},
				},
			}
		}
	},

	/*hooks: {
		'content:file:beforeInsert': async (document) => {
			if (document.extension === '.md' && document.body) {
				console.log(document.body)
			}
		}
	},*/

	// Build Configuration: https://go.nuxtjs.dev/config-build
	build: {
		extend(config, { isDev, isClient }) {
			config.module.rules.push({
				test: /\.md$/i,
				loader: 'ignore-loader'
			})
		}

	}
}
