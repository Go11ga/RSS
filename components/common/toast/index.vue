<template>
  <transition name="fade">
    <div class="toast" v-if="isActive">
      {{ text }}
    </div>
  </transition>
</template>

<script>
export default {
  computed: {
    isActive () {
      return this.$store.getters['toast/isActive']
    },
    text () {
      return this.$store.getters['toast/text']
    }
  },
  watch: {
    isActive (value) {
      if (value) {
        setTimeout(() => {
          this.$store.commit('toast/setToast', { isActive: false, text: '' })
        }, 2000)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .toast {
    width: 200px;
    height: 100px;
    padding: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;

    background-color: rgb(247, 63, 63);
    color: $black;
    font-size: 18px;
    font-family: Arial;
    
    position: fixed;

    top: 100px;
    left: 0;
    right: 0;
    margin: 0 auto;
  }

  .fade-enter {
    opacity: 0;
  }

  .fade-enter-active {
    transition: opacity 0.5s;
  }

  .fade-enter-to {
    opacity: 1;
  }

  .fade-leave {
    opacity: 1;
  }

  .fade-leave-active {
    transition: opacity 0.5s;
  }

  .fade-leave-to {
    opacity: 0;
  }
</style>