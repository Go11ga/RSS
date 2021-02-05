import { rssToJSON, newsConvert, sortNews }  from '~/utils/rss.js'
import { searchNews }  from '~/utils/searchNews.js'

export const state = () => ({
  lenta: [],
  meduza: [],
  allNews: [],
  renderNews: [],
  newsPerPage: 4,
  searchValue: ''
})

export const getters = {
  /**
   * * Новости для рендеринга
   * @return { Array }
   */
  category (state) {
    return searchNews(state.renderNews, state.searchValue)
  },

  /**
   * * Количество новостей на странице
   * @return { Number }
   */
  newsPerPage(state) {
    return state.newsPerPage
  }
}

export const mutations = {
  setLenta (state, lenta) {
    let news = rssToJSON(lenta)
    state.lenta = sortNews(newsConvert(news))
  },

  setMeduza (state, meduza) {
    let news = rssToJSON(meduza)
    state.meduza = sortNews(newsConvert(news))
  },

  setAllNews (state) {
    let arr = [...state.lenta, ...state.meduza]
    state.allNews = sortNews(arr)
  },
 
  setNewsPerPage (state, ind) {
    ind === 0 ? state.newsPerPage = 3 : state.newsPerPage = 4
  },
 
  setSearchValue (state, val) {
    state.searchValue = val
  },

  setCategory (state, categ) {
    switch (categ) {
      case 'all':
        state.renderNews = [...state.allNews]
        break
      case 'lenta':
        state.renderNews = [...state.lenta]
        break
      case 'meduza':
        state.renderNews = [...state.meduza]
        break
    }
  }
}

export const actions = { 
  async getNews({ commit }) {
    try {
      //let lenta = await this.$axios.$get('https://cors-anywhere.herokuapp.com/https://lenta.ru/rss/news');
      //let mos = await this.$axios.$get('https://cors-anywhere.herokuapp.com/https://meduza.io/rss2/all');
      let lentaPromise = this.$axios.$get('rss/news')
      let meduzaPromise =  this.$axios.$get('rss2/all')
      const [ lenta, meduza ] = await Promise.all([lentaPromise, meduzaPromise])

      commit('setLenta', lenta)
      commit('setMeduza', meduza)
      commit('setAllNews')
      
    } catch (e) {
      commit('toast/setToast', { isActive: true, text: 'Ошибка загрузки' }, { root: true })
    } 
  }
}