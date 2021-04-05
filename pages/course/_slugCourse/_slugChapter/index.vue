<template>
	<v-row>
		<v-col class="">
			<nuxt-content  :document="chapter"></nuxt-content>
		</v-col>
	</v-row>
</template>

<style>
	h1,h2,h3,h4,h5,h6 {
		text-align: center;
	}

	blockquote {
		background:#f9f9f9;
		border: 1px solid #e2e2e2;
		border-left:5px solid #ccc;
		margin:1em 10px 0.5em 5px;
		padding:.25em 10px .25em 10px;
	}
	blockquote p {
		display:inline;
	}

	ol> li> p {
		margin-bottom: 0 !important;
	}
</style>

<script>
	export default {
		name: "Course",
		layout: "course",

		async asyncData ({ $content, params, store, redirect}) {
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
				chapters = chapters.sort(function(a, b) {
					if (a.order < b.order) return -1;
					if (a.order > b.order) return 1;
					return 0;
				})
			} catch (e) {
				redirect("/")
			}
			store.commit("course/setChapters",chapters)

			const chapter = chapters.find((x)=>{ return x.slug===params.slugChapter })
			store.commit("course/setCurrentChapter", chapter)

			return {
				courseConfig,
				chapters,
				chapter
			}
		},

		components: {}
	}
</script>
