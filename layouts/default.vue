<template>
	<v-app dark>
		<v-app-bar fixed app>
			<v-toolbar-title v-text="title"/>
		</v-app-bar>
		<v-main>
			<v-container>
				<nuxt/>
			</v-container>
		</v-main>
	</v-app>
</template>

<script>
	export default {
		data() {
			return {
				clipped: false,
				drawer: false,
				fixed: true,
				items: [
					{
						icon: 'mdi-apps',
						title: 'Welcome',
						to: '/'
					},
					{
						icon: 'mdi-chart-bubble',
						title: 'Inspire',
						to: '/inspire'
					}
				],
				miniVariant: false,
				right: true,
				rightDrawer: false,
				title: 'Vuetify.js'
			}
		}
	}
</script>
