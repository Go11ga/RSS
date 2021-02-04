export const actions = {
  async nuxtServerInit ({ dispatch }) {
    await dispatch('news/getNews')
  }
}