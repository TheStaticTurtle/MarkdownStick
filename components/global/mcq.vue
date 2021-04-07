<template>
	<v-card class="mx-auto my-4" color="primary" dark max-width="650">
		<v-card-title class="pb-0 pt-1">
			<v-icon large left>mdi-question</v-icon>
			<span class="title font-weight-light">MCQ</span>
		</v-card-title>

		<v-card-text class="py-0">
			<slot v-if="!solved">
				<p>Here is a little MCQ for your enjoyment</p>
			</slot>

			<v-radio-group v-if="!solved" v-model="radios" mandatory class="py-0">
				<v-radio v-for="option in optionsR"
						 :key="option"
						 :label="option"
						 color="white"
						 :value="option"
				></v-radio>
			</v-radio-group>

			<slot v-if="solved && answerCorect"  name="right">
				<p>Right</p>
			</slot>
			<slot v-if="solved && !answerCorect" name="wrong">
				<p>And it's wrong</p>
			</slot>
		</v-card-text>

		<v-card-actions class="py-0">
			<v-list-item class="grow">
				<v-row align="center" justify="end">
					<v-btn class="mx-1" v-if="enablereset" @click="reset">Reset</v-btn>
					<v-btn class="mx-1" v-if="!solved" @click="verify">Verify</v-btn>
				</v-row>
			</v-list-item>
		</v-card-actions>
	</v-card>
</template>

<script>
	function shuffle(array) {
		var currentIndex = array.length, temporaryValue, randomIndex;
		// While there remain elements to shuffle...
		while (0 !== currentIndex) {
			// Pick a remaining element...
			randomIndex = Math.floor(Math.random() * currentIndex);
			currentIndex -= 1;
			// And swap it with the current element.
			temporaryValue = array[currentIndex];
			array[currentIndex] = array[randomIndex];
			array[randomIndex] = temporaryValue;
		}
		return array;
	}

	export default {
		name: "Mcq",
		props: {
			valid: {
				required: true,
				type: String
			},
			options: {
				required: true,
				type: Array
			},
			randomizeoptions: {
				default: false,
				type: Boolean
			},
			enablereset: {
				default: true,
				type: Boolean
			}
		},
		computed: {
			answerCorect() {
				return this.valid === this.radios
			}
		},
		data () {
			return {
				radios: null,
				optionsR: this.randomizeoptions ? shuffle(this.options) : this.options,
				solved: false,
				right: false,
			}
		},
		methods: {
			verify() {
				this.solved = true
			},
			reset() {
				this.solved = false
			}
		}
	}
</script>

<style scoped>

</style>
