<template>
  <div class="control">
    <!-- Кнопки роутера -->
    <div class="control__item">
      <NuxtLink
        tag="button"
        class="control__btn"
        :class="{'control__btn--active' : btn.isActive}"
        v-for="(btn, i) in newsMenu"
        :key="btn.title"
        :to="btn.path"
      >
        <span @click="onToggleView(i)">{{btn.title}}</span>
      </NuxtLink>
    </div>

    <!-- Кнопки переключения отображения количества новостей -->
    <div class="control__item">
       <button
        class="view-btn"
        v-for="(btn, i) in controlBtns"
        :key="i"
        :class="{'view-btn--active' : btn.isActive }"
        @click="switchViewBtn(i)"
      >
        <svg class="view-btn__svg" :xlink:href="btn.href">
         <use :xlink:href="btn.href"></use>
        </svg>
      </button>
    </div>

    <!-- SVG иконки -->
    <common/>
  </div>
</template>


<script>
import { mapActions } from 'vuex'

export default {
  data: function(){
    return {
      newsMenu: [
        { title: 'Все', isActive: true, path: '/' },
        { title: 'Lenta.ru', isActive: false, path: '/lenta/1' },
        { title: 'Meduza.io', isActive: false, path: '/meduza/1' }
      ],
      controlBtns: [
        { href:"#grid_1", isActive: false },
        { href:"#grid_2", isActive: true },
      ],
    }
  },
  methods: {
    /**
      * Навигация по новостным каналам
      */
    onToggleView(i) {
      this.newsMenu.map(el=> el.isActive = false);
      this.newsMenu[i].isActive = true;
    },
    /**
      * Переключение показа количества нововстей 
      */
    switchViewBtn(i) {
      this.controlBtns.map(el=> el.isActive = false);
      this.controlBtns[i].isActive = true;
      this.$store.commit('news/setNewsPerPage', i)
    }
  }
}
</script>

<style lang="scss">
  .control {
    padding: 25px 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .control__btn {
    margin-right: 20px;

    font-family: Arial;
    font-weight: 700;
    font-style: normal;
    font-size: 14px;
    line-height: 16px;
    color: #0029FF;

    background-color: transparent;
    border: 0;
    outline: 0;

    transition: color .2s linear;

    &:hover {
      color: #000;
      cursor: pointer;
    }

    &--active {
      color: #000;
    }
  }

  .view-btn {
    margin-left: 10px;

    background-color: transparent;
    border: 0;
    outline: 0;

    &:hover {
      cursor: pointer;
    }

    &--active {
      .view-btn__svg {
        fill: #0029FF;
      }
    }
  }

  .view-btn__svg {
    width: 18px;
    height: 18px;

    fill: #C4C4C4;
    transition: fill .2s linear;

    &:hover {
      fill: #0029FF;
    }
  }
</style>
