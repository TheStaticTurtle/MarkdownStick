<template>
	<v-row>
		<v-col class="">
			<nuxt-content  :document="chapter"></nuxt-content>
		</v-col>
	</v-row>
</template>

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

			const chapter = chapters.find((x)=>{ return x.slug===params.slugChapter })
			store.commit("course/setCurrentChapter", chapter)

			store.commit("course/setChapters",chapters.filter(x=> { return !x.hidden || x.slug ===params.slugChapter } ))

			return {
				courseConfig,
				chapters,
				chapter
			}
		},

		components: {}
	}
</script>

<style lang="scss">
	h1,h2,h3,h4,h5,h6 {
		text-align: center;
	}

	blockquote {
		background: var(--v-hover-darken1);
		border: 1px solid #e2e2e2;
		border-left:3px solid #ccc;
		margin:1em 10px 0.5em 5px;
		padding:.25em 10px .25em 10px;
		border-radius: 6px;
	}
	blockquote p {
		display:inline;
	}

	ol> li> p {
		margin-bottom: 0 !important;
	}

	@import '~vuetify/src/styles/styles.sass';

	.nuxt-content-highlight pre {
		border-radius: 4px;
	}
	.nuxt-content-highlight code {
		padding: 0;
		background-color: initial !important;
	}

	.nuxt-content {
		@each $name, $style in $headings {
			#{$name} {
				@each $prop, $val in $style {
					$propname: if($prop==weight,'font-weight', if($prop==size,'font-size', $prop));
					#{$propname}:#{$val/1.75}; //Non material desing complient, was just too big otherwise
				}
			}
		}
	}

	.nuxt-content img {
		max-width: 100%;
		border-radius: 6px;
	}

	.nuxt-content hr {
		border: none;
		border-top: thin solid;
		margin: 16px 0
	}

	.nuxt-content table {
		font-family: Arial, Helvetica, sans-serif;
		width: 100%;

		background-color: var(--v-componentBackground-base);

		border: thin solid var(--v-border-base);
		border-radius: 6px !important;
		-moz-border-radius:6px;

		border-collapse: separate;
		border-spacing: 0;

		margin-top: 16px;
		margin-bottom: 16px;
	}


	.nuxt-content table td, .nuxt-content table th {
		font-size: 0.875rem;
		height: 48px;
		padding: 0 16px;
		transition: height 0.2s cubic-bezier(0.4, 0, 0.6, 1);
	}

	.nuxt-content thead th {
		font-size: 1.15rem;
		font-weight: 100;
		background-color: var(--v-componentHeadBackground-base) !important;
	}

	.nuxt-content table tbody tr:hover {
		background: var(--v-hover-base);
	}
	.nuxt-content table td {
		border-top: thin solid var(--v-border-base);
		border-right: thin solid var(--v-border-base);
	}
	.nuxt-content table td,th {
		border-right: thin solid var(--v-border-base);
	}
	.nuxt-content table td:last-of-type, th:last-of-type {
		border-right: none;
	}
	//rgba(255, 255, 255, 0.12)
</style>
