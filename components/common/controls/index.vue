<!-- Панель навигации и вида -->
<template>
  <div class="control">
    <!-- Навигация -->
    <div class="control__item">
      <nuxt-link
        tag="button"
        class="control__btn"
        :class="{'control__btn--active' : btn.isActive}"
        v-for="(btn, ind) in newsMenu"
        :key="btn.title"
        :to="btn.path"
      >
        <span @click="onToggleView(ind)">{{btn.title}}</span>
      </nuxt-link>
    </div>

    <!-- Вид новостей -->
    <div class="control__item">
       <button
        class="view-btn"
        v-for="(btn, ind) in controlBtns"
        :key="ind"
        :class="{'view-btn--active' : btn.isActive}"
        @click="switchViewBtn(ind)"
      >
        <svg class="view-btn__svg" :xlink:href="btn.href">
         <use :xlink:href="btn.href"></use>
        </svg>
      </button>
    </div>
  </div>
</template>


<script>
export default {
  data () {
    return {
      newsMenu: [
        { title: 'Все', isActive: true, path: '/all/1' },
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
    onToggleView(ind) {
      this.newsMenu.map(el=> el.isActive = false);
      this.newsMenu[ind].isActive = true;
    },
    switchViewBtn (ind) {
      this.controlBtns.map(el=> el.isActive = false)
      this.controlBtns[ind].isActive = true
      this.$store.commit('news/setNewsPerPage', ind)
    }
  }
}
</script>

<style lang="scss" scoped>
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
    color: $blue;

    background-color: transparent;
    border: 0;
    outline: 0;

    transition: color .2s linear;

    &:hover {
      color: $black;
      cursor: pointer;
    }

    &--active {
      color: $black;
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
        fill: $blue;
      }
    }
  }

  .view-btn__svg {
    width: 18px;
    height: 18px;

    fill: #C4C4C4;
    transition: fill .2s linear;

    &:hover {
      fill: $blue;
    }
  }
</style>