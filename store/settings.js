export const state = () => ({
	ui: {
		darkmode: false
	},
})

export const mutations = {
	toggleDarkMode(state){
		state.ui.darkmode = !state.ui.darkmode
	},
	setDarkMode(state, status){
		state.ui.darkmode = status
	},
}

export const actions = {
}
