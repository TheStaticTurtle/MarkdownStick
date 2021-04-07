<template>
	<v-app dark>
		<v-app-bar fixed app>
			<v-toolbar-title>Documents</v-toolbar-title>
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
				title: 'Vuetify.js'
			}
		}
	}
</script>
