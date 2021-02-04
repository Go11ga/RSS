export const state = () => ({
  isActive: false,
  text: ''
})

export const getters = {
  isActive (state) {
    return state.isActive
  },
  text (state) {
    return state.text
  }
}

export const mutations = {
  setToast (state, { isActive, text }){
    state.isActive = isActive
    state.text = text
  }
}