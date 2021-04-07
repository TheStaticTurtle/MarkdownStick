<template>
	<div style="width: 100%; display: flex; align-items: center; justify-content: center; padding: 8px">
		<iframe :src="'https://www.youtube.com/embed/'+content" width="533" height="300" frameborder="0" allowfullscreen=""></iframe>
	</div>
</template>

<script>
	export default {
		name: "Youtube",
		props: {
			content: {
				required: true,
				type: String
			}
		}
	}
</script>

<style scoped>

</style>
