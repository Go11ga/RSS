export const actions = {
  async nuxtServerInit ({ commit }) {
    await this.dispatch('news/getNews')
  }
}