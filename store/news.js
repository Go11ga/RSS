import { rssToJSON, newsConvert, sortNews }  from '~/utils/rss.js';
import { searchNews }  from '~/utils/searchNews.js';

export const state = () => ({
  lenta: [],
  meduza: [],
  allNews: [],
  newsPerPage: 4,
  searchValue: ''
})

export const getters = {
  lentaNews(state){
    return searchNews(state.lenta, state.searchValue);
  },
  meduzaNews(state){
    return searchNews(state.meduza, state.searchValue);
  },
  allNews(state) {
    return searchNews(state.allNews, state.searchValue);
  },
  newsPerPage(state) {
    return state.newsPerPage;
  }
}

export const mutations = {
  /**
    * Загрузка новостей Lenta
    */
  setLenta(state, lenta){
    let news = rssToJSON(lenta);
    state.lenta = sortNews(newsConvert(news));
  },
  /**
    * Загрузка новостей Meduza
    */
  setMeduza(state, meduza){
    let news = rssToJSON(meduza);
    state.meduza = sortNews(newsConvert(news));
  },
  /**
    * Загрузка всех новостей
    */
  setAllNews(state){
    let arr = [...state.lenta, ...state.meduza];
    state.allNews = sortNews(arr);
  },
  /**
    * Количество новостей на странице
    */
  setNewsPerPage(state, i){
    i === 0 ? this.state.news.newsPerPage = 3 : this.state.news.newsPerPage = 4;
  },
  /**
    * Поиск новостей
    */
  setSearchValue(state, val){
    this.state.news.searchValue = val;
  }
}

export const actions = { 
  async getNews({commit}) {
    try{
      //let lenta = await this.$axios.$get('https://cors-anywhere.herokuapp.com/https://lenta.ru/rss/news');
      //let mos = await this.$axios.$get('https://cors-anywhere.herokuapp.com/https://meduza.io/rss2/all');
      let lentaPromise = this.$axios.$get('rss/news');
      let meduzaPromise =  this.$axios.$get('rss2/all');
      const [ lenta, meduza ] = await Promise.all([lentaPromise, meduzaPromise])

      commit('setLenta', lenta);
      commit('setMeduza', meduza);
      commit('setAllNews');
      this.commit('msg/setShowMsg', { show: false, text: '' });
      
    } catch(e) {
      this.commit('msg/setShowMsg', { show: true, text: 'Ошибка при загрузке' });
    } 
  }
}