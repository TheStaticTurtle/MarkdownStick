<template>
	<v-app dark :style="{background: $vuetify.theme.themes[theme].background}">
		<v-app-bar fixed app>
			<v-toolbar-title>Documents</v-toolbar-title>
			<v-spacer></v-spacer>
			<v-btn icon @click="$store.commit('settings/toggleDarkMode')">
				<v-icon>mdi-invert-colors</v-icon>
			</v-btn>

		</v-app-bar>
		<v-main>
			<v-container>
				<nuxt/>
			</v-container>
		</v-main>
	</v-app>
</template>

<script>
	import { mapState } from 'vuex'
	export default {
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
				title: 'Vuetify.js'
			}
		}
	}
</script>
