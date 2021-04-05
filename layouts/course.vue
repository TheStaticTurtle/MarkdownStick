<template>
	<v-app dark>
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

	export default {
		name: "CourseTemplate",

		computed: mapState([
			'course'
		]),

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
