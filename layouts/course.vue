<template>
	<v-app dark :style="{background: $vuetify.theme.themes[theme].background}">
		<v-navigation-drawer v-model="drawer" app>
			<div>
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
			</div>

			<v-list style="overflow-y: auto; max-height: calc(100% - 116px)">
				<div v-for="(chapter, i) in chapters" :key="i">
					<!-- Display the normal link if we aren't visitng it and that the toc isn't empty-->
					<v-list-item v-if="!chapter.selected || chapter.toc.length===0" :to="urlForChapter(chapter)" router exact >
						<v-list-item-action>
							<v-icon>{{ chapter.icon }}</v-icon>
						</v-list-item-action>
						<v-list-item-content>
							<v-list-item-title>{{ chapter.title }}</v-list-item-title>
							<v-list-item-subtitle>{{ chapter.subtitle }}</v-list-item-subtitle>
						</v-list-item-content>
					</v-list-item>

					<!-- Otherwise display the TOC for the current link-->
					<v-list-group v-else>
						<template v-slot:activator>
							<v-list-item-action>
								<v-icon>{{ chapter.icon }}</v-icon>
							</v-list-item-action>
							<v-list-item-content>
								<v-list-item-title>{{ chapter.title }}</v-list-item-title>
								<v-list-item-subtitle>{{ chapter.subtitle }}</v-list-item-subtitle>
							</v-list-item-content>
						</template>
						<v-list-item nuxt link v-for="(tocEntry) in chapter.toc" :key="tocEntry.id" style="min-height: 40px;" :to="urlForChapterPlusTitleId(chapter,tocEntry.id)">
							<v-list-item-title class="pl-2">
								<v-icon>mdi-chevron-right</v-icon>
								{{ tocEntry.text }}
							</v-list-item-title>
						</v-list-item>
					</v-list-group>
				</div>

<!--				<v-list-item v-for="(chapter, i) in course.chapters" :key="i" :to="urlForChapter(chapter)" router exact >-->
<!--					<v-list-item-action>-->
<!--						<v-icon>{{ chapter.icon }}</v-icon>-->
<!--					</v-list-item-action>-->
<!--					<v-list-item-content>-->
<!--						<v-list-item-title>{{ chapter.title }}</v-list-item-title>-->
<!--						<v-list-item-subtitle>{{ chapter.subtitle }}</v-list-item-subtitle>-->
<!--					</v-list-item-content>-->
<!--				</v-list-item>-->
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

		</v-app-bar>

		<v-main>
			<v-container fluid>
				<nuxt/>
			</v-container>
		</v-main>
	</v-app>
</template>

<style scoped>
	::-webkit-scrollbar {
		width: 4px;
		height: 4px;
	}
	::-webkit-scrollbar-button {
		width: 0px;
		height: 0px;
	}
	::-webkit-scrollbar-thumb {
		background: #e1e1e1;
		border: 0px none #ffffff;
		border-radius: 50px;
	}
	::-webkit-scrollbar-thumb:hover {
		background: #ffffff;
	}
	::-webkit-scrollbar-thumb:active {
		background: #000000;
	}
	::-webkit-scrollbar-track {
		background: #666666;
		border: 0px none #ffffff;
		border-radius: 50px;
	}
	::-webkit-scrollbar-track:hover {
		background: #666666;
	}
	::-webkit-scrollbar-track:active {
		background: #333333;
	}
	::-webkit-scrollbar-corner {
		background: transparent;
	}
</style>

<script>
	import { mapState } from 'vuex'

	export default {
		name: "CourseTemplate",

		computed: {
			theme(){
				return (this.$vuetify.theme.dark) ? 'dark' : 'light'
			},
			...mapState({
				settings: state => state.settings,
				course: state => state.course,
				chapters (state) {
					return state.course.chapters.map(x=>{
						x.selected = x.slug === state.course.chapter.slug
						return x
					})
				}
			})
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
			},
			urlForChapterPlusTitleId(chapter, id) {
				return "/course/"+ this.course.config.dir.replace("/courses/","") +'/'+chapter.slug + '#'+id
			}
		}
	}
</script>
