export const state = () => ({
	config: null,
	chapters: null,
	chapter: null,
})

export const mutations = {
	setConfig(state, config){
		state.config = config
	},
	setChapters(state, chapters){
		state.chapters = chapters
	},
	setCurrentChapter(state, chapter){
		state.chapter = chapter
	}
}

export const actions = {

}
