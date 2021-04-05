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
			let courseConfig = await $content("courses", { deep: true }, params.slugCourse).where({ extension: '.json' }).fetch()
			if(courseConfig.length === 1) courseConfig = courseConfig[0]
			else courseConfig = null
			store.commit("course/setConfig",courseConfig)

			let chapters = await $content("courses", { deep: true }, params.slugCourse).where({ extension: '.md' }).fetch()
			chapters = chapters.sort(function(a, b) {
				if (a.order < b.order) return -1;
				if (a.order > b.order) return 1;
				return 0;
			})
			store.commit("course/setChapters",chapters)

			if(chapters.length>0) redirect( "/course/"+ courseConfig.dir.replace("/courses/","") +'/'+chapters[0].slug )

			return {
				courseConfig,
				chapters
			}
		},

		components: {}
	}
</script>
