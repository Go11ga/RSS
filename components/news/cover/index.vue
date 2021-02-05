<!-- Компонент обертка для обработки массива новостей -->
<template>
  <div>
    <div class="news">
      <app-item 
        v-for="(item, i) in newsToshow"
        :key="i"
        :model="item"
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
      />
    </div>
  </div>
</template>

<script>
import AppItem from '@/components/news/item'
import pages from '@/utils/pages'

export default {
  components: {
    AppItem
  },
  props: {
    model: {
      type: Array,
      required: true
    }
  },
  created () {
    this.currentx = +this.$route.params.page
  },
  data() {
    /**
     * * Номер страницы пигинации
     */
    return {
      currentx: 1 
    }
  },
  computed: {
    /**
     * * Количество карточек новостей на странице
     * @return { Number }
     */
    newsPerPage () {
      return this.$store.getters['news/newsPerPage']
    },

    /**
     * * Размер пагинации
     * @return { Number }
     */
    newsLength () {
      return Math.ceil(this.model.length / this.newsPerPage)
    },

    /**
     * * Псевдо id новости - индекс первого показанного на экране элемента в массиве новостей 
     * @return { Number }
     */
    newsId () {
      return (this.currentx - 1) * this.newsPerPage
    },

    /**
     * * Массив новостей для рендеринга
     * @return { Array }
     */
    newsToshow () {
      let start = this.newsId
      let end = start + this.newsPerPage

      return this.model.slice(start, end)
    }
  },
  methods: {
    /**
     * * Метод вызывается при нажатии на элемент пагинации
     */
    onChangePage (event) {
      this.currentx = event

      const category = this.$route.params.category
      this.$router.push(`/${category}/${this.currentx}`)
    }
  },
  watch: {
    /**
     * * Пересчет страницы пагинации в зависимости от количества карточек 
     */
    newsPerPage () {
      this.currentx = pages(this.newsPerPage, this.currentx)
    },
    newsLength () {
      if (this.newsLength === 0) {
        this.$store.commit('toast/setToast', { isActive: true, text: 'По вашему запросу ничего не найдено' });
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
      color: $blue;

      span {
        transition: color .2s linear;
        &:hover {
          color: $black;
        }
      }
    }  
  }
  .is-current {
    color: $black !important;
    background: transparent !important;
  }
  .vs-pagination-primary {
    .effect {
      background: transparent !important;
    }
  }
</style>