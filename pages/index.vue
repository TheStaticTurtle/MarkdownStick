<template>
	<v-row justify="center" align="center">
		<v-col cols="12" sm="8" md="6" v-for="course in courses" :key="course.slug">
			<v-card nuxt :to="'/course/'+course.slug">
				<v-img v-if="course.image" height="250" :src="course.image"></v-img>

				<v-card-title class="headline">{{ course.title }}</v-card-title>
				<v-card-text>{{ course.description }}</v-card-text>
			</v-card>
		</v-col>
	</v-row>
</template>

<script>
	export default {
		async asyncData ({ $content }) {
			let coursesPages = await $content("courses", { deep: true }).where({ extension: '.json'}).fetch()
			coursesPages = coursesPages.filter(x=> x.visible!==false)
			let slugs = []
			const courses = coursesPages
				.filter(x=>x.dir!=="/courses")
				.map(x=>{ return {
					slug: x.dir.replace('/courses/',''),
					title:x.title,
					image:x.image,
					description:x.description,
				}})
				.filter(x=>{
					if(slugs.includes(x.slug)) return false
					else {
						slugs.push(x.slug)
						return true
					}
				})

			return {
				courses
			}
		},

		components: {
		}
	}
</script>
