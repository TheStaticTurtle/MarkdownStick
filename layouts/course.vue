<template>
	<v-app dark :style="{background: $vuetify.theme.themes[theme].background}">
		<v-navigation-drawer v-model="drawer" app>
			<v-list-item>
				<v-list-item-content>
					<v-list-item-title class="title">
						{{ course.config.title }}
					</v-list-item-title>
					<v-list-item-subtitle>
						{{ course.config.description }}
					</v-list-item-subtitle>
				</v-list-item-content>
			</v-list-item>

			<v-divider></v-divider>

			<v-list-item to="/" router>
				<v-list-item-action><v-icon>mdi-bookshelf</v-icon></v-list-item-action>
				<v-list-item-content><v-list-item-title>Go back to the library</v-list-item-title></v-list-item-content>
			</v-list-item>

			<v-divider></v-divider>

			<v-list>
				<v-list-item v-for="(chapter, i) in course.chapters" :key="i" :to="urlForChapter(chapter)" router exact >
					<v-list-item-action>
						<v-icon>{{ chapter.icon }}</v-icon>
					</v-list-item-action>
					<v-list-item-content>
						<v-list-item-title>{{ chapter.title }}</v-list-item-title>
						<v-list-item-subtitle>{{ chapter.subtitle }}</v-list-item-subtitle>
					</v-list-item-content>
				</v-list-item>
			</v-list>
		</v-navigation-drawer>

		<v-app-bar app>
			<v-app-bar-nav-icon @click.stop="drawer = !drawer"/>
			<v-toolbar-title>{{ course.config.title }}<span v-if="course.chapter"> / {{ course.chapter.title }}</span> </v-toolbar-title>
			<v-spacer></v-spacer>

			<v-menu left bottom >
				<template v-slot:activator="{ on, attrs }">
					<v-btn icon v-bind="attrs" v-on="on" >
						<v-icon>mdi-download</v-icon>
					</v-btn>
				</template>

				<v-list>
					<v-list-item @click="$store.dispatch('course/downloadCurrentChapter')">
						<v-list-item-title><v-icon class="mr-2">mdi-language-markdown</v-icon>Download this chapter</v-list-item-title>
					</v-list-item>
					<v-list-item @click="$store.dispatch('course/downloadCurrentCourse')">
						<v-list-item-title><v-icon class="mr-2">mdi-folder-zip</v-icon>Download the entire course</v-list-item-title>
					</v-list-item>
				</v-list>
			</v-menu>

			<v-btn icon @click="$store.commit('settings/toggleDarkMode')">
				<v-icon>mdi-invert-colors</v-icon>
			</v-btn>

			<UserManagementDialog></UserManagementDialog>
		</v-app-bar>

		<v-main>
			<v-container fluid>
				<nuxt/>
			</v-container>
		</v-main>
	</v-app>
</template>

<script>
	import { mapState } from 'vuex'
	import UserManagementDialog from "../components/UserManagementDialog";

	export default {
		name: "CourseTemplate",
		components: {UserManagementDialog},
		computed: {
			theme(){
				return (this.$vuetify.theme.dark) ? 'dark' : 'light'
			},
			...mapState(['course', 'settings'])
		},

		watch: {
			"settings.ui" : {
				deep: true,
				handler() {
					this.$vuetify.theme.dark = this.settings.ui.darkmode
				}
			}
		},

		data() {
			return {
				title: 'Vuetify.js',
				drawer: false,
				items: [],
			}
		},

		methods: {
			urlForChapter(chapter) {
				return "/course/"+ this.course.config.dir.replace("/courses/","") +'/'+chapter.slug
			}
		}
	}
</script>
