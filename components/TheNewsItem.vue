<template>
  <!-- Компонент для отображения одной новости -->
  <div class="card" :class="{'card--full' : fullText, 'card--big' : cardBig }">
    <div class="card__wrapper">
      <div class="card__box">
        <img class="card__img" :src="newsItem.enclosure">
      </div>

      <div class="card__content">
        <div class="card__inner">
          <a class="card__link" :href="newsItem.link" target="_blank">
            <h3 class="card__header">{{newsItem.title}}</h3>
          </a>
          <div class="card__text">{{newsItem.description}}</div>
          <button class="card__btn" @click="showFullText">Подробнее</button>
        </div>
      </div><!-- /.card__content-->

    </div><!-- /.card__wrapper -->
    <div class="card__footer"> 
      <a class="card__url" :href="newsItem.url" target="_blank">{{newsItem.url | cutURL }}</a>
      <div class="card__date">{{newsItem.pubDate | cutPubDate }}</div>
    </div>
  </div>
</template>

<script>
  import { mapState, mapGetters } from 'vuex';
  export default {
    props: {
      newsItem: {
        type: Object,
        rerquired: true
      }
    },
    filters: {
      /**
        * Обрезка URL для показа в шаблоне
        */
      cutURL: function (value) {
        return value.substr(8, 10);
      },
      /**
        * Обрезка даты для показа в шаблоне
        */
      cutPubDate: function (value) {
        return value.substr(5, 12);
      }
    },
    data: function(){
      return {
        fullText: false,
      }
    },
    computed: {
      cardBig(){
        return this.$store.getters['news/newsPerPage'] === 3
      }
    },
    methods: {
      showFullText(){
        this.fullText = !this.fullText;
      }
    }
  }
</script>

<style lang="scss">
  .card {
    width: 520px;
    margin-bottom: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding-top: 30px;

    background-color: #fff;
    box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.05);
    border-radius: 3px;

    @media (max-width: $point_xl) {
      width: 450px;
    }

    &--big {
      width: 100%;
      flex-wrap: wrap;

      .card__wrapper {
        margin-bottom: 27px;
        @media (max-width: $point_md) {
          margin-bottom: 0px;
        }
      }

      .card__img {
        display: block;
      }

      .card__inner {
        height: auto;
      }

      .card__header {
        @media (max-width: $point_md) {
          margin-bottom: 20px;
        }
      }

      .card__text {
        @media (max-width: $point_md) {
          margin-bottom: 20px;
        }
      }

      .card__btn {
        display: none;
        @media (max-width: $point_md) {
          display: block;
          margin-bottom: 19px;
        }
      }

      @media (max-width: $point_md) {
        padding-top: 20px;
      }
    }
  }

  .card__wrapper {
    display: flex;
    justify-content: space-between;

    @media (max-width: $point_md) {
      flex-direction: column;
    }
  }

  .card__img {
    display: none;
    width: 200px;
    height: 100px;
    margin-left: 30px;

    @media (max-width: $point_md) {
      margin: 0 auto;
      max-width: 100%;
      width: auto;
      height: auto;
      margin-bottom: 20px;
    }
  }

  .card__box {
    @media (max-width: $point_sm) {
      padding: 0 22px;
    }
  }

  .card__content {
    display: flex;
    justify-content: space-between;
  }

  .card__inner {
    height: 196px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
    padding: 0 30px;

    @media (max-width: $point_sm) {
      padding: 0 22px;
    }
  }

  .card__link {
    color: #0029FF;
    text-decoration: none;

    transition: color .2s linear;

    &:hover {
      color: #000;
    }
  }

  .card__header {
    font-family: Arial;
    font-weight: 700;
    font-style: normal;
    font-size: 18px;
    line-height: 22px;
  }

  .card__text {
    height: 60px;

    font-family: Arial;
    font-weight: 400;
    font-style: normal;
    font-size: 14px;
    line-height: 20px;
    color: #000;

    overflow: hidden;

    &--full {
      height: auto;
    }
  }

  .card__btn {
    margin-bottom: 24px;

    background-color: transparent;
    border: 0;
    outline: 0;

    font-family: Arial;
    font-weight: 400;
    font-style: normal;
    font-size: 14px;
    line-height: 20px;
    color: #0029FF;
    text-decoration: underline;

    cursor: pointer;

    @media (max-width: $point_sm) {
      margin-bottom: 12px;
    }
  }

  .card__footer {
    display: flex;
    justify-content: space-between;
    padding: 4px 30px;

    background-color: #FCFCFC;
  }

  .card__url {
    font-family: Arial;
    font-weight: 400;
    font-style: normal;
    font-size: 14px;
    line-height: 20px;
    color: #DCDCDC;
  }

  .card__date {
    font-family: Arial;
    font-weight: 400;
    font-style: normal;
    font-size: 14px;
    line-height: 20px;
    color: #DCDCDC;
  }

  .card--full {
    .card__inner {
      height: 250px;

      @media (max-width: $point_sm) {
        height: 350px;
      }
    }
    .card__text {
      height: auto;

      @media (max-width: $point_sm) {
        margin-top: 10px;
        margin-bottom: 10px;
        height: 350px;
        overflow-y: scroll;
      }
    }
  }
</style>
