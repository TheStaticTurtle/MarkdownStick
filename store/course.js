var JSZip=require ("jszip");

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

	downloadCurrentChapter({ state }){
		const a = document.createElement('a')
		const blob = new Blob([ state.chapter.raw ], {type: "text/markdown; charset=UTF-8"})
		const url = URL.createObjectURL(blob)
		a.setAttribute('href', url)
		a.setAttribute('download',  state.chapter.title+state.chapter.extension)
		a.click()
	},

	downloadCurrentCourse({ state }){
		const zip = JSZip()
		const courseFolder = zip.folder(state.config.title)

		for (const chapter of state.chapters) {
			courseFolder.file(chapter.order+" - "+chapter.title+chapter.extension, chapter.raw)
		}

		zip.generateAsync({
			type: "blob"
		}).then(function(content) {
			const url = URL.createObjectURL(content)
			const a = document.createElement('a')
			a.setAttribute('href', url)
			a.setAttribute('download',state.config.title+".zip")
			a.click()
		})
	}
}
