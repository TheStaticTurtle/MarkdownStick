<template>
	<v-app dark>
		<v-app-bar fixed app>
			<v-toolbar-title>Documents</v-toolbar-title>
			<v-spacer></v-spacer>
			<v-btn icon @click="$store.commit('settings/toggleDarkMode')">
				<v-icon>mdi-invert-colors</v-icon>
			</v-btn>
			<UserManagementDialog></UserManagementDialog>
		</v-app-bar>
		<v-main>
			<v-container>
				<nuxt/>
			</v-container>
		</v-main>
	</v-app>
</template>

<script>
	import UserManagementDialog from "../components/UserManagementDialog";
	export default {
		components: {UserManagementDialog},
		data() {
			return {
				title: 'Vuetify.js'
			}
		}
	}
</script>
