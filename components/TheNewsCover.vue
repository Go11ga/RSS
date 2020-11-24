<template>
  <!-- Компонент для обработки канала новостей -->
  <div>
    <div class="news">
      <TheNewsItem 
        v-for="(news, i) in newsToshow"
        :key="i"
        :newsItem="news"
      />
    </div>
    <!-- Пагинация из плагина -->
    <div class="pagination">
      <vs-pagination 
        :total="newsLength" 
        :value="currentx"
        @input="onChangePage" 
        prev-icon="l" 
        next-icon="r"
      ></vs-pagination>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    news: {
      type: Array,
      required: true
    }
  },
  data: function(){
    return {
      currentx: 1 
    }
  },
  created() {
    this.currentx = +this.$route.params.index;
  },
  computed: {
    newsPerPage(){
      return this.$store.getters['news/newsPerPage'];
    },
    newsLength(){
      return Math.ceil(this.news.length / this.newsPerPage);
    },
    newsId(){
      return (this.currentx - 1) * this.newsPerPage;
    },
    /**
      * Массив новостей для отображения
      */
    newsToshow(){
      let start = this.newsId;
      let end = start + this.newsPerPage;
      return this.news.slice(start, end);
    }
  },
  methods: {
    /**
      * Событие для пагинации
      */
    onChangePage(event){
      this.currentx = event;
      this.$router.push({ name: this.$route.name, params: { index: this.currentx } });
    }
  },
  watch: {
    /**
      * Переключение отступа пагинации в зависимости от вида карточки
      */
    newsPerPage: function(){
      let start;

      if(this.newsPerPage === 4){
        if(this.currentx === 1 || (this.currentx - 1) % 4 === 0){
          start = Math.ceil(((this.currentx - 1) * 3)/4 + 1);
        }else{
          start = Math.ceil(((this.currentx - 1) * 3)/4);
        }
        this.currentx = start;
      }else{
        if(this.currentx  % 3 === 0){
          start = Math.ceil(((this.currentx) * 4)/3 - 1);
        }else{
          start = Math.floor(((this.currentx) * 4)/3);
        }
        this.currentx = start;
      }
    },
    /**
      * Всплывающее окно при пустом поиске
      */
    newsLength: function(){
      if(this.newsLength === 0){
        this.$store.commit('msg/setShowMsg', { show: true, text: 'Ничего не найдено :(' });
      }else{
        this.$store.commit('msg/setShowMsg', { show: false, text: '' });
      }
    }
  }
}
</script>

<style lang="scss">
  .news {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;

    @media (max-width: $point_xl) {
      justify-content: space-around;
    }
  }
  .pagination {
    padding-top: 30px;
    padding-bottom: 30px;
    .vs-col {
     justify-content: center !important;
    }
  }
  .vs-pagination {
    &--buttons {
      display: none;
    }
    &--ul {
      background-color: transparent;
      @media (max-width: $point_sm) {
        width: 300px;
        padding: 0;
      }
    }
    &--li {
      font-family: Arial;
      font-weight: 700;
      font-style: normal;
      font-size: 18px;
      line-height: 21px;
      color: #0029FF;

      span {
        transition: color .2s linear;
        &:hover {
          color: #000;
        }
      }
    }  
  }
  .is-current {
    color: #000 !important;
    background: transparent !important;
  }
  .vs-pagination-primary {
    .effect {
      background: transparent !important;
    }
  }
</style>