<template>
	<v-img
		:src="imgSrc()"
		:alt="alt"
	/>
</template>

<script>
	export default {
		name: "MdImage",
		props: {
			document: {
				type: String,
				required: true
			},
			file: {
				type: String,
				required: true
			},
			alt: {
				type: String,
				default: "",
				required: false
			}
		},
		methods: {
			imgSrc () {
				try {
					return require(`~/content/courses/${this.document}/${this.file}`);
				} catch (e) {
					console.log(e);
				}
			}
		}
	};
</script>
