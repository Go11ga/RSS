import { rssToJSON, newsConvert, sortNews }  from '~/utils/rss.js'
import { searchNews }  from '~/utils/searchNews.js'

export const state = () => ({
  lenta: [],
  meduza: [],
  allNews: [],
  newsPerPage: 4,
  searchValue: ''
})

export const getters = {
  /**
   * * Новости lenta
   * @return { Array }
   */
  lentaNews(state){
    return searchNews(state.lenta, state.searchValue)
  },

  /**
   * * Новости meduza
   * @return { Array }
   */
  meduzaNews(state){
    return searchNews(state.meduza, state.searchValue)
  },

  /**
   * * Все новости
   * @return { Array }
   */
  allNews(state) {
    return searchNews(state.allNews, state.searchValue)
  },

  /**
   * * Количество новстей на странице
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
      commit('toast/setToast', { isActive: true, text: 'Ошибка загрузки' })
    } 
  }
}