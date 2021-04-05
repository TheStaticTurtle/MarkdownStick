<template>
	<v-container fluid>
		<div ref="slot" style="display: none"><slot></slot></div>
		<div class="d-flex flex-column py-3" style="align-items: center">
			<v-progress-circular :size="50" color="primary" indeterminate v-if="!loaded && !errored" ></v-progress-circular>
		</div>
		<v-alert v-if="errored" color="#C51162" dark icon="mdi-alert-octagon" border="right">
			<h2>Error while rendering diagram</h2>
			<code>
				{{ errored }}
			</code>
		</v-alert>
		<div v-if="!errored" ref="content"></div>
	</v-container>
</template>

<script>
	export default {
		name: "mermaid",
		data() {
			return {
				rnd: Math.floor(Math.random() * 1000000000000000),
				loaded: false,
				errored: null
			}
		},
		mounted() {
			import("mermaid/dist/mermaid").then(m => {
				m.initialize({
					startOnLoad: false,
					theme: 'base',
					themeVariables: {
						fontFamily: "'Roboto', sans-serif !important",
						fontSize: "16px",
						...this.$vuetify.theme.currentTheme.mermaid
					}
				});

				try {
					m.render('graph'+this.rnd, this.$refs.slot.textContent, (svgCode)=>{
						this.loaded = true
						this.$refs.content.innerHTML = svgCode;
					});
				} catch (e) {
					const d = document.getElementById("dgraph"+this.rnd);
					if(d) d.remove()

					this.errored = e
				}
			});
		}
	}
</script>

<style scoped>

</style>
