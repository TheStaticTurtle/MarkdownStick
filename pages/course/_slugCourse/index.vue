<template>
	<v-row>
		<v-col class="text-center">
		</v-col>
	</v-row>
</template>

<script>
	export default {
		name: "Course",
		layout: "course",

		async asyncData ({ $content, params, store, redirect}) {
			store.commit("settings/setDarkMode", $vuetify.theme.dark)
			let courseConfig = null
			try {
				courseConfig = await $content("courses", { deep: true }, params.slugCourse).where({ extension: '.json' }).fetch()
				if(courseConfig.length === 1) courseConfig = courseConfig[0]
			} catch (e) {
				redirect("/")
			}
			store.commit("course/setConfig",courseConfig)

			let chapters = []
			try {
				chapters = await $content("courses", { deep: true }, params.slugCourse).where({ extension: '.md' }).fetch()
				chapters = chapters.filter(x=> { return !x.hidden || x.slug ===params.slugChapter } )
				chapters = chapters.sort(function(a, b) {
					if (a.order < b.order) return -1;
					if (a.order > b.order) return 1;
					return 0;
				})
			} catch (e) {
				redirect("/")
			}
			store.commit("course/setChapters",chapters)

			if(!!courseConfig && chapters.length>0) redirect( "/course/"+ courseConfig.dir.replace("/courses/","") +'/'+chapters[0].slug )

			return {
				courseConfig,
				chapters
			}
		},

		components: {}
	}
</script>
