<template>
	<v-dialog v-model="dialog" persistent max-width="600px">
		<template v-slot:activator="{ on, attrs }">
			<v-btn icon v-bind="attrs" v-on="on">
				<v-icon :color="auth.loggedIn ? 'green' : 'red'">mdi-account</v-icon>
			</v-btn>
		</template>
		<v-card v-if="auth.loggedIn">
			<v-card-title>
				<span class="headline">User Profile</span>
			</v-card-title>
			<v-card-text>
				<p>{{ auth.user }}</p>
			</v-card-text>
			<v-card-actions>
				<v-spacer></v-spacer>
				<v-btn color="primary darken-1" text @click="dialog = false">
					Close
				</v-btn>
				<v-btn color="primary darken-1" text @click="$auth.logout(); dialog = false" >
					Logout
				</v-btn>
			</v-card-actions>
		</v-card>

		<v-card v-else>
			<v-card-title>
				<span class="headline">Login</span>
			</v-card-title>
			<v-card-text>
				<v-container>
					<v-row>
						<v-col cols="12">
							<v-text-field v-model="form.login.username" label="Username*" required></v-text-field>
						</v-col>
						<v-col cols="12">
							<v-text-field v-model="form.login.password" label="Password*" type="password" required></v-text-field>
						</v-col>
					</v-row>
				</v-container>
				<small>*indicates required field</small>
			</v-card-text>
			<v-card-actions>
				<v-spacer></v-spacer>
				<v-btn color="blue darken-1" text @click="dialog = false">
					Close
				</v-btn>
				<v-btn color="blue darken-1" text @click="$auth.loginWith('local', { data: form.login }); dialog = false" >
					Login
				</v-btn>
			</v-card-actions>
		</v-card>


	</v-dialog>
</template>

<script>
	import { mapState } from 'vuex'

	export default {
		name: "UserManagementDialog",

		computed: {
			...mapState(['auth'])
		},

		data: () => ({
			dialog: false,
			form: {
				login: {
					username: "",
					password: ""
				}
			}
		}),
	}
</script>

<style scoped>

</style>
